import { Tag } from './Tag.jsx';
import { StatusPill } from './Tag.jsx';
import { Avatar } from './Avatar.jsx';

const WH = '#ffffff', DN = '#0f172a', SL = '#64748b', BORDER = '#e2e8f0', WARNING = '#f59e0b', CR = '#d9385e', BG = '#f1f5f9';

export const FAB = ({ onClick, icon = '+', bottom = 88 }) => (
  <div
    onClick={onClick}
    style={{
      position: 'absolute', bottom, right: 18,
      width: 50, height: 50, background: CR, borderRadius: 14,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 22, color: WH,
      boxShadow: '0 4px 14px rgba(217,56,94,.4)',
      cursor: 'pointer', zIndex: 10,
    }}
  >
    {icon}
  </div>
);

export const OrderCard = ({ order, onClick, client }) => (
  <div
    onClick={onClick}
    style={{
      background: WH, borderRadius: 14, padding: 14, margin: '0 14px 9px',
      border: `1px solid ${BORDER}`, cursor: 'pointer',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 7 }}>
      <div style={{ flex: 1, marginRight: 8 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{client?.name || '—'}</div>
        <div style={{ fontSize: 11, color: SL, marginTop: 1 }}>
          {order.garment}
          {order.tailor ? ` · ${order.tailor}` : ''}
          {order.type === 'alteration' ? ' · Alt.' : ''}
        </div>
      </div>
      <StatusPill status={order.status} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {order.tags?.map(t => <Tag key={t} label={t} />)}
      </div>
      <span style={{ fontSize: 11, color: order.tags?.includes('Rush') ? WARNING : SL, flexShrink: 0 }}>
        Due: {order.due}
      </span>
    </div>
  </div>
);

export const ClientRow = ({ client, onClick, last = false }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
      cursor: 'pointer', borderBottom: last ? 'none' : `1px solid ${BORDER}`,
    }}
  >
    <Avatar initials={client.initials} color={client.color} textColor={client.textColor || '#fff'} />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, fontSize: 14 }}>{client.name}</div>
      <div style={{ fontSize: 11, color: SL, marginTop: 1 }}>{client.phone}</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
      {client.tags?.slice(0, 2).map(t => <Tag key={t} label={t} />)}
    </div>
  </div>
);

export const MeasRow = ({ label, value, onChange, readOnly = false }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '11px 0', borderBottom: `1px solid ${BORDER}`,
  }}>
    <span style={{ fontSize: 13 }}>{label}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <input
        value={value} readOnly={readOnly}
        onChange={e => onChange && onChange(e.target.value)}
        style={{
          width: 72, textAlign: 'right', border: `1px solid ${BORDER}`, borderRadius: 7,
          padding: '5px 8px', fontSize: 13, color: DN, outline: 'none',
          background: readOnly ? BG : WH, cursor: readOnly ? 'default' : 'text',
        }}
        onFocus={e => { if (!readOnly) e.target.style.borderColor = CR; }}
        onBlur={e => e.target.style.borderColor = BORDER}
      />
      <span style={{ fontSize: 11, color: SL, width: 16 }}>in</span>
    </div>
  </div>
);

export const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 100 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <div style={{
            background: i === data.length - 1 ? CR : '#f1c0cc',
            borderRadius: '3px 3px 0 0', width: '100%',
            height: `${(d.v / max) * 100}%`, opacity: 0.9,
          }} />
          <span style={{ fontSize: 10, color: i === data.length - 1 ? CR : SL }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
};
