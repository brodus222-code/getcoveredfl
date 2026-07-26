import React from 'react';
import LegalLayout from '@/components/shared/LegalLayout';

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The terms and conditions governing your use of GetCoveredFL.com."
      lastUpdated="July 2026"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">1. Acceptance of Terms</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            By accessing or using GetCoveredFL.com (the "Website"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Website. These Terms constitute a legally binding agreement between you and HealthLink Insurance Agency LLC ("HealthLink," "we," "us," or "our").
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">2. Description of Services</h2>
          <p className="text-sm text-navy-soft leading-relaxed mb-3">
            HealthLink Insurance Agency LLC is an independent, licensed insurance agency. Through this Website, we help Florida residents explore health insurance options, including ACA Marketplace plans, short-term coverage, and other health-related insurance products.
          </p>
          <p className="text-sm text-navy-soft leading-relaxed">
            We act as a broker/agent and may connect you with licensed insurance agents who can assist you with enrollment. We do not underwrite insurance policies ourselves; policies are issued by third-party insurance carriers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">3. Not a Government Agency</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            This Website is not affiliated with, endorsed by, or connected to Healthcare.gov, the Centers for Medicare & Medicaid Services (CMS), or any federal or state government agency. We are an independent licensed insurance agency. For official Marketplace enrollment, you may visit Healthcare.gov directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">4. Lead Generation & Contact Authorization</h2>
          <p className="text-sm text-navy-soft leading-relaxed mb-3">
            By submitting your contact information through our quote forms, callback requests, or other Website features, you expressly authorize HealthLink Insurance Agency LLC and its licensed agents to contact you via phone, email, text message, or other methods regarding health insurance options.
          </p>
          <p className="text-sm text-navy-soft leading-relaxed">
            You acknowledge that providing your phone number constitutes prior express consent to receive calls and text messages, including those made using an automatic telephone dialing system or artificial/prerecorded voice, for the purpose of discussing insurance products and services. You may opt out of communications at any time by replying "STOP" to text messages or requesting removal by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">5. Insurance Licensing</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            HealthLink Insurance Agency LLC is a licensed insurance agency. Our Florida license number is L131967, and our National Producer Number (NPN) is 21554495. Our Agent of Record, Nick Loucks, holds Florida license number G233885 (NPN: 21137267). For full licensing details, please visit our <a href="/Licensing" className="text-primary font-semibold underline hover:text-primary-deep">Licensing page</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">6. No Guarantee of Coverage or Rates</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            While we strive to provide accurate and up-to-date information, we do not guarantee that any specific insurance plan, premium rate, subsidy, or coverage option will be available to you. Insurance eligibility, rates, and plan availability are determined solely by the insurance carriers and applicable government programs. Any estimates or quotes provided are informational only and subject to final underwriting and verification.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">7. Intellectual Property</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            All content on this Website, including text, graphics, logos, and design elements, is the property of HealthLink Insurance Agency LLC or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any Website content without our prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">8. Third-Party Links</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            This Website may contain links to third-party websites, including insurance carrier sites and government resources. We are not responsible for the content, privacy practices, or accuracy of these external sites. Accessing third-party links is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">9. Limitation of Liability</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            To the fullest extent permitted by law, HealthLink Insurance Agency LLC shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or reliance on this Website or any information provided through it. Your use of the Website is at your sole risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">10. Changes to These Terms</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page with a revised "Last updated" date. Your continued use of the Website after any changes constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">11. Governing Law</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the State of Illinois, without regard to its conflict of laws provisions. Any disputes arising under these Terms shall be resolved in the courts located in Sangamon County, Illinois.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-navy mb-3">12. Contact Us</h2>
          <p className="text-sm text-navy-soft leading-relaxed">
            If you have questions about these Terms, please contact us at:
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