export default function BindFlow() {
  return (
    <svg viewBox="0 0 600 240" style={{ width: "100%", height: "auto", display: "block" }} aria-label="Bind boundary lineage">
      <defs>
        <marker id="arr-u" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5A5C62" />
        </marker>
      </defs>
      <line x1="20" y1="105" x2="580" y2="105" stroke="#C9C2AE" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={40 + i * 48} cy="105" r="1.6" fill="#A47126">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.4s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {[
        { x: 20, label: "decision", sub: "/v1/decide", color: "#1B3A8F" },
        { x: 220, label: "execution_intent", sub: "admissibility check", color: "#A47126", live: true },
        { x: 420, label: "bind_receipt", sub: "TrustLog · Ed25519", color: "#3F5A3A" },
      ].map((n, i) => (
        <g key={n.label} transform={`translate(${n.x}, 55)`}>
          <rect x="0" y="0" width="160" height="100" rx="2" fill="#FAF6EB" stroke={n.color} strokeWidth="1.5" />
          {n.live && (
            <rect x="0" y="0" width="160" height="100" rx="2" fill="none" stroke={n.color} strokeWidth="1" opacity="0.45">
              <animate attributeName="stroke-width" values="1;3;1" dur="2.6s" repeatCount="indefinite" />
            </rect>
          )}
          <text x="80" y="42" textAnchor="middle" fontSize="13" fontWeight="600" fill="#15161A" fontFamily="IBM Plex Mono">{n.label}</text>
          <text x="80" y="64" textAnchor="middle" fontSize="11" fill="#5A5C62" fontFamily="IBM Plex Sans">{n.sub}</text>
          <line x1="60" y1="78" x2="100" y2="78" stroke={n.color} strokeWidth="1.5" />
          {i < 2 && <line x1="160" y1="50" x2="220" y2="50" stroke="#5A5C62" strokeWidth="1" markerEnd="url(#arr-u)" />}
        </g>
      ))}
      <text x="300" y="200" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono" fill="#5A5C62">
        h_t = SHA256(h_{"{t-1}"} ‖ r_t)
      </text>
      <text x="300" y="222" textAnchor="middle" fontSize="11" fontStyle="italic" fontFamily="Fraunces" fill="#A47126">
        approval ≠ commitment
      </text>
    </svg>
  );
}
