/* AlterNote — Tailor Screens */
import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { TabBar, BottomNav } from '../../components/TabBar.jsx';
import { Tag, StatusPill } from '../../components/Tag.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { SectionLabel, Csm, InfoBanner } from '../../components/Layout.jsx';
import { Input } from '../../components/Input.jsx';
import { Btn } from '../../components/Button.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', WARNING = '#f59e0b';

const TAILOR_TABS = [
  { icon: '📦', label: 'My Orders', screen: 'tailorOrders' },
  { icon: '💬', label: 'Chats',     screen: 'tailorChats' },
  { icon: '⚙️', label: 'Settings', screen: 'tailorSettings' },
];

const TailorNav = ({ active }) => {
  const { navigate } = useNav();
  return <BottomNav tabs={TAILOR_TABS} active={active} onSelect={i => navigate(TAILOR_TABS[i].screen)} />;
};

/* ── TAILOR: MY ORDERS ── */
export const TailorOrdersScreen = () => {
  const { navigate } = useNav();
  const { orders, clients, profile } = useApp();
  const myOrders = orders.filter(o => (o.tailorId === profile.id || o.tailorId === 1) && o.status !== 'Delivered');
  const done = orders.filter(o => (o.tailorId === profile.id || o.tailorId === 1) && o.status === 'Delivered');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar dark />
      <div style={{ background: DN, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Logged in as</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: '#fff' }}>{profile.name}</div>
        </div>
        <Avatar initials={profile.initials} color={profile.color} textColor={profile.textColor} size={36} radius={9} />
      </div>
      <InfoBanner text="Showing only your assigned orders" color="green" />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {myOrders.some(o => o.tags?.includes('Rush')) && (
          <div style={{ margin: '10px 14px', background: '#fffbeb', borderRadius: 12, padding: 12, border: '1px solid #fde68a', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>🔔</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Rush Order Assigned</div>
              <div style={{ fontSize: 12, color: SL, marginTop: 1 }}>Check the order details and start as soon as possible.</div>
            </div>
          </div>
        )}

        <SectionLabel text={`My Active Orders (${myOrders.length})`} />
        {myOrders.map(o => {
          const cl = clients.find(c => c.id === o.clientId);
          return (
            <div key={o.id} style={{ background: WH, borderRadius: 14, padding: 14, margin: '0 14px 9px', border: `1px solid ${BORDER}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{cl?.name?.split(' ')[0]} · {o.garment}</div>
                    {o.type === 'alteration' && <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: 10, padding: '1px 6px', borderRadius: 20, fontWeight: 500 }}>Alt</span>}
                  </div>
                  <div style={{ fontSize: 11, color: o.tags?.includes('Rush') ? WARNING : SL, fontWeight: o.tags?.includes('Rush') ? 500 : 400 }}>
                    {o.tags?.includes('Rush') ? '⏰ ' : ''}Due {o.due}
                  </div>
                </div>
                <StatusPill status={o.status} />
              </div>
              {o.tags?.length > 0 && <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>{o.tags.map(t => <Tag key={t} label={t} />)}</div>}
              <div style={{ display: 'flex', gap: 7 }}>
                <button onClick={() => navigate('tailorOrderDetail', { orderId: o.id })} style={{ flex: 1, background: CR, color: '#fff', border: 'none', borderRadius: 9, padding: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>View Details</button>
                <button onClick={() => navigate('tailorChat', { orderId: o.id })} style={{ flex: 1, background: BG, border: `1px solid ${BORDER}`, borderRadius: 9, padding: 9, fontSize: 13, cursor: 'pointer' }}>Chat</button>
              </div>
            </div>
          );
        })}

        {done.length > 0 && <>
          <SectionLabel text="Completed" />
          {done.map(o => {
            const cl = clients.find(c => c.id === o.clientId);
            return (
              <div key={o.id} style={{ background: WH, borderRadius: 14, padding: '12px 14px', margin: '0 14px 9px', border: `1px solid ${BORDER}`, opacity: 0.7, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{cl?.name?.split(' ')[0]} · {o.garment}</div>
                  <div style={{ fontSize: 11, color: SL, marginTop: 1 }}>Delivered {o.due}</div>
                </div>
                <StatusPill status={o.status} />
              </div>
            );
          })}
        </>}
        <div style={{ height: 8 }} />
      </div>
      <TailorNav active={0} />
    </div>
  );
};

/* ── TAILOR: ORDER DETAIL ── */
export const TailorOrderDetailScreen = ({ orderId }) => {
  const { navigate, goBack } = useNav();
  const { orders, clients, messages, dispatch } = useApp();
  const [tab, setTab] = useState(0);
  const order = orders.find(o => o.id === orderId) || orders[0];
  const client = clients.find(c => c.id === order?.clientId);
  const tailorStatuses = ['Received', 'In Progress', 'For Fitting', 'Completed'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar dark />
      <div style={{ background: DN, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button onClick={goBack} style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(255,255,255,.12)', border: 'none', cursor: 'pointer', fontSize: 16, color: '#fff' }}>←</button>
        <h1 style={{ fontSize: 15, fontWeight: 600, color: '#fff', flex: 1 }}>{order?.id}</h1>
      </div>
      <div style={{ background: '#fffbeb', padding: '9px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: '1px solid #fde68a' }}>
        <StatusPill status={order?.status} />
        <span style={{ fontSize: 11, color: WARNING, fontWeight: 500 }}>Due: {order?.due}</span>
      </div>
      <TabBar tabs={['Details', 'Chat']} active={tab} onChange={setTab} />

      {tab === 0 && (
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: 10 }}>
          <Csm mb={8}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{order?.garment}</div>
            <div style={{ fontSize: 12, color: SL, marginBottom: 8 }}>Client: {client?.name?.split(' ')[0]} (first name only)</div>
            {order?.description && <div style={{ fontSize: 13, color: DN, lineHeight: 1.6, marginBottom: 8 }}>{order.description}</div>}
            <div style={{ display: 'flex', gap: 5 }}>{order?.tags?.map(t => <Tag key={t} label={t} />)}</div>
          </Csm>

          <Csm mb={8}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: SL, fontWeight: 600 }}>MEASUREMENTS</div>
              <span style={{ fontSize: 10, color: SL, background: BG, padding: '2px 8px', borderRadius: 6 }}>🔒 View only</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
              {Object.entries(client?.measurements || {}).slice(0, 4).map(([k, v]) => (
                <div key={k} style={{ background: BG, borderRadius: 7, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>{v}"</div>
                  <div style={{ fontSize: 10, color: SL, marginTop: 2 }}>{k}</div>
                </div>
              ))}
            </div>
          </Csm>

          <SectionLabel text="Update Status" />
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', padding: '0 14px 10px' }}>
            {tailorStatuses.map(s => (
              <div key={s} onClick={() => dispatch({ type: 'UPDATE_STATUS', id: order?.id, status: s })}
                style={{ padding: '7px 12px', borderRadius: 7, border: `1.5px solid ${s === order?.status ? CR : BORDER}`, background: s === order?.status ? CR : WH, fontSize: 12, fontWeight: 500, color: s === order?.status ? '#fff' : SL, cursor: 'pointer', transition: 'all .2s' }}>{s}</div>
            ))}
          </div>
          <InfoBanner text="Client contact details, billing, and full profile are not visible to Tailor." color="red" />
          <div style={{ height: 8 }} />
        </div>
      )}

      {tab === 1 && <ChatTab orderId={order?.id} />}
      <TailorNav active={0} />
    </div>
  );
};

/* ── SHARED CHAT TAB ── */
export const ChatTab = ({ orderId }) => {
  const { messages, dispatch, role } = useApp();
  const [msg, setMsg] = useState('');
  const msgs = messages[orderId] || [];
  const send = () => { if (!msg.trim()) return; dispatch({ type: 'SEND_MSG', orderId, text: msg.trim() }); setMsg(''); };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px', background: '#fdfbf7', display: 'flex', flexDirection: 'column' }}>
        {msgs.length === 0 && <div style={{ textAlign: 'center', color: SL, fontSize: 13, padding: 30 }}>No messages yet.</div>}
        {msgs.map((m, i) => {
          const isMe = (role === 'tailor' && m.from === 'tailor') || (role !== 'tailor' && m.from !== 'tailor');
          return (
            <div key={i} style={{ marginBottom: 7 }}>
              {!isMe && m.name && <div style={{ fontSize: 10, color: SL, marginBottom: 3, paddingLeft: 2 }}>{m.name}</div>}
              <div style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '76%', padding: '9px 13px', borderRadius: isMe ? '14px 14px 3px 14px' : '14px 14px 14px 3px', background: isMe ? CR : WH, color: isMe ? '#fff' : DN, fontSize: 13, lineHeight: 1.5, border: isMe ? 'none' : `1px solid ${BORDER}` }}>
                  {m.text}
                </div>
              </div>
              <div style={{ fontSize: 10, color: SL, textAlign: isMe ? 'right' : 'left', marginTop: 3 }}>{m.time}</div>
            </div>
          );
        })}
      </div>
      <div style={{ background: WH, borderTop: `1px solid ${BORDER}`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{ flex: 1, background: BG, border: `1px solid ${BORDER}`, borderRadius: 22, display: 'flex', alignItems: 'center', padding: '9px 14px' }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type a message…" onKeyDown={e => e.key === 'Enter' && send()} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', color: DN }} />
        </div>
        <div onClick={send} style={{ width: 38, height: 38, background: CR, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#fff', cursor: 'pointer' }}>→</div>
      </div>
    </div>
  );
};

/* ── TAILOR: CHATS LIST ── */
export const TailorChatsScreen = () => {
  const { navigate } = useNav();
  const { orders, clients, messages } = useApp();
  const myOrders = orders.filter(o => o.tailorId === 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar dark />
      <div style={{ background: DN, padding: '14px 18px', borderBottom: '1px solid #1e293b', flexShrink: 0 }}>
        <h1 style={{ fontSize: 17, fontWeight: 600, color: '#fff' }}>Chats</h1>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {myOrders.map(o => {
          const cl = clients.find(c => c.id === o.clientId);
          const msgs = messages[o.id] || [];
          const last = msgs[msgs.length - 1];
          return (
            <div key={o.id} onClick={() => navigate('tailorChat', { orderId: o.id })}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: WH, borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: CR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, flexShrink: 0 }}>{cl?.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{o.id}</div>
                  <div style={{ fontSize: 11, color: SL }}>{last?.time || ''}</div>
                </div>
                <div style={{ fontSize: 13, color: SL, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{last?.text || o.garment}</div>
              </div>
            </div>
          );
        })}
      </div>
      <TailorNav active={1} />
    </div>
  );
};

/* ── TAILOR: CHAT (single order) ── */
export const TailorChatScreen = ({ orderId }) => {
  const { goBack } = useNav();
  const { orders, clients } = useApp();
  const order = orders.find(o => o.id === orderId) || orders[0];
  const cl = clients.find(c => c.id === order?.clientId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar dark />
      <div style={{ background: DN, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button onClick={goBack} style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(255,255,255,.12)', border: 'none', cursor: 'pointer', fontSize: 16, color: '#fff' }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{order?.id}</div>
          <div style={{ color: '#64748b', fontSize: 11, marginTop: 1 }}>{cl?.name?.split(' ')[0]} · {order?.garment}</div>
        </div>
        <span style={{ color: '#94a3b8', fontSize: 18, cursor: 'pointer' }}>⋮</span>
      </div>
      <ChatTab orderId={order?.id} />
      <TailorNav active={1} />
    </div>
  );
};

/* ── TAILOR: SETTINGS ── */
export const TailorSettingsScreen = () => {
  const { profile } = useApp();
  const [name, setName] = useState(profile.name);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <TopHeader title="Settings" />
      <div style={{ background: DN, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{ width: 46, height: 46, borderRadius: 13, background: profile.color, color: profile.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 17 }}>{profile.initials}</div>
        <div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>{profile.name}</div>
          <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{profile.roleLabel} · Priya's Couture Studio</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <SectionLabel text="My Profile" />
        <div style={{ padding: '0 14px 10px' }}><Input label="Display Name" value={name} onChange={setName} /></div>
        <div style={{ padding: '0 14px 14px' }}><Btn label="Save Name" color="#f1f5f9" style={{ color: '#0f172a', border: '1px solid #e2e8f0' }} /></div>
        <SectionLabel text="Security" />
        <div style={{ padding: '0 14px 10px' }}><Input label="Current PIN" value="" onChange={() => {}} type="password" placeholder="Enter current PIN" /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="New PIN" value="" onChange={() => {}} type="password" placeholder="4–6 digits" /></div>
        <div style={{ padding: '0 14px 16px' }}><Btn label="Update PIN" /></div>
        <InfoBanner text="For all other changes, contact your admin." color="green" />
      </div>
      <TailorNav active={2} />
    </div>
  );
};
