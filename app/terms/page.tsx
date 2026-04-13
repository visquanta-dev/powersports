import Link from 'next/link';
import Image from 'next/image';
import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  COMPANY_ADDRESS,
  COMPANY_JURISDICTION,
} from '../components/Footer';

export const metadata = {
  title: `Terms of Use | ${COMPANY_NAME}`,
  description: `Terms of Use for ${COMPANY_NAME}.`,
};

export default function TermsPage() {
  const lastUpdated = 'April 13, 2026';
  return (
    <div className="bg-[#050505] min-h-screen text-white/85 flex flex-col">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] py-4">
        <div className="container-wide flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/visquanta-logo.png"
              alt="VisQuanta"
              width={750}
              height={224}
              priority
              className="h-10 w-auto"
            />
          </Link>
          <Link href="/" className="text-xs text-[#888] hover:text-white transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>

      <main className="flex-1 py-16">
        <article className="container-wide max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Terms of Use
          </h1>
          <p className="text-sm text-[#666] mb-12">Last updated: {lastUpdated}</p>

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using this website (the &ldquo;Site&rdquo;), you agree to be bound
              by these Terms of Use and all applicable laws and regulations. If you do not agree
              with any of these terms, you must not use the Site.
            </p>
          </Section>

          <Section title="2. Use of the Site">
            <p>
              {COMPANY_NAME} grants you a limited, non-exclusive, non-transferable license to
              access and use the Site for your personal or business evaluation purposes. You may
              not:
            </p>
            <ul>
              <li>Use the Site for any unlawful purpose or in violation of these Terms</li>
              <li>
                Attempt to gain unauthorized access to any portion of the Site, server, or
                database
              </li>
              <li>
                Reproduce, duplicate, copy, sell, or resell any part of the Site without our
                prior written consent
              </li>
              <li>Use automated means (bots, scrapers) to access the Site</li>
              <li>
                Submit false, misleading, or fraudulent information through any form on the Site
              </li>
            </ul>
          </Section>

          <Section title="3. Lead Form & Communications">
            <p>
              When you submit your name and email through any form on this Site, you consent to
              receive communications from {COMPANY_NAME} related to the audit results, the
              calculator, and our services. You may opt out at any time by following the
              unsubscribe link in any email or by contacting us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#FF7404] hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="4. Revenue Calculator Disclaimer">
            <p>
              The Revenue Calculator on this Site provides illustrative estimates based on
              industry benchmarks and assumptions. The dollar figures shown are
              <em> not guarantees</em> of actual results. Your dealership&apos;s actual revenue,
              losses, or improvements will depend on many factors specific to your business,
              market, and execution.
            </p>
            <p>
              Nothing on this Site constitutes financial, legal, business, or investment advice.
              You should consult appropriate professionals before making any business decisions
              based on the information presented here.
            </p>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              All content on this Site &mdash; including text, graphics, logos, images, and
              software &mdash; is the property of {COMPANY_NAME} or its licensors and is
              protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              Brand logos shown in the trust strip on the home page belong to their respective
              owners and are displayed for illustrative purposes only. Their inclusion does not
              imply endorsement.
            </p>
          </Section>

          <Section title="6. Third-Party Links">
            <p>
              This Site may contain links to third-party websites or services. We do not control
              and are not responsible for the content, privacy policies, or practices of those
              third parties.
            </p>
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <p>
              The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
              basis. {COMPANY_NAME} makes no warranties, express or implied, about the
              Site&apos;s operation, accuracy, completeness, or fitness for any particular
              purpose. We do not warrant that the Site will be uninterrupted, error-free, or
              free of viruses or other harmful components.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, {COMPANY_NAME} and its affiliates,
              officers, employees, and agents will not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or related to your use
              of the Site, even if advised of the possibility of such damages.
            </p>
          </Section>

          <Section title="9. Indemnification">
            <p>
              You agree to indemnify and hold {COMPANY_NAME} harmless from any claims, damages,
              losses, or expenses (including reasonable legal fees) arising out of your use of
              the Site or your violation of these Terms.
            </p>
          </Section>

          <Section title="10. Changes to These Terms">
            <p>
              We may update these Terms from time to time. When we do, we will revise the
              &ldquo;Last updated&rdquo; date above. Your continued use of the Site after any
              changes constitutes acceptance of the new Terms.
            </p>
          </Section>

          <Section title="11. Governing Law">
            <p>
              These Terms are governed by the laws of the State of {COMPANY_JURISDICTION.split(',')[0]},
              without regard to its conflict of law principles. Any disputes arising out of or
              relating to these Terms or your use of the Site will be resolved exclusively in
              the state or federal courts located in Montgomery County, Texas.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>For questions about these Terms, contact us at:</p>
            <p>
              <strong>{COMPANY_NAME}</strong>
              <br />
              {COMPANY_ADDRESS.line1}
              <br />
              {COMPANY_ADDRESS.line2}, {COMPANY_ADDRESS.country}
              <br />
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#FF7404] hover:underline">
                {CONTACT_EMAIL}
              </a>
              <br />
              <a
                href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`}
                className="text-[#FF7404] hover:underline"
              >
                {CONTACT_PHONE}
              </a>
            </p>
          </Section>
        </article>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-black text-white mb-4 tracking-tight">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-white/70 [&_a]:text-[#FF7404] [&_a:hover]:underline [&_strong]:text-white [&_em]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-3">
        {children}
      </div>
    </section>
  );
}
