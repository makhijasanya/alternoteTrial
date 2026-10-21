const CR = '#d9385e', WH = '#ffffff', DN = '#0f172a', BG = '#f1f5f9', BORDER = '#e2e8f0';

export const Btn = ({ label, onClick, color, disabled = false, style = {} }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: disabled ? '#cbd5e1' : color || CR,
      color: WH, border: 'none', borderRadius: 12,
      padding: '13px 18px', fontSize: 14, fontWeight: 500,
      width: '100%', cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'opacity .15s', ...style,
    }}
  >
    {label}
  </button>
);

export const Btn2 = ({ label, onClick, style = {} }) => (
  <button
    onClick={onClick}
    style={{
      background: BG, color: DN, border: `1px solid ${BORDER}`,
      borderRadius: 12, padding: '11px 18px', fontSize: 13,
      width: '100%', cursor: 'pointer', ...style,
    }}
  >
    {label}
  </button>
);

export const IconBtn = ({ icon, onClick, size = 34, style = {} }) => (
  <button
    onClick={onClick}
    style={{
      width: size, height: size, borderRadius: size / 3,
      background: BG, border: `1px solid ${BORDER}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.5, cursor: 'pointer', flexShrink: 0, ...style,
    }}
  >
    {icon}
  </button>
);
