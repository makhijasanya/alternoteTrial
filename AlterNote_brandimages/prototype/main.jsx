// AlterNote — Navigation Engine + App Root
const { useState, useEffect, useRef, createContext, useContext } = React;

/* ── NAV CONTEXT ── */
const NavContext = createContext();

const NavProvider = ({children}) => {
  const [stack, setStack] = useState([{id:'splash', params:{}}]);
  const [anim, setAnim] = useState(null);
  const prevLen = useRef(1);

  const navigate = (id, params={}) => {
    setAnim('forward');
    setStack(p => [...p, {id, params}]);
  };
  const goBack = () => {
    if (stack.length <= 1) return;
    setAnim('back');
    setStack(p => p.slice(0, -1));
  };
  const replace = (id, params={}) => {
    setAnim('forward');
    setStack(p => [...p.slice(0,-1), {id, params}]);
  };
  const resetTo = (id, params={}) => {
    setAnim(null);
    setStack([{id, params}]);
  };

  const current = stack[stack.length - 1];
  return (
    <NavContext.Provider value={{navigate, goBack, replace, resetTo, current, stackLen: stack.length, anim}}>
      {children}
    </NavContext.Provider>
  );
};

const useNav = () => useContext(NavContext);

/* ── SCREEN REGISTRY ── */
const SCREENS = {
  splash:             () => window.SplashScreen,
  login:              () => window.LoginScreen,
  profileSelect:      () => window.ProfileSelectScreen,
  dashboard:          () => window.DashboardScreen,
  clientList:         () => window.ClientListScreen,
  clientProfile:      () => window.ClientProfileScreen,
  addClient:          () => window.AddClientScreen,
  orderList:          () => window.OrderListScreen,
  orderS1:            () => window.OrderS1Screen,
  orderS2:            () => window.OrderS2Screen,
  orderS3:            () => window.OrderS3Screen,
  orderS4:            () => window.OrderS4Screen,
  orderReview:        () => window.OrderReviewScreen,
  orderDetail:        () => window.OrderDetailScreen,
  billingHistory:     () => window.BillingHistoryScreen,
  invoiceDetail:      () => window.InvoiceDetailScreen,
  analytics:          () => window.AnalyticsScreen,
  settings:           () => window.SettingsScreen,
  tailorOrders:       () => window.TailorOrdersScreen,
  tailorOrderDetail:  () => window.TailorOrderDetailScreen,
  tailorChats:        () => window.TailorChatsScreen,
  tailorChat:         () => window.TailorChatScreen,
  tailorSettings:     () => window.TailorSettingsScreen,
  helpDash:           () => window.HelpDashScreen,
  helpOrderDetail:    () => window.HelpOrderDetailScreen,
};

/* ── ANIMATED SCREEN WRAPPER ── */
const AnimatedScreen = ({screenId, params, animClass, stackKey}) => {
  const Comp = SCREENS[screenId]?.() || window.DashboardScreen;
  return (
    <div key={stackKey}
      className={animClass}
      style={{position:'absolute',inset:0,background:'#fdfbf7',willChange:'transform',overflowY:'auto'}}>
      <div style={{height:'100%',display:'flex',flexDirection:'column'}}>
        <Comp {...params}/>
      </div>
    </div>
  );
};

/* ── PHONE FRAME ── */
const PhoneFrame = () => {
  const {current, stackLen, anim} = useNav();
  const [animClass, setAnimClass] = useState('');
  const prevKey = useRef(0);

  useEffect(() => {
    if (anim === 'forward') setAnimClass('slide-fwd');
    else if (anim === 'back') setAnimClass('slide-back');
    else setAnimClass('fade-in');
    prevKey.current = stackLen;
  }, [stackLen]);

  return (
    <div style={{
      width:390, height:844,
      borderRadius:40, overflow:'hidden',
      boxShadow:'0 25px 60px rgba(0,0,0,.5), 0 0 0 8px #0f172a',
      position:'relative', background:'#fdfbf7', flexShrink:0,
    }}>
      <AnimatedScreen
        key={`${current.id}-${stackLen}`}
        screenId={current.id}
        params={current.params}
        animClass={animClass}
        stackKey={`${current.id}-${stackLen}`}
      />
    </div>
  );
};

/* ── STAGE: scales phone to viewport ── */
const Stage = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const s = Math.min(
        (window.innerWidth - 32) / 390,
        (window.innerHeight - 32) / 844,
        1
      );
      setScale(Math.max(s, 0.4));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'100vh', background:'#1e293b',
      position:'relative', overflow:'hidden',
    }}>
      {/* Background label */}
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:800, letterSpacing:'-0.04em',
        fontSize:120, color:'rgba(255,255,255,.03)',
        userSelect:'none', whiteSpace:'nowrap', pointerEvents:'none',
      }}>AlterNote</div>

      {/* Role indicator pill */}
      <RoleIndicator/>

      {/* The phone */}
      <div style={{transform:`scale(${scale})`, transformOrigin:'center center'}}>
        <PhoneFrame/>
      </div>
    </div>
  );
};

/* ── ROLE INDICATOR ── */
const RoleIndicator = () => {
  const {role, profile} = window.useApp();
  const {navigate} = useNav();
  const colors = {admin:'#d9385e', help:'#2563eb', tailor:'#059669'};
  const labels = {admin:'Admin', help:'Help/Asst', tailor:'Tailor'};
  if (!role) return null;
  return (
    <div style={{
      position:'fixed', top:16, right:16, zIndex:999,
      display:'flex', alignItems:'center', gap:8,
      background:'rgba(255,255,255,.1)', backdropFilter:'blur(8px)',
      borderRadius:12, padding:'8px 14px',
      border:'1px solid rgba(255,255,255,.15)',
    }}>
      <div style={{width:8,height:8,borderRadius:'50%',background:colors[role]}}/>
      <span style={{fontSize:12,color:'#fff',fontWeight:500}}>{profile?.name}</span>
      <span style={{fontSize:11,color:'rgba(255,255,255,.5)'}}>·</span>
      <span style={{fontSize:11,color:colors[role],fontWeight:600}}>{labels[role]}</span>
      <span onClick={()=>navigate('profileSelect')} style={{fontSize:11,color:'rgba(255,255,255,.4)',cursor:'pointer',marginLeft:4}}>Switch ↗</span>
    </div>
  );
};

/* ── ROOT APP ── */
const App = () => (
  <window.AppProvider>
    <NavProvider>
      <Stage/>
    </NavProvider>
  </window.AppProvider>
);

/* ── EXPORT NAV HOOK GLOBALLY (for screen files) ── */
Object.assign(window, { useNav, NavContext, NavProvider });

/* ── MOUNT ── */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
