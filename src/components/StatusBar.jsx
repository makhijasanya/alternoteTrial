const WH = '#ffffff', DN = '#0f172a', SL = '#64748b';

export const StatusBar = ({ dark = false }) => (
  <div style={{
    padding: '12px 20px 6px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: dark ? DN : WH, flexShrink: 0,
  }}>
    <span style={{ fontWeight: 600, color: dark ? WH : DN, fontSize: 13 }}>9:41</span>
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11, color: dark ? '#94a3b8' : SL }}>
      <span>●●●</span><span>WiFi</span><span>🔋</span>
    </div>
  </div>
);
