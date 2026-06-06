import type { ReactNode } from "react";

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
      className={`mx-auto w-full max-w-7xl px-6 py-20 md:px-8 ${className ?? ""}`.trim()}
    >
      <div className="max-w-3xl scroll-mt-24">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white md:text-6xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}
