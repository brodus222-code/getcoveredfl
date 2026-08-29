import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

// Publishes a newly created BlogPost to the agency's Facebook Page.
// Triggered by the "Share Blog Post to Facebook" workflow on BlogPost create.
// Uses the shared facebook_pages connector (builder's account).
//
// Auth: publishing to the official Facebook Page is a privileged side effect,
// so only admin users (including the workflow engine, which runs as admin) or
// callers presenting the shared WORKFLOW_SECRET may invoke this endpoint.
// Non-admin app users (agents) are rejected.

const BASE_URL = 'https://getcoveredfl.com';
const FB_API = 'https://graph.facebook.com/v25.0';
const TARGET_PAGE_ID = '1208779105662876';
const SOCIAL_IMAGE_URL = 'https://media.base44.com/images/public/696f51421917c989be527824/6cf98ad11_generated_image.png';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));

    // Trust-boundary check: admin user (workflow engine runs as admin) or
    // the shared server-to-server WORKFLOW_SECRET.
    const user = await base44.auth.me().catch(() => null);
    const isAdmin = user && user.role === 'admin';
    const workflowSecret = secrets.get("WORKFLOW_SECRET");
    const headerSecret = req.headers.get("x-workflow-secret");
    const bodySecret = body && body.workflow_secret;
    const secretOk = !!workflowSecret && (headerSecret === workflowSecret || bodySecret === workflowSecret);
    if (!isAdmin && !secretOk) {
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

    // List managed Pages and select the official Get Covered Florida Page.
    const pagesRes = await fetch(`${FB_API}/me/accounts?fields=id,name,access_token`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    const pagesData = await pagesRes.json();
    const page = pagesData.data?.find(({ id }) => id === TARGET_PAGE_ID);
    if (!page) {
      return Response.json({ error: 'Get Covered Florida Facebook Page is not available to the connected account' }, { status: 400 });
    }

    const pageToken = page.access_token;
    const pageId = page.id;

    // Build the Facebook post content
    const blogUrl = `${BASE_URL}/blog/${post.slug}`;
    const message = `${post.title}\n\n${post.excerpt}\n\nRead the full article: ${blogUrl}`;

    // Upload the social image directly so Facebook cannot reuse a cached link thumbnail.
    const publishRes = await fetch(`${FB_API}/${pageId}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: SOCIAL_IMAGE_URL,
        caption: message,
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