/**
 * Velour Essence — SVG logo mark + wordmark.
 * The mark is a minimal perfume bottle silhouette in burgundy.
 * Use the `variant` prop:
 *   "full"  — bottle + stacked wordmark (navbar default)
 *   "mark"  — bottle only (favicon / small spaces)
 */
export default function VelourLogo({ variant = 'full', className = '' }) {
  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 32 46"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Velour Essence"
        fill="none"
      >
        <BottleMark />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 178 46"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Velour Essence"
      fill="none"
    >
      {/* ── Perfume bottle mark ── */}
      <BottleMark />

      {/* ── Wordmark ── */}
      {/* VELOUR */}
      <text
        x="42"
        y="26"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="21"
        fontWeight="600"
        fill="#1A1A1A"
        letterSpacing="2.5"
      >
        VELOUR
      </text>

      {/* thin rule */}
      <line x1="42" y1="30" x2="176" y2="30" stroke="#E8E0D8" strokeWidth="0.7" />

      {/* ESSENCE */}
      <text
        x="43"
        y="41"
        fontFamily="'Inter', Arial, sans-serif"
        fontSize="7.5"
        fill="#6B6B6B"
        letterSpacing="5"
      >
        ESSENCE
      </text>
    </svg>
  );
}

/* ── Perfume bottle path group (reused by both variants) ── */
function BottleMark() {
  return (
    <g>
      {/* Spray nozzle arm */}
      <line x1="20" y1="6" x2="28" y2="6" stroke="#800020" strokeWidth="1.8" strokeLinecap="round" />
      {/* Nozzle tip */}
      <circle cx="29.5" cy="6" r="2.5" fill="#800020" />

      {/* Cap */}
      <rect x="6" y="2" width="15" height="7" rx="2.5" fill="#800020" />

      {/* Neck */}
      <rect x="9.5" y="9" width="8" height="5" fill="#800020" opacity="0.85" />

      {/* Shoulder (trapezoid flare from neck to body) */}
      <path d="M4 19 L9.5 14 L17.5 14 L23 19 Z" fill="#800020" />

      {/* Body */}
      <rect x="4" y="19" width="19" height="24" rx="4.5" fill="#800020" />

      {/* Frosted highlight stripe on body */}
      <rect x="7.5" y="23" width="3.5" height="13" rx="1.75" fill="white" opacity="0.16" />

      {/* Tiny label line on body */}
      <rect x="7" y="38" width="13" height="1" rx="0.5" fill="white" opacity="0.1" />
    </g>
  );
}
