/* Decorative palm silhouette for Miami flavor. Purely ornamental. */
export function Palm({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="currentColor"
    >
      {/* trunk */}
      <path d="M96 320c2-70 4-150 8-196 1-10 3-18 6-22-6 2-11 8-14 18-5 50-7 130-8 200z" />
      {/* fronds */}
      <path d="M104 104c30-22 64-28 96-18-30-4-58 6-78 26 24-30 58-46 92-44-34-6-70 12-92 40 14-34 44-60 80-66-40-2-78 28-90 64-2-32 10-66 34-92-32 14-52 50-50 86-16-26-44-42-78-42 32 8 58 30 70 58-30-18-66-22-98-10 34-2 66 12 86 36-22-6-46-4-66 8 22-4 44 2 60 16z" />
    </svg>
  );
}
