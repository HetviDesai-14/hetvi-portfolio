export default function Divider({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1" style={{ background: "var(--line)" }} />
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
      <span className="h-px w-10" style={{ background: "var(--line)" }} />
    </div>
  );
}
