import { Section, Heading, Lead, Card } from "./Section";

// §3.7 of the copy deck: "Where we actually are."

const built = [
  "Offline-first question bank",
  "Step-by-step verification pipeline",
  "Practice, spaced repetition, mocks, mistake notebook",
  "10 commerce calculators, formula sheets, study planner",
  "This marketing site and interactive README",
];

const next = [
  "Authoring the remaining chapters to exam depth",
  "Closed device + emulator testing on Android",
  "Public web build of the study app (so the hero's 'Try 20 more' goes somewhere real)",
  "App store listing — once content and testing are both done",
];

export function Status() {
  return (
    <Section id="status">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Where we actually are
        </p>
        <Heading className="mt-2">Honest status, no roadmap theatre.</Heading>
        <Lead>
          Vidya isn&rsquo;t on the Play Store yet. The app is built and the
          question bank is real &mdash; you just answered from it &mdash; but
          we&rsquo;re finishing content depth and device testing before
          release. Leave your email and we&rsquo;ll tell you once, when
          it&rsquo;s ready. No newsletter.
        </Lead>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        <Card>
          <p className="text-sm font-semibold uppercase tracking-wider text-correct">
            Built
          </p>
          <ul className="mt-3 space-y-2 text-ink-soft text-pretty">
            {built.map((b) => (
              <li key={b} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 rounded-full bg-correct shrink-0"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-on">
            Next
          </p>
          <ul className="mt-3 space-y-2 text-ink-soft text-pretty">
            {next.map((n) => (
              <li key={n} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0"
                />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}