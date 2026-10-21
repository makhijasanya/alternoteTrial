/* AlterNote — Settings Screens (Main, Business, Staff, Templates, Roles) */
import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { SectionLabel, Csm, InfoBanner } from '../../components/Layout.jsx';
import { Input } from '../../components/Input.jsx';
import { Btn, Btn2 } from '../../components/Button.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { AdminNav } from './AdminNav.jsx';
import { STAFF, TAILORS } from '../../state/data.js';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0';

const SettingsRow = ({ icon, label, sub, onPress, chevron = true }) => (
  <div onClick={onPress} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', background: WH }}>
    <div style={{ width: 36, height: 36, borderRadius: 10, background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: SL, marginTop: 1 }}>{sub}</div>}
    </div>
    {chevron && <span style={{ color: SL, fontSize: 14 }}>›</span>}
  </div>
);

/* ── MAIN SETTINGS ── */
export const SettingsScreen = () => {
  const { navigate } = useNav();
  const { profile } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <TopHeader title="Settings" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Profile card */}
        <div style={{ background: DN, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <Avatar initials={profile.initials} color={profile.color} textColor={profile.textColor} size={46} />
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>{profile.name}</div>
            <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>Admin · Priya's Couture Studio</div>
          </div>
        </div>

        <SectionLabel text="Boutique" />
        <SettingsRow icon="🏪" label="Business Info" sub="Name, GST, address" onPress={() => navigate('settingsBiz')} />
        <SettingsRow icon="📏" label="Measurement Templates" sub="Manage garment templates" onPress={() => navigate('settingsTemplates')} />
        <SettingsRow icon="🔔" label="Notifications" sub="WhatsApp, push alerts" onPress={() => {}} />

        <SectionLabel text="Team" />
        <SettingsRow icon="👥" label="Staff & Access" sub={`${STAFF.length} members`} onPress={() => navigate('settingsStaff')} />
        <SettingsRow icon="🛡" label="Roles & Permissions" sub="Control what each role sees" onPress={() => navigate('settingsRoles')} />

        <SectionLabel text="Billing" />
        <SettingsRow icon="💳" label="Payments Setup" sub="UPI, bank transfer" onPress={() => navigate('paymentSetup')} />
        <SettingsRow icon="🧾" label="Invoice Settings" sub="Template, GST number, footer" onPress={() => {}} />

        <SectionLabel text="Account" />
        <SettingsRow icon="🔒" label="Change PIN" onPress={() => {}} />
        <SettingsRow icon="📱" label="App Settings" sub="Theme, language" onPress={() => {}} />
        <SettingsRow icon="🗓" label="Subscription" sub="Trial — 12 days left" onPress={() => {}} />

        <div style={{ padding: '16px 14px' }}>
          <div onClick={() => navigate('splash')} style={{ background: '#fef2f4', borderRadius: 10, padding: 14, textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ color: CR, fontSize: 14, fontWeight: 500 }}>Sign Out</div>
          </div>
        </div>
        <div style={{ height: 8 }} />
      </div>
      <AdminNav active={4} />
    </div>
  );
};

/* ── BUSINESS SETTINGS ── */
export const SettingsBizScreen = () => {
  const { goBack } = useNav();
  const [name, setName] = useState("Priya's Couture Studio");
  const [gst, setGst] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [phone, setPhone] = useState('+91 98765 43210');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Business Info" onBack={goBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <SectionLabel text="Boutique Details" />
        <div style={{ padding: '0 14px 10px' }}><Input label="Boutique Name" value={name} onChange={setName} /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="City" value={city} onChange={setCity} /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="Contact Number" value={phone} onChange={setPhone} /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="GST Number (optional)" value={gst} onChange={setGst} placeholder="22AAAAA0000A1Z5" /></div>
        <SectionLabel text="Logo" />
        <div style={{ margin: '0 14px 14px', border: `2px dashed ${BORDER}`, borderRadius: 12, padding: 20, textAlign: 'center', cursor: 'pointer', color: SL }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>🖼</div>
          <div style={{ fontSize: 13 }}>Upload boutique logo</div>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>Appears on PDF invoices</div>
        </div>
        <div style={{ padding: '14px' }}><Btn label="Save Changes" /></div>
      </div>
    </div>
  );
};

/* ── STAFF SETTINGS ── */
export const SettingsStaffScreen = () => {
  const { goBack } = useNav();
  const ROLE_COLORS = { admin: CR, help: '#2563eb', tailor: '#059669' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Staff & Access" onBack={goBack} right={() => {}} rightLabel="+ Add" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <SectionLabel text="Current Team" />
        {STAFF.map((s, i) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: `1px solid ${BORDER}` }}>
            <Avatar initials={s.initials} color={s.color} textColor={s.textColor} size={42} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: SL, marginTop: 1 }}>{s.roleLabel}</div>
            </div>
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: `${ROLE_COLORS[s.role]}15`, color: ROLE_COLORS[s.role], fontWeight: 500 }}>{s.role}</span>
              <span style={{ color: SL, fontSize: 14, cursor: 'pointer' }}>›</span>
            </div>
          </div>
        ))}
        <InfoBanner text="Tailors only see their assigned orders. Billing tab is never shown to Tailors." color="amber" />
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
};

/* ── TEMPLATE SETTINGS ── */
export const SettingsTemplatesScreen = () => {
  const { goBack } = useNav();
  const TEMPLATES = [
    { name: 'Blouse', fields: 8, icon: '👗' },
    { name: 'Lehenga', fields: 4, icon: '✨' },
    { name: 'Kurti', fields: 4, icon: '👚' },
    { name: 'Sherwani', fields: 4, icon: '🎩' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Measurement Templates" onBack={goBack} right={() => {}} rightLabel="+ New" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <SectionLabel text="Active Templates" />
        {TEMPLATES.map(t => (
          <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{t.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: SL }}>{t.fields} measurement fields</div>
            </div>
            <span style={{ color: SL, fontSize: 14 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── ROLES & PERMISSIONS ── */
export const SettingsRolesScreen = () => {
  const { goBack } = useNav();
  const roles = [
    { name: 'Admin', color: CR, desc: 'Full access. Creates orders, billing, staff.', perms: ['Clients', 'Orders', 'Billing', 'Settings', 'Staff', 'Web Dashboard'] },
    { name: 'Help / Assistant', color: '#2563eb', desc: 'View/update orders and clients, enter measurements. No billing.', perms: ['Clients', 'Orders', 'Measurements'] },
    { name: 'Tailor', color: '#059669', desc: 'Sees only assigned orders. Read-only measurements. Forward-only status.', perms: ['My Orders (read-only)', 'Chat', 'Status Updates (forward only)'] },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <TopHeader title="Roles & Permissions" onBack={goBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
        {roles.map(r => (
          <div key={r.name} style={{ margin: '0 14px 12px', background: WH, borderRadius: 12, padding: 16, border: `1px solid ${BORDER}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: r.color }} />
              <div style={{ fontWeight: 700, fontSize: 15 }}>{r.name}</div>
            </div>
            <div style={{ fontSize: 13, color: SL, marginBottom: 10, lineHeight: 1.5 }}>{r.desc}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {r.perms.map(p => (
                <span key={p} style={{ background: `${r.color}12`, color: r.color, fontSize: 11, padding: '3px 8px', borderRadius: 6, fontWeight: 500 }}>{p}</span>
              ))}
            </div>
          </div>
        ))}
        <InfoBanner text="Role permissions are enforced at the API level — UI visibility alone is not sufficient." color="amber" />
      </div>
    </div>
  );
};
