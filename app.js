const T={ru:{
nav_home:"Глобус",nav_lang:"Языки",nav_act:"Что можно сделать",
title:"Языки, которые исчезают",
lead:"Многие из примерно 7000 языков мира находятся под угрозой исчезновения. Покрути глобус и посмотри, где они живут.",
legend:"Статус уязвимости",
st_vulnerable:"Уязвимый",st_definitely:"Под угрозой",st_severe:"В серьёзной опасности",st_critical:"На грани исчезновения",st_extinct:"Исчез",
globe_alt:"Интерактивный глобус языков",globe_open:"Открыть глобус в отдельном окне",
all_langs:"Все языки",
l_title:"Языки",l_search:"Поиск по названию или региону",l_all:"Все статусы",
l_count:"Найдено: ",l_none:"Ничего не найдено. Попробуй другой запрос.",l_sp:"Носителей: ",
a_title:"Что можно сделать",
a_lead:"Язык живёт, пока на нём говорят. Вот несколько способов помочь.",
o1:"Endangered Languages Project",o1d:"Крупнейшая база данных об исчезающих языках: тексты, записи, описания.",
o2:"Wikitongues",o2d:"Волонтёры записывают видео на сотнях языков мира. Можно смотреть и присоединяться.",
o3:"Living Tongues Institute",o3d:"Исследует и документирует языки, которым грозит исчезновение.",
o4:"Mozilla Common Voice",o4d:"Открытый проект по сбору голосов. Можно записать фразы и помочь малым языкам.",
o5:"UNESCO: Atlas языков мира",o5d:"Официальный источник данных о статусе уязвимости языков.",
rec_t:"Расскажи о своём языке",
rec_d:"Говоришь на редком языке или знаешь, кто говорит? Пришли слово, фразу или запись, и мы добавим её на сайт.",
rec_b:"Написать нам",
foot:"Проект о языках мира и их сохранении"},
en:{
nav_home:"Globe",nav_lang:"Languages",nav_act:"What you can do",
title:"Languages that are disappearing",
lead:"Many of the world’s roughly 7,000 languages are at risk of disappearing. Spin the globe and see where they live.",
legend:"Vulnerability status",
st_vulnerable:"Vulnerable",st_definitely:"Definitely endangered",st_severe:"Severely endangered",st_critical:"Critically endangered",st_extinct:"Extinct",
globe_alt:"Interactive globe of languages",globe_open:"Open the globe in a new window",
all_langs:"All languages",
l_title:"Languages",l_search:"Search by name or region",l_all:"All statuses",
l_count:"Found: ",l_none:"Nothing found. Try another search.",l_sp:"Speakers: ",
a_title:"What you can do",
a_lead:"A language lives as long as people speak it. Here are a few ways to help.",
o1:"Endangered Languages Project",o1d:"The largest database of endangered languages: texts, recordings, descriptions.",
o2:"Wikitongues",o2d:"Volunteers record videos in hundreds of languages. You can watch and join in.",
o3:"Living Tongues Institute",o3d:"Researches and documents languages facing extinction.",
o4:"Mozilla Common Voice",o4d:"An open project collecting voices. Record phrases and help smaller languages.",
o5:"UNESCO: Atlas of the World’s Languages in Danger",o5d:"The official source for language vulnerability status.",
rec_t:"Tell us about your language",
rec_d:"Do you speak a rare language or know someone who does? Send a word, a phrase or a recording and we’ll add it to the site.",
rec_b:"Write to us",
foot:"A project about the world’s languages and keeping them alive"}};
const ST=["vulnerable","definitely","severe","critical","extinct"];
let lang=(navigator.language||"").startsWith("ru")?"ru":"en";
try{lang=localStorage.getItem("lang")||lang}catch(e){}
const t=k=>T[lang][k]||k;
const PAGES=[["index.html","nav_home"],["languages.html","nav_lang"],["act.html","nav_act"]];
function shell(){
 const cur=document.body.dataset.page;
 document.body.insertAdjacentHTML("afterbegin",'<header><nav>'+PAGES.map(p=>`<a href="${p[0]}" data-i18n="${p[1]}"${p[0]==cur?' aria-current="page"':''}></a>`).join("")+'</nav><button id="lang" type="button"></button></header>');
 document.body.insertAdjacentHTML("beforeend",'<footer data-i18n="foot"></footer>');
 document.getElementById("lang").onclick=()=>{lang=lang=="ru"?"en":"ru";try{localStorage.setItem("lang",lang)}catch(e){}apply()};
 const l=document.getElementById("legend");
 if(l)l.innerHTML=ST.map(s=>`<li style="--c:var(--${s})" data-i18n="st_${s}"></li>`).join("");
 const f=document.getElementById("status");
 if(f)f.innerHTML='<option value="" data-i18n="l_all"></option>'+ST.map(s=>`<option value="${s}" data-i18n="st_${s}"></option>`).join("");
 ["q","status"].forEach(id=>{const e=document.getElementById(id);if(e)e.oninput=render});
}
function apply(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=t(e.dataset.i18n));
 document.querySelectorAll("[data-ph]").forEach(e=>e.placeholder=t(e.dataset.ph));
 document.querySelectorAll("[data-alt]").forEach(e=>e.title=t(e.dataset.alt));
 document.getElementById("lang").textContent=lang=="ru"?"EN":"RU";
 render();
}
function render(){
 const box=document.getElementById("list");if(!box||typeof LANGS=="undefined")return;
 const q=document.getElementById("q").value.toLowerCase(),s=document.getElementById("status").value;
 const r=LANGS.filter(x=>(!s||x.s==s)&&(!q||(x.n.en+x.n.ru+x.r.en+x.r.ru).toLowerCase().includes(q)));
 document.getElementById("count").textContent=t("l_count")+r.length;
 box.innerHTML=r.length?r.map(x=>`<article class="card" style="--c:var(--${x.s})"><h3>${x.n[lang]}</h3><p class="dot">${t("st_"+x.s)}</p><p>${x.r[lang]}</p><p>${t("l_sp")}${x.sp}</p></article>`).join(""):`<p>${t("l_none")}</p>`;
}
shell();apply();
