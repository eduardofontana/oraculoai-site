type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: readonly FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl transition hover:border-white/[0.12]"
        >
          <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-medium text-white">
            {item.question}
            <span className="ml-4 shrink-0 text-amber-400 transition duration-300 group-open:rotate-45">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="1" x2="8" y2="15" />
                <line x1="1" y1="8" x2="15" y2="8" />
              </svg>
            </span>
          </summary>
          <div className="border-t border-white/[0.06] px-6 pb-5 pt-3 text-sm leading-7 text-zinc-400">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
