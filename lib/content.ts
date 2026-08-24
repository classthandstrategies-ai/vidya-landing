// Shared types for the generated content. The page must import these and never
// re-declare the same shape — that's how drift gets introduced (brief §7.1).

export type ExamKey =
  | "CUET"
  | "CA_FOUNDATION"
  | "IPMAT"
  | "CBSE_BOARD"
  | "CMA_FOUNDATION"
  | "SET"
  | "NPAT"
  | "CS_FOUNDATION";

export type SubjectKey = "MATHS" | "ACCOUNTANCY" | "ECONOMICS" | "BUSINESS_STUDIES";

export type Exam = {
  key: ExamKey;
  label: string;
  eligibleQuestions: number;
  mockPapers: number | null;
  /** Subjects most relevant to this exam — used by the picker. */
  relevantSubjects: SubjectKey[];
};

export type Subject = {
  key: SubjectKey;
  label: string;
  questions: number;
};

export type Chapter = {
  id: string;
  title: string;
  subject: SubjectKey;
  /** Number of questions at each difficulty. Used to compute depth. */
  easy: number;
  medium: number;
  hard: number;
  /** Total questions. Difficulty sums may be less than this (unclassified). */
  total: number;
};

export type ChapterDepth = "exam-ready" | "in-progress" | "not-started";

export type Stats = {
  /** ISO date of the dataset snapshot this file was generated from. */
  generatedAt: string;
  /** ISO date of the dataset this was generated from. */
  datasetDate: string;
  totals: {
    questions: number;
    chapters: number;
    examReadyChapters: number;
    explainedQuestions: number;
    workedSolutions: number;
    mockPapers: number;
    duplicates: number;
    integrityDefects: number;
    commerceCalculators: number;
  };
  bySubject: Subject[];
  byExam: Exam[];
  /**
   * The 62 chapters in display order. The page's coverage grid renders one
   * cell per chapter; the brief calls this out as load-bearing.
   */
  chapters: Chapter[];
  /** Slugs of chapters at full depth (≥100 Easy / ≥100 Medium / ≥100 Hard). */
  examReadyChapterIds: string[];
};

export type SampleOption = {
  letter: "A" | "B" | "C" | "D";
  text: string;
  correct: boolean;
  explanation: string;
};

export type SampleQuestion = {
  id: string;
  chapter: string;
  subject: SubjectKey;
  difficulty: "Easy" | "Medium" | "Hard";
  marks: number;
  prompt: string;
  options: SampleOption[];
};
