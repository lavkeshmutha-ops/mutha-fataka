/* ─ CURSOR ─ */
const C = document.getElementById('c'), CR = document.getElementById('cr');
const hasFinePointer=window.matchMedia('(hover:hover) and (pointer:fine) and (min-width:1101px)').matches;
if(C&&CR&&hasFinePointer){
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function anim(){
    rx+=(mx-rx)*.3; ry+=(my-ry)*.3;
    C.style.cssText=`left:${mx}px;top:${my}px`;
    CR.style.cssText=`left:${rx}px;top:${ry}px`;
    requestAnimationFrame(anim);
  })();
  document.querySelectorAll('a,button,[data-tilt]').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
  });
}

/* ─ NAV SCROLL ─ */
window.addEventListener('scroll',()=>{
  document.getElementById('nav').style.background =
    window.scrollY>80 ? 'rgba(6,1,0,.97)' : 'rgba(11,2,0,.88)';
},{passive:true});

/* ─ LIVE STORE HOURS ─ */
function getIndiaTime(){
  return new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Kolkata'}));
}
function formatClock(date){
  return date.toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit',hour12:true});
}
function updateStoreStatus(){
  const now=getIndiaTime();
  const minutes=now.getHours()*60+now.getMinutes();
  const opens=9*60+30;
  const closes=22*60;
  const isOpen=minutes>=opens&&minutes<closes;
  const currentTime=formatClock(now);
  const shortText=isOpen ? 'Open now · Closes 10:00 PM' : 'Closed now · Opens 9:30 AM';
  const fullText=`${shortText} · IST ${currentTime}`;

  const liveStatus=document.getElementById('liveStatus');
  const liveDot=document.getElementById('liveDot');
  const topStoreStatus=document.getElementById('topStoreStatus');
  const ctaStoreStatus=document.getElementById('ctaStoreStatus');
  const locationStoreStatus=document.getElementById('locationStoreStatus');

  if(liveStatus) liveStatus.textContent=fullText;
  if(liveDot){
    liveDot.classList.toggle('open',isOpen);
    liveDot.classList.toggle('closed',!isOpen);
  }
  if(topStoreStatus) topStoreStatus.textContent=shortText;
  if(ctaStoreStatus) ctaStoreStatus.textContent=`${shortText} · Mon–Sun 9:30 AM – 10:00 PM`;
  if(locationStoreStatus) locationStoreStatus.innerHTML=`${shortText}<br/>Monday – Sunday · 9:30 AM – 10:00 PM`;
}
updateStoreStatus();
setInterval(updateStoreStatus,60000);

/* ─ SCROLL REVEAL ─ */
const obs=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});
},{threshold:.1,rootMargin:'-50px 0px'});
document.querySelectorAll('.r').forEach(el=>obs.observe(el));

/* ─ COUNTERS ─ */
function countUp(el,t){
  const dur=2000,step=16;
  let start=null;
  function frame(ts){
    if(!start)start=ts;
    const p=Math.min((ts-start)/dur,1);
    const val=Math.floor(p*t);
    el.textContent = t>=1000 ? (val>=1000?val.toLocaleString('en-IN')+'+':(val+'')) : val+'+';
    if(p<1)requestAnimationFrame(frame);
    else el.textContent = t>=1000 ? t.toLocaleString('en-IN')+'+' : t+'+';
  }
  requestAnimationFrame(frame);
}
const cobs=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      const t=parseInt(e.target.dataset.count);
      if(!isNaN(t))countUp(e.target,t);
      cobs.unobserve(e.target);
    }
  });
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cobs.observe(el));

/* ─ PARALLAX ─ */
const himg=document.getElementById('himg'),pimg=document.getElementById('pimg');
const pstripEl=document.getElementById('pstrip');
window.addEventListener('scroll',()=>{
  const s=window.scrollY;
  if(himg) himg.style.transform=`scale(1.06) translateY(${Math.min(s*.04,80)}px)`;
  if(pimg&&pstripEl){
    const off=pstripEl.getBoundingClientRect().top;
    const move=Math.max(Math.min(-off*.08,60),-60);
    pimg.style.transform=`translateY(${move}px)`;
  }
},{passive:true});

/* ─ 3D TILT ─ */
document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const dx=(e.clientX-r.left-r.width/2)/(r.width/2);
    const dy=(e.clientY-r.top-r.height/2)/(r.height/2);
    card.style.transform=`perspective(800px) rotateY(${dx*7}deg) rotateX(${-dy*4}deg) translateZ(10px)`;
    card.style.transition='transform .06s linear';
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
    card.style.transition='transform .6s cubic-bezier(.16,1,.3,1),background .4s';
  });
});

/* ─ HERO IMAGE SLOW ZOOM ─ */
setTimeout(()=>{if(himg)himg.style.transform='scale(1.06) translateY(0px)';},100);

