import {EXTRAS} from './storeExtras'
export const vnd=n=>Number(n).toLocaleString('vi-VN')+'đ'
export const STATUSES=['Chờ xác nhận','Đã xác nhận','Đang đóng gói','Đang giao','Hoàn thành']
const P=[
['Cà chua bi','Rau củ','Dễ','Xuân',70,25000,120,90,'6.0-6.8','20-30°C','Nắng đầy đủ','🍅'],
['Húng quế','Rau củ','Dễ','Hè',45,15000,8,85,'6.0-7.0','20-32°C','Nắng nhiều','🌿'],
['Cải xanh','Rau củ','Dễ','Thu',30,12000,200,92,'6.0-7.0','15-25°C','Nắng nhẹ','🥬'],
['Dưa leo','Rau củ','Trung bình','Hè',55,18000,60,88,'6.0-7.0','22-30°C','Nắng đầy đủ','🥒'],
['Ớt chỉ thiên','Rau củ','Trung bình','Xuân',90,20000,5,80,'6.0-6.8','22-32°C','Nắng đầy đủ','🌶️'],
['Hoa hướng dương','Hoa','Dễ','Hè',80,22000,75,90,'6.0-7.5','18-30°C','Nắng đầy đủ','🌻'],
['Đu đủ lùn','Cây ăn trái','Khó','Quanh năm',240,45000,40,75,'6.0-6.5','25-32°C','Nắng đầy đủ','🍈'],
['Xà lách hữu cơ','Hạt giống hữu cơ','Dễ','Đông',35,30000,90,95,'6.0-7.0','12-22°C','Bóng râm nhẹ','🥗']]
export const PRODUCTS=P.map((a,i)=>({id:i+1,name:a[0],cat:a[1],diff:a[2],season:a[3],days:a[4],price:a[5],stock:a[6],germ:a[7],ph:a[8],temp:a[9],light:a[10],emoji:a[11]}))
export const POSTS=[
{id:1,title:'Cách làm đất hữu cơ cho vườn ban công',body:'Trộn đất, xơ dừa và phân trùn quế theo tỉ lệ 3:1:1. Đảm bảo thoát nước tốt trước khi gieo.'},
{id:2,title:'Ủ hạt giống đúng cách để nảy mầm đều',body:'Ngâm hạt trong nước ấm 30-35°C từ 4-8 giờ, sau đó ủ khăn ẩm nơi thoáng mát đến khi nhú rễ.'},
{id:3,title:'Xử lý sâu bệnh bằng chế phẩm tự nhiên',body:'Dùng dung dịch tỏi ớt gừng phun buổi chiều mát, 5-7 ngày một lần để hạn chế sâu ăn lá.'}]
export const COMPANION={
'Cà chua bi':{good:[['Húng quế','Xua đuổi sâu bệnh, tăng hương vị cà chua']],bad:[['Dưa leo','Cạnh tranh dinh dưỡng, dễ lây bệnh nấm']]},
'Húng quế':{good:[['Cà chua bi','Cùng nhu cầu nắng, húng quế bảo vệ cà chua'],['Ớt chỉ thiên','Hợp điều kiện nắng và tưới nước']],bad:[]},
'Cải xanh':{good:[['Xà lách hữu cơ','Cùng ưa mát, tận dụng không gian'],['Hoa hướng dương','Thu hút ong bướm, che bóng nhẹ']],bad:[['Cà chua bi','Cạnh tranh dinh dưỡng']]},
'Dưa leo':{good:[['Hoa hướng dương','Làm giàn leo tự nhiên'],['Xà lách hữu cơ','Tận dụng bóng của giàn dưa']],bad:[['Cà chua bi','Dễ lây bệnh chung'],['Húng quế','Húng quế ảnh hưởng vị dưa']]},
'Ớt chỉ thiên':{good:[['Húng quế','Giảm rệp và bọ trĩ'],['Cà chua bi','Cùng chế độ chăm sóc']],bad:[['Đu đủ lùn','Tranh chấp dinh dưỡng đất']]},
'Hoa hướng dương':{good:[['Dưa leo','Dưa leo leo lên thân hoa']],bad:[['Cải xanh','Hoa hướng dương tiết chất ức chế mầm']]},
'Xà lách hữu cơ':{good:[['Cải xanh','Cùng ưa mát'],['Dưa leo','Nhận bóng râm từ giàn']],bad:[]},
'Đu đủ lùn':{good:[['Húng quế','Xua côn trùng gốc cây']],bad:[['Ớt chỉ thiên','Tranh chấp dinh dưỡng']]}}
export const USERS=[
{id:1,name:'Nguyễn Văn An',email:'an@mail.vn',role:'Customer',active:true},
{id:2,name:'Trần Thị Bình',email:'binh@mail.vn',role:'Seller',active:true},
{id:3,name:'Lê Quản Trị',email:'admin@mail.vn',role:'Admin',active:true},
{id:4,name:'Phạm Văn Cường',email:'cuong@mail.vn',role:'Customer',active:false}]
export const SETTINGS={name:'GreenSeed - Mầm Xanh',logo:'',hotline:'0900 123 456',address:'12 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh'}

/* ===== GIAI ĐOẠN 2 ===== */

PRODUCTS.push(...[['Dưa hấu siêu ngọt','Cây ăn trái','Trung bình','Hè',85,45000,60,98,'6.0-6.8','25-35°C','Nắng đầy đủ','🍉'],
['Dâu tây New Zealand','Cây ăn trái','Khó','Xuân',90,52000,30,80,'5.5-6.5','15-26°C','Nắng nhẹ','🍓'],
['Cẩm tú cầu Nhật','Hoa','Trung bình','Xuân',120,48000,25,70,'5.0-6.5','15-25°C','Bán râm','💐'],
['Cà rốt baby Mỹ','Rau củ','Dễ','Thu',60,30000,80,88,'6.0-6.8','16-24°C','Nắng đầy đủ','🥕'],
['Sen đá đa sắc mix','Hoa','Dễ','Quanh năm',120,38000,45,75,'6.0-7.0','20-30°C','Nắng nhẹ','🪴']]
.map((a,i)=>({id:9+i,name:a[0],cat:a[1],diff:a[2],season:a[3],days:a[4],price:a[5],stock:a[6],germ:a[7],ph:a[8],temp:a[9],light:a[10],emoji:a[11]})))
COMPANION['Dưa hấu siêu ngọt']={good:[['Hoa hướng dương','Thu hút ong bướm giúp thụ phấn']],bad:[['Dưa leo','Cùng họ bầu bí, dễ lây bệnh chung']]}
COMPANION['Cà rốt baby Mỹ']={good:[['Xà lách hữu cơ','Xà lách che mát đất, tận dụng không gian giữa các luống']],bad:[]}
COMPANION['Dâu tây New Zealand']={good:[['Xà lách hữu cơ','Giữ ẩm đất và hạn chế cỏ dại']],bad:[['Cải xanh','Cạnh tranh dinh dưỡng và dễ chung sâu hại']]}
PRODUCTS.forEach(p=>Object.assign(p,EXTRAS[p.name]||{}))
export const BLOG_CATS=['Kỹ thuật gieo hạt','Trị bệnh cây','Mẹo làm đất','Thiết kế sân vườn','Review hạt giống']
PRODUCTS.push(...[['Phân hữu cơ vi sinh',48000,'🧴'],['Dầu Neem sinh học',70000,'🧪'],['Khay ươm hạt',35000,'🧫'],['Chậu treo ban công',60000,'🪴'],['Đất trồng hữu cơ (5kg)',55000,'🟤'],['Giàn leo mini',90000,'🪜']]
.map(([name,price,emoji],i)=>({id:101+i,name,cat:'Vật tư & dụng cụ',diff:'Dễ',season:'Quanh năm',days:0,price,stock:50,germ:'-',ph:'-',temp:'-',light:'-',emoji})))
COMPANION['Cà chua bi'].bad.push(['Khoai tây','Dễ lây chéo bệnh sương mai'])
const LEAF=['Cải xanh','Xà lách hữu cơ','Húng quế']
export const CROPS=Object.fromEntries(PRODUCTS.filter(p=>p.days>0).map(p=>{const leaf=LEAF.includes(p.name),h=p.days
const f=[[10,'Phân hữu cơ vi sinh / NPK pha loãng'],[18,'Phân hữu cơ vi sinh / NPK pha loãng']]
if(h>25)f.push([Math.min(24,h-8),leaf?'Đạm hữu cơ (nước ủ đậu, phân cá)':'Kali/Cansibo hỗ trợ đậu quả'])
if(h>=45)f.push([32,leaf?'Đạm hữu cơ đợt 3':'Kali/Cansibo đợt 3'])
return [p.name,{germinationDays:p.name==='Đu đủ lùn'?14:7,harvestDays:h,wateringFrequency:'Giai đoạn đầu phun sương 2 lần/ngày, sau đó tưới gốc 1 lần/ngày',fertilizingSchedule:f.filter(x=>x[0]<h),leaf,
harvestTip:leaf?'Thu hoạch buổi sáng sớm khi lá giòn, chưa ra hoa; nhổ cả gốc hoặc cắt sát gốc.':'Thu khi quả/hoa đạt màu chín đặc trưng, hái buổi sáng mát để giữ độ ngon.',
rotation:leaf?'Luân canh sang cây họ Đậu (đậu cove, đậu tương) để trả lại đạm cho đất sau vụ rau ăn lá tốn đạm.':'Luân canh sang rau ăn lá hoặc cây họ Đậu; bổ sung phân chuồng hoai và vôi nhẹ để phục hồi đất sau vụ tốn Kali.'}]}))
PRODUCTS.forEach(p=>{if(CROPS[p.name])Object.assign(p,CROPS[p.name],{companionPlants:COMPANION[p.name]?.good.map(x=>x[0])||[],avoidPlants:COMPANION[p.name]?.bad.map(x=>x[0])||[]})})
const PC=['Mẹo làm đất','Kỹ thuật gieo hạt','Trị bệnh cây'],PR=[[105,101],[103,1],[102,2]]
POSTS.forEach((b,i)=>Object.assign(b,{cat:PC[i],cover:['🟤','💧','🐛'][i],related:PR[i]}))
POSTS.push({id:4,title:'Biến ban công 3m² thành vườn rau xanh',cat:'Thiết kế sân vườn',cover:'🏡',body:'Dùng giàn leo phía sau, khay rau tầng ở giữa và chậu treo phía trước để tận dụng tối đa ánh sáng.',related:[104,106,3]},
{id:5,title:'Review cà chua bi: nảy mầm đều, dễ trồng',cat:'Review hạt giống',cover:'🍅',body:'Tỉ lệ nảy mầm khoảng 90%, cây khỏe, cho quả sau khoảng 70 ngày. Hợp người mới bắt đầu.',related:[1]},
{id:6,title:'Nhận biết bệnh sương mai và cách xử lý hữu cơ',cat:'Trị bệnh cây',cover:'🍂',body:'Vết úa nâu loang trên lá sau đêm ẩm là dấu hiệu điển hình. Cắt lá bệnh, giảm ẩm và phun chế phẩm sinh học.',related:[102,3]})
export const DISEASES=[
{name:'Bệnh đốm lá',conf:[86,94],cause:'Nấm Cercospora phát triển khi độ ẩm cao, tưới lên lá hoặc trồng quá dày.',fix:'Ngắt bỏ lá bệnh, tưới gốc vào sáng sớm, phun dịch tỏi ớt hoặc chế phẩm Trichoderma 7 ngày/lần.',rec:['Dầu Neem sinh học','Phân hữu cơ vi sinh']},
{name:'Bệnh sương mai',conf:[84,92],cause:'Nấm mốc Phytophthora, hay gặp khi đêm ẩm và ngày mát, lây nhanh giữa cà chua và khoai tây.',fix:'Cắt tỉa lá bệnh, tăng thông thoáng, phun chế phẩm sinh học chiều mát, tránh trồng cạnh khoai tây.',rec:['Dầu Neem sinh học','Cải xanh']},
{name:'Rệp xáp',conf:[88,95],cause:'Rệp hút nhựa ở ngọn và mặt dưới lá non, thường đi kèm kiến.',fix:'Xịt nước mạnh rửa rệp, phun dầu Neem hoặc nước xà phòng loãng, trồng húng quế xung quanh để xua rệp.',rec:['Dầu Neem sinh học','Húng quế']},
{name:'Thiếu vi chất (Mg, Fe)',conf:[78,87],cause:'Đất nghèo dinh dưỡng hoặc pH lệch, lá vàng giữa các gân.',fix:'Bón phân hữu cơ vi sinh, bổ sung phân chuồng hoai, kiểm tra pH đất 6.0-7.0.',rec:['Phân hữu cơ vi sinh','Đất trồng hữu cơ (5kg)']}]
export const REGIONS=[
{n:'Hà Nội',lat:21.03,lng:105.85,soil:'Đất phù sa sông Hồng',terrain:'Đồng bằng, cao 10-20m',t:[17,33],h:'78%'},
{n:'Sa Pa',lat:22.34,lng:103.84,soil:'Đất thịt nhẹ vùng núi',terrain:'Núi cao 1.500m',t:[10,22],h:'85%'},
{n:'Đà Nẵng',lat:16.05,lng:108.2,soil:'Đất cát pha',terrain:'Ven biển',t:[21,33],h:'77%'},
{n:'Đà Lạt',lat:11.94,lng:108.44,soil:'Đất đỏ bazan pha mùn',terrain:'Cao nguyên 1.500m',t:[14,25],h:'80%'},
{n:'Buôn Ma Thuột',lat:12.67,lng:108.04,soil:'Đất đỏ bazan',terrain:'Cao nguyên 500m',t:[20,30],h:'75%'},
{n:'TP. Hồ Chí Minh',lat:10.78,lng:106.7,soil:'Đất xám, phù sa cổ',terrain:'Đồng bằng thấp',t:[25,34],h:'75%'},
{n:'Cần Thơ',lat:10.03,lng:105.78,soil:'Đất phù sa',terrain:'Đồng bằng sông Cửu Long',t:[24,33],h:'80%'}]
