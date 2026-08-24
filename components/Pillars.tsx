import { Section, Heading, Lead, Card } from "./Section";

// Three pillars — verbatim from BRAND-AND-COPY-DECK.md §3.3.

const pillars = [
  {
    title: "Works with no internet",
    body: "The entire question bank lives on your phone. Practice on the bus, in a basement, on a dead data pack. Nothing to download mid-session.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 9.5C3 8.12 4.12 7 5.5 7h13A2.5 2.5 0 0 1 21 9.5V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 11h10M7 14h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Answers you can trust",
    body: "Every numeric answer is re-derived from the question by an independent solver. If the content and the solver disagree, the build fails. 0 duplicates, 0 integrity defects.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Built for Commerce",
    body: "Accountancy and Maths are the deepest chapters here, not an afterthought bolted onto a science app.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 19V8m4 11V5m4 14v-7m4 7v-4m4 4V9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function Pillars() {
  return (
    <Section id="pillars">
      <div className="grid sm:grid-cols-3 gap-5">
        {pillars.map((p) => (
          <Card key={p.title}>
            <div className="size-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-4">
              {p.icon}
            </div>
            <h3 className="text-xl font-semibold text-ink mb-2">{p.title}</h3>
            <p className="text-ink-soft text-pretty leading-relaxed">{p.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}