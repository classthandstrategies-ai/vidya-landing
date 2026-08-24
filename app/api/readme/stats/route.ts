import { stats, formatIndian, getChapterDepth } from "@/lib/loaders";

// SVG badge with the headline stats. Embedded inline (no external font
// fetches, no JS, no internal links) so it renders anywhere — including
// GitHub's Camo proxy. INTERACTIVE-README-SPEC.md §1.3 lists the no-cache
// header set we have to send to keep this from being frozen for a year.

export const runtime = "nodejs";

const NO_CACHE = [
  "no-cache, no-store, max-age=0, must-revalidate",
  "s-maxage=0",
  "proxy-revalidate",
];

export async function GET() {
  const examReady = stats.totals.examReadyChapters;
  const total = stats.totals.chapters;
  const inProgress = stats.chapters.filter(
    (c) => getChapterDepth(c) === "in-progress"
  ).length;

  // 800x220 — legibly readable at README widths (typically 700–900px).
  const width = 800;
  const height = 220;
  const card = (x: number, label: string, value: string, sub?: string) => `
    <g transform="translate(${x}, 0)">
      <rect width="180" height="180" rx="16" fill="#ffffff" stroke="#eae7f4" />
      <text x="20" y="32" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
        font-size="12" font-weight="600" fill="#5f5b72" letter-spacing="1.5">
        ${label.toUpperCase()}
      </text>
      <text x="20" y="100" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
        font-size="44" font-weight="700" fill="#1c1a2e">
        ${value}
      </text>
      ${
        sub
          ? `<text x="20" y="130" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
              font-size="13" fill="#5f5b72">${sub}</text>`
          : ""
      }
    </g>
  `;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Vidya stats: ${formatIndian(stats.totals.questions)} questions, ${examReady} of ${total} chapters exam-ready, ${stats.totals.mockPapers} mock papers">
  <rect width="${width}" height="${height}" fill="#f6f5fb" rx="16" />
  <g transform="translate(20, 20)">
    ${card(0, "Questions", formatIndian(stats.totals.questions), `${stats.totals.explainedQuestions.toLocaleString("en-IN")} explained`)}
    ${card(200, "Exam-ready", `${examReady} / ${total}`, `${inProgress} in progress`)}
    ${card(400, "Mock papers", String(stats.totals.mockPapers), "full-length")}
    <g transform="translate(600, 0)">
      <rect width="180" height="180" rx="16" fill="#6d28d9" />
      <text x="20" y="32" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
        font-size="12" font-weight="600" fill="#ede9fe" letter-spacing="1.5">
        INTEGRITY
      </text>
      <text x="20" y="100" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
        font-size="44" font-weight="700" fill="#ffffff">
        ${stats.totals.duplicates}
      </text>
      <text x="20" y="130" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
        font-size="13" fill="#ede9fe">
        duplicates · 0 defects
      </text>
    </g>
  </g>
</svg>`;

  // INTERACTIVE-README-SPEC.md §1.3 — full no-cache header set.
  const headers = new Headers();
  headers.set("Content-Type", "image/svg+xml; charset=utf-8");
  headers.set("Cache-Control", NO_CACHE.join(", "));
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");

  return new Response(svg, { headers });
}