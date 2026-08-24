import { Section, Heading, Lead, Card } from "./Section";
import { stats, formatIndian } from "@/lib/loaders";

// §3.5 of the copy deck: "We check our own answers with a second program."

export function Verification() {
  return (
    <Section id="verify">
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            The verification story
          </p>
          <Heading className="mt-2">
            We check our own answers with a second program.
          </Heading>
          <Lead>
            Every numeric question is solved twice &mdash; once when it&rsquo;s
            written, and again by a separate solver that reads only the
            question text and has no access to the stored answer. If the two
            disagree, the build fails and nothing ships.
          </Lead>
          <p className="mt-4 text-ink-soft text-pretty leading-relaxed">
            Wrong options aren&rsquo;t filler either: each one is a mistake
            students actually make, so getting it wrong still teaches you
            something.
          </p>
        </div>

        <Card className="!p-0 overflow-hidden">
          <div className="grid grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
            <Stat label="Duplicates" value={stats.totals.duplicates} />
            <Stat label="Integrity defects" value={stats.totals.integrityDefects} />
            <Stat
              label="Explained"
              value={`${formatIndian(stats.totals.explainedQuestions)}`}
              sub={`${((stats.totals.explainedQuestions / stats.totals.questions) * 100).toFixed(1)}% of bank`}
            />
          </div>
          <div className="border-t border-line p-5 sm:p-6 bg-canvas-alt/40">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Pipeline
            </p>
            <ol className="mt-3 space-y-3 text-sm text-ink-soft">
              <li className="flex gap-3">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-primary-soft text-primary flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                Question written by an author. Numeric answer stored.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-primary-soft text-primary flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                Independent solver reads the question text only and solves it
                from scratch.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-primary-soft text-primary flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                The two answers must match. Otherwise the build fails.
              </li>
            </ol>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
        {label}
      </p>
      <p className="mt-2 text-2xl sm:text-3xl font-semibold text-ink">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-ink-soft">{sub}</p>}
    </div>
  );
}