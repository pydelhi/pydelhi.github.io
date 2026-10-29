# Contributing to the PyDelhi website

Thanks for helping. This repo is the code for [pydelhi.org](https://pydelhi.org), the site for Delhi NCR's Python community. It's run by volunteers, and small fixes are as welcome as big ones.

By taking part you agree to follow the [PyDelhi Code of Conduct](CODE_OF_CONDUCT.md).

## Is this the right place?

| You want to | Go to |
|---|---|
| Fix a typo, a broken link or wrong information on the site | This repo: open an issue or a pull request |
| Report something that looks or works wrong | This repo: open an issue and pick "Something looks or works wrong" |
| Propose a talk, workshop or lightning talk | [pydelhi/talks](https://github.com/pydelhi/talks/issues/new?template=talk-proposal.yaml) |
| Ask a question or suggest an idea for the community | [PyDelhi discussions](https://github.com/orgs/pydelhi/discussions) |
| Sponsor or host a meetup | [contact@pydelhi.org](mailto:contact@pydelhi.org) or [pydelhi.org/sponsor](https://pydelhi.org/sponsor/) |
| Have a photo of yourself taken down | Email [contact@pydelhi.org](mailto:contact@pydelhi.org). No need to open a public issue |
| Report a Code of Conduct problem | Email [contact@pydelhi.org](mailto:contact@pydelhi.org). See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) |

## Ways to help

- **Content fixes:** typos, outdated details, broken links. These can go straight to a pull request.
- **Blog recaps:** wrote up a meetup? The README shows how to add one under "Writing a blog recap".
- **Photos:** meetup photos you took, with the people in them happy to be on the site.
- **Bugs:** layout breaking on a phone, something that doesn't load, an accessibility problem.
- **Design and new sections:** open an issue first, so we can agree on the direction before you spend time on it.

## Set up

You need Node 20 or newer.

```bash
npm install
npm start
```

The site runs at http://localhost:8080 and rebuilds when you save. The [README](README.md) explains how pages, blog posts, photos and shared links are organised.

## Making a change

1. Fork the repo and create a branch from `main` (`fix-volunteer-link`, `recap-november-2026`).
2. Make the change. Keep a pull request to one thing; two unrelated fixes are easier to review as two pull requests.
3. Check it in the browser at phone width (320 and 375px) and desktop (around 1440px). Nothing should scroll sideways.
4. Run `npm run build` and make sure it finishes without errors.
5. Open a pull request against `main` and fill in the template. Add screenshots for anything visual.

A maintainer will review it. Once it's merged into `main`, the site deploys by itself.

## Design rules

The site has a specific look, and [STYLE_GUIDE.md](STYLE_GUIDE.md) records it: colours, type, layout, buttons and the things to avoid. Read it before changing anything visual. The short version:

- Only the brand colours from the style guide. Never gold text on the light background.
- Outfit is the only font. No monospace fonts anywhere.
- Everything lines up at one content width, and the site is centre-aligned.
- Every button ends in one Phosphor icon, picked by where it goes.
- Copy is plain and specific, with no em-dashes.

## Writing for the site

- Write the way you'd explain it to someone at a meetup: short sentences, no jargon or hype.
- Use "we" for PyDelhi and "you" for the reader.
- Check names, dates and links against Commudle or the original source.

## Photos

- Only add photos you took or have permission to use, and where the people in them are fine with being on the site.
- Any size is fine; the build resizes them. Keep faces away from the edges, since cards crop the photos.
- Write alt text that says what's in the photo ("A speaker explaining Redis persistence"), not "image".

## Commits

Write the subject as a short sentence in the imperative, the way the history reads: "Add a 404 page with the snake curled into the 0", "Fix the volunteer form link". Don't commit `_site/`, `node_modules/` or `.cache/`. Commit `lib/commudle-fallback.json` only when a build has updated it.

## Licensing

By sending a pull request you agree that your code is released under the [MIT License](LICENSE), and any photos or videos under [CC BY-NC-SA 4.0](LICENSE-MEDIA.md), the same license as talks at PyDelhi events.

## Questions

Ask in [the discussions](https://github.com/orgs/pydelhi/discussions), on [Telegram](https://t.me/PyDelhi_official), or comment on the issue or pull request you're working on.
