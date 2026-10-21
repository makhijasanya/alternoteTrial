// AlterNote — Logo marks & lockups (geometric, modern)
// Palette
// Palette — straight from the app UI (components.jsx)
const ROSE = '#d9385e';       // CR — primary
const ROSE_SOFT = '#fef2f4';  // VIP/Rush tag bg
const INK = '#0f172a';        // DN — navy, used for dark surfaces & text
const PAPER = '#fdfbf7';      // OW — off-white surface
const PLUM = '#0f172a';       // (was plum) → navy, keeps palette consistent
const CREAMTEXT = '#f1f5f9';  // light text on navy

// ---------------------------------------------------------------------------
// 1 · NOTCH  — the A as a caret/notch with a stitched crossbar
// ---------------------------------------------------------------------------
const NotchMark = ({ size = 96, stroke = '#fff', sw = 8.5 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 78 L50 26 L79 78" />
    <line x1="34.5" y1="60" x2="65.5" y2="60" strokeDasharray="0.1 15" />
  </svg>
);

// ---------------------------------------------------------------------------
// 2 · STITCH-STAR — the ✦ rebuilt from radiating thread stitches
// ---------------------------------------------------------------------------
const StitchStar = ({ size = 96, stroke = '#fff', sw = 8 }) => {
  const arms = [0, 45, 90, 135, 180, 225, 270, 315];
  const inner = 13, outer = 34;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
         stroke={stroke} strokeWidth={sw} strokeLinecap="round">
      {arms.map((a, i) => {
        const r = (a % 90 === 0) ? outer : outer - 9;
        const rad = (a * Math.PI) / 180;
        const x1 = 50 + Math.cos(rad) * inner, y1 = 50 + Math.sin(rad) * inner;
        const x2 = 50 + Math.cos(rad) * r, y2 = 50 + Math.sin(rad) * r;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 4 · TAG — a clothing hang-tag with a monogram dot
// ---------------------------------------------------------------------------
const TagMark = ({ size = 96, stroke = '#fff', sw = 7 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d="M40 24 L74 24 L74 76 L40 76 L24 50 Z" />
    <circle cx="55" cy="50" r="6.5" fill={stroke} stroke="none" />
  </svg>
);

// ---------------------------------------------------------------------------
// 2 + 4 · HYBRID — a hang-tag carrying the stitch-star emblem
// ---------------------------------------------------------------------------
const HybridMark = ({ size = 96, stroke = '#fff', sw = 6, star }) => {
  const sc = star || stroke;
  const arms = [0, 45, 90, 135, 180, 225, 270, 315];
  const cx = 57, cy = 50, inner = 5, outer = 12.5;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
         strokeLinecap="round" strokeLinejoin="round">
      {/* tag silhouette + threading hole */}
      <g stroke={stroke} strokeWidth={sw} fill="none">
        <path d="M44 24 L78 24 L78 76 L44 76 L26 50 Z" />
        <circle cx="38" cy="50" r="3.2" />
      </g>
      {/* stitch-star emblem */}
      <g stroke={sc} strokeWidth={sw} fill="none">
        {arms.map((a, i) => {
          const r = (a % 90 === 0) ? outer : outer - 4;
          const rad = (a * Math.PI) / 180;
          const x1 = cx + Math.cos(rad) * inner, y1 = cy + Math.sin(rad) * inner;
          const x2 = cx + Math.cos(rad) * r, y2 = cy + Math.sin(rad) * r;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// App-icon squircle shell
// ---------------------------------------------------------------------------
const IconTile = ({ bg, children, size = 132, glow }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.235,
    background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: glow || '0 18px 40px -16px rgba(23,19,26,.45), inset 0 1px 0 rgba(255,255,255,.12)',
    position: 'relative', overflow: 'hidden', flexShrink: 0,
  }}>{children}</div>
);

// Wordmark renderer
const Wordmark = ({ family, size = 38, weight = 600, color = INK, accent = ROSE,
                    text = 'alternote', tracking = '-0.02em', italic = false, dot }) => (
  <div style={{ fontFamily: family + ', sans-serif', fontSize: size, fontWeight: weight, color,
                letterSpacing: tracking, lineHeight: 1, fontStyle: italic ? 'italic' : 'normal',
                whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'baseline' }}>
    {text}{dot && <span style={{ color: accent }}>{dot}</span>}
  </div>
);

Object.assign(window, {
  ROSE, ROSE_SOFT, INK, PAPER, PLUM, CREAMTEXT,
  NotchMark, StitchStar, TagMark, HybridMark, IconTile, Wordmark,
});
