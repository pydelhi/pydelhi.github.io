# PyDelhi website

The site for [PyDelhi](https://pydelhi.org), Delhi NCR's Python community. Built with [Eleventy](https://www.11ty.dev/) and published to GitHub Pages.

Read `STYLE_GUIDE.md` before changing the design. To send a fix or an idea, see `CONTRIBUTING.md`.

## Run it locally

You need Node 20 or newer.

```bash
npm install
npm start
```

That serves the site at http://localhost:8080 and rebuilds when you save. `npm run build` writes the finished site to `_site/`.

## Publishing

Every push to `main` builds and deploys the site to pydelhi.org (`.github/workflows/deploy.yml`). Nothing rebuilds on a timer, so Commudle changes only show up after a build.

To rebuild without a commit: on GitHub, open **Actions → Deploy to GitHub Pages → Run workflow** (branch `main`) and wait a minute or two for the green tick.

One-time setup on GitHub: **Settings → Pages → Source: GitHub Actions**, with pydelhi.org as the custom domain.

## After you create a meetup on Commudle

Events come from [PyDelhi on Commudle](https://www.commudle.com/communities/pydelhi): the hero card, the "Next up" ticket, the past-event cards and the meetup graph all read from it. There's no events page on the site; "View all events" goes to Commudle.

1. Create and publish the event on Commudle.
2. Rebuild the site: **Actions → Deploy to GitHub Pages → Run workflow**.
3. Check pydelhi.org: the hero card and the ticket should show the new date and venue.

Rebuild again the day after the meetup, so it moves from "Next up" to the past-event cards (adding its photos below does that for you, since a commit rebuilds).

If a build can't reach Commudle it uses `lib/commudle-fallback.json`, the last good response, which every successful local build updates. Commit it when it changes.

## Adding photos after a meetup

The home page shows the last two meetups. Until one has a photo of its own, its card shows the event's banner from Commudle, fitted whole on white.

1. Name the photo of the latest meetup `past-1.jpg` and the one before it `past-2.jpg` (png and webp work too).
2. Add both to `src/assets/events/`, replacing last month's. On GitHub: open that folder, **Add file → Upload files**, and commit. Any size is fine; the build resizes them. The cards crop to 4:3, so keep faces away from the edges.

After the next meetup, the old `past-1` becomes the new `past-2`: rename or re-upload so each photo stays with its meetup.

## Writing a blog recap

Add a Markdown file to `src/blog/posts/`. The file name becomes the URL (`src/blog/posts/pydelhi-october-2026.md` → `/blog/pydelhi-october-2026/`).

```markdown
---
title: "PyDelhi October Meetup at Essentia"
date: 2026-10-03
author: "Your Name"
summary: "Redis and Kubernetes internals, and a full room."
cover: blog/october-2026-group.jpg
---

Write the recap in plain Markdown.

{% photo "blog/october-2026-talk.jpg", "A speaker explaining Redis persistence", "(max-width: 760px) 100vw, 720px", { loading: "lazy" } %}
```

Put photos in `src/assets/blog/`; `cover` is the card image on `/blog`.

## Writing a page

Pages like `/about` and `/speak` are Markdown files in `src/` (`src/about.md`). Copy one to start. The front matter sets the top of the page:

```markdown
---
layout: layouts/page.njk
title: About | PyDelhi            # browser tab
description: One sentence for search results.
permalink: /about/
heading: Delhi's Python community, <em>since 2011.</em>
lede: The paragraph under the title.
actions:                          # optional buttons under the lede
  - { label: "Join on Commudle", url: "https://www.commudle.com/communities/pydelhi", icon: "arrow-up-right" }
  - { label: "Read the Code of Conduct", url: "/coc/", class: "btn-line" }
join: true                        # optional "Save yourself a seat" section at the end (no inner page uses it now)
---
```

The body is Markdown plus these blocks, so every page gets the site's design without writing HTML:

```markdown
{% section "What we do", "Optional lede under the heading", "optional-anchor-id" %}

  {% tiles %}                     {# {% tiles 2 %} for two columns #}
  {% tile "calendar-dots", "Monthly meetups" %}
  Text in **Markdown**, with [links](/speak/).
  {% endtile %}
  {% tile "github-logo", "GitHub", "https://github.com/pydelhi", "Footnote" %}
  A tile with a link becomes one big link (so links inside its text are dropped).
  {% endtile %}
  {% endtiles %}

{% endsection %}

{% steps %}{% step "Open a proposal" %}Text{% endstep %} ... {% endsteps %}
{% timeline %}{% moment "2016", "PyDelhi Conf", "blog/photo.jpg", "Photo alt" %}Text{% endmoment %} ... {% endtimeline %}   {# the snake winds through the years #}
{% points %}{% point "Free, always" %}Text{% endpoint %} ... {% endpoints %}   {# short principles as tilted pastel notes #}
{% checklist %}
- **Bold first line.** Then the detail.
{% endchecklist %}
{% panel "green", "A title", "A lede" %} anything {% endpanel %}     {# "blue" or "green" #}
{% prose %} long-form text, like the Code of Conduct {% endprose %}
{% chips %}
- PyData Delhi
- Django India
{% endchips %}
{% buttons %}{% button "Propose a session", "https://...", "", "line" %}{% endbuttons %}   {# the arrow is picked from the link; pass an icon only for a platform logo #}
```

Give one section per page, the one over the page's centrepiece, the gold underline by putting its last words in `<em>` (`{% section "Pick your <em>channel.</em>" %}`). Leave it out of every other heading.

The core team and volunteer teams live in `src/_data/volunteerTeams.json`. For a core member, `role` is a word or two ("Talk reviews, remote help"), `photo` a square-ish face shot in `src/assets/team/` (`"team/daksh.jpg"`; without one the card shows initials) and `linkedin` their profile URL, which adds a LinkedIn button under the role. Core members also go in the `people` of each team they work in. Keep the core list, the teams and each team's names in alphabetical order.

Icons are [Phosphor](https://phosphoricons.com) names without the `ph-` prefix. Every page's `<head>` (title, description, canonical URL, share card) is filled from its front matter in `layouts/base.njk`, so a new page only needs `title` and `description`; a blog post's `summary` and `cover` are used for its card. Each page also has its own centrepiece, as an include: `proposal-board.njk` (Speak), `sponsor-doors.njk`, `sponsor-slide.njk` and `sponsor-perks.njk` (Sponsor), `channel-bento.njk` (Community, from `src/_data/channels.js`), `volunteer-roles.njk`, `core-team.njk` and `volunteer-teams.njk` (Volunteer, from `src/_data/volunteerRoles.json` and `src/_data/volunteerTeams.json`), `coc-summary.njk` and `coc-report.njk`. Supporting sections (not centrepieces, so their headings carry no `<em>`): `pick-format.njk` (Speak: the session formats as pastel cards with a length bar) and `event-kinds.njk` (About: the kinds of event as small tinted cards). Smaller pieces: `partner.njk` and `ruler.njk`. Links used across the site (WhatsApp, Telegram, YouTube...) live in `src/_data/site.js`; use them as `{{ site.whatsapp }}`.

## Updating the team, logos and links

- **Team:** `src/_data/volunteerTeams.json` (see above). Team photos go in `src/assets/team/`.
- **Past volunteers:** the names in the "With thanks" list on `/volunteer` are in `src/_data/pastVolunteers.json`, alphabetical. Ask before adding someone.
- **Ways to volunteer:** the role cards on `/volunteer` come from `src/_data/volunteerRoles.json`; every card opens `site.volunteerForm`.
- **Speaker company and sponsor logos:** add the file to `src/assets/logos/` (transparent background, any colour; the site draws it navy) and an entry to `SPEAKER_COMPANIES` or `SPONSORS` in `src/script.js`: `{ name, file, r, url }`, where `r` is the logo's width divided by its height and `url` the company's site. Add `text` only when the file is a bare symbol that needs the name beside it.
- **Links and numbers:** WhatsApp, Telegram, the volunteer form, GitHub Sponsors and the hand-set stats (speakers, members) are all in `src/_data/site.js`.

## Where things live

| Path | What |
|---|---|
| `src/index.njk`, `src/*.md` | Pages |
| `src/blog/posts/` | Blog recaps. Posts from the last two years sit on the year shelves; older ones move to the archive list on their own (collections in `eleventy.config.js`) |
| `lib/shortcodes.js` | The designed blocks used in Markdown pages |
| `src/_data/site.js` | Shared links and the hand-set stats |
| `src/_data/pastVolunteers.json` | The thank-you names on `/volunteer` |
| `src/_data/volunteerRoles.json`, `src/_data/volunteerTeams.json` | The ways to volunteer, the core team (name, role, photo) and the volunteer teams on `/volunteer` |
| `src/_data/channels.js` | The Community channel tiles |
| `src/assets/icons/` | Favicon, app icons and `og-default.jpg`, the 1200×630 card shown when a page is shared (blog posts use their `cover` instead) |
| `src/sitemap.njk`, `src/robots.njk`, `src/site.webmanifest.njk` | Generated `/sitemap.xml`, `/robots.txt` and `/site.webmanifest` |
| `lib/image.js` | The photo resizing used by `{% photo %}` |
| `src/_includes/` | Layout, ticket and event card |
| `src/styles.css`, `src/script.js` | All styles and behaviour |
| `src/assets/photos/` | Photos used around the home page |
| `src/assets/events/` | `past-1` and `past-2`, our photos of the last two meetups |
| `src/assets/team/` | Core team photos |
| `src/assets/brand/` | The PyDelhi wordmark and logo used in the nav, footer and hero |
| `src/assets/logos/` | Speaker company and sponsor logos (lists in `script.js`) |
| `src/_data/meetupHistory.js` | The meetup graph: pre-2025 months by hand, later ones from Commudle |
| `lib/commudle.js` | Fetches events from Commudle |
| `lib/commudle-fallback.json` | Last good Commudle response (only the fields the site reads), used if Commudle is down. Commit it when it changes. |
