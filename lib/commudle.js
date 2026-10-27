// Events come from Commudle's public API at build time. A copy of the last good
// response lives in commudle-fallback.json, so a Commudle outage never blanks the site.
import fs from 'node:fs';
import path from 'node:path';
import Fetch from '@11ty/eleventy-fetch';

const API = 'https://json.commudle.com/api/v2/events/public/index_by_community?community_id=8&page=1&count=100&when=';
const FALLBACK = path.join(import.meta.dirname, 'commudle-fallback.json');
const TZ = 'Asia/Kolkata';
const PHOTO_DIR = 'src/assets/events';
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

const fmt = opts => new Intl.DateTimeFormat('en-GB', { timeZone: TZ, ...opts });
const monthYear = fmt({ month: 'long', year: 'numeric' });
const dayLong = fmt({ weekday: 'long', month: 'long', day: 'numeric' });
const parts = d => Object.fromEntries(
  fmt({ weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).formatToParts(d).map(p => [p.type, p.value])
);

// only the fields normalise() reads, so the snapshot changes when our events do, not when
// a co-hosting community's member count ticks up
const slim = ev => ({
  id: ev.id,
  name: ev.name,
  slug: ev.slug,
  kommunity_slug: ev.kommunity_slug,
  start_time: ev.start_time,
  end_time: ev.end_time,
  event_locations: (ev.event_locations || []).slice(0, 1).map(l => ({ name: l.name, map_link: l.map_link })),
  header_image: ev.header_image?.url ? { url: ev.header_image.url } : null,
  header_image_path: ev.header_image_path || null,
});

async function download() {
  const get = when => Fetch(API + when, { duration: '1h', type: 'json' }).then(r => r.data.values.map(slim));
  const [past, future] = await Promise.all([get('past'), get('future')]);
  const raw = JSON.stringify({ past, future }, null, 2) + '\n';
  if (!fs.existsSync(FALLBACK) || fs.readFileSync(FALLBACK, 'utf8') !== raw) fs.writeFileSync(FALLBACK, raw);
  return { past, future };
}

// Our own photos of the last two meetups, added by hand: src/assets/events/past-1.jpg is the most recent
// meetup, past-2.jpg the one before (any image type). Replace both after each meetup
function localPhoto(name) {
  if (!fs.existsSync(PHOTO_DIR)) return null;
  const file = fs.readdirSync(PHOTO_DIR).find(f => IMAGE.test(f) && f.replace(IMAGE, '') === name);
  return file ? path.join(PHOTO_DIR, file) : null;
}

function normalise(ev) {
  const start = new Date(ev.start_time);
  const p = parts(start);
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
    // the event's header banner on Commudle (downloaded and resized at build time); getEvents swaps in our own
    // photo for the last two meetups when there is one
    photo: ev.header_image?.url || ev.header_image_path || null,
    banner: true,
  };
}

let cached;
export function getEvents() {
  return cached ??= (async () => {
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
      .map(normalise);
    const past = all.filter(ev => ev.end <= now).sort((a, b) => b.start - a.start);
    past.slice(0, 2).forEach((ev, i) => {
      const own = localPhoto(`past-${i + 1}`);
      if (own) Object.assign(ev, { photo: own, banner: false });
    });
    return {
      upcoming: all.filter(ev => ev.end > now).sort((a, b) => a.start - b.start),
      past,
    };
  })();
}
