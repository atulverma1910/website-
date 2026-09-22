const BOOKING_URL="https://calendly.com/v-atul1910/30min";
function openBooking(){window.open(BOOKING_URL,'_blank')}
const nav=document.getElementById('nav'),tog=document.getElementById('tog'),links=document.getElementById('links');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>50));
tog?.addEventListener('click',e=>{e.stopPropagation();tog.classList.toggle('open');links.classList.toggle('open');document.body.style.overflow=links.classList.contains('open')?'hidden':''});
document.addEventListener('click',e=>{if(links.classList.contains('open')&&!links.contains(e.target)&&!tog.contains(e.target)){tog.classList.remove('open');links.classList.remove('open');document.body.style.overflow=''}});
links?.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{tog.classList.remove('open');links.classList.remove('open');document.body.style.overflow=''}));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){const h=this.getAttribute('href');if(h==='#')return;const t=document.querySelector(h);if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-nav.offsetHeight-20,behavior:'smooth'})}})}); 
const rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
document.addEventListener('DOMContentLoaded',()=>{
  if(!rm){initHero();initScroll();initCounters()}
  else{document.querySelectorAll('[data-target]').forEach(el=>el.textContent=parseInt(el.dataset.target).toLocaleString())}
});
function initHero(){const ss=document.querySelectorAll('.wf-s'),st=document.getElementById('wfSt');if(!ss.length)return;function run(){ss.forEach(s=>s.classList.remove('vis'));if(st){st.textContent='';st.className='wf-stat'}ss.forEach((s,i)=>{setTimeout(()=>{s.classList.add('vis');if(st){const tx=['New lead...','Responding...','Qualifying...','Following up...','Booking...','Ready for agent'];const cl=['wf-stat','wf-stat','wf-stat','wf-stat','wf-stat','wf-stat ready'];st.textContent=tx[i]||'';st.className=cl[i]||'wf-stat'}},i*1200)});setTimeout(run,ss.length*1200+3500)}const ho=new IntersectionObserver(es=>{if(es[0].isIntersecting){run();ho.unobserve(es[0].target)}},{threshold:.2});ho.observe(document.getElementById('heroWf'))}
function initCounters(){const co=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const el=e.target,tgt=parseInt(el.dataset.target),dur=900,st=performance.now();function tk(n){const p=Math.min((n-st)/dur,1),v=1-Math.pow(1-p,3);el.textContent=Math.round(v*tgt).toLocaleString();if(p<1)requestAnimationFrame(tk);else el.classList.add('counted')}requestAnimationFrame(tk);co.unobserve(el)}})},{threshold:.5});document.querySelectorAll('[data-target]').forEach(el=>co.observe(el))}
function initScroll(){
  const hg=document.querySelector('.hero-glow'),hc=document.querySelector('.hero-card');
  if(hg||hc){let tk=false;window.addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(()=>{const y=window.scrollY;if(y<800){if(hg)hg.style.transform=`translate(-50%,calc(-60% + ${y*.08}px)) scale(${1+y*.0003})`;if(hc)hc.style.transform=`translateY(${y*.04}px)`}tk=false})}},{passive:true})}
  observe('.pipe-step',(el,i)=>{el.style.cssText='opacity:0;transform:translateX(-24px)'},(el,i)=>{after(i*120,()=>{el.style.transition='opacity .5s,transform .5s';el.style.opacity='1';el.style.transform='translateX(0)'})},{th:.3,rm:'0px 0px -60px 0px'});
  const bx=document.querySelector('.ba-x'),bv=document.querySelector('.ba-v');
  if(bx){bx.style.cssText='opacity:0;transform:translateX(-32px)'}
  if(bv){bv.style.cssText='opacity:0;transform:translateX(32px)'}
  [bx,bv].filter(Boolean).forEach(el=>{const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){el.style.transition='opacity .6s,transform .6s cubic-bezier(.22,1,.36,1)';el.style.opacity='1';el.style.transform='translateX(0)';o.unobserve(el)}},{threshold:.2});o.observe(el)});
  observe('.feat-card',(el)=>{el.style.cssText='opacity:0;transform:scale(.92)'},(el,i)=>{after(i*80,()=>{el.style.transition='opacity .4s,transform .4s cubic-bezier(.22,1,.36,1)';el.style.opacity='1';el.style.transform='scale(1)'})},{th:.15});
  observe('.track',(el)=>{el.style.cssText='opacity:0;transform:translateY(20px)'},(el,i)=>{after(i*150,()=>{el.style.transition='opacity .5s,transform .5s';el.style.opacity='1';el.style.transform='translateY(0)'})},{th:.2});
  observe('.role',(el,i)=>{el.style.cssText=`opacity:0;transform:rotate(${i===0?-1.5:1.5}deg) translateY(16px)`},(el,i)=>{after(i*180,()=>{el.style.transition='opacity .6s,transform .6s cubic-bezier(.22,1,.36,1)';el.style.opacity='1';el.style.transform='rotate(0) translateY(0)'})},{th:.2});
  const wf=document.querySelector('.why-flow');
  if(wf){const sp=wf.querySelectorAll('span');sp.forEach(s=>{s.style.cssText='opacity:0;transform:translateY(6px)'});const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){sp.forEach((s,i)=>{after(i*100,()=>{s.style.transition='opacity .3s,transform .3s';s.style.opacity='1';s.style.transform='translateY(0)'})});o.unobserve(wf)}},{threshold:.5});o.observe(wf)}
  observe('.cta',(el)=>{el.style.cssText='opacity:0'},(el)=>{el.style.transition='opacity .8s';el.style.opacity='1'},{th:.3});
  observe('.sh',(el)=>{el.style.clipPath='inset(0 0 100% 0)'},(el)=>{el.style.transition='clip-path .7s cubic-bezier(.22,1,.36,1)';el.style.clipPath='inset(0 0 0% 0)'},{th:.15});
  const cr=document.querySelector('.crm');
  if(cr){cr.style.cssText='opacity:0;transform:translateY(12px)';const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){cr.style.transition='opacity .6s,transform .6s,box-shadow .8s';cr.style.opacity='1';cr.style.transform='translateY(0)';cr.style.boxShadow='0 0 40px rgba(79,110,247,.08),0 0 0 1px rgba(79,110,247,.15)';after(1500,()=>{cr.style.boxShadow='none'});o.unobserve(cr)}},{threshold:.3});o.observe(cr)}
}
function observe(sel,setup,enter,opts={}){const els=document.querySelectorAll(sel);if(!els.length)return;els.forEach((el,i)=>setup(el,i));const o=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const i=[...els].indexOf(e.target);enter(e.target,i);o.unobserve(e.target)}})},{threshold:opts.th||.2,rootMargin:opts.rm||'0px'});els.forEach(el=>o.observe(el))}
function after(ms,fn){setTimeout(fn,ms)}