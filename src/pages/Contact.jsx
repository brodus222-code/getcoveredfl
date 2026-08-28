import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, CheckCircle } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-sand">
      <SiteHeader />

      <main>
        {/* Hero */}
        <div className="text-center bg-navy border-b border-accent/50 px-6 py-14 md:py-20 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Have a question about your coverage options? We're here to help — reach out any time.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-5 sm:px-6 pb-12 md:pb-20">
        {/* Contact methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a
            href="tel:+18556345343"
            className="bg-white border-t-2 border-accent p-6 text-center hover:bg-accent-soft transition-colors"
          >
            <div className="w-12 h-12 bg-navy flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold font-heading text-navy mb-1">Call Us</h3>
            <p className="text-primary font-semibold">(855) 634-5343</p>
            <p className="text-sm text-navy-soft mt-1">Mon–Sat</p>
          </a>

          <a
            href="mailto:contact@getcoveredfl.com"
            className="bg-white border-t-2 border-accent p-6 text-center hover:bg-accent-soft transition-colors"
          >
            <div className="w-12 h-12 bg-navy flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold font-heading text-navy mb-1">Email Us</h3>
            <p className="text-primary font-semibold text-sm break-all">contact@getcoveredfl.com</p>
            <p className="text-sm text-navy-soft mt-1">We reply within 24 hrs</p>
          </a>

          <div className="bg-white border-t-2 border-accent p-6 text-center">
            <div className="w-12 h-12 bg-navy flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold font-heading text-navy mb-1">Our Office</h3>
            <p className="text-sm text-navy-soft">2501 Chatham Rd, Suite R</p>
            <p className="text-sm text-navy-soft">Springfield, IL 62704</p>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white border-t-4 border-accent p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-heading text-navy">Send Us a Message</h2>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-turquoise-soft flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-turquoise" />
              </div>
              <h3 className="text-xl font-bold font-heading text-navy mb-2">Message Sent!</h3>
              <p className="text-navy-soft">
                Thanks for reaching out. A licensed agent will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-sand-deep bg-sand/50 focus:outline-none focus:ring-2 focus:ring-primary text-navy"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-sand-deep bg-sand/50 focus:outline-none focus:ring-2 focus:ring-primary text-navy"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-sand-deep bg-sand/50 focus:outline-none focus:ring-2 focus:ring-primary text-navy resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep text-white font-bold py-4 rounded-xl shadow-glow-primary transition-all hover:-translate-y-0.5"
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
        </div>
      </main>

      <Footer />
      <MobileCallBar />
    </div>
  );
}