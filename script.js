let REGISTRATION_OPEN = true;
let CFP_OPEN = true;


// m = start position on phones: x/y as a fraction of the screen, x may be negative so the card bleeds off the edge
const PHOTOS = [
  { cid:'bento-cell-0', img:'./assets/DSC_0873.JPG', lb:"Talks",   spct:.04,  srpct:null, sy:.20, sw:150, sh:185, rot:-7, m:{ x:-.1,  y:.15, w:112, h:140 } },
  { cid:'bento-cell-1', img:'./assets/grouppic.jpeg', lb:'Meetups', spct:.10,  srpct:null, sy:.55, sw:210, sh:150, rot: 6, m:{ x:.74,  y:.1,  w:130, h:96  } },
  { cid:'bento-cell-2', img:'./assets/IWD.jpeg', lb:'Workshops', spct:null, srpct:.04,  sy:.15, sw:158, sh:195, rot: 9, m:{ x:-.14, y:.52, w:108, h:146 } },
  { cid:'bento-cell-3', img:'./assets/bof.jpg', lb:'Birds of a Feather', spct:null, srpct:.08,  sy:.55, sw:290, sh:210, rot:-6, m:{ x:.66,  y:.8,  w:156, h:112 } },
];

// Logos live in assets/logos and are drawn in navy through a CSS mask, so any colour file works.
// `r` is the file's width / height, used to size every logo to a similar visual weight.
// Most files are the full official logo (symbol + wordmark), so no extra text is added;
// `text` is only for a bare symbol that needs the name beside it.
// Speakers: employers named in the bios of delivered talks (github.com/pydelhi/talks).
const SPEAKER_COMPANIES = [
  { name:'Adobe', file:'adobe.svg', r:3.96 },
  { name:'Microsoft', file:'microsoft.svg', r:4.69 },
  { name:'Red Hat', file:'redhat.svg', r:4.23 },
  { name:'EPAM Systems', file:'epam.png', r:2.84 },
  { name:'Thoughtworks', file:'thoughtworks.png', r:6.15 },
  { name:'Accenture', file:'accenture.svg', r:3.80 },
  { name:'SingleStore', file:'singlestore.svg', r:4.83 },
  { name:'Tata 1mg', file:'tata1mg.svg', r:4.50 },
  { name:'NEC', file:'nec.svg', r:3.68 },
  { name:'Nagarro', file:'nagarro.svg', r:4.03 },
  { name:'Cars24', file:'cars24.svg', r:3.57 },
  { name:'L&T Technology Services', file:'ltts.svg', r:6.67 },
  { name:'Unstop', file:'unstop.svg', r:2.51 },
  { name:'Appinventiv', file:'appinventiv.svg', r:4.58 },
  { name:'Essentia.dev', file:'essentia.svg', r:5.40 },
  { name:'GlobalLogic', file:'globallogic.png', r:5.65 },
  { name:'Quansight', file:'quansight.png', r:3.17 },
  { name:'Juniper Square', file:'junipersquare.svg', r:7.72 },
  { name:'FOSSASIA', file:'fossasia.svg', r:2.35 },
];
// Sponsors and venues: hosts on meetup.com/pydelhi and Commudle, plus sponsors named in blog recaps.
const SPONSORS = [
  { name:'Microsoft', file:'microsoft.svg', r:4.69 },
  { name:'Zomato', file:'zomato.png', r:4.68 },
  { name:'Adobe', file:'adobe.svg', r:3.96 },
  { name:'Nykaa', file:'nykaa.svg', r:2.99 },
  { name:'Thoughtworks', file:'thoughtworks.png', r:6.15 },
  { name:'Gojek', file:'gojek.svg', r:3.50 },
  { name:'EPAM Systems', file:'epam.png', r:2.84 },
  { name:'Tata 1mg', file:'tata1mg.svg', r:4.50 },
  { name:'Hike', file:'hike.svg', r:2.62 },
  { name:'HT Media', file:'htmedia.svg', r:4.28 },
  { name:'GitHub', file:'github-mark.svg', r:1, text:'GitHub' },
  { name:'SingleStore', file:'singlestore.svg', r:4.83 },
  { name:'WeWork', file:'wework.svg', r:4.70 },
  { name:'91springboard', file:'91springboard.png', r:4.20 },
  { name:'Appinventiv', file:'appinventiv.svg', r:4.58 },
  { name:'Unstop', file:'unstop.svg', r:2.51 },
  { name:'Essentia.dev', file:'essentia.svg', r:5.40 },
  { name:'Innovaccer', file:'innovaccer.svg', r:1.08, text:'Innovaccer' },
  { name:'Grofers', file:'grofers.svg', r:3.23 },
  { name:'Srijan Technologies', file:'srijan.svg', r:2.96 },
  { name:'SocialCops', file:'socialcops.svg', r:4.30 },
  { name:'HealthKart', file:'healthkart.png', r:3.98 },
  { name:'LambdaTest', file:'lambdatest.svg', r:5.65 },
  { name:'Fueled', file:'fueled.png', r:5.33 },
  { name:'Coredge', file:'coredge.png', r:4.22 },
  { name:'Knowlarity', file:'knowlarity.png', r:4.67 },
  { name:'E2E Networks', file:'e2e.png', r:1.47, text:'E2E Networks' },
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
  renderSnake(dt);

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

function logoEl({ name, file, r, text }) {
  // wide logos get shorter and tall ones taller, so they all read at about the same size
  const h = text ? 26 : Math.round(clamp(28 * Math.pow(4 / r, .45), 18, 38));
  const mark = `<span class="logo-img" style="--src:url('assets/logos/${file}');width:${Math.round(h * r)}px;height:${h}px"></span>`;
  return text
    ? `<span class="logo" role="img" aria-label="${name}">${mark}<span aria-hidden="true">${text}</span></span>`
    : `<span class="logo" role="img" aria-label="${name}">${mark}</span>`;
}

function fillMarquee(id, list) {
  const row = list.map(logoEl).join('');
  const track = document.getElementById(id);
  // track holds the list twice so the loop is seamless; the copy is hidden from screen readers
  track.innerHTML = row + row.replace(/<span class="logo" role="img" aria-label="[^"]*"/g, '<span class="logo" aria-hidden="true"');
  // keep the same scroll speed however many logos there are
  track.style.animationDuration = list.length * 3.2 + 's';
}
fillMarquee('speaker-logos', SPEAKER_COMPANIES);
fillMarquee('sponsor-logos', SPONSORS);


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
  // the floating preview is hidden on phones (rows show their own thumbnail), so there is nothing to place
  if (!preview.offsetParent) return;
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


/* ─── PAST EVENTS ─── */

// Titles, dates and links come from Commudle; it has no event photos, so they live here.
// Key = the event's slug, the last part of its Commudle URL. Drop the photo in assets/events/.
// An event without an entry (or with a missing file) gets a generated cover instead.
const EVENT_PHOTOS = {
  // 'software-internals-meetup-1-redis-kubernetes': { img:'./assets/events/software-internals-1.jpg', alt:'Group photo from Software Internals Meetup #1' },
  // 'pydelhi-3-15-the-next-python': { img:'./assets/events/pydelhi-3-15.jpg', alt:'Group photo from PyDelhi 3.15: The Next Python' },
};

const COMMUDLE_PAST = 'https://json.commudle.com/api/v2/events/public/index_by_community?when=past&community_id=8&page=1&count=2';

function generatedCover(box) {
  box.className = 'past-img past-gen';
  box.innerHTML = '<span class="past-gen-logo"></span>';
}

// Fills the cards already in the page, so if Commudle is down they keep their static content
fetch(COMMUDLE_PAST)
  .then(r => r.json())
  .then(({ data }) => {
    const cards = document.querySelectorAll('.past-card');
    data.values.slice(0, cards.length).forEach((ev, i) => {
      const card = cards[i];
      const box = card.querySelector('.past-img');
      const img = box.querySelector('img');
      const photo = EVENT_PHOTOS[ev.slug];
      card.href = `https://www.commudle.com/communities/${ev.kommunity_slug}/events/${ev.slug}`;
      card.target = '_blank';
      card.rel = 'noopener';
      if (photo) {
        img.onerror = () => generatedCover(box);
        img.src = photo.img;
        img.alt = photo.alt;
      } else {
        generatedCover(box);
      }
      card.querySelector('.past-date').textContent =
        new Date(ev.start_time).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
      card.querySelector('.past-body strong').textContent = ev.name;
    });
  })
  .catch(() => {});


/* ─── REVEALS ─── */

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    // already scrolled past (a reload halfway down): show it without animating
    if (!e.isIntersecting && e.boundingClientRect.bottom > 0) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  });
}, { threshold: .25, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('[data-reveal]').forEach((el, i) => {
  el.style.setProperty('--d', (i % 4) * 70 + 'ms');
  io.observe(el);
});

/* Everything else animates in once with the Web Animations API. Nothing stays on the
   element afterwards, so a reveal never fights its own hover transitions. Siblings that
   come into view together follow each other by `gap` ms. */
const EASE_OUT = 'cubic-bezier(.16,1,.3,1)';
const MOTIONS = {
  rise:  { keyframes: [{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'none' }], duration: 900 },
  fade:  { keyframes: [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], duration: 1000 },
  slide: { keyframes: [{ opacity: 0, transform: 'translateX(64px)' }, { opacity: 1, transform: 'none' }], duration: 1000 },
  pop:   { keyframes: [{ opacity: 0, transform: 'translateY(10px) scale(.92)' }, { opacity: 1, transform: 'none' }], duration: 600 },
  // the photo opens out from a slightly smaller rounded window and settles from a gentle zoom
  photo: el => {
    const r = getComputedStyle(el).borderTopLeftRadius;
    return { keyframes: [
      { clipPath: `inset(7% 7% 7% 7% round ${r})`, transform: 'scale(1.06)' },
      { clipPath: `inset(0 0 0 0 round ${r})`,     transform: 'none' }
    ], duration: 1300 };
  },
  // a gold underline drawing itself left to right under the emphasised words
  underline: { keyframes: [{ backgroundSize: '0% .12em' }, { backgroundSize: '100% .12em' }], duration: 900, delay: 350 }
};

const REVEALS = [
  ['.stats .h2, .about-intro, .gallery-head, .events .h2, .partner .h2, .switch, .partner-cta, .speak-head, .speak-foot, .vol-body > .h2, .vol-body > .lede, .vol-body > .btn-navy, .join-inner > *', 'rise', 90],
  ['.about .text-link, .past .text-link', 'rise'],
  ['.speakers-from-title, .marquee', 'fade', 120],
  ['.formats .format', 'rise', 90],
  // the strip scrolls sideways, so its off-screen photos would never intersect: reveal them with the strip
  ['.strip', 'slide', 80, true],
  ['.vol-img, .pane-sponsor .pane-img', 'photo'],
  ['.vol-roles li', 'pop', 45],
  ['.speak .h2 em, .join-title em', 'underline'],
  ['.footer-brand, .footer-cols > div', 'fade', 90]
];

function play(el, delay) {
  if (el._kids) { [...el.children].forEach((kid, i) => play(kid, delay + i * el._gap)); return; }
  const m = typeof el._motion === 'function' ? el._motion(el) : el._motion;
  el.animate(m.keyframes, { duration: m.duration, delay: delay + (m.delay || 0), easing: EASE_OUT, fill: 'backwards' });
  el.classList.remove('pre-reveal');
  el.style.backgroundSize = '';
}

const motionIO = new IntersectionObserver(entries => {
  const queued = new Map();   // parent -> how many siblings already started in this batch
  entries.forEach(e => {
    const el = e.target;
    if (!e.isIntersecting) {
      if (e.boundingClientRect.bottom <= 0) {
        (el._kids ? [...el.children] : [el]).forEach(x => { x.classList.remove('pre-reveal'); x.style.backgroundSize = ''; });
        motionIO.unobserve(el);
      }
      return;
    }
    const n = queued.get(el.parentElement) || 0;
    queued.set(el.parentElement, n + 1);
    play(el, n * el._gap);
    motionIO.unobserve(el);
  });
}, { threshold: .2, rootMargin: '0px 0px -6% 0px' });

if (!reduceMotion.matches) {
  REVEALS.forEach(([sel, kind, gap = 0, kids = false]) => document.querySelectorAll(sel).forEach(el => {
    el._gap = gap;
    el._kids = kids;
    (kids ? [...el.children] : [el]).forEach(x => {
      x._motion = MOTIONS[kind];
      if (kind === 'underline') x.style.backgroundSize = '0% .12em';
      else x.classList.add('pre-reveal');
    });
    motionIO.observe(el);
  }));
}

/* numbers count up the first time they come into view; the text already holds the final value */
function countUp(el) {
  const m = el.textContent.match(/^(\d+)(.*)$/);
  if (!m || reduceMotion.matches) return;
  const end = +m[1], rest = m[2], t0 = performance.now();
  (function tick(now) {
    const t = Math.min(1, (now - t0) / 1400);
    el.textContent = Math.round(end * (1 - Math.pow(1 - t, 4))) + rest;
    if (t < 1) requestAnimationFrame(tick);
  })(t0);
}
const countIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  countUp(e.target);
  countIO.unobserve(e.target);
}), { threshold: 1 });
document.querySelectorAll('#meetup-total, .stat-pair dd').forEach(el => countIO.observe(el));


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
  for (const [year, months] of Object.entries(MEETUP_HISTORY)) {
    [...months].forEach((c, m) => {
      const future = +year > now.getFullYear() || (+year === now.getFullYear() && m > now.getMonth());
      const kind = !future && KIND[c];
      const cls = future ? 'future' : kind ? kind[0] : '';
      const label = `${MONTHS[m]} ${year}: ${future ? 'coming up' : kind ? kind[1] : 'no meetup'}`;
      html += `<span class="cell ${cls}" data-label="${label}"></span>`;
    });
  }
  graph.innerHTML = html;
  graph.addEventListener('transitionend', e => {
    if (e.target === graph) graph.closest('.graph-card').classList.add('swept');
  });

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


/* ─── MASCOT SNAKE ───
   The body is one stroked path, drawn up to a length; the head and tongue ride on its tip,
   turned to follow the path. The head shapes are cut from the mascot SVG, which faces
   left with its body centred on y=199, so they're mirrored to face +x with the neck at 0,0. */

const SNAKE_GREEN = '#9BB693';
const SNAKE_UNITS = 30.8;   // body thickness in the mascot SVG's units
const SNAKE_HEAD = 'M105.5 183.6C103 183.6 100.7 183 98.6 181.7C86.7 173.9 74.5 169.4 60.1 169.8C54.6 170 50.5 169.9 44.9 171.4C36.7 173.6 29.7 178.1 25.4 185.6C24.7 186.8 24 188.1 23.3 189.4L22.2 194.3C23.8 196.2 24.7 199.6 26.3 202C38.9 219.8 63.6 214 82.2 215C84.1 215.1 86 214.9 87.9 215L105.5 214.4Z';
const SNAKE_TONGUE = 'M23.3 189.4C20 189.5 17.8 188.8 14.5 189C11.6 186.4 6.8 182.9 2.6 183.6L2.2 184.1C2.6 185.8 7.1 189.2 8.6 190.2C5 191.6 3.1 192.7 0 194.9C1.6 194.9 7.1 195.3 8.1 195C13.3 193.7 16.4 191.4 22.2 194.3Z';
const SNOUT = 82.5;         // neck to nose, without the tongue

// the nose stops just inside the right edge of the screen
const noseEnd = W => W - 16;

function makeSnake(svg, shape) {
  svg.innerHTML = `<path class="snake-body" fill="none" stroke="${SNAKE_GREEN}" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="snake-head"><g transform="translate(105.5 -199) scale(-1 1)" fill="${SNAKE_GREEN}">
      <path class="snake-tongue" d="${SNAKE_TONGUE}"/><path d="${SNAKE_HEAD}"/>
      <circle cx="46.3" cy="190.6" r="4.4" fill="#1b1b1b"/>
    </g></g>`;
  const s = { svg, shape, body: svg.firstElementChild, head: svg.lastElementChild, p: 0, shown: -1 };
  s.layout = () => {
    const W = svg.clientWidth;
    if (!W) return;
    const { d, h, t } = shape(W);
    svg.setAttribute('viewBox', `0 0 ${W} ${h}`);
    svg.setAttribute('height', h);
    s.body.setAttribute('d', d);
    s.body.setAttribute('stroke-width', t);
    s.scale = t / SNAKE_UNITS;
    s.total = s.body.getTotalLength();
    s.shown = -1;
    s.draw(s.p);
  };
  s.draw = p => {
    if (!s.total || p === s.shown) return;
    s.shown = p;
    const len = p * s.total;
    s.body.setAttribute('stroke-dasharray', `${len} ${s.total + 1}`);
    const a = s.body.getPointAtLength(Math.max(0, len - 1)), b = s.body.getPointAtLength(Math.min(s.total, len + 1));
    const tip = s.body.getPointAtLength(len);
    const deg = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
    s.head.setAttribute('transform', `translate(${tip.x} ${tip.y}) rotate(${deg}) scale(${s.scale})`);
    svg.classList.toggle('arrived', p >= 1);
  };
  s.layout();
  return s;
}

// comes in from the left edge, throws one loop, then runs straight on to the right edge
const loopSnake = makeSnake(document.getElementById('snake-loop'), W => {
  const small = W < 700;
  const t = small ? 16 : 24, R = small ? 30 : 50;
  const y = 2.2 * R + t, s = t / SNAKE_UNITS;
  const c = Math.round(W * (small ? .42 : .36));
  const start = -SNOUT * s - t, end = noseEnd(W) - SNOUT * s;
  const d = `M${start} ${y}L${c - 1.4 * R} ${y}`
    + `C${c - .2 * R} ${y} ${c + 1.1 * R} ${y - .2 * R} ${c + 1.1 * R} ${y - 1.1 * R}`
    + `C${c + 1.1 * R} ${y - 2 * R} ${c - 1.1 * R} ${y - 2 * R} ${c - 1.1 * R} ${y - 1.1 * R}`
    + `C${c - 1.1 * R} ${y - .2 * R} ${c + .2 * R} ${y} ${c + 1.4 * R} ${y}`
    + `L${end} ${y}`;
  // the belly rests on the bottom edge of the svg
  return { d, h: y + t / 2, t };
});

// a small straight one lying on the very bottom edge of the footer
const footerSnake = makeSnake(document.getElementById('snake-footer'), W => {
  // room above the body for the head, which bulges ~30 mascot units over it
  const t = 12, s = t / SNAKE_UNITS, y = Math.ceil(30 * s + t / 2);
  return { d: `M${-SNOUT * s - t} ${y}L${noseEnd(W) - SNOUT * s} ${y}`, h: y + t / 2, t };
});

// the loop snake follows the scroll (in the main frame loop): nose enters as the band
// comes up from the bottom of the screen and arrives a little above the middle, gliding behind the scroll
let loopTarget = 0;
function renderSnake(dt) {
  if (reduceMotion.matches) { loopSnake.draw(1); return; }
  const r = loopSnake.svg.getBoundingClientRect();
  if (r.top > innerHeight && loopSnake.p === 0) return;
  loopTarget = clamp((innerHeight - r.top) / (innerHeight * .6), 0, 1);
  loopSnake.p += (loopTarget - loopSnake.p) * Math.min(1, dt * 4);
  if (Math.abs(loopTarget - loopSnake.p) < .001) loopSnake.p = loopTarget;
  loopSnake.draw(loopSnake.p);
}

// the footer is the end of the page and can't be scrolled past, so its snake runs on a timer
if (reduceMotion.matches) footerSnake.draw(1);
else new IntersectionObserver((entries, obs) => {
  if (!entries[0].isIntersecting) return;
  obs.disconnect();
  const t0 = performance.now();
  (function tick(now) {
    const t = Math.min(1, (now - t0) / 1100);
    footerSnake.p = 1 - Math.pow(1 - t, 3);
    footerSnake.draw(footerSnake.p);
    if (t < 1) requestAnimationFrame(tick);
  })(t0);
}, { threshold: .5 }).observe(footerSnake.svg);

let snakeW = innerWidth;
addEventListener('resize', () => {
  if (innerWidth === snakeW) return;
  snakeW = innerWidth;
  loopSnake.layout();
  footerSnake.layout();
});
addEventListener('load', () => { loopSnake.layout(); footerSnake.layout(); });
