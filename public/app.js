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

/* ---------- v6 chrome: the handheld DEVICE (nav) + separate WALLET object +
   portal picker + wallet drawer + pixie page transitions + entry boot ----------
   The device replaces the old topbar/sidebar and carries across every page. */

const NAV = [
  { key:'map',       gl:'◉', lb:'World',    href:'index.html' },
  { key:'discover',  gl:'▤', lb:'Discover', href:'discover.html' },
  { key:'launch',    gl:'＋', lb:'Launch',  href:'launch.html' },
  { key:'swap',      gl:'⇅', lb:'Swap',     href:'swap.html' },
  { key:'bridge',    gl:'⇄', lb:'Bridge',   href:'bridge.html' },
  { key:'portfolio', gl:'◈', lb:'Wallet',   href:'portfolio.html' },
];

/* pixie transition: play the dissolve, then run cb (usually navigate) */
function pixieGo(cb){
  let px = document.querySelector('.pixie');
  if(!px){
    px = document.createElement('div'); px.className='pixie';
    let sparks=''; for(let i=0;i<14;i++){ sparks+='<span class="spark" style="left:'+(6+Math.random()*88)+'%;top:'+(20+Math.random()*70)+'%;animation-delay:'+(Math.random()*.18)+'s"></span>'; }
    px.innerHTML = sparks; document.body.appendChild(px);
  }
  requestAnimationFrame(()=>px.classList.add('show'));
  sessionStorage.setItem('mizoNav','1');
  setTimeout(cb, 360);
}
function pixieNav(href){ pixieGo(()=>{ location.href = href; }); }
window.pixieNav = pixieNav; window.pixieGo = pixieGo;

function locLabel(page, activeChain){
  if(page==='home') return { loc:'THE WORLD', read:'6 stores open · <span class="blink">▮</span> live' };
  if(activeChain){ const c = chainBy(activeChain); return { loc:c.name+' STORE', read:c.kanji+' · wall 12 · bin open'}; }
  const map={ discover:'DISCOVER · ALL CHAINS', launch:'LAUNCH BOOTH', swap:'CROSS-CHAIN SWAP', bridge:'THE BRIDGE',
    portfolio:'YOUR SHELF', grading:'THE RUBRIC', collection:"MIZO'S COLLECTION", record:'RECORD DETAIL',
    private:'THE BACK ROOM', cutout:'CUT-OUT BIN' };
  return { loc: map[page]||'MIZO', read:'greyscale · wireframe' };
}

function mountShell(page){
  const params = new URLSearchParams(location.search);
  const activeChain = params.get('c');
  const walletOff = params.get('wallet')==='off';   // ?wallet=off = disconnected state

  // --- assemble stage first (move existing main + footer in) ---
  const main = document.querySelector('main.wrap') || document.querySelector('main');
  const app = document.createElement('div'); app.className='app';
  const stage = document.createElement('main'); stage.className='stage';
  if(main){ main.parentNode.insertBefore(app, main); stage.appendChild(main); }
  else { document.body.appendChild(app); }
  const oldFoot = document.querySelector('footer.ft');
  if(oldFoot) stage.appendChild(oldFoot);
  app.appendChild(stage);
  if(page==='home') app.classList.add('at-hub');
  const oldHead = document.querySelector('header.nav'); if(oldHead) oldHead.remove();

  // --- brand float (top-left) ---
  const brand = document.createElement('a');
  brand.className='brand-float'; brand.href='index.html';
  brand.innerHTML='<img src="logo.svg" alt="Mizo"/><span class="mk">Mizo</span><span class="kj">溝</span><small>hub</small>';
  /* navigation handled by the global link interceptor below */

  // --- the device (nav) ---
  const dev = document.createElement('div'); dev.className='device boot';
  const L = locLabel(page, activeChain);
  dev.innerHTML =
    '<div class="dev-screen"><div class="dev-loc" id="devLoc">'+L.loc+'</div>'+
      '<div class="dev-read" id="devRead">'+L.read+'</div></div>'+
    '<span class="dev-openhint" title="open">▸</span>'+
    '<div class="dev-keys">'+ NAV.map(n=>{
      const on = (n.key==='map'&&page==='home') || n.key===page || (n.key==='portfolio'&&page==='portfolio');
      return '<button class="dev-key'+(on?' on':'')+'" data-nav="'+n.key+'" data-href="'+n.href+'">'+
        '<span class="gl">'+n.gl+'</span><span class="lb">'+n.lb+'</span></button>';
    }).join('')+'</div>'+
    '<div class="dev-portal"><button class="pbtn" id="mzPortal"><span class="pdial"></span>portal to a store</button>'+
      '<button class="dev-collapse" id="mzCollapse" title="tuck away">▁</button></div>';

  // --- portal sheet ---
  const psheet = document.createElement('div'); psheet.className='portal-sheet';
  psheet.innerHTML = '<h4>portal to</h4><div class="portal-list">'+
    CHAINS.map(c=>'<button class="portal-dest'+(c.slug===activeChain?' here':'')+'" data-slug="'+c.slug+'">'+
      icon(c.slug)+'<span class="pn">'+c.name+'</span><span class="ps">'+(c.slug===activeChain?'you are here':'open')+'</span></button>').join('')+
    '</div>';

  // --- wallet object (separate, top-right) + drawer ---
  const wobj = document.createElement('button'); wobj.className='wallet-obj'+(walletOff?' off':'');
  wobj.id='mzWallet';
  wobj.innerHTML = walletOff
    ? '<span class="wchip">連</span><span class="wtxt"><span class="wa">Connect</span><span class="wl">wallet</span></span><span class="car">▾</span>'
    : '<span class="wchip">財</span><span class="wtxt"><span class="wa">$12,480</span><span class="wl">wallet · 6 chains</span></span><span class="car">▾</span>';

  const scrim = document.createElement('div'); scrim.className='scrim';
  const drawer = document.createElement('aside'); drawer.className='drawer';
  drawer.innerHTML =
    '<div class="drawer-hd"><span class="mk">Your wallet</span><button class="x" id="mzDrawerX">✕</button></div>'+
    (walletOff
      ? '<div class="drawer-body"><div class="empty" style="padding:34px 20px"><div class="em-ico">財</div><h3>Not connected</h3><p>Connect to buy, swap, bridge and launch. Browsing every store stays free.</p></div>'+
        '<button class="btn-primary">Connect wallet</button>'+
        '<div class="mono-sm muted" style="line-height:1.6">WalletConnect · Phantom · Rabby · MetaMask · Trust · Coinbase. One connection covers every chain.</div></div>'
      : '<div class="drawer-bal">'+CHAINS.map(c=>'<span class="balchip">'+icon(c.slug)+c.name.replace('X','')+'</span>').join('')+'</div>'+
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
          '<button class="btn-primary">Review &amp; sign</button>'+
        '</div>');

  document.body.appendChild(brand);
  document.body.appendChild(dev);
  document.body.appendChild(psheet);
  document.body.appendChild(wobj);
  document.body.appendChild(scrim);
  document.body.appendChild(drawer);

  // footer content
  if(oldFoot) oldFoot.innerHTML =
    '<div class="ft-in">'+
    '<div class="col" style="margin-right:auto"><span class="big">Mizo 溝</span>'+
    '<span>The record store for every chain</span><span class="muted">Wireframe · greyscale</span></div>'+
    '<div class="col"><span style="color:var(--ink)">Product</span>'+
    '<a href="discover.html">Discover</a><a href="launch.html">Launch</a>'+
    '<a href="swap.html">Swap</a><a href="bridge.html">Bridge</a><a href="collection.html">Collection</a></div>'+
    '<div class="col"><span style="color:var(--ink)">Trust</span>'+
    '<a href="grading.html">Grading rubric</a><a href="storefront-cutout.html">Cut-out bin</a>'+
    '<a href="private.html">Private swap</a><a href="#">No investment advice</a></div>'+
    '<div class="col grade-legend"><span style="color:var(--ink)">The ladder</span>'+
    '<span>MINT · still sealed</span><span>NM · near perfect</span>'+
    '<span>VG+ · plays clean</span><span>GOOD · with noise</span>'+
    '<span>POOR · damaged → cut-out</span></div></div>';

  // --- device nav wiring (with pixie) ---
  dev.querySelectorAll('.dev-key').forEach(k=>k.addEventListener('click', ()=>{
    const href=k.dataset.href; if(href) pixieNav(href);
  }));
  // collapse / expand the device
  const collapse=dev.querySelector('#mzCollapse');
  collapse.addEventListener('click', e=>{ e.stopPropagation(); dev.classList.add('min'); });
  dev.querySelector('.dev-openhint').addEventListener('click', ()=>dev.classList.remove('min'));
  dev.querySelector('.dev-screen').addEventListener('click', ()=>{ if(dev.classList.contains('min')) dev.classList.remove('min'); });

  // --- portal sheet wiring ---
  const portalBtn=dev.querySelector('#mzPortal');
  portalBtn.addEventListener('click', e=>{ e.stopPropagation(); psheet.classList.toggle('on'); });
  psheet.querySelectorAll('.portal-dest').forEach(d=>d.addEventListener('click', ()=>{
    psheet.classList.remove('on'); pixieNav('storefront.html?c='+d.dataset.slug);
  }));
  document.addEventListener('click', e=>{ if(!psheet.contains(e.target) && !portalBtn.contains(e.target)) psheet.classList.remove('on'); });

  // --- wallet drawer wiring ---
  function openWallet(tab){ scrim.classList.add('on'); drawer.classList.add('on'); if(tab && !walletOff) setTab(tab); }
  function closeWallet(){ scrim.classList.remove('on'); drawer.classList.remove('on'); }
  function setTab(tab){
    drawer.querySelectorAll('#mzTabs b').forEach(b=>b.classList.toggle('on', b.dataset.tab===tab));
    const swap = tab==='swap';
    const A=document.getElementById('mzLegA'), B=document.getElementById('mzLegB'), M=document.getElementById('mzLegMid'), R=document.getElementById('mzRoute');
    if(A) A.textContent = swap?'you pay':'move in';
    if(B) B.textContent = swap?'you receive':'arrives on';
    if(M) M.textContent = swap?'⇅':'⇄';
    if(R) R.textContent = swap?'ETH → intent solver → TON · 1 hop':'EthX → TonX · one signature · ~40s';
  }
  wobj.addEventListener('click', ()=>openWallet());
  document.getElementById('mzDrawerX').addEventListener('click', closeWallet);
  scrim.addEventListener('click', closeWallet);
  drawer.querySelectorAll('#mzTabs b').forEach(b=>b.addEventListener('click', ()=>setTab(b.dataset.tab)));
  window.mzOpenWallet = openWallet;  // let pages trigger it (e.g. verbs)

  // --- boot / page-in animation ---
  setTimeout(()=>dev.classList.remove('boot'), 800);
  if(sessionStorage.getItem('mizoNav')){ stage.classList.add('enter-in'); sessionStorage.removeItem('mizoNav'); }

  // --- intercept internal links for seamless pixie transitions ---
  document.addEventListener('click', e=>{
    const a=e.target.closest('a'); if(!a) return;
    const href=a.getAttribute('href')||'';
    if(a.target==='_blank' || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;
    if(!/\.html(\?|$)/.test(href)) return;
    e.preventDefault(); pixieNav(href);
  });
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
