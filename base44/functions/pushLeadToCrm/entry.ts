import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

// Pushes a newly-created lead from this app into a separate Base44 CRM app.
// Triggered by the "Push Lead to CRM" workflow on every Lead create. The actual
// CRM record is created by a matching `receiveLead` function in the CRM app;
// this function only reads the local lead and POSTs a few key fields to it.

export default async function(req) {
  try {
    const body = await req.json().catch(() => ({}));

    const base44 = createClientFromRequest(req);

    // Trust-boundary check: only admin users (including the workflow engine,
    // which runs as admin) or callers presenting the pre-shared WORKFLOW_SECRET
    // may invoke this function. Non-admin app users (agents) are rejected.
    const user = await base44.auth.me().catch(() => null);
    const isAdmin = user && user.role === 'admin';
    const workflowSecret = secrets.get('WORKFLOW_SECRET');
    const providedSecret = body && body.workflow_secret;
    const secretOk = !!workflowSecret && providedSecret === workflowSecret;
    if (!isAdmin && !secretOk) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only the lead record id is accepted; the lead is read from this app's DB
    // (service role), so callers cannot inject arbitrary CRM payload data.
    const leadId = body && (body.lead_id || (body.data && body.data.lead_id));
    if (!leadId) {
      return Response.json({ error: 'lead_id is required' }, { status: 400 });
    }

    const lead = await base44.asServiceRole.entities.Lead.get(leadId);
    if (!lead) {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }

    const webhookUrl = secrets.get('CRM_WEBHOOK_URL');
    const webhookSecret = secrets.get('CRM_WEBHOOK_SECRET');
    if (!webhookUrl) {
      return Response.json({ error: 'CRM_WEBHOOK_URL not configured' }, { status: 500 });
    }

    // Field names chosen to auto-map in GoHighLevel's inbound webhook trigger.
    const nameParts = String(lead.full_name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ');

    const payload = {
      first_name: firstName,
      last_name: lastName,
      full_name: lead.full_name || '',
      phone: lead.phone || '',
      email: lead.email || '',
      postal_code: lead.zip_code || '',
      state: 'FL',
      country: 'US',
      source: lead.lead_source || 'website',
      coverage_type: lead.coverage_type || '',
      household_size: lead.household_size ?? '',
      coverage_members: lead.coverage_members || '',
      estimated_income: lead.estimated_income ?? '',
      start_coverage: lead.start_coverage || '',
      lead_reason: lead.lead_reason || '',
      birth_year: lead.birth_year ?? '',
      age: Array.isArray(lead.ages) && lead.ages.length
        ? lead.ages[0]
        : (lead.birth_year ? new Date().getFullYear() - Number(lead.birth_year) : ''),
      ages: Array.isArray(lead.ages) ? lead.ages.join(', ') : '',
      qualified: lead.qualified !== false,
      sms_opt_in: !!lead.sms_opt_in,
      status: lead.status || 'new',
      source_lead_id: lead.id,
      created_date: lead.created_date,
    };

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-crm-secret': webhookSecret || '',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const details = await res.text().catch(() => '');
      return Response.json({ error: 'CRM push failed', status: res.status, details }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}