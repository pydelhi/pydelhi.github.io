let REGISTRATION_OPEN = true;
let CFP_OPEN = true;


// m = start position on phones: x/y as a fraction of the screen, x may be negative so the card bleeds off the edge
const PHOTOS = [
  { cid:'bento-cell-0', img:'./assets/DSC_0873.JPG', lb:"Talks",   spct:.04,  srpct:null, sy:.20, sw:150, sh:185, rot:-7, m:{ x:-.1,  y:.15, w:112, h:140 } },
  { cid:'bento-cell-1', img:'./assets/grouppic.jpeg', lb:'Meetups', spct:.10,  srpct:null, sy:.55, sw:210, sh:150, rot: 6, m:{ x:.74,  y:.1,  w:130, h:96  } },
  { cid:'bento-cell-2', img:'./assets/IWD.jpeg', lb:'Workshops', spct:null, srpct:.04,  sy:.15, sw:158, sh:195, rot: 9, m:{ x:-.14, y:.52, w:108, h:146 } },
  { cid:'bento-cell-3', img:'./assets/bof.jpg', lb:'Birds of a Feather', spct:null, srpct:.08,  sy:.55, sw:290, sh:210, rot:-6, m:{ x:.66,  y:.8,  w:156, h:112 } },
];

// TODO: placeholder lists. Slugs come from simpleicons.org, `name` is the alt text.
// Entries without a slug render as a text wordmark.
const SPEAKER_COMPANIES = [
  { name:'Google', slug:'google' },
  { name:'Red Hat', slug:'redhat' },
  { name:'Zomato', slug:'zomato' },
  { name:'Swiggy', slug:'swiggy' },
  { name:'Paytm', slug:'paytm' },
  { name:'Razorpay', slug:'razorpay' },
  { name:'Atlassian', slug:'atlassian' },
  { name:'Postman', slug:'postman' },
  { name:'Mozilla', slug:'mozilla' },
];
const SPONSORS = [
  { name:'Appinventiv' },
  { name:'GitHub', slug:'github' },
  { name:'JetBrains', slug:'jetbrains' },
  { name:'Python Software Foundation', slug:'python' },
  { name:'DigitalOcean', slug:'digitalocean' },
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

updateMeetupCard();

function clamp(v,a,b){ return Math.max(a,Math.min(b,v)) }
function lerp(a,b,t){ return a+(b-a)*t }

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const compactView  = matchMedia('(max-width: 860px)');
const touchScreen  = matchMedia('(pointer: coarse)');


/* ─── HERO: photos fly into the bento ───
   Nothing is pinned: the headline and the bento are ordinary page content and
   scroll natively. Each photo already sits in its bento cell and only carries a
   transform that throws it out to a scattered spot around the headline. That
   offset shrinks linearly with scroll, through a spring, and reaches zero as
   the bento arrives under the nav. Only transform and opacity change, so the
   browser never has to lay the page out again while you scroll. */

const heroText  = document.getElementById('hero-text');
const gridLayer = document.getElementById('grid-layer');

const GRID_FINAL_TOP = 92;

const photoEls = PHOTOS.map(p => {
  const el = document.createElement('div');
  el.className = 'cell-photo';
  el.innerHTML = `<img src="${p.img}" alt="${p.lb}" draggable="false"><div class="photo-card-label">${p.lb}</div>`;
  document.getElementById(p.cid).appendChild(el);
  return el;
});

let L = null;

function measureHero() {
  photoEls.forEach(el => { el.style.transform = ''; el.style.removeProperty('--f'); });
  if (reduceMotion.matches) { L = null; return; }

  const compact = compactView.matches;
  const vw = document.documentElement.clientWidth, vh = innerHeight;
  // scattered cards were sized for a ~1440px screen (or a ~390x844 phone); shrink them on smaller ones
  const k  = clamp(vw / 1440, .62, 1);
  const km = clamp(Math.min(vw / 390, vh / 844), .72, 1);

  // where the bento's top edge is when the photos finish landing. Measured off portrait.so, that
  // happens early, about a quarter of the way down the screen, even if the bento's bottom is still below the fold
  const gr = gridLayer.getBoundingClientRect();
  const landTop = vh * (compact ? .22 : .26);

  L = {
    // scroll distance over which the photos travel
    run: Math.max(1, gr.top + scrollY - landTop),
    photos: PHOTOS.map((p, i) => {
      const r = photoEls[i].getBoundingClientRect();
      const from = compact
        ? { x: vw * p.m.x, y: vh * p.m.y, w: p.m.w * km, h: p.m.h * km }
        : { x: p.spct !== null ? vw * p.spct : vw - vw * p.srpct - p.sw * k, y: vh * p.sy, w: p.sw * k, h: p.sh * k };
      return {
        // offset from the cell's centre to the scattered card's centre, in page coordinates
        dx: from.x + from.w / 2 - (r.left + r.width / 2),
        dy: from.y + from.h / 2 - (r.top + scrollY + r.height / 2),
        // uniform scale keeps the cell's shape, sized to roughly the scattered card's area
        s: Math.sqrt((from.w * from.h) / (r.width * r.height)),
        rot: p.rot,
      };
    }),
  };
}

function renderHero(p) {
  L.photos.forEach((ph, i) => {
    const f = 1 - p;
    const el = photoEls[i];
    el.style.transform = `translate3d(${ph.dx * f}px, ${ph.dy * f}px, 0) scale(${lerp(ph.s, 1, p)}) rotate(${ph.rot * f}deg)`;
    // drives the white frame and drop shadow, which fade out as the photo lands
    el.style.setProperty('--f', f.toFixed(3));
  });
}


/* ─── JOIN: photos drift at different speeds as the section passes ─── */

const joinSection = document.getElementById('join');
const joinPhotos = [...joinSection.querySelectorAll('[data-drift]')];

function renderJoin() {
  const r = joinSection.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return;
  // -1 when the section enters at the bottom, 1 when it leaves at the top
  const p = clamp(1 - (r.top + r.height) / ((innerHeight + r.height) / 2), -1, 1);
  joinPhotos.forEach(el => el.style.setProperty('--dy', (p * +el.dataset.drift).toFixed(1) + 'px'));
}


/* ─── one frame loop for everything scroll-linked ───
   The hero's progress follows the scroll through a critically damped spring,
   so the photos glide and settle like Portrait's rather than snapping to each
   wheel step. The page itself always scrolls natively. */

const SPRING = 13;   // rad/s; higher is snappier
let pos = null, vel = 0, lastTs = 0;

function frame(ts) {
  const dt = Math.min(.05, (ts - lastTs) / 1000 || .016);
  lastTs = ts;

  // all layout reads happen before any style writes
  if (!reduceMotion.matches && !compactView.matches) renderJoin();

  if (L) {
    const target = clamp(scrollY / L.run, 0, 1);
    if (pos === null) pos = target;
    // small fixed substeps keep the spring stable when a frame runs long
    for (let t = dt; t > 0; t -= 1 / 240) {
      const h = Math.min(t, 1 / 240);
      vel += (SPRING * SPRING * (target - pos) - 2 * SPRING * vel) * h;
      pos += vel * h;
    }
    if (Math.abs(target - pos) < .0002 && Math.abs(vel) < .002) { pos = target; vel = 0; }
    if (pos !== L.last) { L.last = pos; renderHero(clamp(pos, 0, 1)); }
  }

  requestAnimationFrame(frame);
}

function relayout() {
  measureHero();
  if (L) { L.last = null; renderHero(clamp(pos ?? 0, 0, 1)); }
}

// phones fire resize whenever the address bar slides in or out; only re-measure when the width changes
let lastW = innerWidth;
addEventListener('resize', () => {
  if (touchScreen.matches && innerWidth === lastW) return;
  lastW = innerWidth;
  relayout();
});
reduceMotion.addEventListener('change', relayout);
compactView.addEventListener('change', relayout);
// images and fonts shift the layout as they load, which moves the cells
addEventListener('load', relayout);

requestAnimationFrame(() => {
  relayout();
  requestAnimationFrame(frame);
});


/* ─── NAV (mobile menu) ─── */

const nav = document.getElementById('site-nav');
const navToggle = document.getElementById('nav-toggle');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navToggle.firstElementChild.className = open ? 'ph ph-x' : 'ph ph-list';
});


/* ─── LOGOS ─── */

function logoEl({ name, slug }) {
  if (!slug) return `<span class="logo logo-word">${name}</span>`;
  return `<span class="logo"><img src="https://cdn.simpleicons.org/${slug}/00296B" alt="${name}" loading="lazy"><span>${name}</span></span>`;
}

const speakerTrack = document.getElementById('speaker-logos');
const speakerRow = SPEAKER_COMPANIES.map(logoEl).join('');
// track holds the list twice so the marquee loop is seamless
speakerTrack.innerHTML = speakerRow + speakerRow.replace(/<span class="logo/g, '<span aria-hidden="true" class="logo');
// short list, so repeat it until one copy is wider than the screen, then double it for the loop
const sponsorRow = Array(3).fill(SPONSORS.map(logoEl).join('')).join('');
document.getElementById('sponsor-logos').innerHTML = sponsorRow + sponsorRow.replace(/<span class="logo/g, '<span aria-hidden="true" class="logo');


/* ─── FORMATS: hovering a row dims the rest and shows its photo near the cursor ─── */

const formatList = document.getElementById('formats');
const preview = document.getElementById('format-preview');
const previewImgs = [...formatList.querySelectorAll('.format')].map(li => {
  const img = document.createElement('img');
  img.src = li.dataset.img;
  img.alt = '';
  preview.appendChild(img);
  return img;
});

function setActiveFormat(li) {
  formatList.querySelectorAll('.format').forEach((f, i) => {
    const on = f === li;
    f.classList.toggle('active', on);
    previewImgs[i].classList.toggle('show', on);
  });
  formatList.classList.toggle('has-active', !!li);
  preview.classList.toggle('on', !!li);
}

// the photo sits just right of the active name, so it never covers the word itself
function placePreview(li) {
  const box = preview.offsetParent.getBoundingClientRect();
  const name = li.querySelector('.format-name').getBoundingClientRect();
  const row = li.getBoundingClientRect();
  const i = [...formatList.children].indexOf(li);
  const desc = li.querySelector('.format-desc').getBoundingClientRect();
  const x = Math.min(name.right + 28, desc.left - preview.offsetWidth - 20) - box.left;
  preview.style.setProperty('--x', x + 'px');
  preview.style.setProperty('--y', (row.top - box.top + row.height / 2 - preview.offsetHeight / 2) + 'px');
  preview.style.setProperty('--r', (i % 2 ? 4 : -4) + 'deg');
}

formatList.querySelectorAll('.format').forEach(li => {
  li.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { placePreview(li); setActiveFormat(li); } });
  li.addEventListener('focus', () => { placePreview(li); setActiveFormat(li); });
  li.addEventListener('blur', () => setActiveFormat(null));
});
formatList.addEventListener('pointerleave', () => setActiveFormat(null));


/* ─── REVEALS ─── */

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  });
}, { threshold: .25, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('[data-reveal]').forEach((el, i) => {
  el.style.setProperty('--d', (i % 4) * 70 + 'ms');
  io.observe(el);
});


/* ─── STATS: meetup history graph ───
   TODO: placeholder history. One string per year, one character per month (Jan..Dec):
   t = talks night, w = workshop, b = Birds of a Feather, . = no meetup */

const MEETUP_HISTORY = {
  2011: '.......t..t.',
  2012: 't..t.t..t.tt',
  2013: '....t.t.tt.t',
  2014: 't.tt.tw.tt.t',
  2015: 'tt.twt.tt.wt',
  2016: 'ttwt.tbtt.tt',
  2017: 'tw.ttbt.twtt',
  2018: 'ttwtbt.ttwbt',
  2019: 'tbttwt.tbttw',
  2020: 'ttt..t..t..t',
  2021: '..t..t..t.tt',
  2022: 't.tt.tw.tbtt',
  2023: 'tbtwt.ttbtwt',
  2024: 'ttbtwttbt.tw',
  2025: 'tbtwttb.twtb',
  2026: 'twtbtwt.tb..',
};
const KIND = { t:['talk','Talks'], w:['workshop','Workshop'], b:['bof','Birds of a Feather'] };
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

(function buildGraph() {
  const graph = document.getElementById('graph');
  const now = new Date();
  let html = '';
  let total = 0, i = 0;
  for (const [year, months] of Object.entries(MEETUP_HISTORY)) {
    [...months].forEach((c, m) => {
      const future = +year > now.getFullYear() || (+year === now.getFullYear() && m > now.getMonth());
      const kind = !future && KIND[c];
      if (kind) total++;
      const cls = future ? 'future' : kind ? kind[0] : '';
      const label = `${MONTHS[m]} ${year}: ${future ? 'coming up' : kind ? kind[1] : 'no meetup'}`;
      html += `<span class="cell ${cls}" data-label="${label}" style="--cd:${i++ * 4}ms"></span>`;
    });
  }
  graph.innerHTML = html;
  document.getElementById('meetup-total').textContent = total;

  // custom tooltip: native titles are slow to appear and don't show on every device
  const tip = document.getElementById('graph-tip');
  const wrap = graph.parentElement;
  graph.addEventListener('pointerover', e => {
    const cell = e.target.closest('.cell');
    if (!cell) return;
    const c = cell.getBoundingClientRect(), w = wrap.getBoundingClientRect();
    tip.textContent = cell.dataset.label;
    tip.style.left = (c.left - w.left + c.width / 2) + 'px';
    tip.style.top = (c.top - w.top) + 'px';
    tip.classList.add('on');
  });
  graph.addEventListener('pointerleave', () => tip.classList.remove('on'));
})();


/* ─── SPONSOR / COLLABORATE toggle ─── */

const tabs = [...document.querySelectorAll('.switch-btn')];
function selectTab(tab) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t));
  t.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});


/* ─── PHOTO STRIP: buttons + drag to pan ─── */

const strip = document.getElementById('strip');

document.querySelectorAll('[data-strip]').forEach(btn => {
  btn.addEventListener('click', () => {
    strip.scrollBy({ left: +btn.dataset.strip * strip.clientWidth * .7, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  });
});

let drag = null;
strip.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse') return;
  drag = { x: e.clientX, left: strip.scrollLeft, moved: false };
  strip.setPointerCapture(e.pointerId);
});
strip.addEventListener('pointermove', e => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (Math.abs(dx) > 4) { drag.moved = true; strip.classList.add('dragging'); }
  strip.scrollLeft = drag.left - dx;
});
const endDrag = () => {
  if (!drag) return;
  drag = null;
  strip.classList.remove('dragging');
};
strip.addEventListener('pointerup', endDrag);
strip.addEventListener('pointercancel', endDrag);
