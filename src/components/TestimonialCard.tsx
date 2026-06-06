type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
};

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <svg className="mb-4 h-6 w-6 text-amber-400/40" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179z" />
      </svg>
      <blockquote className="text-sm leading-7 text-zinc-300">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 border-t border-white/10 pt-4">
        <p className="text-sm font-semibold text-white">{author}</p>
        <p className="text-xs text-zinc-400">{role}</p>
      </figcaption>
    </figure>
  );
}
