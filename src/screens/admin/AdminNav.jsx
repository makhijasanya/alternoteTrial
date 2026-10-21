import { useNav } from '../../navigation/NavContext.jsx';
import { BottomNav } from '../../components/TabBar.jsx';

const ADMIN_TABS = [
  { icon: '🏠', label: 'Home',     screen: 'dashboard' },
  { icon: '👥', label: 'Clients',  screen: 'clientList' },
  { icon: '📦', label: 'Orders',   screen: 'orderList' },
  { icon: '🧾', label: 'Billing',  screen: 'billingHistory' },
  { icon: '⚙️', label: 'Settings', screen: 'settings' },
];

export const AdminNav = ({ active }) => {
  const { navigate } = useNav();
  return <BottomNav tabs={ADMIN_TABS} active={active} onSelect={i => navigate(ADMIN_TABS[i].screen)} />;
};
