// Events come from Commudle's public API at build time. A copy of the last good
// response lives in commudle-fallback.json, so a Commudle outage never blanks the site.
import fs from 'node:fs';
import path from 'node:path';
import Fetch from '@11ty/eleventy-fetch';

const API = 'https://json.commudle.com/api/v2/events/public/index_by_community?community_id=8&page=1&count=100&when=';
const FALLBACK = path.join(import.meta.dirname, 'commudle-fallback.json');
const PHOTO_DIR = 'src/assets/events';
const EXTRAS = 'src/_data/eventExtras.json';
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;
const TZ = 'Asia/Kolkata';

const fmt = opts => new Intl.DateTimeFormat('en-GB', { timeZone: TZ, ...opts });
const monthYear = fmt({ month: 'long', year: 'numeric' });
const dayLong = fmt({ weekday: 'long', month: 'long', day: 'numeric' });
const parts = d => Object.fromEntries(
  fmt({ weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).formatToParts(d).map(p => [p.type, p.value])
);

async function download() {
  const get = when => Fetch(API + when, { duration: '1h', type: 'json' }).then(r => r.data.values);
  const [past, future] = await Promise.all([get('past'), get('future')]);
  const raw = JSON.stringify({ past, future }, null, 2) + '\n';
  if (!fs.existsSync(FALLBACK) || fs.readFileSync(FALLBACK, 'utf8') !== raw) fs.writeFileSync(FALLBACK, raw);
  return { past, future };
}

// The card photo for an event: src/assets/events/<slug>/cover.* or else the first image in that folder
export function findPhoto(slug) {
  const dir = path.join(PHOTO_DIR, slug);
  if (!slug || !fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter(f => IMAGE.test(f)).sort();
  const file = files.find(f => /^cover\./i.test(f)) || files[0];
  return file ? path.join(dir, file) : null;
}

function normalise(ev, extras) {
  const start = new Date(ev.start_time);
  const p = parts(start);
  const extra = extras[ev.slug] || {};
  const loc = ev.event_locations?.[0];
  return {
    name: ev.name,
    slug: ev.slug,
    url: `https://www.commudle.com/communities/${ev.kommunity_slug}/events/${ev.slug}`,
    start,
    end: new Date(ev.end_time || ev.start_time),
    year: +p.year,
    month: start.toLocaleString('en-US', { timeZone: TZ, month: 'numeric' }) - 1,
    monthYear: monthYear.format(start),
    dayLong: dayLong.format(start),
    stub: { dow: p.weekday.toUpperCase(), day: p.day, mon: p.month.toUpperCase(), label: `${p.weekday} ${p.day} ${p.month}` },
    venue: loc?.name || null,
    mapLink: loc?.map_link || null,
    photo: findPhoto(ev.slug),
    alt: extra.alt || `Group photo from ${ev.name}`,
    link: extra.recap || null,
  };
}

let cached;
export function getEvents() {
  return cached ??= (async () => {
    const extras = JSON.parse(fs.readFileSync(EXTRAS, 'utf8')).events;
    let data;
    try {
      data = await download();
    } catch (err) {
      console.warn(`[commudle] fetch failed (${err.message}), using commudle-fallback.json`);
      data = JSON.parse(fs.readFileSync(FALLBACK, 'utf8'));
    }
    // re-split by date, so an event from an old snapshot moves to "past" once it has ended
    const now = Date.now();
    const seen = new Set();
    const all = [...data.future, ...data.past]
      .filter(ev => !seen.has(ev.id) && seen.add(ev.id))
      .map(ev => normalise(ev, extras));
    return {
      upcoming: all.filter(ev => ev.end > now).sort((a, b) => a.start - b.start),
      past: all.filter(ev => ev.end <= now).sort((a, b) => b.start - a.start),
    };
  })();
}
