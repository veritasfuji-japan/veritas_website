export default function VeritasLogo({ size = 128, className = "hero-logo" }) {
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={(size * 220) / 200}
      role="img"
      aria-label="VERITAS OS shield"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="v-left-u" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#19A89A" />
          <stop offset="40%" stopColor="#137F73" />
          <stop offset="80%" stopColor="#1F4598" />
          <stop offset="100%" stopColor="#1B3A8F" />
        </linearGradient>
        <linearGradient id="v-right-u" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0E7E73" />
          <stop offset="35%" stopColor="#0A5C53" />
          <stop offset="75%" stopColor="#1B3A8F" />
          <stop offset="100%" stopColor="#142B6E" />
        </linearGradient>
        <linearGradient id="v-fold-u" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#063D38" />
          <stop offset="60%" stopColor="#0E2459" />
          <stop offset="100%" stopColor="#0A1B43" />
        </linearGradient>
      </defs>
      <path
        d="M 30 22 L 30 30 L 36 36 L 36 110 C 36 152, 100 196, 100 196 C 100 196, 164 152, 164 110 L 164 36 L 170 30 L 170 22 Z"
        fill="none" stroke="#1A1F2E" strokeWidth="3" strokeLinejoin="round"
      />
      <path
        d="M 33 25 L 33 30 L 39 36 L 39 110 C 39 150, 100 192, 100 192 C 100 192, 161 150, 161 110 L 161 36 L 167 30 L 167 25"
        fill="none" stroke="#19A89A" strokeWidth="0.8" opacity="0.9"
      />
      <path d="M 56 50 L 73 50 L 100 130 L 100 158 L 88 152 Z" fill="url(#v-left-u)" />
      <path d="M 127 50 L 144 50 L 112 152 L 100 158 L 100 130 Z" fill="url(#v-right-u)" />
      <path d="M 100 130 L 100 158 L 88 152 L 100 130 Z" fill="url(#v-fold-u)" opacity="0.5" />
      <path d="M 56 50 L 73 50 L 71 53 L 58 53 Z" fill="#26C9B5" opacity="0.5" />
      <path d="M 127 50 L 144 50 L 142 53 L 129 53 Z" fill="#0A5C53" opacity="0.4" />
    </svg>
  );
}
