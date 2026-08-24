"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { stats, formatIndian } from "@/lib/loaders";
import { Section, Heading, Lead } from "./Section";

const PRIMARY_EXAMS = [
  "CUET",
  "CA_FOUNDATION",
  "IPMAT",
  "CBSE_BOARD",
] as const;

const SUBJECT_LABELS: Record<string, string> = {
  MATHS: "Maths",
  ACCOUNTANCY: "Accountancy",
  ECONOMICS: "Economics",
  BUSINESS_STUDIES: "Business Studies",
};

export function ExamPicker() {
  const [selected, setSelected] = useState<(typeof PRIMARY_EXAMS)[number]>(
    "CUET"
  );

  const exam = useMemo(
    () => stats.byExam.find((e) => e.key === selected)!,
    [selected]
  );

  const subjects = exam.relevantSubjects
    .map((k) => stats.bySubject.find((s) => s.key === k))
    .filter(Boolean);

  return (
    <Section id="exams">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Pick your exam
        </p>
        <Heading className="mt-2">
          What you see updates instantly. No form, no signup.
        </Heading>
        <Lead>
          We don&rsquo;t gate the data behind an email wall. Tap an exam and
          see the eligible question count, mock papers, and relevant subjects.
        </Lead>
      </div>

      <div className="mt-8">
        <div
          role="tablist"
          aria-label="Exam"
          className="flex flex-wrap gap-2 rounded-full bg-canvas-alt p-1.5 border border-line max-w-xl"
        >
          {PRIMARY_EXAMS.map((key) => {
            const e = stats.byExam.find((x) => x.key === key)!;
            const active = key === selected;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setSelected(key)}
                className={`relative flex-1 sm:flex-none px-4 py-2 rounded-full text-sm font-semibold transition focus-visible:outline-accent ${
                  active
                    ? "bg-surface text-ink shadow-card"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {e.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="mt-6 grid sm:grid-cols-3 gap-4"
        >
          <Stat
            label="Eligible questions"
            value={formatIndian(exam.eligibleQuestions)}
          />
          <Stat
            label="Mock papers"
            value={exam.mockPapers != null ? String(exam.mockPapers) : "—"}
            sub={
              exam.mockPapers == null
                ? "Boards aren't a mock-paper format"
                : undefined
            }
          />
          <Stat
            label="Subjects"
            value={String(subjects.length)}
            sub={subjects.map((s) => SUBJECT_LABELS[s!.key]).join(" · ")}
          />
        </motion.div>
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
  value: string;
  sub?: string;
}) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
      {sub && <p className="mt-1 text-sm text-ink-soft">{sub}</p>}
    </div>
  );
}