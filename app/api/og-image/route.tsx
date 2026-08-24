import { ImageResponse } from "next/og";
import { stats, formatIndian } from "@/lib/loaders";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(180deg, #ede9fe 0%, #f6f5fb 60%, #fef3c7 100%)",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          color: "#1c1a2e",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#6d28d9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            V
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>Vidya</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            Practice that works when your internet doesn't.
          </div>
          <div style={{ fontSize: 28, color: "#5f5b72", maxWidth: 940 }}>
            {formatIndian(stats.totals.questions)} verified CBSE Commerce &amp;
            Maths questions. Works offline.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            color: "#5f5b72",
            fontSize: 22,
          }}
        >
          <span>
            <span style={{ color: "#1c1a2e", fontWeight: 700 }}>
              {stats.totals.examReadyChapters}
            </span>{" "}
            of {stats.totals.chapters} chapters exam-ready
          </span>
          <span>
            <span style={{ color: "#1c1a2e", fontWeight: 700 }}>
              {stats.totals.mockPapers}
            </span>{" "}
            mock papers
          </span>
          <span>
            <span style={{ color: "#1c1a2e", fontWeight: 700 }}>
              {stats.totals.duplicates}
            </span>{" "}
            duplicates
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
