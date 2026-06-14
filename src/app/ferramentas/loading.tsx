export default function FerramentasLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-8">
      <div className="mb-10 max-w-2xl">
        <div className="mb-3 h-3 w-24 animate-pulse rounded-full bg-border" />
        <div className="mb-3 h-8 w-64 animate-pulse rounded-lg bg-border" />
        <div className="h-4 w-96 animate-pulse rounded bg-border" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-4 h-10 w-10 animate-pulse rounded-xl bg-border" />
            <div className="mb-2 h-4 w-32 animate-pulse rounded bg-border" />
            <div className="h-3 w-full animate-pulse rounded bg-border" />
          </div>
        ))}
      </div>
    </div>
  );
}
