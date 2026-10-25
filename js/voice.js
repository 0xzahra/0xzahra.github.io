/* Zahra voice narration: plays a short clip per section as you scroll (after one tap). */
(function(){
  var MAP=[["hero",".hero"],["writing",".beats .beat:nth-child(1)"],["community",".beats .beat:nth-child(2)"],["art",".beats .beat:nth-child(3)"],["builder",".beats .beat:nth-child(4)"],["proof",".reel .panel.intro"],["arewa",'.reel a[href*="acp/agent"]'],["equity",'.reel a[href*="virtuals/98791"]'],["projects",'.reel a[href*="pull/3"]'],["shop","#shop"],["contact","#contact"]];
  var css=".vz-tog{position:fixed;right:18px;bottom:18px;z-index:95;height:42px;padding:0 14px 0 10px;border-radius:21px;display:flex;align-items:center;gap:8px;border:1px solid var(--line2);background:var(--card1);color:var(--t);font:12px/1 ui-monospace,Menlo,monospace;letter-spacing:.04em;cursor:pointer;backdrop-filter:blur(6px);transition:border-color .3s,transform .3s}.vz-tog:hover{border-color:var(--g)}.vz-tog svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round}.vz-tog .w{display:none}.vz-tog.on .w{display:inline}.vz-tog.on .x{display:none}.vz-tog.on{border-color:var(--g);color:var(--g)}.vz-tog.speaking .w{animation:vzp 1s ease-in-out infinite}@keyframes vzp{50%{opacity:.35}}@media (prefers-reduced-motion:reduce){.vz-tog.speaking .w{animation:none}}@media (max-width:600px){.vz-tog{right:12px;bottom:12px;padding:0 12px 0 9px;font-size:11px}}";
  var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
  var b=document.createElement("button");b.type="button";b.className="vz-tog";b.setAttribute("aria-pressed","false");
  b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path class="w" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/><path class="x" d="M16.5 9.5l5 5M21.5 9.5l-5 5"/></svg><span class="lbl">tap to hear Zahra</span>';
  document.body.appendChild(b);
  var lbl=b.querySelector(".lbl"),on=false,cache={},played={},queue=[],busy=false,audio=new Audio(),vis={};
  audio.preload="auto";
  function src(n){if(!cache[n])cache[n]=fetch("voice/"+n+".b64").then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){var s=atob(t.replace(/\s+/g,"")),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return URL.createObjectURL(new Blob([u],{type:"audio/mpeg"}))}).catch(function(){delete cache[n];return null});return cache[n]}
  function next(){if(!on){busy=false;return}var n=queue.shift();if(!n){busy=false;return}busy=true;played[n]=1;
    src(n).then(function(u){if(!on){busy=false;return}if(!u){next();return}audio.src=u;var p=audio.play();if(p&&p.catch)p.catch(function(){next()})})}
  function enqueue(n){if(!on||played[n]||queue.indexOf(n)>=0)return;queue.push(n);if(queue.length>2)queue=[queue[queue.length-1]];if(!busy)next()}
  audio.addEventListener("playing",function(){b.classList.add("speaking")});
  audio.addEventListener("pause",function(){b.classList.remove("speaking")});
  audio.addEventListener("ended",function(){b.classList.remove("speaking");next()});
  audio.addEventListener("error",function(){if(on)next()});
  function best(){var bn=null,bv=0;for(var k in vis)if(vis[k]>bv){bv=vis[k];bn=k}return bv>=.55?bn:null}
  var els=[];MAP.forEach(function(m){var el=document.querySelector(m[1]);if(el){el.setAttribute("data-vz",m[0]);els.push(el)}});
  if("IntersectionObserver" in window){var th=[];for(var i=0;i<=20;i++)th.push(i/20);
    var io=new IntersectionObserver(function(es){var vh=window.innerHeight||1,vw=window.innerWidth||1;es.forEach(function(e){var r=e.intersectionRect,bx=e.boundingClientRect;
      var fh=r.height/Math.min(bx.height||1,vh),fw=r.width/Math.min(bx.width||1,vw);vis[e.target.getAttribute("data-vz")]=e.isIntersecting?Math.min(fh,fw):0});
      var n=best();if(n)enqueue(n)},{threshold:th});
    els.forEach(function(el){io.observe(el)})}
  b.addEventListener("click",function(){on=!on;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on?"true":"false");lbl.textContent=on?"mute Zahra":"tap to hear Zahra";
    if(on){MAP.forEach(function(m){src(m[0])});played={};queue=[];busy=false;enqueue(best()||"hero")}else{audio.pause();queue=[];busy=false}});
})();
