/**
 * LANDING-PAGE-BRIEF.md §1.1: the private surface must not appear anywhere —
 * not in the repo, not in the build output, not in metadata. The brief calls
 * for a CI grep step. This is that step.
 *
 * Scope: src tree, built artefacts, and the rendered README. The check is
 * intentionally narrow — false positives are tolerated; missed leaks are not.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const ROOT = resolve(__dirname, "..");

// Strings that, if found in the public repo or its build output, indicate the
// private surface has leaked. Conservative on purpose.
const BANNED = [
  "trusted",
  "development",
  "PRIVATE_CAPABILITIES",
  "private_capabilities",
  "privateCapabilities",
  "private-capabilities",
  "BLUEPRINT.md",
  "OVERVIEW.md",
  "PROJECT.md",
  "KNOWLEDGE.md",
  "trustedStudy",
  "developmentStudy",
  "privateStudy",
  "publicStudy",
  "BUILD-VARIANTS",
  "DEPLOY-WEB",
  "relay",
  "keystore",
  "play.google.com",
];

// Known-safe occurrences (file path substring + term) that would otherwise
// trigger false positives. Each entry whitelists a single term in a single file.
const ALLOWED: Array<{ path: string; term: string }> = [
  // The checker script itself references "private-surface" in its script name
  // and comments; CI and package.json reference it transitively.
  { path: ".github/workflows/ci.yml", term: "private-surface" },
  { path: ".github/workflows/ci.yml", term: "private_surface" },
  { path: "package.json", term: "private-surface" },
  { path: "scripts/check-private-surface.ts", term: "private-surface" },
  { path: "scripts/check-private-surface.ts", term: "private_surface" },
  // .gitignore legitimately lists .env.local; it is not a leak.
  { path: ".gitignore", term: ".env.local" },
  // Brand-token source comment in tailwind config.
  { path: "tailwind.config.ts", term: "apps/mobile/src" },
];

// Paths to skip so we don't grep noise, history, or the brief itself.
const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "content",
  "scripts",           // contains the check itself
  "01-Vidya-Landing-Page-Brief.pdf",
  "02-Vidya-Interactive-README-Spec.pdf",
  "03-Vidya-Brand-and-Copy-Deck.pdf",
  "01-Vidya-Landing-Page-Brief.md",
  "02-Vidya-Interactive-README-Spec.md",
  "03-Vidya-Brand-and-Copy-Deck.md",
]);

// Binary / generated extensions we don't read.
const SKIP_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".ico",
  ".woff", ".woff2", ".ttf", ".otf",
  ".pdf", ".zip",
]);

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

function isPlainText(path: string): boolean {
  const ext = extname(path).toLowerCase();
  if (ext === "") return true; // no extension, read leniently
  if (SKIP_EXT.has(ext)) return false;
  return [
    ".ts", ".tsx", ".js", ".mjs", ".cjs", ".jsx",
    ".json", ".md", ".css", ".html", ".svg",
    ".txt", ".yml", ".yaml", ".toml",
  ].includes(ext);
}

function checkFile(path: string): string[] {
  const ext = extname(path).toLowerCase();
  if (!isPlainText(path)) return [];
  const text = readFileSync(path, "utf8");
  const hits: string[] = [];
  const relPath = path.replace(ROOT + "/", "");
  for (const term of BANNED) {
    if (text.includes(term)) {
      const allowed = ALLOWED.some(
        (a) => a.path === relPath && a.term === term
      );
      if (!allowed) {
        hits.push(term);
      }
    }
  }
  return hits;
}

function main() {
  const violations: Array<{ path: string; term: string }> = [];
  let scanned = 0;
  for (const path of walk(ROOT)) {
    scanned++;
    const hits = checkFile(path);
    for (const term of hits) {
      violations.push({ path: path.replace(ROOT + "/", ""), term });
    }
  }

  if (violations.length) {
    console.error("❌ Private surface terms found in public repo:");
    for (const v of violations) {
      console.error(`   ${v.path}  contains  ${v.term}`);
    }
    console.error(
      `\nSee LANDING-PAGE-BRIEF.md §1.1. Remove these terms before shipping.`
    );
    process.exit(1);
  }

  console.log(`✅ Scanned ${scanned} files — no private-surface leakage.`);
}

main();
