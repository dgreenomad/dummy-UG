
document.addEventListener("DOMContentLoaded",()=>{
 const data=window.UTOPIA_BRANDS||[];
 const el=document.querySelector("#home-brands");
 if(el) el.innerHTML=data.map((b,i)=>`<a class="brand-card" href="brands/${b.slug}/"><div class="brand-art"><span class="brand-no">0${i+1} / UTOPIA PORTFOLIO</span><span class="brand-word">${b.short}</span><span class="brand-type">${b.category.toUpperCase()}</span></div><div class="brand-info"><div class="category">${b.tier}</div><h3>${b.name}</h3><p>${b.desc}</p><span class="view">VIEW BRAND DETAILS ↗</span></div></a>`).join("");
});
