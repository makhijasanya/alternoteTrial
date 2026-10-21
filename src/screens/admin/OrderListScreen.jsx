import { useState, useMemo } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { SearchBar, FilterChips } from '../../components/SearchBar.jsx';
import { OrderCard, FAB } from '../../components/Cards.jsx';
import { AdminNav } from './AdminNav.jsx';

const BG = '#f1f5f9', WH = '#ffffff', BORDER = '#e2e8f0';

export const OrderListScreen = () => {
  const { navigate } = useNav();
  const { orders, clients } = useApp();
  const [q, setQ] = useState('');
  const [chip, setChip] = useState(0);
  const statuses = [null, 'In Progress', 'For Fitting', 'Received', 'Completed', 'Delivered'];
  const labels = ['All', 'In Progress', 'Fitting', 'Received', 'Done', 'Delivered'];

  const filtered = useMemo(() => orders.filter(o => {
    const sMatch = chip === 0 || o.status === statuses[chip];
    const cl = clients.find(c => c.id === o.clientId);
    const qMatch = !q || (cl?.name || '').toLowerCase().includes(q.toLowerCase()) || o.garment.toLowerCase().includes(q.toLowerCase());
    return sMatch && qMatch;
  }), [orders, clients, q, chip]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <TopHeader title="Orders" />
      <div style={{ background: WH, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <SearchBar value={q} onChange={setQ} placeholder="Search orders…" />
        <FilterChips
          chips={labels.map((l, i) => {
            const cnt = i === 0 ? orders.length : orders.filter(o => o.status === statuses[i]).length;
            return `${l} (${cnt})`;
          })}
          active={chip} onSelect={setChip}
        />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 6 }}>
        {filtered.map(o => <OrderCard key={o.id} order={o} client={clients.find(c => c.id === o.clientId)} onClick={() => navigate('orderDetail', { orderId: o.id })} />)}
        {filtered.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>No orders found</div>}
        <div style={{ height: 70 }} />
      </div>
      <FAB onClick={() => navigate('orderS1')} />
      <AdminNav active={2} />
    </div>
  );
};
