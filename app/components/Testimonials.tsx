'use client';

import { motion, type Variants } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus Reed',
    role: 'General Manager',
    dealership: 'Apex Powersports',
    location: 'Bozeman, MT',
    image: '/images/testimonials/Cody_Rutledge.png',
    quote:
      "We were losing 40% of our leads to slow follow-up. Within 60 days, our appointment set rate jumped by 35%. The revenue calculator was a wake-up call.",
    metric: '35% more appointments',
  },
  {
    name: 'Tyler Brennan',
    role: 'Sales Director',
    dealership: 'Ridgeline Motorsports',
    location: 'Asheville, NC',
    image: '/images/testimonials/Jacob_Goss__.png',
    quote:
      "I didn't believe the numbers at first. But when we actually tracked our response times, we realized we were leaving six figures on the table every quarter.",
    metric: '$127K recovered',
  },
  {
    name: 'Devon Hayes',
    role: 'Owner',
    dealership: 'Coastal Powersports Group',
    location: 'Sarasota, FL',
    image: '/images/testimonials/Jo-Dabrowski.png',
    quote:
      "The 5 failures list hit home. We were guilty of every single one. Fixing just speed-to-lead alone changed our month.",
    metric: '340% more callbacks',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-[#050505] relative">
      <div className="container-wide relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            Dealers Who Fixed Their Follow-Up
          </h2>
          <p className="text-[#a1a1aa] mt-4 text-lg">
            Real results from real powersports dealerships.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              custom={i + 1}
              className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#262626] hover:border-[#FF7404]/20 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star
                    key={si}
                    className="w-4 h-4 text-[#FF7404] fill-[#FF7404]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#ccc] text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Metric callout */}
              <div className="px-3 py-1.5 rounded-lg bg-[#FF7404]/10 border border-[#FF7404]/20 inline-block mb-5">
                <span className="text-[#FF7404] font-bold text-sm">{t.metric}</span>
              </div>

              {/* Person */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#262626]">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#333] bg-[#1a1a1a]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-[#888] text-xs">
                    {t.role}, {t.dealership} &middot; {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
