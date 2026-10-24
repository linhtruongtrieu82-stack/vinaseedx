import {useState,useEffect} from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomerView from './pages/CustomerView'
import SellerDashboard from './pages/SellerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import BlogManager from './components/BlogManager'
import {PRODUCTS,POSTS,USERS,SETTINGS} from './data/mockData'
function useLS(k,i){const [v,s]=useState(()=>{try{return JSON.parse(localStorage.getItem(k))??i}catch{return i}})
useEffect(()=>{localStorage.setItem(k,JSON.stringify(v))},[k,v]);return [v,s]}
export default function App(){
const [role,setRole]=useLS('gs_role','Customer'),[products,setProducts]=useLS('gs_products2',PRODUCTS),[posts,setPosts]=useLS('gs_posts2',POSTS),[users,setUsers]=useLS('gs_users',USERS)
const [orders,setOrders]=useLS('gs_orders',[]),[cart,setCart]=useLS('gs_cart',[]),[settings,setSettings]=useLS('gs_settings',SETTINGS)
const [q,setQ]=useState(''),[tab,setTab]=useState('shop'),[view,setView]=useState('dash')
const c={products,setProducts,posts,setPosts,users,setUsers,orders,setOrders,cart,setCart,settings,setSettings,q,tab,setTab}
const menu=role==='Customer'?[['shop','Cửa hàng'],['scan','Quét bệnh AI'],['geo','Bản đồ thổ nhưỡng'],['garden','Setup vườn AI'],['blog','Blog']]:[['dash','Bảng điều khiển'],['blog','Quản lý Blog']]
const onMenu=k=>role==='Customer'?setTab(k):setView(k)
return(<div className="min-h-screen flex flex-col"><Navbar settings={settings} q={q} setQ={setQ} cartCount={cart.reduce((s,i)=>s+i.qty,0)} role={role} setRole={r=>{setRole(r);setView('dash')}} menu={menu} onMenu={onMenu} goShop={()=>setTab('shop')} goCart={()=>setTab('cart')}/>
<main className="flex-1">{role==='Customer'?<CustomerView c={c}/>:view==='blog'?<BlogManager c={c}/>:role==='Seller'?<SellerDashboard c={c}/>:<AdminDashboard c={c}/>}</main><Footer settings={settings}/></div>)}
