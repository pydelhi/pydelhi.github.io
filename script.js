let REGISTRATION_OPEN = true;
let CFP_OPEN = true;

const PHOTOS = [
  { cid:'bento-cell-0', gid:'ghost-0', img:'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80', lb:"PyCon Delhi '24",   spct:.04,  srpct:null, sy:.20, sw:150, sh:185, rot:-7 },
  { cid:'bento-cell-1', gid:'ghost-1', img:'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80', lb:'Workshop · FastAPI', spct:.10,  srpct:null, sy:.55, sw:210, sh:150, rot: 6 },
  { cid:'bento-cell-2', gid:'ghost-2', img:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80', lb:'Meetup #62',          spct:null, srpct:.04,  sy:.15, sw:158, sh:195, rot: 9 },
  { cid:'bento-cell-3', gid:'ghost-3', img:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80', lb:'Community Meetup', spct:null, srpct:.08,  sy:.55, sw:290, sh:210, rot:-6 },
];


function updateMeetupCard() {
  const badge = document.getElementById('meetup-badge');
  const regBtn = document.getElementById('meetup-register');
  const cfpBtn = document.getElementById('meetup-cfp');

  if (REGISTRATION_OPEN) {
    badge.textContent = 'Upcoming';
    badge.className = 'info-chip info-chip-open';
    regBtn.className = 'meetup-btn-primary';
    regBtn.href = '#';
  } else {
    badge.textContent = 'Registration closed';
    badge.className = 'info-chip info-chip-closed';
    regBtn.className = 'meetup-btn-primary meetup-btn-disabled';
    regBtn.removeAttribute('href');
  }

  if (CFP_OPEN) {
    cfpBtn.className = 'meetup-btn-secondary';
    cfpBtn.href = '#';
  } else {
    cfpBtn.className = 'meetup-btn-secondary meetup-btn-disabled';
    cfpBtn.removeAttribute('href');
  }
}

setTimeout(() => { updateMeetupCard(); }, 0);

const heroText = document.getElementById('hero-text');
const gridLayer = document.getElementById('grid-layer');

const photoCardEls = PHOTOS.map(p => {
  const d = document.createElement('div');
  d.className = 'photo-card';
  d.style.cssText = `position:fixed;width:${p.sw}px;height:${p.sh}px;left:0;top:0;pointer-events:none;`;
  d.innerHTML = `<div class="photo-card-inner"><img class="photo-card-img" src="${p.img}" alt="${p.lb}"><div class="photo-card-label">${p.lb}</div></div>`;
  document.body.appendChild(d);
  return d;
});

function clamp(v,a,b){ return Math.max(a,Math.min(b,v)) }
function lerp(a,b,t){ return a+(b-a)*t }
function ease(t){ return t<.5?2*t*t:-1+(4-2*t)*t }
function easeOut3(t){ return 1-Math.pow(1-t,3) }

const GRID_FINAL_TOP = 88;
const GRID_PEEK_VH   = 0.88;

let PEEK_TOP   = 0;
let scatterPos = [];

function computeLayout() {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  PEEK_TOP = vh * GRID_PEEK_VH;

  gridLayer.style.transform = `translateX(-50%)`;
  gridLayer.style.top = GRID_FINAL_TOP + 'px';
  gridLayer.offsetHeight;

  scatterPos = PHOTOS.map(p => {
    const lx = p.spct !== null
      ? vw * p.spct
      : vw - vw * p.srpct - p.sw;
    const ly = vh * p.sy;
    return { x: lx, y: ly, w: p.sw, h: p.sh };
  });

  gridLayer.style.top = PEEK_TOP + 'px';
}

function update() {
  const st = window.scrollY;
  const vh = window.innerHeight;

  const p = clamp(st / vh, 0, 1);

  const hf = ease(clamp(p / 0.4, 0, 1));
  heroText.style.opacity   = 1 - hf;
  heroText.style.transform = `translate(-50%, calc(-55% - ${hf * 20}px))`;

  const gp      = ease(p);
  const gridTop = lerp(PEEK_TOP, GRID_FINAL_TOP, gp);
  gridLayer.style.top  = gridTop + 'px';

  const targetGridTop = Math.max(GRID_FINAL_TOP + 10, vh * 0.65);
  const fp_raw = (PEEK_TOP - gridTop) / (PEEK_TOP - targetGridTop);
  const fp = easeOut3(clamp(fp_raw, 0, 1));

  PHOTOS.forEach((ph, i) => {
    const el   = photoCardEls[i];
    const from = scatterPos[i];
    if (!from) return;

    const cell = document.getElementById(ph.cid);
    const ccr  = cell.getBoundingClientRect();
    const to   = { x: ccr.left, y: ccr.top, w: ccr.width, h: ccr.height };

    const x  = lerp(from.x, to.x, fp);
    const y  = lerp(from.y, to.y, fp);
    const w  = lerp(from.w, to.w, fp);
    const h  = lerp(from.h, to.h, fp);
    const r  = lerp(ph.rot, 0, fp);

    const sh = lerp(12, 0, fp);
    const shadowAlpha = lerp(0.12, 0, fp);
    const bW = lerp(3, 0, Math.pow(fp, 4));

    el.style.left         = x + 'px';
    el.style.top          = y + 'px';
    el.style.width        = w + 'px';
    el.style.height       = h + 'px';
    el.style.transform    = `rotate(${r}deg)`;
    el.style.boxShadow    = `0 ${sh}px ${sh*3.5}px rgba(0,0,0,${shadowAlpha})`;
    el.style.border       = `${bW}px solid #fff`;
    el.style.zIndex       = 10;
    el.style.borderRadius = '14px';

    const ghost = document.getElementById(ph.gid);
    if (ghost) ghost.style.opacity = 1 - fp;
  });
}

window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
window.addEventListener('resize', () => { computeLayout(); update(); });

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    computeLayout();
    update();
  });
});
