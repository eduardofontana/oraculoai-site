type Props = {
  quote: string;
  author: string;
  role: string;
};

export function TestimonialCard({ quote, author, role }: Props) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:border-border-hover hover:-translate-y-0.5">
      <svg className="mb-4 h-6 w-6 text-accent-text/25" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <blockquote className="flex-1 text-sm leading-7 text-secondary">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <p className="text-sm font-medium text-primary">{author}</p>
        <p className="text-xs text-muted">{role}</p>
      </figcaption>
    </figure>
  );
}
