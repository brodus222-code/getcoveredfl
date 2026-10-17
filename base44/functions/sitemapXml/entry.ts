import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const BASE_URL = 'https://getcoveredfl.com';

// Static routes — keep in sync with src/App.jsx
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/Quote', priority: '0.9', changefreq: 'monthly' },
  { path: '/Marketplace', priority: '0.8', changefreq: 'monthly' },
  { path: '/GetCovered', priority: '0.8', changefreq: 'monthly' },
  { path: '/ppo', priority: '0.8', changefreq: 'monthly' },
  { path: '/self-employed', priority: '0.8', changefreq: 'monthly' },
  { path: '/coverage-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/miami-health-insurance', priority: '0.8', changefreq: 'monthly' },
  { path: '/orlando-health-insurance', priority: '0.8', changefreq: 'monthly' },
  { path: '/tampa-health-insurance', priority: '0.8', changefreq: 'monthly' },
  { path: '/jacksonville-health-insurance', priority: '0.8', changefreq: 'monthly' },
  { path: '/fort-lauderdale-health-insurance', priority: '0.8', changefreq: 'monthly' },
  { path: '/st-petersburg-health-insurance', priority: '0.8', changefreq: 'monthly' },
  { path: '/moving-from-new-jersey-to-florida-health-insurance', priority: '0.8', changefreq: 'monthly' },
  { path: '/moving-from-california-to-florida-covered-california', priority: '0.8', changefreq: 'monthly' },
  { path: '/space-coast-health-insurance', priority: '0.8', changefreq: 'monthly' },
  { path: '/affordable', priority: '0.8', changefreq: 'monthly' },
  { path: '/advisor', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.5', changefreq: 'yearly' },
  { path: '/contact', priority: '0.5', changefreq: 'yearly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/Terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/Privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/Licensing', priority: '0.3', changefreq: 'yearly' },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Fetch all published blog posts (paginate to be safe)
    let allPosts = [];
    let offset = 0;
    const pageSize = 200;
    let hasMore = true;
    while (hasMore) {
      const batch = await base44.asServiceRole.entities.BlogPost.filter(
        { status: 'published' },
        '-published_date',
        pageSize
      );
      allPosts = allPosts.concat(batch);
      hasMore = batch.length === pageSize;
      if (hasMore) offset += pageSize;
    }

    const urls = [];

    // Static routes
    for (const route of STATIC_ROUTES) {
      urls.push(`  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
    }

    // Individual blog posts
    for (const post of allPosts) {
      const lastmod = post.published_date || post.updated_date || new Date().toISOString().split('T')[0];
      urls.push(`  <url>
    <loc>${BASE_URL}/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}