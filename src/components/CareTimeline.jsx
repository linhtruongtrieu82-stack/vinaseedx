import {useState,useEffect} from 'react'
import {CROPS} from '../data/mockData'
const iso=d=>d.toISOString().slice(0,10),fmt=d=>d.toLocaleDateString('vi-VN'),short=d=>d.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit'})
export default function CareTimeline({products}){
const [pid,setPid]=useState(products[0]?.id),[start,setStart]=useState(iso(new Date())),[sel,setSel]=useState(null)
const [done,setDone]=useState(()=>{try{return JSON.parse(localStorage.getItem('gs_care'))||{}}catch{return {}}})
useEffect(()=>{localStorage.setItem('gs_care',JSON.stringify(done))},[done])
const p=products.find(x=>x.id==pid)
if(!p)return <p className="card">Chưa có hạt giống.</p>
const c=CROPS[p.name]||{harvestDays:p.days,fertilizingSchedule:[],rotation:'',harvestTip:''}
const h=c.harvestDays,e2=Math.min(20,Math.round(h*.45)),e3=Math.min(40,h-5)
const stageOf=n=>n<=7?0:n<=e2?1:n<=e3?2:3
const ST=[{t:'Gieo hạt & Nảy mầm',r:[1,7],i:'🌱',w:'Phun sương 2 lần/ngày (sáng sớm, chiều mát)',n:'Che nắng 80%, giữ ẩm đất, không bón phân.'},
{t:'Cây con & Phát triển lá',r:[8,e2],i:'🌿',w:'Tưới gốc 1 lần/ngày',n:'Tỉa bớt cây yếu, đưa ra nắng 100%.'},
{t:'Ra hoa, đơm quả / Phát triển mạnh',r:[e2+1,e3],i:'🌸',w:'Giữ ẩm đất, tưới gốc, tránh đọng nước lên hoa/lá',n:'Làm giàn/cắm cọc, bấm ngọn, làm cỏ gốc.'},
{t:'Thu hoạch',r:[e3+1,h],i:'🧺',w:'Giảm nước tưới 2-3 ngày trước thu hoạch',n:c.harvestTip}]
const at=n=>{const x=new Date(start);x.setDate(x.getDate()+n-1);return x}
const tasks=n=>{const s=stageOf(n),L=[]
if(s===0)L.push(['🌫️','Tưới phun sương buổi sáng sớm'],['🌫️','Tưới phun sương buổi chiều mát'])
else if(s===1)L.push(['💧','Tưới gốc 1 lần'])
else if(s===2)L.push(['💧','Tưới gốc giữ ẩm đất, tránh đọng nước lên hoa/lá'])
else L.push(n<h-2?['💧','Tưới gốc, giảm dần lượng nước']:n<h?['💧','Giảm lượng nước tưới trước thu hoạch']:['💧','Tưới nhẹ trước khi thu'])
c.fertilizingSchedule.forEach(([d,t])=>d===n&&L.push(['🧪','Bón phân: '+t]))
if(n>=14&&n%7===0&&n<h)L.push(['🐛','Phun chế phẩm sinh học phòng sâu bệnh'])
if(n===1)L.push(['🌥️','Che nắng 80%, không bón phân'])
if(n===8)L.push(['✂️','Tỉa cây yếu, đưa ra nắng 100%'])
if(n===e2+1)L.push(['🪵','Làm giàn/cắm cọc, bấm ngọn, làm cỏ gốc'])
if(n===h)L.push(['🧺','Thu hoạch'])
return L.map(([i,t],j)=>({k:`${p.id}_${start}_${n}_${j}`,i,t}))}
const todayN=Math.round((new Date(iso(new Date()))-new Date(start))/864e5)+1
const day=sel??Math.min(Math.max(todayN,1),h),list=tasks(day)
const alerts=todayN>=1&&todayN<=h?tasks(todayN).filter(t=>(t.i==='🧪'||t.i==='🐛')&&!done[t.k]):[]
const pts=Object.values(done).filter(Boolean).length*10
const pct=Math.min(100,Math.max(0,(todayN-1)/h*100))
return(<div className="grid lg:grid-cols-2 gap-4">
<div className="card space-y-3"><div className="flex justify-between items-center"><h3 className="font-bold text-lg">Lịch canh tác thông minh</h3><span className="bg-leaf px-2 py-1 rounded-full text-xs">⭐ {pts} điểm</span></div>
<select className="inp" value={pid} onChange={e=>{setPid(e.target.value);setSel(null)}}>{products.map(x=><option key={x.id} value={x.id}>{x.emoji} {x.name}</option>)}</select>
<label className="block text-sm">Ngày bắt đầu gieo<input type="date" className="inp mt-1" value={start} onChange={e=>{setStart(e.target.value);setSel(null)}}/></label>
<div className="h-3 bg-leaf rounded-full overflow-hidden"><div className="h-full bg-primary" style={{width:pct+'%'}}/></div>
<p className="text-sm">Thu hoạch dự kiến: <b className="text-earth">{fmt(at(h))}</b> (ngày {h})</p>
<ol className="border-l-2 border-mint ml-2 space-y-4">{ST.map((s,i)=>{const cur=todayN>=s.r[0]&&todayN<=s.r[1];return(<li key={i} className={`pl-4 relative ${cur?'bg-leaf/50 rounded-r-lg py-1':''}`}><span className="absolute -left-[11px] top-1 text-base">{s.i}</span>
<b>Giai đoạn {i+1}: {s.t}</b><div className="text-xs text-earth">Ngày {s.r[0]}-{s.r[1]} • {short(at(s.r[0]))} - {short(at(s.r[1]))}</div>
<p className="text-sm">💧 {s.w}</p>{i>0&&i<3&&c.fertilizingSchedule.filter(f=>f[0]>=s.r[0]&&f[0]<=s.r[1]).map(f=><p key={f[0]} className="text-sm">🧪 Ngày {f[0]}: {f[1]}</p>)}<p className="text-sm">📝 {s.n}</p></li>)})}</ol></div>
<div className="space-y-4">
{alerts.length>0&&<div className="bg-amber-100 border border-amber-300 rounded-lg p-3 text-sm">🔔 <b>Nhắc việc hôm nay:</b> {alerts.map(a=>a.t).join('; ')}</div>}
{todayN<1&&<div className="bg-leaf rounded-lg p-3 text-sm">Còn {1-todayN} ngày nữa đến ngày gieo.</div>}
<div className="card"><h3 className="font-bold mb-2">Công việc ngày {day} • {fmt(at(day))}{day===todayN&&' (Hôm nay)'}</h3>
<ul className="space-y-2">{list.map(t=><li key={t.k} className={`flex items-center justify-between gap-2 p-2 rounded-lg ${done[t.k]?'bg-leaf/50 line-through':'bg-cream'}`}><span className="text-sm">{t.i} {t.t}</span>
<button className="btn2 shrink-0" onClick={()=>setDone({...done,[t.k]:!done[t.k]})}>{done[t.k]?'Hoàn tác':'Đã hoàn thành'}</button></li>)}</ul></div>
<div className="card"><h3 className="font-bold mb-2">Lịch theo ngày</h3><div className="grid grid-cols-7 gap-1 max-h-72 overflow-auto">{Array.from({length:h},(_,i)=>i+1).map(n=>{const T=tasks(n),ok=T.every(t=>done[t.k]);return(
<button key={n} onClick={()=>setSel(n)} className={`rounded-lg p-1 text-[10px] border ${n===day?'ring-2 ring-primary':''} ${n===todayN?'border-earth':'border-mint/40'} ${ok?'bg-leaf':'bg-white'}`}><b>{n}</b><br/>{short(at(n))}<br/>{[...new Set(T.map(t=>t.i))].slice(0,3).join('')}</button>)})}</div></div></div>
<div className="card lg:col-span-2 grid md:grid-cols-2 gap-3"><div><h4 className="font-bold">🧺 Thu hoạch</h4><p className="text-sm">{c.harvestTip}</p></div><div><h4 className="font-bold">🔄 Sau thu hoạch (luân canh)</h4><p className="text-sm">{c.rotation}</p></div></div></div>)}
