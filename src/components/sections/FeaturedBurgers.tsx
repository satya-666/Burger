"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import { BURGERS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedBurgers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".burger-card", {
        y: 100,
        opacity: 0,
        rotation: 3,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".burgers-grid",
          start: "top 75%",
        },
      });

      gsap.to(".burgers-heading", {
        scale: 0.9,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "30% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SectionDivider color="#E8DCCB" />
      <section
        id="featured"
        ref={sectionRef}
        className="relative overflow-hidden bg-charcoal py-20 text-beige md:py-32"
      >
        <div className="noise-bg absolute inset-0 opacity-50" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="burgers-heading mb-16 text-center md:mb-24">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-yellow">
              Signature Menu
            </span>
            <TextReveal
              as="h2"
              className="display-text text-5xl text-beige md:text-7xl lg:text-8xl"
            >
              Featured Burgers
            </TextReveal>
          </div>

          <div className="burgers-grid grid gap-8 sm:grid-cols-2 lg:gap-10">
            {BURGERS.map((burger, index) => (
              <motion.article
                key={burger.id}
                className="burger-card group relative overflow-hidden rounded-[2rem] bg-beige/5 backdrop-blur-sm"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                data-cursor="hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={burger.image}
                    alt={burger.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

                  <span className="absolute left-6 top-6 rounded-full bg-red px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {burger.tag}
                  </span>

                  <span className="display-text absolute bottom-4 right-6 text-5xl text-beige/10 md:text-6xl">
                    0{index + 1}
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="display-text text-2xl text-beige md:text-3xl">
                      {burger.name}
                    </h3>
                    <span className="display-text shrink-0 text-2xl text-yellow md:text-3xl">
                      {burger.price}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-beige/60 md:text-base">
                    {burger.description}
                  </p>

                  <motion.button
                    className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-yellow"
                    whileHover={{ x: 5 }}
                    data-cursor="hover"
                  >
                    Add to Order
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider color="#1A1410" flip />
    </>
  );
}
