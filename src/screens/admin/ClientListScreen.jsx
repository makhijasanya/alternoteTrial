import { useState, useMemo } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { SearchBar, FilterChips } from '../../components/SearchBar.jsx';
import { Divider } from '../../components/Layout.jsx';
import { ClientRow, FAB } from '../../components/Cards.jsx';
import { AdminNav } from './AdminNav.jsx';

const WH = '#ffffff', BG = '#f1f5f9', BORDER = '#e2e8f0';

export const ClientListScreen = () => {
  const { navigate } = useNav();
  const { clients } = useApp();
  const [q, setQ] = useState('');
  const [chip, setChip] = useState(0);
  const chips = ['All', 'VIP', 'Bridal', 'Regular'];

  const filtered = useMemo(() => clients.filter(c => {
    const tagMatch = chip === 0 || c.tags?.includes(chips[chip]);
    const qMatch = !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q);
    return tagMatch && qMatch;
  }), [clients, q, chip]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Clients" right={() => navigate('addClient')} rightLabel="+ Add" />
      <SearchBar value={q} onChange={setQ} placeholder="Search by name, phone, tag…" />
      <FilterChips
        chips={chips.map((c, i) => {
          const count = i === 0 ? clients.length : clients.filter(cl => cl.tags?.includes(c)).length;
          return `${c} (${count})`;
        })}
        active={chip} onSelect={setChip}
      />
      <Divider />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.map((c, i) => (
          <ClientRow key={c.id} client={c} onClick={() => navigate('clientProfile', { clientId: c.id })} last={i === filtered.length - 1} />
        ))}
        {filtered.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>No clients found</div>}
        <div style={{ height: 60 }} />
      </div>
      <FAB onClick={() => navigate('addClient')} />
      <AdminNav active={1} />
    </div>
  );
};
