// each photo's <img> is built into a <template> in its bento cell, so it gets a resized srcset
// m = start position on phones, as a fraction of the screen: like Portrait, the cards sit mostly off the left
// and right edges beside the text, only a third or so showing, so they frame the headline without covering it
const PHOTOS = [
  { cid:'bento-cell-0', lb:"Talks",   spct:.04,  srpct:null, sy:.20, sw:150, sh:185, rot:-7, m:{ x:-.11, y:.265, w:100, h:124 } },
  { cid:'bento-cell-1', lb:'Meetups', spct:.10,  srpct:null, sy:.55, sw:210, sh:150, rot: 6, m:{ x:.76,  y:.07, w:136, h:100 } },
  { cid:'bento-cell-2', lb:'Workshops', spct:null, srpct:.04,  sy:.15, sw:158, sh:195, rot: 9, m:{ x:-.12, y:.72, w:104, h:128 } },
  { cid:'bento-cell-3', lb:'Birds of a Feather', spct:null, srpct:.08,  sy:.55, sw:290, sh:210, rot:-6, m:{ x:.74,  y:.75, w:150, h:110 } },
];

// Logos live in src/assets/logos and are drawn in navy through a CSS mask, so any colour file works.
// `r` is the file's width / height, used to size every logo to a similar visual weight.
// Most files are the full official logo (symbol + wordmark), so no extra text is added;
// `text` is only for a bare symbol that needs the name beside it.
// Speakers: employers named in the bios of delivered talks (github.com/pydelhi/talks).
const SPEAKER_COMPANIES = [
  { name:'Adobe', file:'adobe.svg', r:3.96, url:'https://www.adobe.com/' },
  { name:'Microsoft', file:'microsoft.svg', r:4.69, url:'https://www.microsoft.com/' },
  { name:'Red Hat', file:'redhat.svg', r:4.23, url:'https://www.redhat.com/' },
  { name:'EPAM Systems', file:'epam.png', r:2.84, url:'https://www.epam.com/' },
  { name:'Thoughtworks', file:'thoughtworks.png', r:6.15, url:'https://www.thoughtworks.com/' },
  { name:'Accenture', file:'accenture.svg', r:3.80, url:'https://www.accenture.com/' },
  { name:'SingleStore', file:'singlestore.svg', r:4.83, url:'https://www.singlestore.com/' },
  { name:'Tata 1mg', file:'tata1mg.svg', r:4.50, url:'https://www.1mg.com/' },
  { name:'NEC', file:'nec.svg', r:3.68, url:'https://www.nec.com/' },
  { name:'Nagarro', file:'nagarro.svg', r:4.03, url:'https://www.nagarro.com/' },
  { name:'Cars24', file:'cars24.svg', r:3.57, url:'https://www.cars24.com/' },
  { name:'L&T Technology Services', file:'ltts.svg', r:6.67, url:'https://www.ltts.com/' },
  { name:'Unstop', file:'unstop.svg', r:2.51, url:'https://unstop.com/' },
  { name:'Appinventiv', file:'appinventiv.svg', r:4.58, url:'https://appinventiv.com/' },
  { name:'Essentia.dev', file:'essentia.svg', r:5.40, url:'https://essentia.dev/' },
  { name:'GlobalLogic', file:'globallogic.png', r:5.65, url:'https://www.globallogic.com/' },
  { name:'Quansight', file:'quansight.png', r:3.17, url:'https://www.quansight.com/' },
  { name:'Juniper Square', file:'junipersquare.svg', r:7.72, url:'https://www.junipersquare.com/' },
  { name:'FOSSASIA', file:'fossasia.svg', r:2.35, url:'https://fossasia.org/' },
];
// Sponsors and venues: hosts on meetup.com/pydelhi and Commudle, plus sponsors named in blog recaps.
const SPONSORS = [
  { name:'Microsoft', file:'microsoft.svg', r:4.69, url:'https://www.microsoft.com/' },
  { name:'Zomato', file:'zomato.png', r:4.68, url:'https://www.zomato.com/' },
  { name:'Adobe', file:'adobe.svg', r:3.96, url:'https://www.adobe.com/' },
  { name:'Nykaa', file:'nykaa.svg', r:2.99, url:'https://www.nykaa.com/' },
  { name:'Thoughtworks', file:'thoughtworks.png', r:6.15, url:'https://www.thoughtworks.com/' },
  { name:'Gojek', file:'gojek.svg', r:3.50, url:'https://www.gojek.com/en-id' },
  { name:'EPAM Systems', file:'epam.png', r:2.84, url:'https://www.epam.com/' },
  { name:'Tata 1mg', file:'tata1mg.svg', r:4.50, url:'https://www.1mg.com/' },
  { name:'Hike', file:'hike.svg', r:2.62 },
  { name:'HT Media', file:'htmedia.svg', r:4.28, url:'https://www.htmedia.in/' },
  { name:'GitHub', file:'github-mark.svg', r:1, text:'GitHub', url:'https://github.com/' },
  { name:'SingleStore', file:'singlestore.svg', r:4.83, url:'https://www.singlestore.com/' },
  { name:'WeWork', file:'wework.svg', r:4.70, url:'https://www.wework.co.in/' },
  { name:'91springboard', file:'91springboard.png', r:4.20, url:'https://www.91springboard.com/' },
  { name:'Appinventiv', file:'appinventiv.svg', r:4.58, url:'https://appinventiv.com/' },
  { name:'Unstop', file:'unstop.svg', r:2.51, url:'https://unstop.com/' },
  { name:'Essentia.dev', file:'essentia.svg', r:5.40, url:'https://essentia.dev/' },
  { name:'Innovaccer', file:'innovaccer.svg', r:1.08, text:'Innovaccer', url:'https://innovaccer.com/' },
  { name:'Grofers', file:'grofers.svg', r:3.23, url:'https://blinkit.com/' },
  { name:'Srijan Technologies', file:'srijan.svg', r:2.96, url:'https://www.materialplus.io/' },
  { name:'SocialCops', file:'socialcops.svg', r:4.30, url:'https://socialcops.com/' },
  { name:'HealthKart', file:'healthkart.png', r:3.98, url:'https://www.healthkart.com/' },
  { name:'LambdaTest', file:'lambdatest.svg', r:5.65, url:'https://www.testmuai.com/' },
  { name:'Fueled', file:'fueled.png', r:5.33, url:'https://fueled.com/' },
  { name:'Coredge', file:'coredge.png', r:4.22, url:'https://coredge.io/' },
  { name:'Knowlarity', file:'knowlarity.png', r:4.67, url:'https://www.knowlarity.com/' },
  { name:'E2E Networks', file:'e2e.png', r:1.47, text:'E2E Networks', url:'https://www.e2enetworks.com/' },
];

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

// only the home page has the hero
const photoEls = gridLayer ? PHOTOS.map(p => {
  const cell = document.getElementById(p.cid);
  const el = document.createElement('div');
  el.className = 'cell-photo';
  el.innerHTML = `${cell.querySelector('template').innerHTML}<div class="photo-card-label">${p.lb}</div>`;
  cell.appendChild(el);
  return el;
}) : [];

let L = null;

function measureHero() {
  photoEls.forEach(el => { el.style.transform = ''; el.style.removeProperty('--f'); });
  if (!gridLayer || reduceMotion.matches) { L = null; return; }

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
const joinPhotos = joinSection ? [...joinSection.querySelectorAll('[data-drift]')] : [];

function renderJoin() {
  if (!joinSection) return;
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
// images and fonts shift the layout as they load, which moves the cells. Outfit often arrives after
// 'load' on phones: the taller headline pushes the bento down, and photos measured before that start
// lower and fly straight through the title. So re-measure when the fonts are in, and whenever the
// headline block or the bento changes size (never on scroll: the address bar doesn't resize them)
addEventListener('load', relayout);
document.fonts?.ready.then(relayout);
if (gridLayer) {
  const heroSizes = new ResizeObserver(relayout);
  [heroText, gridLayer].forEach(el => el && heroSizes.observe(el));
}

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

function logoEl({ name, file, r, text, url }) {
  // wide logos get shorter and tall ones taller, so they all read at about the same size
  const h = text ? 26 : Math.round(clamp(28 * Math.pow(4 / r, .45), 18, 38));
  const mark = `<span class="logo-img" style="--src:url('/assets/logos/${file}');width:${Math.round(h * r)}px;height:${h}px"></span>`;
  const inner = text ? `${mark}<span aria-hidden="true">${text}</span>` : mark;
  // a company with a site links to it (Hike shut down, so it stays a plain logo)
  return url
    ? `<a class="logo" href="${url}" target="_blank" rel="noopener" aria-label="${name}">${inner}</a>`
    : `<span class="logo" role="img" aria-label="${name}">${inner}</span>`;
}

function fillMarquee(id, list) {
  const row = list.map(logoEl).join('');
  const track = document.getElementById(id);
  if (!track) return;
  // track holds the list twice so the loop is seamless; the copy is hidden from screen readers
  // (and its links skipped by the keyboard)
  track.innerHTML = row + row
    .replace(/<span class="logo" role="img" aria-label="[^"]*"/g, '<span class="logo" aria-hidden="true"')
    .replace(/ aria-label="[^"]*">/g, ' aria-hidden="true" tabindex="-1">');
  // keep the same scroll speed however many logos there are
  track.style.animationDuration = list.length * 3.2 + 's';
}
fillMarquee('speaker-logos', SPEAKER_COMPANIES);
fillMarquee('sponsor-logos', SPONSORS);


/* ─── FORMATS: hovering a row dims the rest and shows its photo near the cursor ─── */

const formatList = document.getElementById('formats');
const preview = document.getElementById('format-preview');
const previewImgs = [...(formatList?.querySelectorAll('.format') ?? [])].map(li => {
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

formatList?.querySelectorAll('.format').forEach(li => {
  li.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { placePreview(li); setActiveFormat(li); } });
  li.addEventListener('focus', () => { placePreview(li); setActiveFormat(li); });
  li.addEventListener('blur', () => setActiveFormat(null));
});
formatList?.addEventListener('pointerleave', () => setActiveFormat(null));


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
  if (el.closest('[data-reveal-group]')) return;
  el.style.setProperty('--d', (i % 4) * 70 + 'ms');
  io.observe(el);
});

/* A group (the Community bento) reveals all its tiles at once when its top comes into view, in source order,
   so a tall tile never waits on its own threshold */
const groupIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting && e.boundingClientRect.bottom > 0) return;
  e.target.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in'));
  groupIO.unobserve(e.target);
}), { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('[data-reveal-group]').forEach(g => {
  g.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.setProperty('--d', i * 50 + 'ms'));
  groupIO.observe(g);
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
   The cells are built into the page (src/_data/meetupHistory.js); this adds the sweep and tooltip */

(function graphHover() {
  const graph = document.getElementById('graph');
  if (!graph) return;
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
strip?.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse') return;
  drag = { x: e.clientX, left: strip.scrollLeft, moved: false };
  strip.setPointerCapture(e.pointerId);
});
strip?.addEventListener('pointermove', e => {
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
strip?.addEventListener('pointerup', endDrag);
strip?.addEventListener('pointercancel', endDrag);


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
  // tail: how much of the body's start is already gone, for a snake that slides on along its path
  const s = { svg, shape, body: svg.firstElementChild, head: svg.lastElementChild, p: 0, shown: -1, tail: 0, ext: 0 };
  s.layout = () => {
    const W = svg.clientWidth;
    if (!W) return;
    const { d, h, t, ext = 0 } = shape(W);
    s.ext = ext;
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
    const len = p * s.total, tail = Math.min(s.tail, len);
    s.body.setAttribute('stroke-dasharray', `${len - tail} ${s.total + 1}`);
    s.body.setAttribute('stroke-dashoffset', -tail);
    const a = s.body.getPointAtLength(Math.max(0, len - 1)), b = s.body.getPointAtLength(Math.min(s.total, len + 1));
    const tip = s.body.getPointAtLength(len);
    const deg = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
    s.head.setAttribute('transform', `translate(${tip.x} ${tip.y}) rotate(${deg}) scale(${s.scale})`);
    svg.classList.toggle('arrived', p >= 1);
    s.onDraw?.(len, tip);
  };
  s.layout();
  return s;
}

// comes in from the left edge, throws one loop, then runs straight on to the right edge
const loopSvg = document.getElementById('snake-loop');
const loopSnake = loopSvg && makeSnake(loopSvg, W => {
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
// A snake can only slither so fast: its speed follows the scroll but is capped, and eases in and out, so a
// flick of the wheel no longer whips the loop round in a blink. Slow scrolling still tracks it exactly.
const LOOP_MAX_SPEED = .9; // of the whole snake per second
let loopTarget = 0, loopVel = 0;
function renderSnake(dt) {
  renderRails(dt);
  if (!loopSnake) return;
  if (reduceMotion.matches) { loopSnake.draw(1); return; }
  const r = loopSnake.svg.getBoundingClientRect();
  if (r.top > innerHeight && loopSnake.p === 0) return;
  loopTarget = clamp((innerHeight - r.top) / (innerHeight * .6), 0, 1);
  const want = clamp((loopTarget - loopSnake.p) * 4, -LOOP_MAX_SPEED, LOOP_MAX_SPEED);
  loopVel += (want - loopVel) * Math.min(1, dt * 8);
  loopSnake.p = clamp(loopSnake.p + loopVel * dt, 0, 1);
  if (Math.abs(loopTarget - loopSnake.p) < .001 && Math.abs(loopVel) < .01) { loopSnake.p = loopTarget; loopVel = 0; }
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
  loopSnake?.layout();
  footerSnake.layout();
});
addEventListener('load', () => { loopSnake?.layout(); footerSnake.layout(); });


/* ─── PAGE SNAKES: the same mascot, posed per page ───
   The title snake drops in from the top of the screen, rounds an inner page's title, lede and
   buttons in a soft notch and rests heading up beside the title; scrolling slides it on, up and out.
   Its sides sit on the content edges, so the notch is the same width on every page; its depth comes
   from the header's actual text and buttons. Hidden on phones (no room beside the text). */

// an element's rendered text lines as boxes relative to `frame`, top to bottom, plus their union
function textLines(el, frame) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const f = frame.getBoundingClientRect();
  const lines = [];
  for (const r of range.getClientRects()) {
    if (r.width < 2) continue;
    const box = { left: r.left - f.left, right: r.right - f.left, top: r.top - f.top, bottom: r.bottom - f.top };
    const line = lines.find(l => Math.abs(l.top - box.top) < 8);
    if (line) { line.left = Math.min(line.left, box.left); line.right = Math.max(line.right, box.right); line.bottom = Math.max(line.bottom, box.bottom); }
    else lines.push(box);
  }
  lines.sort((a, b) => a.top - b.top);
  const all = {
    left: Math.min(...lines.map(l => l.left)), right: Math.max(...lines.map(l => l.right)),
    top: lines[0].top, bottom: lines.at(-1).bottom,
  };
  return { lines, all };
}

// grows a snake from nothing to full length once, easing out
function growSnake(snake, ms, delay = 0) {
  if (reduceMotion.matches) { snake.p = 1; snake.draw(1); return; }
  setTimeout(() => {
    const t0 = performance.now();
    (function tick(now) {
      const t = Math.min(1, (now - t0) / ms);
      snake.p = 1 - Math.pow(1 - t, 3);
      snake.draw(snake.p);
      if (t < 1) requestAnimationFrame(tick);
    })(t0);
  }, delay);
}

const pageSnakes = [];

const titleSvg = document.getElementById('snake-title');
if (titleSvg) {
  const head = titleSvg.parentElement;
  const title = head.querySelector('.page-title');
  const lede = head.querySelector('.lede');
  const actions = head.querySelector('.page-actions');
  const titleSnake = makeSnake(titleSvg, W => {
    const t = 14;
    const f = head.getBoundingClientRect();
    const top = textLines(title, head).all;
    const bottoms = [top.bottom];
    if (lede) bottoms.push(textLines(lede, head).all.bottom);
    if (actions) bottoms.push(actions.getBoundingClientRect().bottom - f.top);
    // the content width every section uses, min(1120px, 100vw - 32px)
    const xl = (W - Math.min(1120, W - 32)) / 2 + t / 2, xr = W - xl;
    const yb = Math.max(...bottoms) + 40;
    const R = Math.min(96, (yb - top.top) / 2);
    const rest = top.top + 12;
    // after resting, a straight run up past the top: long enough for the whole body to leave
    const ext = rest + (yb - rest) * 2 + (xr - xl) + 2 * t;
    const d = `M${xl} ${-t}L${xl} ${yb - R}`
      + `C${xl} ${yb - R * .45} ${xl + R * .45} ${yb} ${xl + R} ${yb}`
      + `L${xr - R} ${yb}`
      + `C${xr - R * .45} ${yb} ${xr} ${yb - R * .45} ${xr} ${yb - R}`
      + `L${xr} ${rest}L${xr} ${rest - ext}`;
    return { d, h: head.clientHeight, t, ext };
  });
  // grow: drawn in on load (0 to 1); away: slid out by scrolling (0 to 1)
  let grow = 0, away = 0;
  const pose = () => {
    if (!titleSnake.total) return; // hidden under 700px, so there's no path to measure
    const rest = titleSnake.total - titleSnake.ext;
    titleSnake.tail = away * titleSnake.ext;
    titleSnake.p = (grow * rest + away * titleSnake.ext) / titleSnake.total;
    titleSnake.draw(titleSnake.p);
  };
  const leave = () => {
    if (reduceMotion.matches) return;
    away = clamp((scrollY - 24) / (head.offsetHeight * .6), 0, 1);
    pose();
  };
  addEventListener('scroll', leave, { passive: true });
  pageSnakes.push({ layout() { titleSnake.layout(); pose(); } });
  (document.fonts?.ready || Promise.resolve()).then(() => {
    titleSnake.layout();
    leave();
    growSnake({ draw: p => { grow = p; pose(); } }, 1600, 250);
  });
}

let pageSnakeW = innerWidth;
addEventListener('resize', () => {
  if (innerWidth === pageSnakeW) return;
  pageSnakeW = innerWidth;
  pageSnakes.forEach(s => s.layout());
});


/* Rail snakes thread through a list of stops ([data-rail-stop]) inside a [data-rail] block and grow
   as you scroll, lighting each stop as the head passes it. data-rail="x" runs them left to right on
   desktop (the Speak board); otherwise, and on every phone, they run downwards. */
function railSnake(box) {
  const svg = box.querySelector('.rail-snake');
  const stops = [...box.querySelectorAll('[data-rail-stop]')];
  const rider = box.querySelector('[data-rail-rider]');
  const rail = { box, stops, at: [], horizontal: false };
  rail.snake = makeSnake(svg, W => {
    const small = W < 700, t = small ? 10 : 14, s = t / SNAKE_UNITS;
    const b = box.getBoundingClientRect();
    const pts = stops.map(el => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top };
    });
    rail.horizontal = box.dataset.rail === 'x' && !compactView.matches;
    const amp = small ? 10 : 26;
    const segs = [];
    if (rail.horizontal) {
      segs.push(`M${-SNOUT * s - t} ${pts[0].y}L${pts[0].x} ${pts[0].y}`);
      pts.slice(1).forEach((q, i) => {
        const p = pts[i], dx = (q.x - p.x) / 2, k = i % 2 ? amp : -amp;
        segs.push(`C${p.x + dx} ${p.y + k} ${q.x - dx} ${q.y + k} ${q.x} ${q.y}`);
      });
      const last = pts.at(-1);
      segs.push(`L${Math.min(W - SNOUT * s - 8, last.x + 70)} ${last.y}`);
    } else {
      segs.push(`M${pts[0].x} ${Math.max(t, pts[0].y - 70)}L${pts[0].x} ${pts[0].y}`);
      pts.slice(1).forEach((q, i) => {
        const p = pts[i], dy = (q.y - p.y) / 2, k = i % 2 ? amp : -amp;
        segs.push(`C${p.x + k} ${p.y + dy} ${q.x + k} ${q.y - dy} ${q.x} ${q.y}`);
      });
      const last = pts.at(-1);
      segs.push(`L${last.x} ${last.y + 56}`);
    }
    // how far along the body each stop sits, so it can light up when the head passes
    const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.appendChild(probe);
    rail.at = pts.map((_, i) => { probe.setAttribute('d', segs.slice(0, i + 1).join('')); return probe.getTotalLength(); });
    probe.remove();
    return { d: segs.join(''), h: box.clientHeight, t };
  });
  rail.snake.onDraw = (len, tip) => {
    stops.forEach((el, i) => el.classList.toggle('reached', len >= rail.at[i] - 2));
    if (rider) rider.style.transform = `translate(${tip.x}px, ${tip.y}px)`;
  };
  return rail;
}

const rails = [...document.querySelectorAll('[data-rail]')].map(railSnake);
rails.forEach(r => { pageSnakes.push(r.snake); if (reduceMotion.matches) r.snake.draw(1); });
addEventListener('load', () => rails.forEach(r => r.snake.layout()));

function renderRails(dt) {
  if (reduceMotion.matches) return;
  for (const { box, snake, horizontal } of rails) {
    const r = box.getBoundingClientRect();
    if (r.top > innerHeight && snake.p === 0) continue;
    // a horizontal rail runs while the block crosses the lower half of the screen; a vertical one keeps its head at ~70% down
    const target = horizontal
      ? clamp((innerHeight * .9 - r.top) / (innerHeight * .55), 0, 1)
      : clamp((innerHeight * .7 - r.top) / r.height, 0, 1);
    snake.p += (target - snake.p) * Math.min(1, dt * 5);
    if (Math.abs(target - snake.p) < .001) snake.p = target;
    snake.draw(snake.p);
  }
}

/* Snakes inside fixed drawings (the Code of Conduct coil):
   any <path data-snake> becomes a body with the mascot's head on its tip, growing in once when seen.
   data-snake holds the body thickness in the drawing's own units. */
function pathSnake(path) {
  const t = +path.dataset.snake || 12;
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', SNAKE_GREEN);
  path.setAttribute('stroke-width', t);
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  const head = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  head.innerHTML = `<g transform="translate(105.5 -199) scale(-1 1)" fill="${SNAKE_GREEN}">
    <path class="snake-tongue" d="${SNAKE_TONGUE}"/><path d="${SNAKE_HEAD}"/><circle cx="46.3" cy="190.6" r="4.4" fill="#1b1b1b"/></g>`;
  path.after(head);
  const total = path.getTotalLength(), scale = t / SNAKE_UNITS, svg = path.ownerSVGElement;
  const draw = p => {
    const len = p * total;
    path.setAttribute('stroke-dasharray', `${len} ${total + 1}`);
    const a = path.getPointAtLength(Math.max(0, len - 1)), b = path.getPointAtLength(Math.min(total, len + 1));
    const tip = path.getPointAtLength(len);
    head.setAttribute('transform', `translate(${tip.x} ${tip.y}) rotate(${Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI}) scale(${scale})`);
    svg.classList.toggle('arrived', p >= 1);
  };
  draw(0);
  if (reduceMotion.matches) { draw(1); return; }
  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    growSnake({ draw }, +path.dataset.snakeMs || 1600, 200);
  }, { threshold: .35 }).observe(svg);
}
document.querySelectorAll('path[data-snake]').forEach(pathSnake);

/* Sponsor doors: the snake weaves through the three cards, under the first, over the middle one and under
   the last; left to right on desktop, downwards on phones. Two copies share one pose: one runs behind
   the cards, and the other runs in front, clipped to the middle card, and its pose keeps it on the photo, clear of the text. */
const doors = document.querySelector('[data-doors]');
if (doors) {
  const under = doors.querySelector('.doors-snake');
  const over = under.cloneNode();
  under.classList.add('doors-under');
  over.classList.add('doors-over');
  doors.appendChild(over);
  const cards = [...doors.querySelectorAll('.door')];
  // Where a card and its photo rest, relative to the snake's svg. Offsets ignore transforms, so this is right
  // even while the cards are still rising in on reveal; measuring them mid-rise and again once they'd settled
  // made the whole snake jump up just as its head passed the middle photo.
  const offsetIn = el => {
    let x = 0, y = 0;
    for (let n = el; n && n !== doors; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; }
    return { x, y };
  };
  const rest = c => {
    const dx = doors.getBoundingClientRect().left - under.getBoundingClientRect().left;
    const box = el => { const o = offsetIn(el); return { left: dx + o.x, right: dx + o.x + el.offsetWidth, top: o.y, bottom: o.y + el.offsetHeight }; };
    return { ...box(c), photo: box(c.querySelector('img')) };
  };
  const shape = W => {
    const small = W < 700, t = small ? 10 : 14, s = t / SNAKE_UNITS;
    const boxes = cards.map(rest);
    const h = doors.clientHeight;
    if (!compactView.matches) {
      // across the lower part of the photos, dipping and rising between the cards
      const amp = 34, y = boxes[0].photo.bottom - 34;
      const pts = boxes.map((b, i) => ({ x: (b.left + b.right) / 2, y: y + (i % 2 ? -amp : amp) }));
      pts.push({ x: noseEnd(W) - SNOUT * s, y });
      let d = `M${-SNOUT * s - t} ${y}`, p = { x: -SNOUT * s - t, y };
      for (const q of pts) {
        const dx = (q.x - p.x) / 2;
        d += `C${p.x + dx} ${p.y} ${q.x - dx} ${q.y} ${q.x} ${q.y}`;
        p = q;
      }
      return { d, h, t };
    }
    // phones: down the right side of the stacked cards, swaying in and out, head ending below the last
    const amp = 18, x = boxes[0].right - 56;
    const pts = boxes.map((b, i) => ({ x: x + (i % 2 ? amp : -amp), y: (b.top + b.bottom) / 2 }));
    pts.push({ x, y: h - SNOUT * s - 8 });
    let d = `M${x} ${-t}`, p = { x, y: -t };
    for (const q of pts) {
      const dy = (q.y - p.y) / 2;
      d += `C${p.x} ${p.y + dy} ${q.x} ${q.y - dy} ${q.x} ${q.y}`;
      p = q;
    }
    return { d, h, t };
  };
  const a = makeSnake(under, shape), b = makeSnake(over, shape);
  // desktop clips to the whole middle card, not just its photo: the snake dips a little below the photo's bottom
  // edge, and a photo-sized clip cut it off flat there; the pose stays above the card's text. On phones the
  // snake runs down through the card, so there it stays clipped to the photo.
  const clip = () => {
    const photoOnly = compactView.matches, box = rest(cards[1]), r = photoOnly ? box.photo : box;
    over.style.clipPath = `inset(${r.top}px ${over.clientWidth - r.right}px ${over.clientHeight - r.bottom}px ${r.left}px round ${photoOnly ? 18 : 28}px)`;
  };
  const both = { layout() { a.layout(); b.layout(); clip(); }, draw(p) { a.p = b.p = p; a.draw(p); b.draw(p); } };
  pageSnakes.push(both);
  addEventListener('load', () => both.layout());
  (document.fonts?.ready || Promise.resolve()).then(() => both.layout());
  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    both.layout();
    growSnake(both, 2200, 150);
  }, { threshold: .3 }).observe(doors);
}

/* Sponsor thank-you slide: past sponsors' logos, then the open spot */
const SLIDE_SPONSORS = ['Microsoft', 'Zomato', 'Adobe', 'Thoughtworks', 'Nykaa', 'Gojek', 'EPAM Systems', 'Tata 1mg', 'HT Media', 'GitHub', 'SingleStore'];
document.getElementById('thanks-logos')?.insertAdjacentHTML('afterbegin',
  SLIDE_SPONSORS.map(n => logoEl(SPONSORS.find(l => l.name === n))).join(''));

/* Blog shelves: a thin straight snake lies along each year's shelf and slides in once when it comes into view */
document.querySelectorAll('.shelf-snake').forEach(svg => {
  const snake = makeSnake(svg, W => {
    const t = W < 500 ? 9 : 11, s = t / SNAKE_UNITS, y = Math.ceil(30 * s + t / 2);
    return { d: `M${-SNOUT * s - t} ${y}L${W - SNOUT * s - 4} ${y}`, h: y + t / 2, t };
  });
  pageSnakes.push(snake);
  if (reduceMotion.matches) { snake.draw(1); return; }
  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    growSnake(snake, 1100);
  }, { threshold: .6 }).observe(svg);
});
