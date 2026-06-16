"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";
import MarqueeBanner from "@/components/ui/MarqueeBanner";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-content",
          start: "top 80%",
        },
      });

      gsap.to(".cta-bg-text", {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".cta-circle", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative overflow-hidden bg-red py-24 md:py-40"
    >
      <span className="cta-bg-text display-text pointer-events-none absolute bottom-[-0.18em] left-1/2 -translate-x-1/2 select-none text-[24vw] leading-none text-cream/[0.16]">
        ORDER
      </span>

      <div className="cta-circle absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-yellow md:h-60 md:w-60" />
      <div className="cta-circle absolute -right-16 bottom-0 h-32 w-32 rounded-full bg-cream/20 md:h-48 md:w-48" />

      <div className="cta-content relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <span className="sticker-outline display-text mb-6 inline-block rotate-[-4deg] rounded-full bg-yellow px-5 py-2 text-2xl text-charcoal">
          Limited Time
        </span>

        <h2 className="display-text mb-6 text-6xl text-cream md:text-8xl lg:text-[9rem]">
          Toasting The Artisan Bun
        </h2>

        <p className="mx-auto mb-10 max-w-lg text-base font-black uppercase leading-relaxed text-cream/90 md:text-xl">
          Order online for pickup or delivery, wrapped hot and stacked fresh.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton variant="secondary">Order Online</MagneticButton>
          <MagneticButton variant="outline" className="!border-cream !text-charcoal hover:!bg-charcoal hover:!text-cream">
            Book a Table
          </MagneticButton>
        </div>
      </div>

      <MarqueeBanner
        speed="fast"
        className="mt-20 border-t border-white/10 [&_.display-text]:!text-white/15 [&_span.rounded-full]:!bg-white/30"
      />
    </section>
  );
}
