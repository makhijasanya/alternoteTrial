/* AlterNote — Billing & Invoice Screens */
import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { FilterChips } from '../../components/SearchBar.jsx';
import { Csm } from '../../components/Layout.jsx';
import { Btn, Btn2 } from '../../components/Button.jsx';
import { AdminNav } from './AdminNav.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', SUCCESS = '#10b981', WARNING = '#f59e0b';

/* ── BILLING HISTORY ── */
export const BillingHistoryScreen = () => {
  const { navigate } = useNav();
  const { orders, clients } = useApp();
  const [chip, setChip] = useState(0);

  const filtered = orders.filter(o => {
    if (chip === 1) return o.paid;
    if (chip === 2) return !o.paid && o.status !== 'Received';
    return true;
  });

  const total = filtered.reduce((s, o) => s + o.amount, 0);
  const paid = filtered.filter(o => o.paid).reduce((s, o) => s + o.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <TopHeader title="Billing History" />
      <div style={{ background: WH, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <FilterChips chips={['All', 'Paid', 'Pending']} active={chip} onSelect={setChip} />
        <div style={{ display: 'flex', gap: 9, padding: '0 14px 14px' }}>
          <div style={{ flex: 1, background: BG, borderRadius: 10, padding: 11, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'DM Serif Display',serif" }}>₹{(total / 1000).toFixed(0)}K</div>
            <div style={{ fontSize: 10, color: SL }}>Total</div>
          </div>
          <div style={{ flex: 1, background: '#ecfdf5', borderRadius: 10, padding: 11, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#059669', fontFamily: "'DM Serif Display',serif" }}>₹{(paid / 1000).toFixed(0)}K</div>
            <div style={{ fontSize: 10, color: SL }}>Paid</div>
          </div>
          <div style={{ flex: 1, background: '#fffbeb', borderRadius: 10, padding: 11, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#d97706', fontFamily: "'DM Serif Display',serif" }}>₹{((total - paid) / 1000).toFixed(0)}K</div>
            <div style={{ fontSize: 10, color: SL }}>Pending</div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.map(o => {
          const cl = clients.find(c => c.id === o.clientId);
          return (
            <div key={o.id} onClick={() => navigate('billing', { orderId: o.id })}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: WH, borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: o.paid ? '#ecfdf5' : '#fef2f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{o.paid ? '✓' : '🧾'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{cl?.name}</div>
                <div style={{ fontSize: 11, color: SL, marginTop: 1 }}>{o.garment} · {o.id}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: DN }}>₹{o.amount.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: o.paid ? SUCCESS : WARNING, marginTop: 2, fontWeight: 500 }}>{o.paid ? 'Paid' : 'Pending'}</div>
              </div>
            </div>
          );
        })}
        <div style={{ height: 8 }} />
      </div>
      <AdminNav active={3} />
    </div>
  );
};

/* ── INVOICE DETAIL ── */
export const BillingScreen = ({ orderId }) => {
  const { navigate, goBack } = useNav();
  const { orders, clients, dispatch } = useApp();
  const order = orders.find(o => o.id === orderId) || orders[0];
  const client = clients.find(c => c.id === order?.clientId);

  const markPaid = () => {
    dispatch({ type: 'MARK_PAID', id: order.id });
  };

  const lineItems = [
    { desc: order?.garment || 'Garment', amount: order?.amount || 0 },
  ];
  const subtotal = lineItems.reduce((s, l) => s + l.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <TopHeader title="Invoice" onBack={goBack} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        {/* Invoice Header */}
        <div style={{ margin: '0 14px 10px', background: DN, borderRadius: 12, padding: 18, color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 800, fontSize: 18 }}>Alternote</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Priya's Couture Studio</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>Invoice</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>INV-2025-{order?.id?.split('-').pop()}</div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', marginTop: 14, paddingTop: 14 }}>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>Bill To</div>
            <div style={{ fontWeight: 600, fontSize: 15, marginTop: 2 }}>{client?.name}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{client?.phone}</div>
          </div>
        </div>

        {/* Line Items */}
        <Csm mb={10}>
          <div style={{ fontSize: 11, color: SL, fontWeight: 600, marginBottom: 10 }}>ORDER DETAILS</div>
          {lineItems.map((li, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${BORDER}`, fontSize: 13 }}>
              <span>{li.desc}</span>
              <span style={{ fontWeight: 500 }}>₹{li.amount.toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', fontSize: 16, fontWeight: 700 }}>
            <span>Total</span>
            <span style={{ fontFamily: "'DM Serif Display',serif" }}>₹{subtotal.toLocaleString()}</span>
          </div>
        </Csm>

        {/* Payment Status */}
        <Csm mb={10}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: SL }}>Payment Status</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: order?.paid ? SUCCESS : WARNING, marginTop: 2 }}>
                {order?.paid ? '✓ Paid' : 'Pending'}
              </div>
            </div>
            {!order?.paid && (
              <button onClick={markPaid} style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                Mark as Paid
              </button>
            )}
          </div>
        </Csm>

        {/* Actions */}
        <div style={{ padding: '0 14px 8px', display: 'flex', gap: 8 }}>
          <Btn label="📤 Share via WhatsApp" />
        </div>
        <div style={{ padding: '0 14px 8px', display: 'flex', gap: 8 }}>
          <Btn2 label="📄 Download PDF" />
          <Btn2 label="💳 Payment Link" onClick={() => navigate('paymentLink', { orderId: order?.id })} />
        </div>
      </div>
    </div>
  );
};
