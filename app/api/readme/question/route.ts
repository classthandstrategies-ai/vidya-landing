import { pickQuestionForToday } from "@/lib/loaders";

// Daily question card. INTERACTIVE-README-SPEC.md §2.1 — rotate via Actions
// ideally; this dynamic endpoint is the fallback. Embed fonts as system-stack,
// no JS, no internal links.

export const runtime = "nodejs";

const NO_CACHE = [
  "no-cache, no-store, max-age=0, must-revalidate",
  "s-maxage=0",
  "proxy-revalidate",
];

export async function GET() {
  const q = pickQuestionForToday();
  const width = 800;
  // Height grows with the prompt length; cap at 4 wrapped lines.
  const height = 320;

  const optionRow = (letter: string, text: string, y: number, isCorrect: boolean) => `
    <g transform="translate(20, ${y})">
      <rect width="760" height="40" rx="8" fill="${isCorrect ? "#dcfce7" : "#ffffff"}" stroke="${isCorrect ? "#16a34a" : "#d6d1e6"}" />
      <circle cx="28" cy="20" r="12" fill="${isCorrect ? "#16a34a" : "#ede9fe"}" />
      <text x="28" y="24" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
        font-size="13" font-weight="700" fill="${isCorrect ? "#ffffff" : "#6d28d9"}">
        ${letter}
      </text>
      <text x="56" y="25" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
        font-size="14" fill="#1c1a2e">
        ${escape(text)}
      </text>
    </g>
  `;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(q.chapter)} · ${q.difficulty} sample question">
  <rect width="${width}" height="${height}" fill="#f6f5fb" rx="16" />

  <g transform="translate(20, 20)">
    <rect width="760" height="56" rx="12" fill="#ffffff" stroke="#eae7f4" />
    <g transform="translate(16, 18)">
      <rect width="120" height="22" rx="11" fill="#ede9fe" />
      <text x="60" y="15" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
        font-size="11" font-weight="700" fill="#6d28d9">${escape(q.chapter.toUpperCase())}</text>
    </g>
    <g transform="translate(146, 18)">
      <rect width="86" height="22" rx="11" fill="#fef3c7" />
      <text x="43" y="15" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
        font-size="11" font-weight="700" fill="#78350f">${escape(q.difficulty.toUpperCase())}</text>
    </g>
    <text x="720" y="36" text-anchor="end" font-family="system-ui, -apple-system, Segoe UI, sans-serif"
      font-size="12" fill="#a09cb3">
      ${q.marks} marks
    </text>
  </g>

  <g transform="translate(20, 92)">
    <foreignObject x="0" y="0" width="760" height="64">
      <div xmlns="http://www.w3.org/1999/xhtml"
        style="font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
               font-size: 14px; line-height: 1.45; color: #1c1a2e;">
        ${escape(q.prompt)}
      </div>
    </foreignObject>
  </g>

  <g transform="translate(20, 168)">
    ${q.options
      .map((o, i) =>
        optionRow(o.letter, o.text, i * 48, o.correct)
      )
      .join("")}
  </g>
</svg>`;

  const headers = new Headers();
  headers.set("Content-Type", "image/svg+xml; charset=utf-8");
  headers.set("Cache-Control", NO_CACHE.join(", "));
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");

  return new Response(svg, { headers });
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}