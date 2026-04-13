'use client';

import { Suspense, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Testimonials from '../components/Testimonials';
import {
  RefreshCw,
  Zap,
  ArrowRight,
  Calculator,
  CheckCircle,
  Moon,
  Repeat,
  LineChart,
  HelpCircle,
} from 'lucide-react';

/* ─── Booking link — update if VisQuanta uses a different scheduler ─── */
const BOOKING_URL = 'https://cal.com/visquanta/15min';

/* ─── Tab definitions ───────────────────────────────────────────────
 * Default values are tuned so that the result matches the landing
 * page's per-failure cost tags ($8K–$22K/mo). Annual = monthly × 12.
 * ─────────────────────────────────────────────────────────────────── */
const tabs = [
  {
    id: 'speed',
    label: 'Speed to Lead',
    description: 'Failure #1 — sub-60s response wins more deals.',
    icon: Zap,
    panel: {
      title: 'Capture More Buyers',
      subtitle: 'Revenue gained by responding to every lead in under 60 seconds.',
      slider1: { label: 'Monthly Leads', sublabel: '(All Sources)', min: 50, max: 2000, step: 25, default: 250, prefix: '' },
      slider2: { label: 'Avg Profit', sublabel: '(Front + Back)', min: 500, max: 12000, step: 100, default: 4800, prefix: '$' },
      rate: 0.15,
      rateLabel: 'Conservative 15% close-rate lift from sub-60s response.',
      rateExplain: 'Industry research (HBR, Drift, InsideSales) shows close rates drop ~10% per minute of delay. Dealers responding inside 60 seconds typically close 12–18% more leads than the industry average. We use 15% as a midpoint.',
      resultLabel: 'Estimated Annual Uplift',
    },
  },
  {
    id: 'after-hours',
    label: 'After-Hours Coverage',
    description: 'Failure #2 — 42% of leads arrive after closing.',
    icon: Moon,
    panel: {
      title: 'Stop Bleeding Night Leads',
      subtitle: 'Revenue recovered when every after-hours lead gets answered, not ignored.',
      slider1: { label: 'Monthly Leads', sublabel: '(All Sources)', min: 50, max: 2000, step: 25, default: 500, prefix: '' },
      slider2: { label: 'Avg Profit', sublabel: '(Front + Back)', min: 500, max: 12000, step: 100, default: 4800, prefix: '$' },
      rate: 0.11,
      rateLabel: 'Conservative 11% net annual capture from after-hours leads.',
      rateExplain: '42% of dealer leads arrive outside showroom hours. Recovering even half of these (~21%) and converting them at industry-average rates produces a ~11% net annual revenue lift over current state.',
      resultLabel: 'Estimated Annual Capture',
    },
  },
  {
    id: 'follow-up',
    label: 'Follow-Up Sequences',
    description: 'Failure #3 — 80% of sales need 5+ touches.',
    icon: Repeat,
    panel: {
      title: 'Finish What You Started',
      subtitle: 'Revenue earned by completing real follow-up sequences instead of dropping after 2 touches.',
      slider1: { label: 'Monthly Leads', sublabel: '(All Sources)', min: 50, max: 2000, step: 25, default: 500, prefix: '' },
      slider2: { label: 'Avg Profit', sublabel: '(Front + Back)', min: 500, max: 12000, step: 100, default: 4800, prefix: '$' },
      rate: 0.09,
      rateLabel: 'Conservative 9% lift from completing 5+ touch sequences.',
      rateExplain: '80% of B2C sales require 5+ touches; most dealers stop after 2. Completing the full sequence on every lead lifts close rates by 8–12% in dealer benchmarks. We use 9% as a defensible midpoint.',
      resultLabel: 'Estimated Annual Lift',
    },
  },
  {
    id: 'reactivation',
    label: 'Lead Reactivation',
    description: 'Failure #4 — wake up the dead leads in your CRM.',
    icon: RefreshCw,
    panel: {
      title: 'Re-engage Lost Leads',
      subtitle: "Recover revenue from leads marked as 'Lost' or 'Dead' in the past 12 months.",
      slider1: { label: 'Cold Leads', sublabel: '(Last 12 Mo)', min: 100, max: 5000, step: 50, default: 430, prefix: '' },
      slider2: { label: 'Avg Profit', sublabel: '(Front + Back)', min: 500, max: 12000, step: 100, default: 4800, prefix: '$' },
      rate: 0.07,
      rateLabel: 'Conservative 7% win-back rate on cold leads.',
      rateExplain: 'Industry win-back rates on properly re-engaged cold leads run 5–10%. We use 7% as a conservative midpoint — most dealers we audit see closer to 9% in the first quarter.',
      resultLabel: 'Estimated Annual Recovery',
    },
  },
  {
    id: 'tracking',
    label: 'Accountability Tracking',
    description: 'Failure #5 — measure response times to fix them.',
    icon: LineChart,
    panel: {
      title: 'Stop Flying Blind',
      subtitle: 'Compounding revenue from measuring response times and fixing what shows up.',
      slider1: { label: 'Monthly Leads', sublabel: '(All Sources)', min: 50, max: 2000, step: 25, default: 500, prefix: '' },
      slider2: { label: 'Avg Profit', sublabel: '(Front + Back)', min: 500, max: 12000, step: 100, default: 4800, prefix: '$' },
      rate: 0.04,
      rateLabel: 'Conservative 4% annual lift from measurement-driven improvements.',
      rateExplain: 'Dealers that track response times and BDC accountability reduce average handle time and missed leads, producing a compounding 3–6% annual revenue lift independent of other process changes. We use 4% as a midpoint.',
      resultLabel: 'Estimated Annual Lift',
    },
  },
] as const;

/* ─── Slider styles ─── */
const sliderClass =
  'w-full h-[3px] bg-white/10 rounded-full appearance-none cursor-pointer ' +
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 ' +
  '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF7404] ' +
  '[&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(255,116,4,0.6)] [&::-webkit-slider-thumb]:cursor-grab ' +
  '[&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:-top-[1px] ' +
  '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full ' +
  '[&::-moz-range-thumb]:bg-[#FF7404] [&::-moz-range-thumb]:border-0 ' +
  '[&::-moz-range-thumb]:shadow-[0_0_12px_rgba(255,116,4,0.6)] [&::-moz-range-thumb]:cursor-grab';

function filledTrackStyle(value: number, min: number, max: number) {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #FF7404 0%, #FF7404 ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`,
  };
}

/* ─── Calculator ──────────────────────────────────────────────────── */

function CalculatorContent() {
  const searchParams = useSearchParams();
  const visitorName = (searchParams.get('name') || '').trim();
  const firstName = visitorName.split(' ')[0];

  const [activeTab, setActiveTab] = useState(0);
  const tab = tabs[activeTab];
  const panel = tab.panel;

  const panelRef = useRef<HTMLDivElement>(null);

  const handleTabSelect = (i: number) => {
    setActiveTab(i);
    // Only auto-scroll on mobile (sidebar stacks above panel, so the panel
    // is off-screen after a tab tap). Desktop has them side-by-side.
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const [vals, setVals] = useState<Record<string, [number, number]>>(() =>
    Object.fromEntries(
      tabs.map((t) => [t.id, [t.panel.slider1.default, t.panel.slider2.default]]),
    ) as Record<string, [number, number]>,
  );

  const [v1, v2] = vals[tab.id];
  const result = v1 * v2 * panel.rate;

  const setSlider = useCallback(
    (idx: 0 | 1, val: number) => {
      setVals((prev) => {
        const copy = { ...prev };
        const arr: [number, number] = [...copy[tab.id]] as [number, number];
        arr[idx] = val;
        copy[tab.id] = arr;
        return copy;
      });
    },
    [tab.id],
  );

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Header bar */}
      <div className="border-b border-[#1a1a1a] py-6">
        <div className="container-wide flex items-center justify-between">
          <Image
            src="/images/visquanta-logo.png"
            alt="Visquanta"
            width={750}
            height={224}
            priority
            className="h-12 w-auto"
          />
          <div className="flex items-center gap-2 text-xs text-[#666]">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            <span>Access Granted</span>
          </div>
        </div>
      </div>

      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 pointer-events-none" />

        <div className="container-wide relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto mb-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-[#FF7404]/30 shadow-[0_0_15px_-3px_rgba(255,116,4,0.3)] backdrop-blur-md text-xs font-bold uppercase tracking-widest mb-6">
              <Calculator className="w-3 h-3 text-[#FF7404] fill-[#FF7404]" />
              <span className="text-[#FF7404]">Revenue Calculator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5 leading-[1.1]">
              {firstName ? (
                <>
                  {firstName}, How Much Revenue Is Your<br className="hidden sm:block" />{' '}
                  Dealership <span className="text-[#FF7404]">Leaving Behind?</span>
                </>
              ) : (
                <>
                  How Much Revenue Are You<br className="hidden sm:block" />{' '}
                  <span className="text-[#FF7404]">Leaving Behind?</span>
                </>
              )}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
              Drag the sliders on each of the five failures to see what your dealership could be earning.
              Most powersports dealers have <span className="text-white font-bold">$75K+ a month</span> in
              recoverable revenue sitting in their CRM.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-5xl mx-auto"
          >
            {/* Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
              <div className="grid lg:grid-cols-[340px_1fr]">
                {/* Left sidebar */}
                <div className="p-8 lg:p-10 bg-[#080808] border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col">
                  <h3 className="text-xl font-black text-white mb-1.5">The 5 Failures</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Each tab calculates the revenue you&apos;re losing to one specific failure.
                  </p>

                  {/* Tabs */}
                  <div className="space-y-3 flex-1">
                    {tabs.map((t, i) => {
                      const Icon = t.icon;
                      const isActive = activeTab === i;
                      return (
                        <button
                          key={t.id}
                          onClick={() => handleTabSelect(i)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                            isActive
                              ? 'bg-[#FF7404]/10 border-[#FF7404]/40'
                              : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-1">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF7404]' : 'text-white/40'}`} />
                            <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-white/70'}`}>
                              {t.label}
                            </span>
                          </div>
                          <p className="text-white/40 text-xs leading-relaxed pl-7">{t.description}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Did you know? */}
                  <div className="mt-8 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF7404] mb-2">Did you know?</div>
                    <p className="text-white/50 text-xs leading-relaxed">
                      VisQuanta dealers recover an average of{' '}
                      <span className="text-white font-bold">$75K/month</span> in lost revenue within their
                      first 90 days.
                    </p>
                  </div>
                </div>

                {/* Right panel */}
                <div ref={panelRef} className="p-8 lg:p-10 relative scroll-mt-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Header */}
                      <div className="mb-10">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-1 h-7 rounded-full bg-[#FF7404] mt-0.5 shrink-0" />
                          <h4 className="text-2xl font-black text-white">{panel.title}</h4>
                        </div>
                        <p className="text-white/40 text-sm ml-4">{panel.subtitle}</p>
                      </div>

                      {/* Slider 1 */}
                      <div className="mb-10">
                        <div className="flex items-baseline justify-between mb-4">
                          <label className="text-xs font-black uppercase tracking-[0.12em] text-white/70">
                            {panel.slider1.label}{' '}
                            <span className="text-white/30 font-bold">{panel.slider1.sublabel}</span>
                          </label>
                          <span className="text-2xl font-black text-white tabular-nums">
                            {panel.slider1.prefix || ''}
                            {v1.toLocaleString()}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={panel.slider1.min}
                          max={panel.slider1.max}
                          step={panel.slider1.step}
                          value={v1}
                          onChange={(e) => setSlider(0, Number(e.target.value))}
                          className={sliderClass}
                          style={filledTrackStyle(v1, panel.slider1.min, panel.slider1.max)}
                        />
                      </div>

                      {/* Slider 2 */}
                      <div className="mb-10">
                        <div className="flex items-baseline justify-between mb-4">
                          <label className="text-xs font-black uppercase tracking-[0.12em] text-white/70">
                            {panel.slider2.label}{' '}
                            <span className="text-white/30 font-bold">{panel.slider2.sublabel}</span>
                          </label>
                          <span className="text-2xl font-black text-white tabular-nums">
                            {panel.slider2.prefix || ''}
                            {v2.toLocaleString()}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={panel.slider2.min}
                          max={panel.slider2.max}
                          step={panel.slider2.step}
                          value={v2}
                          onChange={(e) => setSlider(1, Number(e.target.value))}
                          className={sliderClass}
                          style={filledTrackStyle(v2, panel.slider2.min, panel.slider2.max)}
                        />
                      </div>

                      {/* Result */}
                      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.02] border border-white/[0.08] mb-6">
                        <div className="text-xs font-black uppercase tracking-[0.15em] text-[#FF7404] mb-2">
                          {panel.resultLabel}
                        </div>
                        <div className="text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums">
                          ${Math.round(result).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-white/35 text-xs">{panel.rateLabel}</p>
                          {/* Tooltip */}
                          <div className="group relative inline-block">
                            <HelpCircle className="w-3.5 h-3.5 text-white/40 hover:text-white/80 cursor-help transition-colors" />
                            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-72 -translate-x-1/2 rounded-lg border border-white/10 bg-zinc-950 p-3 text-xs leading-relaxed text-white/70 opacity-0 shadow-2xl transition-opacity duration-200 group-hover:opacity-100 z-50">
                              {panel.rateExplain}
                              <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-zinc-950 border-r border-b border-white/10" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CTA — book a call */}
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 w-full py-4 sm:py-5 rounded-xl bg-[#FF7404] hover:bg-[#ff8524] text-black font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.01] shadow-[0_0_30px_-10px_rgba(255,116,4,0.4)]"
                      >
                        Book a 15-Minute Call
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="bg-[#050505] min-h-screen" />}>
      <CalculatorContent />
    </Suspense>
  );
}
