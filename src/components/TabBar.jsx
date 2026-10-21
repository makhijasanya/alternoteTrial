const CR = '#d9385e', WH = '#ffffff', SL = '#64748b', BORDER = '#e2e8f0';

export const TabBar = ({ tabs, active, onChange }) => (
  <div style={{ display: 'flex', background: WH, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
    {tabs.map((tab, i) => (
      <div
        key={tab} onClick={() => onChange(i)}
        style={{
          flex: 1, padding: '12px 6px', textAlign: 'center', fontSize: 13,
          color: i === active ? CR : SL, cursor: 'pointer', position: 'relative', fontWeight: 500,
        }}
      >
        {tab}
        {i === active && (
          <div style={{
            position: 'absolute', bottom: 0, left: '20%', right: '20%',
            height: 2, background: CR, borderRadius: 2,
          }} />
        )}
      </div>
    ))}
  </div>
);

export const StepProgress = ({ steps, current }) => (
  <div style={{ display: 'flex', gap: 5, padding: '10px 14px', flexShrink: 0 }}>
    {Array.from({ length: steps }, (_, i) => (
      <div
        key={i}
        style={{
          flex: 1, height: 3, borderRadius: 3,
          background: i < current ? CR : BORDER,
          transition: 'background .3s',
        }}
      />
    ))}
  </div>
);

export const BottomNav = ({ tabs, active, onSelect }) => (
  <div style={{
    background: WH, borderTop: `1px solid ${BORDER}`,
    display: 'flex', padding: '6px 0 18px', flexShrink: 0,
  }}>
    {tabs.map((tab, i) => (
      <div
        key={tab.label} onClick={() => onSelect(i)}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 2, cursor: 'pointer', padding: '2px 4px',
        }}
      >
        <div style={{
          padding: '4px 14px', borderRadius: 20,
          background: i === active ? '#fef2f4' : 'transparent',
          transition: 'background 0.2s',
        }}>
          <span style={{ fontSize: 18 }}>{tab.icon}</span>
        </div>
        <span style={{
          fontSize: 10, fontWeight: i === active ? 600 : 400,
          color: i === active ? CR : SL, transition: 'color 0.2s',
        }}>
          {tab.label}
        </span>
      </div>
    ))}
  </div>
);
