const WH = '#ffffff', DN = '#0f172a', SL = '#64748b', BORDER = '#e2e8f0', CR = '#d9385e';

export const SearchBar = ({ value, onChange, placeholder = 'Search…' }) => (
  <div style={{
    margin: '14px',
    background: WH, border: `1px solid ${BORDER}`, borderRadius: 12,
    padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 8,
    color: SL, fontSize: 14, flexShrink: 0,
  }}>
    <span>🔍</span>
    <input
      value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{
        border: 'none', outline: 'none', flex: 1, fontSize: 14,
        background: 'transparent', color: DN,
      }}
    />
    {value && (
      <span onClick={() => onChange('')} style={{ cursor: 'pointer', color: SL, fontSize: 12 }}>✕</span>
    )}
  </div>
);

export const FilterChips = ({ chips, active, onSelect }) => {
  const CR = '#d9385e', SL = '#64748b', BG = '#f1f5f9', WH = '#ffffff';
  return (
    <div style={{ display: 'flex', gap: 7, padding: '0 14px 11px', overflowX: 'auto', flexShrink: 0 }}>
      {chips.map((chip, i) => (
        <div
          key={chip} onClick={() => onSelect(i)}
          style={{
            background: i === active ? CR : BG, color: i === active ? WH : SL,
            padding: '4px 12px', borderRadius: 20, fontSize: 12,
            whiteSpace: 'nowrap', cursor: 'pointer',
            fontWeight: i === active ? 500 : 400, transition: 'all .15s',
          }}
        >
          {chip}
        </div>
      ))}
    </div>
  );
};
