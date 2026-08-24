# Vidya - Brand, Design Direction & Copy Deck

_Companion to [`LANDING-PAGE-BRIEF.md`](./LANDING-PAGE-BRIEF.md). **§1 of that
brief (hard constraints) applies to every word here.** All copy below is written
to be true as of 2026-08-19; re-verify against brief §2 before shipping._

---

## 1. Brand tokens

Taken from the live app (`apps/mobile/src/screens/study/studyTheme.ts`) so the
site and the product read as one thing. **Use these exact values.**

| Role | Hex | Use |
| --- | --- | --- |
| Primary (deep violet) | `#6d28d9` | Headers, primary chrome, selected states |
| Primary soft | `#ede9fe` | Selected option, subtle highlight surfaces |
| Accent (warm amber) | `#f59e0b` | **Primary CTAs**, highlights, active tab |
| Accent soft | `#fef3c7` | Accent backgrounds |
| Accent on | `#78350f` | Text on amber |
| Canvas | `#f6f5fb` | Page background (violet-tinted, not pure white) |
| Surface | `#ffffff` | Cards |
| Surface alt | `#efedf8` | Recessed surfaces |
| Ink | `#1c1a2e` | Primary text |
| Ink soft | `#5f5b72` | Secondary text |
| Ink faint | `#a09cb3` | Tertiary / captions |
| Line | `#eae7f4` | Hairlines |
| Line strong | `#d6d1e6` | Emphasised borders |
| Correct | `#16a34a` / soft `#dcfce7` | Right-answer state |
| Wrong | `#dc2626` / soft `#fee2e2` | Wrong-answer state |

**Rules.**
- Violet is structure; **amber is action**. Never make a primary CTA violet.
- Canvas is violet-tinted, not white - keep that; it's the app's signature.
- The wrong-answer state uses `wrong` for the marker but must stay *helpful* in
  tone (see §3.2). Red marker, calm words.
- Ship a dark mode; the app has one. Don't invent new hues - derive.

**Type.** The app uses system stacks. For the site, pick one humanist sans for
UI (Inter, or the system stack) and consider a warmer face for headlines only.
Numbers appear constantly - use tabular figures for all statistics.

**Motion.** Purposeful only: the question card's reveal, the coverage grid's
stagger, the exam picker's transition. Respect `prefers-reduced-motion`. No
parallax, no scroll-jacking, no autoplaying video.

---

## 2. Voice

Vidya's voice is **the voice of the person who wrote the audit**: precise, calm,
allergic to hype. It respects a 17-year-old's intelligence.

| Do | Don't |
| --- | --- |
| "12 chapters are exam-ready. Here's exactly which." | "Complete CBSE coverage!" |
| "Works with no internet." | "Seamless offline-first experience" |
| "If they disagree, we don't ship." | "AI-powered accuracy engine" |
| "3 questions in this chapter so far." | Hide the number |
| Specific numbers | "Thousands of questions" |
| Plain verbs | "Leverage", "unlock your potential", "supercharge" |

**Banned:** exam-fear framing ("Only 90 days left!"), rank/percentile promises,
"crack the exam", fake urgency, fake scarcity, streak-guilt, any implied
guarantee of marks.

**Indian English, naturally.** "Rs" not "₹" in question text (matches the bank);
lakh/crore where natural; "Boards" capitalised; "maths" not "math".

---

## 3. Copy deck

Copy is a starting point, not a straitjacket - but every **number** is
load-bearing and must come from generated data (brief §7.1).

### 3.1 Hero

> **Headline (pick one):**
> - Practice that works when your internet doesn't.
> - Every answer checked twice. Even offline.
> - Commerce revision that earns your trust.
>
> **Recommended:** *Practice that works when your internet doesn't.*
>
> **Sub:** 3,903 CBSE Commerce and Maths questions - with worked solutions -
> on your phone, no connection needed. Every numeric answer is verified by a
> second program that solves it independently.
>
> **Primary CTA:** Try a question → (scrolls to / opens the live demo)
> **Secondary:** Get notified at launch

Reference: [Fixa](https://mobbin.com/sites/sections/751303e1-b849-4c22-9734-a25037d4f7a4)
for the calm benefit-led headline + waitlist pairing;
[Sketch's "102 is coming"](https://mobbin.com/sites/sections/a1261905-a6ea-49f0-975e-1c72f23d5ace)
for honest pre-launch framing.

### 3.2 The playable question

- Prompt label: **"Try one. No signup."**
- Correct state: **"Correct."** + full working. Warm, brief, no confetti.
- Wrong state: **never** "Wrong!" - name the misconception:
  > *"That's the figure you get if you forget to multiply by years' purchase.
  > Here's the full working."*
- Follow-up: "That explanation ships with all 3,895 explained questions."

### 3.3 Three pillars

| | Heading | Body |
| --- | --- | --- |
| 1 | **Works with no internet** | The entire question bank lives on your phone. Practice on the bus, in a basement, on a dead data pack. Nothing to download mid-session. |
| 2 | **Answers you can trust** | Every numeric answer is re-derived from the question by an independent solver. If the content and the solver disagree, the build fails. 0 duplicates, 0 integrity defects. |
| 3 | **Built for Commerce** | Accountancy and Maths are the deepest chapters here, not an afterthought bolted onto a science app. |

### 3.4 Coverage grid

> **Heading:** 12 chapters are exam-ready. Here's exactly which.
>
> **Body:** Most apps quote a big number and let you find the gaps yourself.
> Ours: 3,903 questions across 62 chapters - but they aren't spread evenly.
> Twelve chapters have 300+ questions each, at three difficulty levels. The rest
> are being written. This grid is generated from the live question bank, so it's
> current.
>
> **Legend:** Exam-ready (300+) · In progress · Not started

### 3.5 How verification works

> **Heading:** We check our own answers with a second program.
>
> **Body:** Every numeric question is solved twice - once when it's written, and
> again by a separate solver that reads only the question text and has no access
> to the stored answer. If the two disagree, the build fails and nothing ships.
> Wrong options aren't filler either: each one is a mistake students actually
> make, so getting it wrong still teaches you something.

### 3.6 Offline proof

> **Heading:** Don't take our word for it. Turn off your internet.
>
> **Body:** This page keeps working. So does the app.

### 3.7 Honest status / roadmap

> **Heading:** Where we actually are.
>
> **Body:** Vidya isn't on the Play Store yet. The app is built and the question
> bank is real - you just answered from it - but we're finishing content depth
> and device testing before release. Leave your email and we'll tell you once,
> when it's ready. No newsletter.

### 3.8 Waitlist

> **Heading:** Know when it's ready.
> **Field:** Your email
> **Button:** Notify me
> **Microcopy:** One email at launch. Nothing else, ever. No sharing.

Reference: [ISO Meet](https://mobbin.com/sites/sections/c494bf4c-177f-4b26-830f-1168406fd48f)
for waitlist layout - **but omit its social-proof counter**; we have no signups
and must not imply otherwise.

### 3.9 Meta

- **Title:** Vidya - offline CBSE Commerce & Maths practice
- **Description:** 3,903 verified questions with worked solutions for CBSE
  Class 11–12 Commerce, CUET, CA Foundation and IPMAT. Works with no internet.
- **OG image:** wordmark + the three pillars + one real question. No stock photos.

---

## 4. Using Mobbin and the design tooling

### 4.1 Mobbin

The MCP is connected. Useful queries, run one intent at a time:

- `search_sections` - "hero section for a mobile learning app with phone mockup and email waitlist"
- `search_sections` - "interactive product demo section where the visitor can try the product in the page"
- `search_sections` - "pricing or plan comparison" *(only if pricing is added - none exists today)*
- `search_sections` - "FAQ accordion section"
- `search_sections` - "footer with product links and newsletter signup"
- `search_screens` (platform `ios`) - "quiz question screen with multiple choice options and explanation"
  - for the phone-mockup content, so the mockup matches the real app.

Already-surfaced references worth revisiting:
[MasterClass](https://mobbin.com/sites/sections/536f533b-fade-487f-91fa-a2797acd260d) ·
[Fixa](https://mobbin.com/sites/sections/751303e1-b849-4c22-9734-a25037d4f7a4) ·
[ISO Meet](https://mobbin.com/sites/sections/c494bf4c-177f-4b26-830f-1168406fd48f) ·
[Opennote](https://mobbin.com/sites/sections/da7e2529-2372-4696-a9f3-ccfe70cc73e6) ·
[monday.com](https://mobbin.com/sites/sections/cb5efa4f-8757-45c7-a26f-ffadd272a4fb) ·
[The Leap](https://mobbin.com/sites/sections/93ef6214-dac2-4f0a-8171-75df5652fef0)

**Use Mobbin for structure and interaction patterns, not for palette** - the
palette is fixed in §1.

### 4.2 Design tooling in-session

- The `visualize` MCP (`read_me` then `show_widget`) is good for proposing
  section mockups inline before committing to code.
- The `anthropic-skills:canvas-design` and `theme-factory` skills are available
  if a richer design exploration is wanted.
- **Verify in the browser, don't assume.** The Browser pane tools drive the real
  page: `preview_start`, then `read_page` / `computer` / `resize_window`.
  Check 375px and 320px, light and dark, and
  `read_console_messages` before declaring done.

---

## 5. Screenshots of the real app

The page needs authentic product shots. The app runs as a web build:

```bash
cd apps/mobile && npm run dev:web        # webpack dev server, port 8080/8081
```

Then drive it with the Browser pane at a phone viewport (375×812) and capture
Home, a Practice question with its worked solution, the coverage of a deep
chapter, and a mock exam.

> ⚠️ Two cautions. **(1)** A pre-existing `TurboModuleRegistry` webpack overlay
> covers the app on load and intercepts clicks - dismiss it before capturing.
> **(2)** The dev build is *not* the `publicStudy` variant. Capture study
> screens only, and check every screenshot for private-surface UI before it
> goes anywhere public. Prefer building the `publicStudy` variant
> (`npm run v2:prepare:publicStudy`) so the private surface is absent by
> construction rather than by careful cropping.
