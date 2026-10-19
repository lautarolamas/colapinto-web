// Ilustraciones SVG originales: Sol de Mayo, casco y firma.

export function Sol({ className = "", rays = 32 }) {
  const items = Array.from({ length: rays }, (_, i) => {
    const angle = (360 / rays) * i;
    const straight = i % 2 === 0;
    return straight ? (
      <path key={i} d="M100 4 L104 46 L96 46 Z" transform={`rotate(${angle} 100 100)`} />
    ) : (
      <path
        key={i}
        d="M100 10 C106 22 94 30 100 46"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        transform={`rotate(${angle} 100 100)`}
      />
    );
  });
  return (
    <svg className={className} viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
      <g className="sol-rays">{items}</g>
      <circle cx="100" cy="100" r="44" />
      <g fill="none" stroke="var(--sol-face, #b07a00)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M80 92 q6 -6 12 0" />
        <path d="M108 92 q6 -6 12 0" />
        <path d="M100 98 v12 q-3 3 -6 1" />
        <path d="M86 118 q14 10 28 0" />
      </g>
    </svg>
  );
}

export function Helmet({ base, stripe, accent, className = "" }) {
  const id = `shell-${base}-${stripe}`.replace(/#/g, "");
  return (
    <svg className={className} viewBox="0 0 220 200" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <path d="M30 120 C30 50 80 18 130 18 C182 18 205 60 205 108 L205 150 C205 168 192 178 172 178 L60 178 C40 178 30 166 30 150 Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="220" height="200" fill={base} />
        <path d="M0 96 C60 70 140 70 220 100 L220 124 C140 94 60 94 0 120 Z" fill={stripe} />
        <path d="M0 140 C70 116 150 118 220 146 L220 156 C150 128 70 126 0 150 Z" fill={accent} />
        <circle cx="150" cy="52" r="16" fill={accent} opacity="0.9" />
        <text x="58" y="70" fontFamily="var(--font-display)" fontSize="34" fontWeight="800" fill={stripe}>
          43
        </text>
      </g>
      {/* visor */}
      <path
        d="M96 92 C120 84 176 84 205 96 L205 128 C176 120 126 120 100 126 C88 128 84 98 96 92 Z"
        fill="#0b0f16"
        opacity="0.92"
      />
      <path d="M118 96 C140 92 170 92 196 98" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" fill="none" />
      <path
        d="M30 120 C30 50 80 18 130 18 C182 18 205 60 205 108 L205 150 C205 168 192 178 172 178 L60 178 C40 178 30 166 30 150 Z"
        fill="none"
        stroke="#0b0f16"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
    </svg>
  );
}

export function Firma({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 420 140" fill="none" aria-hidden="true">
      <path
        className="firma-path"
        d="M20 96 C40 40 70 24 74 40 C78 58 40 104 46 110 C54 118 84 54 96 60 C106 66 92 100 104 100 C118 100 128 62 140 66 C150 70 136 104 150 102 C166 100 170 62 186 60 C200 58 180 104 198 102 C214 100 222 58 240 60 C256 62 236 108 256 104 C272 100 282 54 300 58 C316 62 296 106 316 100 C332 96 340 70 356 72 C370 74 360 96 372 96 C388 96 396 80 404 74"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path className="firma-path" d="M60 122 C150 112 280 112 380 120" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
