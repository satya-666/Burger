"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import Sticker from "@/components/ui/Sticker";
import MagneticButton from "@/components/ui/MagneticButton";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [-300, 300], [-20, 20]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-300, 300], [-15, 15]), springConfig);

  useEffect(() => {
    if (isMobile) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set(x - centerX);
    mouseY.set(y - centerY);
  }, [x, y, isMobile, mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-bg-text", {
        y: 120,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(".hero-burger", {
        scale: 0.6,
        opacity: 0,
        rotation: -15,
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 0.5,
      });

      gsap.from(".hero-sticker", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(2)",
        delay: 1,
      });

      gsap.from(".hero-cta", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2,
      });

      gsap.from(".hero-scroll", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 1.6,
      });

      gsap.to(".hero-float-shape", {
        y: "+=20",
        rotation: "+=5",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.5, from: "random" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-24 md:px-8"
    >
      {/* Decorative shapes */}
      <div className="hero-float-shape absolute left-[5%] top-[20%] h-16 w-16 rounded-full bg-yellow/40 blur-sm md:h-24 md:w-24" />
      <div className="hero-float-shape absolute right-[8%] top-[30%] h-12 w-12 rotate-45 bg-red/20 md:h-20 md:w-20" />
      <div className="hero-float-shape absolute bottom-[25%] left-[15%] h-8 w-8 rounded-full border-4 border-yellow md:h-12 md:w-12" />
      <div className="hero-float-shape absolute bottom-[30%] right-[12%] h-20 w-20 rounded-full bg-red/10 md:h-32 md:w-32" />

      {/* Layered background typography */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="hero-bg-text display-text absolute text-[18vw] text-charcoal/[0.04] md:text-[22vw]">
          FLAME
        </span>
        <span className="hero-bg-text display-text absolute translate-y-[15vh] text-[14vw] text-stroke md:text-[18vw]">
          GRILLED
        </span>
      </div>

      {/* Main headline composition */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center">
        <div className="relative flex w-full items-center justify-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="display-text absolute left-0 top-1/2 hidden -translate-y-1/2 text-[12vw] text-charcoal lg:block lg:text-[10vw]"
          >
            THE
          </motion.h1>

          {/* Floating burger */}
          <motion.div
            ref={burgerRef}
            className="hero-burger relative z-20"
            style={
              isMobile
                ? {}
                : {
                    rotateX,
                    rotateY,
                    x: translateX,
                    y: translateY,
                    transformPerspective: 1000,
                  }
            }
          >
            <div className="relative h-[45vw] w-[45vw] max-h-[420px] max-w-[420px] md:h-[38vw] md:w-[38vw]">
              <div className="absolute inset-0 rounded-full bg-yellow/20 blur-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1568901347635-c89a5c4a0a42?w=800&q=90&auto=format&fit=crop"
                alt="Premium flame-grilled burger"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 45vw, 420px"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="display-text absolute right-0 top-1/2 hidden -translate-y-1/2 text-[12vw] text-red lg:block lg:text-[10vw]"
          >
            BUN
          </motion.h1>
        </div>

        {/* Mobile headline */}
        <h1 className="display-text mt-6 text-center text-[14vw] leading-none text-charcoal sm:text-[12vw] lg:hidden">
          THE<span className="text-red"> BUN</span>
        </h1>

        {/* Stickers */}
        <div className="hero-sticker absolute left-[8%] top-[18%] hidden md:block">
          <Sticker color="yellow" rotate={-8} delay={0.2}>
            🔥 Flame Grilled
          </Sticker>
        </div>
        <div className="hero-sticker absolute right-[6%] top-[22%] hidden md:block">
          <Sticker color="red" rotate={12} delay={0.35}>
            Since 2019
          </Sticker>
        </div>
        <div className="hero-sticker absolute bottom-[22%] left-[10%] hidden lg:block">
          <Sticker color="charcoal" rotate={-15} delay={0.5}>
            ★ Award Winning
          </Sticker>
        </div>
        <div className="hero-sticker absolute bottom-[20%] right-[8%] hidden lg:block">
          <Sticker color="yellow" rotate={8} delay={0.65}>
            Fresh Daily
          </Sticker>
        </div>
      </div>

      {/* Subtitle & CTA */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-6 text-center md:mt-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-md text-sm leading-relaxed text-charcoal/70 md:text-base"
        >
          Premium flame-grilled burgers crafted with passion.
          <br className="hidden sm:block" />
          An experience beyond the ordinary bite.
        </motion.p>

        <div className="hero-cta">
          <MagneticButton href="#showcase" variant="primary">
            Explore Menu →
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-charcoal/40">
          Scroll
        </span>
        <div className="h-8 w-[1px] bg-charcoal/20" />
      </motion.div>
    </section>
  );
}
