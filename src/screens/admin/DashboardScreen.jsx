import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { OrderCard } from '../../components/Cards.jsx';
import { MetricCard, SectionLabel } from '../../components/Layout.jsx';
import { BarChart } from '../../components/Cards.jsx';
import { AdminNav } from './AdminNav.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0';

export const DashboardScreen = () => {
  const { navigate } = useNav();
  const { orders, clients, profile } = useApp();
  const active = orders.filter(o => !['Delivered'].includes(o.status));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <div style={{ background: WH, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 11, color: SL }}>Good morning,</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: DN }}>Priya's Couture Studio</div>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, position: 'relative', cursor: 'pointer' }}>
            🔔
            <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, background: CR, borderRadius: '50%', border: '2px solid #fff' }} />
          </div>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: CR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            {profile.initials}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 9, padding: 14, background: WH, borderBottom: `1px solid ${BORDER}` }}>
          <MetricCard label="This Month" value="₹1.4L" sub="↑ 18% vs last month" />
          <MetricCard label="Pending" value="₹34K" sub="6 invoices" warn />
        </div>
        <div style={{ background: WH, padding: '0 18px 14px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: SL, fontWeight: 600 }}>Revenue — Last 6 Weeks</div>
            <div onClick={() => navigate('analytics')} style={{ fontSize: 11, color: CR, fontWeight: 500, cursor: 'pointer' }}>Analytics →</div>
          </div>
          <BarChart data={[{ v: 82, l: 'W1' }, { v: 110, l: 'W2' }, { v: 45, l: 'W3' }, { v: 130, l: 'W4' }, { v: 118, l: 'W5' }, { v: 140, l: 'W6' }]} />
        </div>
        <div style={{ padding: 14, background: BG }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: SL, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Quick Actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
            {[['➕', 'New Order', 'orderS1'], ['👤', 'New Client', 'addClient'], ['📏', 'Measurements', 'clientList'], ['🧾', 'Invoice', 'billingHistory']].map(([ic, lb, sc]) => (
              <div key={lb} onClick={() => navigate(sc)} style={{ background: WH, borderRadius: 11, padding: '12px 10px', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>{ic}</span>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{lb}</span>
              </div>
            ))}
          </div>
        </div>
        <SectionLabel text={`Active Orders (${active.length})`} />
        {active.slice(0, 3).map(o => (
          <OrderCard key={o.id} order={o} client={clients.find(c => c.id === o.clientId)} onClick={() => navigate('orderDetail', { orderId: o.id })} />
        ))}
        <div style={{ height: 8 }} />
      </div>
      <AdminNav active={0} />
    </div>
  );
};
