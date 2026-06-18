"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      animate={{ scale: isHovered ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={clsx("card-tilt", className)}
      data-cursor="hover"
    >
      {children}
    </motion.div>
  );
}

interface TiltImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function TiltImage({ src, alt, className, priority }: TiltImageProps) {
  return (
    <TiltCard className={className}>
      <div className="relative h-full w-full overflow-hidden rounded-3xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading={priority ? undefined : "lazy"}
          priority={priority}
        />
      </div>
    </TiltCard>
  );
}
