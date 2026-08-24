import { Container } from "./Section";
import { HeroQuestion } from "./sections/Hero";
import { stats, pickQuestionForToday, formatIndian } from "@/lib/loaders";

export function Hero() {
  const question = pickQuestionForToday();
  const total = stats.totals.questions;
  const examReady = stats.totals.examReadyChapters;

  return (
    <div id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-soft/60 via-canvas to-canvas"
        aria-hidden="true"
      />
      <Container className="pt-10 sm:pt-16 pb-12 sm:pb-20">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-start">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-xs font-medium text-ink-soft backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span>Pre-launch · {examReady} chapters exam-ready</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink text-balance">
              Practice that works when your internet doesn't.
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-ink-soft max-w-xl text-pretty">
              <span className="font-semibold text-ink">
                {formatIndian(total)} CBSE Commerce & Maths questions
              </span>{" "}
              with worked solutions — on your phone, no connection needed. Every
              numeric answer is verified by a second program that solves it
              independently.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#play" className="btn-primary">
                Try one right now →
              </a>
              <a href="#waitlist" className="btn-secondary">
                Get notified at launch
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <dt className="text-xs text-ink-faint font-medium uppercase tracking-wider">
                  Questions
                </dt>
                <dd className="text-2xl sm:text-3xl font-semibold text-ink">
                  {formatIndian(total)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-faint font-medium uppercase tracking-wider">
                  Exam-ready
                </dt>
                <dd className="text-2xl sm:text-3xl font-semibold text-ink">
                  {examReady}
                  <span className="text-ink-soft text-base font-medium">
                    {" / "}
                    {stats.totals.chapters}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-faint font-medium uppercase tracking-wider">
                  Mock papers
                </dt>
                <dd className="text-2xl sm:text-3xl font-semibold text-ink">
                  {stats.totals.mockPapers}
                </dd>
              </div>
            </dl>
          </div>

          <div id="play" className="lg:pt-2">
            <p className="mb-3 text-sm font-medium text-ink-soft">
              <span className="text-primary">Try one.</span> No signup.
            </p>
            <HeroQuestion question={question} />
            <p className="mt-3 text-xs text-ink-faint">
              One of {formatIndian(stats.totals.explainedQuestions)} explained
              questions in the bank.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}