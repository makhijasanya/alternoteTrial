import { useState } from 'react';

const CR = '#d9385e', DN = '#0f172a', WH = '#ffffff', SL = '#64748b', BORDER = '#e2e8f0';

export const Input = ({ label, value, onChange, type = 'text', placeholder = '', style = {} }) => (
  <div>
    {label && <div style={{ fontSize: 12, color: SL, fontWeight: 500, marginBottom: 5 }}>{label}</div>}
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        background: WH, border: `1px solid ${BORDER}`, borderRadius: 11,
        padding: '12px 14px', fontSize: 14, width: '100%',
        outline: 'none', color: DN, ...style,
      }}
      onFocus={e => e.target.style.borderColor = CR}
      onBlur={e => e.target.style.borderColor = BORDER}
    />
  </div>
);

export const PasswordInput = ({ label, value, onChange, placeholder = '' }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {label && <div style={{ fontSize: 12, color: SL, fontWeight: 500, marginBottom: 5 }}>{label}</div>}
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'} value={value}
          onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{
            background: WH, border: `1px solid ${BORDER}`, borderRadius: 11,
            padding: '12px 42px 12px 14px', fontSize: 14, width: '100%',
            outline: 'none', color: DN,
          }}
          onFocus={e => e.target.style.borderColor = CR}
          onBlur={e => e.target.style.borderColor = BORDER}
        />
        <button
          type="button" onClick={() => setShow(s => !s)}
          style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 4, color: SL, fontSize: 14,
          }}
        >
          {show ? '🙈' : '👁'}
        </button>
      </div>
    </div>
  );
};

export const TextareaInput = ({ label, value, onChange, rows = 3, placeholder = '' }) => (
  <div>
    {label && <div style={{ fontSize: 12, color: SL, fontWeight: 500, marginBottom: 5 }}>{label}</div>}
    <textarea
      value={value} onChange={e => onChange(e.target.value)}
      rows={rows} placeholder={placeholder}
      style={{
        background: WH, border: `1px solid ${BORDER}`, borderRadius: 11,
        padding: '12px 14px', fontSize: 14, width: '100%',
        outline: 'none', color: DN, resize: 'none',
      }}
      onFocus={e => e.target.style.borderColor = CR}
      onBlur={e => e.target.style.borderColor = BORDER}
    />
  </div>
);

export const SelectInput = ({ label, value, onChange, options = [], placeholder = 'Select…' }) => (
  <div>
    {label && <div style={{ fontSize: 12, color: SL, fontWeight: 500, marginBottom: 5 }}>{label}</div>}
    <select
      value={value} onChange={e => onChange(e.target.value)}
      style={{
        background: WH, border: `1px solid ${BORDER}`, borderRadius: 11,
        padding: '12px 14px', fontSize: 14, width: '100%',
        outline: 'none', color: DN, appearance: 'none',
      }}
      onFocus={e => e.target.style.borderColor = CR}
      onBlur={e => e.target.style.borderColor = BORDER}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  </div>
);
