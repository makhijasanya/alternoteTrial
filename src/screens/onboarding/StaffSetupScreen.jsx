import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { Input } from '../../components/Input.jsx';
import { Btn, Btn2 } from '../../components/Button.jsx';
import { Avatar } from '../../components/Avatar.jsx';

const CR = '#d9385e', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', DN = '#0f172a';

const ROLES = ['Admin', 'Help / Assistant', 'Tailor'];
const ROLE_COLORS = { 'Admin': CR, 'Help / Assistant': '#2563eb', 'Tailor': '#059669' };

export const StaffSetupScreen = () => {
  const { navigate } = useNav();
  const [staff, setStaff] = useState([
    { name: 'Priya Mehta', role: 'Admin', initials: 'PM' },
  ]);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Tailor');
  const [adding, setAdding] = useState(false);

  const addStaff = () => {
    if (!newName.trim()) return;
    const initials = newName.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    setStaff(s => [...s, { name: newName.trim(), role: newRole, initials }]);
    setNewName(''); setAdding(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Add Staff Members" />
      <div style={{ background: '#fef2f4', padding: '10px 14px', fontSize: 13, color: CR, flexShrink: 0 }}>
        Add your tailors and assistants. You can always add more later.
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        {staff.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: `1px solid ${BORDER}` }}>
            <Avatar initials={s.initials} color={ROLE_COLORS[s.role] || BG} textColor={WH} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: SL }}>{s.role}</div>
            </div>
            {i === 0 && <span style={{ fontSize: 11, color: SL, background: BG, padding: '2px 8px', borderRadius: 6 }}>You</span>}
          </div>
        ))}

        {adding ? (
          <div style={{ margin: '12px 14px', background: BG, borderRadius: 12, padding: 14 }}>
            <div style={{ marginBottom: 10 }}>
              <Input label="Name" value={newName} onChange={setNewName} placeholder="e.g. Ramesh Kumar" />
            </div>
            <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
              {ROLES.map(r => (
                <div key={r} onClick={() => setNewRole(r)} style={{
                  flex: 1, padding: '8px 4px', textAlign: 'center', borderRadius: 8,
                  border: `1.5px solid ${r === newRole ? ROLE_COLORS[r] : BORDER}`,
                  background: r === newRole ? `${ROLE_COLORS[r]}15` : WH,
                  color: r === newRole ? ROLE_COLORS[r] : SL,
                  fontSize: 11, cursor: 'pointer', fontWeight: 500,
                }}>
                  {r}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn2 label="Cancel" onClick={() => setAdding(false)} style={{ flex: 1 }} />
              <Btn label="Add" onClick={addStaff} disabled={!newName.trim()} style={{ flex: 1 }} />
            </div>
          </div>
        ) : (
          <div onClick={() => setAdding(true)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px', cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: BG, border: `1.5px dashed ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>➕</div>
            <div style={{ fontSize: 14, color: CR, fontWeight: 500 }}>Add staff member</div>
          </div>
        )}
      </div>

      <div style={{ padding: '12px 18px 24px', borderTop: `1px solid ${BORDER}`, background: WH, display: 'flex', gap: 10 }}>
        <Btn2 label="Skip" onClick={() => navigate('onboardDone')} style={{ flex: 1 }} />
        <Btn label="Finish →" onClick={() => navigate('onboardDone')} style={{ flex: 2 }} />
      </div>
    </div>
  );
};
