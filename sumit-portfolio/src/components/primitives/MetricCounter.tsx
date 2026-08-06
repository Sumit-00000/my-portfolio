"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up once when it enters view — a metric arriving is state
 * being reported, which is the only kind of motion this site allows.
 * Reduced motion (or a 0 target) renders the final value instantly.
 */
export function MetricCounter({
  value,
  prefix = "",
  suffix = "",
  approx = false,
  durationMs = 900,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  approx?: boolean;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (value === 0) {
      setDone(true);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      setDone(true);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / durationMs, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setDisplay(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
          else setDone(true);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  const spoken = `${prefix.includes("\u2193") ? "down " : ""}${
    approx ? "approximately " : ""
  }${value}${suffix === "%" ? " percent" : suffix}`;

  return (
    <span ref={ref} aria-label={spoken}>
      {prefix}
      {approx ? "~" : ""}
      {done ? value : display}
      {suffix}
    </span>
  );
}
