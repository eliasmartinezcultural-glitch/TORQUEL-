document.getElementById("year").textContent=new Date().getFullYear();

const header=document.querySelector(".header");
window.addEventListener("scroll",()=>header.classList.toggle("compact",window.scrollY>40),{passive:true});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
 a.addEventListener("click",event=>{
  const el=document.querySelector(a.getAttribute("href"));
  if(!el)return;
  event.preventDefault();
  el.scrollIntoView({behavior:"smooth",block:"start"});
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

document.querySelectorAll(".service,.steps>div,.evidence-board,.founder>div,.dossier-card,.sector-list>div,.intake-flow>div").forEach(el=>observer.observe(el));
