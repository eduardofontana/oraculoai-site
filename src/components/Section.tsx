import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-7xl px-6 py-24 md:px-8 ${className ?? ""}`.trim()}
    >
      <Reveal>
        <div className="max-w-3xl scroll-mt-24">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-400/70">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-[family-name:var(--font-instrument-serif)] text-4xl tracking-tight text-white md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </Reveal>
      {children ? <Reveal delay={150}><div className="mt-12">{children}</div></Reveal> : null}
    </section>
  );
}
