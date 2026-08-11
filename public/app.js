/* ============================================================
   MIZO — shared chrome: left rail + top nav + wallet modal,
   plus shared wireframe data and the token-card renderer.
   Pages set <body data-page="..."> and this mounts everything.
   ============================================================ */

/* ---------- page timer tracking ----------
   Inline page scripts create intervals (clock, demo timeouts). The SPA
   router clears them on navigation so dead pages stop ticking. */
const _rawSetInterval = window.setInterval.bind(window);
const _rawSetTimeout  = window.setTimeout.bind(window);
const _pageTimers = [];
window.setInterval = (...a)=>{ const id=_rawSetInterval(...a); _pageTimers.push(id); return id; };
window.setTimeout  = (...a)=>{ const id=_rawSetTimeout(...a);  _pageTimers.push(id); return id; };
function clearPageTimers(){
  while(_pageTimers.length){ const id=_pageTimers.pop(); clearInterval(id); clearTimeout(id); }
}

/* ---------- nav model ---------- */
const NAV = [
  { key:'home',      label:'Home',      href:'index.html',
    svg:'<path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5"/>' },
  { key:'swap',      label:'Swap',      href:'swap.html',
    svg:'<path d="M7 4v13M7 4 4 7m3-3 3 3m7 13V7m0 13 3-3m-3 3-3-3"/>' },
  { key:'bridge',    label:'Bridge',    href:'bridge.html',
    svg:'<path d="M3 17c0-5 4-9 9-9s9 4 9 9M3 17h3m12 0h3M8 17h8"/>' },
  { key:'explore',   label:'Explore',   href:'discover.html',
    svg:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>' },
  { key:'launch',    label:'Launch',    href:'launch.html',
    svg:'<path d="M12 15c-1.5-1-2.5-3.5-1.5-6.5C11.5 5.5 14 4 17 4c0 3-1.5 5.5-4.5 6.5-3 1-5.5 0-6.5 1.5S5 16 5 16s1.5-.5 4 1"/><path d="M9 15 5 19m3 1 2-2"/>' },
  { key:'portfolio', label:'Portfolio', href:'portfolio.html',
    svg:'<path d="M4 8h16v12H4zM8 8V5h8v3"/><path d="M4 13h16"/>' },
  { key:'docs',      label:'Docs',      href:'grading.html',
    svg:'<path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7"/>' },
];
const FOOT_NAV = [
  { label:'Help',     svg:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1 2.5 2.4c0 1.7-2.5 2-2.5 3.6M12 17.5v.1"/>' },
  { label:'Settings', svg:'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.2-1.6l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.7-1.6L13.4 2h-2.8l-.4 2.9a7 7 0 0 0-2.7 1.6l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .5.1 1.1.2 1.6l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.7 1.6l.4 2.9h2.8l.4-2.9a7 7 0 0 0 2.7-1.6l2.3 1 2-3.4-2-1.5c.1-.5.2-1.1.2-1.6z"/>' },
  { label:'More',     svg:'<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>' },
];
/* which nav item lights up for each page */
const ACTIVE_PAGE = {
  home:'home', swap:'swap', private:'swap', bridge:'bridge',
  discover:'explore', chain:'explore', record:'explore', store:'explore', cutout:'explore', collection:'explore',
  launch:'launch', portfolio:'portfolio', grading:'docs',
};

/* ---------- shared wireframe data ---------- */
const CHAINS = [
  { slug:'hood', name:'ROBINHOOD', kanji:'林' },
  { slug:'sol',  name:'SOLANA',    kanji:'太' },
  { slug:'eth',  name:'ETHEREUM',  kanji:'乙' },
  { slug:'ton',  name:'TON',       kanji:'頓' },
  { slug:'base', name:'BASE',      kanji:'基' },
  { slug:'bnb',  name:'BSC',       kanji:'幣' },
];
const chainBy = s => CHAINS.find(c=>c.slug===s) || CHAINS[0];

const HUES = ['#c9a227','#766c63','#7d4a4a','#4a5a7d','#6b6b6b','#7d6b4a'];

/* name, ticker, chain slug, grade, state, price, mcap, age, hue idx, glyph */
const TOKENS = [
  ['Groove Theory','GROOVE','hood','MINT','SEALED','$0.0042','$412K','2h',0,'溝'],
  ['Night Pressing','NGHT','sol','NEAR MINT','OPENED','$0.11','$1.2M','9h',1,'夜'],
  ['B-Side','BSIDE','base','VG+','OPENED','$0.008','$88K','41m',2,'裏'],
  ['Obi Standard','OBI','hood','MINT','SEALED','$0.30','$3.4M','1d',3,'帯'],
  ['Cut Sleeve','CUTS','bnb','GOOD','OPENED','$0.0009','$21K','3h',4,'切'],
  ['Test Press','TSTP','ton','UNGRADED','—','$0.002','$6K','7m',5,'試'],
  ['Deep Cut','DEEP','sol','VG+','OPENED','$0.017','$140K','5h',0,'深'],
  ['White Label','WLBL','base','NEAR MINT','SEALED','$0.052','$610K','12h',1,'白'],
  ['Static Hiss','HISS','eth','GOOD','OPENED','$0.0031','$33K','2d',2,'雑'],
  ['First Pressing','1STP','hood','MINT','SEALED','$0.88','$5.1M','6h',3,'初'],
  ['Warp & Wow','WARP','bnb','POOR','CUT-OUT','$0.00004','$2K','4d',4,'歪'],
  ['Mono Groove','MONO','ton','VG+','OPENED','$0.006','$74K','58m',5,'単'],
];

/* ---------- token card ---------- */
function tokenCard(t, extra=''){
  const [name,tkr,chain,grade,state,price,mcap,age,hue,glyph] = t;
  const g = grade==='NEAR MINT'?'NM':(grade==='UNGRADED'?'—':grade);
  const cut = state==='CUT-OUT';
  return `<a class="card" href="record.html?t=${encodeURIComponent(tkr)}&c=${chain}">
    <div class="card-img" style="background:linear-gradient(150deg,${HUES[hue%6]}55,#181815 80%)">
      <span class="kanji">${glyph}</span><span class="mint-tag${cut?' cut':''}">${cut?'CUT':g}</span>
    </div>
    <div class="card-body">${name}</div>
    <div class="card-foot">
      <span class="tkr">$${tkr}</span>
      <span class="chg${cut?' dn':''}">⚘ ${age}</span>
      <span class="mc">${mcap}</span>
    </div>${extra}
  </a>`;
}
function renderGrid(sel, list, extraFn){
  const el = document.querySelector(sel); if(!el) return;
  el.innerHTML = list.map((t,i)=>tokenCard(t, extraFn?extraFn(t,i):'' )).join('');
}

/* ---------- ticker data ---------- */
const METAS = [
  ['CAT','$455.3M',1],['CHARACTER','$1.95B',-1],['DOG','$455.3M',1],['AI','$812.4M',1],
  ['FROG','$203.1M',-1],['RETRO','$96.7M',1],['ANIME','$154.9M',-1],['FOOD','$61.2M',1],
];
const CHAINS6 = [
  ['ROBINHOOD','$455.3M',1],['TON','$1.95B',-1],['SOLANA','$455.3M',1],
  ['ETHEREUM','$2.31B',1],['BASE','$688.0M',-1],['BSC','$402.6M',1],
];

/* ---------- shell mount ---------- */
function mountProduct(){
  const page = document.body.dataset.page || '';
  const active = ACTIVE_PAGE[page] || '';

  /* left rail */
  const aside = document.createElement('aside');
  aside.className = 'sidebar';
  aside.innerHTML =
    '<a class="sb-logo" href="index.html" aria-label="Mizo home"><img src="logo.svg" alt=""></a>'+
    '<nav class="sb-nav">'+NAV.map(n=>
      `<a class="sb-btn${n.key===active?' on':''}" href="${n.href}">
        <svg viewBox="0 0 24 24">${n.svg}</svg><span class="lbl">${n.label}</span><span class="tip">${n.label}</span>
      </a>`).join('')+'</nav>'+
    '<div class="sb-foot">'+FOOT_NAV.map(n=>
      `<button class="sb-btn"><svg viewBox="0 0 24 24">${n.svg}</svg><span class="lbl">${n.label}</span><span class="tip">${n.label}</span></button>`).join('')+'</div>';
  const railToggle = document.createElement('button');
  railToggle.className = 'sb-toggle';
  railToggle.type = 'button';
  railToggle.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>';
  aside.appendChild(railToggle);
  document.body.prepend(aside);

  /* Fresh visits follow the viewport: collapsed through 2000px, expanded above it.
     A deliberate toggle is kept for the rest of the tab session across navigation. */
  const wideRail = matchMedia('(min-width:2001px)');
  let savedRail = null;
  try { savedRail = sessionStorage.getItem('mizo-rail-expanded'); } catch(e) {}
  const setRail = expanded => {
    document.body.classList.toggle('sb-expanded', expanded);
    railToggle.setAttribute('aria-expanded', String(expanded));
    railToggle.setAttribute('aria-label', expanded ? 'Collapse navigation' : 'Expand navigation');
    railToggle.title = expanded ? 'Collapse navigation' : 'Expand navigation';
  };
  setRail(savedRail === null ? wideRail.matches : savedRail === '1');
  railToggle.addEventListener('click', () => {
    const next = !document.body.classList.contains('sb-expanded');
    setRail(next);
    try { sessionStorage.setItem('mizo-rail-expanded', next ? '1' : '0'); } catch(e) {}
  });
  wideRail.addEventListener('change', e => {
    let manuallySet = false;
    try { manuallySet = sessionStorage.getItem('mizo-rail-expanded') !== null; } catch(err) {}
    if(!manuallySet) setRail(e.matches);
  });

  /* top nav — content depends on page type, see renderTopnav() */
  const top = document.createElement('div');
  top.className = 'topnav';
  const pageEl = document.querySelector('.page');
  if(pageEl) pageEl.prepend(top);
  renderTopnav();

  /* wallet modal */
  const modal = document.createElement('div');
  modal.className='modal-bk'; modal.id='walletModal';
  modal.addEventListener('click', e=>{ if(e.target===modal) closeWallet(); });
  modal.innerHTML =
    '<div class="modal"><h3>CONNECT WALLET</h3>'+
    '<p>Log in and sign up are the same door. Connect to enter Mizo.</p>'+
    '<button class="wc-opt"><span class="ico">WC</span> WalletConnect</button>'+
    '<button class="wc-opt"><span class="ico">MM</span> MetaMask</button>'+
    '<button class="wc-opt"><span class="ico">PH</span> Phantom</button>'+
    '<button class="wc-opt"><span class="ico">CB</span> Coinbase Wallet</button>'+
    '<div class="wf-note">wireframe · production build uses the WalletConnect modal for all options</div>'+
    '<button class="close" onclick="closeWallet()">esc · close</button></div>';
  document.body.appendChild(modal);

  /* footer */
  fillFooter();

}

/* ---------- topnav: ticker bar everywhere, chain tabs on chain.html ---------- */
const CHAIN_TAB_ORDER = ['hood','base','eth','ton','sol','bnb'];
let _tickerStops = [];
function renderTopnav(){
  const top = document.querySelector('.topnav'); if(!top) return;
  _tickerStops.forEach(f=>f&&f()); _tickerStops = [];
  const authHTML =
    '<div class="auth"><button class="btn btn-ghost" onclick="openWallet()">Log in</button>'+
    '<button class="btn btn-solid" onclick="openWallet()">Sign up</button></div>';
  if(document.body.dataset.page === 'chain'){
    const cur = new URLSearchParams(location.search).get('c') || 'hood';
    top.classList.add('cb');
    top.innerHTML =
      '<a class="cb-back" href="discover.html" aria-label="Back to chain picker">←</a>'+
      '<nav class="cb-tabs">'+CHAIN_TAB_ORDER.map(s=>
        `<a class="cb-tab${s===cur?' on':''}" href="chain.html?c=${s}">${chainBy(s).name}</a>`).join('')+
      '</nav>'+authHTML;
  }else{
    top.classList.remove('cb');
    top.innerHTML =
      '<div class="tick metas"><a class="tick-label" href="#metas"><span class="ast">✳</span> Metas</a>'+
      '<div class="tick-scroll"><div class="tick-track" id="metasTrack"></div></div></div>'+
      '<div class="tick chains"><a class="tick-label" href="#chains">⇄ Chains</a>'+
      '<div class="tick-scroll"><div class="tick-track" id="chainsTrack"></div></div></div>'+authHTML;
    _tickerStops.push(ticker('metasTrack', METAS), ticker('chainsTrack', CHAINS6));
  }
}

/* tickers — auto-scroll, drag to scrub, wheel/trackpad scroll; returns stop() */
function ticker(el, rows){
    const one = rows.map(([n,v,dir]) =>
      `<a class="tick-item" href="#"><b>${n}</b> ${v} <span class="${dir>0?'u':'d'}">${dir>0?'▲':'▼'}</span></a>`).join('');
    const t = document.getElementById(el); if(!t) return null;
    t.innerHTML = one + one;

    const scroll = t.parentElement;
    const SPEED = 28; /* auto px/s, matches old 30s loop feel */
    let offset = 0, half = 0, dragging = false, hovering = false;
    let lastX = 0, moved = 0, last = performance.now();

    const measure = ()=>{ half = t.scrollWidth / 2; };
    measure();
    addEventListener('resize', measure);

    let alive = true;
    const step = now=>{
      if(!alive) return;
      const dt = (now - last) / 1000; last = now;
      if(!dragging && !hovering && half > 0) offset += SPEED * dt;
      if(half > 0) offset = ((offset % half) + half) % half;
      t.style.transform = `translateX(${-offset}px)`;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    scroll.addEventListener('mouseenter', ()=>{ hovering = true; });
    scroll.addEventListener('mouseleave', ()=>{ hovering = false; });
    scroll.addEventListener('pointerdown', e=>{
      dragging = true; moved = 0; lastX = e.clientX;
      scroll.classList.add('dragging');
      scroll.setPointerCapture(e.pointerId);
    });
    scroll.addEventListener('pointermove', e=>{
      if(!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX;
      moved += Math.abs(dx);
      offset -= dx;
    });
    const endDrag = ()=>{ dragging = false; scroll.classList.remove('dragging'); };
    scroll.addEventListener('pointerup', endDrag);
    scroll.addEventListener('pointercancel', endDrag);
    scroll.addEventListener('click', e=>{ if(moved > 5){ e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
    scroll.addEventListener('wheel', e=>{
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if(d){ offset += d; e.preventDefault(); }
    }, {passive:false});
    return ()=>{ alive = false; removeEventListener('resize', measure); };
}

function fillFooter(){
  const ft = document.querySelector('.ft');
  if(ft) ft.innerHTML =
    '<div class="ft-in">'+
    '<div class="col" style="margin-right:auto"><span class="big">MIZO 溝</span>'+
    '<span>The record store for every chain</span><span class="muted mono-sm">interactive prototype</span></div>'+
    '<div class="col"><span class="hd">Product</span>'+
    '<a href="discover.html">Explore</a><a href="launch.html">Launch</a>'+
    '<a href="swap.html">Swap</a><a href="bridge.html">Bridge</a><a href="collection.html">Collection</a></div>'+
    '<div class="col"><span class="hd">Trust</span>'+
    '<a href="grading.html">Grading rubric</a><a href="storefront-cutout.html">Cut-out bin</a>'+
    '<a href="private.html">Private swap</a><a href="#">No investment advice</a></div>'+
    '<div class="col"><span class="hd">The ladder</span>'+
    '<span>MINT · still sealed</span><span>NM · near perfect</span>'+
    '<span>VG+ · plays clean</span><span>GOOD · with noise</span>'+
    '<span>POOR · damaged → cut-out</span></div></div>';
}

function openWallet(){ document.getElementById('walletModal').classList.add('open'); }
function closeWallet(){ const m=document.getElementById('walletModal'); if(m) m.classList.remove('open'); }
addEventListener('keydown', e=>{ if(e.key==='Escape') closeWallet(); });

/* ---------- small helpers ---------- */
function wireStatebar(handlers, initial){
  document.querySelectorAll('.statebar .sb').forEach(b=>b.addEventListener('click', ()=>setPrototypeState(b.dataset.state, handlers)));
  if(initial) setPrototypeState(initial, handlers);
}
function setPrototypeState(n, handlers){
  document.querySelectorAll('[data-sv]').forEach(v=>v.style.display = v.dataset.sv===n?'':'none');
  document.querySelectorAll('.statebar .sb').forEach(b=>b.classList.toggle('on', b.dataset.state===n));
  if(handlers && handlers[n]) handlers[n]();
}
function wireTabs(){
  document.querySelectorAll('.tabs').forEach(group=>{
    group.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
      group.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
      t.classList.add('on');
    }));
  });
}
function wirePresets(){
  document.querySelectorAll('.presets').forEach(p=>{
    p.querySelectorAll('.p').forEach(b=>b.addEventListener('click',()=>{
      p.querySelectorAll('.p').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
    }));
  });
}
function wireSteps(){
  const wrap = document.querySelector('[data-steps]'); if(!wrap) return;
  const go = n => {
    wrap.querySelectorAll('.st').forEach(s=>s.classList.toggle('on', s.dataset.step===n));
    document.querySelectorAll('.stepview').forEach(v=>v.classList.toggle('on', v.dataset.view===n));
  };
  wrap.querySelectorAll('.st').forEach(s=>s.addEventListener('click',()=>go(s.dataset.step)));
  document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.goto)));
}

mountProduct();

/* ============================================================
   SPA router — lazy page loads, prefetch on hover,
   flat wipe transition between pages (no full reloads).
   ============================================================ */
const PAGE_CACHE = new Map();
let _navving = false;

function _pageFileOf(u){
  let p = u.pathname.replace(/\/+$/,'').split('/').pop() || 'index.html';
  if(!/\.html$/.test(p)) p += '.html';
  return p;
}
function _cleanPathOf(u){
  const f = _pageFileOf(u);
  return (f==='index.html' ? '/' : '/'+f.replace(/\.html$/,'')) + u.search;
}
function _routable(a){
  const href = a.getAttribute('href') || '';
  if(!href || href.startsWith('#') || a.target || a.hasAttribute('download')) return null;
  let u; try{ u = new URL(href, location.href); }catch(e){ return null; }
  if(u.origin !== location.origin) return null;
  /* only top-level pages; let v1-v5 archive dirs load normally */
  if(u.pathname.split('/').filter(Boolean).length > 1) return null;
  return u;
}
function _fetchPage(file){
  if(PAGE_CACHE.has(file)) return PAGE_CACHE.get(file);
  const p = fetch(file, {credentials:'same-origin'}).then(r=>{
    if(!r.ok) throw new Error(r.status);
    return r.text();
  });
  p.catch(()=>PAGE_CACHE.delete(file));
  PAGE_CACHE.set(file, p);
  return p;
}

/* wipe overlay: flat panel, thin accent leading edge, covers content area */
let _wipeEl = null;
function _wipe(){
  if(_wipeEl) return _wipeEl;
  _wipeEl = document.createElement('div');
  _wipeEl.className = 'wipe';
  _wipeEl.innerHTML = '<span class="wipe-tag">ロード中 · LOADING</span>';
  document.body.appendChild(_wipeEl);
  return _wipeEl;
}
function _wipeTo(el, cls){
  return new Promise(res=>{
    let done = false;
    const fin = e=>{
      if(e && (e.target!==el || e.propertyName!=='transform')) return;
      if(done) return; done = true; el.removeEventListener('transitionend', fin); res();
    };
    el.addEventListener('transitionend', fin);
    _rawSetTimeout(fin, 450); /* safety net */
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      el.classList.remove('in','out');
      el.classList.add(cls);
    }));
  });
}

async function navigateTo(u, push=true){
  if(_navving) return;
  const file = _pageFileOf(u);
  _navving = true;
  const w = _wipe();
  w.classList.remove('in','out');
  try{
    const [html] = await Promise.all([_fetchPage(file), _wipeTo(w,'in')]);
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const next = doc.querySelector('.page');
    if(!next){ location.href = u.href; return; }

    clearPageTimers();
    if(push) history.pushState({mizo:1}, '', _cleanPathOf(u));
    document.title = doc.title || document.title;
    document.body.dataset.page = doc.body.dataset.page || '';

    /* swap content under the wipe; keep the mounted topnav */
    const pageEl = document.querySelector('.page');
    [...pageEl.children].forEach(c=>{ if(!c.classList.contains('topnav')) c.remove(); });
    let i = 0;
    [...next.children].forEach(c=>{
      const n = document.importNode(c, true);
      n.classList.add('pg-enter');
      n.style.setProperty('--stag', i++);
      pageEl.appendChild(n);
    });
    fillFooter();

    /* sidebar active state */
    const active = ACTIVE_PAGE[document.body.dataset.page] || '';
    document.querySelectorAll('.sb-nav .sb-btn').forEach((el,idx)=>
      el.classList.toggle('on', NAV[idx] && NAV[idx].key===active));

    /* topnav variant may change (tickers vs chain tabs) */
    renderTopnav();

    window.scrollTo(0,0);

    /* run the page's inline scripts (app.js itself is already live) */
    doc.querySelectorAll('script').forEach(s=>{
      if(s.src) return;
      try{ new Function(s.textContent).call(window); }
      catch(e){ console.error('[router] page script failed:', e); }
    });

    await _wipeTo(w,'out');
    w.classList.remove('in','out');
  }catch(e){
    console.error('[router] navigation failed, falling back:', e);
    location.href = u.href;
  }finally{
    _navving = false;
  }
}

document.addEventListener('click', e=>{
  if(e.defaultPrevented || e.button!==0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest('a');
  if(!a) return;
  const u = _routable(a);
  if(!u) return;
  e.preventDefault();
  if(_pageFileOf(u)===_pageFileOf(new URL(location.href)) && u.search===location.search){
    window.scrollTo({top:0, behavior:'smooth'});
    return;
  }
  navigateTo(u);
});

/* prefetch on hover — pages are ready before the click lands */
document.addEventListener('pointerover', e=>{
  const a = e.target.closest('a');
  if(!a) return;
  const u = _routable(a);
  if(u) _fetchPage(_pageFileOf(u));
}, {passive:true});

addEventListener('popstate', ()=>navigateTo(new URL(location.href), false));
history.replaceState({mizo:1}, '', location.href);
