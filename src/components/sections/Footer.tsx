"use client";

import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

const SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-beige py-16 text-charcoal md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 border-b-2 border-charcoal/20 pb-10 md:flex-row md:items-end">
          <nav className="flex flex-wrap gap-7 md:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="display-text text-3xl transition-colors hover:text-red"
                data-cursor="hover"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="display-text text-2xl text-charcoal/80">
            © {new Date().getFullYear()} CRAV — All Rights Reserved
          </p>
        </div>

        <div className="relative min-h-[330px] pt-8 md:min-h-[430px]">
          <p className="display-text text-3xl text-charcoal/80">
            Smashed Patties · Toasted Buns · Est. 2010
          </p>

          <div className="sticker-outline absolute right-[36%] top-20 hidden rotate-[-12deg] rounded-full bg-yellow px-5 py-3 display-text text-3xl md:block">
            Cheese
          </div>
          <div className="sticker-outline absolute right-[14%] top-48 hidden rotate-12 rounded-full bg-red px-5 py-3 display-text text-3xl text-cream md:block">
            Sauce
          </div>

          <span className="display-text crav-text absolute -bottom-[0.2em] left-1/2 -translate-x-1/2 text-[33vw] leading-none">
            CRAV
          </span>

          <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-5">
            {SOCIAL.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                className="display-text rounded-full bg-cream px-5 py-2 text-xl ring-2 ring-charcoal/15 transition-colors hover:bg-yellow"
                whileHover={{ y: -4 }}
                data-cursor="hover"
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
