import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

// Publishes a newly created BlogPost to the agency's Facebook Page.
// Triggered by the "Share Blog Post to Facebook" workflow on BlogPost create.
// Uses the shared facebook_pages connector (builder's account).
//
// Auth: publishing to the official Facebook Page is a privileged side effect,
// so this endpoint MUST NOT be callable by app users. Only the platform
// workflow engine may invoke it, authenticated via the shared WORKFLOW_SECRET.

const BASE_URL = 'https://getcoveredfl.com';
const FB_API = 'https://graph.facebook.com/v25.0';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));

    // Trust-boundary check: require either an authenticated platform context
    // (workflow engine) or the shared server-to-server WORKFLOW_SECRET.
    const workflowSecret = secrets.get("WORKFLOW_SECRET");
    const headerSecret = req.headers.get("x-workflow-secret");
    const bodySecret = body && body.workflow_secret;
    const secretOk = !!workflowSecret && (headerSecret === workflowSecret || bodySecret === workflowSecret);
    if (!secretOk) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const postId = body && (body.post_id || (body.data && body.data.post_id));
    if (!postId) {
      return Response.json({ error: 'post_id is required' }, { status: 400 });
    }

    // Fetch the blog post from the DB (service role)
    const post = await base44.asServiceRole.entities.BlogPost.get(postId);
    if (!post) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Only share published posts
    if (post.status && post.status !== 'published') {
      return Response.json({ ok: true, skipped: true, reason: 'not published' });
    }

    // Get the Facebook user access token from the shared connector
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('facebook_pages');

    // List managed Pages and grab the first one's Page access token
    const pagesRes = await fetch(`${FB_API}/me/accounts?fields=id,name,access_token`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    const pagesData = await pagesRes.json();
    if (!pagesData.data || pagesData.data.length === 0) {
      return Response.json({ error: 'No Facebook Pages found for this account' }, { status: 400 });
    }

    const page = pagesData.data[0];
    const pageToken = page.access_token;
    const pageId = page.id;

    // Build the Facebook post content
    const blogUrl = `${BASE_URL}/blog/${post.slug}`;
    const message = `${post.title}\n\n${post.excerpt}\n\nRead the full article: ${blogUrl}`;

    // Publish to the Page feed
    const publishRes = await fetch(`${FB_API}/${pageId}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        link: blogUrl,
        access_token: pageToken,
      }),
    });

    const publishData = await publishRes.json();
    if (!publishRes.ok) {
      console.log('Facebook publish error:', JSON.stringify(publishData));
      return Response.json({ error: 'Facebook publish failed', details: publishData }, { status: 502 });
    }

    return Response.json({
      ok: true,
      post_id: publishData.id,
      page_name: page.name,
      blog_url: blogUrl,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}