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
  title: `Privacy Policy | ${COMPANY_NAME}`,
  description: `Privacy Policy for ${COMPANY_NAME}.`,
};

export default function PrivacyPage() {
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
        <article className="container-wide max-w-3xl prose-content">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#666] mb-12">Last updated: {lastUpdated}</p>

          <Section title="1. Introduction">
            <p>
              {COMPANY_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates this
              website to help powersports dealerships understand and recover lost revenue from
              follow-up failures. This Privacy Policy explains what information we collect, how we
              use it, and the choices you have.
            </p>
            <p>
              By using this site or submitting any form on it, you consent to the practices
              described in this policy.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following types of information:</p>
            <ul>
              <li>
                <strong>Information you give us.</strong> When you submit our lead form, we
                collect your first name and email address. We do not require any other personal
                information to use the calculator.
              </li>
              <li>
                <strong>Automatic information.</strong> When you visit the site, our hosting and
                analytics providers may automatically collect technical information such as your
                IP address, browser type, device type, referring URL, and pages visited. This is
                used to measure traffic and improve site performance.
              </li>
              <li>
                <strong>Cookies and similar technologies.</strong> We use cookies and similar
                technologies (including the Meta Pixel and other advertising tags) to measure
                marketing performance and personalize the experience. You can control cookies
                through your browser settings or our consent banner.
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Personalize the revenue calculator with your first name</li>
              <li>Send you the audit results and follow-up communications you requested</li>
              <li>Measure marketing performance and improve our advertising</li>
              <li>Detect, prevent, and address technical issues or fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. We do not use your
              information for any purpose unrelated to those listed above without first obtaining
              your consent.
            </p>
          </Section>

          <Section title="4. Sharing Your Information">
            <p>
              We share your information only with service providers that help us operate the
              site and run our business. These include:
            </p>
            <ul>
              <li>
                <strong>Hosting and infrastructure</strong> (e.g., Vercel) &mdash; to serve the
                site
              </li>
              <li>
                <strong>Analytics and advertising platforms</strong> (e.g., Meta, Google) &mdash;
                to measure traffic and ad performance
              </li>
              <li>
                <strong>Email and CRM tools</strong> &mdash; to deliver the audit results and
                follow up with you
              </li>
            </ul>
            <p>
              Each of these providers is contractually required to handle your data only for the
              purposes we authorize and to maintain appropriate security measures.
            </p>
            <p>
              We may also disclose your information if required by law, to enforce our Terms, or
              to protect the rights, safety, or property of {COMPANY_NAME} or others.
            </p>
          </Section>

          <Section title="5. Cookies and Tracking Technologies">
            <p>
              This site uses cookies and similar technologies to remember your preferences,
              measure traffic, and serve personalized advertising. You can manage your cookie
              preferences at any time through the consent banner shown on your first visit, or
              by adjusting your browser settings.
            </p>
            <p>
              Declining cookies will not prevent you from using the site, but some features
              (such as personalized ad measurement) may not function.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain your information for as long as necessary to provide the services you
              requested and to comply with our legal obligations. If you ask us to delete your
              data, we will do so within 30 days unless we are required to keep it for legal
              reasons.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>Depending on where you live, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#FF7404] hover:underline">
                {CONTACT_EMAIL}
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              This site is not directed to children under 16. We do not knowingly collect
              personal information from children. If you believe a child has provided us with
              personal information, please contact us and we will delete it.
            </p>
          </Section>

          <Section title="9. International Users">
            <p>
              {COMPANY_NAME} is based in {COMPANY_JURISDICTION}. If you access this site from
              outside the United States, please be aware that your information may be
              transferred to, stored, and processed in the United States, where our servers and
              service providers are located.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise
              the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to
              review this policy periodically.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have questions about this Privacy Policy, contact us at:</p>
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
      <div className="space-y-3 text-[15px] leading-relaxed text-white/70 [&_a]:text-[#FF7404] [&_a:hover]:underline [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-3">
        {children}
      </div>
    </section>
  );
}
