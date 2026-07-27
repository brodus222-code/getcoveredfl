import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import { secrets } from 'base44:runtime';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json();

    // Restrict invocation to requests originating from the app itself
    // (production domain, Base44 preview/staging environments, and local dev).
    // This prevents arbitrary external abuse of the public lead-notification endpoint.
    const origin = (req.headers.get('origin') || req.headers.get('referer') || '').toLowerCase();
    const isAllowedOrigin =
      origin.startsWith('https://getcoveredfl.com') ||
      origin.startsWith('http://getcoveredfl.com') ||
      origin.startsWith('https://www.getcoveredfl.com') ||
      origin.includes('.base44.app') ||
      origin.includes('base44.com') ||
      origin.startsWith('http://localhost');
    if (!isAllowedOrigin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Support both direct call (data at root) and entity automation (data nested)
    const lead = body.data || body;

    // Validate required lead fields to prevent abuse via direct calls
    if (!lead.full_name || !lead.email) {
      return Response.json({ error: 'Invalid lead data' }, { status: 400 });
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
    console.log('Resend send response:', JSON.stringify(result));

    if (!res.ok) {
      return Response.json({ error: 'Email send failed', details: result }, { status: 502 });
    }

    return Response.json({ ok: true, id: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});