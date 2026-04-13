'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Zap, ArrowRight, Calculator, CheckCircle } from 'lucide-react';

/* ─── Tab definitions ─── */
const tabs = [
  {
    id: 'reactivation',
    label: 'Lead Reactivation',
    description: 'Calculate revenue from waking up dead leads.',
    icon: RefreshCw,
    panel: {
      title: 'Re-engage Lost Leads',
      subtitle: "Recover revenue from leads marked as 'Lost' or 'Dead'.",
      slider1: { label: 'Cold Leads', sublabel: '(Last 12 Mo)', min: 200, max: 5000, step: 50, default: 1650, prefix: '' },
      slider2: { label: 'Avg Profit', sublabel: '(Front + Back)', min: 500, max: 12000, step: 100, default: 4800, prefix: '$' },
      rate: 0.07,
      rateLabel: 'Based on a conservative 7% win-back calculation.',
      resultLabel: 'Estimated Annual Recovery',
    },
  },
  {
    id: 'speed',
    label: 'Speed to Lead',
    description: 'See the impact of sub-60 second response times.',
    icon: Zap,
    panel: {
      title: 'Capture More Buyers',
      subtitle: 'Revenue gained by responding to every lead in under 60 seconds.',
      slider1: { label: 'Monthly Leads', sublabel: '(All Sources)', min: 50, max: 2000, step: 25, default: 400, prefix: '' },
      slider2: { label: 'Avg Profit', sublabel: '(Front + Back)', min: 500, max: 12000, step: 100, default: 4800, prefix: '$' },
      rate: 0.15,
      rateLabel: 'Based on a 15% lift from sub-60s response vs. industry average.',
      resultLabel: 'Estimated Annual Uplift',
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

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = tabs[activeTab];
  const panel = tab.panel;

  const [vals, setVals] = useState<Record<string, [number, number]>>({
    reactivation: [tabs[0].panel.slider1.default, tabs[0].panel.slider2.default],
    speed: [tabs[1].panel.slider1.default, tabs[1].panel.slider2.default],
  });

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
      <div className="border-b border-[#1a1a1a] py-4">
        <div className="container-wide flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF7404] flex items-center justify-center">
              <span className="text-black font-black text-sm">VQ</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">VisQuanta</span>
          </div>
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
              How Much Revenue Are You <br className="hidden sm:block" />
              <span className="text-[#FF7404]">Leaving Behind?</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
              Drag the sliders to see what your dealership could be earning. Most powersports dealers have hundreds of thousands in recoverable revenue sitting in their CRM.
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
                  <h3 className="text-xl font-black text-white mb-1.5">Profit Calculator</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Uncover your dealership&apos;s hidden revenue potential.
                  </p>

                  {/* Tabs */}
                  <div className="space-y-3 flex-1">
                    {tabs.map((t, i) => {
                      const Icon = t.icon;
                      const isActive = activeTab === i;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setActiveTab(i)}
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
                      Dealerships using VisQuanta see an average <span className="text-white font-bold">30% increase</span> in appointment set rates within the first 60 days.
                    </p>
                  </div>
                </div>

                {/* Right panel */}
                <div className="p-8 lg:p-10 relative">
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
                            {panel.slider1.prefix || ''}{v1.toLocaleString()}
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
                            {panel.slider2.prefix || ''}{v2.toLocaleString()}
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
                        <p className="text-white/35 text-xs mt-2">{panel.rateLabel}</p>
                      </div>

                      {/* CTA */}
                      <a
                        href="https://visquanta.com/powersports"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 w-full py-4 sm:py-5 rounded-xl bg-[#FF7404] hover:bg-[#ff8524] text-black font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.01] shadow-[0_0_30px_-10px_rgba(255,116,4,0.4)]"
                      >
                        Claim This Revenue
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

      {/* Footer */}
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
