import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

// Sends a new-lead notification to the agency inbox (john@healthlinkagency.com)
// via Resend. Triggered by the "Notify Agent on New Lead" workflow on every
// Lead create. Only a lead_id is accepted; the lead is read from this app's DB
// (service role), so callers cannot inject arbitrary email content, and the
// recipient is a fixed internal address (no open-relay risk). No client-
// supplied headers (Origin/Referer) are trusted for authorization.

export default async function(req) {
  try {
    const body = await req.json().catch(() => ({}));

    const base44 = createClientFromRequest(req);

    const leadId = body && (body.lead_id || (body.data && body.data.lead_id));
    if (!leadId) {
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

    const subject = `New Lead: ${sanitizeHeader(lead.full_name || 'Unknown')} — ${sanitizeHeader(lead.zip_code || 'N/A')}`;
    const htmlBody = `
      <h2>New Lead Submitted</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">ZIP Code</td><td style="padding:8px;border:1px solid #ddd">${zip}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Coverage Type</td><td style="padding:8px;border:1px solid #ddd">${coverage}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Household Size</td><td style="padding:8px;border:1px solid #ddd">${household}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Est. Income</td><td style="padding:8px;border:1px solid #ddd">${income}</td></tr>
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