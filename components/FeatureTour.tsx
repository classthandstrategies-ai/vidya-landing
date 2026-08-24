import { Section, Heading, Lead, Card } from "./Section";

// Features that genuinely exist and work — verified in the running app
// (brief §2.5). Not aspirational.

const features = [
  {
    title: "Practice",
    body: "Instant feedback, written explanations and step-by-step working on every question.",
  },
  {
    title: "Spaced repetition (SM-2)",
    body: "A due queue seeded only by questions you've actually attempted. Nothing to pre-empt.",
  },
  {
    title: "Mistake notebook",
    body: "Wrong answers captured automatically, with the explanation and the misconception that picked them.",
  },
  {
    title: "Timed mock exams",
    body: "Real negative marking, question palette, mark-for-review, and a single-submission guard.",
  },
  {
    title: "Study planner",
    body: "Per-day targets that respect what's actually due in your spaced-repetition queue.",
  },
  {
    title: "Progress analytics",
    body: "Accuracy, streak, and per-subject breakdown — derived from your real stored work.",
  },
  {
    title: "10 commerce calculators",
    body: "GST, interest, EMI, depreciation, ratios. Offline. No ads, no upsells.",
  },
  {
    title: "Formula sheets & notes",
    body: "Bundled and offline. The whole library travels with the app.",
  },
];

export function FeatureTour() {
  return (
    <Section id="features">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Features
        </p>
        <Heading className="mt-2">What&rsquo;s actually in the app.</Heading>
        <Lead>
          Every feature listed here is implemented in the current build. None
          are placeholders.
        </Lead>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <Card key={f.title} className="!p-5">
            <h3 className="text-lg font-semibold text-ink">{f.title}</h3>
            <p className="mt-2 text-sm text-ink-soft text-pretty leading-relaxed">
              {f.body}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}