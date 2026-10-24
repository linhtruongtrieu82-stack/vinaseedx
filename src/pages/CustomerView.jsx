import {useState} from 'react'
import CareTimeline from '../components/CareTimeline'
import CompanionPlanting from '../components/CompanionPlanting'
import AIDiseaseScanner from '../components/AIDiseaseScanner'
import GeoSmartPlanter from '../components/GeoSmartPlanter'
import AIGardenPlanner from '../components/AIGardenPlanner'
import {vnd,BLOG_CATS} from '../data/mockData'
const Cover=({v})=>String(v||'').startsWith('http')?<img src={v} alt="" className="h-32 w-full object-cover rounded-lg mb-2"/>:<div className="text-5xl text-center bg-leaf/40 rounded-lg py-4 mb-2">{v||'🌱'}</div>
const TABS=[['shop','Cửa hàng'],['blog','Blog kỹ thuật'],['care','Lịch chăm sóc'],['mix','Trồng xen canh'],['scan','Quét bệnh AI'],['geo','Bản đồ thổ nhưỡng'],['garden','Setup vườn AI'],['cart','Giỏ hàng']]
export default function CustomerView({c}){
const {products,posts,cart,setCart,orders,setOrders,q,tab,setTab}=c
const [bc,setBc]=useState('Tất cả'),[f,setF]=useState({cat:'',diff:'',season:'',max:0}),[sel,setSel]=useState(null),[code,setCode]=useState(''),[modal,setModal]=useState(false),[info,setInfo]=useState({name:'',phone:'',addr:''}),[ok,setOk]=useState('')
const seeds=products.filter(p=>p.days>0)
const uniq=k=>[...new Set(products.map(p=>p[k]))]
const list=products.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())&&(!f.cat||p.cat===f.cat)&&(!f.diff||p.diff===f.diff)&&(!f.season||p.season===f.season)&&(!f.max||p.days<=f.max))
const add=p=>setCart(c=>c.find(i=>i.id===p.id)?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{id:p.id,qty:1}])
const items=cart.map(i=>({...i,p:products.find(p=>p.id===i.id)})).filter(i=>i.p)
const sub=items.reduce((s,i)=>s+i.p.price*i.qty,0),disc=code.toUpperCase()==='XANH10'?sub*.1:0,total=sub-disc
const order=()=>{if(!info.name||!info.phone||!info.addr)return alert('Vui lòng nhập đủ thông tin.')
const id='DH'+Date.now().toString().slice(-6);setOrders([{id,customer:info.name,items:items.map(i=>({name:i.p.name,qty:i.qty})),total,status:'Chờ xác nhận',date:new Date().toLocaleDateString('vi-VN')},...orders])
setCart([]);setModal(false);setOk(id)}
const Sel=({k,l,opts})=><select className="inp w-auto" value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}><option value="">{l}</option>{opts.map(o=><option key={o}>{o}</option>)}</select>
return(<div className="max-w-6xl mx-auto px-4 py-6 space-y-5">
<div className="flex gap-2 flex-wrap">{TABS.map(([k,l])=><button key={k} onClick={()=>setTab(k)} className={`px-4 py-2 rounded-full text-sm ${tab===k?'bg-primary text-white':'bg-white border border-mint'}`}>{l}{k==='cart'&&cart.length?` (${cart.length})`:''}</button>)}</div>
{ok&&<div className="bg-leaf p-3 rounded-lg text-sm">Đặt hàng thành công! Mã đơn: <b>{ok}</b></div>}
{tab==='shop'&&<>
<section className="rounded-2xl bg-primary text-white p-8 md:p-12"><h1 className="text-3xl md:text-4xl font-bold max-w-xl">Gieo một hạt giống, gặt cả khu vườn của bạn</h1>
<p className="mt-3 text-leaf max-w-lg">Hạt giống chất lượng kèm lịch chăm sóc và gợi ý trồng xen canh cho từng loại cây.</p></section>
<div className="flex gap-2 flex-wrap"><Sel k="cat" l="Danh mục" opts={uniq('cat')}/><Sel k="diff" l="Độ khó" opts={uniq('diff')}/><Sel k="season" l="Mùa vụ" opts={uniq('season')}/>
<select className="inp w-auto" value={f.max} onChange={e=>setF({...f,max:+e.target.value})}><option value={0}>Thời gian thu hoạch</option><option value={45}>≤ 45 ngày</option><option value={90}>≤ 90 ngày</option></select></div>
{!list.length&&<p>Không tìm thấy hạt giống phù hợp. Hãy thử đổi bộ lọc.</p>}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">{list.map(p=><div key={p.id} className="card flex flex-col">
<button onClick={()=>setSel(p)} className="text-6xl py-4 bg-leaf/40 rounded-lg">{p.emoji}</button>
<h3 className="font-medium mt-2">{p.name}</h3><p className="text-xs">{p.cat} • {p.diff} • {p.days} ngày</p>
<p className="text-earth font-bold mt-1">{vnd(p.price)}</p>
<button className="btn mt-auto" disabled={!p.stock} onClick={()=>add(p)}>{p.stock?'Thêm vào giỏ':'Hết hàng'}</button></div>)}</div></>}
{tab==='blog'&&<div className="space-y-4"><div className="flex gap-2 flex-wrap">{['Tất cả',...BLOG_CATS].map(k=><button key={k} onClick={()=>setBc(k)} className={`px-3 py-1 rounded-full text-sm ${bc===k?'bg-primary text-white':'bg-white border border-mint'}`}>{k}</button>)}</div>
<div className="grid md:grid-cols-3 gap-4">{posts.filter(b=>bc==='Tất cả'||b.cat===bc).map(b=><article key={b.id} className="card"><Cover v={b.cover}/><span className="text-xs bg-leaf px-2 py-0.5 rounded">{b.cat}</span><h3 className="font-bold my-2">{b.title}</h3><p className="text-sm whitespace-pre-line">{b.body}</p>{(b.related||[]).map(id=>products.find(p=>p.id===id)).filter(Boolean).map(p=><button key={p.id} className="btn2 mt-2 mr-1" onClick={()=>add(p)}>{p.emoji} {p.name} +</button>)}</article>)}</div></div>}
{tab==='care'&&<CareTimeline products={seeds}/>}
{tab==='mix'&&<CompanionPlanting products={seeds}/>}
{tab==='scan'&&<AIDiseaseScanner products={products} add={add}/>}
{tab==='geo'&&<GeoSmartPlanter products={products} add={add}/>}
{tab==='garden'&&<AIGardenPlanner products={products} add={add}/>}
{tab==='cart'&&<div className="card space-y-3">{!items.length?<p>Giỏ hàng đang trống. Hãy chọn vài hạt giống ở Cửa hàng.</p>:<>
{items.map(i=><div key={i.id} className="flex items-center gap-3 border-b border-mint/40 pb-2"><span className="text-3xl">{i.p.emoji}</span><div className="flex-1"><b>{i.p.name}</b><div className="text-sm text-earth">{vnd(i.p.price)}</div></div>
<input type="number" min="1" max={i.p.stock} value={i.qty} className="inp w-20" onChange={e=>setCart(cart.map(x=>x.id===i.id?{...x,qty:Math.max(1,+e.target.value||1)}:x))}/>
<button className="text-red-700 text-sm" onClick={()=>setCart(cart.filter(x=>x.id!==i.id))}>Xóa</button></div>)}
<input className="inp max-w-xs" placeholder="Mã giảm giá (thử XANH10)" value={code} onChange={e=>setCode(e.target.value)}/>
<p>Tạm tính: {vnd(sub)}{disc>0&&<> • Giảm: -{vnd(disc)}</>}</p><p className="text-xl font-bold text-earth">Tổng: {vnd(total)}</p>
<button className="btn" onClick={()=>setModal(true)}>Đặt hàng</button></>}</div>}
{sel&&<div className="fixed inset-0 bg-black/50 grid place-items-center p-4 z-30" onClick={()=>setSel(null)}><div className="card max-w-md w-full space-y-2" onClick={e=>e.stopPropagation()}>
<div className="text-6xl text-center">{sel.emoji}</div><h3 className="font-bold text-xl">{sel.name}</h3>
<ul className="text-sm space-y-1"><li>Tỉ lệ nảy mầm: <b>{sel.germ}%</b></li><li>Độ pH đất: <b>{sel.ph}</b></li><li>Nhiệt độ thích hợp: <b>{sel.temp}</b></li><li>Ánh sáng: <b>{sel.light}</b></li><li>Mùa vụ: <b>{sel.season}</b> • Thu hoạch: <b>{sel.days} ngày</b></li><li>Còn lại: {sel.stock}</li></ul>
<div className="flex gap-2"><button className="btn" onClick={()=>{add(sel);setSel(null)}}>Thêm vào giỏ</button><button className="btn2" onClick={()=>setSel(null)}>Đóng</button></div></div></div>}
{modal&&<div className="fixed inset-0 bg-black/50 grid place-items-center p-4 z-30"><div className="card max-w-md w-full space-y-2"><h3 className="font-bold">Thông tin giao hàng</h3>
<input className="inp" placeholder="Họ tên" value={info.name} onChange={e=>setInfo({...info,name:e.target.value})}/><input className="inp" placeholder="Số điện thoại" value={info.phone} onChange={e=>setInfo({...info,phone:e.target.value})}/><input className="inp" placeholder="Địa chỉ" value={info.addr} onChange={e=>setInfo({...info,addr:e.target.value})}/>
<p className="font-bold text-earth">Thanh toán khi nhận hàng: {vnd(total)}</p><div className="flex gap-2"><button className="btn" onClick={order}>Xác nhận đặt hàng</button><button className="btn2" onClick={()=>setModal(false)}>Hủy</button></div></div></div>}
</div>)}
