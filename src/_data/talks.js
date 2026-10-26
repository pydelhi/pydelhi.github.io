// How many talks have been given at PyDelhi: issues labelled "delivered" in github.com/pydelhi/talks,
// counted at build time (About shows it). Like the Commudle data, the last good count is kept in
// lib/talks-fallback.json for when GitHub can't be reached.
import fs from 'node:fs';
import Fetch from '@11ty/eleventy-fetch';

// per_page=1: the search response carries the total, so one small request is enough
const SEARCH = 'https://api.github.com/search/issues?q=repo:pydelhi/talks+label:delivered&per_page=1';
const FALLBACK = 'lib/talks-fallback.json';

async function download() {
  // the Actions build passes GITHUB_TOKEN, which lifts the unauthenticated rate limit
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await Fetch(SEARCH, { duration: '1d', type: 'json', fetchOptions: { headers } });
  const talks = { count: res.total_count };
  const raw = JSON.stringify(talks, null, 2) + '\n';
  if (!fs.existsSync(FALLBACK) || fs.readFileSync(FALLBACK, 'utf8') !== raw) fs.writeFileSync(FALLBACK, raw);
  return talks;
}

export default async function () {
  try {
    return await download();
  } catch (err) {
    console.warn(`[talks] fetch failed (${err.message}), using talks-fallback.json`);
    return JSON.parse(fs.readFileSync(FALLBACK, 'utf8'));
  }
}
