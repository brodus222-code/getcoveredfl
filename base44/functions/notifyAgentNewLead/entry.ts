import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

// Sends a new-lead notification to the agency inbox (john@healthlinkagency.com)
// via Resend. Triggered by the "Notify Agent on New Lead" workflow on every
// Lead create. Only a lead_id is accepted; the lead is read from this app's DB
// (service role), so callers cannot inject arbitrary email content, and the
// recipient is a fixed internal address (no open-relay risk). No client-
// supplied headers (Origin/Referer) are trusted for authorization.
//
// Auth: this function sends an email on the agency's behalf, so only admin
// users (including the workflow engine, which runs as admin) or callers
// presenting the shared WORKFLOW_SECRET may invoke it. Non-admin app users
// (agents) are rejected.

export default async function(req) {
  try {
    // Parse the body defensively: read raw text once, then JSON.parse. Some
    // invocation paths deliver an empty/streamed body to req.json(), which
    // silently produced a "lead_id is required" 400 for workflow-triggered calls.
    const rawBody = await req.text().catch(() => '');
    let body = {};
    if (rawBody) {
      try { body = JSON.parse(rawBody); } catch (_e) { body = {}; }
    }
    const url = new URL(req.url);

    const base44 = createClientFromRequest(req);

    // Trust-boundary check: admin user (workflow engine runs as admin) or
    // the shared server-to-server WORKFLOW_SECRET.
    const user = await base44.auth.me().catch(() => null);
    const isAdmin = user && user.role === 'admin';
    const workflowSecret = secrets.get("WORKFLOW_SECRET");
    const bodySecret = body && body.workflow_secret;
    const secretOk = !!workflowSecret && bodySecret === workflowSecret;
    if (!isAdmin && !secretOk) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Accept lead_id from the body or nested data.
    const leadId = (body && (body.lead_id || body.entity_id || (body.data && (body.data.lead_id || body.data.id))))
      || url.searchParams.get('lead_id');
    if (!leadId) {
      console.log('notifyAgentNewLead: missing lead_id. raw body:', rawBody);
      return Response.json({ error: 'lead_id is required' }, { status: 400 });
    }

    const lead = await base44.asServiceRole.entities.Lead.get(leadId);
    if (!lead || !lead.full_name || !lead.email) {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Escape all user-provided fields to prevent HTML injection in the email body
    const escapeHtml = (str) => String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    // Strip newlines to prevent email header injection in the Subject line
    const sanitizeHeader = (str) => String(str).replace(/[\r\n]/g, ' ');

    const name = escapeHtml(lead.full_name || 'Unknown');
    const phone = escapeHtml(lead.phone || 'N/A');
    const email = escapeHtml(lead.email || 'N/A');
    const zip = escapeHtml(lead.zip_code || 'N/A');
    const coverage = escapeHtml((lead.coverage_type || 'N/A').replace(/_/g, ' '));
    const income = lead.estimated_income ? `$${Number(lead.estimated_income).toLocaleString()}` : 'N/A';
    const household = escapeHtml(lead.household_size || 'N/A');
    const coverageMemberLabels = {
      just_me: 'Just Me',
      me_spouse: 'Me + Spouse',
      me_kids: 'Me + Kids',
      whole_family: 'Whole Family',
    };
    const coverageMembers = escapeHtml(coverageMemberLabels[lead.coverage_members] || 'N/A');
    const callRequest = lead.preferred_call_date && lead.preferred_call_time
      ? escapeHtml(`${lead.preferred_call_date} at ${lead.preferred_call_time} ET — requested, not confirmed`)
      : 'N/A';
    const leadSource = escapeHtml(lead.lead_source === 'ai_advisor' ? 'AI advisor' : (lead.lead_source || 'website'));
    const notes = escapeHtml(lead.notes || 'N/A');
    // Show the received time in Eastern so email times match the dashboard
    const receivedEt = lead.created_date
      ? new Date(lead.created_date).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' }) + ' ET'
      : 'N/A';

    const subject = `New Lead: ${sanitizeHeader(lead.full_name || 'Unknown')} — ${sanitizeHeader(lead.zip_code || 'N/A')}`;
    const htmlBody = `
      <h2>New Lead Submitted</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Received</td><td style="padding:8px;border:1px solid #ddd">${receivedEt}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">ZIP Code</td><td style="padding:8px;border:1px solid #ddd">${zip}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Coverage Type</td><td style="padding:8px;border:1px solid #ddd">${coverage}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Household Size</td><td style="padding:8px;border:1px solid #ddd">${household}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Who Needs Coverage</td><td style="padding:8px;border:1px solid #ddd">${coverageMembers}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Est. Income</td><td style="padding:8px;border:1px solid #ddd">${income}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Source</td><td style="padding:8px;border:1px solid #ddd">${leadSource}</td></tr>
        ${lead.lead_source === 'ai_advisor' ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Preferred call (ET)</td><td style="padding:8px;border:1px solid #ddd">${callRequest}</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Visitor notes</td><td style="padding:8px;border:1px solid #ddd">${notes}</td></tr>` : ''}
      </table>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secrets.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'GetCovered FL <no-reply@getcoveredfl.com>',
        reply_to: 'john@healthlinkagency.com',
        to: 'john@healthlinkagency.com',
        subject,
        html: htmlBody
      })
    });

    const result = await res.json();
    if (!res.ok) {
      console.log('Resend error:', JSON.stringify(result));
      return Response.json({ error: 'Email send failed', details: result }, { status: 502 });
    }

    return Response.json({ ok: true, id: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}