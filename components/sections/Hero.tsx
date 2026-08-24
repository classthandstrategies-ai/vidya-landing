"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SampleQuestion, SampleOption } from "@/lib/content";

type AnswerState =
  | { kind: "idle" }
  | { kind: "answered"; option: SampleOption };

/**
 * The playable hero. Per LANDING-PAGE-BRIEF.md §5.1:
 *   - real question from the real bank
 *   - no signup to answer
 *   - wrong state names the misconception, never says "Wrong!"
 *   - correct state shows the full working
 *   - then offer "Try 20 more" and the waitlist
 */
export function HeroQuestion({ question }: { question: SampleQuestion }) {
  const [state, setState] = useState<AnswerState>({ kind: "idle" });
  const answered = state.kind === "answered";

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-line bg-canvas-alt/60">
        <div className="flex items-center gap-2 text-xs font-medium text-ink-soft">
          <span className="pill pill-soft">{question.chapter}</span>
          <span className="pill pill-accent-soft">{question.difficulty}</span>
          <span className="hidden sm:inline">{question.marks} marks</span>
        </div>
        <span className="text-xs text-ink-faint">No signup · No download</span>
      </div>

      <div className="p-5 sm:p-7">
        <p className="text-base sm:text-lg text-ink leading-relaxed text-pretty">
          {question.prompt}
        </p>

        <div
          role="radiogroup"
          aria-label="Choose your answer"
          className="mt-5 grid gap-2.5"
        >
          {question.options.map((option) => {
            const isChosen =
              state.kind === "answered" && state.option === option;
            const base =
              "w-full text-left rounded-xl border px-4 py-3 text-sm sm:text-base font-medium transition focus-visible:outline-accent";
            const idle =
              "border-line-strong bg-surface hover:bg-primary-soft/40 hover:border-primary text-ink";
            const correct = "border-correct bg-correct-soft/60 text-ink";
            const wrongChosen = "border-wrong bg-wrong-soft/60 text-ink";
            const fadedChosen = "border-line-strong bg-surface-alt text-ink-soft";
            let cls = base + " " + idle;
            if (answered) {
              if (option.correct && isChosen) cls = base + " " + correct;
              else if (!option.correct && isChosen)
                cls = base + " " + wrongChosen;
              else if (option.correct)
                cls = base + " " + fadedChosen;
              else cls = base + " " + fadedChosen + " opacity-70";
            }
            return (
              <button
                key={option.letter}
                type="button"
                role="radio"
                aria-checked={isChosen}
                disabled={answered}
                onClick={() => setState({ kind: "answered", option })}
                className={cls}
              >
                <span className="inline-flex items-center gap-3">
                  <span
                    className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
                      answered && option.correct
                        ? "bg-correct text-white"
                        : answered && isChosen && !option.correct
                          ? "bg-wrong text-white"
                          : "bg-canvas-alt text-ink-soft"
                    }`}
                    aria-hidden="true"
                  >
                    {option.letter}
                  </span>
                  <span>{option.text}</span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {answered && (
            <motion.div
              key="explanation"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-5 rounded-xl border border-line bg-canvas-alt/40 p-4 sm:p-5"
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  state.option.correct ? "text-correct" : "text-wrong"
                }`}
              >
                {state.option.correct ? "Correct" : "Not quite"}
              </p>
              <div className="prose-sm text-ink-soft whitespace-pre-line text-pretty leading-relaxed">
                {state.option.explanation}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {answered && (
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a className="btn-primary" href="#waitlist">
              Try 20 more →
            </a>
            <button
              type="button"
              onClick={() => setState({ kind: "idle" })}
              className="btn-secondary"
            >
              Answer another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}