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

    // Trust-boundary check: only allow authenticated app users or the
    // platform workflow runner (pre-shared WORKFLOW_SECRET) to invoke this
    // function. Rejects unauthenticated external callers.
    const isAuthenticated = await base44.auth.isAuthenticated().catch(() => false);
    const workflowSecret = secrets.get('WORKFLOW_SECRET');
    const providedSecret = body && body.workflow_secret;
    if (!isAuthenticated && providedSecret !== workflowSecret) {
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

    // Key fields only — the CRM stores its own lead schema.
    const payload = {
      source_lead_id: lead.id,
      full_name: lead.full_name,
      phone: lead.phone,
      email: lead.email,
      coverage_type: lead.coverage_type,
      zip_code: lead.zip_code,
      status: lead.status || 'new',
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