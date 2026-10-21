import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { STAFF } from '../../state/data.js';

const CR = '#d9385e', WH = '#ffffff', SL = '#64748b', BORDER = '#e2e8f0', BG = '#f1f5f9', DN = '#0f172a';

export const ProfileSelectScreen = () => {
  const { navigate } = useNav();
  const { dispatch } = useApp();
  const [selected, setSelected] = useState(0);
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');

  const handlePinKey = (d) => {
    if (d === 'del') { setPin(p => p.slice(0, -1)); setErr(''); return; }
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        const profile = STAFF[selected];
        dispatch({ type: 'SET_PROFILE', profile });
        const dest = profile.role === 'tailor' ? 'tailorOrders' : profile.role === 'help' ? 'helpDash' : 'dashboard';
        navigate(dest);
      }, 300);
    }
  };

  const keys = ['1','2','3','4','5','6','7','8','9','','0','del'];

  return (
    <div style={{ background: '#fdfbf7', minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '36px 18px 18px', overflowY: 'auto' }}>
      <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: DN, marginBottom: 3 }}>Who's working today?</div>
      <div style={{ fontSize: 13, color: SL, marginBottom: 24 }}>Select your profile to continue</div>

      {STAFF.map((s, i) => (
        <div
          key={s.id} onClick={() => { setSelected(i); setPin(''); setErr(''); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12,
            border: `2px solid ${i === selected ? CR : BORDER}`,
            background: i === selected ? '#fef2f4' : WH,
            marginBottom: 7, cursor: 'pointer', transition: 'all .2s',
          }}
        >
          <div style={{ width: 46, height: 46, borderRadius: 13, background: s.color, color: s.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 17 }}>
            {s.initials}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</div>
            <div style={{ fontSize: 12, color: SL }}>{s.roleLabel}</div>
          </div>
          {i === selected && <div style={{ marginLeft: 'auto', color: CR, fontSize: 18, fontWeight: 700 }}>✓</div>}
        </div>
      ))}

      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 12, color: SL, textAlign: 'center', marginBottom: 8 }}>Enter PIN for {STAFF[selected].name}</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 6 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              width: 46, height: 46, borderRadius: 11, background: BG,
              border: `2px solid ${i < pin.length ? CR : BORDER}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, transition: 'border-color .2s',
            }}>
              {i < pin.length ? '●' : ''}
            </div>
          ))}
        </div>
        {err && <div style={{ fontSize: 12, color: '#ef4444', textAlign: 'center', marginBottom: 8 }}>{err}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 12 }}>
          {keys.map((k, i) => (
            <button
              key={i} onClick={() => k && handlePinKey(k)}
              style={{
                height: 46, borderRadius: 11, border: `1px solid ${BORDER}`,
                background: k ? WH : 'transparent', fontSize: k === 'del' ? 13 : 18,
                fontWeight: 500, cursor: k ? 'pointer' : 'default', color: DN,
              }}
            >
              {k === 'del' ? '⌫' : k}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>Any 4-digit PIN works in demo mode</div>
      </div>
    </div>
  );
};
