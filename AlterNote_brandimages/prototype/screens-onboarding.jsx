// AlterNote — Onboarding Screens
const { useState, useEffect } = React;

const SplashScreen = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);
  const { navigate } = window.useNav();
  return (
    <div style={{background:'linear-gradient(160deg,#0f172a 0%,#1e3a5f 100%)',minHeight:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'40px 24px',transition:'opacity .5s',opacity:show?1:0}}>
      <div style={{marginBottom:6,transition:'transform .6s',transform:show?'scale(1)':'scale(.7)'}}><window.StitchStar size={52} color="#d9385e" sw={8}/></div>
      <div style={{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:700,letterSpacing:'-0.035em',fontSize:36,color:'#fff',marginBottom:5,textAlign:'center'}}>AlterNote</div>
      <div style={{color:'#94a3b8',fontSize:13,textAlign:'center',marginBottom:40}}>Your boutique, beautifully managed</div>
      <div style={{textAlign:'center',marginBottom:32}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:'#fff',lineHeight:1.4,marginBottom:10}}>From notebooks to<br/>your digital register</div>
        <div style={{fontSize:13,color:'#94a3b8',lineHeight:1.7}}>Client measurements. Orders. Billing.<br/>All in one place, built for boutiques.</div>
      </div>
      <div style={{display:'flex',gap:5,marginBottom:28}}>
        <div style={{width:22,height:4,background:'#fff',borderRadius:4}}/><div style={{width:5,height:4,background:'rgba(255,255,255,.3)',borderRadius:4}}/><div style={{width:5,height:4,background:'rgba(255,255,255,.3)',borderRadius:4}}/>
      </div>
      <button onClick={()=>navigate('login')} style={{background:'#fff',color:'#d9385e',border:'none',borderRadius:12,padding:'14px 18px',fontSize:14,fontWeight:600,width:'100%',cursor:'pointer',marginBottom:12}}>Get Started — It's Free</button>
      <div style={{fontSize:13,color:'#64748b',textAlign:'center'}}>Already have an account? <span onClick={()=>navigate('login')} style={{color:'#fff',cursor:'pointer'}}>Sign in</span></div>
      <div style={{marginTop:40,fontSize:11,color:'#334155',textAlign:'center'}}>14-day free trial · No credit card required</div>
    </div>
  );
};

const LoginScreen = () => {
  const { navigate } = window.useNav();
  const [phone, setPhone] = useState('+91 98765 43210');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const { Input } = window;

  const handleLogin = () => {
    if (!pass) { setErr('Please enter your password.'); return; }
    setErr(''); setLoading(true);
    setTimeout(() => { setLoading(false); navigate('profileSelect'); }, 1200);
  };

  return (
    <div style={{background:'linear-gradient(160deg,#0f172a 0%,#1e3a5f 100%)',minHeight:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',padding:'56px 24px 24px'}}>
      <div style={{marginBottom:4}}><window.StitchStar size={30} color="#d9385e" sw={9}/></div>
      <div style={{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:700,letterSpacing:'-0.035em',fontSize:27,color:'#fff',marginBottom:4}}>AlterNote</div>
      <div style={{color:'#94a3b8',fontSize:13,marginBottom:26}}>Welcome back</div>
      <div style={{background:'#fff',borderRadius:18,padding:22,width:'100%'}}>
        <h2 style={{fontSize:17,marginBottom:3}}>Sign in</h2>
        <p style={{fontSize:13,color:'#64748b',marginBottom:18}}>Enter your mobile number to continue</p>
        <div style={{marginBottom:12}}>
          <Input label="Mobile Number" value={phone} onChange={setPhone}/>
        </div>
        <div style={{marginBottom:err?8:18}}>
          <Input label="Password" value={pass} onChange={setPass} type="password" placeholder="Enter password"/>
        </div>
        {err && <div style={{fontSize:12,color:'#ef4444',marginBottom:12}}>{err}</div>}
        <button onClick={handleLogin} style={{background:'#d9385e',color:'#fff',border:'none',borderRadius:12,padding:'13px 18px',fontSize:14,fontWeight:500,width:'100%',cursor:'pointer',opacity:loading?.7:1}}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
        <div style={{textAlign:'center',marginTop:12,fontSize:13,color:'#64748b'}}>Forgot password? <span style={{color:'#d9385e',cursor:'pointer'}}>Reset via OTP</span></div>
      </div>
      <div style={{marginTop:20,fontSize:12,color:'#334155',textAlign:'center'}}>New? <span style={{color:'#94a3b8',textDecoration:'underline',cursor:'pointer'}}>Create account</span></div>
    </div>
  );
};

const ProfileSelectScreen = () => {
  const { navigate } = window.useNav();
  const { dispatch } = window.useApp();
  const [selected, setSelected] = useState(0);
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const STAFF = window.STAFF;

  const handlePinKey = (d) => {
    if (d === 'del') { setPin(p => p.slice(0,-1)); setErr(''); return; }
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        const profile = STAFF[selected];
        dispatch({type:'SET_PROFILE', profile});
        const dest = profile.role==='tailor' ? 'tailorOrders' : 'dashboard';
        navigate(dest);
      }, 300);
    }
  };

  const keys = ['1','2','3','4','5','6','7','8','9','','0','del'];

  return (
    <div style={{background:'#fdfbf7',minHeight:'100%',display:'flex',flexDirection:'column',padding:'36px 18px 18px',overflowY:'auto'}}>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:'#0f172a',marginBottom:3}}>Who's working today?</div>
      <div style={{fontSize:13,color:'#64748b',marginBottom:24}}>Select your profile to continue</div>
      {STAFF.map((s,i) => (
        <div key={s.id} onClick={()=>{setSelected(i);setPin('');setErr('');}} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderRadius:12,border:`2px solid ${i===selected?'#d9385e':'#e2e8f0'}`,background:i===selected?'#fef2f4':'#fff',marginBottom:7,cursor:'pointer',transition:'all .2s'}}>
          <div style={{width:46,height:46,borderRadius:13,background:s.color,color:s.textColor,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600,fontSize:17}}>{s.initials}</div>
          <div><div style={{fontWeight:600,fontSize:15}}>{s.name}</div><div style={{fontSize:12,color:'#64748b'}}>{s.roleLabel}</div></div>
          {i===selected && <div style={{marginLeft:'auto',color:'#d9385e',fontSize:18,fontWeight:700}}>✓</div>}
        </div>
      ))}
      <div style={{marginTop:18}}>
        <div style={{fontSize:12,color:'#64748b',textAlign:'center',marginBottom:8}}>Enter PIN for {STAFF[selected].name}</div>
        <div style={{display:'flex',gap:10,justifyContent:'center',marginBottom:6}}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{width:46,height:46,borderRadius:11,background:'#f1f5f9',border:`2px solid ${i<pin.length?'#d9385e':'#e2e8f0'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,transition:'border-color .2s'}}>
              {i<pin.length?'●':''}
            </div>
          ))}
        </div>
        {err && <div style={{fontSize:12,color:'#ef4444',textAlign:'center',marginBottom:8}}>{err}</div>}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:12}}>
          {keys.map((k,i)=>(
            <button key={i} onClick={()=>k&&handlePinKey(k)} style={{height:46,borderRadius:11,border:'1px solid #e2e8f0',background:k?'#fff':'transparent',fontSize:k==='del'?13:18,fontWeight:500,cursor:k?'pointer':'default',color:'#0f172a',fontFamily:"'DM Sans',sans-serif"}}>
              {k==='del'?'⌫':k}
            </button>
          ))}
        </div>
        <div style={{marginTop:12,fontSize:11,color:'#94a3b8',textAlign:'center'}}>Any 4-digit PIN works in demo mode</div>
      </div>
    </div>
  );
};

Object.assign(window, { SplashScreen, LoginScreen, ProfileSelectScreen });
