"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const variants = {
    primary: "bg-red text-white hover:bg-red-dark shadow-lg shadow-red/25",
    secondary: "bg-yellow text-charcoal hover:bg-yellow-warm",
    outline:
      "border-2 border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-beige",
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "relative inline-flex cursor-none items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-colors duration-300 md:px-10 md:py-5 md:text-base",
        variants[variant],
        className
      )}
      data-cursor="hover"
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/10"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return <button onClick={onClick}>{inner}</button>;
}
