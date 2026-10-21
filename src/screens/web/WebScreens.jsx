/* AlterNote — Web Dashboard Screens */
import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusPill } from '../../components/Tag.jsx';
import { MetricCard, SectionLabel, InfoBanner } from '../../components/Layout.jsx';
import { BarChart } from '../../components/Cards.jsx';
import { SearchBar } from '../../components/SearchBar.jsx';
import { Input } from '../../components/Input.jsx';
import { Btn, Btn2 } from '../../components/Button.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', SUCCESS = '#10b981';

/* ── Shared Web Layout ── */
const WEB_TABS = [
  { icon: '📊', label: 'Analytics' },
  { icon: '👥', label: 'Clients' },
  { icon: '🧾', label: 'Billing' },
  { icon: '⚙️', label: 'Settings' },
];

const WebShell = ({ active, onNav, children }) => (
  <div style={{ display: 'flex', height: '100%', background: BG, borderRadius: 16, overflow: 'hidden' }}>
    {/* Sidebar */}
    <div style={{ width: 200, background: DN, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '22px 20px 16px' }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: CR, letterSpacing: -0.3 }}>Alternote</div>
        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>Priya's Couture Studio</div>
      </div>
      <div style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {WEB_TABS.map((t, i) => (
          <div key={t.label} onClick={() => onNav(i)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9, background: i === active ? 'rgba(217,56,94,0.18)' : 'transparent', color: i === active ? CR : '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: i === active ? 600 : 400, transition: 'all 0.15s' }}>
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <div style={{ fontSize: 11, color: '#64748b' }}>Priya Sharma</div>
        <div style={{ fontSize: 10, color: '#475569', marginTop: 1 }}>Admin · priya@upi</div>
      </div>
    </div>

    {/* Main content */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      {children}
    </div>
  </div>
);

/* ── WEB ANALYTICS ── */
export const WebAnalyticsScreen = () => {
  const { navigate } = useNav();
  const { orders, clients } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  const screens = ['webAnalytics', 'webClients', 'webBilling', 'webSettings'];
  const active = orders.filter(o => !['Delivered'].includes(o.status));
  const delivered = orders.filter(o => o.status === 'Delivered').length;
  const totalRevenue = orders.reduce((s, o) => s + (o.amount || 0), 0);

  return (
    <WebShell active={0} onNav={i => navigate(screens[i])}>
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BORDER}`, background: WH }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: DN }}>Analytics Overview</div>
        <div style={{ fontSize: 12, color: SL, marginTop: 2 }}>Last 30 days · Priya's Couture Studio</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total Revenue', value: `₹${(totalRevenue / 1000).toFixed(1)}K`, sub: '↑ 18%', color: SUCCESS },
            { label: 'Active Orders', value: String(active.length), sub: 'In progress', color: CR },
            { label: 'Total Clients', value: String(clients.length), sub: '+2 this month', color: '#3b82f6' },
            { label: 'Delivered', value: String(delivered), sub: 'This month', color: '#f59e0b' },
          ].map(m => (
            <div key={m.label} style={{ background: WH, borderRadius: 12, padding: 16, border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 11, color: SL, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>{m.label}</div>
              <div style={{ fontSize: 26, fontFamily: "'DM Serif Display',serif", color: m.color, margin: '6px 0 2px' }}>{m.value}</div>
              <div style={{ fontSize: 11, color: SL }}>{m.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
          <div style={{ background: WH, borderRadius: 14, padding: 20, border: `1px solid ${BORDER}` }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: DN, marginBottom: 14 }}>Revenue — Last 6 Months</div>
            <BarChart data={[{ v: 80, l: 'Jan' }, { v: 120, l: 'Feb' }, { v: 95, l: 'Mar' }, { v: 145, l: 'Apr' }, { v: 118, l: 'May' }, { v: 160, l: 'Jun' }]} />
          </div>

          <div style={{ background: WH, borderRadius: 14, padding: 20, border: `1px solid ${BORDER}` }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: DN, marginBottom: 14 }}>Garment Breakdown</div>
            {[['Blouse', 40, CR], ['Lehenga', 25, '#3b82f6'], ['Kurti', 20, '#10b981'], ['Sherwani', 10, '#f59e0b'], ['Other', 5, SL]].map(([g, pct, c]) => (
              <div key={g} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: DN }}>{g}</span>
                  <span style={{ color: SL, fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{ height: 6, background: BG, borderRadius: 4 }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: c, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: WH, borderRadius: 14, padding: 20, border: `1px solid ${BORDER}`, marginTop: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: DN, marginBottom: 14 }}>Top Clients by Revenue</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {clients.slice(0, 5).map((c, i) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 22, fontSize: 12, color: SL, flexShrink: 0 }}>#{i + 1}</div>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: c.color, color: c.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 12, flexShrink: 0 }}>{c.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ height: 4, background: BG, borderRadius: 3, marginTop: 4 }}>
                    <div style={{ width: `${90 - i * 15}%`, height: '100%', background: CR, borderRadius: 3 }} />
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: DN, flexShrink: 0 }}>₹{((5 - i) * 22).toLocaleString()}K</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WebShell>
  );
};

/* ── WEB CLIENTS ── */
export const WebClientsScreen = () => {
  const { navigate } = useNav();
  const { clients, orders } = useApp();
  const [q, setQ] = useState('');
  const screens = ['webAnalytics', 'webClients', 'webBilling', 'webSettings'];

  const filtered = clients.filter(c => !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q));

  return (
    <WebShell active={1} onNav={i => navigate(screens[i])}>
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BORDER}`, background: WH, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: DN }}>Clients</div>
          <div style={{ fontSize: 12, color: SL, marginTop: 2 }}>{clients.length} total clients</div>
        </div>
        <SearchBar value={q} onChange={setQ} placeholder="Search clients…" style={{ width: 240 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: BG }}>
              {['Client', 'Phone', 'Tags', 'Orders', 'Lifetime Value', 'Pending'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, color: SL, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const cOrders = orders.filter(o => o.clientId === c.id);
              return (
                <tr key={c.id} style={{ borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', background: WH }} onMouseEnter={e => e.currentTarget.style.background = BG} onMouseLeave={e => e.currentTarget.style.background = WH}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 10, background: c.color, color: c.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 12, flexShrink: 0 }}>{c.initials}</div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: DN }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: SL }}>{c.phone}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {(c.tags || []).slice(0, 2).map(t => <span key={t} style={{ fontSize: 10, background: '#fef2f4', color: CR, padding: '2px 7px', borderRadius: 8, fontWeight: 500 }}>{t}</span>)}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: DN }}>{cOrders.length}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: DN }}>₹{(c.lifetime || 0).toLocaleString()}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: c.pending > 0 ? CR : SL }}>₹{(c.pending || 0).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </WebShell>
  );
};

/* ── WEB BILLING ── */
export const WebBillingScreen = () => {
  const { navigate } = useNav();
  const { orders, clients } = useApp();
  const screens = ['webAnalytics', 'webClients', 'webBilling', 'webSettings'];
  const [filter, setFilter] = useState('all');

  const filtered = orders.filter(o => {
    if (filter === 'paid') return o.paid;
    if (filter === 'unpaid') return !o.paid;
    return true;
  });

  const totalPaid = orders.filter(o => o.paid).reduce((s, o) => s + (o.amount || 0), 0);
  const totalPending = orders.filter(o => !o.paid).reduce((s, o) => s + (o.amount || 0), 0);

  return (
    <WebShell active={2} onNav={i => navigate(screens[i])}>
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BORDER}`, background: WH }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: DN }}>Billing</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          {[['All', 'all'], ['Paid', 'paid'], ['Unpaid', 'unpaid']].map(([l, v]) => (
            <div key={v} onClick={() => setFilter(v)} style={{ padding: '5px 14px', borderRadius: 20, fontSize: 12, cursor: 'pointer', fontWeight: filter === v ? 600 : 400, background: filter === v ? CR : BG, color: filter === v ? '#fff' : SL }}>
              {l}
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 20 }}>
            <div style={{ fontSize: 12 }}><span style={{ color: SL }}>Collected: </span><span style={{ fontWeight: 700, color: SUCCESS }}>₹{totalPaid.toLocaleString()}</span></div>
            <div style={{ fontSize: 12 }}><span style={{ color: SL }}>Pending: </span><span style={{ fontWeight: 700, color: CR }}>₹{totalPending.toLocaleString()}</span></div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: BG }}>
              {['Order ID', 'Client', 'Garment', 'Amount', 'Status', 'Delivery'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, color: SL, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => {
              const cl = clients.find(c => c.id === o.clientId);
              return (
                <tr key={o.id} style={{ borderBottom: `1px solid ${BORDER}`, background: WH }} onMouseEnter={e => e.currentTarget.style.background = BG} onMouseLeave={e => e.currentTarget.style.background = WH}>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontFamily: 'monospace', color: DN, fontWeight: 500 }}>{o.id}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: DN }}>{cl?.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: SL }}>{o.garment}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700, color: DN }}>₹{(o.amount || 0).toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 11, background: o.paid ? '#ecfdf5' : '#fef2f4', color: o.paid ? SUCCESS : CR, padding: '3px 9px', borderRadius: 9, fontWeight: 600 }}>
                      {o.paid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: SL }}>{o.deliveryDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </WebShell>
  );
};

/* ── WEB SETTINGS ── */
export const WebSettingsScreen = () => {
  const { navigate } = useNav();
  const { profile } = useApp();
  const screens = ['webAnalytics', 'webClients', 'webBilling', 'webSettings'];
  const [boutiqueName, setBoutiqueName] = useState('Priya\'s Couture Studio');
  const [city, setCity] = useState('Mumbai');
  const [upi, setUpi] = useState('priya@upi');

  return (
    <WebShell active={3} onNav={i => navigate(screens[i])}>
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BORDER}`, background: WH }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: DN }}>Settings</div>
        <div style={{ fontSize: 12, color: SL, marginTop: 2 }}>Manage your boutique and account</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 700 }}>
          <div style={{ background: WH, borderRadius: 14, padding: 20, border: `1px solid ${BORDER}`, gridColumn: '1 / -1' }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: DN, marginBottom: 14 }}>Boutique Profile</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Input label="Boutique Name" value={boutiqueName} onChange={setBoutiqueName} placeholder="Your boutique name" />
              <Input label="City" value={city} onChange={setCity} placeholder="City" />
            </div>
          </div>

          <div style={{ background: WH, borderRadius: 14, padding: 20, border: `1px solid ${BORDER}` }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: DN, marginBottom: 14 }}>Payment</div>
            <Input label="UPI ID" value={upi} onChange={setUpi} placeholder="yourname@upi" />
            <div style={{ marginTop: 10 }}>
              <Btn label="Save Payment Details" onClick={() => {}} />
            </div>
          </div>

          <div style={{ background: WH, borderRadius: 14, padding: 20, border: `1px solid ${BORDER}` }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: DN, marginBottom: 14 }}>Subscription</div>
            <div style={{ background: BG, borderRadius: 10, padding: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: SL }}>Current Plan</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: CR, marginTop: 2 }}>Pro Trial</div>
              <div style={{ fontSize: 11, color: SL, marginTop: 4 }}>15 days remaining</div>
            </div>
            <Btn label="Upgrade to Pro →" onClick={() => {}} />
          </div>

          <div style={{ background: WH, borderRadius: 14, padding: 20, border: `1px solid ${BORDER}`, gridColumn: '1 / -1' }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: DN, marginBottom: 4 }}>Account</div>
            <div style={{ fontSize: 13, color: SL, marginBottom: 14 }}>{profile.name} · {profile.phone || 'No phone'}</div>
            <Btn2 label="Sign Out" onClick={() => navigate('splash')} />
          </div>
        </div>
      </div>
    </WebShell>
  );
};

/* ── WEB BLOCKED (tailor trying to access web) ── */
export const WebBlockedScreen = () => {
  const { navigate } = useNav();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', background: BG, padding: 32, textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: DN, marginBottom: 8 }}>Access Restricted</div>
      <div style={{ fontSize: 14, color: SL, maxWidth: 280, lineHeight: 1.6, marginBottom: 24 }}>
        The web dashboard is available to Admin users only. Tailor accounts are limited to the mobile app.
      </div>
      <Btn2 label="Go Back" onClick={() => navigate('tailorOrders')} />
    </div>
  );
};
