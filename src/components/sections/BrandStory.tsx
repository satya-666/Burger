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
      <span className="story-big-text display-text pointer-events-none absolute -right-[5%] top-[10%] select-none text-[20vw] text-charcoal/[0.03]">
        STORY
      </span>

      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="story-content grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="story-image-wrap relative aspect-[3/4] overflow-hidden rounded-[2rem] md:rounded-[3rem]">
            <div className="story-parallax-img relative h-[120%] w-full -translate-y-[10%]">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80&auto=format&fit=crop"
                alt="Chef preparing burgers"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <span className="inline-block rounded-full bg-yellow px-4 py-2 text-xs font-bold uppercase tracking-wider text-charcoal">
                Est. 2019
              </span>
            </div>
          </div>

          <div>
            <span className="story-text-block mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-red">
              Our Story
            </span>

            <TextReveal
              as="h2"
              className="story-text-block display-text mb-8 text-5xl text-charcoal md:text-6xl lg:text-7xl"
            >
              Born From Fire Passion
            </TextReveal>

            <p className="story-text-block mb-6 leading-relaxed text-charcoal/70 md:text-lg">
              It started with a simple belief: a burger should be an event, not
              just a meal. In a small kitchen with a open flame and big dreams,
              FLAME&BUN was born — a place where craftsmanship meets craving.
            </p>

            <p className="story-text-block mb-10 leading-relaxed text-charcoal/70 md:text-lg">
              Today, we source the finest ingredients from local farms, grind
              our beef fresh every morning, and grill each patty over real flame.
              Every bite is a testament to our obsession with quality.
            </p>

            <div className="story-text-block grid grid-cols-2 gap-6 md:gap-8">
              {[
                { num: "50K+", label: "Happy Customers" },
                { num: "12", label: "Locations" },
                { num: "15", label: "Awards Won" },
                { num: "100%", label: "Love & Fire" },
              ].map((item) => (
                <div key={item.label}>
                  <span className="display-text block text-3xl text-red md:text-4xl">
                    {item.num}
                  </span>
                  <span className="text-sm text-charcoal/50">{item.label}</span>
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
