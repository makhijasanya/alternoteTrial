import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { AdminNav } from './AdminNav.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0';

export const ConversationsScreen = () => {
  const { navigate } = useNav();
  const { orders, clients, messages } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <TopHeader title="Conversations" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {orders.map(o => {
          const cl = clients.find(c => c.id === o.clientId);
          const msgs = messages[o.id] || [];
          const last = msgs[msgs.length - 1];
          return (
            <div key={o.id} onClick={() => navigate('tailorChat', { orderId: o.id })}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', background: WH, borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: cl?.color || BG, color: cl?.textColor || SL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, flexShrink: 0 }}>
                {cl?.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{o.id}</div>
                  <div style={{ fontSize: 11, color: SL }}>{last?.time || ''}</div>
                </div>
                <div style={{ fontSize: 12, color: SL, marginTop: 2 }}>{cl?.name} · {o.garment}</div>
                <div style={{ fontSize: 13, color: last ? DN : SL, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {last?.text || 'No messages yet'}
                </div>
              </div>
              {msgs.length > 0 && (
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: CR, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', flexShrink: 0 }}>
                  {msgs.length}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <AdminNav active={0} />
    </div>
  );
};
