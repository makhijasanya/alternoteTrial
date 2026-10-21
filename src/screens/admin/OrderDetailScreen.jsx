import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TabBar } from '../../components/TabBar.jsx';
import { Tag, StatusPill } from '../../components/Tag.jsx';
import { Csm, SectionLabel, InfoBanner } from '../../components/Layout.jsx';
import { MeasRow } from '../../components/Cards.jsx';
import { Btn, Btn2 } from '../../components/Button.jsx';
import { AdminNav } from './AdminNav.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', WARNING = '#f59e0b';
const STATUS_LIST = ['Received', 'In Progress', 'For Fitting', 'Completed', 'Delivered'];

export const OrderDetailScreen = ({ orderId }) => {
  const { navigate, goBack } = useNav();
  const { orders, clients, dispatch } = useApp();
  const [tab, setTab] = useState(0);
  const order = orders.find(o => o.id === orderId) || orders[0];
  const client = clients.find(c => c.id === order?.clientId);

  const updateStatus = (s) => dispatch({ type: 'UPDATE_STATUS', id: order.id, status: s });
  const markPaid = () => dispatch({ type: 'MARK_PAID', id: order.id });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <div style={{ background: WH, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <button onClick={goBack} style={{ width: 30, height: 30, borderRadius: 7, background: BG, border: 'none', cursor: 'pointer', fontSize: 16, color: DN }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{order?.id}</div>
          <div style={{ fontSize: 11, color: SL, marginTop: 1 }}>{client?.name} · {order?.garment}</div>
        </div>
        <StatusPill status={order?.status} />
      </div>

      <TabBar tabs={['Details', 'Measurements', 'Chat', 'Invoice']} active={tab} onChange={setTab} />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 0 && (
          <div style={{ paddingTop: 10 }}>
            <Csm mb={8}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{order?.garment}</div>
              <div style={{ fontSize: 11, color: SL, marginBottom: 10 }}>Due: <span style={{ color: order?.tags?.includes('Rush') ? WARNING : SL, fontWeight: order?.tags?.includes('Rush') ? 600 : 400 }}>{order?.due}</span></div>
              {order?.description && <div style={{ fontSize: 13, color: DN, lineHeight: 1.6, marginBottom: 10 }}>{order.description}</div>}
              <div style={{ display: 'flex', gap: 5 }}>{order?.tags?.map(t => <Tag key={t} label={t} />)}</div>
            </Csm>

            <Csm mb={8}>
              <div style={{ fontSize: 11, color: SL, fontWeight: 600, marginBottom: 10 }}>TAILOR ASSIGNED</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>RK</div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{order?.tailor}</div>
                  <div style={{ fontSize: 11, color: SL }}>Assigned · In Progress</div>
                </div>
              </div>
            </Csm>

            <SectionLabel text="Update Status" />
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', padding: '0 14px 10px' }}>
              {STATUS_LIST.map(s => (
                <div key={s} onClick={() => updateStatus(s)} style={{
                  padding: '7px 12px', borderRadius: 7, cursor: 'pointer',
                  border: `1.5px solid ${s === order?.status ? CR : BORDER}`,
                  background: s === order?.status ? CR : WH,
                  fontSize: 12, fontWeight: 500,
                  color: s === order?.status ? '#fff' : SL, transition: 'all .2s',
                }}>{s}</div>
              ))}
            </div>

            <Csm mb={8}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: SL, fontWeight: 600 }}>AMOUNT</div>
                  <div style={{ fontSize: 22, fontWeight: 600, fontFamily: "'DM Serif Display',serif", marginTop: 2 }}>₹{order?.amount?.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: order?.paid ? '#10b981' : WARNING, fontWeight: 500 }}>{order?.paid ? 'Paid ✓' : 'Payment Pending'}</div>
                  {!order?.paid && <button onClick={markPaid} style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', marginTop: 6 }}>Mark Paid</button>}
                </div>
              </div>
            </Csm>

            <div style={{ padding: '0 14px 16px', display: 'flex', gap: 8 }}>
              <Btn label="View Invoice" onClick={() => navigate('billing', { orderId: order?.id })} />
              <Btn2 label="Edit" onClick={() => {}} />
            </div>
          </div>
        )}

        {tab === 1 && (
          <div style={{ padding: '10px 0' }}>
            <div style={{ padding: '0 14px', background: WH }}>
              {Object.entries(client?.measurements || {}).map(([k, v]) => (
                <MeasRow key={k} label={k} value={v} readOnly />
              ))}
            </div>
            <div style={{ padding: '12px 14px' }}>
              <Btn label="Edit Measurements" onClick={() => navigate('measurements', { clientId: client?.id })} />
            </div>
          </div>
        )}

        {tab === 2 && (
          <div style={{ padding: 14 }}>
            <div style={{ textAlign: 'center', color: SL, fontSize: 13, padding: 30 }}>
              Chat for this order.<br />
              <button onClick={() => navigate('tailorChat', { orderId: order?.id })} style={{ background: CR, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 13, cursor: 'pointer', marginTop: 12 }}>Open Chat</button>
            </div>
          </div>
        )}

        {tab === 3 && (
          <div style={{ padding: '10px 0' }}>
            <Csm mb={8}>
              <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Invoice Preview</div>
              <div style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 10, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: SL }}>Invoice #</span>
                  <span>INV-2025-{order?.id?.split('-').pop()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 5 }}>
                  <span style={{ color: SL }}>Client</span><span>{client?.name}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 600 }}>
                <span>Total</span><span>₹{order?.amount?.toLocaleString()}</span>
              </div>
            </Csm>
            <div style={{ padding: '0 14px' }}>
              <Btn label="Generate Full Invoice" onClick={() => navigate('billing', { orderId: order?.id })} />
            </div>
          </div>
        )}
        <div style={{ height: 8 }} />
      </div>
      <AdminNav active={2} />
    </div>
  );
};
