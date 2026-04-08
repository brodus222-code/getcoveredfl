import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    console.log('Automation payload:', JSON.stringify(payload));

    const event = payload.event;
    const data = payload.data;

    if (!data || !data.full_name) {
      return Response.json({ success: true, message: 'No lead data, skipping' });
    }

    const coverageLabels = {
      aca_marketplace: 'ACA Marketplace',
      cobra_alternatives: 'COBRA Alternative',
      short_term_gap: 'Short-term/Gap',
      first_time_coverage: 'First-time Coverage',
      ppo_broad_network: 'PPO Broad Network',
      most_affordable: 'Most Affordable'
    };

    const { full_name, phone, email, zip_code, coverage_type, status, assigned_agent_email } = data;

    console.log('Event type:', event?.type);

    if (event?.type === 'create') {
      console.log('Sending new lead email to brodus222@gmail.com');
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: 'brodus222@gmail.com',
        subject: `New Lead: ${full_name}`,
        body: `
          <h2>New Lead Submitted</h2>
          <p>A new lead just came in through GetCoveredFL.</p>
          <ul>
            <li><strong>Name:</strong> ${full_name}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>ZIP Code:</strong> ${zip_code}</li>
            <li><strong>Coverage Type:</strong> ${coverageLabels[coverage_type] || coverage_type}</li>
          </ul>
        `
      });
      console.log('Email sent successfully');
    }

    if (assigned_agent_email) {
      console.log('Sending assignment email to:', assigned_agent_email);
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: assigned_agent_email,
        subject: `New Lead Assigned: ${full_name}`,
        body: `
          <h2>New Lead Assigned to You</h2>
          <p>A lead has been assigned to you in GetCoveredFL.</p>
          <ul>
            <li><strong>Name:</strong> ${full_name}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>ZIP Code:</strong> ${zip_code}</li>
            <li><strong>Coverage Type:</strong> ${coverageLabels[coverage_type] || coverage_type}</li>
            <li><strong>Status:</strong> ${status}</li>
          </ul>
          <p>Please log into the GetCoveredFL admin dashboard to view full details.</p>
        `
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});