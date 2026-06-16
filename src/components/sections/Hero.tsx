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
      <div className="absolute inset-x-0 top-0 h-3 bg-red" />
      <div className="hero-float-shape absolute -right-24 top-28 h-64 w-64 rounded-full bg-yellow opacity-80 md:h-96 md:w-96" />
      <div className="hero-float-shape absolute -left-24 bottom-12 h-48 w-48 rounded-full bg-red opacity-10 md:h-72 md:w-72" />
      <div className="travel-path hero-float-shape absolute right-[6%] top-[25%] hidden h-3 w-[34vw] rotate-[38deg] md:block" />
      <div className="travel-path hero-float-shape absolute bottom-[15%] left-[8%] hidden h-3 w-[40vw] -rotate-[8deg] md:block" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center">
        <Sticker color="red" rotate={-5} delay={0.15} className="hero-sticker mb-4">
          Top Classic
        </Sticker>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hero-bg-text display-text crav-text max-w-6xl text-center text-[16vw] leading-[0.78] sm:text-[14vw] lg:text-[9.6rem]"
        >
          Juicy Cheesy
          <br />
          Fully Loaded
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 max-w-3xl text-center text-base font-black uppercase leading-snug text-charcoal md:text-2xl"
        >
          CRAV is back and bolder than ever. Smashed hot, sauced loud, and
          stacked for the ultimate bite.
        </motion.p>

        <div className="hero-cta mt-8">
          <MagneticButton href="#featured" variant="primary">
            Order Now
          </MagneticButton>
        </div>
      </div>

      <motion.div
        ref={burgerRef}
        className="hero-burger chunky-card absolute -bottom-8 right-[4%] z-20 hidden aspect-[4/3] w-[24vw] max-w-[360px] rotate-6 overflow-hidden rounded-[1.6rem] bg-cream md:block"
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
        <Image
          src="/assets/crav-burger.png"
          alt="Fully loaded cheeseburger"
          fill
          className="object-cover"
          priority
          sizes="360px"
        />
      </motion.div>

      <div className="hero-sticker chunky-card absolute -bottom-10 left-[8%] z-20 hidden aspect-[4/3] w-[26vw] max-w-[390px] -rotate-3 overflow-hidden rounded-[1.6rem] bg-cream md:block">
        <Image
          src="/assets/crav-bite.png"
          alt="Burger served hot"
          fill
          className="object-cover"
          priority
          sizes="390px"
        />
      </div>

      <div className="hero-sticker absolute left-[6%] top-[26%] hidden lg:block">
        <Sticker color="yellow" rotate={-10} delay={0.35}>
          Smashed Patties
        </Sticker>
      </div>
      <div className="hero-sticker absolute right-[8%] top-[24%] hidden lg:block">
        <Sticker color="red" rotate={9} delay={0.5}>
          Est. 2010
        </Sticker>
      </div>
      <div className="hero-sticker absolute right-[18%] bottom-[18%] hidden lg:block">
        <Sticker color="charcoal" rotate={-12} delay={0.65}>
          Toasted Buns
        </Sticker>
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
