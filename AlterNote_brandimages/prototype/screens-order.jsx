// AlterNote — Order Flow + Billing Screens
const { useState, useMemo } = React;

const GARMENT_TYPES = ['Blouse','Lehenga','Kurti','Sharara','Sherwani','Suit','Saree','Custom'];
const ALL_TAGS = ['Rush','Bridal','New Design','VIP'];
const STATUS_LIST = ['Received','In Progress','For Fitting','Completed','Delivered'];

/* ── NEW ORDER S1: CLIENT SELECT ── */
const OrderS1Screen = ({preselectedClientId}) => {
  const {navigate,goBack}=window.useNav();
  const {clients,newOrder,dispatch}=window.useApp();
  const {StatusBar,TopHeader,StepProgress,SearchBar,Avatar,Tag,Btn,WH,BG,BORDER,SL,CR,DN}=window;
  const [q,setQ]=useState('');
  const [sel,setSel]=useState(preselectedClientId||newOrder.client?.id||null);

  const filtered=useMemo(()=>clients.filter(c=>!q||c.name.toLowerCase().includes(q.toLowerCase())||c.phone.includes(q)),[clients,q]);

  const next=()=>{
    const client=clients.find(c=>c.id===sel);
    if(!client) return;
    dispatch({type:'UPDATE_NEW_ORDER',data:{client,step:2}});
    navigate('orderS2');
  };

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:WH}}>
      <StatusBar/>
      <TopHeader title="New Order" onBack={goBack}/>
      <StepProgress steps={4} current={1}/>
      <div style={{fontSize:12,color:SL,padding:'0 14px 10px'}}>Step 1 of 4 — Select Client</div>
      <SearchBar value={q} onChange={setQ} placeholder="Search by name or phone…"/>
      <div style={{flex:1,overflowY:'auto'}}>
        {filtered.map((c,i)=>(
          <div key={c.id} onClick={()=>setSel(c.id)} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',cursor:'pointer',borderBottom:`1px solid ${BORDER}`,background:sel===c.id?'#fef2f4':WH,borderLeft:sel===c.id?`3px solid ${CR}`:'3px solid transparent',transition:'all .15s'}}>
            <Avatar initials={c.initials} color={c.color} textColor={c.textColor||'#fff'}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,fontSize:14}}>{c.name}</div>
              <div style={{fontSize:11,color:SL,marginTop:1}}>{c.phone}</div>
            </div>
            {sel===c.id?<div style={{color:CR,fontSize:18,fontWeight:700}}>✓</div>:<div style={{display:'flex',gap:4}}>{c.tags?.slice(0,1).map(t=><Tag key={t} label={t}/>)}</div>}
          </div>
        ))}
        <div onClick={()=>navigate('addClient')} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',cursor:'pointer',borderTop:`1px solid ${BORDER}`}}>
          <div style={{width:38,height:38,borderRadius:11,background:BG,border:`1.5px dashed ${BORDER}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>➕</div>
          <div style={{fontSize:13,color:CR,fontWeight:500}}>Create new client</div>
        </div>
        <div style={{height:100}}/>
      </div>
      <div style={{padding:'12px 14px 20px',background:WH,borderTop:`1px solid ${BORDER}`}}>
        <Btn label="Continue →" onClick={next} disabled={!sel}/>
      </div>
    </div>
  );
};

/* ── NEW ORDER S2: GARMENT ── */
const OrderS2Screen = () => {
  const {navigate,goBack}=window.useNav();
  const {newOrder,dispatch}=window.useApp();
  const {StatusBar,TopHeader,StepProgress,SectionLabel,TextareaInput,Btn,WH,BG,BORDER,SL,CR,DN}=window;
  const [garmentType,setGarmentType]=useState(newOrder.garmentType||'Blouse');
  const [desc,setDesc]=useState(newOrder.description||'');
  const [tags,setTags]=useState(newOrder.tags||[]);

  const next=()=>{
    dispatch({type:'UPDATE_NEW_ORDER',data:{garmentType,description:desc,tags,step:3}});
    navigate('orderS3');
  };
  const toggleTag=(t)=>setTags(ts=>ts.includes(t)?ts.filter(x=>x!==t):[...ts,t]);

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:WH}}>
      <StatusBar/>
      <TopHeader title="New Order" onBack={goBack}/>
      <StepProgress steps={4} current={2}/>
      <div style={{fontSize:12,color:SL,padding:'0 14px 10px'}}>Step 2 of 4 — Garment Details</div>
      <div style={{flex:1,overflowY:'auto'}}>
        <SectionLabel text="Garment Type"/>
        <div style={{display:'flex',flexWrap:'wrap',gap:8,padding:'0 14px 14px'}}>
          {GARMENT_TYPES.map(g=>(
            <div key={g} onClick={()=>setGarmentType(g)} style={{padding:'7px 14px',borderRadius:20,border:`1.5px solid ${g===garmentType?CR:BORDER}`,background:g===garmentType?'#fef2f4':WH,color:g===garmentType?CR:'#334155',fontSize:13,fontWeight:500,cursor:'pointer',transition:'all .15s'}}>{g}</div>
          ))}
        </div>
        <div style={{padding:'0 14px 14px'}}><TextareaInput label="Description & Style Notes" value={desc} onChange={setDesc} rows={4} placeholder="e.g. Heavy embroidery, Banarasi base, sage green dupatta. Flare panels."/></div>
        <SectionLabel text="Order Tags"/>
        <div style={{display:'flex',flexWrap:'wrap',gap:7,padding:'0 14px 14px'}}>
          {ALL_TAGS.map(t=>(
            <div key={t} onClick={()=>toggleTag(t)} style={{padding:'5px 12px',borderRadius:20,border:`1.5px solid ${tags.includes(t)?CR:BORDER}`,background:tags.includes(t)?'#fef2f4':WH,color:tags.includes(t)?CR:SL,fontSize:12,cursor:'pointer',transition:'all .15s'}}>{t}</div>
          ))}
        </div>
        <SectionLabel text="Reference Image"/>
        <div style={{margin:'0 14px 20px',border:`2px dashed ${BORDER}`,borderRadius:12,padding:20,textAlign:'center',cursor:'pointer',color:SL}}>
          <div style={{fontSize:24,marginBottom:5}}>📷</div>
          <div style={{fontSize:13}}>Tap to add reference image</div>
          <div style={{fontSize:11,opacity:.7,marginTop:2}}>Max 3 images · JPEG or PNG</div>
        </div>
      </div>
      <div style={{padding:'12px 14px 20px',background:WH,borderTop:`1px solid ${BORDER}`}}>
        <Btn label="Continue →" onClick={next} disabled={!garmentType}/>
      </div>
    </div>
  );
};

/* ── NEW ORDER S3: MEASUREMENTS ── */
const OrderS3Screen = () => {
  const {navigate,goBack}=window.useNav();
  const {newOrder,clients,dispatch}=window.useApp();
  const {StatusBar,TopHeader,StepProgress,SectionLabel,InfoBanner,Btn,Btn2,MeasRow,WH,BG,BORDER,SL,CR}=window;
  const client=newOrder.client;
  const baseMeas=client?.measurements||{};
  const [meas,setMeas]=useState({...baseMeas,...newOrder.measurements});
  const [notes,setNotes]=useState('');

  const next=()=>{
    dispatch({type:'UPDATE_NEW_ORDER',data:{measurements:meas,step:4}});
    navigate('orderS4');
  };

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:WH}}>
      <StatusBar/>
      <TopHeader title="New Order" onBack={goBack}/>
      <StepProgress steps={4} current={3}/>
      <div style={{fontSize:12,color:SL,padding:'0 14px 6px'}}>Step 3 of 4 — Measurements</div>
      {client&&<InfoBanner text={`Using saved ${newOrder.garmentType} measurements for ${client.name}`} color="blue"/>}
      <div style={{flex:1,overflowY:'auto'}}>
        <div style={{display:'flex',gap:7,padding:'10px 14px 8px',borderBottom:`1px solid ${BORDER}`}}>
          {['Blouse','Lehenga','Kurti'].map((t,i)=>(
            <div key={t} style={{padding:'5px 14px',borderRadius:20,background:i===0?CR:BG,color:i===0?'#fff':SL,fontSize:13,cursor:'pointer',fontWeight:i===0?500:400}}>{t}</div>
          ))}
        </div>
        <div style={{padding:'0 14px'}}>
          {Object.entries(meas).map(([k,v])=>(
            <MeasRow key={k} label={k} value={v} onChange={val=>setMeas(m=>({...m,[k]:val}))}/>
          ))}
          {Object.keys(meas).length===0&&['Bust','Waist','Hip','Shoulder Width','Sleeve Length','Back Length','Front Length'].map(k=>(
            <MeasRow key={k} label={k} value="" onChange={val=>setMeas(m=>({...m,[k]:val}))}/>
          ))}
        </div>
        <div style={{padding:'14px'}}>
          <div style={{fontSize:12,color:SL,fontWeight:500,marginBottom:5}}>Notes</div>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={2} placeholder="Fitting preferences, special instructions…"
            style={{background:WH,border:`1px solid ${BORDER}`,borderRadius:11,padding:'12px 14px',fontSize:14,width:'100%',outline:'none',color:'#0f172a',resize:'none'}}
            onFocus={e=>e.target.style.borderColor=CR} onBlur={e=>e.target.style.borderColor=BORDER}/>
        </div>
        <div style={{height:80}}/>
      </div>
      <div style={{padding:'12px 14px',background:WH,borderTop:`1px solid ${BORDER}`,display:'flex',gap:7}}>
        <Btn label="Continue →" onClick={next}/>
      </div>
    </div>
  );
};

/* ── NEW ORDER S4: DELIVERY ── */
const OrderS4Screen = () => {
  const {navigate,goBack}=window.useNav();
  const {newOrder,dispatch}=window.useApp();
  const {StatusBar,TopHeader,StepProgress,SectionLabel,InfoBanner,Btn,Avatar,WH,BG,BORDER,SL,CR,DN}=window;
  const TAILORS=window.TAILORS;
  const [tailor,setTailor]=useState(newOrder.tailor||TAILORS[0]);
  const [date,setDate]=useState(newOrder.deliveryDate||'27 Apr 2025');

  const next=()=>{
    dispatch({type:'UPDATE_NEW_ORDER',data:{tailor,deliveryDate:date,step:5}});
    navigate('orderReview');
  };

  const dates=['20 Apr 2025','27 Apr 2025','2 May 2025','8 May 2025','15 May 2025','22 May 2025'];

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:WH}}>
      <StatusBar/>
      <TopHeader title="New Order" onBack={goBack}/>
      <StepProgress steps={4} current={4}/>
      <div style={{fontSize:12,color:SL,padding:'0 14px 10px'}}>Step 4 of 4 — Delivery & Assign Tailor</div>
      <div style={{flex:1,overflowY:'auto'}}>
        <SectionLabel text="Delivery Date"/>
        <div style={{display:'flex',flexWrap:'wrap',gap:8,padding:'0 14px 14px'}}>
          {dates.map(d=>(
            <div key={d} onClick={()=>setDate(d)} style={{padding:'8px 14px',borderRadius:10,border:`2px solid ${d===date?CR:BORDER}`,background:d===date?'#fef2f4':WH,color:d===date?CR:DN,fontSize:13,cursor:'pointer',fontWeight:d===date?600:400,transition:'all .15s'}}>{d}</div>
          ))}
        </div>
        <InfoBanner text={`📅 Selected: ${date} · Delivery reminder sent 48 hrs before`} color="amber"/>
        <SectionLabel text="Assign Tailor"/>
        {TAILORS.map(t=>(
          <div key={t.id} onClick={()=>setTailor(t)} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',margin:'0 14px 8px',borderRadius:11,border:`2px solid ${tailor?.id===t.id?CR:BORDER}`,background:tailor?.id===t.id?'#fef2f4':WH,cursor:'pointer',transition:'all .15s'}}>
            <Avatar initials={t.initials} color={t.color} textColor={t.textColor} size={38}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:500,fontSize:14}}>{t.name}</div>
              <div style={{fontSize:11,color:SL,marginTop:1}}>{t.active} active orders</div>
            </div>
            {tailor?.id===t.id&&<div style={{width:20,height:20,background:CR,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12}}>✓</div>}
          </div>
        ))}
        <InfoBanner text="WhatsApp with order details & measurements will be sent to the assigned tailor." color="amber"/>
        <div style={{height:80}}/>
      </div>
      <div style={{padding:'12px 14px 20px',background:WH,borderTop:`1px solid ${BORDER}`}}>
        <Btn label="Review Order →" onClick={next} disabled={!tailor}/>
      </div>
    </div>
  );
};

/* ── ORDER REVIEW ── */
const OrderReviewScreen = () => {
  const {navigate,goBack,resetTo}=window.useNav();
  const {newOrder,dispatch}=window.useApp();
  const {StatusBar,Csm,InfoBanner,Btn,StatusPill,Tag,Avatar,WH,BG,BORDER,SL,DN,CR,SL:_}=window;
  const {client,garmentType,description,tags,measurements,deliveryDate,tailor}=newOrder;

  const place=()=>{
    const order={clientId:client?.id,garment:garmentType,garmentType,description,tags,measurements,due:deliveryDate,amount:0,type:'order',tailor:tailor?.name||'Ramesh K.',tailorId:tailor?.id||1};
    dispatch({type:'ADD_ORDER',order});
    navigate('orderList');
  };

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:BG}}>
      <StatusBar/>
      <div style={{background:DN,padding:'14px 18px',display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
        <button onClick={goBack} style={{width:30,height:30,borderRadius:7,background:'rgba(255,255,255,.12)',border:'none',cursor:'pointer',fontSize:16,color:'#fff'}}>←</button>
        <h1 style={{fontSize:17,fontWeight:600,color:'#fff',flex:1}}>Review Order</h1>
        <span style={{background:'#eff6ff',color:'#2563eb',fontSize:10,padding:'2px 8px',borderRadius:20,fontWeight:600}}>New Order</span>
      </div>
      <div style={{flex:1,overflowY:'auto',paddingTop:10}}>
        <Csm mb={8}>
          <div style={{fontSize:10,color:SL,fontWeight:600,textTransform:'uppercase',letterSpacing:.5,marginBottom:7}}>Client</div>
          <div style={{display:'flex',alignItems:'center',gap:9}}>
            <Avatar initials={client?.initials} color={client?.color} textColor={client?.textColor||'#fff'}/>
            <div><div style={{fontWeight:600,fontSize:14}}>{client?.name}</div><div style={{fontSize:11,color:SL}}>{client?.phone}</div></div>
          </div>
        </Csm>
        <Csm mb={8}>
          <div style={{fontSize:10,color:SL,fontWeight:600,textTransform:'uppercase',letterSpacing:.5,marginBottom:7}}>Garment</div>
          <div style={{fontWeight:600,fontSize:14,marginBottom:5}}>{garmentType}</div>
          {description&&<div style={{fontSize:13,color:DN,background:BG,borderRadius:8,padding:'9px 11px',lineHeight:1.6}}>{description}</div>}
          {tags?.length>0&&<div style={{display:'flex',gap:5,marginTop:8}}>{tags.map(t=><Tag key={t} label={t}/>)}</div>}
        </Csm>
        <Csm mb={8}>
          <div style={{fontSize:10,color:SL,fontWeight:600,textTransform:'uppercase',letterSpacing:.5,marginBottom:7}}>Measurements</div>
          {Object.entries(measurements||{}).slice(0,4).map(([k,v])=>(
            <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:`1px solid ${BORDER}`,fontSize:13}}>
              <span style={{color:SL}}>{k}</span><span style={{fontWeight:500}}>{v} in</span>
            </div>
          ))}
        </Csm>
        <Csm mb={8}>
          <div style={{fontSize:10,color:SL,fontWeight:600,textTransform:'uppercase',letterSpacing:.5,marginBottom:7}}>Delivery & Tailor</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><div style={{fontSize:13,fontWeight:500}}>Due: {deliveryDate}</div><div style={{fontSize:11,color:SL,marginTop:2}}>Assigned to {tailor?.name}</div></div>
          </div>
        </Csm>
        <InfoBanner text="WhatsApp with order summary & measurements will be sent to the assigned tailor on placement." color="amber"/>
        <div style={{padding:'12px 14px 20px'}}><Btn label="Place Order ✓" onClick={place}/></div>
      </div>
    </div>
  );
};

/* ── ORDER DETAIL ── */
const OrderDetailScreen = ({orderId}) => {
  const {navigate,goBack}=window.useNav();
  const {orders,clients,messages,dispatch}=window.useApp();
  const {StatusBar,TabBar,Tag,StatusPill,Avatar,Csm,InfoBanner,Btn,Btn2,SectionLabel,WH,BG,BORDER,SL,DN,CR,WARNING,SUCCESS,DANGER}=window;
  const [tab,setTab]=useState(0);
  const [msg,setMsg]=useState('');
  const order=orders.find(o=>o.id===orderId)||orders[0];
  const client=clients.find(c=>c.id===order?.clientId);
  const msgs=messages[order?.id]||[];

  const updateStatus=(s)=>dispatch({type:'UPDATE_STATUS',id:order.id,status:s});
  const sendMsg=()=>{if(!msg.trim()) return; dispatch({type:'SEND_MSG',orderId:order.id,text:msg.trim()}); setMsg('');};

  if(!order) return null;

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:BG}}>
      <StatusBar dark/>
      <div style={{background:DN,padding:'14px 18px',display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
        <button onClick={goBack} style={{width:30,height:30,borderRadius:7,background:'rgba(255,255,255,.12)',border:'none',cursor:'pointer',fontSize:16,color:'#fff'}}>←</button>
        <h1 style={{fontSize:15,fontWeight:600,color:'#fff',flex:1}}>{order.id}</h1>
        {order.type==='alteration'&&<span style={{background:'#eff6ff',color:'#2563eb',fontSize:10,padding:'2px 8px',borderRadius:20,fontWeight:600}}>Alteration</span>}
        <span style={{color:'#94a3b8',fontSize:18,cursor:'pointer'}}>⋮</span>
      </div>
      <div style={{background:'#fffbeb',padding:'9px 14px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0,borderBottom:'1px solid #fde68a'}}>
        <StatusPill status={order.status}/>
        <span style={{fontSize:11,color:WARNING,fontWeight:500}}>Due: {order.due}</span>
      </div>
      <TabBar tabs={['Details','Chat','Invoice']} active={tab} onChange={setTab}/>

      {tab===0&&(
        <div style={{flex:1,overflowY:'auto',paddingTop:10}}>
          <Csm mb={8}>
            <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:9}}>
              <Avatar initials={client?.initials} color={client?.color} textColor={client?.textColor||'#fff'}/>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{client?.name}</div><div style={{fontSize:11,color:SL}}>{order.garment}</div></div>
              <div style={{display:'flex',gap:4}}>{order.tags?.map(t=><Tag key={t} label={t}/>)}</div>
            </div>
            {order.description&&<><div style={{height:1,background:BORDER,marginBottom:8}}/><div style={{fontSize:13,color:DN,lineHeight:1.6}}>{order.description}</div></>}
          </Csm>
          <div style={{margin:'0 14px 9px',background:BG,borderRadius:11,height:90,display:'flex',alignItems:'center',justifyContent:'center',border:`1px dashed ${BORDER}`,cursor:'pointer'}}>
            <div style={{textAlign:'center',color:SL}}><div style={{fontSize:22,marginBottom:3}}>🖼</div><div style={{fontSize:12}}>Reference Image</div></div>
          </div>
          <SectionLabel text="Update Status"/>
          <div style={{display:'flex',gap:5,flexWrap:'wrap',padding:'0 14px 10px'}}>
            {STATUS_LIST.map(s=>(
              <div key={s} onClick={()=>updateStatus(s)} style={{padding:'7px 12px',borderRadius:7,border:`1.5px solid ${s===order.status?CR:BORDER}`,background:s===order.status?CR:WH,fontSize:12,fontWeight:500,color:s===order.status?'#fff':SL,cursor:'pointer',transition:'all .2s'}}>{s}</div>
            ))}
          </div>
          <Csm mb={8}>
            <div style={{fontSize:11,color:SL,fontWeight:600,marginBottom:7}}>ASSIGNED TAILOR</div>
            <div style={{display:'flex',alignItems:'center',gap:9}}>
              <Avatar initials="RK" color="#ecfdf5" textColor="#059669" size={30} radius={8}/>
              <div style={{fontSize:13,fontWeight:500}}>{order.tailor}</div>
              <div style={{marginLeft:'auto',fontSize:12,color:CR,cursor:'pointer'}}>Reassign</div>
            </div>
          </Csm>
          <div style={{padding:'0 14px 14px',display:'flex',gap:7}}>
            <Btn label="💬 Chat with Tailor" onClick={()=>setTab(1)} style={{fontSize:13}}/>
          </div>
          <div style={{height:8}}/>
        </div>
      )}

      {tab===1&&(
        <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{flex:1,overflowY:'auto',padding:'14px',background:'#fdfbf7',display:'flex',flexDirection:'column',gap:0}}>
            {msgs.length===0&&<div style={{textAlign:'center',color:SL,fontSize:13,padding:30}}>No messages yet. Start the conversation.</div>}
            {msgs.map((m,i)=>(
              <div key={i} style={{marginBottom:7}}>
                {m.from!=='tailor'&&m.name&&<div style={{fontSize:10,color:SL,marginBottom:3,paddingLeft:2}}>{m.name}</div>}
                <div style={{display:'flex',justifyContent:m.from==='tailor'?'flex-start':'flex-end'}}>
                  <div style={{maxWidth:'76%',padding:'9px 13px',borderRadius:m.from==='tailor'?'14px 14px 14px 3px':'14px 14px 3px 14px',background:m.from==='tailor'?WH:CR,color:m.from==='tailor'?DN:'#fff',fontSize:13,lineHeight:1.5,border:m.from==='tailor'?`1px solid ${BORDER}`:'none'}}>
                    {m.text}
                  </div>
                </div>
                <div style={{fontSize:10,color:SL,textAlign:m.from==='tailor'?'left':'right',marginTop:3,paddingLeft:m.from!=='tailor'?0:2}}>{m.time}</div>
              </div>
            ))}
          </div>
          <div style={{background:WH,borderTop:`1px solid ${BORDER}`,padding:'10px 14px',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
            <div style={{flex:1,background:BG,border:`1px solid ${BORDER}`,borderRadius:22,display:'flex',alignItems:'center',padding:'9px 14px',gap:8}}>
              <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type a message…" onKeyDown={e=>e.key==='Enter'&&sendMsg()}
                style={{flex:1,border:'none',outline:'none',fontSize:14,background:'transparent',color:DN}}/>
            </div>
            <div onClick={sendMsg} style={{width:38,height:38,background:CR,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,color:'#fff',cursor:'pointer'}}>→</div>
          </div>
        </div>
      )}

      {tab===2&&(
        <div style={{flex:1,overflowY:'auto'}}>
          <InvoicePanelView order={order} client={client} onPaid={()=>dispatch({type:'MARK_PAID',id:order.id})}/>
        </div>
      )}

      <window.AdminNav active={2}/>
    </div>
  );
};

/* ── INVOICE INLINE (used in order detail tab) ── */
const InvoicePanelView = ({order,client,onPaid}) => {
  const {DN,WH,BG,BORDER,SL,CR,SUCCESS}=window;
  const [paid,setPaid]=useState(order.paid);
  const [showPaid,setShowPaid]=useState(false);

  const markPaid=()=>{setPaid(true);onPaid&&onPaid();setShowPaid(false);};

  const items=order.garment==='Cotton Blouse'
    ?[{l:'Waist alteration',v:'₹800'},{l:'Sleeve length (right only)',v:'₹500'},{l:'Finishing & pressing',v:'₹200'}]
    :[{l:`${order.garment} — stitching`,v:`₹${Math.round(order.amount*.6).toLocaleString()}`},{l:'Embroidery / detail work',v:`₹${Math.round(order.amount*.3).toLocaleString()}`},{l:'Finishing',v:`₹${Math.round(order.amount*.1).toLocaleString()}`}];

  return (
    <div style={{padding:'14px 0'}}>
      <div style={{background:WH,borderRadius:14,margin:'0 14px 10px',border:`1px solid ${BORDER}`,overflow:'hidden',boxShadow:'0 4px 14px rgba(0,0,0,.05)'}}>
        <div style={{background:DN,padding:'14px 18px'}}>
          <div style={{fontFamily:"'DM Serif Display',serif",color:'#fff',fontSize:17}}>Priya's Couture Studio</div>
          <div style={{fontSize:11,color:'#64748b',marginTop:2}}>Lajpat Nagar, New Delhi</div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
            <div><div style={{color:'#94a3b8',fontSize:10}}>INVOICE</div><div style={{color:'#fff',fontSize:13,fontWeight:600}}>#{order.id.replace('ORD','INV').replace('ALT','INV')}</div></div>
            <div style={{textAlign:'right'}}><div style={{color:'#94a3b8',fontSize:10}}>DATE</div><div style={{color:'#fff',fontSize:13}}>{new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div></div>
          </div>
        </div>
        <div style={{padding:'12px 18px',borderBottom:`1px solid ${BORDER}`}}>
          <div style={{fontSize:10,color:SL,fontWeight:600,marginBottom:5}}>BILLED TO</div>
          <div style={{fontWeight:600,fontSize:14}}>{client?.name}</div>
          <div style={{fontSize:12,color:SL}}>{client?.phone}</div>
          {order.type==='alteration'&&<div style={{background:'#eff6ff',borderRadius:7,padding:'7px 10px',marginTop:8,fontSize:12,color:'#1e40af'}}><strong>Alteration:</strong> {order.description?.slice(0,60)}</div>}
        </div>
        <div style={{padding:'12px 18px',borderBottom:`1px solid ${BORDER}`}}>
          {items.map((it,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:i<items.length-1?`1px solid ${BORDER}`:'none',fontSize:13}}>
              <span style={{color:'#374151'}}>{it.l}</span><span style={{fontWeight:500}}>{it.v}</span>
            </div>
          ))}
        </div>
        <div style={{padding:'12px 18px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:15,fontWeight:600,color:DN,paddingBottom:8}}>
            <span>Total</span><span>₹{order.amount.toLocaleString()}</span>
          </div>
          <div style={{background:paid?'#ecfdf5':'#fffbeb',borderRadius:9,padding:'9px 12px',fontSize:12,color:paid?'#065f46':'#92400e'}}>
            {paid?'✓ Paid':'Payment on delivery · Status: Pending'} · Created by Priya M.
          </div>
        </div>
      </div>
      <div style={{padding:'0 14px 5px',display:'flex',gap:7}}>
        <window.Btn label="Share via WhatsApp" style={{fontSize:13,flex:1}}/>
        <button style={{background:BG,border:`1px solid ${BORDER}`,borderRadius:11,padding:'12px 14px',fontSize:13,cursor:'pointer'}}>PDF</button>
      </div>
      {!paid&&<div style={{padding:'5px 14px 14px'}}><window.Btn label={`Mark as Paid — ₹${order.amount.toLocaleString()}`} onClick={()=>setShowPaid(true)} color={SUCCESS}/></div>}
      {paid&&<div style={{margin:'5px 14px 14px',background:'#ecfdf5',borderRadius:11,padding:'12px',textAlign:'center',fontSize:13,color:'#065f46',fontWeight:600}}>✓ Payment Received</div>}

      {showPaid&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'flex-end',zIndex:100}} onClick={()=>setShowPaid(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:WH,borderRadius:'20px 20px 0 0',padding:'20px 18px',width:'100%',maxWidth:390,margin:'0 auto'}}>
            <div style={{width:36,height:4,borderRadius:2,background:BORDER,margin:'0 auto 16px'}}/>
            <div style={{fontWeight:600,fontSize:17,marginBottom:4}}>Confirm Payment</div>
            <div style={{fontSize:13,color:SL,marginBottom:16}}>Mark ₹{order.amount.toLocaleString()} as received from {client?.name}</div>
            <div style={{display:'flex',gap:7,marginBottom:12}}>
              {['Cash','UPI','Card','Cheque'].map((m,i)=>(
                <div key={m} style={{flex:1,padding:'8px 4px',borderRadius:8,border:`2px solid ${i===0?CR:BORDER}`,background:i===0?'#fef2f4':WH,textAlign:'center',fontSize:12,color:i===0?CR:SL,cursor:'pointer',fontWeight:i===0?600:400}}>{m}</div>
              ))}
            </div>
            <window.Btn label="Confirm Payment ✓" onClick={markPaid} color={SUCCESS}/>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── INVOICE DETAIL (from billing history) ── */
const InvoiceDetailScreen = ({orderId}) => {
  const {goBack}=window.useNav();
  const {orders,clients,dispatch}=window.useApp();
  const {StatusBar,TopHeader,WH,BG,BORDER}=window;
  const order=orders.find(o=>o.id===orderId)||orders[0];
  const client=clients.find(c=>c.id===order?.clientId);
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:BG}}>
      <StatusBar dark/>
      <div style={{background:'#0f172a',padding:'14px 18px',display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
        <button onClick={goBack} style={{width:30,height:30,borderRadius:7,background:'rgba(255,255,255,.12)',border:'none',cursor:'pointer',fontSize:16,color:'#fff'}}>←</button>
        <h1 style={{fontSize:15,fontWeight:600,color:'#fff',flex:1}}>Invoice #{order?.id}</h1>
        {order?.type==='alteration'&&<span style={{background:'#eff6ff',color:'#2563eb',fontSize:10,padding:'2px 8px',borderRadius:20,fontWeight:600}}>Alteration</span>}
      </div>
      <div style={{flex:1,overflowY:'auto'}}>
        <InvoicePanelView order={order} client={client} onPaid={()=>dispatch({type:'MARK_PAID',id:order.id})}/>
      </div>
      <window.AdminNav active={3}/>
    </div>
  );
};

Object.assign(window,{OrderS1Screen,OrderS2Screen,OrderS3Screen,OrderS4Screen,OrderReviewScreen,OrderDetailScreen,InvoiceDetailScreen,InvoicePanelView});
