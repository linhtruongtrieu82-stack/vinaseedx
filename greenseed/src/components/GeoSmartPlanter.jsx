import {useState} from 'react'
import {REGIONS,vnd} from '../data/mockData'
const m=new Date().getMonth()+1,SEASON=m>=2&&m<=4?'Xuân':m>=5&&m<=7?'Hè':m>=8&&m<=10?'Thu':'Đông'
const rng=s=>(String(s).match(/\d+/g)||[]).map(Number)
export default function GeoSmartPlanter({products,add}){
const [r,setR]=useState(REGIONS[0]),[msg,setMsg]=useState('')
const gps=()=>navigator.geolocation?navigator.geolocation.getCurrentPosition(pos=>{const a=pos.coords.latitude,b=pos.coords.longitude;const n=REGIONS.reduce((x,y)=>Math.hypot(a-y.lat,b-y.lng)<Math.hypot(a-x.lat,b-x.lng)?y:x);setR(n);setMsg('Vùng gần bạn nhất: '+n.n)},()=>setMsg('Không lấy được vị trí. Hãy chọn vùng thủ công.')):setMsg('Trình duyệt không hỗ trợ GPS.')
const rec=products.filter(p=>p.days>0).map(p=>{const [a,b]=rng(p.temp),ov=Math.max(0,Math.min(b,r.t[1])-Math.max(a,r.t[0]))/(b-a);return {p,s:Math.round(Math.min(100,ov*85+(p.season===SEASON||p.season==='Quanh năm'?15:0)))}}).filter(x=>x.s>=50).sort((a,b)=>b.s-a.s).slice(0,5)
const bb=`${r.lng-.15}%2C${r.lat-.1}%2C${r.lng+.15}%2C${r.lat+.1}`
return(<div className="grid md:grid-cols-2 gap-4"><div className="card space-y-3"><h3 className="font-bold text-lg">Bản đồ thổ nhưỡng & thời tiết</h3>
<div className="flex gap-2"><select className="inp" value={r.n} onChange={e=>setR(REGIONS.find(x=>x.n===e.target.value))}>{REGIONS.map(x=><option key={x.n}>{x.n}</option>)}</select><button className="btn shrink-0" onClick={gps}>Dùng GPS</button></div>
{msg&&<p className="text-sm">{msg}</p>}
<iframe title="Bản đồ" className="w-full h-56 rounded-lg border border-emerald-800" src={`https://www.openstreetmap.org/export/embed.html?bbox=${bb}&layer=mapnik&marker=${r.lat}%2C${r.lng}`}/>
<ul className="text-sm space-y-1"><li>🏔️ Địa hình: <b>{r.terrain}</b></li><li>🟤 Loại đất: <b>{r.soil}</b></li><li>🌡️ Nhiệt độ trung bình: <b>{r.t[0]}-{r.t[1]}°C</b></li><li>💦 Độ ẩm trung bình: <b>{r.h}</b></li><li>📅 Mùa vụ hiện tại: <b>{SEASON}</b></li></ul></div>
<div className="card space-y-2"><h3 className="font-bold text-lg">Hạt giống phù hợp với {r.n}</h3>{!rec.length&&<p className="text-sm">Chưa có hạt giống phù hợp.</p>}
{rec.map(({p,s})=><div key={p.id} className="flex items-center justify-between border-t border-emerald-900/60 py-2 text-sm"><span>{p.emoji} <b>{p.name}</b> • {vnd(p.price)}<br/><span className="text-xs">Độ phù hợp {s}%</span></span><button className="btn2" onClick={()=>add(p)}>Thêm</button></div>)}
{rec.length>0&&<button className="btn w-full" onClick={()=>rec.forEach(x=>add(x.p))}>Thêm nhanh bộ hạt giống phù hợp vào giỏ</button>}</div></div>)}
