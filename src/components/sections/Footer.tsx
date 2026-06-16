"use client";

import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

const SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal py-16 text-beige md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <a href="#" className="display-text inline-block text-3xl md:text-4xl" data-cursor="hover">
              FLAME<span className="text-red">&</span>BUN
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-beige/50">
              Premium flame-grilled burgers crafted with passion. An award-winning
              experience in every bite.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-beige/40">
              Navigate
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-beige/70 transition-colors hover:text-yellow"
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-beige/40">
              Connect
            </h4>
            <ul className="space-y-3">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <motion.a
                    href={s.href}
                    className="text-sm text-beige/70 transition-colors hover:text-yellow"
                    whileHover={{ x: 4 }}
                    data-cursor="hover"
                  >
                    {s.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-beige/10 pt-8 md:flex-row">
          <p className="text-xs text-beige/30">
            © {new Date().getFullYear()} FLAME&BUN. All rights reserved.
          </p>
          <p className="text-xs text-beige/30">
            Crafted with fire & passion
          </p>
        </div>
      </div>
    </footer>
  );
}
