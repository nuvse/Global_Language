const T={ru:{
nav_globe:"Глобус",nav_status:"Статусы",nav_help:"Что можно сделать",nav_about:"О проекте",
h1:"Языки мира под угрозой",sub:"",
btn_explore:"Исследовать глобус",btn_help:"Что можно сделать",
s1:"языков",s2:"под угрозой",s3:"вымерших",
k_safe:"Безопасный",k_vuln:"Уязвимый",k_def:"Точно под угрозой",k_sev:"Серьёзно под угрозой",k_crit:"Критически под угрозой",k_ext:"Вымерший",k_unk:"Нет данных",
o1:"Крупнейшая база данных об исчезающих языках: тексты, записи, описания.",
o2:"Волонтёры записывают видео на сотнях языков мира. Можно смотреть и присоединяться.",
o3:"Исследует и документирует языки, которым грозит исчезновение.",
o4:"Открытый проект по сбору голосов. Можно записать фразы и помочь малым языкам.",
o5t:"UNESCO: Атлас языков мира",o5:"Официальный источник данных о статусе уязвимости языков.",
ab1:"Данные о языках: Glottolog, UNESCO Atlas of the World’s Languages in Danger, Wikidata и Wikipedia.",
ab2:"Глобус сделан в cables.gl. Управление рукой работает на MediaPipe от Google.",
ab3:"Лицензии и благодарности авторам:"},
en:{
nav_globe:"Globe",nav_status:"Statuses",nav_help:"How to help",nav_about:"About",
h1:"The world’s languages at risk",sub:"",
btn_explore:"Explore the globe",btn_help:"How to help",
s1:"languages",s2:"endangered",s3:"extinct",
k_safe:"Safe",k_vuln:"Vulnerable",k_def:"Definitely endangered",k_sev:"Severely endangered",k_crit:"Critically endangered",k_ext:"Extinct",k_unk:"No data",
o1:"The largest database of endangered languages: texts, recordings, descriptions.",
o2:"Volunteers record videos in hundreds of languages. You can watch and join in.",
o3:"Researches and documents languages facing extinction.",
o4:"An open project collecting voices. Record phrases and help smaller languages.",
o5t:"UNESCO: Atlas of the World’s Languages in Danger",o5:"The official source for language vulnerability status.",
ab1:"Language data: Glottolog, the UNESCO Atlas of the World’s Languages in Danger, Wikidata and Wikipedia.",
ab2:"The globe is made in cables.gl. Hand control runs on Google’s MediaPipe.",
ab3:"Licences and credits:"}};
// Статусы: ключ, цвет, число языков в базе (из cables_data_enriched.json)
const ST=[["safe",2749],["vuln",1696],["def",1464],["sev",591],["crit",443],["ext",1179],["unk",179]];
const COL={safe:"#33d973",vuln:"#1a73ff",def:"#ffd126",sev:"#ff801a",crit:"#ff2633",ext:"#a673ff",unk:"#8c94a6"};
let lang=(navigator.language||"").slice(0,2)==="ru"?"ru":"en";
try{lang=new URLSearchParams(location.search).get("lang")||localStorage.getItem("lang")||lang}catch(e){}
if(lang!=="en")lang="ru";
const t=k=>T[lang][k];
const fmt=n=>n.toLocaleString(lang);
const frame=document.querySelector("#globe iframe");
let loaded=false;
function loadGlobe(){if(loaded)return;loaded=true;frame.src="globe.html?lang="+lang}
function apply(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=t(e.dataset.i18n));
 document.querySelectorAll("[data-n]").forEach(e=>{if(e.dataset.done)e.textContent=fmt(+e.dataset.n)});
 document.getElementById("lang").textContent=lang==="ru"?"EN":"RU";
 document.getElementById("bar").innerHTML=ST.map(([k,n])=>`<i style="--c:${COL[k]};--n:${n}" title="${t("k_"+k)}: ${fmt(n)}"></i>`).join("");
 document.getElementById("leg").innerHTML=ST.map(([k,n])=>`<li style="--c:${COL[k]}"><b>${fmt(n)}</b><span>${t("k_"+k)}</span></li>`).join("");
 if(loaded)frame.src="globe.html?lang="+lang;
}
document.getElementById("lang").onclick=()=>{lang=lang==="ru"?"en":"ru";try{localStorage.setItem("lang",lang)}catch(e){}apply()};
apply();
// Счётчики: один раз при загрузке
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
document.querySelectorAll("[data-n]").forEach(e=>{
 const to=+e.dataset.n,t0=performance.now(),d=still?1:1600;
 (function f(now){const p=Math.min(1,(now-t0)/d),v=Math.round(to*(1-Math.pow(1-p,3)));e.textContent=fmt(v);if(p<1)requestAnimationFrame(f);else e.dataset.done=1})(t0);
});
// Глобус грузится, когда до него почти доскроллили
new IntersectionObserver((es,o)=>{if(es.some(x=>x.isIntersecting)){loadGlobe();o.disconnect()}},{rootMargin:"700px"}).observe(document.getElementById("globe"));
// Вращающийся шар из точек (доли цветов = доли статусов в базе)
(function(){
 const c=document.getElementById("orb"),x=c.getContext("2d"),N=1500,P=[],pool=[];
 ST.forEach(([k,n])=>{for(let i=0;i<Math.round(n/ST.reduce((a,b)=>a+b[1],0)*N);i++)pool.push(COL[k])});
 for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),a=i*2.39996;P.push([Math.cos(a)*r,y,Math.sin(a)*r,pool[(i*7919)%pool.length]])}
 let S,mx=0,my=0,tx=0,ty=0;
 function size(){const d=devicePixelRatio||1,w=c.clientWidth;c.width=c.height=w*d;S=w*d}
 addEventListener("resize",size);size();
 addEventListener("pointermove",e=>{tx=(e.clientX/innerWidth-.5)*.6;ty=(e.clientY/innerHeight-.5)*.4});
 function draw(ts){
  mx+=(tx-mx)*.04;my+=(ty-my)*.04;
  const a=still?.6:ts*.00009+mx,tilt=.38+my,ca=Math.cos(a),sa=Math.sin(a),ct=Math.cos(tilt),st=Math.sin(tilt),R=S*.45,h=S/2;
  x.clearRect(0,0,S,S);
  for(const p of P){
   const X=p[0]*ca+p[2]*sa,Z0=-p[0]*sa+p[2]*ca,Y=p[1]*ct-Z0*st,Z=p[1]*st+Z0*ct,f=(Z+1)/2;
   x.globalAlpha=.12+.88*f*f;x.fillStyle=p[3];
   x.beginPath();x.arc(h+X*R,h+Y*R,(.8+1.9*f)*S/900,0,6.2832);x.fill();
  }
  if(!still)requestAnimationFrame(draw);
 }
 requestAnimationFrame(draw);
})();
