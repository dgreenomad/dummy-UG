
const rootPath = (() => {
  const p = location.pathname;
  const marker = p.indexOf("/brands/");
  if (marker >= 0) return p.slice(0, marker + 1);
  const known = ["/about/","/brands/","/journey/","/news/","/social-media/","/partnership/","/contact/"];
  for (const k of known) if (p.includes(k)) return p.slice(0,p.indexOf(k)+1);
  return p.endsWith("/") ? p : p.slice(0,p.lastIndexOf("/")+1);
})();
const url = p => rootPath + p.replace(/^\//,"");
const brandLinks = [
 ["Hanam BBQ","brands/hanam-bbq/"],["Samyuga Korean BBQ","brands/samyuga/"],
 ["Butatei Japanese Butadon","brands/butatei/"],["Shaolin Malatang","brands/shaolin-malatang/"],
 ["Hi Kims!","brands/hi-kims/"],["Banco Artisan Bakery","brands/banco-artisan-bakery/"],
 ["Oppa Dosirak","brands/oppa-dosirak/"]
];
const navItems = [["HOME",""],["ABOUT US","about/"],["OUR JOURNEY","journey/"],["NEWS","news/"],["SOCIAL MEDIA","social-media/"],["PARTNERSHIP","partnership/"],["CONTACT","contact/"]];
function renderChrome(){
 const header = document.querySelector("[data-header]");
 const footer = document.querySelector("[data-footer]");
 if(header) header.innerHTML = `<div class="header-inner"><a class="wordmark" href="${url("")}">UTOPIA<i>.</i><small>FOOD & BEVERAGE COMPANY</small></a><nav class="nav">${navItems.slice(0,2).map(n=>`<a href="${url(n[1])}">${n[0]}</a>`).join("")}<div class="nav-group"><button class="nav-trigger" aria-expanded="false">OUR BRANDS⌄</button><div class="dropdown">${brandLinks.map(b=>`<a href="${url(b[1])}">${b[0]}</a>`).join("")}<a class="all" href="${url("brands/")}">VIEW ALL BRANDS →</a></div></div>${navItems.slice(2).map(n=>`<a href="${url(n[1])}">${n[0]}</a>`).join("")}</nav><button class="menu-btn" aria-label="Open menu">MENU</button></div><div class="mobile-nav">${navItems.slice(0,2).map(n=>`<a href="${url(n[1])}">${n[0]}</a>`).join("")}<details><summary>OUR BRANDS</summary>${brandLinks.map(b=>`<a href="${url(b[1])}">${b[0]}</a>`).join("")}<a href="${url("brands/")}">VIEW ALL BRANDS →</a></details>${navItems.slice(2).map(n=>`<a href="${url(n[1])}">${n[0]}</a>`).join("")}</div>`;
 if(footer) footer.innerHTML = `<div class="wrap"><div class="footer-grid"><div><a class="wordmark" href="${url("")}" style="color:white">UTOPIA<i>.</i><small>FOOD & BEVERAGE COMPANY</small></a><p style="margin-top:20px">Building Distinctive Brands.<br>Creating Lasting Value.</p></div><div><div class="footer-title">EXPLORE</div>${navItems.map(n=>`<a href="${url(n[1])}">${n[0]}</a>`).join("")}</div><div><div class="footer-title">OUR PORTFOLIO</div>${brandLinks.map(b=>`<a href="${url(b[1])}">${b[0]}</a>`).join("")}</div></div><div class="footer-bottom"><span>© 2026 UTOPIA GROUP. ALL RIGHTS RESERVED.</span><span>INDONESIA · DISTINCTIVE DINING CONCEPTS</span></div></div>`;
 const menu = document.querySelector(".menu-btn");
 if(menu) menu.addEventListener("click",()=>document.querySelector(".mobile-nav").classList.toggle("open"));
 const trigger = document.querySelector(".nav-trigger");
 if(trigger) trigger.addEventListener("click",()=>{const g=trigger.parentElement;g.classList.toggle("open");trigger.setAttribute("aria-expanded",g.classList.contains("open"))});
}
function brandCard(b,i){return `<a class="brand-card" href="${url("brands/"+b.slug+"/")}"><div class="brand-art"><span class="brand-no">0${i+1} / UTOPIA PORTFOLIO</span><span class="brand-word">${b.short}</span><span class="brand-type">${b.category.toUpperCase()}</span></div><div class="brand-info"><div class="category">${b.tier}</div><h3>${b.name}</h3><p>${b.desc}</p><span class="view">VIEW BRAND DETAILS ↗</span></div></a>`}
function initBrandFilter(){
 const grid=document.querySelector("#brand-grid");if(!grid)return;
 const data=window.UTOPIA_BRANDS||[];
 const buttons=[...document.querySelectorAll("[data-filter]")];
 function show(f){grid.innerHTML=data.filter(b=>f==="all"||(f==="primary"&&b.tier==="Primary Growth")||(f==="secondary"&&b.tier==="Secondary Growth")||(f==="other"&&(b.tier==="Other Brands"||b.tier==="Brand History"))).map((b)=>brandCard(b,data.indexOf(b))).join("")}
 buttons.forEach(b=>b.addEventListener("click",()=>{buttons.forEach(x=>x.classList.remove("active"));b.classList.add("active");show(b.dataset.filter)}));show("all");
}
function initNewsSearch(){const input=document.querySelector("#article-search");if(!input)return;input.addEventListener("input",()=>{const q=input.value.toLowerCase();document.querySelectorAll(".article-card").forEach(c=>c.hidden=!c.innerText.toLowerCase().includes(q))})}

function initMotion(){
 const header=document.querySelector(".site-header");
 const onScroll=()=>{if(header)header.classList.toggle("scrolled",window.scrollY>12)};
 window.addEventListener("scroll",onScroll,{passive:true});onScroll();
 const items=document.querySelectorAll(".section,.content-section,.page-hero,.brand-card,.cap-card,.article-card,.person");
 items.forEach(el=>el.classList.add("reveal"));
 if("IntersectionObserver" in window){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in-view");io.unobserve(e.target)}}),{threshold:.08});
  items.forEach(el=>io.observe(el));
 }else items.forEach(el=>el.classList.add("in-view"));
 document.querySelectorAll("[data-slide]").forEach(btn=>btn.addEventListener("click",()=>{
  const rail=document.querySelector("#home-brands");if(rail)rail.scrollBy({left:Number(btn.dataset.slide)*360,behavior:"smooth"});
 }));
 document.querySelectorAll(".accordion-trigger").forEach(btn=>btn.addEventListener("click",()=>{
  const item=btn.closest(".accordion-item");item.classList.toggle("open");btn.setAttribute("aria-expanded",item.classList.contains("open"));
 }));
}
document.addEventListener("DOMContentLoaded",()=>{renderChrome();initBrandFilter();initNewsSearch();initMotion();document.querySelectorAll("form[data-demo]").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();const n=f.querySelector(".form-note");if(n)n.hidden=false}))});
