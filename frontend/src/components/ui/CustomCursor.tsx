"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 80, damping: 25, mass: 0.8 });
  const ringY = useSpring(cursorY, { stiffness: 80, damping: 25, mass: 0.8 });
  const dotScale = useSpring(1, { stiffness: 400, damping: 25 });
  const ringScale = useSpring(1, { stiffness: 300, damping: 20 });
  const ringOpacity = useSpring(0.6, { stiffness: 200, damping: 15 });
  const isHovering = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleEnter = () => {
      isHovering.current = true;
      dotScale.set(0);
      ringScale.set(2.4);
      ringOpacity.set(0.2);
    };

    const handleLeave = () => {
      isHovering.current = false;
      dotScale.set(1);
      ringScale.set(1);
      ringOpacity.set(0.6);
    };

    window.addEventListener("mousemove", move);
    const updateListeners = () => {
      document.querySelectorAll("a, button, [data-cursor='hover']").forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    };
    updateListeners();

    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, [data-cursor='hover']").forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      observer.disconnect();
    };
  }, [isMobile, cursorX, cursorY, dotScale, ringScale, ringOpacity]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red"
        style={{ x: cursorX, y: cursorY, scale: dotScale }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red/60 bg-red/10"
        style={{ x: ringX, y: ringY, scale: ringScale, opacity: ringOpacity }}
      />
    </>
  );
}
