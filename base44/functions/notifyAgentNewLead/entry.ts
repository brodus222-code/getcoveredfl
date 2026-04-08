import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const body = await req.json();

  // Support both direct call (data at root) and entity automation (data nested)
  const lead = body.data || body;

  const name = lead.full_name || 'Unknown';
  const phone = lead.phone || 'N/A';
  const email = lead.email || 'N/A';
  const zip = lead.zip_code || 'N/A';
  const coverage = (lead.coverage_type || 'N/A').replace(/_/g, ' ');
  const income = lead.estimated_income ? `$${Number(lead.estimated_income).toLocaleString()}` : 'N/A';
  const household = lead.household_size || 'N/A';

  const base44 = createClientFromRequest(req);
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

  const subject = `New Lead: ${name} — ${zip}`;
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
});