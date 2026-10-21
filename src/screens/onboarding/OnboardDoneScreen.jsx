import { useState, useEffect } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { StitchStar } from '../../components/Brand.jsx';
import { Btn } from '../../components/Button.jsx';

const CR = '#d9385e', WH = '#ffffff', SL = '#64748b', SUCCESS = '#10b981';

export const OnboardDoneScreen = () => {
  const { navigate } = useNav();
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  const steps = [
    { label: 'Account created', done: true },
    { label: 'Boutique configured', done: true },
    { label: 'Templates set up', done: true },
    { label: 'Staff added', done: true },
  ];

  return (
    <div style={{
      background: 'linear-gradient(160deg,#0f172a 0%,#1e3a5f 100%)',
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
      transition: 'opacity .5s', opacity: show ? 1 : 0,
    }}>
      <div style={{ marginBottom: 16 }}>
        <StitchStar size={52} color="#d9385e" sw={8} />
      </div>
      <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: '#fff', textAlign: 'center', marginBottom: 8 }}>
        You're all set! 🎉
      </div>
      <div style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center', marginBottom: 32 }}>
        AlterNote is ready to manage your boutique.
      </div>

      <div style={{ background: 'rgba(255,255,255,.06)', borderRadius: 14, padding: 20, width: '100%', marginBottom: 28 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: SUCCESS, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: WH, flexShrink: 0 }}>✓</div>
            <div style={{ fontSize: 13, color: '#fff' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('profileSelect')}
        style={{ background: '#fff', color: CR, border: 'none', borderRadius: 12, padding: '14px 18px', fontSize: 14, fontWeight: 600, width: '100%', cursor: 'pointer', marginBottom: 12 }}
      >
        Start Using AlterNote →
      </button>
      <div style={{ fontSize: 11, color: '#334155', textAlign: 'center' }}>
        14-day free trial started · All features unlocked
      </div>
    </div>
  );
};
