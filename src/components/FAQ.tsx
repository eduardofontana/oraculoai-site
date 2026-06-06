"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  items: readonly FAQItem[];
};

export function FAQ({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl space-y-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/[0.10]"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-medium text-white transition"
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? "max-h-96" : "max-h-0"
            }`}
          >
            <p className="border-t border-white/[0.06] px-6 py-5 text-sm leading-7 text-zinc-400">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
