const WH = '#ffffff', DN = '#0f172a', SL = '#64748b', BORDER = '#e2e8f0', CR = '#d9385e';

export const Divider = ({ mx = 14 }) => (
  <div style={{ height: 1, background: BORDER, margin: `0 ${mx}px` }} />
);

export const SectionLabel = ({ text }) => (
  <div style={{
    fontSize: 11, color: SL, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: 0.5,
    padding: '14px 14px 6px',
  }}>
    {text}
  </div>
);

export const Card = ({ children, mb = 10, style = {} }) => (
  <div style={{
    background: WH, borderRadius: 14, padding: 14,
    margin: `0 14px ${mb}px`, border: `1px solid ${BORDER}`, ...style,
  }}>
    {children}
  </div>
);

export const Csm = ({ children, mb = 8, style = {} }) => (
  <div style={{
    background: WH, borderRadius: 12, padding: '12px 14px',
    margin: `0 14px ${mb}px`, border: `1px solid ${BORDER}`, ...style,
  }}>
    {children}
  </div>
);

export const InfoBanner = ({ text, color = 'amber' }) => {
  const c = {
    amber: { bg: '#fffbeb', tc: '#92400e' },
    blue:  { bg: '#eff6ff', tc: '#1e40af' },
    green: { bg: '#ecfdf5', tc: '#065f46' },
    red:   { bg: '#fef2f4', tc: '#be123c' },
  }[color] || { bg: '#fffbeb', tc: '#92400e' };
  return (
    <div style={{
      background: c.bg, padding: '9px 14px',
      display: 'flex', gap: 7, alignItems: 'flex-start',
      fontSize: 12, color: c.tc, lineHeight: 1.5, flexShrink: 0,
    }}>
      ℹ <span>{text}</span>
    </div>
  );
};

export const MetricCard = ({ label, value, sub, warn = false }) => (
  <div style={{
    background: WH, borderRadius: 11, padding: 14,
    border: `1px solid ${BORDER}`, flex: 1,
  }}>
    <div style={{ fontSize: 12, color: SL, marginTop: 2 }}>{label}</div>
    <div style={{
      fontSize: 22, fontWeight: 600,
      color: warn ? '#f59e0b' : DN,
      fontFamily: "'DM Serif Display', serif",
    }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: '#10b981', marginTop: 3, fontWeight: 500 }}>{sub}</div>}
  </div>
);
