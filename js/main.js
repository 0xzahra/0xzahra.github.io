(()=>{'use strict';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const mobile=()=>innerWidth<=760;
$('#yr').textContent=new Date().getFullYear();
const mouse={x:innerWidth/2,y:innerHeight/2,nx:0,ny:0};
addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;mouse.nx=e.clientX/innerWidth*2-1;mouse.ny=e.clientY/innerHeight*2-1});

/* ---------- typed tagline ---------- */
const tagText='> GM, I am 0xarewah. Web3 content creator · community manager · AI product builder · writing lead. Building at the intersection of people, words & onchain.';
function typeTag(){const el=$('#typed');if(RM){el.textContent=tagText;return}let i=0;(function t(){el.textContent=tagText.slice(0,++i);if(i<tagText.length)setTimeout(t,i<3?120:18+Math.random()*30)})()}

/* ---------- 8-ball ---------- */
const answers=[['SIGNS<br>POINT<br>TO YES','book a call →','https://calendly.com/0xzahra'],['OUTLOOK<br>ON-<br>CHAIN','see proof of work ↓','#build'],['SAY<br>GM','DM on X →','https://x.com/0xarewah'],['IT IS<br>CERT-<br>AIN','linkedin →','https://www.linkedin.com/in/zahra-usman-34a1a437b/'],['ASK<br>LINK<br>TREE','linktr.ee/0xzahra →','https://linktr.ee/0xzahra']];
let ai=0;const ball=$('#ball'),ans=$('#answer'),hint=$('#hint');
ball.addEventListener('click',()=>{const [a,h,u]=answers[ai++%answers.length];
 if(!window.gsap||RM){ans.innerHTML=a;ans.style.opacity=1;ans.style.transform='none';setHint(h,u);return}
 gsap.timeline().to(ans,{opacity:0,scale:.4,duration:.15})
 .to(ball,{keyframes:[{x:-10,rotation:-14},{x:12,rotation:12},{x:-9,rotation:-9},{x:7,rotation:6},{x:-4,rotation:-3},{x:0,rotation:0}],duration:.6,ease:'none'})
 .add(()=>{ans.innerHTML=a;flashGlitch()})
 .fromTo(ans,{opacity:0,scale:.3,rotation:-120},{opacity:1,scale:1,rotation:0,duration:.8,ease:'back.out(2.2)'})
 .add(()=>setHint(h,u),'-=.4');
});
function setHint(h,u){hint.innerHTML=`<a href="${u}" ${u[0]==='#'?'':'target="_blank" rel="noopener"'} style="pointer-events:auto;color:var(--g)">${h}</a>`}

/* ---------- glitch ---------- */
const g1=$('.g1'),g2=$('.g2');
function flashGlitch(){if(!window.gsap||RM)return;[g1,g2].forEach((g,i)=>{const y=Math.random()*80,h=4+Math.random()*14;
 gsap.fromTo(g,{opacity:.85,x:(i?-1:1)*(6+Math.random()*10),clipPath:`inset(${y}% 0 ${100-y-h}% 0)`},{opacity:0,x:0,duration:.28,ease:'steps(3)'})})}

/* ---------- reduced motion: stop here ---------- */
if(RM||!window.gsap){document.documentElement.classList.remove('loading');$('#loader')?.remove();typeTag();return}
gsap.registerPlugin(ScrollTrigger);

/* ---------- Lenis smooth scroll ---------- */
let lenis=null;
if(window.Lenis){lenis=new Lenis({lerp:.09,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);lenis.stop();
 $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();lenis.scrollTo(t,{duration:1.6})}}));
 document.addEventListener('click',e=>{const a=e.target.closest('#hint a[href^="#"]');if(a){e.preventDefault();lenis.scrollTo(a.getAttribute('href'),{duration:1.6})}});}

/* ---------- cursor ---------- */
const cur=$('.cursor');
if(FINE){const xs=gsap.quickTo(cur,'x',{duration:.35,ease:'power3'}),ys=gsap.quickTo(cur,'y',{duration:.35,ease:'power3'});
 addEventListener('mousemove',e=>{xs(e.clientX);ys(e.clientY)});
 const lab=cur.querySelector('span');
 $$('a,button,.p').forEach(el=>{el.addEventListener('mouseenter',()=>{cur.classList.add('big');lab.textContent=el.id==='ball'?'shake':el.classList.contains('p')?'proof':'open'});el.addEventListener('mouseleave',()=>cur.classList.remove('big'))});}

/* ---------- magnetic ---------- */
if(FINE)$$('[data-mag]').forEach(el=>{const qx=gsap.quickTo(el,'x',{duration:.5,ease:'elastic.out(1,.4)'}),qy=gsap.quickTo(el,'y',{duration:.5,ease:'elastic.out(1,.4)'});
 el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();qx((e.clientX-r.left-r.width/2)*.4);qy((e.clientY-r.top-r.height/2)*.4)});
 el.addEventListener('mouseleave',()=>{qx(0);qy(0)})});
$$('.p,.prod').forEach(p=>p.addEventListener('mousemove',e=>{const r=p.getBoundingClientRect();p.style.setProperty('--x',e.clientX-r.left+'px');p.style.setProperty('--y',e.clientY-r.top+'px')}));

/* ---------- avatar: idle + head follow ---------- */
const avatar=$('#avatar'),head=$('#head');
gsap.to(avatar,{y:'-=14',duration:2.6,ease:'sine.inOut',yoyo:true,repeat:-1});
gsap.to(avatar,{scaleY:1.012,scaleX:.995,transformOrigin:'50% 100%',duration:2.2,ease:'sine.inOut',yoyo:true,repeat:-1});
const hr=gsap.quickTo(head,'rotation',{duration:.8,ease:'power3'}),hx=gsap.quickTo(head,'x',{duration:.8,ease:'power3'}),hy=gsap.quickTo(head,'y',{duration:.8,ease:'power3'});
const ar=gsap.quickTo(avatar,'rotationY',{duration:1.2,ease:'power3'});
gsap.set(avatar,{transformPerspective:900});
let autoT=0;
gsap.ticker.add((t)=>{let nx=mouse.nx,ny=mouse.ny;if(!FINE){autoT+=.016;nx=Math.sin(autoT*.8)*.7;ny=Math.cos(autoT*.6)*.3}
 hr(nx*7);hx(nx*8);hy(ny*5);ar(nx*10)});
(function loopGlitch(){gsap.delayedCall(2.5+Math.random()*4,()=>{flashGlitch();loopGlitch()})})();

/* ---------- kinetic letters ---------- */
const letters=$$('.kinetic span');
if(FINE)addEventListener('mousemove',()=>letters.forEach(l=>{const r=l.getBoundingClientRect(),dx=mouse.x-(r.left+r.width/2),dy=mouse.y-(r.top+r.height/2),d=Math.hypot(dx,dy),f=Math.max(0,1-d/500);
 gsap.to(l,{y:-f*40,skewX:dx/40*f,scaleY:1+f*.15,duration:.6,ease:'power3',overwrite:'auto'})}));

/* ---------- matrix rain ---------- */
const rc=$('#rain'),rx=rc.getContext('2d');let rw,rh,drops;const chars='01ZAHRAH0x$GMアイウエオ';
function rsz(){rw=rc.width=innerWidth;rh=rc.height=innerHeight;drops=Array(Math.ceil(rw/18)).fill(0).map(()=>Math.random()*rh/18)}rsz();addEventListener('resize',rsz);
let rl=0;gsap.ticker.add(t=>{if(t-rl<.06)return;rl=t;rx.fillStyle='rgba(3,5,6,.14)';rx.fillRect(0,0,rw,rh);rx.font='13px monospace';
 drops.forEach((y,i)=>{rx.fillStyle=Math.random()>.93?'#2de2e6':'#39ff88';rx.fillText(chars[Math.random()*chars.length|0],i*18,y*18);drops[i]=y*18>rh&&Math.random()>.97?0:y+1})});

/* ---------- ASCII avatar ---------- */
const ac=$('#ascii'),ax=ac.getContext('2d'),src=new Image();src.src=IMG.full;let grid=null,COLS,ROWS,CW,CH;
const ramp=' .:-=+*#%@';
src.onload=()=>{COLS=mobile()?56:84;ROWS=Math.round(COLS*947/704*.5);const c=document.createElement('canvas');c.width=COLS;c.height=ROWS;const x=c.getContext('2d');x.drawImage(src,0,0,COLS,ROWS);
 const d=x.getImageData(0,0,COLS,ROWS).data;grid=[];for(let i=0;i<COLS*ROWS;i++){const r=d[i*4],g=d[i*4+1],b=d[i*4+2],a=d[i*4+3];grid.push({a,l:(r*.3+g*.59+b*.11)/255,r,g,b})}
 CW=9;CH=18;ac.width=COLS*CW;ac.height=ROWS*CH;ac.style.aspectRatio=`${ac.width}/${ac.height}`};
let asciiOn=false,al=0;
ScrollTrigger.create({trigger:'.ascii-sec',start:'top bottom',end:'bottom top',onToggle:s=>asciiOn=s.isActive});
gsap.ticker.add(t=>{if(!asciiOn||!grid||t-al<.045)return;al=t;ax.clearRect(0,0,ac.width,ac.height);ax.font='bold 15px monospace';ax.textBaseline='top';
 const r=ac.getBoundingClientRect(),mx=(mouse.x-r.left)/r.width*COLS,my=(mouse.y-r.top)/r.height*ROWS;
 for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){const p=grid[y*COLS+x];if(p.a<60)continue;const dd=Math.hypot(x-mx,(y-my)*2),near=dd<9;
  let ch=ramp[Math.min(9,(p.l*9.99)|0)];if(near||Math.random()<.004)ch=chars[Math.random()*chars.length|0];
  ax.fillStyle=near?'#ff2d3d':p.r>150&&p.g<90?'#ff3b3b':p.l>.6?'#2de2e6':'#39ff88';ax.globalAlpha=near?1:.35+p.l*.65;
  const o=near?(9-dd)*.9:0;ax.fillText(ch,x*CW+o*Math.sign(x-mx),y*CH)}ax.globalAlpha=1});

/* ---------- loader → intro ---------- */
const boot=['$ ssh zahrah@onchain','> handshake ........ ok','> loading people ... ok','> loading words .... ok','> loading onchain .. ok','> waking the 8-ball'];
let bi=0;const bootEl=$('#boot');const bootIv=setInterval(()=>{if(bi<boot.length)bootEl.textContent+=boot[bi++]+'\n'},220);
const prog={v:0};let imgsReady=false;Promise.all([IMG.head,IMG.body,IMG.ball].map(u=>new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=u}))).then(()=>imgsReady=true);
gsap.set(letters,{yPercent:120,opacity:0});gsap.set('#stage',{opacity:0});
gsap.to(prog,{v:100,duration:1.8,ease:'power2.inOut',onUpdate(){$('#pct').textContent=String(prog.v|0).padStart(3,'0');$('#barI').style.width=prog.v+'%'},onComplete:function w(){if(!imgsReady){setTimeout(w,100);return}clearInterval(bootIv);intro()}});
function intro(){const tl=gsap.timeline();
 tl.to('#loader',{clipPath:'inset(0 0 100% 0)',duration:1,ease:'expo.inOut'})
  .to(letters,{yPercent:0,opacity:1,stagger:.07,duration:1.1,ease:'expo.out'},'-=.5')
  .fromTo('#stage',{opacity:0,yPercent:-40,scale:.6,rotate:-12},{opacity:1,yPercent:-50,scale:1,rotate:0,duration:1.4,ease:'elastic.out(1,.55)'},'-=1')
  .add(()=>{flashGlitch();typeTag()},'-=.8')
  .from('.hud > *',{y:-30,opacity:0,stagger:.08,duration:.6},'-=1')
  .add(()=>{document.documentElement.classList.remove('loading');$('#loader').remove();lenis&&lenis.start();buildScroll()});
}

/* ---------- scroll choreography ---------- */
function buildScroll(){
 const stage=$('#stage');gsap.set(stage,{xPercent:-50,yPercent:-50,x:0,y:0});
 const d=!mobile(),W=innerWidth,H=innerHeight;
 // hero letters spread
 gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}})
  .to(letters,{xPercent:i=>(i-2.5)*40,yPercent:i=>(i%2?-1:1)*30,rotate:i=>(i-2.5)*8,opacity:.15,ease:'none'},0)
  .to('.tagline,.scroll',{opacity:0,y:-40,ease:'none'},0);
 // beats pinned (text only)
 const beats=$$('.beat');const bt=gsap.timeline({scrollTrigger:{trigger:'.beats',start:'top top',end:'+='+H*3.2,pin:true,scrub:.8}});
 beats.forEach((b,i)=>{bt.fromTo(b,{opacity:0,y:80,filter:'blur(12px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.5},i).fromTo(b.querySelector('h2'),{letterSpacing:'.08em'},{letterSpacing:'-.045em',duration:.5},i);
  if(i<beats.length-1)bt.to(b,{opacity:0,y:-80,filter:'blur(12px)',duration:.4},i+.75);else bt.to({},{duration:.3})});
 // reel horizontal
 const track=$('.reel-track');
 const rt=gsap.timeline({scrollTrigger:{trigger:'.reel',start:'top top',end:()=>'+='+(track.scrollWidth-W+H*.3),pin:true,scrub:1,invalidateOnRefresh:true}});
 rt.to(track,{x:()=>-(track.scrollWidth-W),ease:'none'});
 gsap.from('.ascii-copy blockquote',{opacity:0,y:60,scrollTrigger:{trigger:'.ascii-copy blockquote',start:'top 90%',end:'top 60%',scrub:1}});
 gsap.from('.shop-h,.prod',{y:80,opacity:0,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:'.shop',start:'top 85%',end:'top 25%',scrub:1}});
 gsap.from('.big span',{yPercent:110,opacity:0,stagger:.15,scrollTrigger:{trigger:'.contact',start:'top 80%',end:'top 20%',scrub:1}});
 ScrollTrigger.refresh();
 // one master timeline for the avatar, keyed in scroll pixels
 const pos=(sel,edge)=>{const t=ScrollTrigger.create({trigger:sel,start:edge});const v=t.start;t.kill();return v};
 const bS=bt.scrollTrigger.start,bE=bt.scrollTrigger.end,rS=rt.scrollTrigger.start,rE=rt.scrollTrigger.end;
 const aS=pos('.ascii-sec','top 85%'),aE=pos('.ascii-sec','top 20%'),cS=pos('.contact','top 90%'),cE=pos('.contact','top 10%');
 const max=ScrollTrigger.maxScroll(window);
 const m=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{start:0,end:max,scrub:1}});
 const seg=(t0,t1,v)=>m.to(stage,{...v,duration:Math.max(1,t1-t0)},t0);
 seg(0,bS,{x:d?W*.22:0,y:d?0:-H*.2,scale:d?1.15:.68,rotation:-4});
 const step=(bE-bS)/beats.length;
 beats.forEach((_,i)=>seg(bS+i*step,bS+(i+1)*step,{rotation:i%2?5:-6,scale:d?1.15+i*.04:.68+i*.02,x:d?W*(.2+(i%2)*.04):(i%2?10:-10)}));
 seg(rS-H*.4,rS+H*.2,{x:d?W*.36:W*.26,y:-H*.3,scale:d?.42:.34,rotation:12});
 seg(rS+H*.2,rE,{rotation:-12,y:-H*.27});
 seg(aS,aE,{opacity:0,scale:.2,rotation:180,x:d?W*.25:0,y:0,filter:'blur(10px)'});
 seg(cS,cE,{opacity:1,scale:d?.95:.5,rotation:360,x:d?W*.28:0,y:d?0:H*.32,filter:'blur(0px)'});
 m.to({}, {duration:1},max);
 gsap.fromTo('#ascii',{opacity:0,scale:1.25},{opacity:mobile()?.35:.9,scale:1,scrollTrigger:{trigger:'.ascii-sec',start:'top 85%',end:'top 20%',scrub:1}});
}
})();
