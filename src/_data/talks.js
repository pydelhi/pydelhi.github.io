// Talks given at PyDelhi: issues labelled "delivered" in github.com/pydelhi/talks, fetched at build time.
// Like the Commudle data, the last good response is kept in lib/talks-fallback.json for when GitHub can't be reached.
import fs from 'node:fs';
import Fetch from '@11ty/eleventy-fetch';

const SEARCH = 'https://api.github.com/search/issues?q=repo:pydelhi/talks+label:delivered&sort=created&order=desc&per_page=100&page=';
const FALLBACK = 'lib/talks-fallback.json';

async function download() {
  // the Actions build passes GITHUB_TOKEN, which lifts the unauthenticated rate limit
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const items = [];
  for (let page = 1; page <= 5; page++) {
    const res = await Fetch(SEARCH + page, { duration: '1d', type: 'json', fetchOptions: { headers } });
    items.push(...res.items);
    if (items.length >= res.total_count || !res.items.length) break;
  }
  const talks = items.map(i => ({
    title: i.title.replace(/^talk proposal\s*[-:]\s*/i, '').trim(),
    url: i.html_url,
    speaker: i.user.login,
    speakerUrl: i.user.html_url,
    date: i.closed_at || i.created_at,
  }));
  const raw = JSON.stringify(talks, null, 2) + '\n';
  if (!fs.existsSync(FALLBACK) || fs.readFileSync(FALLBACK, 'utf8') !== raw) fs.writeFileSync(FALLBACK, raw);
  return talks;
}

export default async function () {
  let talks;
  try {
    talks = await download();
  } catch (err) {
    console.warn(`[talks] fetch failed (${err.message}), using talks-fallback.json`);
    talks = JSON.parse(fs.readFileSync(FALLBACK, 'utf8'));
  }
  const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
  return talks
    .map(t => ({ ...t, monthYear: monthYear.format(new Date(t.date)) }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
