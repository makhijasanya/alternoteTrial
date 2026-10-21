/* AlterNote — Alteration Flow (all screens in one file) */
import { useState, useMemo } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { StepProgress } from '../../components/TabBar.jsx';
import { SearchBar } from '../../components/SearchBar.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { Tag, StatusPill } from '../../components/Tag.jsx';
import { SectionLabel, Csm, InfoBanner } from '../../components/Layout.jsx';
import { MeasRow } from '../../components/Cards.jsx';
import { Btn, Btn2 } from '../../components/Button.jsx';
import { Input, TextareaInput } from '../../components/Input.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', WARNING = '#f59e0b', SUCCESS = '#10b981';

/* ── ALT: CLIENT SELECT ── */
export const AlterClientScreen = () => {
  const { navigate, goBack } = useNav();
  const { clients } = useApp();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(null);

  const filtered = useMemo(() => clients.filter(c => !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q)), [clients, q]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="New Alteration" onBack={goBack} />
      <StepProgress steps={4} current={1} />
      <div style={{ fontSize: 12, color: SL, padding: '0 14px 10px' }}>Step 1 of 4 — Select Client</div>
      <SearchBar value={q} onChange={setQ} placeholder="Search by name or phone…" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.map(c => (
          <div key={c.id} onClick={() => setSel(c.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', cursor: 'pointer', borderBottom: `1px solid ${BORDER}`, background: sel === c.id ? '#fef2f4' : WH, borderLeft: sel === c.id ? `3px solid ${CR}` : '3px solid transparent' }}>
            <Avatar initials={c.initials} color={c.color} textColor={c.textColor || '#fff'} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: SL }}>{c.phone}</div>
            </div>
            {sel === c.id && <div style={{ color: CR, fontSize: 18, fontWeight: 700 }}>✓</div>}
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 14px 20px', background: WH, borderTop: `1px solid ${BORDER}` }}>
        <Btn label="Continue →" onClick={() => navigate('alterNew', { clientId: sel })} disabled={!sel} />
      </div>
    </div>
  );
};

/* ── ALT: GARMENT DETAILS ── */
export const AlterNewScreen = ({ clientId }) => {
  const { navigate, goBack } = useNav();
  const { clients } = useApp();
  const client = clients.find(c => c.id === clientId) || clients[0];
  const [garment, setGarment] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="New Alteration" onBack={goBack} />
      <StepProgress steps={4} current={2} />
      <div style={{ fontSize: 12, color: SL, padding: '0 14px 10px' }}>Step 2 of 4 — Garment Details</div>
      <InfoBanner text={`Alteration for ${client.name}. Measurements are stored on this alteration only — the master record will NOT be updated.`} color="amber" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <div style={{ padding: '0 14px 10px' }}><Input label="Garment Description" value={garment} onChange={setGarment} placeholder="e.g. Green silk blouse" /></div>
        <div style={{ padding: '0 14px 14px' }}>
          <TextareaInput label="Alteration Instructions *" value={desc} onChange={setDesc} rows={4} placeholder="e.g. Take waist in by 2 inches. Reduce right sleeve by 1.5 inches only. Do NOT touch the neckline." />
        </div>
        <SectionLabel text="Reference Photo (Optional)" />
        <div style={{ margin: '0 14px 14px', border: `2px dashed ${BORDER}`, borderRadius: 12, padding: 20, textAlign: 'center', cursor: 'pointer', color: SL }}>
          <div style={{ fontSize: 24, marginBottom: 5 }}>📷</div>
          <div style={{ fontSize: 13 }}>Add reference photo</div>
        </div>
      </div>
      <div style={{ padding: '12px 14px 20px', background: WH, borderTop: `1px solid ${BORDER}` }}>
        <Btn label="Continue →" onClick={() => navigate('alterMeas', { clientId })} disabled={!desc} />
      </div>
    </div>
  );
};

/* ── ALT: MEASUREMENTS ── */
export const AlterMeasScreen = ({ clientId }) => {
  const { navigate, goBack } = useNav();
  const { clients } = useApp();
  const client = clients.find(c => c.id === clientId) || clients[0];
  const [meas, setMeas] = useState({});

  const fields = ['Bust', 'Waist', 'Hip', 'Shoulder Width', 'Sleeve Length', 'Armhole'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Alteration" onBack={goBack} />
      <StepProgress steps={4} current={3} />
      <div style={{ fontSize: 12, color: SL, padding: '0 14px 10px' }}>Step 3 of 4 — Measurements</div>
      <InfoBanner text="These measurements apply only to this alteration — the client's master measurements are unaffected." color="amber" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px' }}>
        {fields.map(k => (
          <MeasRow key={k} label={k} value={meas[k] || ''} onChange={v => setMeas(m => ({ ...m, [k]: v }))} />
        ))}
        <div style={{ height: 20 }} />
      </div>
      <div style={{ padding: '12px 14px 20px', background: WH, borderTop: `1px solid ${BORDER}` }}>
        <Btn label="Continue →" onClick={() => navigate('alterDelivery', { clientId })} />
      </div>
    </div>
  );
};

/* ── ALT: DELIVERY DATE ── */
export const AlterDeliveryScreen = ({ clientId }) => {
  const { navigate, goBack } = useNav();
  const [date, setDate] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Alteration" onBack={goBack} />
      <StepProgress steps={4} current={4} />
      <div style={{ fontSize: 12, color: SL, padding: '0 14px 10px' }}>Step 4 of 4 — Delivery Date</div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <SectionLabel text="Expected Delivery" />
        <div style={{ padding: '0 14px 14px' }}>
          <input type="date" onChange={e => setDate(e.target.value)} style={{ background: WH, border: `1px solid ${BORDER}`, borderRadius: 11, padding: '12px 14px', fontSize: 14, width: '100%', outline: 'none', color: DN }} onFocus={e => e.target.style.borderColor = CR} onBlur={e => e.target.style.borderColor = BORDER} />
        </div>
        <InfoBanner text="Alteration invoices are always triggered manually by admin — never auto-generated." color="blue" />
      </div>
      <div style={{ padding: '12px 14px 20px', background: WH, borderTop: `1px solid ${BORDER}` }}>
        <Btn label="Review Alteration →" onClick={() => navigate('alterReview', { clientId })} />
      </div>
    </div>
  );
};

/* ── ALT: REVIEW ── */
export const AlterReviewScreen = ({ clientId }) => {
  const { navigate, goBack } = useNav();
  const { clients, orders, dispatch } = useApp();
  const client = clients.find(c => c.id === clientId) || clients[0];

  const submit = () => {
    const n = orders.length + 11;
    dispatch({
      type: 'ADD_ORDER',
      order: {
        clientId: client.id, garment: 'Cotton Blouse',
        tailor: 'Mohan J.', tailorId: 2,
        tags: [], due: '20 May', amount: 0,
        description: 'Alteration details pending…', type: 'alteration',
      },
    });
    navigate('alterDetail', { clientId });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Review Alteration" onBack={goBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <div style={{ margin: '0 14px 10px', background: '#ecfdf5', borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 13, color: '#059669', fontWeight: 600, marginBottom: 3 }}>✓ Ready to create alteration</div>
          <div style={{ fontSize: 12, color: SL }}>The client master record will NOT be modified.</div>
        </div>
        <Csm mb={8}>
          {[['Client', client.name], ['Type', 'Alteration'], ['Garment', 'Green silk blouse'], ['Tailor', 'Mohan Joshi'], ['Delivery', 'Pending']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${BORDER}`, fontSize: 13 }}>
              <span style={{ color: SL }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </Csm>
      </div>
      <div style={{ padding: '12px 14px 20px', background: WH, borderTop: `1px solid ${BORDER}` }}>
        <Btn label="✓ Create Alteration" onClick={submit} />
      </div>
    </div>
  );
};

/* ── ALT: DETAIL (Admin view) ── */
export const AlterDetailScreen = ({ orderId }) => {
  const { navigate, goBack } = useNav();
  const { orders, clients, dispatch } = useApp();
  const order = orders.find(o => o.id === orderId && o.type === 'alteration') || orders.find(o => o.type === 'alteration') || orders[3];
  const client = clients.find(c => c.id === order?.clientId);
  const STATUS_LIST = ['Received', 'In Progress', 'For Fitting', 'Completed', 'Delivered'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <div style={{ background: WH, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <button onClick={goBack} style={{ width: 30, height: 30, borderRadius: 7, background: BG, border: 'none', cursor: 'pointer', fontSize: 16 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{order?.id}</div>
          <div style={{ fontSize: 11, color: SL }}>Alteration · {client?.name}</div>
        </div>
        <StatusPill status={order?.status || 'Received'} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 10 }}>
        <Csm mb={8}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{order?.garment}</div>
          <div style={{ fontSize: 13, color: DN, lineHeight: 1.6 }}>{order?.description || 'Take waist in by 2 inches. Reduce right sleeve by 1.5 inches only. Do NOT touch the neckline.'}</div>
        </Csm>
        <InfoBanner text="This is an alteration. Measurements stored here do NOT affect the client master record." color="amber" />
        <SectionLabel text="Alteration Measurements" />
        <Csm mb={8}>
          {[['Waist (new)', '26"'], ['Sleeve R', '19.5"'], ['Neckline', 'Unchanged']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${BORDER}`, fontSize: 13 }}>
              <span style={{ color: SL }}>{k}</span><span>{v}</span>
            </div>
          ))}
        </Csm>
        <SectionLabel text="Update Status" />
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', padding: '0 14px 10px' }}>
          {STATUS_LIST.map(s => (
            <div key={s} onClick={() => dispatch({ type: 'UPDATE_STATUS', id: order?.id, status: s })}
              style={{ padding: '7px 12px', borderRadius: 7, border: `1.5px solid ${s === order?.status ? CR : BORDER}`, background: s === order?.status ? CR : WH, fontSize: 12, fontWeight: 500, color: s === order?.status ? '#fff' : SL, cursor: 'pointer' }}>{s}</div>
          ))}
        </div>
        <div style={{ padding: '4px 14px 16px' }}>
          <Btn label="Generate Alteration Invoice" onClick={() => navigate('alterBill', { orderId: order?.id })} />
        </div>
      </div>
    </div>
  );
};

/* ── ALT: INVOICE ── */
export const AlterBillScreen = ({ orderId }) => {
  const { goBack } = useNav();
  const { orders, clients, dispatch } = useApp();
  const order = orders.find(o => o.id === orderId) || orders.find(o => o.type === 'alteration') || orders[3];
  const client = clients.find(c => c.id === order?.clientId);
  const [amount, setAmount] = useState('1500');

  const markPaid = () => dispatch({ type: 'MARK_PAID', id: order?.id });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <TopHeader title="Alteration Invoice" onBack={goBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <InfoBanner text="Alteration invoices are manually triggered — never auto-created. Verify with admin before sending." color="amber" />
        <Csm mb={10} style={{ marginTop: 10 }}>
          <div style={{ fontSize: 11, color: SL, fontWeight: 600, marginBottom: 8 }}>ALTERATION BILL</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: `1px solid ${BORDER}` }}>
            <span style={{ color: SL }}>Client</span><span style={{ fontWeight: 500 }}>{client?.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: `1px solid ${BORDER}` }}>
            <span style={{ color: SL }}>Order</span><span>{order?.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0' }}>
            <span style={{ color: SL }}>Garment</span><span>{order?.garment}</span>
          </div>
        </Csm>
        <div style={{ padding: '0 14px 10px' }}>
          <Input label="Alteration Charges (₹)" value={amount} onChange={setAmount} />
        </div>
        {!order?.paid ? (
          <div style={{ padding: '0 14px 16px', display: 'flex', gap: 8 }}>
            <Btn label="Mark as Paid" onClick={markPaid} />
            <Btn2 label="Send on WhatsApp" />
          </div>
        ) : (
          <div style={{ margin: '0 14px', background: '#ecfdf5', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <div style={{ fontSize: 13, color: '#059669', fontWeight: 500 }}>Payment received — ₹{amount}</div>
          </div>
        )}
      </div>
    </div>
  );
};
