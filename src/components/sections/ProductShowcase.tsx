"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import MarqueeBanner from "@/components/ui/MarqueeBanner";
import SectionDivider from "@/components/ui/SectionDivider";
import { TiltImage } from "@/components/ui/TiltCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".showcase-image", {
        scale: 0.85,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".showcase-grid",
          start: "top 75%",
        },
      });

      gsap.from(".showcase-detail", {
        x: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".showcase-grid",
          start: "top 70%",
        },
      });

      gsap.to(".showcase-parallax", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".showcase-zoom", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: ".showcase-sticky",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: false,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <MarqueeBanner className="border-y border-charcoal/5 bg-cream" />
      <section
        id="showcase"
        ref={sectionRef}
        className="relative overflow-hidden bg-cream py-20 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="mb-16 md:mb-24">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-red">
              Our Craft
            </span>
            <TextReveal
              as="h2"
              className="display-text max-w-4xl text-5xl text-charcoal md:text-7xl lg:text-8xl"
            >
              Every Layer Tells a Story
            </TextReveal>
          </div>

          <div className="showcase-grid grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="showcase-sticky relative">
              <div className="showcase-image showcase-parallax relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem]">
                <div className="showcase-zoom relative h-full w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&q=80&auto=format&fit=crop"
                    alt="Premium burger layers"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="display-text text-6xl text-white/90 md:text-8xl">01</span>
                </div>
              </div>

              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-yellow md:-right-8 md:-top-8 md:h-32 md:w-32" />
            </div>

            <div className="flex flex-col gap-10">
              <div className="showcase-detail">
                <h3 className="display-text mb-4 text-3xl text-charcoal md:text-4xl">
                  Prime Angus Beef
                </h3>
                <p className="leading-relaxed text-charcoal/70">
                  Hand-selected cuts, ground fresh daily and flame-grilled to
                  perfection. Each patty delivers a juicy, smoky char that
                  defines our signature taste.
                </p>
              </div>

              <div className="showcase-detail">
                <h3 className="display-text mb-4 text-3xl text-charcoal md:text-4xl">
                  Artisan Brioche
                </h3>
                <p className="leading-relaxed text-charcoal/70">
                  Baked in-house every morning. Soft, buttery, and lightly
                  toasted — the perfect vessel for our bold flavors and
                  textures.
                </p>
              </div>

              <div className="showcase-detail">
                <h3 className="display-text mb-4 text-3xl text-charcoal md:text-4xl">
                  Secret Sauce
                </h3>
                <p className="leading-relaxed text-charcoal/70">
                  A closely guarded recipe passed down through generations.
                  Tangy, creamy, and impossibly addictive — it ties every
                  element together.
                </p>
              </div>

              <div className="showcase-detail grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: "100%", label: "Fresh" },
                  { value: "48hr", label: "Aged Beef" },
                  { value: "0", label: "Preservatives" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-beige p-4 text-center md:p-6"
                  >
                    <span className="display-text block text-2xl text-red md:text-3xl">
                      {stat.value}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-charcoal/50">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                src: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80&auto=format&fit=crop",
                alt: "Fresh ingredients",
                label: "Farm Fresh",
              },
              {
                src: "https://images.unsplash.com/photo-1606755962773-d324ed7a9848?w=600&q=80&auto=format&fit=crop",
                alt: "Grilling process",
                label: "Open Flame",
              },
              {
                src: "https://images.unsplash.com/photo-1565299585323-38a6c066fd0f?w=600&q=80&auto=format&fit=crop",
                alt: "Finished burger",
                label: "Perfection",
              },
            ].map((item) => (
              <div key={item.label} className="group relative">
                <TiltImage
                  src={item.src}
                  alt={item.alt}
                  className="aspect-square"
                />
                <span className="display-text absolute bottom-6 left-6 text-xl text-white drop-shadow-lg md:text-2xl">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider color="#FAF6F0" flip />
    </>
  );
}
