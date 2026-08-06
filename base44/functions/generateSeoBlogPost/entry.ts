import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// Evergreen SEO topic areas for Florida health insurance content.
// Rotates by day so each scheduled run picks a fresh angle.
const TOPIC_AREAS = [
  'How Florida residents can lower their monthly health insurance premium with ACA subsidies',
  '2026 ACA Open Enrollment in Florida: key dates, deadlines, and what to prepare',
  'Self-employed and 1099 health insurance options in Florida',
  'Short-term health insurance vs ACA Marketplace plans in Florida',
  'Private PPO plans with broad doctor networks in Florida',
  'How to choose the right metal tier (Bronze, Silver, Gold) on the ACA Marketplace',
  'Florida health insurance for families: covering kids and dependents',
  'Prescription drug coverage under ACA plans in Florida',
  'Dental and vision add-on coverage options for Florida residents',
  'Special Enrollment Periods: qualifying life events in Florida',
  'How to estimate household income for ACA subsidy calculations',
  'COBRA alternatives for Florida residents who lost employer coverage',
  'Health Savings Account (HSA) compatible plans in Florida',
  'Florida Medicaid eligibility and the coverage gap explained',
  'Tips for comparing health insurance plans in Florida',
];

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Pick a topic based on the current day index (rotates through the list)
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const topic = TOPIC_AREAS[dayIndex % TOPIC_AREAS.length];

    const prompt = `You are an expert Florida health insurance writer for GetCoveredFL.com, a licensed Florida insurance agency. Write a comprehensive, SEO-optimized blog post about: "${topic}".

Requirements:
- 800–1200 words
- Engaging, informative, and accurate for Florida residents
- Include practical, actionable tips
- Use proper markdown formatting (## section headers, bullet points, **bold** for key terms)
- Naturally weave in relevant search keywords throughout the content
- Include a compelling introduction and a clear call-to-action at the end
- The call-to-action should mention readers can get free quotes at GetCoveredFL.com or call (855) 634-5343
- Do NOT include medical advice — focus on insurance options, costs, and enrollment guidance only
- Write for a general audience — avoid jargon or explain it when used
- Be factual about ACA Marketplace, subsidies, and Florida-specific rules

Return a JSON object with these fields:
- title: a compelling, SEO-friendly title (under 70 characters)
- slug: a URL-friendly slug (lowercase, words separated by hyphens, no special characters)
- excerpt: a 1–2 sentence summary for the blog listing (under 160 characters)
- content: the full blog post body in markdown
- category: exactly one of "open_enrollment", "new_options", "deadlines", "tips", "general"
- author: "HealthLink Insurance Agency"`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          slug: { type: 'string' },
          excerpt: { type: 'string' },
          content: { type: 'string' },
          category: { type: 'string' },
          author: { type: 'string' }
        },
        required: ['title', 'slug', 'excerpt', 'content', 'category', 'author']
      }
    });

    // Ensure slug uniqueness by appending a short timestamp suffix
    const uniqueSlug = `${result.slug}-${Date.now().toString(36)}`;

    const post = await base44.asServiceRole.entities.BlogPost.create({
      title: result.title,
      slug: uniqueSlug,
      excerpt: result.excerpt,
      content: result.content,
      category: result.category,
      author: result.author || 'HealthLink Insurance Agency',
      published_date: new Date().toISOString().split('T')[0],
      status: 'published'
    });

    return Response.json({ ok: true, post_id: post.id, title: post.title, slug: post.slug });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}