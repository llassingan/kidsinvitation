"use client";

import { useEffect, useMemo, useState } from "react";
import Star from "./Star";

type Props = {
  count?: number;
  className?: string;
};

/**
 * Decorative twinkling stars. Positions derive from index so server and
 * client markup match (no Math.random during render).
 */
export default function FloatingStars({ count = 14, className = "" }: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 73 + 29) % 101;
        const seed2 = (i * 37 + 11) % 97;
        return {
          left: `${4 + (seed % 92)}%`,
          top: `${(seed2 * 3) % 88}%`,
          size: 8 + (seed % 4) * 4,
          delay: `${(seed % 10) * 0.35}s`,
          duration: `${2 + (seed2 % 5) * 0.5}s`,
        };
      }),
    [count],
  );

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {stars.map((s, i) => (
        <span
          key={i}
          className={reduced ? "absolute opacity-70" : "absolute animate-twinkle text-sand"}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            ["--twinkle-duration" as string]: s.duration,
          }}
        >
          <Star />
        </span>
      ))}
    </div>
  );
}
