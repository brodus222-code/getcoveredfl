import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Verify the caller is authenticated before using service-role privileges
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Support both direct call (data at root) and entity automation (data nested)
    const lead = body.data || body;

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

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

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

    // Build RFC 2822 email message
    const messageParts = [
      `To: john@healthlinkagency.com`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      htmlBody
    ];
    const rawMessage = messageParts.join('\r\n');
    const encodedMessage = btoa(unescape(encodeURIComponent(rawMessage)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ raw: encodedMessage })
    });

    const result = await res.json();
    console.log('Gmail send response:', JSON.stringify(result));

    return Response.json({ ok: true, result });
  } catch (error) {
    if (error.status === 401 || error.status === 403) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
});