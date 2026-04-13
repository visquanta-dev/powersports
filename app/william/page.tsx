'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Testimonials from '../components/Testimonials';
import {
  Clock,
  PhoneOff,
  CalendarX,
  MessageSquareOff,
  UserX,
  ArrowRight,
  Shield,
} from 'lucide-react';

/* ─── Data ─── */

const failures = [
  {
    icon: Clock,
    title: 'Slow Lead Response',
    cost: '~$15K/mo',
    description:
      'Every minute after the first 60 seconds drops your close rate by 10%. Most dealers respond in hours — or never.',
  },
  {
    icon: PhoneOff,
    title: 'No After-Hours Coverage',
    cost: '~$22K/mo',
    description:
      '42% of leads come in after the showroom closes. No answer = no deal. Your competitors pick them up.',
  },
  {
    icon: CalendarX,
    title: 'Broken Follow-Up Sequences',
    cost: '~$18K/mo',
    description:
      "One call, one email, then silence. 80% of sales require 5+ touches. Most dealers quit after 2.",
  },
  {
    icon: MessageSquareOff,
    title: 'Dead Lead Graveyard',
    cost: '~$12K/mo',
    description:
      'Thousands of leads sit rotting in your CRM. 7% of them would buy today if someone just reached out.',
  },
  {
    icon: UserX,
    title: 'No Accountability Tracking',
    cost: '~$8K/mo',
    description:
      "If you can't measure response times, you can't fix them. Most dealers are flying blind.",
  },
];

type LogoTreatment = 'color' | 'invert' | 'card' | 'outline';
type LogoSize = 'sm' | 'lg';
const logos: {
  slug: string;
  ext?: 'svg' | 'png' | 'webp';
  treatment: LogoTreatment;
  size?: LogoSize;
}[] = [
  { slug: 'polaris',           treatment: 'invert' },
  { slug: 'yamaha',            treatment: 'color'  },
  { slug: 'honda',             treatment: 'invert', ext: 'png', size: 'lg' },
  { slug: 'kawasaki',          treatment: 'color'  },
  { slug: 'can-am',            treatment: 'invert' },
  { slug: 'harley-davidson',   treatment: 'color'  },
  { slug: 'indian-motorcycle', treatment: 'invert' },
  { slug: 'suzuki',            treatment: 'color'  },
  { slug: 'arctic-cat',        treatment: 'outline', ext: 'png', size: 'lg' },
  { slug: 'triumph',           treatment: 'invert' },
  { slug: 'brp',               treatment: 'invert' },
  { slug: 'ktm',               treatment: 'color'  },
  { slug: 'ski-doo',           treatment: 'outline' },
  { slug: 'mercury-marine',    treatment: 'color', ext: 'webp' },
];

/* ─── Animation variants ─── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

/* ─── FormBlock (hoisted so it's a stable component reference) ─── */

type FormState = { name: string; email: string };

function FormBlock({
  id,
  form,
  onChange,
  onSubmit,
  submitting,
}: {
  id: string;
  form: FormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md" id={id}>
      <input
        type="text"
        name="name"
        placeholder="First Name"
        required
        value={form.name}
        onChange={onChange}
        autoComplete="given-name"
        autoCapitalize="words"
        inputMode="text"
        className="w-full px-5 py-4 rounded-xl bg-[#141414] border border-[#262626] text-white placeholder:text-[#666] text-base transition-all duration-200"
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your email address..."
        required
        value={form.email}
        onChange={onChange}
        autoComplete="email"
        autoCapitalize="none"
        inputMode="email"
        spellCheck={false}
        className="w-full px-5 py-4 rounded-xl bg-[#141414] border border-[#262626] text-white placeholder:text-[#666] text-base transition-all duration-200"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-xl bg-[#FF7404] hover:bg-[#ff8524] text-black font-extrabold text-base uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_-10px_rgba(255,116,4,0.5)] disabled:opacity-60 disabled:cursor-not-allowed animate-pulse-subtle"
      >
        {submitting ? 'Loading...' : 'Show Me My Lost Revenue'}
      </button>
      <div className="flex items-center justify-center gap-2 text-xs text-[#666]">
        <Shield className="w-3 h-3" />
        <span>No spam. Instant access. Unsubscribe anytime.</span>
      </div>
      <p className="text-[11px] leading-relaxed text-[#666] text-center px-2">
        By submitting, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-white/80">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms" className="underline hover:text-white/80">
          Terms
        </a>
        . We&apos;ll never share your info.
      </p>
    </form>
  );
}

/* ─── Page ─── */

export default function LeadCapturePage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Wire to Supabase later
    await new Promise((r) => setTimeout(r, 600));
    const params = new URLSearchParams({ name: form.name, email: form.email });
    router.push(`/calculator?${params.toString()}`);
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* ═══════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[100svh] lg:min-h-[90vh] flex items-center">
        {/* Grid bg */}
        <div className="absolute inset-0 bg-enterprise-grid opacity-50 pointer-events-none" />
        {/* Orange glow top-right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF7404]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-wide relative z-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_420px] gap-6 lg:gap-4 items-end">
            {/* Left: Content + Form */}
            <div className="order-2 lg:order-1">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-5"
              >
                <Image
                  src="/images/visquanta-logo.png"
                  alt="VisQuanta"
                  width={750}
                  height={224}
                  priority
                  className="h-12 w-auto"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-[1.05] tracking-tight mb-3 max-w-[18ch]"
              >
                The 5 Follow-Up Failures<br />
                Killing Powersport<br />
                Dealer <span className="text-[#FF7404]">Revenue</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base lg:text-lg text-[#a1a1aa] italic mb-5"
              >
                Get the Lost Revenue Calculator and see what your<br />
                dealership is leaving on the table.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <FormBlock
                  id="hero-form"
                  form={form}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                />
              </motion.div>
            </div>

            {/* Right: Chris image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              {/* Mobile: full body cutout, scaled */}
              <div className="lg:hidden relative w-full flex justify-center">
                <div className="relative w-[200px] h-[320px]">
                  {/* Orange glow behind */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[140px] bg-[#FF7404]/15 rounded-full blur-[60px]" />
                  <Image
                    src="/images/william.png"
                    alt="William, VisQuanta"
                    fill
                    sizes="200px"
                    className="object-contain object-bottom relative z-10"
                    priority
                  />
                </div>
              </div>
              {/* Desktop: full cutout */}
              <div className="hidden lg:block relative -ml-12">
                <div className="relative w-[420px] h-[520px]">
                  {/* Orange glow behind */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] h-[220px] bg-[#FF7404]/10 rounded-full blur-[80px]" />
                  <Image
                    src="/images/william.png"
                    alt="William, VisQuanta"
                    fill
                    sizes="420px"
                    className="object-contain object-bottom relative z-10"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 1B: VENDOR LOGO BANNER (moved up)
          ═══════════════════════════════════════ */}
      <section className="py-14 bg-[#080808] border-y border-[#1a1a1a] overflow-hidden">
        <div className="container-wide mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#666] text-center">
            Trusted by dealers selling
          </p>
        </div>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

          <div className="flex logo-scroll-track" style={{ width: 'max-content' }}>
            {[...logos, ...logos].map((logo, i) => {
              const isCard = logo.treatment === 'card';
              const wrapperClass = isCard
                ? 'flex-shrink-0 mx-8 flex items-center justify-center h-12 px-4 rounded-md bg-white opacity-90 hover:opacity-100 transition-opacity'
                : 'flex-shrink-0 mx-8 flex items-center justify-center h-12 opacity-70 hover:opacity-100 transition-opacity';
              const isLarge = logo.size === 'lg' || logo.treatment === 'outline';
              const sizeClass = isLarge ? 'h-12 w-auto' : 'h-8 w-auto';
              const imgClass =
                logo.treatment === 'invert' ? `${sizeClass} brightness-0 invert` : sizeClass;
              const imgStyle =
                logo.treatment === 'outline'
                  ? {
                      filter:
                        'drop-shadow(0 0 0.5px #fff) drop-shadow(0 0 0.5px #fff) drop-shadow(0 0 0.5px #fff)',
                    }
                  : undefined;
              const ext = logo.ext ?? 'svg';
              return (
                <div key={`${logo.slug}-${i}`} className={wrapperClass}>
                  <img
                    src={`/images/logos/${logo.slug}.${ext}`}
                    alt={logo.slug}
                    className={imgClass}
                    style={imgStyle}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2: PAIN POINTS
          ═══════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0A0A0A] relative">
        <div className="absolute inset-0 bg-enterprise-grid opacity-30 pointer-events-none" />

        <div className="container-wide relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white pl-5 border-l-4 border-[#FF7404]">
              The 5 Follow-Up Failures Costing You Revenue
            </h2>
            <p className="text-[#a1a1aa] mt-4 text-lg max-w-2xl">
              Your CRM has a leak. Here are the five biggest holes —
              and what each one quietly costs you every month.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto flex flex-col">
            {failures.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i + 1}
                className="group relative py-10 lg:py-12 border-b border-[#1a1a1a] last:border-b-0"
              >
                {/* Giant ghost numeral */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-4 lg:-top-8 -left-2 lg:left-0 select-none font-black leading-none text-transparent text-[7rem] lg:text-[11rem] tracking-tighter"
                  style={{
                    WebkitTextStroke: '1.5px rgba(255,116,4,0.18)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="relative pl-0 lg:pl-44">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-white font-black text-2xl lg:text-3xl tracking-tight">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FF7404]/10 border border-[#FF7404]/30 text-[#FF7404] text-xs font-black uppercase tracking-wider">
                      {item.cost} lost
                    </span>
                  </div>
                  <p className="text-[#a1a1aa] text-base lg:text-lg leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={6}
            className="mt-16 text-center"
          >
            <p className="text-2xl lg:text-3xl font-black text-white mb-6">
              How much is this costing{' '}
              <span className="text-[#FF7404]">YOUR</span> dealership?
            </p>
            <a
              href="#bottom-form"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-xl bg-[#FF7404] hover:bg-[#ff8524] text-black font-extrabold text-base uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-8px_rgba(255,116,4,0.6)]"
            >
              Show Me My Lost Revenue <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Testimonials />

      {/* ═══════════════════════════════════════
          SECTION 5: BOTTOM CTA (REPEAT FORM)
          ═══════════════════════════════════════ */}
      <section id="bottom-form" className="py-20 lg:py-28 bg-[#050505] relative">
        <div className="absolute inset-0 bg-enterprise-grid opacity-30 pointer-events-none" />
        {/* Orange glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF7404]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
                See How Much Revenue You&apos;re{' '}
                <span className="text-[#FF7404]">Leaving on the Table</span>
              </h2>
              <p className="text-[#a1a1aa] text-lg mb-10">
                Enter your details and get instant access to the revenue calculator.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="flex justify-center"
            >
              <FormBlock
                id="bottom-form-inputs"
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer micro */}
      <footer className="py-6 bg-[#050505] border-t border-[#1a1a1a]">
        <div className="container-wide text-center">
          <p className="text-xs text-[#444]">
            &copy; {new Date().getFullYear()} VisQuanta. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
