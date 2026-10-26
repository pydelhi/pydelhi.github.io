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

Events come from [PyDelhi on Commudle](https://www.commudle.com/communities/pydelhi). Create the event there and the site picks it up on the next build: the hero card, the "Next up" ticket and the past-event cards. There's no events page on the site: "View all events" goes to Commudle. Nothing to edit here.

## Adding a photo after a meetup

The home page shows the last two meetups. Until an event has a photo of its own, its card shows the event's banner from Commudle, fitted whole on white.

1. Find the event's slug: the last part of its Commudle URL, e.g. `pydelhi-3-15-the-next-python` in `commudle.com/communities/pydelhi/events/pydelhi-3-15-the-next-python`.
2. Name the photo after it (`pydelhi-3-15-the-next-python.jpg`; png and webp work too) and add it to `src/assets/events/`. On GitHub: open that folder, **Add file → Upload files**, and commit. Any size is fine; the build resizes it. The card crops it to 4:3, so keep faces away from the edges.

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
{% buttons %}{% button "Propose a talk", "https://...", "arrow-up-right", "line" %}{% endbuttons %}
```

Give one section per page, the one over the page's centrepiece, the gold underline by putting its last words in `<em>` (`{% section "Pick your <em>channel.</em>" %}`). Leave it out of every other heading.

The core team and volunteer teams live in `src/_data/volunteerTeams.json`. For a core member, `role` is a word or two ("Talk reviews, remote help"), `photo` a square-ish face shot in `src/assets/team/` (`"team/daksh.jpg"`; without one the card shows initials) and `linkedin` their profile URL, which adds a LinkedIn button under the role. Core members also go in the `people` of each team they work in. Keep the core list, the teams and each team's names in alphabetical order.

Icons are [Phosphor](https://phosphoricons.com) names without the `ph-` prefix. Each page also has its own centrepiece, as an include: `proposal-board.njk` (Speak), `sponsor-doors.njk`, `sponsor-slide.njk` and `sponsor-perks.njk` (Sponsor), `channel-bento.njk` (Community, from `src/_data/channels.js`), `volunteer-roles.njk`, `core-team.njk` and `volunteer-teams.njk` (Volunteer, from `src/_data/volunteerRoles.json` and `src/_data/volunteerTeams.json`), `coc-summary.njk` and `coc-report.njk`. Supporting sections (not centrepieces, so their headings carry no `<em>`): `pick-format.njk` (Speak: lightning talk, talk and workshop as pastel cards with a length bar) and `event-kinds.njk` (About: the kinds of event as small tinted cards). Smaller pieces: `stats.njk` (meetup numbers), `talk-list.njk` (recent talks), `logos.njk` (logo marquees), `partner.njk` and `ruler.njk`. Links used across the site (WhatsApp, Telegram, YouTube...) live in `src/_data/site.js`; use them as `{{ site.whatsapp }}`.

## Where things live

| Path | What |
|---|---|
| `src/index.njk`, `src/*.md` | Pages |
| `src/blog/posts/` | Blog recaps |
| `lib/shortcodes.js` | The designed blocks used in Markdown pages |
| `src/_data/site.js` | Shared links and the hand-set stats |
| `src/_data/talks.js` | Delivered talks from github.com/pydelhi/talks (snapshot in `lib/talks-fallback.json`) |
| `src/_data/volunteerRoles.json`, `src/_data/volunteerTeams.json` | The ways to volunteer, the core team (name, role, photo) and the volunteer teams on `/volunteer` |
| `src/_data/channels.js` | The Community channel tiles |
| `lib/image.js` | The photo resizing used by `{% photo %}` |
| `src/_includes/` | Layout, ticket and event card |
| `src/styles.css`, `src/script.js` | All styles and behaviour |
| `src/assets/photos/` | Photos used around the home page |
| `src/assets/logos/` | Speaker company and sponsor logos (lists in `script.js`) |
| `src/_data/meetupHistory.js` | The meetup graph: pre-2025 months by hand, later ones from Commudle |
| `lib/commudle.js` | Fetches events from Commudle |
| `lib/commudle-fallback.json` | Last good Commudle response, used if Commudle is down. Commit it when it changes. |
