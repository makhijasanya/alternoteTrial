import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { Input, TextareaInput } from '../../components/Input.jsx';
import { Btn } from '../../components/Button.jsx';
import { SectionLabel } from '../../components/Layout.jsx';

const CR = '#d9385e', WH = '#ffffff', BG = '#f1f5f9', BORDER = '#e2e8f0';

export const EditClientScreen = ({ clientId }) => {
  const { goBack } = useNav();
  const { clients, dispatch } = useApp();
  const client = clients.find(c => c.id === clientId) || clients[0];
  const [name, setName] = useState(client.name);
  const [phone, setPhone] = useState(client.phone);
  const [email, setEmail] = useState(client.email || '');
  const [birthday, setBirthday] = useState(client.birthday || '');
  const [notes, setNotes] = useState(client.notes || '');
  const [tags, setTags] = useState(client.tags || []);
  const allTags = ['VIP', 'Bridal', 'Regular', 'Referral'];

  const save = () => {
    dispatch({ type: 'UPDATE_CLIENT', id: client.id, data: { name, phone, email, birthday, notes, tags } });
    goBack();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Edit Client" onBack={goBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <div style={{ padding: '0 14px 10px' }}><Input label="Full Name *" value={name} onChange={setName} /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="Mobile Number *" value={phone} onChange={setPhone} /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="Email" value={email} onChange={setEmail} /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="Birthday" value={birthday} onChange={setBirthday} placeholder="e.g. 12 March" /></div>
        <SectionLabel text="Tags" />
        <div style={{ display: 'flex', gap: 7, padding: '0 14px 14px', flexWrap: 'wrap' }}>
          {allTags.map(t => (
            <div key={t} onClick={() => setTags(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t])}
              style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${tags.includes(t) ? CR : BORDER}`, background: tags.includes(t) ? '#fef2f4' : WH, color: tags.includes(t) ? CR : '#64748b', fontSize: 12, cursor: 'pointer' }}>
              {t}
            </div>
          ))}
        </div>
        <div style={{ padding: '0 14px 10px' }}><TextareaInput label="Notes" value={notes} onChange={setNotes} rows={3} /></div>
        <div style={{ padding: '14px' }}><Btn label="Save Changes" onClick={save} /></div>
        <div style={{ padding: '0 14px 14px' }}>
          <div style={{ background: '#fef2f4', borderRadius: 10, padding: 14, textAlign: 'center' }}>
            <div style={{ color: '#ef4444', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Delete Client</div>
            <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 3 }}>This cannot be undone</div>
          </div>
        </div>
      </div>
    </div>
  );
};
