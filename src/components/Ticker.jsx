export default function Ticker({ items = [] }) {
  const loop = [...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden border-y py-3"
      style={{ borderColor: "var(--line)" }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
        style={{ background: "linear-gradient(90deg, var(--bg), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
        style={{ background: "linear-gradient(270deg, var(--bg), transparent)" }}
      />
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-sm tracking-wide">
            <span className="text-text">{item}</span>
            <span className="text-accent">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
