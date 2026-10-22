// Clean SVG icons matching the reference photo

export const MemoriesIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

export const TogetherIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const GroupIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 21a8 8 0 0 0-16 0" />
    <circle cx="10" cy="8" r="5" />
    <path d="M22 20c0-3.37-2-6.5-5-7.5" />
    <path d="M16 3.5a4.5 4.5 0 0 1 0 8.5" />
  </svg>
);

export const ReliveIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="15" x="2" y="5" rx="2" />
    <polygon points="10 9 15 12.5 10 16 10 9" fill="currentColor" stroke="none" />
    <path d="M6 5v-2" />
    <path d="M12 5v-2" />
    <path d="M18 5v-2" />
  </svg>
);

// Lavender flower sprig illustration for the Polaroid
export const LavenderSprig = ({ className = "w-16 h-28" }) => (
  <svg
    className={className}
    viewBox="0 0 80 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Stem */}
    <path
      d="M40 135 C38 100, 42 60, 40 10"
      stroke="#7c8b6b"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M39 95 C30 88, 22 88, 16 90"
      stroke="#7c8b6b"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M41 80 C50 74, 58 75, 64 78"
      stroke="#7c8b6b"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Flower Buds */}
    <ellipse cx="40" cy="15" rx="4.5" ry="6" fill="#a78bfa" />
    <ellipse cx="35" cy="24" rx="4" ry="5.5" fill="#c4b5fd" />
    <ellipse cx="45" cy="23" rx="4.2" ry="5.5" fill="#8b5cf6" />
    <ellipse cx="33" cy="35" rx="4.5" ry="6" fill="#a78bfa" />
    <ellipse cx="47" cy="34" rx="4.5" ry="6" fill="#7c3aed" />
    <ellipse cx="38" cy="44" rx="4.5" ry="6" fill="#c4b5fd" />
    <ellipse cx="32" cy="54" rx="4.2" ry="5.5" fill="#8b5cf6" />
    <ellipse cx="48" cy="53" rx="4.5" ry="6" fill="#a78bfa" />
    <ellipse cx="34" cy="65" rx="4" ry="5.5" fill="#c4b5fd" />
    <ellipse cx="46" cy="66" rx="4" ry="5.5" fill="#7c3aed" />
  </svg>
);
