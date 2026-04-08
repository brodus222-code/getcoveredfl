import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const body = await req.json();

  const name = body.data?.full_name || 'Unknown';
  const phone = body.data?.phone || 'N/A';
  const email = body.data?.email || 'N/A';
  const zip = body.data?.zip_code || 'N/A';

  await base44.asServiceRole.integrations.Core.SendEmail({
    to: 'brodus222@gmail.com',
    subject: `New Lead: ${name}`,
    body: `New lead submitted:\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nZIP: ${zip}`
  });

  return Response.json({ ok: true });
});