import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';
import { Newspaper, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { categoryConfig, categories } from '@/lib/blogCategories';
import SiteHeader from '@/components/shared/SiteHeader';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    base44.entities.BlogPost.filter({ status: 'published' }, '-published_date', 50)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-deep to-navy text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-turquoise/25 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 pt-12 pb-16 md:pt-20 md:pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Newspaper className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white/90">Insurance News & Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.05] mb-5 tracking-tight font-heading text-balance">
            Florida Insurance <span className="text-accent">News & Updates</span>
          </h1>
          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Open enrollment deadlines, new plan options, and tips to help you stay covered.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <div className="bg-white border-b border-sand-deep/40">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-4 flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-sand text-navy-soft hover:bg-sand-deep/60'
              }`}
            >
              {cat === 'all' ? 'All Posts' : categoryConfig[cat]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <section className="py-12 md:py-16 px-5 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-sand-deep border-t-primary rounded-full animate-spin" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-12 h-12 text-sand-deep mx-auto mb-4" />
              <p className="text-navy-soft">No posts found. Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post, i) => {
                const cat = categoryConfig[post.category] || categoryConfig.general;
                const CatIcon = cat.icon;
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                  >
                    <Link to={`/blog/${post.slug}`} className="block h-full">
                      <div className="bg-white rounded-2xl border border-sand-deep/40 overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                        <div className={`h-40 bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                          <CatIcon className="w-12 h-12 text-white/80" />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <span className={`inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full ${cat.badge} mb-3`}>
                            {cat.label}
                          </span>
                          <h3 className="text-lg font-bold text-navy font-heading mb-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-sm text-navy-soft leading-relaxed mb-4 flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-navy-soft/70 pt-3 border-t border-sand-deep/40">
                            <span>{moment(post.published_date).format('MMM D, YYYY')}</span>
                            <span className="flex items-center gap-1 text-primary font-semibold">
                              Read more <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <MobileCallBar />
    </div>
  );
}