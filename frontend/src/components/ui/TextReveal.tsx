"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  splitBy?: "words" | "chars";
}

export default function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parts =
      splitBy === "words"
        ? children.split(" ").map((w) => `<span class="inline-block overflow-hidden"><span class="reveal-inner inline-block">${w}&nbsp;</span></span>`)
        : children.split("").map((c) => `<span class="inline-block overflow-hidden"><span class="reveal-inner inline-block">${c === " " ? "&nbsp;" : c}</span></span>`);

    el.innerHTML = parts.join("");

    const inners = el.querySelectorAll(".reveal-inner");

    gsap.set(inners, { y: "110%" });

    const tween = gsap.to(inners, {
      y: "0%",
      duration: 1,
      stagger: splitBy === "words" ? 0.08 : 0.03,
      delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [children, delay, splitBy]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={clsx(className)}
    />
  );
}
