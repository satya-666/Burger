"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.5 });
  const dotScale = useSpring(1, { stiffness: 400, damping: 25 });
  const ringScale = useSpring(1, { stiffness: 300, damping: 20 });
  const isHovering = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleEnter = () => {
      isHovering.current = true;
      dotScale.set(0.5);
      ringScale.set(1.8);
    };

    const handleLeave = () => {
      isHovering.current = false;
      dotScale.set(1);
      ringScale.set(1);
    };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor='hover']").forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, [data-cursor='hover']").forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [isMobile, cursorX, cursorY, dotScale, ringScale]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red mix-blend-difference"
        style={{ x: cursorX, y: cursorY, scale: dotScale }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-charcoal/30"
        style={{ x: ringX, y: ringY, scale: ringScale }}
      />
    </>
  );
}
