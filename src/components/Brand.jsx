/* AlterNote — Brand mark (stitch-star) + wordmark */

export const StitchStar = ({ size = 44, color = '#d9385e', sw = 8 }) => {
  const arms = [0, 45, 90, 135, 180, 225, 270, 315];
  const inner = 13, card = 34, diag = 25;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round">
      {arms.map((a, i) => {
        const r = (a % 90 === 0) ? card : diag;
        const rad = a * Math.PI / 180;
        return (
          <line key={i}
            x1={50 + Math.cos(rad) * inner} y1={50 + Math.sin(rad) * inner}
            x2={50 + Math.cos(rad) * r}     y2={50 + Math.sin(rad) * r} />
        );
      })}
    </svg>
  );
};

export const Wordmark = ({ size = 30, color = '#fff' }) => (
  <div style={{
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontWeight: 700, fontSize: size, letterSpacing: '-0.035em', color, lineHeight: 1,
  }}>
    Alternote
  </div>
);

export const LogoLockup = ({ size = 'md', dark = true }) => {
  const sizes = { sm: { icon: 22, font: 16, r: 8 }, md: { icon: 30, font: 22, r: 10 }, lg: { icon: 42, font: 30, r: 14 } };
  const s = sizes[size] || sizes.md;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: s.icon * 0.4 }}>
      <div style={{
        width: s.icon * 1.6, height: s.icon * 1.6, borderRadius: s.r,
        background: dark ? 'rgba(255,255,255,.06)' : '#0f172a',
        border: `1px solid ${dark ? 'rgba(255,255,255,.1)' : 'transparent'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <StitchStar size={s.icon} color="#d9385e" sw={8} />
      </div>
      <Wordmark size={s.font} color={dark ? '#fff' : '#0f172a'} />
    </div>
  );
};
