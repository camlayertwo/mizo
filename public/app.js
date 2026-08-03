/* MIZO wireframe — shared chrome + component rendering.
   Wireframe only: data is illustrative, no real dev. */

/* Real chain marks, monochrome (inherit currentColor). Keyed by Mizo store slug. */
const ICONS = {
  hood:'<svg viewBox="0 0 24 24"><path d="M5.104 21h.399c.072 0 .145-.036.169-.096 3.009-7.632 6.283-11.412 8.337-13.675.085-.097.049-.169-.072-.169h-3.673a.42.42 0 0 0-.339.169l-2.634 3.25c-.387.481-.483.927-.483 1.565v3.322c-.858 2.396-1.402 4.02-1.8 5.49-.025.093.011.144.096.144M18.359 3.485c-.568-.602-3.13-.626-4.314-.169a2.3 2.3 0 0 0-.592.35 31 31 0 0 0-2.5 2.383c-.085.084-.05.168.072.168h4.072c.374 0 .592.217.592.59v4.575c0 .12.097.156.169.048l2.453-3.19c.399-.518.52-.674.628-1.397.145-1.059.06-2.684-.58-3.358m-5.256 12.134 1.68-2.757a.5.5 0 0 0 .048-.216V8.047c0-.12-.085-.168-.17-.072-2.525 2.805-4.494 5.754-6.319 9.305-.046.09.012.169.121.133l3.77-1.156c.425-.13.665-.3.87-.638"/></svg>',
  sol:'<svg viewBox="0 0 24 24"><path d="M18.413 7.903a.62.62 0 0 1-.411.162H3.58c-.512 0-.77-.585-.416-.928l2.369-2.283a.6.6 0 0 1 .41-.17H20.42c.517 0 .77.591.41.935zm0 11.255a.62.62 0 0 1-.411.157H3.58c-.512 0-.77-.58-.416-.922l2.369-2.29a.6.6 0 0 1 .41-.163H20.42c.517 0 .77.585.41.928zm0-8.686a.62.62 0 0 0-.411-.157H3.58c-.512 0-.77.58-.416.922l2.369 2.29a.6.6 0 0 0 .41.163H20.42c.517 0 .77-.585.41-.928z"/></svg>',
  base:'<svg viewBox="0 0 100 100"><path d="M49.9999 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 49.9999 0C23.8029 0 2.32988 20.1461 0.170746 45.7913H66.1523V54.2087H0.170746C2.32988 79.8539 23.8029 100 49.9999 100Z"/></svg>',
  bnb:'<svg viewBox="0 0 24 24"><path d="M7.09 5.755 12 3l4.91 2.755-1.8 1.02L12 5.035l-3.105 1.74zm9.82 3.48-1.8-1.02L12 9.955l-3.105-1.74-1.805 1.02v2.035l3.1 1.74v3.475l1.81 1.02 1.805-1.02V13.01l3.105-1.74zm0 5.515v-2.04l-1.8 1.02v2.035zm1.285.72-3.105 1.735v2.04l4.91-2.76v-5.51l-1.805 1.015zM16.39 7.495l1.8 1.02v2.035L20 9.535v-2.04l-1.805-1.02L16.39 7.5zm-6.2 10.45v2.035L12 21l1.805-1.02v-2.03L12 18.965l-1.805-1.02zm-3.1-3.2 1.8 1.02V13.73l-1.8-1.02v2.04zm3.1-7.25L12 8.515l1.805-1.02L12 6.475 10.195 7.5zm-4.385 1.02 1.805-1.02-1.8-1.02L4 7.5v2.04l1.805 1.015zm0 3.475L4 10.975v5.51l4.91 2.76V17.2l-3.1-1.735v-3.48z"/></svg>',
  ton:'<svg viewBox="0 0 24 24"><path d="M18.078 3H5.922C3.687 3 2.27 5.41 3.394 7.36l7.503 13.003c.49.85 1.716.85 2.206 0L20.607 7.36C21.729 5.414 20.313 3 18.079 3zM10.89 16.464l-1.634-3.162L5.314 6.25a.689.689 0 0 1 .606-1.03h4.969v11.244zm7.791-10.215-3.94 7.054-1.635 3.16V5.22h4.97c.544 0 .865.578.605 1.03"/></svg>',
  eth:'<svg viewBox="0 0 24 24"><path d="M12 2 5.5 12.28 12 9.36zM12 2v7.36l6.5 2.92zM12 15.06 5.5 12.28 12 22zm0 6.94 6.5-9.72L12 15.06z"/></svg>',
};
const icon = s => `<span class="cico">${ICONS[s] || ''}</span>`;

const CHAINS = [
  { slug:'hood', name:'HoodX',  kanji:'林' },
  { slug:'sol',  name:'SolX',   kanji:'太' },
  { slug:'base', name:'BaseX',  kanji:'基' },
  { slug:'bnb',  name:'BNBX',   kanji:'幣' },
  { slug:'ton',  name:'TonX',   kanji:'頓' },
  { slug:'eth',  name:'EthX',   kanji:'乙' },
];

const GRADES = {
  MINT:     { word:'still sealed',   cls:'' },
  'NEAR MINT':{ word:'opened, near perfect', cls:'' },
  'VG+':    { word:'plays clean, some wear', cls:'' },
  GOOD:     { word:'plays, with noise', cls:'' },
  POOR:     { word:'damaged', cls:'' },
  UNGRADED: { word:'awaiting grading', cls:'ung' },
};

// illustrative tokens (name, ticker, chain slug, grade, state, price, mcap, age, cover density glyph)
const TOKENS = [
  ['Groove Theory','GROOVE','hood','MINT','SEALED','$0.0042','$412K','2h','d1','溝'],
  ['Night Pressing','NGHT','sol','NEAR MINT','OPENED','$0.11','$1.2M','9h','d2','夜'],
  ['B-Side','BSIDE','base','VG+','OPENED','$0.008','$88K','41m','d3','裏'],
  ['Obi Standard','OBI','hood','MINT','SEALED','$0.30','$3.4M','1d','d4','帯'],
  ['Cut Sleeve','CUTS','bnb','GOOD','OPENED','$0.0009','$21K','3h','d1','切'],
  ['Test Press','TSTP','ton','UNGRADED','—','$0.002','$6K','7m','d2','試'],
  ['Deep Cut','DEEP','sol','VG+','OPENED','$0.017','$140K','5h','d3','深'],
  ['White Label','WLBL','base','NEAR MINT','SEALED','$0.052','$610K','12h','d4','白'],
  ['Static Hiss','HISS','eth','GOOD','OPENED','$0.0031','$33K','2d','d1','雑'],
  ['First Pressing','1STP','hood','MINT','SEALED','$0.88','$5.1M','6h','d2','初'],
  ['Warp & Wow','WARP','bnb','POOR','CUT-OUT','$0.00004','$2K','4d','d3','歪'],
  ['Mono Groove','MONO','ton','VG+','OPENED','$0.006','$74K','58m','d4','単'],
];

const chainBy = s => CHAINS.find(c=>c.slug===s) || CHAINS[0];

/* ---------- obi card ---------- */
function obiCard(t, size='bin'){
  const [name,tkr,chain,grade,state,price,mcap,age,dens,glyph] = t;
  const c = chainBy(chain);
  const stCls = state==='SEALED'?'sealed':(state==='CUT-OUT'?'cut':'');
  const gCls = GRADES[grade]?.cls || '';
  return `
  <a class="obi-card ${size}" href="record.html?t=${encodeURIComponent(tkr)}&c=${chain}">
    <div class="obi">
      <div class="grade-b">${grade==='UNGRADED'?'—':grade.replace('NEAR MINT','NM').replace('VG+','VG+')}</div>
      <div class="v">${c.name}</div>
      ${icon(c.slug)}
    </div>
    <div class="obi-body">
      <div class="cover ${dens}"><div class="glyph">${glyph}</div></div>
      <div class="obi-meta">
        <div class="row"><span class="tkr">$${tkr}</span><span class="mono-sm muted">${age}</span></div>
        <div class="row"><span class="k">${size==='hero'?'mcap':'mc'}</span><span class="mono-sm">${mcap}</span></div>
        ${size!=='bin'?`<div class="row"><span class="k">grade</span><span class="mono-sm">${grade} · ${state.toLowerCase()}</span></div>`:''}
      </div>
    </div>
  </a>`;
}

function renderGrid(sel, list, size){
  const el = document.querySelector(sel); if(!el) return;
  el.innerHTML = list.map(t=>obiCard(t,size)).join('');
}

/* ---------- chain switcher row ---------- */
function chainRow(sel, active){
  const el = document.querySelector(sel); if(!el) return;
  el.innerHTML = CHAINS.map(c=>`
    <a class="chain-sw ${c.slug===active?'on':''}" href="storefront.html?c=${c.slug}">
      ${icon(c.slug)}
      <span class="nm">${c.name}</span>
    </a>`).join('') +
    `<span class="chain-sw" style="opacity:.55"><span class="cico" style="color:var(--grey-2)">＋</span><span class="nm">soon</span></span>`;
}

/* ---------- v5 app shell: global topbar + 3-zoom sidebar + wallet drawer ----------
   Wraps every page's existing <main> so the whole product carries the Hub nav
   structure. Zoom state (rail | names) persists across pages via localStorage. */
function mountShell(page){
  const params = new URLSearchParams(location.search);
  const activeChain = params.get('c');                 // storefront.html?c=slug
  const CRUMBS = {
    launch:'· <b>Launch</b>', swap:'· <b>Swap · Bridge</b>',
    collection:'· <b>Collection</b>', record:'· <b>Record</b>',
  };

  // --- topbar ---
  const top = document.createElement('div');
  top.className = 'topbar';
  top.innerHTML =
    '<a class="brand" href="index.html"><img class="brand-logo" src="logo.svg" alt="Mizo"/>'+
    '<span class="mk">Mizo</span><span class="kj">溝</span><small>hub</small></a>'+
    '<span class="crumb">'+(CRUMBS[page]||'')+'</span>'+
    '<span class="grow"></span>'+
    '<button class="wallet-pill" id="mzWallet"><span class="dotpatch"></span>'+
    '<span>wallet · <b>$12,480</b></span><span class="car">▾</span></button>';

  // --- sidebar ---
  const side = document.createElement('nav');
  side.className = 'side';
  side.innerHTML =
    '<div class="s-lbl kick">stores</div>'+
    CHAINS.map(c=>
      '<a class="s-item'+(c.slug===activeChain?' on':'')+'" href="storefront.html?c='+c.slug+'" data-chain="'+c.slug+'">'+
      '<span class="ic">'+icon(c.slug)+'</span><span class="nm">'+c.name+'</span></a>').join('')+
    '<div class="s-div"></div>'+
    '<a class="s-item'+(page==='launch'?' on':'')+'" href="launch.html"><span class="ic"><span class="sym">＋</span></span><span class="nm">Launch</span></a>'+
    '<button class="s-item" id="mzSwap"><span class="ic"><span class="sym">⇅</span></span><span class="nm">Swap · Bridge</span></button>'+
    '<div class="s-spacer"></div>'+
    '<div class="s-foot">'+
      '<button class="s-zoom" id="mzZoom"><span class="zic" id="mzZoomIc">⟩</span><span class="zt" id="mzZoomLbl">names</span></button>'+
      '<a class="s-zoom" href="index.html" title="All stores"><span class="zic">⤢</span><span class="zt">all stores</span></a>'+
    '</div>';

  // --- wallet drawer (global, cross-chain) ---
  const scrim = document.createElement('div'); scrim.className='scrim';
  const drawer = document.createElement('aside'); drawer.className='drawer';
  drawer.innerHTML =
    '<div class="drawer-hd"><span class="mk">Your wallet</span><button class="x" id="mzDrawerX">✕</button></div>'+
    '<div class="drawer-bal">'+CHAINS.map(c=>
      '<span class="balchip">'+icon(c.slug)+c.name.replace('X','')+'</span>').join('')+'</div>'+
    '<div class="drawer-tabs" id="mzTabs"><b class="on" data-tab="swap">Swap</b><b data-tab="bridge">Bridge</b></div>'+
    '<div class="drawer-body">'+
      '<div class="leg"><div class="top"><span id="mzLegA">you pay</span><span>balance 4.20 ETH · EthX</span></div>'+
      '<div class="amtrow"><span class="amt">1.00</span><span class="tok">'+icon('eth')+'ETH ▾</span></div></div>'+
      '<div class="leg-mid" id="mzLegMid">⇅</div>'+
      '<div class="leg"><div class="top"><span id="mzLegB">you receive</span><span>≈ 182.4 · TonX</span></div>'+
      '<div class="amtrow"><span class="amt">182.4</span><span class="tok">'+icon('ton')+'TON ▾</span></div></div>'+
      '<div class="route"><div class="rr"><span>route</span><b id="mzRoute">ETH → intent solver → TON · 1 hop</b></div>'+
      '<div class="rr"><span>gas</span><b>gasless · paid in output</b></div>'+
      '<div class="rr"><span>protection</span><b>MEV-shielded · private mempool</b></div></div>'+
      '<div class="mono-sm muted" style="line-height:1.6">Global to Mizo. Your wallet follows you into every store — trade across all chains from one place, wherever you stand.</div>'+
      '<button class="btn-primary">Connect wallet</button>'+
    '</div>';

  // --- assemble: move existing <main> (+ footer) into the stage ---
  const main = document.querySelector('main.wrap') || document.querySelector('main');
  const app = document.createElement('div'); app.className='app';
  const stage = document.createElement('main'); stage.className='stage';
  if(main){ main.parentNode.insertBefore(app, main); stage.appendChild(main); }
  else { document.body.appendChild(app); }
  const oldFoot = document.querySelector('footer.ft');
  if(oldFoot) stage.appendChild(oldFoot);
  app.appendChild(side); app.appendChild(stage);
  document.body.insertBefore(top, document.body.firstChild);
  document.body.appendChild(scrim); document.body.appendChild(drawer);

  // home page = max zoom-out selector: sidebar collapses away, stage full-width
  if(page==='home') app.classList.add('at-hub');

  // remove the now-empty legacy header
  const oldHead = document.querySelector('header.nav'); if(oldHead) oldHead.remove();

  // footer content
  if(oldFoot) oldFoot.innerHTML =
    '<div class="ft-in">'+
    '<div class="col" style="margin-right:auto"><span class="big">Mizo 溝</span>'+
    '<span>The record store for every chain</span><span class="muted">Wireframe · greyscale</span></div>'+
    '<div class="col"><span style="color:var(--ink)">Product</span>'+
    '<a href="index.html">Discover</a><a href="launch.html">Launch</a>'+
    '<a href="private.html">Swap · Bridge</a><a href="collection.html">Collection</a></div>'+
    '<div class="col"><span style="color:var(--ink)">Trust</span>'+
    '<a href="#">Grading rubric</a><a href="#">Cut-out bin</a>'+
    '<a href="#">No investment advice</a><a href="#">Terms</a></div>'+
    '<div class="col grade-legend"><span style="color:var(--ink)">The ladder</span>'+
    '<span>MINT · still sealed</span><span>NM · near perfect</span>'+
    '<span>VG+ · plays clean</span><span>GOOD · with noise</span>'+
    '<span>POOR · damaged → cut-out</span></div></div>';

  // --- zoom state (rail | list), persisted ---
  const savedZoom = localStorage.getItem('mizoZoom')==='list' ? 'list' : 'rail';
  app.classList.add('zoom-'+savedZoom);
  const zIc = document.getElementById('mzZoomIc'), zLbl = document.getElementById('mzZoomLbl');
  function paintZoom(){
    const listed = app.classList.contains('zoom-list');
    if(zIc)  zIc.textContent  = listed ? '⟨' : '⟩';
    if(zLbl) zLbl.textContent = listed ? 'icons' : 'names';
  }
  paintZoom();
  document.getElementById('mzZoom').addEventListener('click', ()=>{
    const listed = app.classList.toggle('zoom-list');
    app.classList.toggle('zoom-rail', !listed);
    localStorage.setItem('mizoZoom', listed ? 'list' : 'rail');
    paintZoom();
  });

  // --- wallet drawer wiring ---
  function openWallet(tab){ scrim.classList.add('on'); drawer.classList.add('on'); if(tab) setTab(tab); }
  function closeWallet(){ scrim.classList.remove('on'); drawer.classList.remove('on'); }
  function setTab(tab){
    drawer.querySelectorAll('#mzTabs b').forEach(b=>b.classList.toggle('on', b.dataset.tab===tab));
    const swap = tab==='swap';
    document.getElementById('mzLegA').textContent = swap?'you pay':'move in';
    document.getElementById('mzLegB').textContent = swap?'you receive':'arrives on';
    document.getElementById('mzLegMid').textContent = swap?'⇅':'⇄';
    document.getElementById('mzRoute').textContent = swap?'ETH → intent solver → TON · 1 hop':'EthX → TonX · one signature · ~40s';
  }
  document.getElementById('mzWallet').addEventListener('click', ()=>openWallet());
  document.getElementById('mzSwap').addEventListener('click', ()=>openWallet('swap'));
  document.getElementById('mzDrawerX').addEventListener('click', closeWallet);
  scrim.addEventListener('click', closeWallet);
  drawer.querySelectorAll('#mzTabs b').forEach(b=>b.addEventListener('click', ()=>setTab(b.dataset.tab)));
}

/* ---------- small interactions ---------- */
function wireTabs(){
  document.querySelectorAll('[data-tabs]').forEach(group=>{
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
function wireToggle(){
  document.querySelectorAll('.toggle').forEach(tg=>{
    tg.querySelectorAll('b').forEach(b=>b.addEventListener('click',()=>{
      tg.querySelectorAll('b').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      const on = tg.dataset.toggle;
      if(on){ const panel=document.querySelector(on); if(panel) panel.style.display = b.dataset.val==='on'?'block':'none'; }
    }));
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  mountShell(document.body.dataset.page || '');
  wireTabs(); wirePresets(); wireSteps(); wireToggle();
});
