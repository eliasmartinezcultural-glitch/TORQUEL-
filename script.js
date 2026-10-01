document.getElementById("year").textContent=new Date().getFullYear();

const header=document.querySelector(".header");
let previous=window.scrollY;
window.addEventListener("scroll",()=>{
 const current=window.scrollY;
 header.classList.toggle("compact",current>40);
 previous=current;
},{passive:true});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
 a.addEventListener("click",event=>{
  const el=document.querySelector(a.getAttribute("href"));
  if(!el)return;
  event.preventDefault();
  el.scrollIntoView({behavior:"smooth",block:"start"});
 });
});

const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")});
},{threshold:.08});
document.querySelectorAll(".service,.steps>div,.evidence-board,.founder>div").forEach(el=>observer.observe(el));
