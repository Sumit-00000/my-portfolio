"use client";

import { useEffect, useRef } from "react";

/**
 * 01 · THE LOAD FIELD
 * The hero's ambient visualization: discrete pulses (requests) flow
 * left→right through routed lanes and occasionally re-route between
 * them — a system, running, steadily. Cursor movement adds load; the
 * system visibly absorbs it (throughput rises, nothing drops). The
 * interaction IS the message.
 *
 * Engineering constraints (these are the design):
 *  - single canvas, single rAF, DPR capped at 2
 *  - no shadowBlur; glow comes from one pre-rendered sprite
 *  - pauses when the hero leaves the viewport or the tab hides
 *  - prefers-reduced-motion → one static frame, zero animation
 *  - touch devices → calmer ambient field, no pointer coupling
 *  - decorative: aria-hidden, pointer-events: none
 */

type Pulse = {
  x: number;
  y: number;
  lane: number;
  speed: number; // px/s at load 0
  routeFromY: number | null;
  routeToY: number | null;
  routeStartX: number;
  routeLen: number;
  size: number;
  alt: boolean; // second accent hue for a small minority of pulses
};

const LANE_GAP = 76; // px between lanes
const MAX_DT = 0.033; // clamp big frame gaps (tab jank) — s

function cssRgb(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  const m = raw.match(/^#([0-9a-f]{6})$/i);
  if (!m) return [94, 139, 255];
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function makeSprite(rgb: [number, number, number]): HTMLCanvasElement {
  const s = document.createElement("canvas");
  s.width = s.height = 32;
  const c = s.getContext("2d")!;
  const g = c.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, `rgba(${rgb.join(",")},0.9)`);
  g.addColorStop(0.35, `rgba(${rgb.join(",")},0.35)`);
  g.addColorStop(1, `rgba(${rgb.join(",")},0)`);
  c.fillStyle = g;
  c.fillRect(0, 0, 32, 32);
  return s;
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);

export function LoadField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const accent = cssRgb("--accent");
    const accent2 = cssRgb("--accent-2");
    const sprite = makeSprite(accent);
    const spriteAlt = makeSprite(accent2);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let lanes: number[] = [];
    const maxPulses = coarse ? 34 : 70;
    const pulses: Pulse[] = [];

    // -- load model: pointer movement adds load, system absorbs it ----
    let load = 0; // 0..1
    let pointerX = -1;
    let pointerY = -1;
    let spawnDebt = 0;

    let raf = 0;
    let running = false;
    let inView = true;
    let last = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(4, Math.floor(h / LANE_GAP));
      const pad = h * 0.12;
      lanes = Array.from(
        { length: count },
        (_, i) => pad + (i * (h - pad * 2)) / (count - 1),
      );
      if (reduced.matches) drawStatic();
    };

    const spawn = (nearY?: number) => {
      if (pulses.length >= maxPulses) return;
      let lane: number;
      if (nearY !== undefined && lanes.length) {
        let best = 0;
        for (let i = 1; i < lanes.length; i++)
          if (Math.abs(lanes[i] - nearY) < Math.abs(lanes[best] - nearY))
            best = i;
        lane = best;
      } else {
        lane = Math.floor(Math.random() * lanes.length);
      }
      pulses.push({
        x: -24,
        y: lanes[lane],
        lane,
        speed: 55 + Math.random() * 95,
        routeFromY: null,
        routeToY: null,
        routeStartX: 0,
        routeLen: 0,
        size: 0.75 + Math.random() * 0.6,
        alt: Math.random() < 0.14,
      });
    };

    const maybeRoute = (p: Pulse) => {
      if (p.routeToY !== null || lanes.length < 2) return;
      if (Math.random() > 0.004) return; // per-frame chance while mid-field
      const dir = p.lane === 0 ? 1 : p.lane === lanes.length - 1 ? -1 : Math.random() < 0.5 ? -1 : 1;
      const target = p.lane + dir;
      p.routeFromY = p.y;
      p.routeToY = lanes[target];
      p.routeStartX = p.x;
      p.routeLen = 90 + Math.random() * 120;
      p.lane = target;
    };

    const drawLanes = (alpha: number) => {
      ctx.lineWidth = 1;
      for (const y of lanes) {
        // lanes near the pointer brighten with load — the system lighting up
        let a = alpha;
        if (pointerY >= 0 && load > 0.02) {
          const prox = Math.max(0, 1 - Math.abs(y - pointerY) / 140);
          a += load * prox * 0.10;
        }
        ctx.strokeStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
        ctx.stroke();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      drawLanes(0.035);
    };

    const frame = (t: number) => {
      if (!running) return;
      const dt = Math.min((t - last) / 1000 || 0, MAX_DT);
      last = t;

      // absorb: load decays exponentially — pushed, it settles
      load *= Math.exp(-dt / 0.9);
      if (load < 0.001) load = 0;

      // steady baseline throughput + load-driven extra
      const rate = (coarse ? 2.2 : 3.5) + load * 14; // pulses/s
      spawnDebt += rate * dt;
      while (spawnDebt >= 1) {
        spawnDebt -= 1;
        spawn(load > 0.05 && pointerY >= 0 && Math.random() < 0.7 ? pointerY : undefined);
      }

      ctx.clearRect(0, 0, w, h);
      drawLanes(0.035);

      const speedFactor = 1 + load * 0.5; // under load, it goes FASTER
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.x += p.speed * speedFactor * dt;
        maybeRoute(p);
        if (p.routeToY !== null && p.routeFromY !== null) {
          const tt = Math.min((p.x - p.routeStartX) / p.routeLen, 1);
          p.y = p.routeFromY + (p.routeToY - p.routeFromY) * smoothstep(tt);
          if (tt >= 1) {
            p.routeFromY = null;
            p.routeToY = null;
          }
        }
        if (p.x > w + 24) {
          pulses.splice(i, 1);
          continue;
        }
        // tail: a short gradient streak — motion without shadowBlur
        const rgb = p.alt ? accent2 : accent;
        const tail = 14 + p.speed * speedFactor * 0.12;
        const grad = ctx.createLinearGradient(p.x - tail, p.y, p.x, p.y);
        grad.addColorStop(0, `rgba(${rgb.join(",")},0)`);
        grad.addColorStop(1, `rgba(${rgb.join(",")},0.35)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x - tail, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        const s = 10 * p.size;
        ctx.drawImage(p.alt ? spriteAlt : sprite, p.x - s / 2, p.y - s / 2, s, s);
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced.matches || !inView || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (coarse) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        pointerX = pointerY = -1;
        return;
      }
      if (pointerX >= 0) {
        const d = Math.hypot(x - pointerX, y - pointerY);
        load = Math.min(1, load + d * 0.0016);
      }
      pointerX = x;
      pointerY = y;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        inView ? start() : stop();
      },
      { threshold: 0.02 },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionPref = () => {
      if (reduced.matches) {
        stop();
        pulses.length = 0;
        drawStatic();
      } else {
        start();
      }
    };

    resize();
    // seed the field so the hero never opens empty
    if (!reduced.matches) {
      for (let i = 0; i < (coarse ? 10 : 18); i++) {
        spawn();
        pulses[pulses.length - 1].x = Math.random() * w;
      }
    }
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener?.("change", onMotionPref);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener?.("change", onMotionPref);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
