import Link from 'next/link';

export const COMPANY_NAME = 'Visquanta LLC';
export const CONTACT_EMAIL = 'info@visquanta.com';
export const CONTACT_PHONE = '+1 786-686-6554';
export const COMPANY_ADDRESS = {
  line1: '2001 Timberloch Place, Suite 500',
  line2: 'The Woodlands, TX 77380',
  country: 'USA',
};
export const COMPANY_JURISDICTION = 'Texas, United States';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#050505] py-10 mt-auto">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold text-white tracking-tight">{COMPANY_NAME}</p>
            <address className="text-xs text-[#888] not-italic leading-relaxed">
              {COMPANY_ADDRESS.line1}
              <br />
              {COMPANY_ADDRESS.line2}, {COMPANY_ADDRESS.country}
            </address>
            <p className="text-xs text-[#666]">
              &copy; {year} {COMPANY_NAME}. All rights reserved.
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-xs md:items-end">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#888] hover:text-white transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`}
              className="text-[#888] hover:text-white transition-colors"
            >
              {CONTACT_PHONE}
            </a>
            <div className="flex items-center gap-x-6 gap-y-2 mt-2">
              <Link href="/privacy" className="text-[#888] hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#888] hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </nav>
        </div>

        <p className="mt-8 text-[10px] leading-relaxed text-[#444] text-center">
          {COMPANY_NAME} is a marketing technology provider for powersports dealerships.
          Revenue figures shown on this site are illustrative estimates based on industry
          benchmarks and individual dealer results may vary. Nothing on this site constitutes
          financial, legal, or business advice.
        </p>
      </div>
    </footer>
  );
}
