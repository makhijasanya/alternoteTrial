import { useState } from 'react';
import { useNav } from '../../navigation/NavContext.jsx';
import { StatusBar } from '../../components/StatusBar.jsx';
import { TopHeader } from '../../components/TopHeader.jsx';
import { Btn, Btn2 } from '../../components/Button.jsx';
import { StepProgress } from '../../components/TabBar.jsx';

const CR = '#d9385e', WH = '#ffffff', SL = '#64748b', BG = '#f1f5f9', BORDER = '#e2e8f0', DN = '#0f172a';

const TEMPLATES = [
  { id: 'blouse', name: 'Blouse', icon: '👗', fields: ['Bust', 'Waist', 'Hip', 'Shoulder Width', 'Sleeve Length', 'Back Length', 'Front Length', 'Armhole'] },
  { id: 'lehenga', name: 'Lehenga', icon: '✨', fields: ['Waist', 'Hip', 'Length', 'Flare'] },
  { id: 'kurti', name: 'Kurti', icon: '👚', fields: ['Chest', 'Waist', 'Length', 'Sleeve Length'] },
  { id: 'sherwani', name: 'Sherwani', icon: '🎩', fields: ['Chest', 'Waist', 'Shoulder', 'Length'] },
];

export const TemplateSetupScreen = () => {
  const { navigate } = useNav();
  const [selected, setSelected] = useState(['blouse', 'lehenga', 'kurti']);
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: WH }}>
      <StatusBar />
      <TopHeader title="Measurement Templates" />
      <div style={{ background: '#fef2f4', padding: '10px 14px', fontSize: 13, color: CR, flexShrink: 0 }}>
        Select templates for garment types you stitch. You can add more later.
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        {TEMPLATES.map(tmpl => {
          const isSelected = selected.includes(tmpl.id);
          const isExpanded = expanded === tmpl.id;
          return (
            <div key={tmpl.id} style={{ margin: '0 14px 10px', borderRadius: 12, border: `1.5px solid ${isSelected ? CR : BORDER}`, background: WH, overflow: 'hidden' }}>
              <div
                onClick={() => toggle(tmpl.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px', cursor: 'pointer' }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, background: isSelected ? '#fef2f4' : BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {tmpl.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{tmpl.name}</div>
                  <div style={{ fontSize: 11, color: SL }}>{tmpl.fields.length} measurements</div>
                </div>
                <div style={{ color: isSelected ? CR : BORDER, fontSize: 18, fontWeight: 700 }}>
                  {isSelected ? '✓' : '○'}
                </div>
              </div>
              {isSelected && (
                <div style={{ padding: '0 14px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {tmpl.fields.map(f => (
                    <span key={f} style={{ background: BG, color: SL, fontSize: 11, padding: '3px 8px', borderRadius: 6 }}>{f}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '12px 18px 24px', borderTop: `1px solid ${BORDER}`, background: WH, display: 'flex', gap: 10 }}>
        <Btn2 label="Skip" onClick={() => navigate('staffSetup')} style={{ flex: 1 }} />
        <Btn label={`Save (${selected.length})`} onClick={() => navigate('staffSetup')} disabled={selected.length === 0} style={{ flex: 2 }} />
      </div>
    </div>
  );
};
