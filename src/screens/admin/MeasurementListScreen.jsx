/* Alternote — Measurement List + Template Detail Screens (Phase 1.1 FRD flow) */
import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { useApp } from '../../state/AppContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { MeasRow } from '../../components/Cards.jsx';
import { Btn } from '../../components/Button.jsx';
import { InfoBanner } from '../../components/Layout.jsx';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0';

const TEMPLATES = [
  {
    id: 'blouse', name: 'Blouse', icon: '👗',
    fields: ['Bust', 'Waist', 'Hip', 'Shoulder Width', 'Sleeve Length', 'Back Length', 'Front Length', 'Armhole'],
    updatedAt: '14 Apr 2025', updatedBy: 'Anika S.',
  },
  {
    id: 'lehenga', name: 'Lehenga', icon: '✨',
    fields: ['Waist', 'Hip', 'Length', 'Flare', 'Waist Band'],
    updatedAt: '14 Apr 2025', updatedBy: 'Anika S.',
  },
  {
    id: 'kurti', name: 'Kurti', icon: '👚',
    fields: ['Chest', 'Waist', 'Length', 'Sleeve Length', 'Armhole'],
    updatedAt: '2 Mar 2025', updatedBy: 'Priya M.',
  },
  {
    id: 'sherwani', name: 'Sherwani', icon: '🎩',
    fields: ['Chest', 'Waist', 'Shoulder', 'Sleeve Length', 'Total Length'],
    updatedAt: null, updatedBy: null,
  },
];

/* ── MEASUREMENTS LIST ── */
export const MeasurementListScreen = ({ clientId }) => {
  const { navigate, goBack } = useNav();
  const { clients } = useApp();
  const client = clients.find(c => c.id === clientId) || clients[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG }}>
      <StatusBar />
      <div style={{ background: DN, flexShrink: 0 }}>
        <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={goBack} style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(255,255,255,.12)', border: 'none', cursor: 'pointer', fontSize: 16, color: '#fff' }}>←</button>
          <h1 style={{ fontSize: 17, fontWeight: 600, color: '#fff', flex: 1 }}>Measurements</h1>
        </div>
        <div style={{ padding: '0 18px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {client.initials}
          </div>
          <div>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 16, color: '#fff' }}>{client.name}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>Select a template to view or edit</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 8 }}>
        {TEMPLATES.map(t => {
          const hasValues = t.fields.some(f => client.measurements?.[f]);
          return (
            <div
              key={t.id}
              onClick={() => navigate('measTemplate', { clientId: client.id, templateId: t.id, templateName: t.name })}
              style={{ background: WH, borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}
              onMouseEnter={e => e.currentTarget.style.background = BG}
              onMouseLeave={e => e.currentTarget.style.background = WH}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {t.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: DN }}>{t.name}</div>
                <div style={{ fontSize: 11, color: SL, marginTop: 3 }}>
                  {hasValues
                    ? (t.updatedAt ? `Updated ${t.updatedAt} · ${t.updatedBy}` : 'Has measurements')
                    : 'No measurements recorded yet'}
                </div>
                <div style={{ fontSize: 11, color: SL, marginTop: 1 }}>{t.fields.length} fields</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                {hasValues && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} />}
                <span style={{ color: SL, fontSize: 18 }}>›</span>
              </div>
            </div>
          );
        })}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
};

/* ── MEASUREMENT TEMPLATE DETAIL ── */
export const MeasurementTemplateScreen = ({ clientId, templateId, templateName }) => {
  const { goBack } = useNav();
  const { clients, dispatch } = useApp();
  const client = clients.find(c => c.id === clientId) || clients[0];
  const template = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];
  const [meas, setMeas] = useState({ ...client.measurements });
  const [saved, setSaved] = useState(false);

  const save = () => {
    dispatch({ type: 'UPDATE_MEASUREMENTS', clientId: client.id, measurements: meas });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const title = `${template.name} — ${client.name.split(' ')[0]}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title={title} onBack={goBack} />

      <div style={{ background: '#fef2f4', padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: CR }}>
          {template.updatedAt ? `Updated ${template.updatedAt} · ${template.updatedBy}` : 'No previous values'}
        </span>
        <span style={{ fontSize: 12, color: CR, cursor: 'pointer' }}>Share PDF ↗</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px' }}>
        {template.fields.map(k => (
          <MeasRow
            key={k}
            label={k}
            value={meas[k] || ''}
            onChange={v => setMeas(m => ({ ...m, [k]: v }))}
          />
        ))}
        <div style={{ height: 20 }} />
      </div>

      <InfoBanner
        text="Changes here update the client's master record. Alteration-specific measurements are stored separately."
        color="amber"
      />

      <div style={{ padding: '12px 14px 24px', borderTop: `1px solid ${BORDER}`, background: WH }}>
        <Btn
          label={saved ? '✓ Saved!' : 'Save Measurements'}
          onClick={save}
          color={saved ? '#10b981' : undefined}
        />
      </div>
    </div>
  );
};
