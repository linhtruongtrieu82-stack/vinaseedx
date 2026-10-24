import {useState} from 'react'
import {vnd} from '../data/mockData'
const PL={sun:['Cà chua bi','Ớt chỉ thiên','Dưa leo','Húng quế'],part:['Cải xanh','Húng quế','Hoa hướng dương'],shade:['Xà lách hữu cơ','Cải xanh']}
export default function AIGardenPlanner({products,add}){
const [img,setImg]=useState(null),[L,setL]=useState(null),[area,setArea]=useState(3)
const pick=e=>{const f=e.target.files[0];if(!f)return;const u=URL.createObjectURL(f);setImg(u);const im=new Image();im.onload=()=>{const cv=document.createElement('canvas');cv.width=cv.height=32;const x=cv.getContext('2d');x.drawImage(im,0,0,32,32);const d=x.getImageData(0,0,32,32).data;let s=0;for(let i=0;i<d.length;i+=4)s+=(d[i]+d[i+1]+d[i+2])/3;setL(s/1024)};im.src=u}
const k=L===null?null:L>150?'sun':L>90?'part':'shade',name={sun:'Nắng trực tiếp',part:'Bán râm',shade:'Bóng râm'}[k]
const by=n=>products.find(p=>p.name===n)
const seeds=k?PL[k].map(by).filter(Boolean):[]
const need=k?[[by('Khay ươm hạt'),1],[by('Đất trồng hữu cơ (5kg)'),Math.ceil(area*2)],[by('Phân hữu cơ vi sinh'),1],...(area<=2||area>6?[[by('Chậu treo ban công'),area<=2?2:3]]:[]),...(k==='sun'?[[by('Giàn leo mini'),Math.max(1,Math.round(area/3))]]:[])].filter(x=>x[0]):[]
const combo=[...seeds.map(p=>[p,1]),...need],total=combo.reduce((s,[p,q])=>s+p.price*q,0)
const rows=k?[['Phía sau (giàn leo)',k==='sun'?seeds.slice(0,2).map(p=>p.emoji).join(' ')+' 🪜':'🪜 (không bắt buộc)'],['Ở giữa (khay rau tầng)',seeds.slice(-2).map(p=>p.emoji).join(' ')+' 🧫'],['Phía trước (chậu treo/khay thấp)','🪴 '+seeds.slice(-1).map(p=>p.emoji)]]:[]
return(<div className="grid md:grid-cols-2 gap-4"><div className="card space-y-3"><h3 className="font-bold text-lg">AI thiết kế vườn nhà</h3>
{img?<img src={img} alt="Không gian vườn" className="w-full rounded-lg max-h-64 object-cover"/>:<div className="bg-emerald-800/40 rounded-lg py-16 text-center text-5xl">🏡</div>}
<label className="btn cursor-pointer inline-block">Chụp / tải ảnh ban công, sân thượng<input type="file" accept="image/*" capture="environment" className="hidden" onChange={pick}/></label>
<label className="block text-sm">Diện tích ước tính (m²)<input type="number" min="1" max="50" className="inp mt-1" value={area} onChange={e=>setArea(Math.max(1,+e.target.value||1))}/></label>
<p className="text-xs">Ánh sáng được ước tính từ độ sáng của ảnh, kết quả mang tính tham khảo.</p></div>
<div className="space-y-3">{!k&&<div className="card text-sm">Tải ảnh không gian của bạn để nhận bản thiết kế và combo trọn bộ.</div>}
{k&&<><div className="card"><h4 className="font-bold">Điều kiện ánh sáng: {name}</h4><p className="text-sm">Diện tích {area}m². Bố trí đề xuất:</p>
{rows.map(([a,b])=><div key={a} className="flex justify-between bg-emerald-800/50 rounded-lg p-2 mt-2 text-sm"><span>{a}</span><span>{b}</span></div>)}</div>
<div className="card"><h4 className="font-bold mb-2">Combo trọn bộ</h4>{combo.map(([p,q])=><div key={p.id} className="flex justify-between border-t border-emerald-900/60 py-1 text-sm"><span>{p.emoji} {p.name} x{q}</span><span className="text-lime-400">{vnd(p.price*q)}</span></div>)}
<p className="font-bold mt-2">Tổng: <span className="text-lime-400">{vnd(total)}</span></p><button className="btn w-full mt-2" onClick={()=>combo.forEach(([p,q])=>{for(let i=0;i<q;i++)add(p)})}>Thêm cả combo vào giỏ</button></div></>}</div></div>)}
