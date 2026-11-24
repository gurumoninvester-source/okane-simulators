/* Browser ES module. Pure view helpers, no network and no production calculation changes. */
const ink='#232624',green='#315F5B',ochre='#C79A3B',brick='#B55B46';
const rect=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="${c}"/>`;
const line=(d,c=ink,w=1.5,extra='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" ${extra}/>`;
const label=(x,y,t,c=ink,anchor='start',size=10)=>`<text x="${x}" y="${y}" fill="${c}" text-anchor="${anchor}" font-size="${size}">${t}</text>`;
const base=()=>line('M10 12V92H142','#C8C5BA')+line('M10 32H142M10 55H142M10 78H142','#E1DDD2',1,'stroke-dasharray="3 3"');
const svg=s=>`<svg class="ux05-figure" viewBox="0 0 150 105" aria-hidden="true" focusable="false">${s}</svg>`;
export const catalog={
 investment:['積立投資','毎月3万円。35年後はいくら？',()=>base()+line('M10 92L140 50',ochre,2.5)+line('M10 92Q100 81 140 9',green,3)+line('M10 92Q85 66 140 70',brick,2,'stroke-dasharray="4 3"')+label(137,7,'評価額',green,'end')+label(137,45,'元本','#8B702E','end')],
 income:['年収と手取り','年収が100万円増えると？',()=>line('M8 92H145','#C8C5BA')+[30,42,53,60].map((h,i)=>rect(13+i*34,92-h,22,h,green)+rect(13+i*34,92-h-7-i*3,22,7+i*3,ochre)+rect(13+i*34,92-h-10-i*5,22,3+i*2,brick)).join('')+label(13,12,'手取り',green)+label(53,12,'保険','#8B702E')+label(88,12,'税金',brick)],
 pension:['年金','何歳から受け取る？',()=>base()+line('M10 90L140 25',green,2.5)+line('M38 92L140 12',brick,2.5)+line('M63 92L140 4',ochre,2.5)+label(12,103,'60歳')+label(55,103,'65歳')+label(100,103,'70歳')],
 'kodomo-nisa':['こどもNISA','児童手当を積み立てたら？',()=>base()+[14,26,39,55,75].map((h,i)=>rect(15+i*25,92-h,17,h,i<2?ochre:green)).join('')+label(12,103,'0歳')+label(140,103,'18歳',ink,'end')],
 household:['家事・育児','毎日の時間を金額にすると？',()=>`<circle cx="40" cy="45" r="28" fill="none" stroke="#D6D0C3" stroke-width="7"/>`+line('M40 17A28 28 0 0 1 68 45',green,7)+line('M40 27V45L53 53',ink,2)+[0,1,2,3,4,5].map(i=>`<rect x="${81+i%3*20}" y="${22+Math.floor(i/3)*22}" width="16" height="18" rx="2" fill="none" stroke="${ochre}" stroke-width="1.8"/>`).join('')+label(75,91,'時間 → 換算',green,'middle')],
 regional:['地域の物価','住む場所で生活費は変わる？',()=>[93,78,65].map((w,i)=>label(6,20+i*26,['東京','全国','地方例'][i])+rect(46,8+i*26,w,15,[brick,ochre,green][i])).join('')],
 'regional-wages':['地域の賃金','都道府県の給与を比べる',()=>[80,66,49,38].map((h,i)=>rect(15+i*34,90-h,22,h,i===0?brick:green)).join('')+line('M10 92H142','#C8C5BA')],
 'household-survey':['都市別の家計','収入と支出の中身を比べる',()=>[0,1].map(i=>[42,26,18].map((w,j)=>rect(12+i*70,18+j*23,w,14,[green,ochre,brick][j])).join('')).join('')+label(15,96,'都市A')+label(85,96,'都市B')],
 furusato:['ふるさと納税','寄付の上限はいくら？',()=>rect(10,32,100,24,green)+rect(110,32,14,24,brick)+line('M124 32H140V56H124Z',ink,1,'stroke-dasharray="3 3"')+label(10,21,'控除の目安')+label(140,77,'自己負担',brick,'end')],
 securities:['証券口座の出口','移す・売ると何が変わる？',()=>[115,82,49].map((w,i)=>rect(10,12+i*28,w,17,[green,ochre,brick][i])).join('')+line('M130 20H143M137 14L143 20L137 26',ink)],
 products:['資産管理の道具','月ごとの資産を振り返る',()=>base()+line('M10 82L40 70L65 76L85 48L109 54L140 16',green,2.5)+label(140,13,'純資産',green,'end')],
 note:['noteで深掘り','数字の背景を読む',()=>line('M25 12H125V92H25Z M37 30H111M37 43H111M37 56H95M37 69H111',ink,1.7)+rect(37,77,45,5,ochre)],
 methodology:['計算の前提','何を数え、何を数えない？',()=>[0,1,2].map(i=>line(`M14 ${22+i*27}l5 5 10 -12`,green,2)+line(`M40 ${22+i*27}H135`,'#A9A69B',2)).join('')]
};
// Exact migration: preserve existing hrefs and verified text, never infer a new route.
export function mountCards(container){
 const links=[...container.querySelectorAll(':scope > a')];
 const rows=links.map(a=>{const u=new URL(a.getAttribute('href'),document.baseURI);const key=u.hostname==='note.com'?'note':u.pathname.split('/').filter(Boolean).at(-1);return {a,key,entry:catalog[key],verified:a.querySelector('.verified')?.textContent||''};});
 if(rows.some(x=>!x.entry))throw new Error('unmapped card: '+rows.filter(x=>!x.entry).map(x=>x.key).join(','));
 container.classList.remove('tiles','cards');container.classList.add('ux05-cards');
 const order=['investment','income','pension','kodomo-nisa','household','regional','regional-wages','household-survey','furusato','securities','products','note','methodology'];
 rows.sort((a,b)=>order.indexOf(a.key)-order.indexOf(b.key));
 for(const {a,key,entry,verified} of rows){a.classList.remove('tile','card','wide');a.classList.add('ux05-card');a.replaceChildren();a.insertAdjacentHTML('beforeend',svg(entry[2]()));for(const [cls,txt] of [['ux05-title',entry[0]],['ux05-question',entry[1]],['ux05-link',['products','note','methodology'].includes(key)?'見る →':'試算する →'],['ux05-meta',verified]]){if(!txt)continue;const t=document.createElement('span');t.className=cls;t.textContent=txt;a.append(t)}container.append(a)}
 const cap=document.createElement('p');cap.className='ux05-caption';cap.textContent='図は機能を示す概念図です。';container.append(cap);
}
// Adapter contract: rows are 56 existing-model outputs (30..85), in integer yen. No independent production calculation.
export function renderTimeline(svgEl,rows,age){
 if(rows.length!==56||rows.some((r,i)=>r.age!==30+i||!Number.isSafeInteger(r.rent)||!Number.isSafeInteger(r.own)||r.rent<0||r.own<0)||!Number.isInteger(age)||age<30||age>85)throw Error('invalid rows/age');
 const x=a=>45+(a-30)*264/55, ymax=Math.max(1,...rows.map(r=>Math.max(r.rent,r.own)));const maxH=62;
 let s=[30,65,85].map(a=>label(x(a),15,a+'歳',ink,'middle',11)+line(`M${x(a)} 22V244`,'#C9C3B5',1,'stroke-dasharray="4 4"')).join('');
 for(const [i,key,name,color] of [[0,'rent','賃貸',brick],[1,'own','持家',green]]){
 const dy=i*113, y=119+dy; s+=label(7,40+dy,name,color,'start',12)+line(`M15 ${y}H327`,'#8D8D82');
 // At 30 spending is zero. Each column is the exact cumulative value at that age, scaled identically in both lanes.
 for(const r of rows.slice(1,age-29)){const h=r[key]/ymax*maxH;s+=rect(x(r.age)-1.8,y-h,3.6,h,color)}
 const cx=x(age);s+=`<g transform="translate(${cx-10} ${y-80})" stroke="${ink}" fill="none" stroke-width="1.8" stroke-linecap="round"><circle cx="10" cy="9" r="6"/><path d="M10 15V32M10 20L1 27M10 20L20 24M10 32L3 45M10 32L20 43"/></g>`;
 s+=i?line(`M31 ${y-15}L40 ${y-25}L49 ${y-15}V${y-3}H31Z`):line(`M30 ${y-27}H43V${y-3}H30Z M33 ${y-21}H40 M33 ${y-15}H40`);
 if(i&&age>=65)s+=`<g transform="translate(${x(65)-18} ${y-87}) rotate(-8)"><rect width="40" height="20" rx="2" fill="#F3F0E8" stroke="${brick}"/><text x="20" y="14" text-anchor="middle" font-size="11" fill="${brick}">完済</text></g>`;
 }
 s+=label(170,255,'棒の高さ＝その年齢までの累計現金支出',ink,'middle',10);
 svgEl.setAttribute('viewBox','0 0 340 264');svgEl.innerHTML=s;
}
