import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { StitchStar } from '../../components/Brand.jsx';

const CR = '#d9385e', WH = '#ffffff', SL = '#64748b', BORDER = '#e2e8f0', BG = '#f1f5f9', DN = '#0f172a';

export const OTPScreen = () => {
  const { navigate, goBack } = useNav();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleChange = (val, i) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
    if (next.every(d => d)) {
      setLoading(true);
      setTimeout(() => { setLoading(false); navigate('setup'); }, 1000);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(160deg,#0f172a 0%,#1e3a5f 100%)',
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start', padding: '56px 24px 24px',
    }}>
      <div style={{ marginBottom: 4 }}><StitchStar size={30} color="#d9385e" sw={9} /></div>
      <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.035em', fontSize: 27, color: '#fff', marginBottom: 4 }}>AlterNote</div>
      <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 26 }}>Verify your number</div>

      <div style={{ background: WH, borderRadius: 18, padding: 22, width: '100%' }}>
        <h2 style={{ fontSize: 17, marginBottom: 3 }}>Enter OTP</h2>
        <p style={{ fontSize: 13, color: SL, marginBottom: 22 }}>We sent a 6-digit code to +91 98765 43210</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
          {otp.map((d, i) => (
            <input
              key={i} id={`otp-${i}`}
              value={d} onChange={e => handleChange(e.target.value, i)}
              maxLength={1} inputMode="numeric"
              style={{
                width: 42, height: 50, textAlign: 'center', fontSize: 20, fontWeight: 600,
                border: `2px solid ${d ? CR : BORDER}`, borderRadius: 10, outline: 'none',
                color: DN, background: WH,
              }}
              onFocus={e => e.target.style.borderColor = CR}
              onBlur={e => e.target.style.borderColor = otp[i] ? CR : BORDER}
            />
          ))}
        </div>
        <button
          onClick={() => { setLoading(true); setTimeout(() => navigate('setup'), 1000); }}
          style={{
            background: loading ? '#cbd5e1' : CR, color: WH, border: 'none', borderRadius: 12,
            padding: '13px 18px', fontSize: 14, fontWeight: 500, width: '100%', cursor: 'pointer',
          }}
        >
          {loading ? 'Verifying…' : 'Verify'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: SL }}>
          Didn't receive? <span style={{ color: CR, cursor: 'pointer' }}>Resend OTP</span>
        </div>
      </div>
    </div>
  );
};
