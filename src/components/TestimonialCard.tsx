type Props = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

export function TestimonialCard({ quote, author, role, avatar }: Props) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:border-border-hover hover:-translate-y-0.5">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" className="text-accent"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
        ))}
      </div>
      <blockquote className="flex-1 text-sm leading-7 text-secondary">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <img
          src={avatar}
          alt={author}
          className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-border"
        />
        <div>
          <p className="text-sm font-bold text-primary">{author}</p>
          <p className="text-xs text-muted">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
