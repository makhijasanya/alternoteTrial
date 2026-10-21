import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { MeasRow } from '../../components/Cards.jsx';
import { Btn } from '../../components/Button.jsx';
import { InfoBanner } from '../../components/Layout.jsx';

const WH = '#ffffff', SL = '#64748b', BORDER = '#e2e8f0', CR = '#d9385e';

const GARMENT_TABS = ['Blouse', 'Lehenga', 'Kurti'];

const FIELDS_BY_GARMENT = {
  Blouse: ['Bust', 'Waist', 'Hip', 'Shoulder Width', 'Sleeve Length', 'Back Length', 'Front Length', 'Armhole'],
  Lehenga: ['Waist', 'Hip', 'Length', 'Flare', 'Waist Band'],
  Kurti: ['Chest', 'Waist', 'Length', 'Sleeve Length', 'Armhole'],
};

export const MeasurementScreen = ({ clientId }) => {
  const { goBack } = useNav();
  const { clients, dispatch } = useApp();
  const client = clients.find(c => c.id === clientId) || clients[0];
  const [tab, setTab] = useState(0);
  const [meas, setMeas] = useState({ ...client.measurements });

  const fields = FIELDS_BY_GARMENT[GARMENT_TABS[tab]] || [];

  const save = () => {
    dispatch({ type: 'UPDATE_MEASUREMENTS', clientId: client.id, measurements: meas });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title={`${client.name} — Measurements`} onBack={goBack} />

      <div style={{ display: 'flex', gap: 7, padding: '10px 14px', background: WH, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        {GARMENT_TABS.map((t, i) => (
          <div key={t} onClick={() => setTab(i)} style={{ background: i === tab ? CR : '#f1f5f9', color: i === tab ? '#fff' : SL, padding: '6px 16px', borderRadius: 20, fontSize: 13, cursor: 'pointer', fontWeight: i === tab ? 500 : 400 }}>{t}</div>
        ))}
      </div>

      <div style={{ background: '#fef2f4', padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: CR }}>Last updated: 14 Apr 2025 · Anika S.</span>
        <span style={{ fontSize: 12, color: CR, cursor: 'pointer' }}>Share PDF ↗</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px' }}>
        {fields.map(k => (
          <MeasRow key={k} label={k} value={meas[k] || ''} onChange={v => setMeas(m => ({ ...m, [k]: v }))} />
        ))}
        <div style={{ height: 20 }} />
      </div>

      <InfoBanner text="Changes here update the client's master record. Alteration-specific measurements are stored separately." color="amber" />

      <div style={{ padding: '12px 14px 24px', borderTop: `1px solid ${BORDER}`, background: WH }}>
        <Btn label="Save Measurements" onClick={save} />
      </div>
    </div>
  );
};
