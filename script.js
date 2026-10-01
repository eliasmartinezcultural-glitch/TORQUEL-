const PHONE="5492995336581";
const year=document.getElementById("year"); if(year) year.textContent=new Date().getFullYear();

function openWhatsApp(message){
 const url="https://wa.me/"+PHONE+"?text="+encodeURIComponent(message);
 window.open(url,"_blank","noopener");
}

document.querySelectorAll("[data-wa]").forEach(link=>{
 link.addEventListener("click",e=>{
  e.preventDefault();
  openWhatsApp(link.dataset.message||"Hola Gastón, quiero consultar por TORQUEL.");
 });
});

document.querySelectorAll(".service-select").forEach(button=>{
 button.addEventListener("click",()=>{
  const service=button.dataset.service;
  const select=document.getElementById("service");
  if(select) select.value=service;
  document.getElementById("contacto")?.scrollIntoView({behavior:"smooth",block:"start"});
  setTimeout(()=>document.getElementById("need")?.focus(),450);
 });
});

const form=document.getElementById("quoteForm");
form?.addEventListener("submit",e=>{
 e.preventDefault();
 const service=document.getElementById("service")?.value||"Consulta general";
 const company=document.getElementById("company")?.value.trim();
 const location=document.getElementById("location")?.value.trim();
 const need=document.getElementById("need")?.value.trim();
 const message=[
  "Hola Gastón, quiero consultar por TORQUEL.",
  "",
  "Servicio: "+service,
  company?"Empresa / equipo: "+company:"",
  location?"Ubicación: "+location:"",
  need?"Necesidad: "+need:"",
  "",
  "Quedo atento/a para coordinar."
 ].filter(Boolean).join("\n");
 openWhatsApp(message);
});

const header=document.querySelector(".header");
let lastY=0;
window.addEventListener("scroll",()=>{
 const y=window.scrollY;
 header?.classList.toggle("compact",y>35);
 lastY=y;
},{passive:true});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
 a.addEventListener("click",event=>{
  const target=document.querySelector(a.getAttribute("href"));
  if(!target)return;
  event.preventDefault();
  target.scrollIntoView({behavior:"smooth",block:"start"});
 });
});

const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
 });
},{threshold:.08});
document.querySelectorAll(".service,.process-line>div,.quote-form").forEach(el=>observer.observe(el));
document.querySelectorAll(".visual-card,.board-photo,.board-detail,.gallery-track figure").forEach(el=>{
  el.addEventListener("click",()=>{
    const img=el.querySelector("img");
    if(!img)return;
    let viewer=document.querySelector(".image-viewer");
    if(!viewer){
      viewer=document.createElement("div");
      viewer.className="image-viewer";
      viewer.innerHTML='<button type="button" aria-label="Cerrar">×</button><img alt=""><span></span>';
      document.body.appendChild(viewer);
      viewer.addEventListener("click",e=>{if(e.target===viewer||e.target.tagName==="BUTTON")viewer.classList.remove("open")});
      document.addEventListener("keydown",e=>{if(e.key==="Escape")viewer.classList.remove("open")});
    }
    viewer.querySelector("img").src=img.currentSrc||img.src;
    viewer.querySelector("img").alt=img.alt;
    viewer.querySelector("span").textContent=img.alt;
    viewer.classList.add("open");
  });
});
