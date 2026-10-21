/* AlterNote — Payment Setup & Payment Link Screens */
import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { Input } from '../../components/Input.jsx';
import { Btn, Btn2 } from '../../components/Button.jsx';
import { SectionLabel, Csm, InfoBanner } from '../../components/Layout.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', SUCCESS = '#10b981';

/* ── PAYMENT SETUP ── */
export const PaymentSetupScreen = () => {
  const { goBack } = useNav();
  const [upi, setUpi] = useState('priya@upi');
  const [bank, setBank] = useState('');
  const [ifsc, setIfsc] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Payment Setup" onBack={goBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <SectionLabel text="UPI" />
        <div style={{ padding: '0 14px 10px' }}><Input label="UPI ID" value={upi} onChange={setUpi} placeholder="yourname@upi" /></div>
        <div style={{ margin: '0 14px 14px', background: '#ecfdf5', borderRadius: 10, padding: 12, fontSize: 12, color: '#059669' }}>
          ✓ UPI ID connected — payment links will use this
        </div>

        <SectionLabel text="Bank Transfer" />
        <div style={{ padding: '0 14px 10px' }}><Input label="Account Number" value={bank} onChange={setBank} placeholder="XXXX XXXX XXXX" /></div>
        <div style={{ padding: '0 14px 14px' }}><Input label="IFSC Code" value={ifsc} onChange={setIfsc} placeholder="HDFC0001234" /></div>

        <InfoBanner text="Payment links generated via Alternote will route to your UPI ID or show bank details." color="blue" />
        <div style={{ padding: '16px 14px' }}><Btn label="Save Payment Details" /></div>
      </div>
    </div>
  );
};

/* ── PAYMENT LINK ── */
export const PaymentLinkScreen = ({ orderId }) => {
  const { goBack } = useNav();
  const { orders, clients } = useApp();
  const order = orders.find(o => o.id === orderId) || orders[0];
  const client = clients.find(c => c.id === order?.clientId);
  const [amount, setAmount] = useState(String(order?.amount || ''));
  const [note, setNote] = useState(order?.garment || '');
  const [sent, setSent] = useState(false);

  const sendLink = () => setSent(true);

  if (sent) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, textAlign: 'center', marginBottom: 8 }}>Payment link sent!</div>
        <div style={{ fontSize: 13, color: SL, textAlign: 'center', lineHeight: 1.6, marginBottom: 24 }}>
          A WhatsApp message with the payment link has been sent to {client?.name} at {client?.phone}.
        </div>
        <div style={{ background: BG, borderRadius: 12, padding: 16, width: '100%', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: SL }}>Amount</span><span style={{ fontWeight: 600 }}>₹{parseInt(amount).toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: SL }}>Expires</span><span>48 hours</span>
          </div>
        </div>
        <Btn2 label="Go Back" onClick={goBack} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Create Payment Link" onBack={goBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <Csm mb={10}>
          <div style={{ fontSize: 11, color: SL, fontWeight: 600, marginBottom: 6 }}>CLIENT</div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{client?.name}</div>
          <div style={{ fontSize: 12, color: SL, marginTop: 2 }}>{client?.phone}</div>
        </Csm>
        <div style={{ padding: '0 14px 10px' }}><Input label="Amount (₹)" value={amount} onChange={setAmount} placeholder="Enter amount" /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="Description" value={note} onChange={setNote} placeholder="e.g. Blouse — advance" /></div>
        <InfoBanner text="Link will be sent via WhatsApp to the client's registered number. Valid for 48 hours." color="blue" />
        <div style={{ padding: '16px 14px' }}><Btn label="Send Payment Link via WhatsApp 📤" onClick={sendLink} disabled={!amount} /></div>
      </div>
    </div>
  );
};
