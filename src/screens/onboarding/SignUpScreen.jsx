import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { StitchStar } from '../../components/Brand.jsx';
import { Input, PasswordInput } from '../../components/Input.jsx';

const SL = '#64748b', CR = '#d9385e', WH = '#ffffff', BORDER = '#e2e8f0', DN = '#0f172a';

export const SignUpScreen = () => {
  const { navigate, goBack } = useNav();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [pass, setPass] = useState('');

  const handleSignUp = () => {
    navigate('otp');
  };

  return (
    <div style={{
      background: 'linear-gradient(160deg,#0f172a 0%,#1e3a5f 100%)',
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start', padding: '56px 24px 24px',
    }}>
      <div style={{ marginBottom: 4 }}><StitchStar size={30} color="#d9385e" sw={9} /></div>
      <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.035em', fontSize: 27, color: '#fff', marginBottom: 4 }}>
        AlterNote
      </div>
      <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 26 }}>Create your account</div>

      <div style={{ background: WH, borderRadius: 18, padding: 22, width: '100%' }}>
        <h2 style={{ fontSize: 17, marginBottom: 3 }}>Sign up free</h2>
        <p style={{ fontSize: 13, color: SL, marginBottom: 18 }}>14-day free trial · No credit card needed</p>
        <div style={{ marginBottom: 12 }}>
          <Input label="Your Name" value={name} onChange={setName} placeholder="e.g. Priya Mehta" />
        </div>
        <div style={{ marginBottom: 12 }}>
          <Input label="Mobile Number" value={phone} onChange={setPhone} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <PasswordInput label="Set Password" value={pass} onChange={setPass} placeholder="Min. 8 characters" />
        </div>
        <button
          onClick={handleSignUp}
          style={{ background: CR, color: WH, border: 'none', borderRadius: 12, padding: '13px 18px', fontSize: 14, fontWeight: 500, width: '100%', cursor: 'pointer' }}
        >
          Continue →
        </button>
        <div style={{ fontSize: 11, color: SL, textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
          By continuing, you agree to our <span style={{ color: CR }}>Terms</span> & <span style={{ color: CR }}>Privacy Policy</span>
        </div>
      </div>
      <div style={{ marginTop: 20, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
        Already have an account? <span onClick={goBack} style={{ color: '#fff', textDecoration: 'underline', cursor: 'pointer' }}>Sign in</span>
      </div>
    </div>
  );
};
