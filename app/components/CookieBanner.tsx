'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'vq-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!stored) setVisible(true);
  }, []);

  const decide = (choice: 'accept' | 'decline') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // localStorage unavailable — fail silently, banner just won't persist
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[100] rounded-2xl border border-[#262626] bg-[#0a0a0a]/95 backdrop-blur-md p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]"
    >
      <p className="text-sm text-white/80 leading-relaxed mb-4">
        We use cookies and similar technologies to measure traffic and improve the experience.
        See our{' '}
        <Link href="/privacy" className="text-[#FF7404] hover:underline font-semibold">
          Privacy Policy
        </Link>{' '}
        for details.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => decide('accept')}
          className="flex-1 py-2.5 px-4 rounded-lg bg-[#FF7404] hover:bg-[#ff8524] text-black font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => decide('decline')}
          className="flex-1 py-2.5 px-4 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
