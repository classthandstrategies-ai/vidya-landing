# Vidya - Landing Page Build Brief

_Cold-start handoff. Written 2026-08-19 from the live codebase at
`feat/v2-foundation` @ `e927857`. If you are a fresh session picking this up with
no memory: **read §1 before writing a single line of copy**, then §2, then the
rest top-to-bottom._

**Deliverable:** a high-converting marketing landing page for Vidya, deployed to
Vercel, plus an interactive README for a new public marketing repo (specced
separately in [`INTERACTIVE-README-SPEC.md`](./INTERACTIVE-README-SPEC.md)).
Brand tokens, voice and the full copy deck are in
[`BRAND-AND-COPY-DECK.md`](./BRAND-AND-COPY-DECK.md).

**Owner decisions already made** (do not re-litigate):

| Decision | Choice |
| --- | --- |
| Primary CTA | **Live demo + waitlist.** "Try it now" (no signup) is primary; email capture is secondary. |
| Coverage honesty | **Radical transparency.** Ship an interactive coverage grid showing which chapters are deep and which are thin. |
| Public repo scope | **Marketing/landing repo only.** The app source stays private. |

---

## 1. Hard constraints - read first

### 1.1 The landing page markets the `publicStudy` build. Nothing else.

Vidya's codebase builds three variants (`docs/v2/BUILD-VARIANTS.md`):

| Variant | Private messaging | Public? |
| --- | --- | --- |
| `publicStudy` | **Never** | Yes - this is what you are marketing |
| `trusted` | Yes, disclosed | No |
| `development` | Yes | No |

**The `trusted`/`development` surface must not appear anywhere in the landing
page, the README, the repo, commit messages, alt text, meta tags, OG images,
source comments, or `robots.txt`.** No mention, no hint, no "and more", no
knowing wink. This is not a stylistic preference:

- It is the project's own rule. `capabilities.ts` defines
  `PRIVATE_CAPABILITIES` and the existing onboarding feature is already
  asserted - in domain tests *and* against the rendered screen - to leak the
  private side in "no title, detail, id or destination". The landing page is
  held to the same standard.
- `publicStudy` genuinely is a study app. Marketing it as one is not a
  half-truth; it is the whole truth about that artifact.

**Practical rule for the builder:** work only from the facts in §2 of this doc.
Do not go spelunking in `BLUEPRINT.md`, `OVERVIEW.md`, `PROJECT.md` or
`KNOWLEDGE.md` for copy - those describe the full private product and will
contaminate the page. Everything you need to write truthful marketing is here.

### 1.2 Do not claim what is not true

The project's entire engineering culture is built on refusing unproven claims,
and the landing page is not exempt. As of 2026-08-19 **all of these are false**:

| Do NOT say | Reality |
| --- | --- |
| "Download on Google Play" / "Get the app" | No Play listing exists. No signed release. Stage 7 of the release gate is skipped for want of a keystore. |
| "Trusted by N students" / any usage number | Zero users. No analytics. No installs. |
| "Battle-tested on Android" | The APK builds locally; it has **never been installed or launched** on a device or emulator. `adb` has never been involved. |
| "Rated 4.8" / testimonials / logos | None exist. Do not invent, and do not use placeholder faces that imply real users. |
| "AI tutor built in" | The AI copilot is source-ready but **not wired to a live provider** - no key, no upstream, no deploy. Market it as *coming*, or omit it. |
| "Complete CBSE coverage" | 50 of 62 chapters are thin. See §1.3. |

Anything you are unsure about: leave it out. An empty section converts better
than a claim a visitor can falsify in one tap.

### 1.3 The coverage problem, and the decision about it

`3,903 questions across 62 chapters` is arithmetically true and **materially
misleading**: 12 chapters carry 300+ questions each, and the other 50 carry
between 1 and 6. A student who lands, signs up, opens "Cash Flow Statement" and
finds 3 questions has been mis-sold.

**The owner has chosen radical transparency.** Build the coverage grid (§5.2).
Lead with depth where it exists, name the gap plainly, and frame it as a public
roadmap. Suggested headline framing: *"12 chapters are exam-ready today. Here's
exactly which."* This is a differentiator, not an apology - no competitor in
this space publishes its own gaps.

---

## 2. Verified product facts

Every number below was generated from the live dataset on 2026-08-19, not from
any doc. **Regenerate before launch** - see §7.1; do not hand-type these.

### 2.1 Headline numbers

| Fact | Value |
| --- | --- |
| Questions in the bank | **3,903** |
| Chapters | **62** |
| Chapters at full depth (≥100 Easy / ≥100 Medium / ≥100 Hard) | **12** |
| Questions with a written explanation | **3,895** (99.8%) |
| Questions with step-by-step worked solutions | **3,408** |
| Full-length mock papers | **26** |
| Duplicate questions | **0** |
| Data-integrity defects | **0** |
| Commerce calculators | **10** |

### 2.2 By subject

| Subject | Questions |
| --- | --- |
| Maths | 1,590 |
| Accountancy | 1,267 |
| Economics | 679 |
| Business Studies | 367 |

### 2.3 By exam (a question can carry several tags)

| Exam | Eligible questions | Mock papers |
| --- | --- | --- |
| CUET | 3,222 | 10 |
| CA Foundation | 2,036 | 8 |
| IPMAT | 1,851 | 8 |
| CBSE Board | 1,357 | - |
| CMA Foundation | 1,009 | - |
| SET | 727 | - |
| NPAT | 640 | - |
| CS Foundation | 435 | - |

### 2.4 The 12 exam-ready chapters

Accounting Ratios · Applied Maths (Commercial Arithmetic) · Company Accounts -
Share Capital · Goodwill · Matrices & Determinants · Measures of Central
Tendency · National Income & Aggregates · Partnership - Fundamentals ·
Permutations & Combinations · Principles of Management · Probability ·
Sequences & Series

### 2.5 Features that genuinely exist and work

Verified in the running app, not aspirational:

- **Offline-first.** The whole bank ships in the app; no network needed to
  study. This is real and is the strongest honest differentiator.
- **Spaced repetition (SM-2)** over a due queue, seeded only by questions the
  student has actually attempted.
- **Practice** with instant feedback, written explanations and step-by-step
  working.
- **Mistake notebook** - wrong answers captured automatically.
- **Timed mock exams** with real negative marking, question palette,
  mark-for-review and single-submission guard.
- **Study planner** with per-day targets.
- **Progress analytics** - accuracy, streak, per-subject breakdown.
- **10 commerce calculators** (GST, interest, EMI, depreciation, ratios…).
- **Formula sheets & notes**, bundled and offline.
- **Getting-started checklist** that derives from the student's real stored
  work - it un-ticks if the work is cleared, and never fakes progress.

### 2.6 The quality story (your best trust asset)

This is unusually strong material and almost no ed-tech competitor can say it.
Use it - it is all verifiable:

- Every numeric answer is **re-derived from the question text by an independent
  solver** that never reads the stored answer. If the content and the solver
  disagree, the build fails.
- Distractors encode **real misconceptions**, not noise - e.g. in Goodwill, the
  wrong options are "ignored the adjustment", "reversed its sign", and "forgot
  to multiply by years' purchase".
- Correct answers are distributed ~25% across each of the four positions, so
  there is no guessable pattern.
- **0 duplicates, 0 integrity defects**, enforced by an automated audit on every
  build.
- Nothing is labelled as a past paper unless its provenance is verified -
  fabricated "PYQ" claims are structurally impossible.

Suggested framing: **"Every number in this app is checked by a second program
that solves the question independently. If they disagree, we don't ship."**

---

## 3. Positioning

**Audience.** Indian CBSE Class 11–12 Commerce students (and their parents),
preparing simultaneously for Boards and one or more of CUET / CA Foundation /
IPMAT. Price-sensitive, phone-first, frequently on poor or metered connections.

**The insight.** Commerce students are underserved. The ed-tech market is
saturated with JEE/NEET products; Accountancy and Business Studies get scraps.
Vidya's deepest content is exactly where the gap is.

**Positioning statement.**
> For CBSE Commerce students preparing for Boards and entrance exams at the same
> time, Vidya is an offline-first practice app whose answers are machine-verified
> - so you can trust every solution, on any connection.

**Three pillars** (use these as the page's spine):

1. **Works with no internet.** Not "offline mode" - the entire bank is on the
   device.
2. **Answers you can trust.** Independently verified; we publish the method.
3. **Built for Commerce, not adapted to it.** Accountancy and Maths are the
   deepest chapters.

**Tone.** Calm, precise, student-respecting. No hype, no exam-fear marketing, no
"crack the exam" clichés, no countdown-timer pressure tactics. The honesty *is*
the brand - the voice should sound like the person who wrote the audit.

---

## 4. Information architecture

Single scrolling page. Order is deliberate: proof before ask.

| # | Section | Job |
| --- | --- | --- |
| 1 | **Hero + live question** | Prove value in 10 seconds, before any ask (§5.1) |
| 2 | **Three pillars** | Offline · verified · Commerce-first |
| 3 | **Coverage grid** | Radical transparency; the trust moment (§5.2) |
| 4 | **Exam picker** | Personalise stats to CUET / CA / IPMAT (§5.3) |
| 5 | **How verification works** | The quality story from §2.6 - the moat |
| 6 | **Feature tour** | Practice, revision, mocks, mistakes, planner, calculators |
| 7 | **Offline proof** | The page itself survives going offline (§5.4) |
| 8 | **Roadmap / honest status** | What's built, what's next, no Play listing yet |
| 9 | **Waitlist** | Email capture, single field |
| 10 | **Footer** | Links, the public repo, contact |

Mobile-first: the audience is on phones. Design at 375px, then scale up. The
hero's playable question must work with one thumb.

---

## 5. The four unique features

These are the reason this page is not a template. Build all four; #1 and #2 are
non-negotiable.

### 5.1 "Answer one right now" - playable hero

A real question from the real bank, rendered in the hero, answerable with no
signup. On answer, reveal the real explanation and the step-by-step working.

- Pull from the 12 complete chapters; rotate per visit.
- **The wrong-answer state is the wow moment.** Because distractors encode
  specific misconceptions, a wrong tap can say *"That's what you get if you
  forget to multiply by years' purchase."* Almost nothing else on the market
  can do this. Make the wrong state feel helpful, never punitive.
- Show the four-step working expanded after answering.
- Then, and only then, offer "Try 20 more →" (demo) or the waitlist.
- Reference pattern: [monday.com's "Try it out! See how monday.com works"](https://mobbin.com/sites/sections/cb5efa4f-8757-45c7-a26f-ffadd272a4fb)
  and [The Leap's inline interactive demo](https://mobbin.com/sites/sections/93ef6214-dac2-4f0a-8171-75df5652fef0).

### 5.2 The Honest Coverage Grid

A 62-cell grid, one cell per chapter, coloured by depth (deep / partial / thin),
grouped by subject. Hover or tap a cell for exact counts. Generated at build
time from the real audit (§7.1) - never hand-maintained.

- Headline: **"12 chapters are exam-ready. Here's exactly which."**
- Include a plain-language legend and a one-line note that thin chapters are
  being authored, with the current total.
- This is the page's trust centrepiece. Do not soften it, and do not let it
  drift out of sync with the dataset.

### 5.3 Exam picker

A segmented control - CUET · CA Foundation · IPMAT · Boards. Selecting one
re-renders the eligible-question count, the mock-paper count and the relevant
subjects, from §2.3. Instant personalisation, no form, no signup.

### 5.4 Offline proof

The landing page ships a service worker and works fully offline after first
load. A small section invites the visitor to switch off their connection and
keep scrolling; a live indicator confirms the page is offline and still working.

- This *demonstrates* the core product claim instead of asserting it.
- Must degrade gracefully: if the service worker fails to register, hide the
  invitation rather than making a claim the page can't keep.

---

## 6. Tech stack and repo

**Stack.** Next.js (App Router) + TypeScript + Tailwind on Vercel. Framer Motion
for motion. No CMS - content is generated (§7.1). No analytics that sets
cookies without consent; prefer a cookieless, privacy-respecting option or none
at all (the brand is privacy-adjacent; a tracker wall would be self-defeating).

**New public repo - marketing only.** Suggested `vidya-landing`.

```
vidya-landing/
  README.md                 <- the interactive README (separate spec)
  app/
    page.tsx                <- the landing page
    api/og/route.tsx        <- OG image
    api/readme/stats/route.ts    <- SVG endpoint for the README
    api/readme/question/route.ts <- daily question SVG for the README
  components/
  content/
    stats.generated.json    <- generated; never hand-edited
    questions.sample.json   <- generated; a curated public subset
  scripts/
    generate-content.ts
  public/
```

**Never commit to the public repo:** anything from `apps/mobile/src` beyond the
generated public subset, any relay or crypto material, any reference to the
private surface, `.env` values, keystores, or the full question bank (see §7.2).

---

## 7. Content pipeline

### 7.1 Stats are generated, never typed

This mirrors the project's core anti-drift discipline (every drift it has ever
found came from a fact expressed twice). A hand-typed "3,903" on a landing page
is that same bug.

Add `scripts/generate-content.ts` to the landing repo, run in `prebuild`, which
emits `content/stats.generated.json` containing the §2 numbers plus the 62-chapter
coverage array. Source it from the private repo's dataset - either by running
the audit there and committing the JSON output across, or by vendoring a
snapshot. **The page must import the generated file; a literal number in JSX is
a bug.**

Add a check that fails the build if `stats.generated.json` is older than the
dataset snapshot it was built from.

### 7.2 The public question subset

The hero and README question need real questions in a public repo. Do **not**
publish the whole bank - it is the product.

Export a curated subset (suggest 40–60) drawn from the 12 complete chapters,
with explanation and `step_solution` intact, into `content/questions.sample.json`.
Note in the repo README that it is a sample, not the bank.

---

## 8. Definition of done

- [ ] Deployed to Vercel; custom domain configured.
- [ ] Lighthouse ≥ 95 performance / ≥ 95 accessibility on **mobile**.
- [ ] Fully usable at 375px width with one thumb; no horizontal overflow at 320px.
- [ ] Hero question is answerable, and the explanation + working render correctly.
- [ ] Coverage grid renders all 62 chapters from generated data.
- [ ] Exam picker updates all four stats correctly.
- [ ] Page works offline after first load; the offline invitation hides if the SW fails.
- [ ] Zero hand-typed statistics anywhere in the source.
- [ ] **Zero references to the private surface** anywhere in the repo, build
      output, or metadata. Grep the built output for the terms in §1.1 before
      shipping and make that grep a CI step.
- [ ] Every factual claim traceable to §2 of this doc.
- [ ] No fabricated testimonials, ratings, user counts, or partner logos.
- [ ] Respects `prefers-reduced-motion`; all interactive elements keyboard-reachable.
- [ ] OG image and meta tags set; social preview checked.

---

## 9. Open items for the owner

1. **Domain** - not chosen.
2. **Live demo target.** The hero's "Try it now" should point at a deployed
   `publicStudy` **web** build. That build does not exist yet as a public
   deployment. Until it does, the CTA should scroll to the waitlist rather than
   404. Note: `DEPLOY-WEB.md` describes deploying the *full* app with a relay -
   that is the wrong artifact here; a `publicStudy` web build needs no relay.
3. **Waitlist backend** - no provider chosen. Needs to store an email and
   nothing else; state the retention policy on the form.
4. **App name/trademark check** - "Vidya" is a common word; worth a search
   before buying a domain.
