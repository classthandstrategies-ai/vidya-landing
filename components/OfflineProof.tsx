"use client";

import { useEffect, useState } from "react";
import { Section, Heading, Lead, Card } from "./Section";

// §5.4 of the brief: the page must work offline after first load, and the
// offline invitation must hide itself if the SW fails to register.

type Status =
  | { kind: "loading" }
  | { kind: "online" }
  | { kind: "offline" }
  | { kind: "unsupported" };

export function OfflineProof() {
  const [status, setStatus] = useState<Status>({ kind: "loading" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) {
      setStatus({ kind: "unsupported" });
      return;
    }

    let cancelled = false;
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        if (cancelled) return;
        const setFromNav = () =>
          setStatus(navigator.onLine ? { kind: "online" } : { kind: "offline" });
        setFromNav();
        window.addEventListener("online", setFromNav);
        window.addEventListener("offline", setFromNav);
      })
      .catch(() => {
        if (cancelled) return;
        // The brief: "must degrade gracefully: if the service worker fails to
        // register, hide the invitation rather than making a claim the page
        // can't keep."
        setStatus({ kind: "unsupported" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status.kind === "loading" || status.kind === "unsupported") {
    return null;
  }

  return (
    <Section id="offline" className="bg-canvas-alt/40">
      <Card>
        <div className="grid sm:grid-cols-[1fr_auto] items-start gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Try it
            </p>
            <Heading className="mt-2">
              Don&rsquo;t take our word for it. Turn off your internet.
            </Heading>
            <Lead>This page keeps working. So does the app.</Lead>
            <p className="mt-4 text-sm text-ink-soft">
              The whole bank lives on your phone. Practice on the bus, in a
              basement, on a dead data pack. Nothing to download mid-session.
            </p>
          </div>
          <div
            aria-live="polite"
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${
              status.kind === "offline"
                ? "border-correct bg-correct-soft text-correct"
                : "border-line bg-surface text-ink-soft"
            }`}
          >
            <span
              aria-hidden="true"
              className={`size-2.5 rounded-full ${
                status.kind === "offline"
                  ? "bg-correct animate-pulse-soft"
                  : "bg-accent"
              }`}
            />
            <span className="text-sm font-medium">
              {status.kind === "offline"
                ? "You are offline — and this page still works"
                : "Currently online · turn off Wi-Fi to test"}
            </span>
          </div>
        </div>
      </Card>
    </Section>
  );
}