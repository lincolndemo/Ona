// The Ona logo mark. Uses currentColor so it can be tinted with a text-* class.

export function OnaMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        d="M 91.95 48.37 A 34 34 0 1 1 72.74 28.48"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M 45.04 77.00 C 42.32 61.36 57.96 48.44 62.04 54.56 S 79.72 49.80 90.60 29.40"
        strokeWidth="7.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="45.04" cy="77.00" r="5.28" fill="currentColor" stroke="none" />
      <circle cx="90.60" cy="29.40" r="7.92" fill="currentColor" stroke="none" />
    </svg>
  );
}
