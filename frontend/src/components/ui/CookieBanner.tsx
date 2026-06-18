"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-[1.1rem] bg-cream px-5 py-4 shadow-[0_18px_48px_rgba(33,24,18,0.18)] ring-2 ring-charcoal/10 md:px-7"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-yellow ring-4 ring-yellow-warm/25">
                <span className="h-4 w-4 rounded-full bg-yellow-warm" />
              </span>
              <div>
                <p className="display-text text-lg text-charcoal">
                  Cookies In Use
                </p>
                <p className="mt-2 text-sm font-bold text-charcoal/70">
                  We use cookies to improve your experience.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 gap-3 self-end md:self-auto">
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="rounded-full border border-charcoal/15 px-5 py-3 text-xs font-black uppercase text-charcoal/70 transition-colors hover:bg-beige"
              >
                Later
              </button>
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="rounded-full bg-yellow px-5 py-3 text-xs font-black uppercase text-charcoal transition-colors hover:bg-yellow-warm"
              >
                Okay
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
