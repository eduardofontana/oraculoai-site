"use client";

import { useEffect, useRef } from "react";

const CDN = "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg";

const brands = [
  { name: "OpenAI", src: `${CDN}/openai.svg`, dark: true },
  { name: "Anthropic", src: `${CDN}/anthropic.svg` },
  { name: "Google Gemini", src: `${CDN}/google-gemini.svg` },
  { name: "Meta", src: `${CDN}/meta.svg` },
  { name: "Mistral AI", src: `${CDN}/mistral-ai.svg` },
  { name: "Hugging Face", src: `${CDN}/hugging-face.svg`, dark: true },
  { name: "DeepSeek", src: `${CDN}/deepseek.svg` },
  { name: "xAI Grok", src: `${CDN}/grok.svg`, dark: true },
  { name: "Perplexity", src: `${CDN}/perplexity.svg` },
  { name: "Docker", src: `${CDN}/docker.svg`, dark: true },
  { name: "Cloudflare", src: `${CDN}/cloudflare.svg` },
  { name: "Vercel", src: `${CDN}/vercel.svg`, dark: true },
  { name: "Kubernetes", src: `${CDN}/kubernetes.svg` },
  { name: "AWS", src: "/aws-white.svg" },
  { name: "Azure", src: `${CDN}/azure.svg` },
  { name: "Google Cloud", src: `${CDN}/google-cloud.svg` },
  { name: "GitHub", src: `${CDN}/github.svg`, dark: true },
  { name: "PostgreSQL", src: `${CDN}/postgresql.svg` },
  { name: "Python", src: `${CDN}/python.svg` },
  { name: "Linux", src: `${CDN}/linux.svg`, dark: true },
  { name: "Firebase", src: `${CDN}/firebase.svg` },
];

export function AiBrandsTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf: number;
    const getHalf = () => track.scrollWidth / 3;
    let halfWidth = getHalf();

    function animate() {
      posRef.current -= 1;
      if (Math.abs(posRef.current) >= halfWidth) {
        posRef.current = 0;
        halfWidth = getHalf();
      }
      track!.style.transform = `translateX(${posRef.current}px)`;
      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [...brands, ...brands, ...brands];

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        left: 0,
        right: 0,
        zIndex: 40,
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backgroundColor: "rgba(11,11,18,0.85)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          padding: "10px 20px",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {items.map((brand, i) => (
          <img
            key={`${brand.name}-${i}`}
            src={brand.src}
            alt={brand.name}
            width={28}
            height={28}
            style={{
              flexShrink: 0,
              filter: brand.dark ? "invert(1)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
