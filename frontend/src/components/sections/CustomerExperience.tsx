"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    title: "Warm Ambiance",
    description:
      "Industrial-chic interiors with warm lighting and the sizzle of open flames.",
    image:
      "/assets/crav-burger.png",
  },
  {
    title: "Craft Cocktails",
    description:
      "House-made beverages designed to complement every bite of your burger.",
    image:
      "/assets/crav-bite.png",
  },
  {
    title: "Live Music",
    description:
      "Local artists every Friday and Saturday — good food, great vibes.",
    image:
      "/assets/crav-counter.png",
  },
];

const TESTIMONIALS = [
  {
    quote: "The best burger I've ever had. The truffle aioli is unreal.",
    author: "Sarah M.",
    rating: 5,
  },
  {
    quote: "An experience, not just a meal. The atmosphere is incredible.",
    author: "James K.",
    rating: 5,
  },
  {
    quote: "FLAME&BUN set a new standard for what a burger joint can be.",
    author: "Elena R.",
    rating: 5,
  },
];

export default function CustomerExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-card", {
        x: (i) => (i % 2 === 0 ? -80 : 80),
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-grid",
          start: "top 75%",
        },
      });

      gsap.from(".testimonial-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 80%",
        },
      });

      if (stickyRef.current) {
        ScrollTrigger.create({
          trigger: stickyRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".exp-sticky-content",
          pinSpacing: false,
        });
      }

      gsap.to(".exp-parallax", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden bg-beige py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="mb-16 md:mb-24">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-red">
            The Experience
          </span>
          <TextReveal
            as="h2"
            className="display-text max-w-3xl text-5xl text-charcoal md:text-7xl"
          >
            More Than a Meal
          </TextReveal>
        </div>

        <div ref={stickyRef} className="relative mb-20 md:mb-32">
          <div className="exp-sticky-content mb-12 hidden lg:block">
            <p className="max-w-lg text-lg leading-relaxed text-charcoal/70">
              Step into a world where every detail is designed to delight —
              from the moment you walk in to the last satisfying bite.
            </p>
          </div>

          <div className="exp-grid grid gap-8 md:grid-cols-3 md:gap-6">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.title}
                className="exp-card group relative overflow-hidden rounded-[2rem]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                data-cursor="hover"
              >
                <div className="exp-parallax relative aspect-[3/4]">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="mb-2 inline-block text-xs font-bold text-yellow">
                    0{i + 1}
                  </span>
                  <h3 className="display-text mb-2 text-2xl text-beige md:text-3xl">
                    {exp.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-beige/70">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="display-text mb-10 text-center text-3xl text-charcoal md:text-4xl">
            What People Say
          </h3>

          <div className="testimonials-grid grid gap-6 md:grid-cols-3 md:gap-8">
            {TESTIMONIALS.map((t) => (
              <motion.blockquote
                key={t.author}
                className="testimonial-card rounded-[2rem] bg-cream p-8 md:p-10"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-charcoal/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <cite className="text-sm font-semibold not-italic text-charcoal/50">
                  — {t.author}
                </cite>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
