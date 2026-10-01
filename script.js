document.getElementById("year").textContent=new Date().getFullYear();

const header=document.querySelector(".site-header");
let lastY=window.scrollY;
window.addEventListener("scroll",()=>{
  const y=window.scrollY;
  header.classList.toggle("scrolled",y>20);
  lastY=y;
},{passive:true});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    const target=document.querySelector(link.getAttribute("href"));
    if(!target)return;
    e.preventDefault();
    target.scrollIntoView({behavior:"smooth",block:"start"});
  });
});
