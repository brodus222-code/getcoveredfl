Deno.serve(async (req) => {
  const body = await req.json();

  const name = body.data?.full_name || 'Unknown';
  const phone = body.data?.phone || 'N/A';
  const email = body.data?.email || 'N/A';
  const zip = body.data?.zip_code || 'N/A';
  const coverage = body.data?.coverage_type || 'N/A';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'GetCoveredFL <onboarding@resend.dev>',
      to: 'john@healthlinkagency.com',
      subject: `New Lead: ${name}`,
      html: `<h2>New Lead Submitted</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>ZIP:</strong> ${zip}</p>
        <p><strong>Coverage:</strong> ${coverage}</p>`
    })
  });

  const result = await res.json();
  console.log('Resend response:', JSON.stringify(result));

  return Response.json({ ok: true, result });
});