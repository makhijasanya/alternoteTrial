import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { SectionLabel } from '../../components/Layout.jsx';
import { Input, TextareaInput } from '../../components/Input.jsx';
import { Btn } from '../../components/Button.jsx';
import { AdminNav } from './AdminNav.jsx';

const CR = '#d9385e', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0';

export const AddClientScreen = () => {
  const { goBack } = useNav();
  const { dispatch } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState('');
  const allTags = ['VIP', 'Bridal', 'Regular', 'Referral'];

  const save = () => {
    if (!name || phone.length < 6) return;
    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    dispatch({ type: 'ADD_CLIENT', client: { name, phone, initials, color: BG, textColor: '#64748b', tags: tags.length ? tags : ['Regular'], notes } });
    goBack();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Add Client" onBack={goBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0' }}>
        <div style={{ padding: '0 14px 10px' }}><Input label="Full Name *" value={name} onChange={setName} placeholder="e.g. Meera Kapoor" /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="Mobile Number *" value={phone} onChange={setPhone} /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="Email (optional)" value="" onChange={() => {}} placeholder="email@example.com" /></div>
        <div style={{ padding: '0 14px 10px' }}><Input label="Birthday (optional)" value="" onChange={() => {}} placeholder="e.g. 12 March" /></div>
        <SectionLabel text="Tags" />
        <div style={{ display: 'flex', gap: 7, padding: '0 14px 14px', flexWrap: 'wrap' }}>
          {allTags.map(t => (
            <div key={t} onClick={() => setTags(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t])}
              style={{
                padding: '5px 12px', borderRadius: 20,
                border: `1.5px solid ${tags.includes(t) ? CR : '#e2e8f0'}`,
                background: tags.includes(t) ? '#fef2f4' : '#fff',
                color: tags.includes(t) ? CR : '#64748b',
                fontSize: 12, cursor: 'pointer', transition: 'all .15s',
              }}>
              {t}
            </div>
          ))}
        </div>
        <div style={{ padding: '0 14px 10px' }}><TextareaInput label="Notes (optional)" value={notes} onChange={setNotes} rows={3} placeholder="Style preferences, fitting notes…" /></div>
        <div style={{ padding: '14px' }}><Btn label="Save Client" onClick={save} disabled={!name || phone.length < 6} /></div>
      </div>
      <AdminNav active={1} />
    </div>
  );
};
