import { Wordmark } from "./Wordmark";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-canvas/80 border-b border-line">
      <div className="container-page flex items-center justify-between py-3.5">
        <a
          href="#top"
          className="flex items-center"
          aria-label="Vidya home"
        >
          <Wordmark />
        </a>
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-ink-soft"
          aria-label="Primary"
        >
          <a href="#coverage" className="hover:text-ink">
            Coverage
          </a>
          <a href="#verify" className="hover:text-ink">
            Verification
          </a>
          <a href="#features" className="hover:text-ink">
            Features
          </a>
          <a href="#status" className="hover:text-ink">
            Status
          </a>
          <a href="#waitlist" className="btn-primary py-2 px-4 text-sm">
            Notify me
          </a>
        </nav>
        <a
          href="#waitlist"
          className="md:hidden btn-primary py-2 px-4 text-sm"
        >
          Notify me
        </a>
      </div>
    </header>
  );
}