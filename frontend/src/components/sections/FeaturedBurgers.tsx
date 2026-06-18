"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import { BURGERS } from "@/lib/constants";
import { useAuth } from "@/components/auth/AuthProvider";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedBurgers() {
  const sectionRef = useRef<HTMLElement>(null);
  const { requireAuth } = useAuth();

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
        className="relative overflow-hidden bg-red py-20 text-cream md:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(255,211,63,0.28),transparent_28%),radial-gradient(circle_at_88%_78%,rgba(255,244,223,0.18),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="burgers-heading mb-16 text-center md:mb-24">
            <span className="sticker-outline mb-4 inline-block rotate-[-3deg] rounded-full bg-yellow px-5 py-2 display-text text-2xl text-charcoal">
              Signature Menu
            </span>
            <TextReveal
              as="h2"
              className="display-text text-6xl text-cream md:text-8xl lg:text-[9rem]"
            >
              Burgers Built Loud
            </TextReveal>
          </div>

          <div className="burgers-grid grid gap-8 sm:grid-cols-2 lg:gap-10">
            {BURGERS.map((burger, index) => (
              <motion.article
                key={burger.id}
                className="burger-card chunky-card group relative overflow-hidden rounded-[1.6rem] bg-cream text-charcoal"
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

                  <span className="display-text sticker-outline absolute left-6 top-6 rotate-[-5deg] rounded-full bg-red px-4 py-2 text-xl text-white">
                    {burger.tag}
                  </span>

                  <span className="display-text crav-text absolute bottom-4 right-6 text-5xl md:text-6xl">
                    0{index + 1}
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="display-text text-3xl text-charcoal md:text-4xl">
                      {burger.name}
                    </h3>
                    <span className="display-text shrink-0 text-3xl text-red md:text-4xl">
                      {burger.price}
                    </span>
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-charcoal/65 md:text-base">
                    {burger.description}
                  </p>

                  <motion.button
                    type="button"
                    onClick={() => requireAuth(`add ${burger.name} to order`)}
                    className="display-text mt-6 flex items-center gap-2 rounded-full bg-yellow px-5 py-3 text-base text-charcoal ring-4 ring-charcoal/10"
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
