import React from 'react';
import { Sparkles } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { DemoNotice } from '../components/DemoNotice';
import { useCompany } from '../components/ThemeContext';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const COMPANY_INFO = useCompany();
  return (
    <div id="privacy-policy-page" className="pt-24 pb-20 bg-canvas text-stone-200">
      <SeoHead
        title="Privacy Policy | Coliseum Concrete & Interlock"
        description="How Coliseum Concrete & Interlock handles contact details, quote requests, and site photos submitted through this website."
        canonicalPath="/privacy"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.2em] text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-2 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-stone-400 text-sm mt-3">Last updated: August 17, 2026</p>
        </div>

        <DemoNotice />

        <div className="space-y-8 text-sm text-stone-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">1. Who we are</h2>
            <p>
              {COMPANY_INFO.name} (“we”, “us”) uses this website to share information about residential concrete and
              interlock work in Ottawa and to receive quote and contact requests.
            </p>
            <p>Business address: {COMPANY_INFO.fullAddress}.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">2. Information we collect</h2>
            <p>When you request a quote or send a message, you may provide:</p>
            <ul className="list-disc pl-5 space-y-1 text-stone-400">
              <li>Name, phone number, and email address</li>
              <li>Project address, neighbourhood, or postal code</li>
              <li>Project type, size, timeline, and notes</li>
              <li>Optional photos of the work area</li>
            </ul>
            <p>
              The site may also collect ordinary technical data needed to run the page, such as browser type and pages
              visited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">3. How we use it</h2>
            <p>We use this information to:</p>
            <ul className="list-disc pl-5 space-y-1 text-stone-400">
              <li>Respond to quote and contact requests</li>
              <li>Schedule on-site visits and prepare written estimates</li>
              <li>Follow up by the method you prefer (phone, email, or either)</li>
            </ul>
            <p>We do not sell your information or share it for unrelated marketing.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">4. Sharing</h2>
            <p>
              We may share details with trades, material suppliers, or service providers only as needed to price or
              complete your project, or when required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">5. Retention</h2>
            <p>
              We keep quote and project records for as long as needed to serve the request, complete the work, and meet
              ordinary business and legal record-keeping needs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">6. Your choices</h2>
            <p>
              You can contact us through the{' '}
              <button type="button" onClick={() => onNavigate('/contact')} className="text-accent hover:underline">
                Contact
              </button>{' '}
              page to ask what information we hold, request a correction, or ask us to stop using your details for
              follow-up (except where we still need them for an active project or legal obligation).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-white">7. Changes</h2>
            <p>
              We may update this policy from time to time. The date at the top of this page shows the latest version.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
