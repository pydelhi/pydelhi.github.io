# PyDelhi Website: Style Guide & Working Notes

Hand this file to any new Claude Code session working on this repo. It captures the owner's design taste, the decisions already made, and the feedback given so far. Follow it over generic "good design" defaults.

## The project

- Static site, no build step: `index.html`, `styles.css`, `script.js`, photos in `assets/`.
- Only the home page (`/`) exists so far. Planned routes: `/events`, `/speak`, `/sponsor`, `/community`, `/about`, `/blog`, `/blog/[meetup-edition]`, `/volunteers`, `/coc`. Nav and footer already link to them.
- `index copy.html` and `pydelhi (1).html` are the owner's older drafts. Don't edit or delete them.

## Brand tokens (only use these)

| Token | Value | Use |
|---|---|---|
| Navy | `#00296B` | Primary text, headings, primary buttons, dark blocks (footer) |
| Gold | `#F29800` | Accent. Only on navy or as fills/underlines. **Never gold text on the light background**: contrast is too low and the owner rejected it |
| Pastel blue | `#D5DEEF` | Tints, "Talks", Sponsor pane |
| Pastel yellow | `#F7E4BF` | Tints, "Workshop" |
| Pastel green | `#D0DED2` | Tints, "Birds of a Feather", Collaborate pane. Pair with **dark green text** (`#1f4a31` / `#2c5a3f`) |
| Page background | `#f7f6f3` | Plain, no gradients on `body` |
| Lines | `#e3e0d8` | Hairlines and borders |
| Body grey | `#5d5a53` | Secondary text |

- The owner wants the pastels used, but only as purposeful tints, never as random section backgrounds. They said: "you just put some weird bg colors in some sections, remove it".
- The last section (join CTA) must be **white**, not a pastel.
- The pastel radial-gradient wash belongs to the hero `.sticky-scene` only.

## Typography

- **Outfit only** (Google Fonts). **No mono fonts anywhere.** They explicitly called these out as "typical AI stuff".
- Headings are weight 800, tight but not cramped. All letter-spacing was loosened by `+.01em` (the owner asked for "1% more spacious"). Keep the `calc(X + .01em)` pattern when adding new rules.
- Emphasis goes in the same font: navy text with a gold underline bar (`background: linear-gradient(gold,gold) 0 90%/100% .12em no-repeat`), not gold text.
- Section titles must be clearly bigger than the content inside them. They rejected format names being the same size as the section title.

## Layout rules

- **The site is centre-aligned.** Section titles and intros are centred. Left-align only where the row is completed by something on the right, e.g. "Saturdays look like this." with arrow buttons on the right.
- **One content width for everything:** every block lines up with the hero bento, `min(1120px, 100vw - 32px)`. `.wrap` is `max-width:1152px; padding:0 16px`. Only text blocks may be narrower for readable line lengths.
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
- Stats as a **GitHub-style contribution graph**: years left to right, Jan to Dec top to bottom, coloured by meetup type, custom hover tooltip, "2011 … Today" end labels only.
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
12. Footer: Community / Resources / Organization columns

## Placeholders still to replace (all marked `TODO` in code)

- Stats numbers (350+, 12k+) and `MEETUP_HISTORY` in `script.js` (one 12-char string per year: `t` talks, `w` workshop, `b` BoF, `.` none). The headline total (140+) is set by hand in `index.html`, not computed from it.
- Past events (titles, dates, links) in `index.html`.
- Links: WhatsApp, Telegram, Mailing List, Intro Slides (`#`); the collaboration-proposal GitHub link (currently the org page); the volunteer Google Form link and a real volunteer photo. The X/LinkedIn/Instagram/YouTube URLs are guesses.
- Hero meetup card still says "May Meetup, Saturday May 23".

## Technical notes (hard-won)

- Logo marquees: `SPEAKER_COMPANIES` and `SPONSORS` in `script.js` are real, sourced lists (speaker employers from delivered talks in github.com/pydelhi/talks; venues and sponsors from meetup.com/pydelhi, Commudle and the blog recaps). Files live in `assets/logos/` and are drawn navy through a CSS mask, so any colour or format works as long as the background is transparent. Use the brand's full official logo; add `text` (the name beside it) only when the file is a bare symbol, e.g. GitHub's Invertocat. The owner rejected "Zomato logo + the word Zomato" duplication.

- `html, body { overflow-x: clip }`. **Never `hidden`**: it makes body a scroll container and silently breaks `position: sticky` (which the hero depends on).
- Hero animation is modelled on portrait.so. **Nothing is pinned**: the headline and bento are normal page flow and scroll natively. Each photo sits in its bento cell and only carries a transform (translate, uniform scale, rotate) that throws it out to its scattered start; the offset shrinks linearly with scroll through a critically damped spring and hits zero early, like Portrait: when the bento's top is 26% down the screen on desktop and 22% on phones, even if its bottom is still below the fold. No `filter: blur()` on big hero layers (the old glow orbs had it and made large screens feel heavy); draw soft glows as wide radial gradients instead. The owner rejected the earlier sticky/pinned version as "frictiony" and "heavy", so don't reintroduce pinning, scroll hijacking or per-frame width/height/box-shadow/backdrop-filter changes.
- The animation runs on phones too (start positions in `PHOTOS[].m`, cards bleeding off the screen edges). Only `prefers-reduced-motion` skips it, by clearing the transforms.
- Scroll reveals: `[data-reveal]` (CSS transition) for the ticket, past cards, graph and ruler; everything else is listed in `REVEALS` in `script.js` and animated once with the Web Animations API (rise, fade, slide, pop, photo, underline), so nothing lingers to fight hover transitions. Stat numbers count up on first view.
- Mascot snake (`#9BB693`): one stroked body path drawn to a length, with the head, eye and tongue from the owner's mascot SVG riding its tip (`makeSnake` in `script.js`). The loop snake lies on the bottom edge of the volunteer section as a divider and follows the scroll; a thin straight one sits flush on the bottom of the footer and runs once on a timer. Both run to the right screen edge, and the tongue flicks once they arrive.
- Icons: Phosphor web font (`ph ph-*`) from unpkg.
- Local preview: `python3 -m http.server 5173` from the repo root (the desktop app's preview launcher can't read `~/Documents`). Browsers cache aggressively, so fetch files with `cache:'reload'` before reloading.
