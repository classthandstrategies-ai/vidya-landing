import * as React from "react";

// Shared layout primitives. Used by every section so spacing, container width,
// and heading hierarchy stay consistent.

export function Container({
  children,
  className = "",
  as: Tag = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
}) {
  return React.createElement(
    Tag,
    { className: `container-page ${className}`, id },
    children
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-wider text-primary">
      {children}
    </p>
  );
}

export function Heading({
  level = 2,
  children,
  className = "",
}: {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}) {
  const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements;
  const base =
    level === 1
      ? "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
      : level === 2
        ? "text-3xl sm:text-4xl font-semibold tracking-tight"
        : "text-xl sm:text-2xl font-semibold";
  return React.createElement(
    Tag,
    {
      className: `text-balance text-ink ${base} ${className}`,
    },
    children
  );
}

export function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-lg sm:text-xl text-ink-soft max-w-prose text-pretty ${className}`}>
      {children}
    </p>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return React.createElement(
    Tag,
    { className: `card p-6 sm:p-8 ${className}` },
    children
  );
}