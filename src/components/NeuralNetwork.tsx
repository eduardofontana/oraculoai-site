"use client";

import { useEffect, useRef } from "react";

/* ── Types ── */

type RGB = [r: number, g: number, b: number];

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
}

/* ── Palette ── */

const PAL = {
  dot: [31, 95, 255] as RGB,       // blue
  dotAlt: [225, 25, 55] as RGB,    // red
  particle: [255, 255, 255] as RGB,
};

const PAL_LIGHT: typeof PAL = {
  dot: [26, 94, 255],
  dotAlt: [212, 21, 44],
  particle: [0, 0, 0],
};

function isDark() {
  return document.documentElement.classList.contains("dark");
}

/* ── Constants ── */

const DOTS = 70;
const PARTICLES = 100;
const CONN_DIST = 130;
const PART_CONN_DIST = 100;

/* ── Helpers ── */

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/* ── Component ── */

export function NeuralNetwork() {
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;

    /* ── resize ── */
    let W: number, H: number;
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /* ── create dots (pequenos nós azuis/vermelhos) ── */
    function createDots(): Dot[] {
      const dots: Dot[] = [];
      for (let i = 0; i < DOTS; i++) {
        dots.push({
          x: rand(0, W),
          y: rand(0, H),
          vx: rand(-0.08, 0.08),
          vy: rand(-0.08, 0.08),
          radius: rand(1.2, 2.5),
          alpha: rand(0.2, 0.5),
          phase: rand(0, Math.PI * 2),
        });
      }
      return dots;
    }

    /* ── create microparticles ── */
    function createParticles(): Dot[] {
      const p: Dot[] = [];
      for (let i = 0; i < PARTICLES; i++) {
        p.push({
          x: rand(0, W),
          y: rand(0, H),
          vx: rand(-0.12, 0.12),
          vy: rand(-0.12, 0.12),
          radius: rand(0.5, 1),
          alpha: rand(0.08, 0.2),
          phase: 0,
        });
      }
      return p;
    }

    /* ── init ── */
    resize();
    const dots = createDots();
    const particles = createParticles();

    /* ── Resize ── */
    function onResize() {
      resize();
    }
    window.addEventListener("resize", onResize);

    /* ── Animation loop ── */
    let raf: number;

    function draw() {
      const dark = isDark();
      const pal = dark ? PAL : PAL_LIGHT;

      ctx.clearRect(0, 0, W, H);

      // Update positions
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -20 || d.x > W + 20) d.vx *= -1;
        if (d.y < -20 || d.y > H + 20) d.vy *= -1;
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20 || p.x > W + 20) p.vx *= -1;
        if (p.y < -20 || p.y > H + 20) p.vy *= -1;
      }

      // ── Draw dot-to-dot connections ──
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIST) {
            const alpha = (1 - dist / CONN_DIST) * 0.12;
            const c = (i + j) % 2 === 0 ? pal.dot : pal.dotAlt;
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // ── Draw particle-particle connections ──
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 1; j < particles.length; j += 2) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < PART_CONN_DIST) {
            const alpha = (1 - dist / PART_CONN_DIST) * 0.03;
            ctx.strokeStyle = `rgba(${pal.particle[0]},${pal.particle[1]},${pal.particle[2]},${alpha})`;
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // ── Draw dots ──
      const pulse = Math.sin(Date.now() / 2000) * 0.15 + 0.85;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const c = i % 5 === 0 ? pal.dotAlt : pal.dot;
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${d.alpha * pulse})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Draw particles ──
      ctx.fillStyle = `rgba(${pal.particle[0]},${pal.particle[1]},${pal.particle[2]},0.08)`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={cvs}
      className="pointer-events-none fixed inset-0 z-[-1]"
      aria-hidden="true"
    />
  );
}
