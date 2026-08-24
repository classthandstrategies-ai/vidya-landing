// Brand wordmark used in the nav and OG image. Kept SVG so it scales cleanly
// and renders without external font fetches in the OG image.

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold tracking-tight text-ink ${className}`}
      aria-label="Vidya"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="#6d28d9" />
        <path
          d="M9 11.5C9 10.1193 10.1193 9 11.5 9H20.5C21.8807 9 23 10.1193 23 11.5V13H9V11.5Z"
          fill="#ede9fe"
        />
        <path
          d="M9 15H23V20.5C23 21.8807 21.8807 23 20.5 23H11.5C10.1193 23 9 21.8807 9 20.5V15Z"
          fill="#f59e0b"
        />
        <rect x="12" y="6" width="8" height="4" rx="1.5" fill="#6d28d9" />
      </svg>
      <span className="text-xl">Vidya</span>
    </span>
  );
}