"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, requireAuth, user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/90 py-3 shadow-[0_8px_0_rgba(33,24,18,0.08)] backdrop-blur-md md:py-4"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8 lg:px-12">
          <a href="#" className="group flex items-center gap-2" data-cursor="hover">
            <span className="display-text crav-text text-3xl md:text-5xl">
              CRAV
            </span>
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="display-text relative text-xl uppercase text-charcoal transition-colors hover:text-red"
                data-cursor="hover"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <MagneticButton
              href="#cta"
              variant="primary"
              onClick={(event) => {
                if (!requireAuth("order")) {
                  event.preventDefault();
                }
              }}
            >
              {isAuthenticated ? `Hi ${user?.name || "Foodie"}` : "Order Now"}
            </MagneticButton>
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => logout()}
                className="display-text rounded-full border-2 border-charcoal bg-cream px-5 py-3 text-base text-charcoal transition-colors hover:bg-yellow"
                data-cursor="hover"
              >
                Logout
              </button>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-charcoal"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-charcoal"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-charcoal"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-yellow lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMenuOpen(false)}
                  className="display-text crav-text text-5xl"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <MagneticButton
                  href="#cta"
                  onClick={(event) => {
                    if (!requireAuth("order")) {
                      event.preventDefault();
                    }
                    setMenuOpen(false);
                  }}
                >
                  {isAuthenticated ? "My Account" : "Order Now"}
                </MagneticButton>
              </motion.div>
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="display-text text-3xl text-charcoal/70"
                >
                  Logout
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
