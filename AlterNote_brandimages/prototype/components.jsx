// AlterNote — Shared UI Components
const { useState, useEffect, useRef } = React;

const CR='#d9385e',DN='#0f172a',OW='#fdfbf7',WH='#ffffff',SL='#64748b',BG='#f1f5f9',BORDER='#e2e8f0',SUCCESS='#10b981',WARNING='#f59e0b',DANGER='#ef4444';

const STATUS_COLORS={
  'Received':{bg:'#f8fafc',color:SL,dot:SL},
  'In Progress':{bg:'#fffbeb',color:'#d97706',dot:'#d97706'},
  'For Fitting':{bg:'#eff6ff',color:'#2563eb',dot:'#2563eb'},
  'Completed':{bg:'#ecfdf5',color:'#059669',dot:'#059669'},
  'Delivered':{bg:'#f0fdf4',color:'#16a34a',dot:'#16a34a'},
};
const TAG_COLORS={
  'Bridal':{bg:'#fffbeb',color:'#d97706'},
  'VIP':{bg:'#fef2f4',color:CR},
  'Rush':{bg:'#fef2f4',color:CR},
  'Regular':{bg:'#f8fafc',color:SL,border:BORDER},
  'Alteration':{bg:'#eff6ff',color:'#2563eb'},
  'New Design':{bg:'#f5f3ff',color:'#7c3aed'},
};

const StatusBar = ({dark}) => (
  <div style={{padding:'12px 20px 6px',display:'flex',justifyContent:'space-between',alignItems:'center',background:dark?DN:WH,flexShrink:0}}>
    <span style={{fontWeight:600,color:dark?WH:DN,fontSize:13}}>9:41</span>
    <div style={{display:'flex',gap:6,alignItems:'center',fontSize:11,color:dark?'#94a3b8':SL}}>
      <span>●●●</span><span>WiFi</span><span>🔋</span>
    </div>
  </div>
);

const TopHeader = ({title,onBack,right,rightLabel,dark,noBottom,children}) => (
  <div style={{padding:'14px 18px',display:'flex',alignItems:'center',gap:10,background:dark?DN:WH,borderBottom:noBottom||dark?'none':`1px solid ${BORDER}`,flexShrink:0}}>
    {onBack && <button onClick={onBack} style={{width:30,height:30,borderRadius:7,background:dark?'rgba(255,255,255,.12)':BG,border:'none',cursor:'pointer',fontSize:16,color:dark?WH:DN,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>←</button>}
    <h1 style={{fontSize:17,fontWeight:600,color:dark?WH:DN,flex:1}}>{title}</h1>
    {children}
    {right && <button onClick={right} style={{background:rightLabel?CR:'transparent',color:rightLabel?WH:SL,border:'none',borderRadius:7,padding:rightLabel?'6px 11px':'0',fontSize:rightLabel?12:18,fontWeight:500,cursor:'pointer'}}>{rightLabel||'⋮'}</button>}
  </div>
);

const Tag = ({label}) => {
  const tc=TAG_COLORS[label]||TAG_COLORS['Regular'];
  return <span style={{display:'inline-flex',alignItems:'center',padding:'3px 9px',borderRadius:20,fontSize:11,fontWeight:500,background:tc.bg,color:tc.color,border:tc.border?`1px solid ${tc.border}`:'none'}}>{label}</span>;
};

const StatusPill = ({status}) => {
  const sc=STATUS_COLORS[status]||STATUS_COLORS['Received'];
  return <span style={{display:'inline-flex',alignItems:'center',gap:4,padding:'3px 9px',borderRadius:20,fontSize:11,fontWeight:500,background:sc.bg,color:sc.color}}><span style={{width:5,height:5,borderRadius:'50%',background:sc.dot,display:'inline-block'}}/>{status}</span>;
};

const Avatar = ({initials,color='#e0e0e0',textColor='#fff',size=38,radius}) => (
  <div style={{width:size,height:size,borderRadius:radius!==undefined?radius:size/3.2,background:color,color:textColor,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600,fontSize:size*0.34,flexShrink:0}}>{initials}</div>
);

const Btn = ({label,onClick,color,disabled,style={}}) => (
  <button onClick={onClick} disabled={disabled} style={{background:disabled?'#cbd5e1':color||CR,color:WH,border:'none',borderRadius:12,padding:'13px 18px',fontSize:14,fontWeight:500,width:'100%',cursor:disabled?'not-allowed':'pointer',transition:'opacity .15s',...style}}>{label}</button>
);

const Btn2 = ({label,onClick,style={}}) => (
  <button onClick={onClick} style={{background:BG,color:DN,border:`1px solid ${BORDER}`,borderRadius:12,padding:'11px 18px',fontSize:13,width:'100%',cursor:'pointer',...style}}>{label}</button>
);

const Input = ({label,value,onChange,type='text',placeholder='',style={}}) => (
  <div>
    {label&&<div style={{fontSize:12,color:SL,fontWeight:500,marginBottom:5}}>{label}</div>}
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{background:WH,border:`1px solid ${BORDER}`,borderRadius:11,padding:'12px 14px',fontSize:14,width:'100%',outline:'none',color:DN,...style}}
      onFocus={e=>e.target.style.borderColor=CR} onBlur={e=>e.target.style.borderColor=BORDER}/>
  </div>
);

const TextareaInput = ({label,value,onChange,rows=3,placeholder=''}) => (
  <div>
    {label&&<div style={{fontSize:12,color:SL,fontWeight:500,marginBottom:5}}>{label}</div>}
    <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows} placeholder={placeholder}
      style={{background:WH,border:`1px solid ${BORDER}`,borderRadius:11,padding:'12px 14px',fontSize:14,width:'100%',outline:'none',color:DN,resize:'none'}}
      onFocus={e=>e.target.style.borderColor=CR} onBlur={e=>e.target.style.borderColor=BORDER}/>
  </div>
);

const SearchBar = ({value,onChange,placeholder='Search...'}) => (
  <div style={{margin:'14px',background:WH,border:`1px solid ${BORDER}`,borderRadius:12,padding:'11px 14px',display:'flex',alignItems:'center',gap:8,color:SL,fontSize:14,flexShrink:0}}>
    <span>🔍</span>
    <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{border:'none',outline:'none',flex:1,fontSize:14,background:'transparent',color:DN}}/>
    {value&&<span onClick={()=>onChange('')} style={{cursor:'pointer',color:SL,fontSize:12}}>✕</span>}
  </div>
);

const FilterChips = ({chips,active,onSelect}) => (
  <div style={{display:'flex',gap:7,padding:'0 14px 11px',overflowX:'auto',flexShrink:0}}>
    {chips.map((chip,i)=>(
      <div key={chip} onClick={()=>onSelect(i)} style={{background:i===active?CR:BG,color:i===active?WH:SL,padding:'4px 12px',borderRadius:20,fontSize:12,whiteSpace:'nowrap',cursor:'pointer',fontWeight:i===active?500:400,transition:'all .15s'}}>{chip}</div>
    ))}
  </div>
);

const Divider = ({mx=14}) => <div style={{height:1,background:BORDER,margin:`0 ${mx}px`}}/>;

const SectionLabel = ({text}) => <div style={{fontSize:11,color:SL,fontWeight:600,textTransform:'uppercase',letterSpacing:.5,padding:'14px 14px 6px'}}>{text}</div>;

const Card = ({children,mb=10,style={}}) => (
  <div style={{background:WH,borderRadius:14,padding:14,margin:`0 14px ${mb}px`,border:`1px solid ${BORDER}`,...style}}>{children}</div>
);

const Csm = ({children,mb=8,style={}}) => (
  <div style={{background:WH,borderRadius:12,padding:'12px 14px',margin:`0 14px ${mb}px`,border:`1px solid ${BORDER}`,...style}}>{children}</div>
);

const InfoBanner = ({text,color='amber'}) => {
  const c={amber:{bg:'#fffbeb',tc:'#92400e'},blue:{bg:'#eff6ff',tc:'#1e40af'},green:{bg:'#ecfdf5',tc:'#065f46'},red:{bg:'#fef2f4',tc:'#be123c'}}[color]||{bg:'#fffbeb',tc:'#92400e'};
  return <div style={{background:c.bg,padding:'9px 14px',display:'flex',gap:7,alignItems:'flex-start',fontSize:12,color:c.tc,lineHeight:1.5,flexShrink:0}}>ℹ <span>{text}</span></div>;
};

const TabBar = ({tabs,active,onChange}) => (
  <div style={{display:'flex',background:WH,borderBottom:`1px solid ${BORDER}`,flexShrink:0}}>
    {tabs.map((tab,i)=>(
      <div key={tab} onClick={()=>onChange(i)} style={{flex:1,padding:'12px 6px',textAlign:'center',fontSize:13,color:i===active?CR:SL,cursor:'pointer',position:'relative',fontWeight:500}}>
        {tab}
        {i===active&&<div style={{position:'absolute',bottom:0,left:'20%',right:'20%',height:2,background:CR,borderRadius:2}}/>}
      </div>
    ))}
  </div>
);

const StepProgress = ({steps,current}) => (
  <div style={{display:'flex',gap:5,padding:'10px 14px',flexShrink:0}}>
    {Array.from({length:steps},(_,i)=>(
      <div key={i} style={{flex:1,height:3,borderRadius:3,background:i<current?CR:BORDER,transition:'background .3s'}}/>
    ))}
  </div>
);

const BottomNav = ({tabs,active,onSelect}) => (
  <div style={{background:WH,borderTop:`1px solid ${BORDER}`,display:'flex',padding:'8px 0 20px',flexShrink:0}}>
    {tabs.map((tab,i)=>(
      <div key={tab.label} onClick={()=>onSelect(i)} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,cursor:'pointer',padding:'4px',WebkitTapHighlightColor:'transparent'}}>
        <span style={{fontSize:18}}>{tab.icon}</span>
        <span style={{fontSize:10,color:i===active?CR:SL,fontWeight:i===active?500:400}}>{tab.label}</span>
      </div>
    ))}
  </div>
);

const FAB = ({onClick,icon='+',bottom=88}) => (
  <div onClick={onClick} style={{position:'absolute',bottom,right:18,width:50,height:50,background:CR,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,color:WH,boxShadow:`0 4px 14px rgba(217,56,94,.4)`,cursor:'pointer',zIndex:10}}>{icon}</div>
);

const OrderCard = ({order,onClick,client}) => (
  <div onClick={onClick} style={{background:WH,borderRadius:14,padding:14,margin:'0 14px 9px',border:`1px solid ${BORDER}`,cursor:'pointer'}}>
    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:7}}>
      <div style={{flex:1,marginRight:8}}>
        <div style={{fontWeight:600,fontSize:14}}>{client?.name||'—'}</div>
        <div style={{fontSize:11,color:SL,marginTop:1}}>{order.garment}{order.tailor?` · ${order.tailor}`:''}{order.type==='alteration'?' · Alt.':''}</div>
      </div>
      <StatusPill status={order.status}/>
    </div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>{order.tags?.map(t=><Tag key={t} label={t}/>)}</div>
      <span style={{fontSize:11,color:order.tags?.includes('Rush')?WARNING:SL,flexShrink:0}}>Due: {order.due}</span>
    </div>
  </div>
);

const ClientRow = ({client,onClick,last}) => (
  <div onClick={onClick} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 14px',cursor:'pointer',borderBottom:last?'none':`1px solid ${BORDER}`}}>
    <Avatar initials={client.initials} color={client.color} textColor={client.textColor||WH}/>
    <div style={{flex:1}}>
      <div style={{fontWeight:600,fontSize:14}}>{client.name}</div>
      <div style={{fontSize:11,color:SL,marginTop:1}}>{client.phone}</div>
    </div>
    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:3}}>{client.tags?.slice(0,2).map(t=><Tag key={t} label={t}/>)}</div>
  </div>
);

const MeasRow = ({label,value,onChange,readOnly}) => (
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 0',borderBottom:`1px solid ${BORDER}`}}>
    <span style={{fontSize:13}}>{label}</span>
    <div style={{display:'flex',alignItems:'center',gap:7}}>
      <input value={value} readOnly={readOnly} onChange={e=>onChange&&onChange(e.target.value)}
        style={{width:72,textAlign:'right',border:`1px solid ${BORDER}`,borderRadius:7,padding:'5px 8px',fontSize:13,color:DN,outline:'none',background:readOnly?BG:WH,cursor:readOnly?'default':'text'}}
        onFocus={e=>{if(!readOnly)e.target.style.borderColor=CR}} onBlur={e=>e.target.style.borderColor=BORDER}/>
      <span style={{fontSize:11,color:SL,width:16}}>in</span>
    </div>
  </div>
);

const BarChart = ({data}) => {
  const max=Math.max(...data.map(d=>d.v));
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:5,height:100}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
          <div style={{background:i===data.length-1?CR:'#f1c0cc',borderRadius:'3px 3px 0 0',width:'100%',height:`${(d.v/max)*100}%`,opacity:.9}}/>
          <span style={{fontSize:10,color:i===data.length-1?CR:SL}}>{d.l}</span>
        </div>
      ))}
    </div>
  );
};

// AlterNote — brand mark (stitch-star, direction 02) + wordmark lockup
const StitchStar = ({size=44, color=CR, sw=8}) => {
  const arms=[0,45,90,135,180,225,270,315], inner=13, card=34, diag=25;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
         stroke={color} strokeWidth={sw} strokeLinecap="round">
      {arms.map((a,i)=>{
        const r=(a%90===0)?card:diag, rad=a*Math.PI/180;
        return <line key={i}
          x1={50+Math.cos(rad)*inner} y1={50+Math.sin(rad)*inner}
          x2={50+Math.cos(rad)*r}     y2={50+Math.sin(rad)*r} />;
      })}
    </svg>
  );
};
const Wordmark = ({size=30, color='#fff'}) => (
  <div style={{fontFamily:"'Hanken Grotesk',sans-serif",fontWeight:700,fontSize:size,letterSpacing:'-0.035em',color,lineHeight:1}}>AlterNote</div>
);

const MetricCard = ({label,value,sub,warn}) => (
  <div style={{background:WH,borderRadius:11,padding:14,border:`1px solid ${BORDER}`,flex:1}}>
    <div style={{fontSize:12,color:SL,marginTop:2}}>{label}</div>
    <div style={{fontSize:22,fontWeight:600,color:warn?WARNING:DN,fontFamily:"'DM Serif Display',serif"}}>{value}</div>
    {sub&&<div style={{fontSize:12,color:SUCCESS,marginTop:3,fontWeight:500}}>{sub}</div>}
  </div>
);

Object.assign(window,{
  CR,DN,OW,WH,SL,BG,BORDER,SUCCESS,WARNING,DANGER,
  STATUS_COLORS,TAG_COLORS,
  StatusBar,TopHeader,Tag,StatusPill,Avatar,Btn,Btn2,
  Input,TextareaInput,SearchBar,FilterChips,
  Divider,SectionLabel,Card,Csm,InfoBanner,TabBar,StepProgress,
  BottomNav,FAB,OrderCard,ClientRow,MeasRow,BarChart,MetricCard,
  StitchStar,Wordmark,
});
