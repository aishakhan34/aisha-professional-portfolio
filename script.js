const nav=document.getElementById("nav");
const menuBtn=document.getElementById("menuBtn");
menuBtn.addEventListener("click",()=>{const opened=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",String(opened));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuBtn.setAttribute("aria-expanded","false");}));

const themeBtn=document.getElementById("themeBtn");
themeBtn.addEventListener("click",()=>{document.body.classList.toggle("light");themeBtn.textContent=document.body.classList.contains("light")?"☾":"☼";});

document.getElementById("year").textContent=new Date().getFullYear();

// Reveal sections and cards as they enter the viewport.
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
}),{threshold:.12});
document.querySelectorAll(".section,.quick-card,.skill-tile,.project,.experience-card,.goodbye").forEach(el=>{
  el.classList.add("reveal");observer.observe(el);
});

// Project category filters.
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  const category=btn.dataset.filter;
  document.querySelectorAll(".project").forEach(card=>{
    const kinds=card.dataset.kind.split(" ");
    card.hidden=category!=="all"&&!kinds.includes(category);
  });
}));

// Contact form opens a pre-filled email; it does not pretend to send from a server.
document.getElementById("contactForm").addEventListener("submit",event=>{
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const name=data.get("name").trim();
  const email=data.get("email").trim();
  const message=data.get("message").trim();
  const subject=encodeURIComponent("Portfolio enquiry from "+name);
  const body=encodeURIComponent("Name: "+name+"\nEmail: "+email+"\n\n"+message);
  document.getElementById("formNote").textContent="Opening your email app…";
  window.location.href="mailto:leo.ayeshakhan2005@gmail.com?subject="+subject+"&body="+body;
});

// Gentle active navigation indicator.
const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".nav a")];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section=>sectionObserver.observe(section));
