import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data } = await req.json();

    const leadName = data.full_name;
    const leadPhone = data.phone;
    const leadEmail = data.email;
    const zipCode = data.zip_code;
    const coverageType = data.coverage_type;
    const status = data.status;

    const coverageLabels = {
      aca_marketplace: 'ACA Marketplace',
      cobra_alternatives: 'COBRA Alternative',
      short_term_gap: 'Short-term/Gap',
      first_time_coverage: 'First-time Coverage',
      ppo_broad_network: 'PPO Broad Network',
      most_affordable: 'Most Affordable'
    };

    const notifications = [];

    // On new lead creation, always notify john@
    if (event.type === 'create') {
      const emailBody = `
        <h2>New Lead Submitted</h2>
        <p>A new lead just came in through GetCoveredFL.</p>
        <ul>
          <li><strong>Name:</strong> ${leadName}</li>
          <li><strong>Phone:</strong> ${leadPhone}</li>
          <li><strong>Email:</strong> ${leadEmail}</li>
          <li><strong>ZIP Code:</strong> ${zipCode}</li>
          <li><strong>Coverage Type:</strong> ${coverageLabels[coverageType] || coverageType}</li>
        </ul>
      `;
      notifications.push(
        base44.asServiceRole.integrations.Core.SendEmail({
          to: 'john@healthlinkagency.com',
          subject: `New Lead: ${leadName}`,
          body: emailBody
        })
      );
    }

    // If assigned to an agent, notify them too
    if (data.assigned_agent_email) {
      const agentEmailBody = `
        <h2>New Lead Assigned to You</h2>
        <p>A lead has been assigned to you in GetCoveredFL.</p>
        <ul>
          <li><strong>Name:</strong> ${leadName}</li>
          <li><strong>Phone:</strong> ${leadPhone}</li>
          <li><strong>Email:</strong> ${leadEmail}</li>
          <li><strong>ZIP Code:</strong> ${zipCode}</li>
          <li><strong>Coverage Type:</strong> ${coverageLabels[coverageType] || coverageType}</li>
          <li><strong>Status:</strong> ${status}</li>
        </ul>
        <p>Please log into the GetCoveredFL admin dashboard to view full details.</p>
      `;
      notifications.push(
        base44.asServiceRole.integrations.Core.SendEmail({
          to: data.assigned_agent_email,
          subject: `New Lead Assigned: ${leadName}`,
          body: agentEmailBody
        })
      );
    }

    await Promise.all(notifications);

    return Response.json({ 
      success: true, 
      message: `Notifications sent` 
    });
  } catch (error) {
    return Response.json({ 
      error: error.message 
    }, { status: 500 });
  }
});