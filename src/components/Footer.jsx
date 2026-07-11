import profile from "@/data/profile.json";

export default function Footer() {
  return (
    <footer
      className="site-footer flex min-h-[340px] flex-col justify-end border-t"
      style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
    >
      <div className="container-px flex flex-col items-center gap-2 pt-8 pb-4 text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Keep scrolling to reveal
        </span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="animate-bounceChevron text-muted">
          <path d="M2 5L8 11L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="container-px pb-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-display text-xl font-semibold">{profile.name}</p>
            <p className="mt-1 max-w-xs text-sm text-muted">{profile.role} · {profile.location}</p>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-muted">
            <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">
              Email
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              LinkedIn
            </a>
            <a href={profile.resumeFile} download className="hover:text-accent transition-colors">
              Résumé
            </a>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 text-center sm:flex-row sm:text-left"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="font-mono text-[11px] text-muted">
            © {new Date().getFullYear()} {profile.fullName}. Built with Next.js &amp; Tailwind.
          </p>
          <p className="font-mono text-[11px] text-muted">Designed &amp; developed with care.</p>
        </div>
      </div>
    </footer>
  );
}
