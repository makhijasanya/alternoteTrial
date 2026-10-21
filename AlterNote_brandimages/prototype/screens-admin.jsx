// AlterNote — Admin Screens
const { useState, useMemo } = React;

const ADMIN_TABS = [
  {icon:'🏠',label:'Home',screen:'dashboard'},
  {icon:'👥',label:'Clients',screen:'clientList'},
  {icon:'📦',label:'Orders',screen:'orderList'},
  {icon:'🧾',label:'Billing',screen:'billingHistory'},
  {icon:'⚙️',label:'Settings',screen:'settings'},
];

const AdminNav = ({active}) => {
  const {navigate}=window.useNav();
  const {BottomNav}=window;
  return <BottomNav tabs={ADMIN_TABS} active={active} onSelect={i=>navigate(ADMIN_TABS[i].screen)}/>;
};

/* ── DASHBOARD ── */
const DashboardScreen = () => {
  const {navigate}=window.useNav();
  const {orders,clients,profile}=window.useApp();
  const {StatusBar,TopHeader,SectionLabel,OrderCard,MetricCard,BarChart,CR,DN,WH,BG,BORDER,SL,WARNING}=window;
  const active=orders.filter(o=>!['Delivered'].includes(o.status));
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:BG}}>
      <StatusBar/>
      <div style={{background:WH,padding:'14px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:`1px solid ${BORDER}`,flexShrink:0}}>
        <div>
          <div style={{fontSize:11,color:SL}}>Good morning,</div>
          <div style={{fontSize:17,fontWeight:600,color:DN}}>Priya's Couture Studio</div>
        </div>
        <div style={{display:'flex',gap:7}}>
          <div style={{width:34,height:34,borderRadius:9,background:BG,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,position:'relative',cursor:'pointer'}} onClick={()=>{}}>🔔
            <div style={{position:'absolute',top:-2,right:-2,width:7,height:7,background:CR,borderRadius:'50%',border:'2px solid #fff'}}/>
          </div>
          <div style={{width:34,height:34,borderRadius:9,background:CR,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600,fontSize:13,cursor:'pointer'}}>{profile.initials}</div>
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto'}}>
        <div style={{display:'flex',gap:9,padding:14,background:WH,borderBottom:`1px solid ${BORDER}`}}>
          <MetricCard label="This Month" value="₹1.4L" sub="↑ 18% vs last month"/>
          <MetricCard label="Pending" value="₹34K" sub="6 invoices" warn/>
        </div>
        <div style={{background:WH,padding:'0 18px 14px',borderBottom:`1px solid ${BORDER}`}}>
          <div style={{fontSize:11,color:SL,fontWeight:600,marginBottom:8}}>Revenue — Last 6 Weeks</div>
          <BarChart data={[{v:82,l:'W1'},{v:110,l:'W2'},{v:45,l:'W3'},{v:130,l:'W4'},{v:118,l:'W5'},{v:140,l:'W6'}]}/>
        </div>
        <div style={{padding:14,background:BG}}>
          <div style={{fontSize:11,fontWeight:600,color:SL,textTransform:'uppercase',letterSpacing:.5,marginBottom:8}}>Quick Actions</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7}}>
            {[['➕','New Order','orderS1'],['👤','New Client','addClient'],['📏','Measurements','clientList'],['🧾','Invoice','billingHistory']].map(([ic,lb,sc])=>(
              <div key={lb} onClick={()=>navigate(sc)} style={{background:WH,borderRadius:11,padding:'12px 10px',border:`1px solid ${BORDER}`,cursor:'pointer',display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:18}}>{ic}</span><span style={{fontSize:12,fontWeight:500}}>{lb}</span>
              </div>
            ))}
          </div>
        </div>
        <SectionLabel text={`Active Orders (${active.length})`}/>
        {active.slice(0,3).map(o=>(
          <OrderCard key={o.id} order={o} client={clients.find(c=>c.id===o.clientId)} onClick={()=>navigate('orderDetail',{orderId:o.id})}/>
        ))}
        <div style={{height:8}}/>
      </div>
      <AdminNav active={0}/>
    </div>
  );
};

/* ── CLIENT LIST ── */
const ClientListScreen = () => {
  const {navigate}=window.useNav();
  const {clients}=window.useApp();
  const {StatusBar,TopHeader,SearchBar,FilterChips,ClientRow,FAB,Divider,WH,BG,BORDER}=window;
  const [q,setQ]=useState('');
  const [chip,setChip]=useState(0);
  const chips=['All','VIP','Bridal','Regular'];
  const filtered=useMemo(()=>clients.filter(c=>{
    const tagMatch=chip===0||c.tags?.includes(chips[chip]);
    const qMatch=!q||c.name.toLowerCase().includes(q.toLowerCase())||c.phone.includes(q);
    return tagMatch&&qMatch;
  }),[clients,q,chip]);
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:WH}}>
      <StatusBar/>
      <TopHeader title="Clients" right={()=>navigate('addClient')} rightLabel="+ Add"/>
      <SearchBar value={q} onChange={setQ} placeholder="Search by name, phone, tag…"/>
      <FilterChips chips={chips.map((c,i)=>{
        const count=i===0?clients.length:clients.filter(cl=>cl.tags?.includes(c)).length;
        return `${c} (${count})`;
      })} active={chip} onSelect={setChip}/>
      <Divider/>
      <div style={{flex:1,overflowY:'auto'}}>
        {filtered.map((c,i)=><ClientRow key={c.id} client={c} onClick={()=>navigate('clientProfile',{clientId:c.id})} last={i===filtered.length-1}/>)}
        {filtered.length===0&&<div style={{padding:40,textAlign:'center',color:'#94a3b8',fontSize:14}}>No clients found</div>}
        <div style={{height:60}}/>
      </div>
      <FAB onClick={()=>navigate('addClient')}/>
      <AdminNav active={1}/>
    </div>
  );
};

/* ── CLIENT PROFILE ── */
const ClientProfileScreen = ({clientId}) => {
  const {navigate,goBack}=window.useNav();
  const {clients,orders}=window.useApp();
  const {TabBar,Tag,Avatar,StatusPill,OrderCard,Divider,SectionLabel,Card,Csm,WH,BG,BORDER,SL,DN,CR,WARNING}=window;
  const [tab,setTab]=useState(0);
  const [meas,setMeas]=useState(null);
  const [measTab,setMeasTab]=useState(0);
  const client=clients.find(c=>c.id===clientId)||clients[0];
  const clientOrders=orders.filter(o=>o.clientId===client.id);
  if(!meas&&client.measurements) setMeas({...client.measurements});
  const measTabs=['Blouse','Lehenga','Kurti'];

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:BG}}>
      <div style={{background:DN,flexShrink:0}}>
        <div style={{padding:'14px 18px',display:'flex',alignItems:'center',gap:10}}>
          <button onClick={goBack} style={{width:30,height:30,borderRadius:7,background:'rgba(255,255,255,.12)',border:'none',cursor:'pointer',fontSize:16,color:'#fff'}}>←</button>
          <h1 style={{fontSize:17,fontWeight:600,color:'#fff',flex:1}}>Client Profile</h1>
          <span style={{color:'#94a3b8',fontSize:18,cursor:'pointer'}}>⋮</span>
        </div>
        <div style={{padding:'14px 18px 22px',display:'flex',alignItems:'center',gap:12}}>
          <Avatar initials={client.initials} color={client.color} textColor={client.textColor||'#fff'} size={54} radius={16}/>
          <div>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:'#fff'}}>{client.name}</div>
            <div style={{fontSize:12,color:'#94a3b8',marginTop:2}}>{client.phone}</div>
            <div style={{display:'flex',gap:5,marginTop:7}}>{client.tags?.map(t=><Tag key={t} label={t}/>)}</div>
          </div>
        </div>
      </div>
      <div style={{background:WH,display:'flex',borderBottom:`1px solid ${BORDER}`,flexShrink:0}}>
        {['📞 Call','💬 WhatsApp','➕ New Order'].map((a,i)=>(
          <div key={a} onClick={()=>{if(i===2)navigate('orderS1',{preselectedClientId:client.id});}} style={{flex:1,textAlign:'center',padding:11,fontSize:12,color:CR,borderRight:i<2?`1px solid ${BORDER}`:'none',cursor:'pointer'}}>{a}</div>
        ))}
      </div>
      <TabBar tabs={['Overview','Measurements','Orders']} active={tab} onChange={setTab}/>
      <div style={{flex:1,overflowY:'auto',paddingTop:10}}>
        {tab===0&&<>
          <Card mb={8}>
            <div style={{fontSize:11,color:SL,fontWeight:600,marginBottom:9}}>CLIENT SUMMARY</div>
            <div style={{display:'flex',gap:9}}>
              {[{v:clientOrders.length,l:'Orders'},{v:`₹${(client.lifetime/1000).toFixed(0)}K`,l:'Lifetime'},{v:client.pending?`₹${(client.pending/1000).toFixed(0)}K`:'₹0',l:'Pending',warn:!!client.pending}].map(m=>(
                <div key={m.l} style={{flex:1,background:BG,borderRadius:9,padding:11,textAlign:'center'}}>
                  <div style={{fontSize:19,fontWeight:700,color:m.warn?WARNING:DN}}>{m.v}</div>
                  <div style={{fontSize:10,color:SL}}>{m.l}</div>
                </div>
              ))}
            </div>
          </Card>
          {client.notes&&<Csm mb={8}><div style={{fontSize:11,color:SL,fontWeight:600,marginBottom:7}}>NOTES</div><div style={{fontSize:13,color:DN,lineHeight:1.6}}>{client.notes}</div></Csm>}
          <Csm mb={8}>
            <div style={{fontSize:11,color:SL,fontWeight:600,marginBottom:7}}>DETAILS</div>
            {[['Birthday',client.birthday||'—'],['Email',client.email||'—'],['Client Since',client.since||'—']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:`1px solid ${BORDER}`,fontSize:13}}>
                <span style={{color:SL}}>{k}</span><span>{v}</span>
              </div>
            ))}
          </Csm>
        </>}
        {tab===1&&<>
          <div style={{display:'flex',gap:7,padding:'10px 14px',background:WH,borderBottom:`1px solid ${BORDER}`}}>
            {measTabs.map((t,i)=>(
              <div key={t} onClick={()=>setMeasTab(i)} style={{background:i===measTab?CR:BG,color:i===measTab?'#fff':SL,padding:'5px 14px',borderRadius:20,fontSize:13,cursor:'pointer',fontWeight:i===measTab?500:400}}>{t}</div>
            ))}
          </div>
          <div style={{background:'#fef2f4',padding:'9px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:12,color:CR}}>Updated 14 Apr 2025 by Anika S.</span>
            <span style={{fontSize:12,color:CR,cursor:'pointer'}}>Share PDF</span>
          </div>
          <div style={{padding:'0 14px',background:WH}}>
            {meas&&Object.entries(meas).map(([k,v])=>(
              <window.MeasRow key={k} label={k} value={v} onChange={val=>setMeas(m=>({...m,[k]:val}))}/>
            ))}
          </div>
          <div style={{padding:'12px 14px 20px'}}><window.Btn label="Save Measurements"/></div>
        </>}
        {tab===2&&<>
          <window.FilterChips chips={['All','Active','Completed','Alterations']} active={0} onSelect={()=>{}}/>
          {clientOrders.length===0&&<div style={{padding:40,textAlign:'center',color:'#94a3b8',fontSize:14}}>No orders yet</div>}
          {clientOrders.map(o=><OrderCard key={o.id} order={o} client={client} onClick={()=>navigate('orderDetail',{orderId:o.id})}/>)}
          <div style={{padding:'8px 14px 16px'}}><window.Btn label="+ New Order for Client" onClick={()=>navigate('orderS1',{preselectedClientId:client.id})}/></div>
        </>}
        <div style={{height:8}}/>
      </div>
      <AdminNav active={1}/>
    </div>
  );
};

/* ── ADD CLIENT ── */
const AddClientScreen = () => {
  const {goBack}=window.useNav();
  const {dispatch}=window.useApp();
  const {StatusBar,TopHeader,SectionLabel,Btn,Input,TextareaInput,WH,BG,BORDER,CR,SL}=window;
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('+91 ');
  const [tags,setTags]=useState([]);
  const [notes,setNotes]=useState('');
  const allTags=['VIP','Bridal','Regular','Referral'];
  const save=()=>{
    if(!name||phone.length<6) return;
    const initials=name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    dispatch({type:'ADD_CLIENT',client:{name,phone,initials,color:BG,textColor:'#64748b',tags:tags.length?tags:['Regular'],notes}});
    goBack();
  };
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:WH}}>
      <StatusBar/>
      <TopHeader title="Add Client" onBack={goBack}/>
      <div style={{flex:1,overflowY:'auto',padding:'14px 0'}}>
        <div style={{padding:'0 14px 10px'}}><Input label="Full Name *" value={name} onChange={setName} placeholder="e.g. Meera Kapoor"/></div>
        <div style={{padding:'0 14px 10px'}}><Input label="Mobile Number *" value={phone} onChange={setPhone}/></div>
        <SectionLabel text="Tags"/>
        <div style={{display:'flex',gap:7,padding:'0 14px 14px',flexWrap:'wrap'}}>
          {allTags.map(t=>(
            <div key={t} onClick={()=>setTags(ts=>ts.includes(t)?ts.filter(x=>x!==t):[...ts,t])} style={{padding:'5px 12px',borderRadius:20,border:`1.5px solid ${tags.includes(t)?CR:'#e2e8f0'}`,background:tags.includes(t)?'#fef2f4':'#fff',color:tags.includes(t)?CR:'#64748b',fontSize:12,cursor:'pointer',transition:'all .15s'}}>{t}</div>
          ))}
        </div>
        <div style={{padding:'0 14px 10px'}}><TextareaInput label="Notes (optional)" value={notes} onChange={setNotes} rows={3} placeholder="Style preferences, fitting notes…"/></div>
        <div style={{padding:'14px'}}><Btn label="Save Client" onClick={save} disabled={!name||phone.length<6}/></div>
      </div>
      <AdminNav active={1}/>
    </div>
  );
};

/* ── ORDER LIST ── */
const OrderListScreen = () => {
  const {navigate}=window.useNav();
  const {orders,clients}=window.useApp();
  const {StatusBar,TopHeader,SearchBar,FilterChips,OrderCard,FAB,WH,BG,BORDER}=window;
  const [q,setQ]=useState('');
  const [chip,setChip]=useState(0);
  const statuses=[null,'In Progress','For Fitting','Received','Completed','Delivered'];
  const labels=['All','In Progress','Fitting','Received','Done'];

  const filtered=useMemo(()=>orders.filter(o=>{
    const sMatch=chip===0||o.status===statuses[chip];
    const cl=clients.find(c=>c.id===o.clientId);
    const qMatch=!q||(cl?.name||'').toLowerCase().includes(q.toLowerCase())||o.garment.toLowerCase().includes(q.toLowerCase());
    return sMatch&&qMatch;
  }),[orders,clients,q,chip]);

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:BG}}>
      <StatusBar/>
      <TopHeader title="Orders"/>
      <div style={{background:WH,borderBottom:`1px solid ${BORDER}`,flexShrink:0}}>
        <SearchBar value={q} onChange={setQ} placeholder="Search orders…"/>
        <FilterChips chips={labels.map((l,i)=>{
          const cnt=i===0?orders.length:orders.filter(o=>o.status===statuses[i]).length;
          return `${l} (${cnt})`;
        })} active={chip} onSelect={setChip}/>
      </div>
      <div style={{flex:1,overflowY:'auto',paddingTop:6}}>
        {filtered.map(o=><OrderCard key={o.id} order={o} client={clients.find(c=>c.id===o.clientId)} onClick={()=>navigate('orderDetail',{orderId:o.id})}/>)}
        {filtered.length===0&&<div style={{padding:40,textAlign:'center',color:'#94a3b8',fontSize:14}}>No orders found</div>}
        <div style={{height:70}}/>
      </div>
      <FAB onClick={()=>navigate('orderS1')}/>
      <AdminNav active={2}/>
    </div>
  );
};

/* ── BILLING HISTORY ── */
const BillingHistoryScreen = () => {
  const {navigate}=window.useNav();
  const {orders,clients}=window.useApp();
  const {StatusBar,TopHeader,FilterChips,StatusPill,WH,BG,BORDER,SL,DN,SUCCESS,WARNING,CR}=window;
  const [chip,setChip]=useState(0);
  const labels=['All','Paid','Pending'];
  const filtered=orders.filter(o=>{
    if(chip===1) return o.paid;
    if(chip===2) return !o.paid&&o.status!=='Received';
    return true;
  });

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:BG}}>
      <StatusBar/>
      <TopHeader title="Billing History"/>
      <FilterChips chips={['All','Paid','Pending']} active={chip} onSelect={setChip}/>
      <div style={{flex:1,overflowY:'auto'}}>
        {filtered.map(o=>{
          const cl=clients.find(c=>c.id===o.clientId);
          return (
            <div key={o.id} onClick={()=>navigate('invoiceDetail',{orderId:o.id})} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',background:WH,borderBottom:`1px solid ${BORDER}`,cursor:'pointer'}}>
              <div style={{width:36,height:36,borderRadius:10,background:o.paid?'#ecfdf5':'#fef2f4',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>{o.paid?'✓':'🧾'}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:14}}>{cl?.name}</div>
                <div style={{fontSize:11,color:SL,marginTop:1}}>{o.garment} · {o.id}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontWeight:600,fontSize:14,color:DN}}>₹{o.amount.toLocaleString()}</div>
                <div style={{fontSize:11,color:o.paid?SUCCESS:WARNING,marginTop:2,fontWeight:500}}>{o.paid?'Paid':'Pending'}</div>
              </div>
            </div>
          );
        })}
        <div style={{height:8}}/>
      </div>
      <AdminNav active={3}/>
    </div>
  );
};

/* ── ANALYTICS ── */
const AnalyticsScreen = () => {
  const {orders,clients}=window.useApp();
  const {StatusBar,TopHeader,MetricCard,BarChart,SectionLabel,WH,BG,BORDER,SL,DN,SUCCESS,WARNING,CR}=window;
  const active=orders.filter(o=>!['Delivered'].includes(o.status)).length;
  const overdue=orders.filter(o=>o.status==='In Progress'&&o.tags?.includes('Rush')).length;
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:BG}}>
      <StatusBar/>
      <TopHeader title="Analytics" right={()=>{}} rightLabel="Apr 2025"/>
      <div style={{flex:1,overflowY:'auto'}}>
        <div style={{display:'flex',gap:9,padding:14,background:WH,borderBottom:`1px solid ${BORDER}`}}>
          <MetricCard label="This Month" value="₹1.4L" sub="↑ 18% vs last month"/>
          <MetricCard label="Pending" value="₹34K" sub="6 invoices" warn/>
        </div>
        <div style={{background:WH,padding:'14px 18px',borderBottom:`1px solid ${BORDER}`}}>
          <div style={{fontSize:11,color:SL,fontWeight:600,marginBottom:10}}>Revenue — Last 6 Months</div>
          <BarChart data={[{v:82,l:'Nov'},{v:110,l:'Dec'},{v:94,l:'Jan'},{v:120,l:'Feb'},{v:118,l:'Mar'},{v:140,l:'Apr'}]}/>
        </div>
        <SectionLabel text="Order Pipeline"/>
        <div style={{display:'flex',gap:8,padding:'0 14px 14px'}}>
          {[{v:active,l:'Active'},{v:overdue,l:'Overdue',warn:true},{v:32,l:'Done This Month',ok:true}].map(p=>(
            <div key={p.l} style={{flex:1,background:WH,borderRadius:10,padding:11,textAlign:'center',border:`1px solid ${BORDER}`}}>
              <div style={{fontSize:18,fontWeight:700,color:p.warn?WARNING:p.ok?SUCCESS:DN}}>{p.v}</div>
              <div style={{fontSize:10,color:SL,marginTop:1}}>{p.l}</div>
            </div>
          ))}
        </div>
        <SectionLabel text="Top Clients"/>
        {clients.slice(0,4).map((c,i)=>(
          <div key={c.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:WH,borderBottom:`1px solid ${BORDER}`}}>
            <window.Avatar initials={c.initials} color={c.color} textColor={c.textColor||'#fff'} size={36}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:500,fontSize:13}}>{c.name}</div>
              <div style={{height:4,borderRadius:2,background:CR,marginTop:5,width:`${90-i*18}%`,opacity:.8}}/>
            </div>
            <div style={{fontSize:13,fontWeight:600}}>₹{(c.lifetime/1000).toFixed(0)}K</div>
          </div>
        ))}
        <div style={{height:8}}/>
      </div>
      <AdminNav active={0}/>
    </div>
  );
};

/* ── SETTINGS ── */
const SettingsScreen = () => {
  const {navigate}=window.useNav();
  const {profile}=window.useApp();
  const {StatusBar,TopHeader,SectionLabel,WH,BG,BORDER,SL,DN,CR,SUCCESS}=window;
  const rows=[
    {s:'Business',items:[{ic:'🏪',t:'Boutique Profile',sub:'Name, logo, address, GST'},{ic:'👥',t:'Team Members',sub:'4 members · Add or manage'},{ic:'📐',t:'Measurement Templates',sub:'3 templates configured'}]},
    {s:'Billing & Plan',items:[{ic:'💳',t:'Subscription',sub:'Growth · ₹1,499/mo',ok:true},{ic:'📤',t:'Export All Data',sub:'CSV of clients, orders, invoices'}]},
    {s:'Integrations',items:[{ic:'💬',t:'WhatsApp Business',sub:'Connected',ok:true},{ic:'🚚',t:'Shiprocket',sub:'Not connected'}]},
    {s:'Account',items:[{ic:'🔑',t:'Change PIN',sub:'Update your login PIN'},{ic:'🚪',t:'Sign Out',sub:'',danger:true}]},
  ];
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',background:BG}}>
      <StatusBar/>
      <TopHeader title="Settings"/>
      <div style={{flex:1,overflowY:'auto'}}>
        <div style={{background:DN,padding:'14px 18px',display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:46,height:46,background:CR,borderRadius:13,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'DM Serif Display',serif",color:'#fff',fontSize:20}}>P</div>
          <div>
            <div style={{color:'#fff',fontWeight:600,fontSize:15}}>Priya's Couture Studio</div>
            <div style={{color:'#64748b',fontSize:11,marginTop:2}}>Growth Plan · Renews 15 May</div>
          </div>
        </div>
        {rows.map(({s,items})=>(
          <div key={s}>
            <SectionLabel text={s}/>
            <div style={{background:WH,borderTop:`1px solid ${BORDER}`,borderBottom:`1px solid ${BORDER}`}}>
              {items.map(({ic,t,sub,ok,danger},i)=>(
                <div key={t} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 14px',borderBottom:i<items.length-1?`1px solid ${BORDER}`:'none',cursor:'pointer'}}>
                  <div style={{width:34,height:34,background:BG,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>{ic}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:500,color:danger?CR:DN}}>{t}</div>
                    {sub&&<div style={{fontSize:11,color:ok?SUCCESS:SL,marginTop:1,fontWeight:ok?500:400}}>{ok?'● '+sub:sub}</div>}
                  </div>
                  {!danger&&<span style={{color:SL,fontSize:18}}>›</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{padding:'16px 14px',textAlign:'center'}}><div style={{fontSize:11,color:SL}}>AlterNote v1.0 · Growth Plan</div></div>
      </div>
      <AdminNav active={4}/>
    </div>
  );
};

Object.assign(window,{DashboardScreen,ClientListScreen,ClientProfileScreen,AddClientScreen,OrderListScreen,BillingHistoryScreen,AnalyticsScreen,SettingsScreen,AdminNav,ADMIN_TABS});
