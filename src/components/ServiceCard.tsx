import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  bullets: readonly string[];
  href: string;
};

export function ServiceCard({ title, description, bullets, href }: ServiceCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-zinc-200">
        {bullets.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
      >
        Ver serviço
      </Link>
    </article>
  );
}
