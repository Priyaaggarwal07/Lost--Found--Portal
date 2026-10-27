import React,{useState,useEffect} from 'react';
const h=React.createElement;
const CATS=['Electronics','ID & Cards','Books & Notes','Bags','Keys','Clothing','Accessories','Other'];
const LOCS=['Library','Main Gate','Cafeteria','Lab Block','Classroom Block','Faculty Room','Hostel','Sports Ground','Auditorium'];
const ROLES=['Student','Faculty','Staff'];
const DEMO_ADMIN_PASSWORD='GLAadmin@2026';
const dAgo=n=>{const d=new Date('2026-10-02');d.setDate(d.getDate()-n);return d.toISOString().slice(0,10)};
const fmt=d=>new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const mk=(id,type,title,cat,loc,n,color,brand,model,marks,desc,by,role,status='Open')=>({id,type,title,cat,loc,date:dAgo(n),color,brand,model,marks,desc,by,role,status});
const SEED=[
mk(1,'lost','Black laptop bag','Bags','Library',1,'Black','Dell','','Red keychain','Backpack with a laptop charger inside.','Aman Verma','Student'),
mk(2,'found','Silver phone with blue case','Electronics','Cafeteria',2,'Blue','Apple','iPhone 13','','Found on a table near the counter.','Neha Singh','Student'),
mk(3,'found','College ID card','ID & Cards','Main Gate',3,'White','GLA','','','Found near the security desk.','Security Desk','Staff'),
mk(4,'lost','Scientific calculator','Electronics','Faculty Room',4,'Grey','Casio','fx-991','Initials RK on back','Left after a department meeting.','Dr. Rakesh Kumar','Faculty'),
mk(5,'found','Keys with green tag','Keys','Sports Ground',5,'Green','','','Hostel room key','Three keys on a green tag.','Ravi Sharma','Staff'),
mk(6,'found','Wireless earbuds case','Accessories','Library',0,'White','boAt','','','White charging case, no earbuds inside.','Library Staff','Staff'),
mk(7,'found','Grey hoodie','Clothing','Auditorium',8,'Grey','H&M','','','Left on a seat after the seminar.','Admin Office','Staff','Returned')];
const T=(t,c)=>h('span',{className:'tag '+c},t);
const E=(t,p,...k)=>h(t,p,...k);
const Opt=(a,all)=>[all&&h('option',{key:'a',value:'all'},all),...a.map(x=>h('option',{key:x},x))];
const Lbl=(l,c)=>h('label',null,l,c);
function matches(it,items){const w=s=>new Set(s.toLowerCase().split(/\W+/).filter(x=>x.length>3));
return items.filter(o=>o.type!==it.type&&o.status==='Open'&&o.id!==it.id).map(o=>{let s=0;if(o.cat===it.cat)s+=3;if(o.loc===it.loc)s+=2;if(o.color&&o.color===it.color)s++;if(o.brand&&o.brand===it.brand)s++;if(Math.abs(new Date(o.date)-new Date(it.date))<=3*864e5)s++;const b=w(o.title+' '+o.desc);w(it.title+' '+it.desc).forEach(x=>b.has(x)&&s++);return{o,s}}).filter(x=>x.s>=4).sort((a,b)=>b.s-a.s).slice(0,3)}

function Thumb({i}){return h('div',{className:'thumb '+i.type,style:i.img?{backgroundImage:`url(${i.img})`}:null},i.img?null:i.cat[0])}
function Card({i,open}){return h('button',{className:'card',onClick:()=>open(i.id)},h(Thumb,{i}),h('div',{className:'cb'},
h('div',null,T(i.type==='lost'?'Lost':'Found',i.type),' ',i.status!=='Open'&&T(i.status,i.status==='Returned'?'done':'pending')),
h('strong',null,i.title),h('span',{className:'meta'},`${i.loc} · ${fmt(i.date)}`),h('span',{className:'chip'},i.role)))}
function Steps({s}){const n=s==='Returned'?4:s==='Claim pending'?3:2;return h('div',{className:'steps',title:'Reported, Verified, Claim, Returned'},[1,2,3,4].map(k=>h('i',{key:k,className:k<=n?'on':''})))}

const COURSES={'B.Tech':4,'BCA':3,'BBA':3,'B.Com':3,'M.Com':2,'B.Sc':3,'M.Sc':2,'MBA':2,'Diploma':3};
const BR1=['CSE','Electrical','Mechanical'];
const BR=['Electrical','Mechanical','CSE','AIML','Full Stack','Data Science','Cyber Security'];
const FDEPT=[...BR,'Computer Applications (BCA/MCA)','Management (BBA/MBA)','Commerce','Science (B.Sc/M.Sc)','Mathematics & Applied Sciences','Humanities','Other'];
const STAFF=['Peon','Sweeper','Gardener','Assistant','Lab Assistant','Library Assistant','Security Guard','Clerk','Driver','Other'];
const ord=n=>['1st','2nd','3rd','4th'][n-1];
function Login({onLogin}){const [role,setRole]=useState('Student'),[course,setCourse]=useState('B.Tech'),[year,setYear]=useState(1);
const submit=e=>{e.preventDefault();const d=new FormData(e.target);let info;
if(role==='Student')info=`${course}${course==='B.Tech'?' '+d.get('branch'):''} · ${ord(year)} year`;
else if(role==='Faculty')info='Faculty, '+d.get('dept');else info=d.get('field');
onLogin({name:d.get('name'),role,id:d.get('id'),info,admin:false})};
const sel=(n,l,o,p)=>Lbl(l,h('select',{className:'in',name:n,required:true,...p},o));
return h('div',{className:'form auth'},h('h2',null,'Sign in to the portal'),h('p',{className:'sub',style:{margin:0}},'For GLA students, faculty and staff. Choose your role first.'),
h('div',{className:'rolepick',role:'group','aria-label':'I am a'},ROLES.map(r=>h('button',{key:r,type:'button',className:r===role?'on':'',onClick:()=>setRole(r)},r))),
h('form',{key:role,onSubmit:submit,style:{display:'grid',gap:14}},
Lbl('Full name',h('input',{className:'in',name:'name',required:true,placeholder:'e.g. Priya Kumari Aggarwal'})),
Lbl(role==='Student'?'University roll number':role==='Faculty'?'Faculty ID':'Staff ID',h('input',{className:'in',name:'id',required:true})),
role==='Student'&&sel('course','Course',Object.keys(COURSES).map(c=>h('option',{key:c},c)),{value:course,onChange:e=>{setCourse(e.target.value);setYear(1)}}),
role==='Student'&&sel('year','Year',Array.from({length:COURSES[course]},(_,k)=>h('option',{key:k,value:k+1},ord(k+1)+' year')),{value:year,onChange:e=>setYear(+e.target.value)}),
role==='Student'&&course==='B.Tech'&&sel('branch','Department (branch)',(year===1?BR1:BR).map(b=>h('option',{key:b},b)),{key:'b'+year}),
role==='Student'&&course==='B.Tech'&&year===1&&h('div',{className:'meta'},'First-year B.Tech: choose CSE, Electrical or Mechanical. More branches open from 2nd year.'),
role==='Faculty'&&sel('dept','Department you teach in',FDEPT.map(b=>h('option',{key:b},b))),
role==='Staff'&&sel('field','Field you work in',STAFF.map(b=>h('option',{key:b},b))),
Lbl('College email',h('input',{className:'in',type:'email',name:'email',required:true,placeholder:'name@gla.ac.in'})),
Lbl('Password',h('input',{className:'in',type:'password',name:'pw',required:true,minLength:6})),
h('button',{className:'btn'},'Sign in')),
h('div',{className:'meta'},'Demo: no real account is checked. Authentication will be connected to the backend API.'),
h('a',{className:'portalLink',href:'#/admin'},'Admin? Sign in to the admin portal'))}

function AdminLogin({onLogin}){const [error,setError]=useState('');
const submit=e=>{e.preventDefault();const d=new FormData(e.target);
if(d.get('pw')!==DEMO_ADMIN_PASSWORD){setError('Incorrect admin password. Please try again.');return}
setError('');
onLogin({name:d.get('name'),role:'Admin',info:'Portal administrator',admin:true})};
return h('div',{className:'form auth adminAuth'},h('div',{className:'adminEyebrow'},'STAFF ACCESS'),
h('h2',null,'Admin portal'),h('p',{className:'sub',style:{margin:0}},'Sign in separately to review claims and manage campus reports.'),
h('form',{onSubmit:submit,style:{display:'grid',gap:14}},
Lbl('Admin name',h('input',{className:'in',name:'name',required:true,placeholder:'Enter admin name'})),
Lbl('Password',h('input',{className:'in',type:'password',name:'pw',required:true,minLength:6})),
error&&h('div',{className:'authError',role:'alert'},error),
h('button',{className:'btn'},'Sign in to admin dashboard')),
h('div',{className:'meta'},'Demo-only password check. Do not use this password for real accounts.'),
h('a',{className:'portalLink',href:'#/'},'← Back to the student portal'))}

function Home({x}){const hero=h('div',{className:'hero'},h('div',null,h('h1',null,'Lost something on campus? Look here first.'),
h('p',{className:'lead'},'Students, faculty and staff can report lost or found items, review possible matches and collect them after verification.'),
h('form',{className:'search',onSubmit:e=>{e.preventDefault();x.setF({...x.F,q:e.target.q.value});location.hash='#/browse'}},h('input',{name:'q','aria-label':'Search items',placeholder:"Search 'laptop bag', 'ID card', 'keys'"}),h('button',{className:'btn sm'},'Search')),
h('div',{className:'cta'},h('a',{className:'btn lost',href:'#/report?lost'},'I lost something'),h('a',{className:'btn found',href:'#/report?found'},'I found something'))),
h('div',{className:'panel'},h('h3',null,'How it works'),h('ol',null,[['Report the item','Add category, place, date and a photo.'],['Review possible matches','The portal compares details and suggests matches.'],['Claim with private proof','Describe something only the owner would know.'],['Collect it safely','Staff verify you and close the report.']].map(([a,b],k)=>h('li',{key:k},h('b',null,k+1),h('div',null,a,h('span',null,b)))))));
return h(React.Fragment,null,hero,h('section',null,h('div',{className:'head'},h('div',null,h('h2',null,'Recently reported'),h('p',{className:'sub'},'Latest items from across campus')),h('a',{className:'btn ghost sm',href:'#/browse'},'Browse all items')),
h('div',{className:'grid'},[...x.items].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4).map(i=>h(Card,{key:i.id,i,open:x.open})))))}

function Browse({x}){const {F,setF}=x,q=F.q.toLowerCase();
const r=x.items.filter(i=>(F.type==='all'||i.type===F.type)&&(F.cat==='all'||i.cat===F.cat)&&(F.loc==='all'||i.loc===F.loc)&&(F.role==='all'||i.role===F.role)&&(!q||[i.title,i.desc,i.brand,i.model,i.color,i.marks,i.cat,i.loc].join(' ').toLowerCase().includes(q)));
const s=k=>e=>setF({...F,[k]:e.target.value});
return h('section',null,h('div',{className:'head'},h('div',null,h('h2',null,'Browse items'),h('p',{className:'sub'},r.length+(r.length===1?' item':' items')))),
h('div',{className:'filters',style:{gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr'}},h('input',{className:'in','aria-label':'Search',placeholder:'Search by name, brand, colour…',value:F.q,onChange:s('q')}),
h('select',{className:'in','aria-label':'Type',value:F.type,onChange:s('type')},h('option',{value:'all'},'Lost & found'),h('option',{value:'lost'},'Lost'),h('option',{value:'found'},'Found')),
h('select',{className:'in','aria-label':'Category',value:F.cat,onChange:s('cat')},Opt(CATS,'All categories')),
h('select',{className:'in','aria-label':'Location',value:F.loc,onChange:s('loc')},Opt(LOCS,'All locations')),
h('select',{className:'in','aria-label':'Reported by',value:F.role,onChange:s('role')},Opt(ROLES,'All users'))),
r.length?h('div',{className:'grid'},r.map(i=>h(Card,{key:i.id,i,open:x.open}))):h('div',{className:'empty'},h('strong',null,'No items match these filters.'),h('br'),'Try a broader search, or report the item so others can find it.'))}

function Report({x}){const t=location.hash.includes('found')?'found':'lost';
const submit=e=>{e.preventDefault();const d=new FormData(e.target),f=d.get('img');
const fin=img=>{const it={id:Date.now(),type:d.get('type'),title:d.get('title'),cat:d.get('cat'),loc:d.get('loc'),date:d.get('date'),color:d.get('color'),brand:d.get('brand'),model:d.get('model'),marks:d.get('marks'),desc:d.get('desc'),by:x.user.name,role:x.user.role,info:x.user.info,status:'Open',img,mine:true};
x.setItems([it,...x.items]);const m=matches(it,x.items);x.note(`Your ${it.type} report "${it.title}" was submitted.`+(m.length?` ${m.length} possible match(es) found.`:''));x.setM({k:'done',it,m})};
if(f&&f.size){if(f.size>2e6)return x.say('Photo is too large. Use an image under 2 MB.');const r=new FileReader();r.onload=()=>fin(r.result);r.readAsDataURL(f)}else fin('')};
const I=(n,p)=>h('input',{className:'in',name:n,...p});
return h('section',null,h('div',{className:'head'},h('div',null,h('h2',null,'Report an item'),h('p',{className:'sub'},'The more detail you add, the better the matches.'))),
h('form',{className:'form',onSubmit:submit,key:t},h('div',{className:'seg'},['lost','found'].map(v=>h('label',{key:v},h('input',{type:'radio',name:'type',value:v,defaultChecked:v===t}),v==='lost'?'I lost an item':'I found an item'))),
Lbl('Item name',I('title',{required:true,maxLength:60,placeholder:'e.g. Black backpack'})),
h('div',{className:'row2'},Lbl('Category',h('select',{className:'in',name:'cat'},Opt(CATS))),Lbl('Location',h('select',{className:'in',name:'loc'},Opt(LOCS)))),
h('div',{className:'row2'},Lbl('Date',I('date',{type:'date',required:true,defaultValue:dAgo(0),max:dAgo(0)})),Lbl('Colour',I('color'))),
h('div',{className:'row2'},Lbl('Brand',I('brand')),Lbl('Model (optional)',I('model'))),
h('div',{className:'row2'},Lbl('Unique marks',I('marks',{placeholder:'Scratches, stickers, name…'})),Lbl('Photo (optional)',I('img',{type:'file',accept:'image/*'}))),
Lbl('Description',h('textarea',{className:'in',name:'desc',rows:4,required:true,placeholder:'Where and how it was lost or found. Keep private details for verification.'})),
h('div',null,h('button',{className:'btn'},'Submit report'))))}

function My({x}){const mine=x.items.filter(i=>i.mine||i.by===x.user.name),mc=x.claims.filter(c=>c.mine);
return h('section',null,h('div',{className:'head'},h('div',null,h('h2',null,'My reports'),h('p',{className:'sub'},'Track the status of your items and claims.')),h('a',{className:'btn sm',href:'#/report'},'New report')),
mine.length?h('div',{className:'grid'},mine.map(i=>h(Card,{key:i.id,i,open:x.open}))):h('div',{className:'empty'},h('strong',null,"You haven't reported anything yet."),h('br'),'Your reports will appear here with their status.'),
h('h2',{style:{marginTop:32}},'My claims'),mc.length?h('div',{className:'scroll'},h('table',{className:'table'},h('tbody',null,h('tr',null,h('th',null,'Item'),h('th',null,'Status')),mc.map(c=>h('tr',{key:c.id},h('td',null,x.items.find(i=>i.id===c.item)?.title),h('td',null,T(c.status,c.status==='Pending'?'pending':c.status==='Approved'?'done':'rej'))))))):h('p',{className:'sub'},'No claims submitted.'))}

function Admin({x}){if(!x.user.admin)return h('div',{className:'empty'},h('strong',null,'Admin access only.'),h('br'),'Sign in as admin (demo) to preview this page.');
const act=(c,ok)=>{x.setClaims(x.claims.map(k=>k.id===c.id?{...k,status:ok?'Approved':'Rejected'}:k));x.setItems(x.items.map(i=>i.id===c.item?{...i,status:ok?'Returned':'Open'}:i));x.note(`Claim for "${x.items.find(i=>i.id===c.item).title}" ${ok?'approved':'rejected'}.`);x.say(ok?'Claim approved. Item marked as returned.':'Claim rejected.')};
const st=[['Total reports',x.items.length],['Open',x.items.filter(i=>i.status==='Open').length],['Pending claims',x.claims.filter(c=>c.status==='Pending').length],['Returned',x.items.filter(i=>i.status==='Returned').length]];
return h('section',null,h('div',{className:'head'},h('div',null,h('h2',null,'Admin dashboard'),h('p',{className:'sub'},'Review claims and manage reports.'))),
h('div',{className:'grid',style:{marginBottom:24}},st.map(([l,n])=>h('div',{key:l,className:'card',style:{cursor:'default'}},h('div',{className:'cb'},h('span',{className:'meta'},l),h('strong',{style:{fontSize:30}},n))))),
h('h2',null,'Claim requests'),h('div',{className:'scroll'},h('table',{className:'table'},h('tbody',null,h('tr',null,['Item','Claimant','Proof','Status',''].map((t,k)=>h('th',{key:k},t))),
x.claims.map(c=>h('tr',{key:c.id},h('td',null,x.items.find(i=>i.id===c.item)?.title),h('td',null,c.by,h('br'),h('span',{className:'meta'},c.contact)),h('td',null,c.proof),h('td',null,T(c.status,c.status==='Pending'?'pending':c.status==='Approved'?'done':'rej')),
h('td',null,c.status==='Pending'&&[h('button',{key:1,className:'btn sm',onClick:()=>act(c,true)},'Approve'),' ',h('button',{key:2,className:'btn ghost sm',onClick:()=>act(c,false)},'Reject')])))))),
h('h2',{style:{marginTop:28}},'All reports'),h('div',{className:'scroll'},h('table',{className:'table'},h('tbody',null,h('tr',null,['Item','Type','Reported by','Status',''].map((t,k)=>h('th',{key:k},t))),
x.items.map(i=>h('tr',{key:i.id},h('td',null,i.title),h('td',null,T(i.type,i.type)),h('td',null,i.by,' ',h('span',{className:'chip'},i.role)),h('td',null,i.status),h('td',null,h('button',{className:'btn ghost sm',onClick:()=>{x.setItems(x.items.filter(z=>z.id!==i.id));x.say('Report removed.')}},'Remove'))))))))}

function Modal({x}){const m=x.m;if(!m)return null;let body;
if(m.k==='detail'){const i=x.items.find(z=>z.id===m.id);body=[h(Thumb,{key:0,i}),h('div',{key:1},T(i.type==='lost'?'Lost':'Found',i.type),' ',T(i.status,i.status==='Returned'?'done':i.status==='Open'?'':'pending')),h('h2',{key:2},i.title),h(Steps,{key:3,s:i.status}),h('p',{key:4,style:{margin:0}},i.desc),
h('dl',{key:5},[['Category',i.cat],['Location',i.loc],['Date',fmt(i.date)],['Colour',i.color],['Brand',i.brand],['Model',i.model],['Unique marks',i.marks],['Reported by',`${i.by} (${i.role})`],['Course / dept',i.info]].filter(r=>r[1]).map(r=>[h('dt',{key:r[0]+'t'},r[0]),h('dd',{key:r[0]+'d'},r[1])])),
h('div',{key:6,style:{display:'flex',gap:10,justifyContent:'flex-end'}},h('button',{className:'btn ghost',onClick:x.close},'Close'),i.status==='Open'&&h('button',{className:'btn',onClick:()=>x.setM({k:'claim',id:i.id})},i.type==='found'?'This is mine: claim it':'I found this item'))]}
if(m.k==='claim')body=[h('h2',{key:0},'Verify ownership'),h('p',{key:1,className:'sub',style:{margin:0}},"Staff will check your answer before handing the item over. Don't share it publicly."),
h('form',{key:2,style:{display:'grid',gap:14},onSubmit:e=>{e.preventDefault();const d=new FormData(e.target);x.setClaims([...x.claims,{id:x.claims.length+1,item:m.id,by:x.user.name,proof:d.get('proof'),contact:d.get('contact'),status:'Pending',mine:true}]);x.setItems(x.items.map(i=>i.id===m.id?{...i,status:'Claim pending'}:i));x.note('Your claim was sent for verification.');x.close();x.say('Claim sent. Staff will review it.')}},
Lbl('What only the owner would know?',h('textarea',{className:'in',name:'proof',rows:4,required:true,placeholder:'Contents, scratches, wallpaper, serial number…'})),Lbl('Contact email or phone',h('input',{className:'in',name:'contact',required:true})),
h('div',{style:{display:'flex',gap:10,justifyContent:'flex-end'}},h('button',{type:'button',className:'btn ghost',onClick:x.close},'Cancel'),h('button',{className:'btn'},'Send claim')))];
if(m.k==='done')body=[h('h2',{key:0},'Report submitted'),h('p',{key:1,className:'sub',style:{margin:0}},`Your ${m.it.type} report is now visible to staff.`),
m.m.length?h('div',{key:2},h('strong',null,'Possible matches'),h('p',{className:'meta',style:{margin:0}},'Suggestions only. Ownership is confirmed after verification.'),m.m.map(y=>h('div',{className:'match',key:y.o.id},h('div',null,h('strong',null,y.o.title),h('div',{className:'meta'},`${y.o.loc} · ${fmt(y.o.date)}`)),h('button',{className:'btn sm',onClick:()=>x.setM({k:'detail',id:y.o.id})},'View')))):h('p',{key:2,style:{margin:0}},'No matches yet. You will be notified if a similar item is reported.'),
h('div',{key:3,style:{display:'flex',justifyContent:'flex-end'}},h('a',{className:'btn',href:'#/my',onClick:x.close},'Go to my reports'))];
if(m.k==='notes')body=[h('h2',{key:0},'Notifications'),x.notes.length?x.notes.map((n,k)=>h('div',{className:'match',key:k},h('span',null,n.t),h('span',{className:'meta'},n.d))):h('p',{key:1,className:'sub',style:{margin:0}},'No notifications yet. Updates about your reports and claims appear here.'),h('div',{key:9,style:{textAlign:'right'}},h('button',{className:'btn ghost',onClick:x.close},'Close'))];
return h('div',{className:'ov',onMouseDown:e=>e.target===e.currentTarget&&x.close()},h('div',{className:'modal',role:'dialog','aria-modal':true},body))}

function App(){const [user,setUser]=useState(null),[hash,setHash]=useState(location.hash||'#/'),[items,setItems]=useState(SEED),
[claims,setClaims]=useState([{id:1,item:2,by:'Mohit Jain',proof:'Wallpaper is a mountain; crack at bottom-left of the case.',contact:'mohit@gla.ac.in',status:'Pending'}]),
[notes,setNotes]=useState([]),[m,setM]=useState(null),[toast,setToast]=useState(null),[F,setF]=useState({q:'',type:'all',cat:'all',loc:'all',role:'all'});
useEffect(()=>{const f=()=>{setHash(location.hash||'#/');setM(null);scrollTo(0,0)};addEventListener('hashchange',f);const k=e=>e.key==='Escape'&&setM(null);addEventListener('keydown',k);return()=>{removeEventListener('hashchange',f);removeEventListener('keydown',k)}},[]);
useEffect(()=>{if(user?.admin&&!hash.startsWith('#/admin'))location.hash='#/admin';else if(user&&!user.admin&&hash.startsWith('#/admin'))location.hash='#/'},[user,hash]);
const say=t=>{setToast(t);setTimeout(()=>setToast(null),2800)};
const note=t=>setNotes(n=>[{t,d:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})},...n]);
const x={user,items,setItems,claims,setClaims,notes,note,say,m,setM,close:()=>setM(null),open:id=>setM({k:'detail',id}),F,setF};
const r=hash.split('?')[0].slice(2)||'home';const P={home:Home,browse:Browse,report:Report,my:My,admin:Admin}[r]||Home;const cur=P===Home?'home':r;
const isAdminPortal=!!user?.admin||(!user&&r==='admin');
const links=isAdminPortal?[['admin','Dashboard','admin']]:[['','Home','home'],['browse','Browse','browse'],['report','Report','report'],['my','My reports','my']];
return h(React.Fragment,null,h('header',null,h('div',{className:'wrap nav'},h('a',{className:'brand',href:isAdminPortal?'#/admin':'#/'},h('div',{className:'logo'},'🔎'),h('span',{className:'t'},isAdminPortal?'Campus Lost & Found · Admin':'Campus Lost & Found')),
user&&h('nav',null,links.map(([p,l,k])=>h('a',{key:k,href:'#/'+p,className:k===cur?'on':''},l))),
user&&h('button',{className:'bell',style:{marginLeft:'auto'},'aria-label':'Notifications',onClick:()=>setM({k:'notes'})},'🔔',notes.length>0&&h('b',null,notes.length)),
user&&h('button',{className:'who',title:'Sign out',onClick:()=>{setUser(null);if(!user.admin)location.hash='#/'}},`${user.name.split(' ')[0]} · ${user.role} · Sign out`))),
h('main',{className:'wrap'},user?h(user.admin?Admin:P,{x}):isAdminPortal?h(AdminLogin,{onLogin:u=>{setUser(u);say('Welcome, '+u.name.split(' ')[0])}}):h(Login,{onLogin:u=>{setUser(u);say('Welcome, '+u.name.split(' ')[0])}})),
h('footer',null,h('div',{className:'wrap'},'GLA University, Mathura · Online Lost & Found Portal. Student project prototype with demo data (resets on refresh).')),
h(Modal,{x}),toast&&h('div',{className:'toast',role:'status'},toast))}
export default App;
