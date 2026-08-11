import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Users, Award, ArrowRight } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';

export default function About() {
  return (
    <div className="min-h-screen bg-sand">
      <SiteHeader />

      <main className="max-w-4xl mx-auto px-5 sm:px-6 py-12 md:py-20">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-navy mb-4">
            About GetCoveredFL
          </h1>
          <p className="text-lg text-navy-soft max-w-2xl mx-auto">
            Helping Florida residents find affordable health insurance — one quote at a time.
          </p>
        </div>

        {/* What we do */}
        <section className="bg-white rounded-3xl shadow-soft p-8 md:p-12 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-navy">What We Do</h2>
          </div>
          <p className="text-navy-soft leading-relaxed mb-4">
            GetCoveredFL is a free online quoting and lead management platform built to make finding health insurance in Florida simple and stress-free. We help individuals, families, and self-employed Floridians compare ACA Marketplace plans, short-term coverage, and private PPO options side by side. Our guided quote wizard walks you through a few quick questions — ZIP code, household size, ages, and estimated income — then matches you with licensed agents who can walk you through your options and help you enroll.
          </p>
          <p className="text-navy-soft leading-relaxed">
            Beyond quoting, we provide educational resources through our coverage guide and regularly published insurance news blog, so you can make informed decisions about your health coverage. Everything we offer is completely free to use, with no obligation to enroll.
          </p>
        </section>

        {/* Who it's for */}
        <section className="bg-white rounded-3xl shadow-soft p-8 md:p-12 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-navy">Who It's For</h2>
          </div>
          <p className="text-navy-soft leading-relaxed mb-4">
            GetCoveredFL is designed for Florida residents who need health insurance but aren't sure where to start. Whether you're uninsured and looking for your first plan, self-employed and shopping for private coverage, transitioning off COBRA, or simply wanting to explore more affordable alternatives to your current plan, our platform and licensed agents are here to help. We serve individuals and families across all of Florida, from Miami to Jacksonville to the Panhandle.
          </p>
          <p className="text-navy-soft leading-relaxed">
            If you're navigating a qualifying life event — like losing employer coverage, getting married, or moving — we can help you understand your special enrollment options and find a plan that fits your budget and needs.
          </p>
        </section>

        {/* Who builds it */}
        <section className="bg-white rounded-3xl shadow-soft p-8 md:p-12 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-turquoise-soft flex items-center justify-center">
              <Award className="w-5 h-5 text-turquoise" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-navy">Who Builds It</h2>
          </div>
          <p className="text-navy-soft leading-relaxed mb-4">
            GetCoveredFL is built and operated by HealthLink Insurance Agency LLC, an independent licensed Florida insurance agency (FL Lic# L131967, NPN# 21554495). Our Agent of Record, Nick Loucks (FL Lic# G233885, NPN# 21137267), leads a team of licensed agents dedicated to helping Floridians find the right coverage at the right price. We are not affiliated with Healthcare.gov, CMS, or any government agency — we are an independent agency that works directly with major insurance carriers including Blue Cross Blue Shield, UnitedHealthcare, Aetna, and Cigna to bring you a broad selection of plans.
          </p>
          <p className="text-navy-soft leading-relaxed">
            Our mission is simple: make quality health insurance accessible, understandable, and affordable for every Florida resident who needs it.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary to-primary-deep rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4">
            Ready to find your plan?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Get a free quote in minutes — no obligation, no cost. Talk to a licensed Florida agent today.
          </p>
          <Link
            to="/Quote"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-4 rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5"
          >
            Get a Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      <Footer />
      <MobileCallBar />
    </div>
  );
}