import { useState, useEffect } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { StitchStar } from '../../components/Brand.jsx';

export const SplashScreen = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);
  const { navigate } = useNav();

  return (
    <div style={{
      background: 'linear-gradient(160deg,#0f172a 0%,#1e3a5f 100%)',
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
      transition: 'opacity .5s', opacity: show ? 1 : 0,
    }}>
      <div style={{ marginBottom: 6, transition: 'transform .6s', transform: show ? 'scale(1)' : 'scale(.7)' }}>
        <StitchStar size={52} color="#d9385e" sw={8} />
      </div>
      <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.035em', fontSize: 36, color: '#fff', marginBottom: 5, textAlign: 'center' }}>
        Alternote
      </div>
      <div style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', marginBottom: 40 }}>
        Your boutique, beautifully managed
      </div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: '#fff', lineHeight: 1.4, marginBottom: 10 }}>
          From notebooks to<br />your digital register
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>
          Client measurements. Orders. Billing.<br />All in one place, built for boutiques.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5, marginBottom: 28 }}>
        <div style={{ width: 22, height: 4, background: '#fff', borderRadius: 4 }} />
        <div style={{ width: 5, height: 4, background: 'rgba(255,255,255,.3)', borderRadius: 4 }} />
        <div style={{ width: 5, height: 4, background: 'rgba(255,255,255,.3)', borderRadius: 4 }} />
      </div>
      <button
        onClick={() => navigate('login')}
        style={{ background: '#fff', color: '#d9385e', border: 'none', borderRadius: 12, padding: '14px 18px', fontSize: 14, fontWeight: 600, width: '100%', cursor: 'pointer', marginBottom: 12 }}
      >
        Get Started — It's Free
      </button>
      <div style={{ fontSize: 13, color: '#64748b', textAlign: 'center' }}>
        Already have an account? <span onClick={() => navigate('login')} style={{ color: '#fff', cursor: 'pointer' }}>Sign in</span>
      </div>
      <div style={{ marginTop: 40, fontSize: 11, color: '#334155', textAlign: 'center' }}>
        14-day free trial · No credit card required
      </div>
    </div>
  );
};
