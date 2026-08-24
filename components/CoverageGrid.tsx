import {
  stats,
  getChapterDepth,
  formatIndian,
} from "@/lib/loaders";
import type { Chapter, SubjectKey } from "@/lib/content";
import { Section, Heading, Lead, Card } from "./Section";

const SUBJECT_LABELS: Record<SubjectKey, string> = {
  MATHS: "Maths",
  ACCOUNTANCY: "Accountancy",
  ECONOMICS: "Economics",
  BUSINESS_STUDIES: "Business Studies",
};

// Depth encoding. Three states, two encodings (color + label) so the grid
// never relies on color alone — a hard requirement for the CVD/accessibility
// pass. The brief calls for a plain-language legend; we put it directly on
// the grid.
function depthStyle(depth: ReturnType<typeof getChapterDepth>) {
  if (depth === "exam-ready")
    return {
      label: "Exam-ready",
      bg: "bg-primary",
      border: "border-primary",
      text: "text-white",
      ring: "ring-primary/30",
    };
  if (depth === "in-progress")
    return {
      label: "In progress",
      bg: "bg-accent",
      border: "border-accent",
      text: "text-accent-on",
      ring: "ring-accent/40",
    };
  return {
    label: "Not started",
    bg: "bg-canvas-alt",
    border: "border-line-strong",
    text: "text-ink-soft",
    ring: "ring-line-strong",
  };
}

const SUBJECT_ORDER: SubjectKey[] = [
  "MATHS",
  "ACCOUNTANCY",
  "ECONOMICS",
  "BUSINESS_STUDIES",
];

export function CoverageGrid() {
  // Group chapters by subject, preserving display order from the dataset.
  const bySubject = new Map<SubjectKey, Chapter[]>();
  for (const subj of SUBJECT_ORDER) bySubject.set(subj, []);
  for (const ch of stats.chapters) {
    bySubject.get(ch.subject)?.push(ch);
  }

  const examReady = stats.totals.examReadyChapters;
  const total = stats.totals.chapters;
  const inProgress = stats.chapters.filter(
    (c) => getChapterDepth(c) === "in-progress"
  ).length;

  return (
    <Section id="coverage" className="bg-surface">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Coverage
        </p>
        <Heading className="mt-2">
          {examReady} chapters are exam-ready. Here&rsquo;s exactly which.
        </Heading>
        <Lead>
          Most apps quote a big number and let you find the gaps yourself. Ours:{" "}
          <span className="font-semibold text-ink">
            {formatIndian(stats.totals.questions)} questions across {total}{" "}
            chapters
          </span>
          &mdash; but they aren&rsquo;t spread evenly. Twelve chapters have 300+
          questions each, at three difficulty levels. The rest are being written.
          This grid is generated from the live question bank, so it&rsquo;s
          current.
        </Lead>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <Legend swatch="bg-primary" label="Exam-ready (300+ questions)" />
        <Legend swatch="bg-accent" label="In progress" />
        <Legend swatch="bg-canvas-alt border border-line-strong" label="Not started" />
      </div>

      <div className="mt-6 grid gap-6">
        {SUBJECT_ORDER.map((subj) => {
          const chapters = bySubject.get(subj) ?? [];
          const examReadyCount = chapters.filter(
            (c) => getChapterDepth(c) === "exam-ready"
          ).length;
          return (
            <Card key={subj} className="!p-5 sm:!p-6">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="text-lg font-semibold text-ink">
                  {SUBJECT_LABELS[subj]}
                </h3>
                <p className="text-sm text-ink-soft">
                  {examReadyCount} of {chapters.length} exam-ready ·{" "}
                  {formatIndian(
                    chapters.reduce((acc, c) => acc + c.total, 0)
                  )}{" "}
                  questions
                </p>
              </div>
              <div
                role="list"
                aria-label={`${SUBJECT_LABELS[subj]} chapter coverage`}
                className="mt-4 grid grid-cols-7 sm:grid-cols-10 md:grid-cols-12 gap-1.5"
              >
                {chapters.map((c) => {
                  const depth = getChapterDepth(c);
                  const style = depthStyle(depth);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="listitem"
                      title={`${c.title} — ${c.total} questions (${style.label})`}
                      aria-label={`${c.title}: ${c.total} questions, ${style.label}`}
                      className={`group relative aspect-square rounded-md ${style.bg} ${style.border} border focus-visible:outline-accent transition hover:scale-105`}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                        {style.label === "Exam-ready" ? "✓" : c.total}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        Hover or tap any cell for the chapter and question count.{" "}
        {total - examReady} chapters are being authored; current total is{" "}
        <span className="font-semibold text-ink">
          {formatIndian(stats.totals.questions)} questions
        </span>{" "}
        across {total} chapters.
      </p>
      {inProgress > 0 && (
        <p className="text-xs text-ink-faint">
          {inProgress} chapter{inProgress === 1 ? "" : "s"} currently in progress.
        </p>
      )}
    </Section>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-ink-soft">
      <span
        aria-hidden="true"
        className={`inline-block size-3.5 rounded ${swatch}`}
      />
      <span>{label}</span>
    </span>
  );
}