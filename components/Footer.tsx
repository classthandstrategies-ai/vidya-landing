import { Container } from "./Section";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <Container className="py-10">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-end sm:justify-between">
          <div>
            <Wordmark />
            <p className="mt-3 text-sm text-ink-soft max-w-sm">
              Offline-first CBSE Commerce & Maths practice. Verified answers,
              independent solver, zero marketing fluff.
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft"
            aria-label="Footer"
          >
            <a href="#coverage" className="hover:text-ink">
              Coverage
            </a>
            <a href="#verify" className="hover:text-ink">
              Verification
            </a>
            <a
              href="https://github.com/vidya-landing"
              className="hover:text-ink"
              rel="noopener"
            >
              Public repo
            </a>
            <a href="mailto:hello@vidya.example" className="hover:text-ink">
              Contact
            </a>
          </nav>
        </div>
        <p className="mt-8 text-xs text-ink-faint">
          &copy; {new Date().getFullYear()} Vidya. Made for students, not for
          investors.
        </p>
      </Container>
    </footer>
  );
}