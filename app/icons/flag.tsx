export function USAFlagIcon({ className = "w-10 h-10 rounded-full" }) {
  return (
    <svg
      viewBox="0 0 640 480"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stripes */}
      <rect width="640" height="480" fill="#b22234" />
      {[...Array(6)].map((_, i) => (
        <rect
          key={i}
          y={(i * 2 + 1) * 480 / 13}
          width="640"
          height={480 / 13}
          fill="#fff"
        />
      ))}

      {/* Blue canton */}
      <rect width="280" height={(7 * 480) / 13} fill="#3c3b6e" />

      {/* Stars (simplified grid) */}
      {Array.from({ length: 9 }).map((_, row) =>
        Array.from({ length: 11 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={20 + col * 24}
            cy={20 + row * 24}
            r="3"
            fill="#fff"
          />
        ))
      )}
    </svg>
  );
}