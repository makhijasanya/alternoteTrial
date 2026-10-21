import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { MetricCard, SectionLabel } from '../../components/Layout.jsx';
import { BarChart } from '../../components/Cards.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { AdminNav } from './AdminNav.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', SUCCESS = '#10b981', WARNING = '#f59e0b';

export const AnalyticsScreen = () => {
  const { orders, clients } = useApp();
  const active = orders.filter(o => !['Delivered'].includes(o.status)).length;
  const overdue = orders.filter(o => o.status === 'In Progress' && o.tags?.includes('Rush')).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <TopHeader title="Analytics" right={() => {}} rightLabel="Apr 2025" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 9, padding: 14, background: WH, borderBottom: `1px solid ${BORDER}` }}>
          <MetricCard label="This Month" value="₹1.4L" sub="↑ 18% vs last month" />
          <MetricCard label="Pending" value="₹34K" sub="6 invoices" warn />
        </div>

        <div style={{ background: WH, padding: '14px 18px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 11, color: SL, fontWeight: 600, marginBottom: 10 }}>Revenue — Last 6 Months</div>
          <BarChart data={[{ v: 82, l: 'Nov' }, { v: 110, l: 'Dec' }, { v: 94, l: 'Jan' }, { v: 120, l: 'Feb' }, { v: 118, l: 'Mar' }, { v: 140, l: 'Apr' }]} />
        </div>

        <SectionLabel text="Order Pipeline" />
        <div style={{ display: 'flex', gap: 8, padding: '0 14px 14px' }}>
          {[{ v: active, l: 'Active' }, { v: overdue, l: 'Overdue', warn: true }, { v: 32, l: 'Done This Month', ok: true }].map(p => (
            <div key={p.l} style={{ flex: 1, background: WH, borderRadius: 10, padding: 11, textAlign: 'center', border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: p.warn ? WARNING : p.ok ? SUCCESS : DN }}>{p.v}</div>
              <div style={{ fontSize: 10, color: SL, marginTop: 1 }}>{p.l}</div>
            </div>
          ))}
        </div>

        <SectionLabel text="Top Clients" />
        {clients.slice(0, 4).map((c, i) => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: WH, borderBottom: `1px solid ${BORDER}` }}>
            <Avatar initials={c.initials} color={c.color} textColor={c.textColor || '#fff'} size={36} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 13 }}>{c.name}</div>
              <div style={{ height: 4, borderRadius: 2, background: CR, marginTop: 5, width: `${90 - i * 18}%`, opacity: 0.8 }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>₹{(c.lifetime / 1000).toFixed(0)}K</div>
          </div>
        ))}

        <SectionLabel text="Garment Breakdown" />
        <div style={{ background: WH, padding: '12px 14px', borderBottom: `1px solid ${BORDER}` }}>
          {[['Blouse', 42], ['Lehenga', 28], ['Kurti', 18], ['Sharara', 12]].map(([name, pct]) => (
            <div key={name} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span>{name}</span><span style={{ color: SL }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: BG, borderRadius: 4 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: CR, borderRadius: 4, opacity: 0.8 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 8 }} />
      </div>
      <AdminNav active={0} />
    </div>
  );
};
