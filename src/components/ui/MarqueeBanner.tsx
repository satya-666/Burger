"use client";

import { MARQUEE_ITEMS } from "@/lib/constants";

interface MarqueeBannerProps {
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  className?: string;
}

export default function MarqueeBanner({
  speed = "normal",
  reverse = false,
  className = "",
}: MarqueeBannerProps) {
  const durations = { slow: "35s", normal: "25s", fast: "18s" };
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className={`overflow-hidden py-4 md:py-6 ${className}`}>
      <div
        className="marquee-track gap-8 md:gap-12"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: durations[speed],
        }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="display-text flex shrink-0 items-center gap-8 text-4xl text-charcoal/20 md:gap-12 md:text-7xl lg:text-8xl"
          >
            {item}
            <span className="inline-block h-3 w-3 rounded-full bg-red md:h-4 md:w-4" />
          </span>
        ))}
      </div>
    </div>
  );
}
