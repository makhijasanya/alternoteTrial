import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { Tag } from '../../components/Tag.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { TabBar } from '../../components/TabBar.jsx';
import { Card, Csm, SectionLabel } from '../../components/Layout.jsx';
import { OrderCard } from '../../components/Cards.jsx';
import { FilterChips } from '../../components/SearchBar.jsx';
import { Btn } from '../../components/Button.jsx';
import { AdminNav } from './AdminNav.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', WARNING = '#f59e0b';

export const ClientProfileScreen = ({ clientId }) => {
  const { navigate, goBack } = useNav();
  const { clients, orders } = useApp();
  const [tab, setTab] = useState(0);
  const client = clients.find(c => c.id === clientId) || clients[0];
  const clientOrders = orders.filter(o => o.clientId === client.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <div style={{ background: DN, flexShrink: 0 }}>
        <StatusBar dark />
        <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={goBack} style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(255,255,255,.12)', border: 'none', cursor: 'pointer', fontSize: 16, color: '#fff' }}>←</button>
          <h1 style={{ fontSize: 17, fontWeight: 600, color: '#fff', flex: 1 }}>Client Profile</h1>
          <span style={{ color: '#94a3b8', fontSize: 18, cursor: 'pointer' }}>⋮</span>
        </div>
        <div style={{ padding: '0 18px 22px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar initials={client.initials} color={client.color} textColor={client.textColor || '#fff'} size={54} radius={16} />
          <div>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: '#fff' }}>{client.name}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{client.phone}</div>
            <div style={{ display: 'flex', gap: 5, marginTop: 7 }}>{client.tags?.map(t => <Tag key={t} label={t} />)}</div>
          </div>
        </div>
      </div>

      <div style={{ background: WH, display: 'flex', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        {['📞 Call', '💬 WhatsApp', '➕ New Order'].map((a, i) => (
          <div key={a} onClick={() => { if (i === 2) navigate('orderS1', { preselectedClientId: client.id }); }}
            style={{ flex: 1, textAlign: 'center', padding: 11, fontSize: 12, color: CR, borderRight: i < 2 ? `1px solid ${BORDER}` : 'none', cursor: 'pointer' }}>
            {a}
          </div>
        ))}
      </div>

      <TabBar
        tabs={['Overview', 'Measurements', 'Orders']}
        active={tab}
        onChange={(i) => {
          if (i === 1) navigate('measList', { clientId: client.id });
          else setTab(i);
        }}
      />

      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 10 }}>
        {tab === 0 && <>
          <Card mb={8}>
            <div style={{ fontSize: 11, color: SL, fontWeight: 600, marginBottom: 9 }}>CLIENT SUMMARY</div>
            <div style={{ display: 'flex', gap: 9 }}>
              {[
                { v: clientOrders.length, l: 'Orders' },
                { v: `₹${(client.lifetime / 1000).toFixed(0)}K`, l: 'Lifetime' },
                { v: client.pending ? `₹${(client.pending / 1000).toFixed(0)}K` : '₹0', l: 'Pending', warn: !!client.pending },
              ].map(m => (
                <div key={m.l} style={{ flex: 1, background: BG, borderRadius: 9, padding: 11, textAlign: 'center' }}>
                  <div style={{ fontSize: 19, fontWeight: 700, color: m.warn ? WARNING : DN }}>{m.v}</div>
                  <div style={{ fontSize: 10, color: SL }}>{m.l}</div>
                </div>
              ))}
            </div>
          </Card>
          {client.notes && (
            <Csm mb={8}>
              <div style={{ fontSize: 11, color: SL, fontWeight: 600, marginBottom: 7 }}>NOTES</div>
              <div style={{ fontSize: 13, color: DN, lineHeight: 1.6 }}>{client.notes}</div>
            </Csm>
          )}
          <Csm mb={8}>
            <div style={{ fontSize: 11, color: SL, fontWeight: 600, marginBottom: 7 }}>DETAILS</div>
            {[['Birthday', client.birthday || '—'], ['Email', client.email || '—'], ['Client Since', client.since || '—']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${BORDER}`, fontSize: 13 }}>
                <span style={{ color: SL }}>{k}</span><span>{v}</span>
              </div>
            ))}
          </Csm>
        </>}

        {tab === 1 && (
          <div style={{ padding: '24px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: SL }}>Tap the Measurements tab to view templates</div>
          </div>
        )}

        {tab === 2 && <>
          <FilterChips chips={['All', 'Active', 'Completed', 'Alterations']} active={0} onSelect={() => {}} />
          {clientOrders.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>No orders yet</div>}
          {clientOrders.map(o => <OrderCard key={o.id} order={o} client={client} onClick={() => navigate('orderDetail', { orderId: o.id })} />)}
          <div style={{ padding: '8px 14px 16px' }}>
            <Btn label="+ New Order for Client" onClick={() => navigate('orderS1', { preselectedClientId: client.id })} />
          </div>
        </>}
        <div style={{ height: 8 }} />
      </div>
      <AdminNav active={1} />
    </div>
  );
};
