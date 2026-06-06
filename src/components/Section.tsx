import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type Props = {
  children: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
};

export function Section({ children, eyebrow, title, description, id }: Props) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-20 md:px-8 md:py-28">
      {(eyebrow || title) && (
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-text/70">
                {eyebrow}
              </p>
            )}
            <h2 className="mt-5 font-display text-4xl tracking-tight text-primary md:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-base leading-8 text-secondary">{description}</p>
            )}
          </div>
        </Reveal>
      )}
      {children}
    </section>
  );
}
