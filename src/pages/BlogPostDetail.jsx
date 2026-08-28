import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Newspaper, Calendar, Phone } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { categoryConfig } from '@/lib/blogCategories';
import SiteHeader from '@/components/shared/SiteHeader';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CarrierLogos from '@/components/landing/CarrierLogos';

const markdownComponents = {
  h1: ({ children }) => <h1 className="text-2xl font-bold text-navy font-heading mt-8 mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-bold text-navy font-heading mt-7 mb-3 scroll-mt-24" id={typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined}>{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-bold text-navy font-heading mt-6 mb-2 scroll-mt-24" id={typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined}>{children}</h3>,
  p: ({ children }) => <p className="text-navy-soft leading-relaxed mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside text-navy-soft mb-4 space-y-1.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside text-navy-soft mb-4 space-y-1.5">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-navy">{children}</strong>,
  a: (props) => <a className="text-primary underline hover:text-primary-deep" {...props} />,
  blockquote: ({ children }) => <blockquote className="border-l-4 border-accent bg-sand pl-5 pr-4 py-4 italic text-navy-soft my-5">{children}</blockquote>,
  hr: () => <hr className="border-sand-deep my-6" />,
};

// Inject JSON-LD structured data for Google rich results (Article + FAQPage schema)
function useSeoSchema(post) {
  useEffect(() => {
    if (!post) return;

    // Set document title
    document.title = post.title;

    // Set or update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', post.meta_description || post.excerpt || '');

    // Build JSON-LD structured data
    const url = `https://getcoveredfl.com/blog/${post.slug}`;
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.meta_description || post.excerpt,
      datePublished: post.published_date,
      author: {
        '@type': 'Organization',
        name: post.author || 'HealthLink Insurance Agency',
      },
      publisher: {
        '@type': 'Organization',
        name: 'GetCoveredFL',
        url: 'https://getcoveredfl.com',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      keywords: post.focus_keyword || '',
    };

    const schemas = [articleSchema];

    // Add FAQ schema if faq_content exists — powers Google featured snippets
    if (post.faq_content) {
      const faqPairs = [];
      const lines = post.faq_content.split('\n');
      let currentQ = null;
      let currentA = [];
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('###')) {
          if (currentQ && currentA.length) {
            faqPairs.push({ q: currentQ, a: currentA.join(' ').trim() });
          }
          currentQ = trimmed.replace(/^#+\s*/, '').replace(/^Q:?\s*/i, '');
          currentA = [];
        } else if (currentQ && trimmed) {
          currentA.push(trimmed);
        }
      }
      if (currentQ && currentA.length) {
        faqPairs.push({ q: currentQ, a: currentA.join(' ').trim() });
      }
      if (faqPairs.length) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqPairs.map(p => ({
            '@type': 'Question',
            name: p.q,
            acceptedAnswer: { '@type': 'Answer', text: p.a },
          })),
        });
      }
    }

    // Remove any existing schema script
    const existing = document.getElementById('blog-jsonld');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = 'blog-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('blog-jsonld');
      if (el) el.remove();
    };
  }, [post]);
}

export default function BlogPostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    base44.entities.BlogPost.filter({ slug, status: 'published' }, '-published_date', 1)
      .then(results => setPost(results[0] || null))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  useSeoSchema(post);

  const cat = post ? (categoryConfig[post.category] || categoryConfig.general) : null;
  const CatIcon = cat?.icon;

  return (
    <div className="min-h-screen bg-sand pb-20 md:pb-0">
      <SiteHeader variant="light" />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-sand-deep border-t-primary rounded-full animate-spin" />
        </div>
      ) : !post ? (
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-20 text-center">
          <Newspaper className="w-12 h-12 text-sand-deep mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-navy mb-3 font-heading">Post Not Found</h1>
          <p className="text-navy-soft mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-2xl hover:bg-primary-deep transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      ) : (
        <>
          <section className="relative overflow-hidden bg-navy text-white border-b border-accent/50">
            <div className="absolute top-0 inset-x-0 h-px bg-accent/60" />
            <div className="relative max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-14 md:pt-16 md:pb-20">
              <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> All Posts
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 border-l-2 border-accent pl-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {CatIcon && <CatIcon className="w-3.5 h-3.5" />} {cat.label}
                </span>
                <span className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Calendar className="w-4 h-4" /> {moment(post.published_date).format('MMMM D, YYYY')}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight font-heading text-balance">
                {post.title}
              </h1>
            </div>
          </section>

          <CarrierLogos />

          <article className="max-w-3xl mx-auto my-10 md:my-16 px-7 sm:px-10 py-10 md:py-14 bg-white border-t-4 border-accent">
            <ReactMarkdown components={markdownComponents}>
              {post.content}
            </ReactMarkdown>

            {post.faq_content && (
              <div className="mt-10 pt-8 border-t border-sand-deep/40">
                <h2 className="text-xl font-bold text-navy font-heading mb-5">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <ReactMarkdown components={markdownComponents}>
                    {post.faq_content}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-sand-deep/40">
              <div className="bg-navy border-t-2 border-accent p-6 text-center">
                <h3 className="text-lg font-bold text-white font-heading mb-2">Ready to find your plan?</h3>
                <p className="text-white/70 text-sm mb-4">Get free quotes from licensed Florida agents in minutes.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/GetCovered" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    Get Free Quotes
                  </Link>
                  <a href="tel:+18556345343" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    <Phone className="w-4 h-4" /> (855) 634-5343
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link to="/blog" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-2xl hover:bg-primary-deep transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
            </div>
          </article>
        </>
      )}

      <Footer />
      <MobileCallBar />
    </div>
  );
}