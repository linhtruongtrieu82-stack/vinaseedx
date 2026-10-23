import {useState,useRef} from 'react'
import {DISEASES,vnd} from '../data/mockData'
export default function AIDiseaseScanner({products,add}){
const [img,setImg]=useState(null),[res,setRes]=useState(null),[busy,setBusy]=useState(false),[cam,setCam]=useState(false),vid=useRef()
const analyze=u=>{setImg(u);setRes(null);setBusy(true);setTimeout(()=>{const d=DISEASES[u.length%DISEASES.length];setRes({d,conf:d.conf[0]+u.length%(d.conf[1]-d.conf[0]+1)});setBusy(false)},1500)}
const pick=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>analyze(r.result);r.readAsDataURL(f)}
const start=async()=>{try{const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});setCam(true);setTimeout(()=>{vid.current.srcObject=s;vid.current.play()},50)}catch{alert('Không mở được camera. Hãy cho phép quyền camera hoặc tải ảnh lên.')}}
const snap=()=>{const v=vid.current,cv=document.createElement('canvas');cv.width=v.videoWidth;cv.height=v.videoHeight;cv.getContext('2d').drawImage(v,0,0);v.srcObject.getTracks().forEach(t=>t.stop());setCam(false);analyze(cv.toDataURL('image/jpeg',.8))}
const recs=res?products.filter(p=>res.d.rec.includes(p.name)):[]
return(<div className="grid md:grid-cols-2 gap-4"><div className="card space-y-3"><h3 className="font-bold text-lg">Quét bệnh cây trồng bằng AI</h3>
{cam?<><video ref={vid} className="w-full rounded-lg" playsInline muted/><button className="btn" onClick={snap}>Chụp ảnh</button></>:img?<img src={img} alt="Ảnh cây" className="w-full rounded-lg max-h-72 object-cover"/>:<div className="bg-leaf/40 rounded-lg py-16 text-center text-5xl">🍃</div>}
<div className="flex gap-2 flex-wrap"><button className="btn" onClick={start}>Mở camera</button><label className="btn2 cursor-pointer py-2">Tải ảnh lên<input type="file" accept="image/*" capture="environment" className="hidden" onChange={pick}/></label></div>
<p className="text-xs">Kết quả hiện là mô phỏng để demo giao diện, chưa phải chẩn đoán thật.</p></div>
<div className="space-y-3">{busy&&<div className="card">🔍 Đang phân tích hình ảnh...</div>}
{!busy&&!res&&<div className="card text-sm">Chụp hoặc tải ảnh lá/thân cây bị bệnh để nhận kết quả.</div>}
{res&&<><div className="card space-y-2"><div className="flex justify-between"><h4 className="font-bold text-lg">{res.d.name}</h4><span className="bg-leaf px-2 py-1 rounded-full text-sm">{res.conf}% chính xác</span></div>
<p className="text-sm"><b>Nguyên nhân:</b> {res.d.cause}</p><p className="text-sm"><b>Giải pháp hữu cơ:</b> {res.d.fix}</p></div>
<div className="card"><h4 className="font-bold mb-2">Sản phẩm gợi ý trong cửa hàng</h4>{recs.map(p=><div key={p.id} className="flex items-center justify-between border-t border-mint/40 py-2 text-sm"><span>{p.emoji} {p.name} • <b className="text-earth">{vnd(p.price)}</b></span><button className="btn2" onClick={()=>add(p)}>Thêm vào giỏ</button></div>)}</div></>}</div></div>)}
