import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  bullets: readonly string[];
  href: string;
};

export function ServiceCard({ title, description, bullets, href }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.07]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
        OraculoAI
      </p>
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{description}</p>
      <ul className="mt-6 space-y-3 text-sm text-zinc-200">
        {bullets.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-300/90" />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition group-hover:text-cyan-200"
      >
        Ver serviço <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
