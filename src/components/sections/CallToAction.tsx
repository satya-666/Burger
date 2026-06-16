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
      <span className="cta-bg-text display-text pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[25vw] text-white/[0.06]">
        BITE
      </span>

      <div className="cta-circle absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border-2 border-white/10 md:h-60 md:w-60" />
      <div className="cta-circle absolute -right-16 bottom-0 h-32 w-32 rounded-full bg-yellow/20 md:h-48 md:w-48" />

      <div className="cta-content relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <span className="mb-6 inline-block rounded-full bg-yellow px-5 py-2 text-xs font-bold uppercase tracking-wider text-charcoal">
          Limited Time
        </span>

        <h2 className="display-text mb-6 text-5xl text-white md:text-7xl lg:text-8xl">
          Ready to
          <br />
          Taste Fire?
        </h2>

        <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
          Join thousands of burger lovers. Order online for pickup or delivery,
          or reserve a table for the full FLAME&BUN experience.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton variant="secondary">Order Online</MagneticButton>
          <MagneticButton variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-red">
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
