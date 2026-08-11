import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

// ─────────────────────────────────────────────────────────────────────────────
// Evergreen SEO topic areas for Florida health insurance content.
// Each entry has a topic + primary keyword to target.
// Rotates by day so each scheduled run picks a fresh angle.
// ─────────────────────────────────────────────────────────────────────────────
const TOPIC_AREAS = [
  { topic: 'How Florida residents can lower their monthly health insurance premium with ACA subsidies', keyword: 'affordable health insurance florida' },
  { topic: '2026 ACA Open Enrollment in Florida: key dates, deadlines, and what to prepare', keyword: 'aca open enrollment florida 2026' },
  { topic: 'Self-employed and 1099 health insurance options in Florida', keyword: 'self employed health insurance florida' },
  { topic: 'Short-term health insurance vs ACA Marketplace plans in Florida', keyword: 'short term health insurance florida' },
  { topic: 'Private PPO plans with broad doctor networks in Florida', keyword: 'ppo health insurance florida' },
  { topic: 'How to choose the right metal tier (Bronze, Silver, Gold) on the ACA Marketplace', keyword: 'aca metal tiers florida' },
  { topic: 'Florida health insurance for families: covering kids and dependents', keyword: 'family health insurance florida' },
  { topic: 'Prescription drug coverage under ACA plans in Florida', keyword: 'prescription coverage aca florida' },
  { topic: 'Dental and vision add-on coverage options for Florida residents', keyword: 'dental vision insurance florida' },
  { topic: 'Special Enrollment Periods: qualifying life events in Florida', keyword: 'special enrollment period florida' },
  { topic: 'How to estimate household income for ACA subsidy calculations', keyword: 'aca subsidy calculator florida' },
  { topic: 'COBRA alternatives for Florida residents who lost employer coverage', keyword: 'cobra alternatives florida' },
  { topic: 'Health Savings Account (HSA) compatible plans in Florida', keyword: 'hsa health insurance florida' },
  { topic: 'Florida Medicaid eligibility and the coverage gap explained', keyword: 'florida medicaid eligibility' },
  { topic: 'Tips for comparing health insurance plans in Florida', keyword: 'compare health insurance plans florida' },
  { topic: 'Cheapest health insurance in Florida: strategies for low-income residents', keyword: 'cheap health insurance florida' },
  { topic: 'Florida health insurance for seniors not yet on Medicare', keyword: 'health insurance before medicare florida' },
  { topic: 'How to get health insurance after moving to Florida', keyword: 'new florida resident health insurance' },
  { topic: 'Understanding ACA premium tax credits and cost-sharing reductions in Florida', keyword: 'premium tax credit florida' },
  { topic: 'Florida health insurance for college students and young adults', keyword: 'student health insurance florida' },
  { topic: 'When can you enroll in health insurance outside Open Enrollment in Florida', keyword: 'health insurance enrollment florida' },
  { topic: 'Florida small business health insurance options for owners and teams', keyword: 'small business health insurance florida' },
  { topic: 'Mental health and substance abuse coverage under ACA plans in Florida', keyword: 'mental health coverage florida' },
  { topic: 'Maternity and pregnancy coverage under Florida health insurance plans', keyword: 'maternity coverage florida' },
  { topic: 'How to switch health insurance plans during Open Enrollment in Florida', keyword: 'switch health insurance florida' },
  { topic: 'Florida health insurance networks: HMO vs PPO vs EPO explained', keyword: 'hmo ppo epo florida' },
  { topic: 'What documents you need to apply for ACA Marketplace in Florida', keyword: 'aca application documents florida' },
  { topic: 'Pre-existing conditions and health insurance protections in Florida', keyword: 'pre existing conditions florida' },
  { topic: 'How to appeal a health insurance claim denial in Florida', keyword: 'health insurance appeal florida' },
  { topic: 'Preventive care benefits covered at no cost under ACA plans in Florida', keyword: 'preventive care florida' },
];

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Authorization: authenticated admin (direct call) or valid pre-shared secret (workflow call)
    const user = await base44.auth.me().catch(() => null);
    const body = await req.json().catch(() => ({}));
    const expectedSecret = secrets.get('BLOG_GENERATION_SECRET');
    const isAdmin = user && user.role === 'admin';
    const hasSecret = expectedSecret && body.secret === expectedSecret;
    if (!isAdmin && !hasSecret) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Pick a topic based on the current day index (rotates through the list)
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const entry = TOPIC_AREAS[dayIndex % TOPIC_AREAS.length];
    const topic = entry.topic;
    const keyword = entry.keyword;

    // Get recent post titles so the AI avoids duplicate angles
    const recent = await base44.asServiceRole.entities.BlogPost.list('-published_date', 15);
    const recentTitles = recent.map(p => p.title).join('\n') || '(none yet)';

    // Fetch existing published posts for internal linking (up to 30)
    const existingPosts = await base44.asServiceRole.entities.BlogPost.filter(
      { status: 'published' },
      '-published_date',
      30
    );
    const internalLinkList = existingPosts
      .map(p => `- "${p.title}" → /blog/${p.slug}`)
      .join('\n');
    const internalLinksBlock = internalLinkList
      ? `\nEXISTING POSTS (for internal linking — use these EXACT URLs):\n${internalLinkList}`
      : '\nEXISTING POSTS: (none yet — skip internal links this time)';

    const prompt = `You are an elite SEO content strategist and Florida health insurance expert writing for GetCoveredFL.com — a licensed Florida insurance agency (HealthLink Insurance Agency). Your goal: produce a blog post that ranks on page 1 of Google for the target keyword.

TARGET KEYWORD: "${keyword}"
TOPIC: ${topic}

You MUST follow these SEO content requirements:

CONTENT STRUCTURE & LENGTH:
- Write 1,500–2,000 words of genuinely useful, original content (Google rewards depth and comprehensiveness)
- Open with a compelling hook in the first 100 words that includes the target keyword naturally
- Use a clear H2/H3 hierarchy (## and ### in markdown) — each H2 should target a related search query
- Include the target keyword in the first paragraph, at least 2-3 H2 headings, and naturally throughout (aim for 1-1.5% keyword density, never stuffed)
- Include relevant LSI/semantic keywords (e.g., "ACA Marketplace," "premium tax credit," "Silver plan," "Open Enrollment," "Florida," etc.)
- Write 5-7 main sections, each 150-250 words
- Include at least one bulleted list and one numbered list for scannability (Google loves lists)
- Add a comparison table or quick-reference summary where relevant

INTERNAL LINKING (critical for SEO — keeps visitors engaged and improves rankings):
- Insert 3-5 contextual internal links to EXISTING posts within the body content where naturally relevant
- Use keyword-rich anchor text (not "click here" or the full title) — e.g., [ACA subsidy eligibility](/blog/some-slug)
- Place links where they add value to the reader, not forced — link when mentioning a concept that another post covers in depth
- Use the EXACT URLs provided below — do not invent slugs
- If there are no existing posts yet, skip internal linking
${internalLinksBlock}

E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness):
- Write with the authority of a licensed Florida insurance professional
- Cite specific ACA rules, income thresholds, and Florida-specific details (e.g., Florida Medicaid income limits, federally-facilitated Marketplace)
- Include real dollar figures and percentages where helpful (e.g., subsidy thresholds at 400% FPL)
- Never give medical advice — focus strictly on insurance options, costs, and enrollment

LOCAL SEO:
- Mention Florida-specific details: Florida is a federally-facilitated Marketplace state, Florida Medicaid eligibility, Florida counties/major cities where natural
- Reference GetCoveredFL.com as the local licensed resource

FAQ SECTION (critical for featured snippets):
- Generate 4-5 common questions and answers (40-80 words each) that people search for on this topic
- Format as: ### Question\nAnswer text (no "Q:" prefix)
- These power FAQ schema markup for Google rich results

RELATED READING SECTION (before the CTA):
- Add a "## Related Reading" section near the end (before the CTA) with a bulleted list of 2-3 links to the most relevant EXISTING posts
- Use the post titles as anchor text, linking to their exact URLs from the list above
- If there are no existing posts, omit this section entirely

CALL TO ACTION:
- End with a natural CTA: readers can get free quotes at GetCoveredFL.com or call (855) 634-5343 to speak with a licensed Florida agent

AVOID DUPLICATES — these titles were recently published, take a different angle:
${recentTitles}

Return a JSON object with these exact fields:
- title: a compelling, SEO-optimized title under 60 characters (include the keyword if natural)
- slug: a URL-friendly slug (lowercase, hyphens, no special chars, under 60 chars, include keyword)
- excerpt: a 2-sentence summary under 155 characters (include keyword, compelling for search results)
- meta_description: an SEO meta description under 155 characters with the keyword and a call to action
- focus_keyword: the primary keyword (should match or closely relate to the target keyword above)
- content: the full blog post body in markdown (1,500–2,000 words, with ## and ### headings, lists, and the FAQ section integrated)
- faq_content: ONLY the FAQ section extracted as markdown (### questions + answers), for FAQ schema
- category: exactly one of "open_enrollment", "new_options", "deadlines", "tips", "general"
- author: "HealthLink Insurance Agency"`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      model: 'claude_sonnet_4_6',
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          slug: { type: 'string' },
          excerpt: { type: 'string' },
          meta_description: { type: 'string' },
          focus_keyword: { type: 'string' },
          content: { type: 'string' },
          faq_content: { type: 'string' },
          category: { type: 'string' },
          author: { type: 'string' }
        },
        required: ['title', 'slug', 'excerpt', 'meta_description', 'focus_keyword', 'content', 'faq_content', 'category', 'author']
      }
    });

    // Ensure slug uniqueness by appending a short timestamp suffix
    const uniqueSlug = `${result.slug}-${Date.now().toString(36)}`;

    const post = await base44.asServiceRole.entities.BlogPost.create({
      title: result.title,
      slug: uniqueSlug,
      excerpt: result.excerpt,
      meta_description: result.meta_description,
      focus_keyword: result.focus_keyword,
      content: result.content,
      faq_content: result.faq_content,
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