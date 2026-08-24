// Server-only loaders. All numeric values rendered on the page go through these
// so that regenerating stats.generated.json is the only way to update them.
//
// Mistake source we are guarding against: a hand-typed "3,903" somewhere in
// JSX. LANDING-PAGE-BRIEF.md §7.1 calls this out specifically.

import statsData from "@/content/stats.generated.json";
import questionsData from "@/content/questions.sample.json";
import type { Stats, SampleQuestion, Chapter, ChapterDepth } from "./content";

export const stats = statsData as Stats;
export const sampleQuestions = questionsData as SampleQuestion[];

export function getChapterDepth(chapter: Chapter): ChapterDepth {
  if (
    chapter.easy >= 100 &&
    chapter.medium >= 100 &&
    chapter.hard >= 100
  ) {
    return "exam-ready";
  }
  if (chapter.total >= 100) return "in-progress";
  return "not-started";
}

/**
 * Pick a question for the hero question. We round-robin by day-of-year so the
 * same visitor sees the same question the same day, and the daily endpoint
 * stays stable without an external cron.
 */
export function pickQuestionForToday(
  questions: SampleQuestion[] = sampleQuestions
): SampleQuestion {
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const diff = now.getTime() - start;
  const dayOfYear = Math.floor(diff / 86_400_000);
  const index = dayOfYear % questions.length;
  return questions[index];
}

/** Format a number with Indian comma grouping (1,23,456). */
export function formatIndian(n: number): string {
  return n.toLocaleString("en-IN");
}
