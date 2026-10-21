const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0';

export const TopHeader = ({ title, onBack, right, rightLabel, dark = false, noBottom = false, children }) => (
  <div style={{
    padding: '14px 18px',
    display: 'flex', alignItems: 'center', gap: 10,
    background: dark ? DN : WH,
    borderBottom: noBottom || dark ? 'none' : `1px solid ${BORDER}`,
    flexShrink: 0,
  }}>
    {onBack && (
      <button onClick={onBack} style={{
        width: 30, height: 30, borderRadius: 7,
        background: dark ? 'rgba(255,255,255,.12)' : BG,
        border: 'none', cursor: 'pointer', fontSize: 16,
        color: dark ? WH : DN,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>←</button>
    )}
    <h1 style={{ fontSize: 17, fontWeight: 600, color: dark ? WH : DN, flex: 1 }}>{title}</h1>
    {children}
    {right && (
      <button onClick={right} style={{
        background: rightLabel ? CR : 'transparent',
        color: rightLabel ? WH : SL,
        border: 'none', borderRadius: 7,
        padding: rightLabel ? '6px 11px' : '0',
        fontSize: rightLabel ? 12 : 18, fontWeight: 500, cursor: 'pointer',
      }}>{rightLabel || '⋮'}</button>
    )}
  </div>
);
