import {useState} from 'react'
import {COMPANION,CROPS} from '../data/mockData'
export default function CompanionPlanting({products}){
const [n,setN]=useState(products[0]?.name),r=COMPANION[n]
return(<div className="space-y-4"><div className="card"><h3 className="font-bold text-lg mb-2">Gợi ý trồng xen canh & luân canh</h3>
<select className="inp max-w-xs" value={n} onChange={e=>setN(e.target.value)}>{products.map(p=><option key={p.id}>{p.name}</option>)}</select></div>
{!r?<p className="card text-sm">Chưa có dữ liệu cho cây này.</p>:<div className="grid md:grid-cols-2 gap-4">
<div className="card border-primary"><h4 className="font-bold text-primary mb-2">✅ Nên trồng chung</h4>{r.good.length?r.good.map(([a,b])=><div key={a} className="bg-leaf/60 rounded-lg p-3 mb-2"><b>{a}</b><p className="text-sm">{b}</p></div>):<p className="text-sm">Chưa có gợi ý.</p>}</div>
<div className="card border-red-300"><h4 className="font-bold text-red-700 mb-2">⚠️ Tránh trồng chung</h4>{r.bad.length?r.bad.map(([a,b])=><div key={a} className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2"><b>{a}</b><p className="text-sm">{b}</p></div>):<p className="text-sm">Không có cảnh báo.</p>}</div></div>}
<div className="card"><h4 className="font-bold mb-1">🔄 Gợi ý luân canh vụ sau</h4><p className="text-sm">{CROPS[n]?.rotation||'Chưa có dữ liệu.'}</p></div></div>)}
