import { useEffect, useRef, useState, useCallback } from 'react';
import { AppProvider, useApp } from './state/AppContext.jsx';
import { NavProvider, useNav } from './navigation/NavContext.jsx';
import { SCREEN_MAP } from './screens/index.js';
import { StitchStar } from './components/Brand.jsx';

/* ── Web-screen IDs — rendered in a wider frame ── */
const WEB_SCREENS = new Set(['webAnalytics', 'webClients', 'webBilling', 'webSettings', 'webBlocked']);

/* ── AnimatedScreen: renders current screen with slide animation ── */
const AnimatedScreen = ({ current, anim, clearAnim }) => {
  const { component: Screen, params: paramKeys } = SCREEN_MAP[current.id] || SCREEN_MAP['splash'];
  const props = {};
  paramKeys.forEach(k => { if (current.params[k] !== undefined) props[k] = current.params[k]; });

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !anim) return;
    const cls = anim === 'forward' ? 'anim-slide-fwd' : 'anim-slide-back';
    el.classList.add(cls);
    const id = setTimeout(() => { el.classList.remove(cls); clearAnim(); }, 320);
    return () => clearTimeout(id);
  }, [current.id, anim]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Screen {...props} />
    </div>
  );
};

/* ── Role indicator pill ── */
const RoleIndicator = ({ role, onSwitch }) => {
  const roleLabel = { admin: 'Admin', tailor: 'Tailor', help: 'Help' }[role] || role;
  const roleColor = { admin: '#d9385e', tailor: '#3b82f6', help: '#10b981' }[role] || '#64748b';

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
      <div style={{ background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '5px 12px 5px 8px', display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: roleColor }} />
        <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>{roleLabel}</span>
      </div>
      <div onClick={onSwitch} style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)', borderRadius: 16, padding: '4px 10px', fontSize: 10, color: '#94a3b8', cursor: 'pointer' }}>
        Switch role
      </div>
    </div>
  );
};

/* ── Role switcher overlay ── */
const RoleSwitcher = ({ onClose }) => {
  const { dispatch, role } = useApp();
  const { resetTo } = useNav();

  const ROLES = [
    { label: 'Admin', role: 'admin', icon: '👑', screen: 'dashboard', name: 'Priya Sharma', initials: 'PS', phone: '+91 98765 43210' },
    { label: 'Helper', role: 'help', icon: '🤝', screen: 'helpDash', name: 'Anika Singh', initials: 'AS', phone: '+91 98765 43211' },
    { label: 'Tailor', role: 'tailor', icon: '🧵', screen: 'tailorOrders', name: 'Ramesh K.', initials: 'RK', phone: '+91 98765 43212' },
    { label: 'Web (Admin)', role: 'admin', icon: '🖥️', screen: 'webAnalytics', name: 'Priya Sharma', initials: 'PS', phone: '+91 98765 43210' },
  ];

  const select = (r) => {
    dispatch({ type: 'SET_PROFILE', profile: { role: r.role, name: r.name, initials: r.initials, phone: r.phone } });
    resetTo(r.screen);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, padding: 24, width: 300, boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#0f172a', marginBottom: 4 }}>Switch Role</div>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>Choose a role to preview</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ROLES.map(r => (
            <div key={r.label} onClick={() => select(r)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0', cursor: 'pointer', background: role === r.role ? '#fef2f4' : '#fff', transition: 'all 0.15s' }}
              onMouseEnter={e => { if (role !== r.role) e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={e => { e.currentTarget.style.background = role === r.role ? '#fef2f4' : '#fff'; }}>
              <span style={{ fontSize: 20 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{r.label}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{r.name}</div>
              </div>
              {role === r.role && <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: '#d9385e' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── PhoneFrame: 390×844 mobile bezel ── */
const PhoneFrame = ({ children }) => (
  <div style={{
    width: 390, height: 844, borderRadius: 44, overflow: 'hidden', position: 'relative',
    boxShadow: '0 25px 60px rgba(0,0,0,.45), 0 0 0 10px #0f172a, 0 0 0 11px rgba(255,255,255,.08)',
    flexShrink: 0,
  }}>
    {children}
  </div>
);

/* ── WebFrame: wider, flat card ── */
const WebFrame = ({ children }) => (
  <div style={{
    width: 960, height: 640, borderRadius: 16, overflow: 'hidden', position: 'relative',
    boxShadow: '0 20px 50px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.1)',
    flexShrink: 0,
  }}>
    {children}
  </div>
);

/* ── Stage: scales the frame to fit viewport ── */
const Stage = ({ children, isWeb }) => {
  const [scale, setScale] = useState(1);
  const stageRef = useRef(null);

  const targetW = isWeb ? 960 : 390;
  const targetH = isWeb ? 640 : 844;

  const recalc = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = isWeb ? 48 : 80;
    const scaleX = (vw - pad) / targetW;
    const scaleY = (vh - pad) / targetH;
    setScale(Math.min(scaleX, scaleY, 1));
  }, [isWeb, targetW, targetH]);

  useEffect(() => {
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [recalc]);

  return (
    <div ref={stageRef} style={{
      width: '100vw', height: '100vh',
      background: 'radial-gradient(ellipse at 30% 40%, #1e293b 0%, #0f172a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Subtle grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      {/* Brand mark in background */}
      <div style={{ position: 'absolute', bottom: -40, right: -40, opacity: 0.04, pointerEvents: 'none' }}>
        <StitchStar size={320} color="#fff" />
      </div>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center', transition: 'transform 0.2s ease' }}>
        {children}
      </div>
    </div>
  );
};

/* ── Inner app: reads nav state and renders correct frame+screen ── */
const AppInner = () => {
  const { current, anim, clearAnim } = useNav();
  const { role } = useApp();
  const [showSwitcher, setShowSwitcher] = useState(false);
  const isWeb = WEB_SCREENS.has(current.id);

  const Frame = isWeb ? WebFrame : PhoneFrame;

  return (
    <>
      <Stage isWeb={isWeb}>
        <Frame>
          <AnimatedScreen current={current} anim={anim} clearAnim={clearAnim} />
        </Frame>
      </Stage>
      <RoleIndicator role={role} onSwitch={() => setShowSwitcher(true)} />
      {showSwitcher && <RoleSwitcher onClose={() => setShowSwitcher(false)} />}
    </>
  );
};

/* ── Root App ── */
export default function App() {
  return (
    <AppProvider>
      <NavProvider>
        <AppInner />
      </NavProvider>
    </AppProvider>
  );
}
