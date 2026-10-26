# PyDelhi Website: Style Guide & Working Notes

Hand this file to any new Claude Code session working on this repo. It captures the owner's design taste, the decisions already made, and the feedback given so far. Follow it over generic "good design" defaults.

## The project

- Built with **Eleventy** (11ty) and deployed to GitHub Pages at pydelhi.org by `.github/workflows/deploy.yml` (on push to `main`, daily at 08:00 IST, and by hand). No client framework: the HTML, CSS and JS are still hand-written.
- Source lives in `src/`: `_includes/layouts/base.njk` (head, nav, footer), `index.njk` (home), `_includes/ticket.njk` and `past-card.njk` (shared pieces), `styles.css`, `script.js`. Photos in `src/assets/photos/`, logos in `src/assets/logos/`.
- Pages: `/`, `/about`, `/speak`, `/sponsor`, `/community`, `/volunteer`, `/coc`, `/blog` and `/blog/<slug>/`. Old pydelhi.org URLs (`/coc.html`, `/talks/`, old blog posts) redirect to their new pages (`src/_data/redirects.js`). There's no events page: the owner had it deleted, and "View all events" on the home page goes to Commudle. The nav runs in the order a newcomer goes: About, Community, Speak, Volunteer, Sponsor, Blog (`site.nav`).
- Inner pages are Markdown files (`src/about.md` etc.) on `layouts/page.njk`: front matter sets `heading` (HTML, put the emphasised words in `<em>`), `lede`, `actions` (buttons) and `join: true` for the closing "Save yourself a seat" section, which no inner page uses now: the owner found it made no sense on Community, About and Volunteer, so it's on the home page only. The designed blocks are shortcodes from `lib/shortcodes.js` (section, tiles/tile, steps/step, timeline/moment, panel, prose, chips, buttons/button); the README shows how to use them. Speak also has a `pick-format.njk` section (the three formats you can propose, as pastel cards with the length big and a bar against a 90-minute line; lightning a light blue, talk pastel blue, workshop pastel green with dark green text, the owner's pick) and About an `event-kinds.njk` cards (one small card per kind of event, four on the first row and the rest centred, two across on phones; tinted by meaning: blue talk-led, yellow hands-on, green small groups and community. The owner found the earlier pill-and-line rows weird on desktop and the pills too big on phones), both supporting sections with no `<em>`. Reusable HTML pieces are includes: `stats.njk`, `talk-list.njk`, `logos.njk`, `partner.njk`, `ruler.njk`, `join.njk`, `volunteer-teams.njk`, `ticket.njk`, `past-card.njk`.
- Includes used inside Markdown must not contain blank lines: a blank line followed by indented HTML turns into a code block.
- Inner pages each get **one signature object built from real data**, like the home page's graph and ticket, and never repeat home-page sections (the owner called the first version "half assed" and repetitive): About is a snake timeline, Speak a four-stage board of how a talk gets made, with small hand-drawn examples rather than live data (the owner found the live GitHub proposals overcomplicated), Sponsor three photo cards for the ways in (Host / Feed / Fund, each in its own pastel) with the snake weaving under, over and under them, then a thank-you slide of real past sponsor logos with one open "Your logo" spot (no snake on it), and what sponsors get as a bento like the Community one: a big photo tile for the thank-you on stage, pastel tiles for the logo, the hiring slot and a talk, and a navy "Talk to us" tile to contact@pydelhi.org (`sponsor-perks.njk`; the owner picked it over a ticket-shaped pass, a meetup-day timeline, a give-and-get card, a lanyard badge, photo pins and a media kit, and rejected the earlier top-down seating plan), Community a bento grid of channel tiles like the home hero (Commudle as the big pastel-blue tile, WhatsApp wide green, Propose a talk yellow (it moved to Telegram's old spot and kept its colour), Telegram white, and a Community partnership tile instead of the general forum; the tiles reveal together as one group so the tall tile never lags; no snake, the owner found the gutter snake made no sense; the owner hated the earlier Delhi Metro map), Volunteer first the ways in, the same roles as the home page's volunteer pills, as pastel cards tinted and labelled by when the work happens (blue before the meetup, yellow on the day, green any time) plus a dashed "Something else" card, each opening the volunteer Google Form; then the four steps (form, WhatsApp admins or any volunteer at a meetup), the core team as photo cards (name, a word or two on what they do and a LinkedIn button; initials until a photo is added; photos are cropped from their LinkedIn pictures, Satyakam's from satyakam.dev), everyone by team (core members included, all lists alphabetical) with a line on what each team does, and a blue CTA panel (volunteer form, WhatsApp for questions) instead of a GitHub button (the owner found the run-of-show grid overwhelming), the Code of Conduct a quiet document with a one-breath summary, the Blog a featured recap with year shelves. Plain white tile grids were rejected as generic.
- `[data-reveal]` fades in and slides with the `translate` property. Any card that sets its own `transition` (for hover) must end it with `var(--reveal,opacity 0s)`, or its own transition replaces the reveal and the card pops in suddenly (the owner saw this on About's points). Hover lifts use `transform`, never `translate`.
- Reveal long lists row by row (`data-reveal` on each item), never as one block: a tall block waits for a quarter of itself to be on screen and then jumps in, which reads as the scroll jerking (the owner saw it on About).
- Short principles (`{% points %}`) are tilted pastel notes in blue, yellow and green that straighten on hover. The owner rejected the earlier navy rule with text under it.
- Inner-page titles have no gold bar. The mascot snake makes a notch instead: it drops from the top of the screen, rounds the title, lede and buttons with big soft curves and rests heading up beside the title; scrolling slides it on, up and out. Its sides sit on the content edges, so every page's notch is the same width. No notch on phones (under 700px): the owner found it didn't look good there. The owner rejected the earlier version that ran just under the title.
- Links and asset paths are root-absolute (`/assets/...`, `/speak/`) so they work from any page.

## Brand tokens (only use these)

| Token | Value | Use |
|---|---|---|
| Navy | `#00296B` | Primary text, headings, primary buttons, dark blocks (footer) |
| Gold | `#F29800` | Accent. Only on navy or as fills/underlines. **Never gold text on the light background**: contrast is too low and the owner rejected it |
| Pastel blue | `#D5DEEF` | Tints, "Talks", Sponsor pane |
| Pastel yellow | `#F7E4BF` | Tints. **Everything on it is dark yellow-brown** (`#4f4632`): headings, body, icons, arrows, tags. Never navy; the owner has flagged blue text on yellow twice. Set the colour on the yellow element itself so its children inherit, after any base rule that sets navy |
| Pastel green | `#D0DED2` | Tints, "Birds of a Feather", Collaborate pane. Pair with **dark green text** (`#1f4a31` / `#2c5a3f`), and buttons on it are dark green too, never navy (`.panel-green .btn-navy`) |
| Page background | `#f7f6f3` | Plain, no gradients on `body` |
| Lines | `#e3e0d8` | Hairlines and borders |
| Body grey | `#5d5a53` | Secondary text |

- **Text takes the colour of the pastel it sits on:** navy on blue, dark green on green, yellow-brown on yellow, including hover states (the home format rows) and buttons. Before calling a change done, check every page for navy text on yellow or green: walk the page's text and icon elements and compare their colour with the nearest painted background.
- The owner wants the pastels used, but only as purposeful tints, never as random section backgrounds. They said: "you just put some weird bg colors in some sections, remove it".
- The last section (join CTA) must be **white**, not a pastel.
- The pastel radial-gradient wash belongs to the hero `.sticky-scene` only.

## Typography

- **Outfit only** (Google Fonts). **No mono fonts anywhere.** They explicitly called these out as "typical AI stuff".
- Headings are weight 800, tight but not cramped. All letter-spacing was loosened by `+.01em` (the owner asked for "1% more spacious"). Keep the `calc(X + .01em)` pattern when adding new rules.
- Emphasis goes in the same font: navy text with a gold underline bar (`background: linear-gradient(gold,gold) 0 90%/100% .12em no-repeat`), not gold text.
- **The gold underline is rationed** (the owner found it overused). Every page, home included, marks exactly one phrase: on the home page "at the next one." in the closing join title (the owner's pick over "Or ninety?"), on an inner page the last words of the heading over its centrepiece ("three ways in.", "Pick your channel."). Not on the page title (the snake notch already frames it), not on other section headings, panels or slides, and not on the closing join section of an inner page (`.page .join-title em`), never in body text, buttons or cards. In Markdown that means `<em>` appears in one `{% section %}` title per page; everywhere else leave it out. The hero's gold "Pythonistas" is a colour, not an underline, and stays. The Code of Conduct's one-breath rule keeps its own dark green underline, as that page's centrepiece.
- Section titles must be clearly bigger than the content inside them. They rejected format names being the same size as the section title.

## Layout rules

- **The site is centre-aligned.** Section titles and intros are centred. Left-align only where the row is completed by something on the right, e.g. "Saturdays look like this." with arrow buttons on the right.
- **One content width for everything:** every block lines up with the hero bento, `min(1120px, 100vw - 32px)`. `.wrap` is `max-width:1152px; padding:0 16px`. The owner does not want any block narrower than the others (cards, panels, slides, timelines, long-form text all included); only the short lede paragraph under a title keeps a readable measure. Long text with subheadings (the Code of Conduct) fills the width as two columns, heading on the left and text on the right.
- Corners: buttons are full pills, cards 14 to 28px. When a row gets a rounded hover background, don't let borders show curved corners or leftover lines (separators are drawn as inset `::before` lines that hide around the active row).
- Mobile must be explicit for every section: test at 320, 375 and 844 widths, with no horizontal overflow. On phones, carousels need **arrow buttons as well as swipe**.

## Things the owner dislikes (don't reintroduce)

- Mono fonts, generic "AI" patterns, anything that "looks generic as fuck".
- Small pill/eyebrow above the hero headline (removed).
- Low-contrast colour combos (gold on pastel blue, gold on light background).
- Dark navy card + yellow icon squares (the old sponsor panel). Also vertical rule lines with items inside.
- Tiny inline photo "pills" inside text. They read as meaningless.
- Speaker names on past-event cards (use the group photo instead).
- A photo on one card but not on its sibling card.
- Bold title with grey text floating right next to it (split headers).
- Big empty side margins inside cards on phones.
- Too many labels on charts (they removed month/year labels from the graph).

## Things the owner liked / chose

- Hero: scroll-driven animation where scattered photos fly into the bento grid. It was "clunky" before; now one smoothed timeline (see the Technical notes section below).
- "Got five minutes? Or ninety?" talk-length ruler, now on a rounded pastel blue panel with navy and white bars. The earlier navy band with gold bars was "very bright/contrasty".
- Stats as a **GitHub-style contribution graph**: years left to right, Jan to Dec top to bottom, one pastel blue square per month with a meetup (no talk/workshop/BoF types: the owner doesn't want event types anywhere), custom hover tooltip, "2011 … Today" end labels only.
- Sponsor / Collaborate as a **pill toggle** switching two panes (photo + list with icons in soft white squares).
- Format list (Talks / Workshops / BoF / Lightning) with pastel row highlight + photo preview on hover.
- Closing "Save yourself a seat at the next one." section with tilted photo cards echoing the hero.
- Speaker companies and past sponsors as two centred logo marquees directly after the stats.

## How to work with the owner

- When a direction is subjective (a section redesign), **offer 2 to 4 concrete options** with a short sketch and let them pick. They often ask "give me other options".
- Look at real-world inspiration before redesigning; avoid templated defaults.
- Verify in the browser at desktop (1440) and phone (375) before saying something is done.
- No em-dashes in visible copy. Keep copy plain and specific.

## Home page structure (current order)

1. Nav: floating pill, hamburger below 960px, "Join Community" always visible
2. Hero (scroll animation into the bento: profile row, 4 photos, upcoming meetup card)
3. Stats: "N+ meetups since 2011." contribution graph + 350+ speakers / 12k+ members
4. Our speakers have come from (marquee) + Past sponsors & venues (reverse marquee)
5. About: "One Saturday a month, many ways in." + format hover list
6. Photo strip "Saturdays look like this." (drag/swipe + arrows)
7. Events: white ticket with a pastel green date stub (dark green date) and notches on every width (the owner found the all-navy, gold-heavy version too much) + past-event cards with group photos
8. Sponsor / Collaborate toggle + "Get in touch" (moved above Speak: the owner ranks it as more important)
9. Speak: pastel blue rounded panel (content width, not full bleed), talk-length ruler, navy "Submit a Talk"
10. Volunteer: "Help us run the room." Photo on the left, role pills on the right (centred and stacked on phones), navy button to the Google Form
11. Join CTA (white) with tilted photos
12. Footer: brand blurb with the social icons, then one column per kind of visitor: Come to a meetup (Commudle, chats, mailing list, Code of Conduct), Take part (talks, volunteering, About), Catch up (recordings, past talks, recaps), Work with us (sponsor or host, community partnership, contact@pydelhi.org)

## Placeholders still to replace (all marked `TODO` in code)

- Stats numbers (350+, 12k+) in `src/_data/site.js` (meetup.com shows ~14.7k members), and the pre-2025 part of the graph in `src/_data/meetupHistory.js` (`BEFORE_COMMUDLE`, one 12-char string per year, `x` met, `.` none, plus `MEETUPS_BEFORE_COMMUDLE`). From 2025 on, the graph and the headline total fill in from Commudle.
- Links live in `src/_data/site.js`, sourced from meetup.com/pydelhi and the pydelhi/talks issue templates. WhatsApp uses the meetup.com Community invite (owner's choice). Still to confirm: the Google Form link for volunteers (`site.volunteerForm` is the placeholder https://forms.gle/TODO, also hardcoded in `src/volunteer.md` front matter), a real volunteer photo, and the Instagram URL (a guess). The contact email is `site.email` (contact@pydelhi.org); "Get in touch" on Sponsor still goes to the GitHub discussions. Community partnership and collaborative meetup links are `site.communityPartnership` and `site.collaborativeMeetups`.
- `/sponsor` venue needs (seats, timings) are inferred. The roster (core team and the Design, Development, On the ground, Social media and marketing, and Talk reviews teams) came from the owner in October 2026.

## Technical notes (hard-won)

- Logo marquees: `SPEAKER_COMPANIES` and `SPONSORS` in `script.js` are real, sourced lists (speaker employers from delivered talks in github.com/pydelhi/talks; venues and sponsors from meetup.com/pydelhi, Commudle and the blog recaps). Files live in `src/assets/logos/` and are drawn navy through a CSS mask, so any colour or format works as long as the background is transparent. Use the brand's full official logo; add `text` (the name beside it) only when the file is a bare symbol, e.g. GitHub's Invertocat. The owner rejected "Zomato logo + the word Zomato" duplication.

- `html, body { overflow-x: clip }`. **Never `hidden`**: it makes body a scroll container and silently breaks `position: sticky` (which the hero depends on).
- Hero animation is modelled on portrait.so. **Nothing is pinned**: the headline and bento are normal page flow and scroll natively. Each photo sits in its bento cell and only carries a transform (translate, uniform scale, rotate) that throws it out to its scattered start; the offset shrinks linearly with scroll through a critically damped spring and hits zero early, like Portrait: when the bento's top is 26% down the screen on desktop and 22% on phones, even if its bottom is still below the fold. No `filter: blur()` on big hero layers (the old glow orbs had it and made large screens feel heavy); draw soft glows as wide radial gradients instead. The owner rejected the earlier sticky/pinned version as "frictiony" and "heavy", so don't reintroduce pinning, scroll hijacking or per-frame width/height/box-shadow/backdrop-filter changes.
- The animation runs on phones too (start positions in `PHOTOS[].m`, cards bleeding off the screen edges). Only `prefers-reduced-motion` skips it, by clearing the transforms.
- Scroll reveals: `[data-reveal]` (CSS transition) for the ticket, past cards, graph and ruler; everything else is listed in `REVEALS` in `script.js` and animated once with the Web Animations API (rise, fade, slide, pop, photo, underline), so nothing lingers to fight hover transitions. Stat numbers count up on first view.
- More snakes, all in `script.js` under PAGE SNAKES: the title snake (`#snake-title`, the header notch; it can slide on along its path because `makeSnake` takes an `ext` run-off and a `tail`); the Sponsor doors snake (`[data-doors]`, two copies of one pose, the front one clipped to the middle card on desktop and its photo on phones so it reads as over-and-under; it measures the cards' resting positions with offsets, never getBoundingClientRect, because the cards are still rising in on reveal when it starts and re-measuring later made it jump); rail snakes (`[data-rail]`) that thread through `[data-rail-stop]` points as you scroll, lighting each one (and any `[data-phase]` job) as the head passes, left to right on desktop with `data-rail="x"` and down the gutter on phones; path snakes (`path[data-snake]`) inside fixed drawings, which grow once when seen (the Code of Conduct coil); and shelf snakes (blog year shelves). A snake must never be drawn upside down, so poses end heading right, up or down.
- Mascot snake (`#9BB693`): one stroked body path drawn to a length, with the head, eye and tongue from the owner's mascot SVG riding its tip (`makeSnake` in `script.js`). The loop snake lies on the bottom edge of the volunteer section as a divider and follows the scroll; a thin straight one sits flush on the bottom of the footer and runs once on a timer. Both run to the right screen edge, and the tongue flicks once they arrive.
- Icons: Phosphor web font (`ph ph-*`) from unpkg.
- Events come from Commudle at build time (`lib/commudle.js`, public API, community id 8). The hero meetup card, the ticket, the past-event cards, and the graph all render from it. When nothing is upcoming, the card and ticket say "coming soon" with a "Get notified" button to Commudle (the owner's choice). If Commudle can't be reached, the build uses `lib/commudle-fallback.json`, which every successful build rewrites; commit it when it changes.
- Event images: the home page's two past-event cards use our own photo when `src/assets/events/<commudle-slug>.jpg` exists (the owner adds one by hand each month, cropped to 4:3). Otherwise they show the event's header banner from Commudle (`header_image.url`), fitted whole on white (`.past-banner`) because it's a wide poster with text. Both go through `{% photo %}`; eleventy-img downloads remote images at build time and caches them in `.cache/`. If a banner can't be fetched, the card shows the navy PyDelhi wordmark.
- Photos go through eleventy-img (`{% photo %}` shortcode in `eleventy.config.js`): WebP + JPEG at 320/640/1280, wrapped in `<picture>`. `picture{display:contents}` and `picture source{display:none}` keep every existing `img` rule and grid layout working as before. Width/height attributes are stripped because they would override the CSS aspect-ratios. The hero photos are built into a `<template>` in each bento cell and cloned by `script.js`, so the fly-in is unchanged.
- Never put an `{% include %}` whose template uses `{% photo %}` inside an `{% if %}`: Nunjucks drops the async output and renders nothing (this silently hid the closing join section on every inner page). Choose the template instead, as `page.njk` does: `{% include ("join.njk" if join else "no-join") ignore missing %}`. The same goes for a `{% for %}` loop around such an include: use `{% asyncEach %}…{% endeach %}`, as the home page's past cards do.
- `script.js` is shared by every page, so home-only parts check their element exists first.
- Local preview: `npm install` once, then `npm start` (Eleventy dev server on http://localhost:8080, rebuilds on save). `npm run build` writes `_site/`. Browsers cache aggressively, so fetch files with `cache:'reload'` before reloading.
