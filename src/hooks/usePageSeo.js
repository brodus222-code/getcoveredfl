import { useEffect } from 'react';

// Sets the page title, meta description, and FAQ schema for SEO landing pages.
export default function usePageSeo({ title, description, faqs }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'page-faq-jsonld';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [title, description, faqs]);
}