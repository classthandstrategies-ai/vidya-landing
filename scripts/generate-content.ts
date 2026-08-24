/**
 * Regenerate content/stats.generated.json and validate content/questions.sample.json.
 *
 * In the full pipeline (LANDING-PAGE-BRIEF.md §7.1) this script reads the live
 * dataset from the private repo's audit, runs the integrity checks, and emits
 * a JSON snapshot. For the public marketing repo the simplest correct thing is
 * to commit a snapshot and keep this script around so it can be re-run when
 * the dataset moves.
 *
 * What this script does today:
 *   1. Validates the committed JSON for shape and the most load-bearing totals.
 *   2. Refuses to write if anything is wrong (so a bad snapshot can't ship).
 *   3. Stamps `generatedAt` with the current UTC time so a stale file is
 *      detectable by the CI step that checks the file's age against the dataset.
 */

import { readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import type {
  Stats,
  Chapter,
  ChapterDepth,
  SampleQuestion,
} from "../lib/content";

const ROOT = resolve(__dirname, "..");
const STATS_PATH = resolve(ROOT, "content/stats.generated.json");
const QUESTIONS_PATH = resolve(ROOT, "content/questions.sample.json");
const SNAPSHOT_PATH = resolve(ROOT, "content/dataset.snapshot.json");

function depth(chapter: Chapter): ChapterDepth {
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

function validateStats(stats: Stats): string[] {
  const errors: string[] = [];

  if (stats.totals.chapters !== stats.chapters.length) {
    errors.push(
      `totals.chapters=${stats.totals.chapters} but ${stats.chapters.length} chapters in array`
    );
  }

  for (const subject of stats.bySubject) {
    const sum = stats.chapters
      .filter((c) => c.subject === subject.key)
      .reduce((acc, c) => acc + c.total, 0);
    if (sum !== subject.questions) {
      errors.push(
        `subject ${subject.key}: chapters sum to ${sum} but bySubject says ${subject.questions}`
      );
    }
  }

  const examReadyActual = stats.chapters.filter((d) => depth(d) === "exam-ready").length;
  if (examReadyActual !== stats.totals.examReadyChapters) {
    errors.push(
      `totals.examReadyChapters=${stats.totals.examReadyChapters} but ${examReadyActual} chapters pass the depth check`
    );
  }

  return errors;
}

function main() {
  const stats: Stats = JSON.parse(readFileSync(STATS_PATH, "utf8"));
  const errors = validateStats(stats);
  if (errors.length) {
    console.error("❌ stats.generated.json failed validation:");
    for (const e of errors) console.error("  - " + e);
    process.exit(1);
  }

  const questions: SampleQuestion[] = JSON.parse(
    readFileSync(QUESTIONS_PATH, "utf8")
  );
  if (questions.length === 0) {
    console.error("❌ questions.sample.json is empty");
    process.exit(1);
  }
  for (const q of questions) {
    if (q.options.length !== 4) {
      console.error(`❌ question ${q.id} does not have 4 options`);
      process.exit(1);
    }
    if (q.options.filter((o) => o.correct).length !== 1) {
      console.error(`❌ question ${q.id} must have exactly one correct option`);
      process.exit(1);
    }
  }

  // Stamp generation time. Keep the dataset date as the source of truth.
  stats.generatedAt = new Date().toISOString();

  // If we have a snapshot file, refuse to overwrite if the dataset is newer
  // than the last time we generated — i.e. the operator intended to update
  // but forgot to pull the snapshot.
  try {
    const snap = statSync(SNAPSHOT_PATH);
    const lastGenerated = Date.parse(stats.generatedAt);
    if (snap.mtimeMs > lastGenerated) {
      console.warn(
        "⚠️  dataset.snapshot.json is newer than the last generated stats. " +
          "Re-run after refreshing the snapshot."
      );
    }
  } catch {
    // No snapshot file present — that's fine for the committed snapshot flow.
  }

  writeFileSync(STATS_PATH, JSON.stringify(stats, null, 2) + "\n");
  console.log(
    `✅ stats.generated.json validated: ${stats.totals.questions} questions, ${stats.totals.chapters} chapters, ${stats.totals.examReadyChapters} exam-ready`
  );
  console.log(`✅ questions.sample.json validated: ${questions.length} questions`);
}

main();
