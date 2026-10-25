# PyDelhi website

The site for [PyDelhi](https://pydelhi.org), Delhi NCR's Python community. Built with [Eleventy](https://www.11ty.dev/) and published to GitHub Pages.

Read `STYLE_GUIDE.md` before changing the design.

## Run it locally

You need Node 20 or newer.

```bash
npm install
npm start
```

That serves the site at http://localhost:8080 and rebuilds when you save. `npm run build` writes the finished site to `_site/`.

## Publishing

Every push to `main` builds and deploys the site (`.github/workflows/deploy.yml`). It also rebuilds every morning at 08:00 IST, so new Commudle events appear without a commit. To rebuild by hand, open **Actions → Deploy to GitHub Pages → Run workflow**.

One-time setup on GitHub: **Settings → Pages → Source: GitHub Actions**, with pydelhi.org as the custom domain.

## Adding a meetup

Events come from [PyDelhi on Commudle](https://www.commudle.com/communities/pydelhi). Create the event there and the site picks it up on the next build: the hero card, the "Next up" ticket and `/events`. Nothing to edit here.

## Adding photos after a meetup

1. Find the event's slug: the last part of its Commudle URL, e.g. `pydelhi-3-15-the-next-python` in `commudle.com/communities/pydelhi/events/pydelhi-3-15-the-next-python`.
2. Make a folder `src/assets/events/<slug>/` and put the photos in it. Any size is fine; the build resizes them.
3. The card uses the file named `cover.jpg` (or `cover.png`, etc.). Without one, it uses the first file in alphabetical order.
4. Optional: describe the photo, or point the card at a blog recap, in `src/_data/eventExtras.json`:

   ```json
   {
     "events": {
       "pydelhi-3-15-the-next-python": {
         "alt": "Group photo from PyDelhi 3.15 at Essentia",
         "recap": "/blog/pydelhi-3-15"
       }
     },
     "archive": []
   }
   ```

5. Commit and push.

An event without photos gets a pastel blue cover with the PyDelhi wordmark.

### Meetups from before Commudle

Commudle only has events from 2025 on. Add older ones to `archive` in `src/_data/eventExtras.json`, and they show up at the bottom of `/events`:

```json
{ "slug": "pydelhi-meetup-2019-08", "name": "PyDelhi August Meetup", "date": "2019-08-17", "url": "https://www.meetup.com/pydelhi/events/..." }
```

Their photos go in `src/assets/events/<slug>/` the same way.

## Where things live

| Path | What |
|---|---|
| `src/index.njk`, `src/events.njk` | Pages |
| `src/_includes/` | Layout, ticket and event card |
| `src/styles.css`, `src/script.js` | All styles and behaviour |
| `src/assets/photos/` | Photos used around the home page |
| `src/assets/logos/` | Speaker company and sponsor logos (lists in `script.js`) |
| `src/_data/meetupHistory.js` | The meetup graph: pre-2025 months by hand, later ones from Commudle |
| `lib/commudle.js` | Fetches events from Commudle |
| `lib/commudle-fallback.json` | Last good Commudle response, used if Commudle is down. Commit it when it changes. |
