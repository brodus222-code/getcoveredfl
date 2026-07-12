import React from 'react';
import { Building2, User, MapPin, Mail, Phone, Shield, BadgeCheck, FileText } from 'lucide-react';
import LegalLayout from '@/components/shared/LegalLayout';

export default function Licensing() {
  return (
    <LegalLayout
      title="Licensing & Compliance"
      subtitle="Official business, licensing, and compliance information for HealthLink Insurance Agency LLC."
      lastUpdated="July 2026"
    >
      <div className="space-y-6">
        {/* Agency Overview */}
        <div className="bg-primary-soft rounded-xl p-6 border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading text-navy mb-1">HealthLink Insurance Agency LLC</h2>
              <p className="text-sm text-navy-soft leading-relaxed mb-3">
                An Illinois corporation operating as an independent, licensed insurance agency serving Florida residents.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs font-semibold text-navy border border-sand-deep">
                  <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                  FL License #: L131967
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs font-semibold text-navy border border-sand-deep">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  NPN #: 21554495
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent of Record */}
        <div className="border border-sand-deep rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold font-heading text-navy mb-1">Agent of Record</h3>
              <p className="text-lg font-semibold text-navy mb-3">Nick Loucks</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-sand rounded-lg px-4 py-3">
                  <p className="text-xs text-navy-soft uppercase tracking-wider mb-1">Florida License #</p>
                  <p className="text-sm font-semibold text-navy">G233885</p>
                </div>
                <div className="bg-sand rounded-lg px-4 py-3">
                  <p className="text-xs text-navy-soft uppercase tracking-wider mb-1">National Producer # (NPN)</p>
                  <p className="text-sm font-semibold text-navy">21137267</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-sand-deep rounded-xl p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold font-heading text-navy">Main Office</h3>
            </div>
            <p className="text-sm text-navy-soft leading-relaxed">
              2501 Chatham Rd, Suite R<br />
              Springfield, IL 62704
            </p>
          </div>

          <div className="border border-sand-deep rounded-xl p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <MapPin className="w-5 h-5 text-accent" />
              <h3 className="text-base font-bold font-heading text-navy">Florida Office</h3>
            </div>
            <p className="text-sm text-navy-soft leading-relaxed">
              1980 N Atlantic Ave, Suite 23032<br />
              Cocoa Beach, FL 32931
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-navy rounded-xl p-6 text-white">
          <h3 className="text-base font-bold font-heading mb-4">Contact</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="mailto:contact@getcoveredfl.com" className="flex items-center gap-3 hover:text-accent transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider">Email</p>
                <p className="text-sm font-semibold">contact@getcoveredfl.com</p>
              </div>
            </a>
            <a href="tel:+18555925924" className="flex items-center gap-3 hover:text-accent transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider">Phone</p>
                <p className="text-sm font-semibold">(855) 592-5924</p>
              </div>
            </a>
          </div>
        </div>

        {/* Compliance Statements */}
        <div className="bg-sand rounded-xl p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold font-heading text-navy">Compliance Disclosures</h3>
          </div>
          <ul className="space-y-3 text-sm text-navy-soft leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span>This website is not affiliated with, endorsed by, or connected to Healthcare.gov, the Centers for Medicare & Medicaid Services (CMS), or any federal or state government agency.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span>HealthLink Insurance Agency LLC is an independent licensed insurance agency. Insurance products are underwritten by third-party insurance carriers.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span>All licensed agents are properly credentialed under applicable Florida Department of Financial Services regulations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span>Your personal information is handled in accordance with our <a href="/Privacy" className="text-primary font-semibold underline hover:text-primary-deep">Privacy Policy</a> and applicable state and federal laws.</span>
            </li>
          </ul>
        </div>
      </div>
    </LegalLayout>
  );
}