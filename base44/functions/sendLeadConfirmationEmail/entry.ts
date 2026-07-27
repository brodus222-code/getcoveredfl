import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    // Only the lead record id is accepted from the request — never the
    // recipient address. The actual email is read from the stored Lead record
    // (service role), so this endpoint cannot be used as an open mail relay to
    // arbitrary attacker-supplied addresses.
    const leadId = body && (body.lead_id || (body.data && body.data.lead_id));
    if (!leadId) {
      return Response.json({ error: 'lead_id is required' }, { status: 400 });
    }

    const lead = await base44.asServiceRole.entities.Lead.get(leadId);
    if (!lead || !lead.email || !lead.full_name) {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Idempotency / replay guard: send at most one confirmation per lead.
    if (lead.confirmation_email_sent) {
      return Response.json({ ok: true, alreadySent: true });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(lead.email));
    if (!emailOk) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Sanitize user-provided fields for safe insertion into HTML
    const escapeHtml = (str) => String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const firstName = escapeHtml(String(lead.full_name).split(' ')[0] || lead.full_name);
    const coverageRaw = escapeHtml(String(lead.coverage_type || '').replace(/_/g, ' '));

    const subject = 'We received your quote request — GetCovered FL';
    const htmlBody = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f4f7f9;font-family:Inter,Arial,sans-serif;color:#0f2c3a">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f9;padding:32px 12px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 40px -12px rgba(15,44,58,0.12)">
        <tr><td style="background:linear-gradient(135deg,#0E7C86,#0a6770);padding:28px 36px">
          <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:.3px;font-family:Poppins,Arial,sans-serif">GetCovered<span style="color:#FF7A59">FL</span></span>
        </td></tr>
        <tr><td style="padding:36px">
          <h1 style="margin:0 0 16px;font-size:24px;font-family:Poppins,Arial,sans-serif;color:#0f2c3a">Hi ${firstName}, we got your request!</h1>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#36555f">
            Thank you for requesting a health insurance quote. One of our licensed Florida agents will review your information and reach out within <strong>1 business day</strong> with personalized plan options and pricing.
          </p>
          ${coverageRaw ? `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#36555f">We noted you're interested in <strong style="text-transform:capitalize">${coverageRaw}</strong> coverage — we'll focus our recommendations there.</p>` : ''}
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background:#eef7f7;border-radius:12px">
            <tr><td style="padding:20px">
              <p style="margin:0 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:.5px;color:#0E7C86;font-weight:600">Prefer to talk now?</p>
              <a href="tel:+18556345343" style="font-size:22px;font-weight:700;color:#0f2c3a;text-decoration:none;font-family:Poppins,Arial,sans-serif">(855) 634-5343</a>
              <p style="margin:6px 0 0;font-size:13px;color:#36555f">Free consultation · No obligation · Mon–Sat</p>
            </td></tr>
          </table>
          <p style="margin:24px 0 6px;font-size:15px;font-weight:600;color:#0f2c3a">What happens next:</p>
          <ol style="margin:0 0 0 18px;padding:0;font-size:15px;line-height:1.7;color:#36555f">
            <li>A licensed agent reviews your household details and eligibility.</li>
            <li>We compare plans across top Florida carriers for your area.</li>
            <li>You receive your options with clear pricing — no obligation.</li>
          </ol>
        </td></tr>
        <tr><td style="padding:24px 36px;background:#f4f7f9;border-top:1px solid #e3ebef">
          <p style="margin:0 0 6px;font-size:13px;color:#5d7a84;line-height:1.5">
            HealthLink Insurance Agency LLC · FL Lic# L131967 · NPN# 21554495<br/>
            This email was sent because you requested a quote at getcoveredfl.com. Your information is secure and never sold.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secrets.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'GetCovered FL <no-reply@getcoveredfl.com>',
        reply_to: 'contact@getcoveredfl.com',
        to: lead.email,
        subject,
        html: htmlBody
      })
    });

    const result = await res.json();
    if (!res.ok) {
      console.log('Resend error:', JSON.stringify(result));
      return Response.json({ error: 'Email send failed', details: result }, { status: 502 });
    }

    // Mark sent so repeated calls (replays) cannot trigger additional emails.
    try {
      await base44.asServiceRole.entities.Lead.update(leadId, { confirmation_email_sent: true });
    } catch (e) {
      // Non-fatal: email was delivered; flag update failed.
    }

    return Response.json({ ok: true, id: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}