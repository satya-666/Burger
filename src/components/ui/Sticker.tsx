"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface StickerProps {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: "red" | "yellow" | "charcoal";
  delay?: number;
}

export default function Sticker({
  children,
  className,
  rotate = -12,
  color = "red",
  delay = 0,
}: StickerProps) {
  const colors = {
    red: "bg-red text-white",
    yellow: "bg-yellow text-charcoal",
    charcoal: "bg-charcoal text-beige",
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: rotate - 20, opacity: 0 }}
      animate={{ scale: 1, rotate, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 15,
        delay,
      }}
      whileHover={{ scale: 1.1, rotate: rotate + 5 }}
      className={clsx(
        "display-text sticker-outline inline-flex items-center justify-center rounded-full px-4 py-2 text-xs uppercase md:px-5 md:py-2.5 md:text-sm",
        colors[color],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
