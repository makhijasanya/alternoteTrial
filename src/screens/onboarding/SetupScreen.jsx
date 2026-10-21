import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { StepProgress } from '../../components/TabBar.jsx';
import { Input } from '../../components/Input.jsx';
import { Btn } from '../../components/Button.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';

const CR = '#d9385e', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', DN = '#0f172a';

const BOUTIQUE_TYPES = ['Bridal', 'Casual', 'Ethnic', 'Alterations Only', 'Luxury Couture', 'Mixed'];

export const SetupScreen = () => {
  const { navigate } = useNav();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');

  const next = () => {
    if (step < 3) { setStep(s => s + 1); return; }
    navigate('templateSetup');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <div style={{ background: CR, padding: '32px 22px 22px', textAlign: 'center', color: '#fff', flexShrink: 0 }}>
        <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Set Up Your Boutique</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.8)' }}>Just 3 quick steps</div>
      </div>
      <StepProgress steps={3} current={step} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px' }}>
        {step === 1 && <>
          <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, marginBottom: 6 }}>What's your boutique called?</div>
          <div style={{ fontSize: 13, color: SL, marginBottom: 20 }}>This is what clients will see on invoices and WhatsApp messages.</div>
          <Input label="Boutique Name *" value={name} onChange={setName} placeholder="e.g. Priya's Couture Studio" />
          <div style={{ marginTop: 14 }}>
            <Input label="City" value={city} onChange={setCity} placeholder="e.g. Mumbai" />
          </div>
        </>}

        {step === 2 && <>
          <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, marginBottom: 6 }}>What type of work do you do?</div>
          <div style={{ fontSize: 13, color: SL, marginBottom: 20 }}>This helps us suggest the right templates and workflows.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {BOUTIQUE_TYPES.map(t => (
              <div key={t} onClick={() => setType(t)} style={{
                padding: '10px 16px', borderRadius: 10,
                border: `2px solid ${t === type ? CR : BORDER}`,
                background: t === type ? '#fef2f4' : WH,
                color: t === type ? CR : DN, cursor: 'pointer', fontSize: 14, fontWeight: 500,
              }}>
                {t}
              </div>
            ))}
          </div>
        </>}

        {step === 3 && <>
          <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, marginBottom: 6 }}>Upload your logo (optional)</div>
          <div style={{ fontSize: 13, color: SL, marginBottom: 20 }}>Appears on PDF invoices. You can do this later from Settings.</div>
          <div style={{ border: `2px dashed ${BORDER}`, borderRadius: 14, padding: 40, textAlign: 'center', cursor: 'pointer', color: SL }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🖼</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Tap to upload logo</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>PNG or JPEG · Max 2 MB</div>
          </div>
          <div style={{ marginTop: 16, background: '#f0fdf4', borderRadius: 10, padding: 12, fontSize: 13, color: '#059669', lineHeight: 1.5 }}>
            ✓ Boutique: {name || "Priya's Couture Studio"}<br />
            ✓ City: {city || 'Mumbai'}<br />
            ✓ Type: {type || 'Bridal'}
          </div>
        </>}
      </div>

      <div style={{ padding: '12px 18px 24px', borderTop: `1px solid ${BORDER}`, background: WH }}>
        <Btn label={step < 3 ? 'Continue →' : 'Finish Setup'} onClick={next} disabled={step === 1 && !name} />
      </div>
    </div>
  );
};
