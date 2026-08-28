import React from 'react';
import LegalLayout from '@/components/shared/LegalLayout';

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How HealthLink Insurance Agency LLC collects, uses, and protects your personal information."
      lastUpdated="July 2026"
    >
      <div className="space-y-6">
        <section className="border-l-2 border-accent pl-5">
          <h2 className="text-xl font-bold font-heading text-navy mb-3">1. Information We Collect</h2>
          <p className="text-sm text-navy-soft leading-relaxed mb-3">
            When you use our Website or request a quote, we may collect the following types of information:
          </p>
          <ul className="text-sm text-navy-soft leading-relaxed space-y-1.5 list-disc pl-5 mb-3">
            <li><span className="font-semibold text-navy">Contact information:</span> Name, phone number, email address, and ZIP code.</li>
            <li><span className="font-semibold text-navy">Household information:</span> Household size, ages of members, and estimated annual income.</li>
            <li><span className="font-semibold text-navy">Coverage preferences:</span> Type of coverage sought, current insurance status, prescription needs, and network preferences.</li>
            <li><span className="font-semibold text-navy">Technical data:</span> IP address, browser type, and usage data collected through cookies and similar technologies.</li>
          </ul>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2 className="text-xl font-bold font-heading text-navy mb-3">2. How We Use Your Information</h2>
          <p className="text-sm text-navy-soft leading-relaxed mb-3">
            We use the information we collect to:
          </p>
          <ul className="text-sm text-navy-soft leading-relaxed space-y-1.5 list-disc pl-5 mb-3">
            <li>Match you with licensed insurance agents who can assist with your health insurance needs.</li>
            <li>Provide quotes, plan comparisons, and enrollment assistance.</li>
            <li>Contact you regarding your inquiry, as authorized under our Terms of Service.</li>
            <li>Comply with legal and regulatory requirements applicable to licensed insurance agencies.</li>
            <li>Improve our Website and services.</li>
          </ul>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2 className="text-xl font-bold font-heading text-navy mb-3">3. How We Share Your Information</h2>
          <p className="text-sm text-navy-soft leading-relaxed mb-3">
            We do not sell your personal information. We may share your information in the following circumstances:
          </p>
          <ul className="text-sm text-navy-soft leading-relaxed space-y-1.5 list-disc pl-5 mb-3">
            <li><span className="font-semibold text-navy">Insurance carriers and partners:</span> To obtain quotes and facilitate enrollment, we may share your information with licensed insurance carriers and our authorized partners.</li>
            <li><span className="font-semibold text-navy">Licensed agents:</span> Your information may be shared with agents within our agency or affiliated agents who can assist you.</li>
            <li><span className="font-semibold text-navy">Service providers:</span> Third parties that support our operations (e.g., technology, analytics) under appropriate confidentiality agreements.</li>
            <li><span className="font-semibold text-navy">Legal compliance:</span> When required by law, court order, or to protect our legal rights.</li>
          </ul>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2 className="text-xl font-bold font-heading text-navy mb-3">4. Cookies & Tracking Technologies</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            Our Website uses cookies and similar tracking technologies to enhance user experience, analyze traffic, and track marketing conversions. You can control cookies through your browser settings, but disabling them may affect Website functionality. We may also use third-party analytics and advertising tags (e.g., Microsoft UET) to measure campaign performance.
          </p>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2 className="text-xl font-bold font-heading text-navy mb-3">5. Data Security</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            We implement reasonable technical, administrative, and physical safeguards to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2 className="text-xl font-bold font-heading text-navy mb-3">6. Your Rights</h2>
          <p className="text-sm text-navy-soft leading-relaxed mb-3">
            Depending on your state of residence, you may have the right to:
          </p>
          <ul className="text-sm text-navy-soft leading-relaxed space-y-1.5 list-disc pl-5 mb-3">
            <li>Access the personal information we have collected about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your personal information, subject to legal retention requirements.</li>
            <li>Opt out of the sale or sharing of your personal information.</li>
            <li>Withdraw consent for communications at any time.</li>
          </ul>
          <p className="text-sm text-navy-soft leading-relaxed">
            To exercise any of these rights, please contact us at <a href="mailto:contact@getcoveredfl.com" className="text-primary underline hover:text-primary-deep">contact@getcoveredfl.com</a>.
          </p>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2 className="text-xl font-bold font-heading text-navy mb-3">7. Children's Privacy</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            Our Website is not directed to individuals under 18 years of age, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can take appropriate action.
          </p>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2 className="text-xl font-bold font-heading text-navy mb-3">8. Do Not Call / Opt-Out</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            You may opt out of marketing communications at any time by replying "STOP" to text messages, clicking "unsubscribe" in emails, or contacting us directly. We respect all applicable federal and state telemarketing laws, including the Telephone Consumer Protection Act (TCPA) and the National Do Not Call Registry.
          </p>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2 className="text-xl font-bold font-heading text-navy mb-3">9. Changes to This Policy</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "Last updated" date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="border-l-2 border-accent pl-5">
          <h2 className="text-xl font-bold font-heading text-navy mb-3">10. Contact Us</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            If you have questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="mt-2 text-sm text-navy-soft leading-relaxed">
            <p className="font-semibold text-navy">HealthLink Insurance Agency LLC</p>
            <p>Email: <a href="mailto:contact@getcoveredfl.com" className="text-primary underline hover:text-primary-deep">contact@getcoveredfl.com</a></p>
            <p>Phone: <a href="tel:+18556345343" className="text-primary underline hover:text-primary-deep">(855) 634-5343</a></p>
            <p>2501 Chatham Rd, Suite R, Springfield, IL 62704</p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}