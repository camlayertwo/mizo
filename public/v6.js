/* ============================================================
   MIZO v6 — shared chrome: left rail + top nav + wallet modal,
   plus shared wireframe data and the token-card renderer.
   Pages set <body data-page="..."> and this mounts everything.
   ============================================================ */

/* ---------- nav model ---------- */
const V6NAV = [
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
const V6FOOT = [
  { label:'Help',     svg:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1 2.5 2.4c0 1.7-2.5 2-2.5 3.6M12 17.5v.1"/>' },
  { label:'Settings', svg:'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.2-1.6l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.7-1.6L13.4 2h-2.8l-.4 2.9a7 7 0 0 0-2.7 1.6l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .5.1 1.1.2 1.6l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.7 1.6l.4 2.9h2.8l.4-2.9a7 7 0 0 0 2.7-1.6l2.3 1 2-3.4-2-1.5c.1-.5.2-1.1.2-1.6z"/>' },
  { label:'More',     svg:'<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>' },
];
/* which nav item lights up for each page */
const V6ACTIVE = {
  home:'home', swap:'swap', private:'swap', bridge:'bridge',
  discover:'explore', record:'explore', store:'explore', cutout:'explore', collection:'explore',
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

const HUES = ['#c9a227','#5a7d4a','#7d4a4a','#4a5a7d','#6b6b6b','#7d6b4a'];

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

/* ---------- token card (v6 home style) ---------- */
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
function mountV6(){
  const page = document.body.dataset.page || '';
  const active = V6ACTIVE[page] || '';

  /* left rail */
  const aside = document.createElement('aside');
  aside.className = 'sidebar';
  aside.innerHTML =
    '<a class="sb-logo" href="index.html" aria-label="Mizo home"><img src="logo.svg" alt=""></a>'+
    '<nav class="sb-nav">'+V6NAV.map(n=>
      `<a class="sb-btn${n.key===active?' on':''}" href="${n.href}">
        <svg viewBox="0 0 24 24">${n.svg}</svg><span class="lbl">${n.label}</span><span class="tip">${n.label}</span>
      </a>`).join('')+'</nav>'+
    '<div class="sb-foot">'+V6FOOT.map(n=>
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

  /* top nav */
  const top = document.createElement('div');
  top.className = 'topnav';
  top.innerHTML =
    '<div class="tick metas"><a class="tick-label" href="#metas"><span class="ast">✳</span> Metas</a>'+
    '<div class="tick-scroll"><div class="tick-track" id="metasTrack"></div></div></div>'+
    '<div class="tick chains"><a class="tick-label" href="#chains">⇄ Chains</a>'+
    '<div class="tick-scroll"><div class="tick-track" id="chainsTrack"></div></div></div>'+
    '<div class="auth"><button class="btn btn-ghost" onclick="openWallet()">Log in</button>'+
    '<button class="btn btn-solid" onclick="openWallet()">Sign up</button></div>';
  const pageEl = document.querySelector('.page');
  if(pageEl) pageEl.prepend(top);

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
  const ft = document.querySelector('.ft');
  if(ft) ft.innerHTML =
    '<div class="ft-in">'+
    '<div class="col" style="margin-right:auto"><span class="big">MIZO 溝</span>'+
    '<span>The record store for every chain</span><span class="muted mono-sm">wireframe v6</span></div>'+
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

  /* tickers */
  const ticker = (el, rows)=>{
    const one = rows.map(([n,v,dir]) =>
      `<a class="tick-item" href="#"><b>${n}</b> ${v} <span class="${dir>0?'u':'d'}">${dir>0?'▲':'▼'}</span></a>`).join('');
    const t = document.getElementById(el); if(t) t.innerHTML = one + one;
  };
  ticker('metasTrack', METAS);
  ticker('chainsTrack', CHAINS6);
}

function openWallet(){ document.getElementById('walletModal').classList.add('open'); }
function closeWallet(){ const m=document.getElementById('walletModal'); if(m) m.classList.remove('open'); }
addEventListener('keydown', e=>{ if(e.key==='Escape') closeWallet(); });

/* ---------- small helpers ---------- */
function wireStatebar(handlers, initial){
  document.querySelectorAll('.statebar .sb').forEach(b=>b.addEventListener('click', ()=>setV6State(b.dataset.state, handlers)));
  if(initial) setV6State(initial, handlers);
}
function setV6State(n, handlers){
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

mountV6();
