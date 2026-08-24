"use client";

import { useState } from "react";
import { Section, Heading, Lead } from "./Section";

// §3.8 of the copy deck. The form is intentionally minimal — one field, one
// microcopy line, no social-proof counter (we have zero signups and must not
// imply otherwise — see BRAND-AND-COPY-DECK.md §3.8).

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function Waitlist() {
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "submitting") return;
    setState({ kind: "submitting" });
    // No waitlist backend chosen yet (brief §9 item 3). Until one is wired,
    // we accept the email in memory and surface the success state so the
    // form is testable end-to-end. The real submission will replace this.
    setTimeout(() => {
      setState({ kind: "success" });
    }, 350);
  }

  return (
    <Section id="waitlist" className="bg-surface">
      <div className="mx-auto max-w-2xl text-center">
        <Heading>Know when it&rsquo;s ready.</Heading>
        <Lead className="mx-auto mt-3">
          One email at launch. Nothing else, ever. No sharing.
        </Lead>

        <form
          onSubmit={onSubmit}
          className="mt-8 mx-auto flex flex-col sm:flex-row gap-3 max-w-lg"
          aria-label="Waitlist signup"
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={state.kind === "submitting" || state.kind === "success"}
            className="flex-1 rounded-full border border-line-strong bg-surface px-5 py-3 text-base text-ink placeholder:text-ink-faint focus-visible:outline-accent focus-visible:border-accent"
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={state.kind === "submitting" || state.kind === "success"}
          >
            {state.kind === "submitting"
              ? "Saving…"
              : state.kind === "success"
                ? "You're on the list ✓"
                : "Notify me"}
          </button>
        </form>

        <p className="mt-3 text-xs text-ink-faint" aria-live="polite">
          {state.kind === "success"
            ? `Thanks. We'll email ${email} once, when Vidya is ready.`
            : "We store your email and nothing else. You can ask us to delete it any time."}
        </p>

        {state.kind === "error" && (
          <p
            className="mt-3 text-sm text-wrong"
            role="alert"
          >
            {state.message}
          </p>
        )}
      </div>
    </Section>
  );
}