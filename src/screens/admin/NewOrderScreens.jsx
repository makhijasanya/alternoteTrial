/* AlterNote — New Order Flow: Steps 1-4 + Review */
import { useState, useMemo } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { StepProgress } from '../../components/TabBar.jsx';
import { SearchBar } from '../../components/SearchBar.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { Tag } from '../../components/Tag.jsx';
import { SectionLabel, Csm } from '../../components/Layout.jsx';
import { MeasRow } from '../../components/Cards.jsx';
import { Btn } from '../../components/Button.jsx';
import { TextareaInput } from '../../components/Input.jsx';
import { GARMENT_TYPES, ALL_ORDER_TAGS, TAILORS } from '../../state/data.js';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0';

/* ── STEP 1: CLIENT SELECT ── */
export const NewOrderS1Screen = ({ preselectedClientId }) => {
  const { navigate, goBack } = useNav();
  const { clients, newOrder, dispatch } = useApp();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(preselectedClientId || newOrder.client?.id || null);

  const filtered = useMemo(() => clients.filter(c => !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q)), [clients, q]);

  const next = () => {
    const client = clients.find(c => c.id === sel);
    if (!client) return;
    dispatch({ type: 'UPDATE_NEW_ORDER', data: { client, step: 2 } });
    navigate('orderS2');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="New Order" onBack={goBack} />
      <StepProgress steps={4} current={1} />
      <div style={{ fontSize: 12, color: SL, padding: '0 14px 10px' }}>Step 1 of 4 — Select Client</div>
      <SearchBar value={q} onChange={setQ} placeholder="Search by name or phone…" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.map(c => (
          <div key={c.id} onClick={() => setSel(c.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', cursor: 'pointer', borderBottom: `1px solid ${BORDER}`, background: sel === c.id ? '#fef2f4' : WH, borderLeft: sel === c.id ? `3px solid ${CR}` : '3px solid transparent', transition: 'all .15s' }}>
            <Avatar initials={c.initials} color={c.color} textColor={c.textColor || '#fff'} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: SL, marginTop: 1 }}>{c.phone}</div>
            </div>
            {sel === c.id ? <div style={{ color: CR, fontSize: 18, fontWeight: 700 }}>✓</div> : <div style={{ display: 'flex', gap: 4 }}>{c.tags?.slice(0, 1).map(t => <Tag key={t} label={t} />)}</div>}
          </div>
        ))}
        <div onClick={() => navigate('addClient')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', cursor: 'pointer', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: BG, border: `1.5px dashed ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>➕</div>
          <div style={{ fontSize: 13, color: CR, fontWeight: 500 }}>Create new client</div>
        </div>
        <div style={{ height: 100 }} />
      </div>
      <div style={{ padding: '12px 14px 20px', background: WH, borderTop: `1px solid ${BORDER}` }}>
        <Btn label="Continue →" onClick={next} disabled={!sel} />
      </div>
    </div>
  );
};

/* ── STEP 2: GARMENT DETAILS ── */
export const NewOrderS2Screen = () => {
  const { navigate, goBack } = useNav();
  const { newOrder, dispatch } = useApp();
  const [garmentType, setGarmentType] = useState(newOrder.garmentType || 'Blouse');
  const [desc, setDesc] = useState(newOrder.description || '');
  const [tags, setTags] = useState(newOrder.tags || []);

  const next = () => {
    dispatch({ type: 'UPDATE_NEW_ORDER', data: { garmentType, description: desc, tags, step: 3 } });
    navigate('orderS3');
  };
  const toggleTag = (t) => setTags(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="New Order" onBack={goBack} />
      <StepProgress steps={4} current={2} />
      <div style={{ fontSize: 12, color: SL, padding: '0 14px 10px' }}>Step 2 of 4 — Garment Details</div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <SectionLabel text="Garment Type" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 14px 14px' }}>
          {GARMENT_TYPES.map(g => (
            <div key={g} onClick={() => setGarmentType(g)} style={{ padding: '7px 14px', borderRadius: 20, border: `1.5px solid ${g === garmentType ? CR : BORDER}`, background: g === garmentType ? '#fef2f4' : WH, color: g === garmentType ? CR : '#334155', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all .15s' }}>{g}</div>
          ))}
        </div>
        <div style={{ padding: '0 14px 14px' }}>
          <TextareaInput label="Description & Style Notes" value={desc} onChange={setDesc} rows={4} placeholder="e.g. Heavy embroidery, Banarasi base, sage green dupatta." />
        </div>
        <SectionLabel text="Order Tags" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, padding: '0 14px 14px' }}>
          {ALL_ORDER_TAGS.map(t => (
            <div key={t} onClick={() => toggleTag(t)} style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${tags.includes(t) ? CR : BORDER}`, background: tags.includes(t) ? '#fef2f4' : WH, color: tags.includes(t) ? CR : SL, fontSize: 12, cursor: 'pointer', transition: 'all .15s' }}>{t}</div>
          ))}
        </div>
        <SectionLabel text="Reference Image" />
        <div style={{ margin: '0 14px 20px', border: `2px dashed ${BORDER}`, borderRadius: 12, padding: 20, textAlign: 'center', cursor: 'pointer', color: SL }}>
          <div style={{ fontSize: 24, marginBottom: 5 }}>📷</div>
          <div style={{ fontSize: 13 }}>Tap to add reference image</div>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>Max 3 images · JPEG or PNG</div>
        </div>
      </div>
      <div style={{ padding: '12px 14px 20px', background: WH, borderTop: `1px solid ${BORDER}` }}>
        <Btn label="Continue →" onClick={next} disabled={!garmentType} />
      </div>
    </div>
  );
};

/* ── STEP 3: MEASUREMENTS ── */
export const NewOrderS3Screen = () => {
  const { navigate, goBack } = useNav();
  const { newOrder, clients, dispatch } = useApp();
  const client = newOrder.client;
  const baseMeas = clients.find(c => c.id === client?.id)?.measurements || {};
  const [meas, setMeas] = useState({ ...baseMeas, ...newOrder.measurements });

  const next = () => {
    dispatch({ type: 'UPDATE_NEW_ORDER', data: { measurements: meas, step: 4 } });
    navigate('orderS4');
  };

  const MEAS_FIELDS = ['Bust', 'Waist', 'Hip', 'Shoulder Width', 'Sleeve Length', 'Back Length', 'Front Length', 'Armhole'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="New Order" onBack={goBack} />
      <StepProgress steps={4} current={3} />
      <div style={{ fontSize: 12, color: SL, padding: '0 14px 10px' }}>Step 3 of 4 — Measurements</div>
      <div style={{ background: '#fef2f4', padding: '9px 14px', fontSize: 12, color: CR, flexShrink: 0 }}>
        Pre-filled from {client?.name}'s saved measurements. Edit if needed for this order.
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px' }}>
        {MEAS_FIELDS.map(k => (
          <MeasRow key={k} label={k} value={meas[k] || ''} onChange={v => setMeas(m => ({ ...m, [k]: v }))} />
        ))}
        <div style={{ height: 80 }} />
      </div>
      <div style={{ padding: '12px 14px 20px', background: WH, borderTop: `1px solid ${BORDER}` }}>
        <Btn label="Continue →" onClick={next} />
      </div>
    </div>
  );
};

/* ── STEP 4: DELIVERY & TAILOR ── */
export const NewOrderS4Screen = () => {
  const { navigate, goBack } = useNav();
  const { newOrder, dispatch } = useApp();
  const [date, setDate] = useState(newOrder.deliveryDate || '');
  const [tailor, setTailor] = useState(newOrder.tailor?.id || null);

  const next = () => {
    const t = TAILORS.find(t => t.id === tailor);
    dispatch({ type: 'UPDATE_NEW_ORDER', data: { deliveryDate: date, tailor: t, step: 5 } });
    navigate('orderReview');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="New Order" onBack={goBack} />
      <StepProgress steps={4} current={4} />
      <div style={{ fontSize: 12, color: SL, padding: '0 14px 10px' }}>Step 4 of 4 — Delivery & Tailor</div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <SectionLabel text="Delivery Date" />
        <div style={{ padding: '0 14px 14px' }}>
          <input type="date" onChange={e => setDate(e.target.value)} style={{ background: WH, border: `1px solid ${BORDER}`, borderRadius: 11, padding: '12px 14px', fontSize: 14, width: '100%', outline: 'none', color: DN }} onFocus={e => e.target.style.borderColor = CR} onBlur={e => e.target.style.borderColor = BORDER} />
        </div>
        <SectionLabel text="Assign Tailor" />
        {TAILORS.map(t => (
          <div key={t.id} onClick={() => setTailor(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: `1px solid ${BORDER}`, background: tailor === t.id ? '#fef2f4' : WH, cursor: 'pointer' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: t.color, color: t.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{t.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: SL }}>{t.active} active orders</div>
            </div>
            {tailor === t.id && <div style={{ color: CR, fontSize: 18, fontWeight: 700 }}>✓</div>}
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 14px 20px', background: WH, borderTop: `1px solid ${BORDER}` }}>
        <Btn label="Review Order →" onClick={next} />
      </div>
    </div>
  );
};

/* ── ORDER REVIEW ── */
export const OrderReviewScreen = () => {
  const { navigate, goBack } = useNav();
  const { newOrder, dispatch } = useApp();
  const client = newOrder.client;

  const submit = () => {
    dispatch({
      type: 'ADD_ORDER',
      order: {
        clientId: client?.id, garment: newOrder.garmentType,
        tailor: newOrder.tailor?.name || 'Ramesh K.', tailorId: newOrder.tailor?.id || 1,
        tags: newOrder.tags, due: newOrder.deliveryDate || '30 Apr',
        amount: 0, description: newOrder.description, type: 'order',
      },
    });
    navigate('orderList');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Review Order" onBack={goBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <div style={{ margin: '0 14px 10px', background: '#ecfdf5', borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 13, color: '#059669', fontWeight: 600, marginBottom: 3 }}>✓ Ready to create order</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>This will create a new order and notify the assigned tailor.</div>
        </div>
        <Csm mb={8}>
          {[
            ['Client', client?.name],
            ['Garment', newOrder.garmentType],
            ['Tags', newOrder.tags?.join(', ') || 'None'],
            ['Delivery', newOrder.deliveryDate || 'Not set'],
            ['Tailor', newOrder.tailor?.name || 'Ramesh Kumar'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${BORDER}`, fontSize: 13 }}>
              <span style={{ color: SL }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </Csm>
        {newOrder.description && (
          <Csm mb={8}>
            <div style={{ fontSize: 11, color: SL, fontWeight: 600, marginBottom: 6 }}>NOTES</div>
            <div style={{ fontSize: 13, color: DN, lineHeight: 1.6 }}>{newOrder.description}</div>
          </Csm>
        )}
      </div>
      <div style={{ padding: '12px 14px 20px', background: WH, borderTop: `1px solid ${BORDER}` }}>
        <Btn label="✓ Create Order" onClick={submit} />
      </div>
    </div>
  );
};
