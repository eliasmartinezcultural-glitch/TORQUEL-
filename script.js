const PHONE="5492995336581";
const year=document.getElementById("year");
if(year) year.textContent=new Date().getFullYear();

function openWhatsApp(message){
  const url="https://wa.me/"+PHONE+"?text="+encodeURIComponent(message);
  window.open(url,"_blank","noopener,noreferrer");
}

document.querySelectorAll("[data-wa]").forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    openWhatsApp(link.dataset.message||"Hola Gastón, quiero consultar por TORQUEL.");
  });
});

document.querySelectorAll(".service-select").forEach(button=>{
  button.addEventListener("click",()=>{
    const service=document.getElementById("service");
    if(service) service.value=button.dataset.service||"";
    document.getElementById("contacto")?.scrollIntoView({behavior:"smooth",block:"start"});
    setTimeout(()=>document.getElementById("need")?.focus(),420);
  });
});

const form=document.getElementById("quoteForm");
form?.addEventListener("submit",e=>{
  e.preventDefault();
  const service=document.getElementById("service")?.value.trim();
  const company=document.getElementById("company")?.value.trim();
  const location=document.getElementById("location")?.value.trim();
  const need=document.getElementById("need")?.value.trim();

  if(!service||!need){
    if(!service) document.getElementById("service")?.focus();
    else document.getElementById("need")?.focus();
    return;
  }

  const message=[
    "Hola Gastón, quiero consultar por TORQUEL.",
    "",
    "SERVICIO: "+service,
    company?"EMPRESA / EQUIPO: "+company:"",
    location?"UBICACIÓN: "+location:"",
    "REQUERIMIENTO: "+need,
    "",
    "Quedo atento/a para coordinar disponibilidad, alcance y presupuesto."
  ].filter(Boolean).join("\n");

  openWhatsApp(message);
});

const header=document.querySelector(".header");
window.addEventListener("scroll",()=>{
  header?.classList.toggle("compact",window.scrollY>35);
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
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08});
document.querySelectorAll(".service,.process-line>div,.quote-form").forEach(el=>observer.observe(el));
