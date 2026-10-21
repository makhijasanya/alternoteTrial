import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { StitchStar } from '../../components/Brand.jsx';
import { Input, PasswordInput } from '../../components/Input.jsx';

const SL = '#64748b', CR = '#d9385e', WH = '#ffffff', BORDER = '#e2e8f0', DN = '#0f172a';

export const LoginScreen = () => {
  const { navigate } = useNav();
  const [username, setUsername] = useState('priya_couture');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleLogin = () => {
    if (!pass) { setErr('Please enter your password.'); return; }
    setErr(''); setLoading(true);
    setTimeout(() => { setLoading(false); navigate('profileSelect'); }, 1200);
  };

  return (
    <div style={{
      background: 'linear-gradient(160deg,#0f172a 0%,#1e3a5f 100%)',
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start', padding: '56px 24px 24px',
    }}>
      <div style={{ marginBottom: 4 }}><StitchStar size={30} color="#d9385e" sw={9} /></div>
      <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.035em', fontSize: 27, color: '#fff', marginBottom: 4 }}>
        Alternote
      </div>
      <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 26 }}>Welcome back</div>

      <div style={{ background: WH, borderRadius: 18, padding: 22, width: '100%' }}>
        <h2 style={{ fontSize: 17, marginBottom: 3 }}>Sign in</h2>
        <p style={{ fontSize: 13, color: SL, marginBottom: 18 }}>Sign in to your account</p>
        <div style={{ marginBottom: 12 }}>
          <Input label="Username" value={username} onChange={setUsername} placeholder="your_boutique" />
        </div>
        <div style={{ marginBottom: err ? 8 : 18 }}>
          <PasswordInput label="Password" value={pass} onChange={setPass} placeholder="Enter password" />
        </div>
        {err && <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 12 }}>{err}</div>}
        <button
          onClick={handleLogin}
          style={{
            background: CR, color: WH, border: 'none', borderRadius: 12,
            padding: '13px 18px', fontSize: 14, fontWeight: 500, width: '100%',
            cursor: 'pointer', opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: SL }}>
          Forgot password? <span style={{ color: CR, cursor: 'pointer' }}>Reset via OTP</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0' }}>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
          <span style={{ fontSize: 11, color: SL }}>or</span>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
        </div>
        <button style={{
          width: '100%', background: WH, border: `1px solid ${BORDER}`, borderRadius: 12,
          padding: '11px 18px', fontSize: 13, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, color: DN,
        }}>
          <span style={{ fontSize: 16 }}>G</span>Continue with Google
        </button>
      </div>
      <div style={{ marginTop: 20, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
        Don't have an account? <span onClick={() => navigate('signUp')} style={{ color: '#fff', textDecoration: 'underline', cursor: 'pointer' }}>Sign up free</span>
      </div>
    </div>
  );
};
