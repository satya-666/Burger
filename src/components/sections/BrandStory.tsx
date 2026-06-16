"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import MarqueeBanner from "@/components/ui/MarqueeBanner";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-image-wrap", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".story-image-wrap",
          start: "top 80%",
        },
      });

      gsap.from(".story-text-block", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-content",
          start: "top 75%",
        },
      });

      gsap.to(".story-parallax-img", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".story-big-text", {
        x: -100,
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
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-beige py-20 md:py-32"
    >
      <span className="story-big-text display-text crav-text pointer-events-none absolute -bottom-8 left-1/2 select-none text-[32vw] leading-none -translate-x-1/2 opacity-95">
        CRAV
      </span>
      <span className="sticker-outline display-text absolute right-[22%] top-[15%] rotate-[-12deg] rounded-full bg-yellow px-5 py-3 text-3xl text-charcoal">
        Cheese
      </span>

      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="story-content grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="story-image-wrap chunky-card relative aspect-[3/4] rotate-2 overflow-hidden rounded-[1.6rem] bg-cream">
            <div className="story-parallax-img relative h-[120%] w-full -translate-y-[10%]">
              <Image
                src="/assets/crav-counter.png"
                alt="Chef preparing burgers"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <span className="display-text sticker-outline inline-block rounded-full bg-yellow px-5 py-2 text-xl uppercase text-charcoal">
                Est. 2010
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <span className="story-text-block sticker-outline display-text mb-5 inline-block rotate-[-4deg] rounded-full bg-red px-5 py-2 text-2xl text-cream">
              Our Story
            </span>

            <TextReveal
              as="h2"
              className="story-text-block display-text mb-8 text-6xl text-charcoal md:text-7xl lg:text-8xl"
            >
              Smashed Patties. Toasted Buns.
            </TextReveal>

            <p className="story-text-block mb-6 text-lg font-bold leading-relaxed text-charcoal/75 md:text-xl">
              It started with a simple belief: a burger should be an event, not
              just a meal. In a small kitchen with a hot flat-top and louder
              dreams, CRAV became the place where craft meets craving.
            </p>

            <p className="story-text-block mb-10 text-lg font-bold leading-relaxed text-charcoal/75 md:text-xl">
              We keep the menu short, the sauces punchy, and every order wrapped
              like a sticker-covered souvenir.
            </p>

            <div className="story-text-block grid grid-cols-2 gap-6 md:gap-8">
              {[
                { num: "50K+", label: "Happy Customers" },
                { num: "8", label: "NCR Spots" },
                { num: "15", label: "Awards Won" },
                { num: "100%", label: "Love & Fire" },
              ].map((item) => (
                <div key={item.label}>
                  <span className="display-text crav-text block text-4xl md:text-5xl">
                    {item.num}
                  </span>
                  <span className="text-sm font-black uppercase text-charcoal/60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MarqueeBanner reverse speed="slow" className="mt-20 md:mt-32" />
    </section>
  );
}
