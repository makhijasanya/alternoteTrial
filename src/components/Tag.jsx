import { TAG_COLORS } from '../state/data.js';

export const Tag = ({ label }) => {
  const tc = TAG_COLORS[label] || TAG_COLORS['Regular'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 9px', borderRadius: 20,
      fontSize: 11, fontWeight: 500,
      background: tc.bg, color: tc.color,
      border: tc.border ? `1px solid ${tc.border}` : 'none',
    }}>
      {label}
    </span>
  );
};

export const StatusPill = ({ status }) => {
  const SC = {
    'Received':    { bg: '#f8fafc', color: '#64748b', dot: '#64748b' },
    'In Progress': { bg: '#fffbeb', color: '#d97706', dot: '#d97706' },
    'For Fitting': { bg: '#eff6ff', color: '#2563eb', dot: '#2563eb' },
    'Completed':   { bg: '#ecfdf5', color: '#059669', dot: '#059669' },
    'Delivered':   { bg: '#f0fdf4', color: '#16a34a', dot: '#16a34a' },
  };
  const sc = SC[status] || SC['Received'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 9px', borderRadius: 20,
      fontSize: 11, fontWeight: 500,
      background: sc.bg, color: sc.color,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
};
