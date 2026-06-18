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
      <MarqueeBanner className="border-y-4 border-charcoal bg-red text-cream [&_.display-text]:!text-cream" />
      <section
        id="showcase"
        ref={sectionRef}
        className="relative overflow-hidden bg-yellow py-20 md:py-32"
      >
        <div className="travel-path showcase-parallax absolute right-[2%] top-[18%] hidden h-4 w-[56vw] rotate-[38deg] md:block" />
        <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-b-full bg-beige" />
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="mb-16 md:mb-24">
            <span className="sticker-outline display-text mb-5 inline-block rotate-[-4deg] rounded-full bg-red px-5 py-2 text-2xl text-cream">
              Take Away
            </span>
            <TextReveal
              as="h2"
              className="display-text crav-text-white max-w-6xl text-6xl md:text-8xl lg:text-[9rem]"
            >
              Quality That Travels With You
            </TextReveal>
          </div>

          <div className="showcase-grid grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="showcase-sticky relative">
              <div className="showcase-image showcase-parallax chunky-card relative aspect-[4/5] -rotate-3 overflow-hidden rounded-[1.6rem] bg-cream">
                <div className="showcase-zoom relative h-full w-full">
                  <Image
                    src="/assets/crav-burger.png"
                    alt="Premium burger layers"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="display-text crav-text text-6xl md:text-8xl">01</span>
                </div>
              </div>

              <div className="sticker-outline display-text absolute -right-4 -top-4 rotate-12 rounded-full bg-red px-5 py-3 text-2xl text-cream md:-right-8 md:-top-8">
                Hauz Khas
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div className="showcase-detail">
                <h3 className="display-text mb-4 text-4xl text-charcoal md:text-5xl">
                  Smashed Hot
                </h3>
                <p className="text-lg font-bold leading-relaxed text-charcoal/80">
                  Freshly packed smash burgers, sealed while the cheese is still
                  glossy and the sauce is still loud.
                </p>
              </div>

              <div className="showcase-detail">
                <h3 className="display-text mb-4 text-4xl text-charcoal md:text-5xl">
                  Toasted Buns
                </h3>
                <p className="text-lg font-bold leading-relaxed text-charcoal/80">
                  Soft potato rolls hit the grill just long enough to hold the
                  stack together from counter to couch.
                </p>
              </div>

              <div className="showcase-detail">
                <h3 className="display-text mb-4 text-4xl text-charcoal md:text-5xl">
                  Pocket Sauces
                </h3>
                <p className="text-lg font-bold leading-relaxed text-charcoal/80">
                  Tangy, spicy, creamy, and packed on the side so every bite can
                  get fully loaded.
                </p>
              </div>

              <div className="showcase-detail grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: "100%", label: "Fresh" },
                  { value: "48hr", label: "Fresh Chicken" },
                  { value: "0", label: "Preservatives" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="chunky-card rounded-[1.4rem] bg-cream p-4 text-center md:p-6"
                  >
                    <span className="display-text block text-2xl text-red md:text-3xl">
                      {stat.value}
                    </span>
                    <span className="text-xs font-black uppercase text-charcoal/60">
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
                src: "/assets/crav-burger.png",
                alt: "Fresh ingredients",
                label: "Farm Fresh",
              },
              {
                src: "/assets/crav-bite.png",
                alt: "Grilling process",
                label: "Open Flame",
              },
              {
                src: "/assets/crav-counter.png",
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
                <span className="display-text crav-text absolute bottom-6 left-6 text-3xl md:text-4xl">
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
