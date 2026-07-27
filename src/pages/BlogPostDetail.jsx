import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Newspaper, Calendar } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { categoryConfig } from '@/lib/blogCategories';
import SiteHeader from '@/components/shared/SiteHeader';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CarrierLogos from '@/components/landing/CarrierLogos';

const markdownComponents = {
  h1: ({ children }) => <h1 className="text-2xl font-bold text-navy font-heading mt-8 mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-bold text-navy font-heading mt-7 mb-3">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-bold text-navy font-heading mt-6 mb-2">{children}</h3>,
  p: ({ children }) => <p className="text-navy-soft leading-relaxed mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside text-navy-soft mb-4 space-y-1.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside text-navy-soft mb-4 space-y-1.5">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-navy">{children}</strong>,
  a: (props) => <a className="text-primary underline hover:text-primary-deep" {...props} />,
  blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic text-navy-soft my-5">{children}</blockquote>,
  hr: () => <hr className="border-sand-deep my-6" />,
};

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

  const cat = post ? (categoryConfig[post.category] || categoryConfig.general) : null;
  const CatIcon = cat?.icon;

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
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
          <section className={`relative overflow-hidden bg-gradient-to-br ${cat.gradient} text-white`}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
            </div>
            <div className="relative max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-14 md:pt-16 md:pb-20">
              <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> All Posts
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
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

          <article className="max-w-3xl mx-auto px-5 sm:px-6 py-10 md:py-16">
            <ReactMarkdown components={markdownComponents}>
              {post.content}
            </ReactMarkdown>

            <div className="mt-10 pt-8 border-t border-sand-deep/40">
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