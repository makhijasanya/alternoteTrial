/* AlterNote — Help/Assistant Role Screens */
import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { SearchBar } from '../../components/SearchBar.jsx';
import { OrderCard, MeasRow } from '../../components/Cards.jsx';
import { StatusPill } from '../../components/Tag.jsx';
import { SectionLabel, Csm, InfoBanner, MetricCard } from '../../components/Layout.jsx';
import { BottomNav } from '../../components/TabBar.jsx';
import { Btn } from '../../components/Button.jsx';
import { Input } from '../../components/Input.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0';

const HELP_TABS = [
  { icon: '🏠', label: 'Home',     screen: 'helpDash' },
  { icon: '📦', label: 'Orders',   screen: 'helpOrders' },
  { icon: '⚙️', label: 'Settings', screen: 'helpSettings' },
];

const HelpNav = ({ active }) => {
  const { navigate } = useNav();
  return <BottomNav tabs={HELP_TABS} active={active} onSelect={i => navigate(HELP_TABS[i].screen)} />;
};

/* ── HELP DASHBOARD ── */
export const HelpDashScreen = () => {
  const { navigate } = useNav();
  const { orders, clients, profile } = useApp();
  const active = orders.filter(o => !['Delivered', 'Completed'].includes(o.status));
  const forTrial = orders.filter(o => o.status === 'Trial Ready');
  const delivered = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <div style={{ background: WH, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 11, color: SL }}>Logged in as</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: DN }}>{profile.name}</div>
        </div>
        <div style={{ background: '#f0fdf4', color: '#16a34a', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>
          Helper
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 9, padding: 14, background: WH, borderBottom: `1px solid ${BORDER}` }}>
          <MetricCard label="Active Orders" value={String(active.length)} sub="Assigned to you" />
          <MetricCard label="Delivered" value={String(delivered)} sub="This month" />
        </div>

        {forTrial.length > 0 && (
          <div style={{ margin: '12px 14px 0', background: '#fef3c7', borderRadius: 10, padding: '10px 13px', border: '1px solid #f59e0b', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>📋</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#92400e' }}>{forTrial.length} Trial Fitting(s) Ready</div>
              <div style={{ fontSize: 11, color: '#b45309', marginTop: 1 }}>Notify clients to schedule</div>
            </div>
          </div>
        )}

        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: SL, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Quick Actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
            {[['📏', 'Measurements', 'helpOrders'], ['📦', 'View Orders', 'helpOrders'], ['👤', 'Clients', 'helpOrders'], ['💬', 'Conversations', 'conversations']].map(([ic, lb, sc]) => (
              <div key={lb} onClick={() => navigate(sc)} style={{ background: WH, borderRadius: 11, padding: '12px 10px', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>{ic}</span>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{lb}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionLabel text={`Active Orders (${active.length})`} />
        {active.slice(0, 4).map(o => (
          <OrderCard key={o.id} order={o} client={clients.find(c => c.id === o.clientId)} onClick={() => navigate('helpOrderDetail', { orderId: o.id })} />
        ))}
        <div style={{ height: 8 }} />
      </div>
      <HelpNav active={0} />
    </div>
  );
};

/* ── HELP ORDERS LIST ── */
export const HelpOrdersScreen = () => {
  const { navigate } = useNav();
  const { orders, clients } = useApp();
  const [q, setQ] = useState('');

  const filtered = orders.filter(o => {
    if (!q) return true;
    const cl = clients.find(c => c.id === o.clientId);
    return o.id.toLowerCase().includes(q.toLowerCase()) || cl?.name.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <div style={{ background: WH, padding: '12px 14px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 16, color: DN, marginBottom: 8 }}>Orders</div>
        <SearchBar value={q} onChange={setQ} placeholder="Search by order ID or client…" />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 8 }}>
        {filtered.map(o => (
          <OrderCard key={o.id} order={o} client={clients.find(c => c.id === o.clientId)} onClick={() => navigate('helpOrderDetail', { orderId: o.id })} />
        ))}
        <div style={{ height: 16 }} />
      </div>
      <HelpNav active={1} />
    </div>
  );
};

/* ── HELP ORDER DETAIL ── */
const GARMENT_FIELDS = {
  Blouse:  ['Bust', 'Waist', 'Hip', 'Shoulder Width', 'Sleeve Length', 'Back Length', 'Front Length', 'Armhole'],
  Lehenga: ['Waist', 'Hip', 'Length', 'Flare', 'Waist Band'],
  Kurti:   ['Chest', 'Waist', 'Length', 'Sleeve Length', 'Armhole'],
};

export const HelpOrderDetailScreen = ({ orderId }) => {
  const { goBack, navigate } = useNav();
  const { orders, clients, messages, dispatch } = useApp();
  const order = orders.find(o => o.id === orderId) || orders[0];
  const client = clients.find(c => c.id === order?.clientId);
  const msgs = messages[order?.id] || [];
  const [tab, setTab] = useState(0);
  const [meas, setMeas] = useState({ ...client?.measurements });
  const [msg, setMsg] = useState('');

  const fields = GARMENT_FIELDS[order?.garment] || GARMENT_FIELDS.Blouse;

  const sendMsg = () => {
    if (!msg.trim()) return;
    dispatch({ type: 'SEND_MSG', orderId: order.id, text: msg.trim() });
    setMsg('');
  };

  const saveMeas = () => {
    dispatch({ type: 'UPDATE_MEASUREMENTS', clientId: client.id, measurements: meas });
  };

  const TABS = ['Details', 'Measurements', 'Chat'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title={order?.id} onBack={goBack} />

      <div style={{ background: WH, borderBottom: `1px solid ${BORDER}`, padding: '0 14px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {TABS.map((t, i) => (
            <div key={t} onClick={() => setTab(i)} style={{ flex: 1, textAlign: 'center', padding: '10px 0', fontSize: 13, fontWeight: i === tab ? 600 : 400, color: i === tab ? CR : SL, borderBottom: `2px solid ${i === tab ? CR : 'transparent'}`, cursor: 'pointer' }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 0 && (
          <div>
            <Csm mb={0}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: DN }}>{client?.name}</div>
                  <div style={{ fontSize: 12, color: SL, marginTop: 2 }}>{order?.garment} · {order?.deliveryDate}</div>
                </div>
                <StatusPill status={order?.status} />
              </div>
              {order?.tags?.length > 0 && (
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 6 }}>
                  {order.tags.map(t => <span key={t} style={{ fontSize: 11, background: BG, color: SL, padding: '3px 8px', borderRadius: 10 }}>{t}</span>)}
                </div>
              )}
            </Csm>
            <InfoBanner text="Billing details and invoices are managed by the admin only." color="amber" />
            <SectionLabel text="Notes" />
            <div style={{ padding: '0 14px', fontSize: 13, color: DN, lineHeight: 1.6 }}>
              {order?.notes || 'No notes added.'}
            </div>
          </div>
        )}

        {tab === 1 && (
          <div>
            <InfoBanner text="Changes here update the client's master record. Alteration-specific measurements are stored separately." color="amber" />
            <div style={{ padding: '0 14px' }}>
              {fields.map(k => (
                <MeasRow key={k} label={k} value={meas[k] || ''} onChange={v => setMeas(m => ({ ...m, [k]: v }))} />
              ))}
            </div>
            <div style={{ padding: '12px 14px' }}>
              <Btn label="Save Measurements" onClick={saveMeas} />
            </div>
          </div>
        )}

        {tab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {msgs.length === 0 && <div style={{ textAlign: 'center', color: SL, fontSize: 13, marginTop: 32 }}>No messages yet.</div>}
              {msgs.map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.from === 'tailor' ? 'flex-start' : 'flex-end' }}>
                  {m.name && <div style={{ fontSize: 10, color: SL, marginBottom: 3 }}>{m.name}</div>}
                  <div style={{ background: m.from === 'tailor' ? BG : CR, color: m.from === 'tailor' ? DN : '#fff', borderRadius: 12, padding: '8px 12px', fontSize: 13, maxWidth: '80%' }}>
                    {m.text}
                  </div>
                  <div style={{ fontSize: 10, color: SL, marginTop: 2 }}>{m.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {tab === 2 && (
        <div style={{ padding: '10px 14px', borderTop: `1px solid ${BORDER}`, display: 'flex', gap: 8, background: WH, flexShrink: 0 }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Type a message…" style={{ flex: 1, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '9px 14px', fontSize: 13, outline: 'none' }} />
          <div onClick={sendMsg} style={{ width: 36, height: 36, borderRadius: '50%', background: CR, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontSize: 14 }}>➤</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── HELP SETTINGS ── */
export const HelpSettingsScreen = () => {
  const { navigate } = useNav();
  const { profile } = useApp();
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <div style={{ background: WH, padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: DN }}>Settings</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <div style={{ background: WH, margin: '0 14px 14px', borderRadius: 14, padding: 16, border: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: CR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>
              {profile.initials}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: DN }}>{profile.name}</div>
              <div style={{ fontSize: 12, color: SL, marginTop: 2 }}>Helper · {profile.phone || 'No phone set'}</div>
            </div>
          </div>
        </div>

        <SectionLabel text="Security" />
        <div style={{ background: WH, margin: '0 14px', borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
          <div style={{ padding: '0 14px 10px' }}>
            <Input label="Current PIN" value={pin} onChange={setPin} placeholder="Enter current PIN" />
          </div>
          <div style={{ padding: '0 14px 10px' }}>
            <Input label="New PIN (4 digits)" value={newPin} onChange={setNewPin} placeholder="Enter new PIN" />
          </div>
          <div style={{ padding: '0 14px 14px' }}>
            <Btn label="Update PIN" onClick={() => { setPin(''); setNewPin(''); }} />
          </div>
        </div>

        <InfoBanner text="Contact your admin to update your name, role, or phone number." color="blue" />

        <div style={{ padding: '14px 14px 0' }}>
          <div onClick={() => {}} style={{ background: WH, borderRadius: 12, padding: '14px 16px', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16 }}>🚪</span>
              <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 500 }}>Sign Out</span>
            </div>
            <span style={{ color: SL, fontSize: 12 }}>›</span>
          </div>
        </div>
      </div>
      <HelpNav active={2} />
    </div>
  );
};
