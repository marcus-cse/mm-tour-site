# mm-tour-site

**People keep asking me when my next show is. This is the answer.**

Built to be fast, clean, and dead simple to maintain. No CMS, no build step, no framework — just HTML, CSS, and a Google Sheet.

🌐 [marcus.band](https://marcus.band)

---

## Purpose

I play guitar semi-professionally alongside a full-time career in tech. Between leading engineering teams and traveling for shows, the calendar fills up fast. This site gives people one place to see where I'll be, learn a bit about my story, and reach out about bookings.

---

## Architecture

- **Hosting** — GitHub Pages, deployed from the `docs/` folder. Zero infrastructure.
- **Data** — Google Sheets as a live backend. Tour dates are managed in a spreadsheet and fetched at runtime via PapaParse (CSV export). Updating the schedule requires zero code changes.
- **Design** — Designed with Claude Design. Warm off-white palette, Anton display type, editorial layout inspired by tour books and concert programs.
- **Code** — Built and refined with Claude Code. No framework, no bundler — vanilla HTML, CSS, and JS.
- **Identity** — JSON-LD Person schema and `rel="me"` social links on every page, disambiguating this site from an unrelated recording artist with the same name. Static Open Graph tags per page (not JS-injected) so link previews and crawlers render correctly.

---

## Development Workflow

This site is maintained almost entirely through an AI-assisted loop, editor to merged PR:

- **Editor** — VS Code, with the Live Preview extension serving `docs/` locally so changes show up instantly with no build step.
- **Pair programming** — [Claude Code](https://claude.com/claude-code) (VS Code extension) does the actual implementation — reading the codebase, making edits, running local commands.
- **Design** — Visual direction comes from Claude Design, then gets implemented directly against that reference.
- **QA** — Playwright MCP drives a real headless browser to validate changes before they ship: resizing viewports, clicking through flows, taking screenshots. This catches the bugs that are easy to miss by eye — stacking-context conflicts, mobile breakpoint regressions, image downscale aliasing.
- **Version control** — GitHub CLI (`gh`) handles branch pushes and PR creation from the terminal. Every change gets its own branch (`feat-`, `fix-`, or `chore-` prefixed), a scoped commit, and a PR with a summary and test plan before merging to `main`.

No CI pipeline, no staging environment. The loop is: implement, verify with Playwright, commit, push, open a PR, merge.

---

## Pages

### Home
Full-viewport photo hero with the next upcoming show pulled live from the spreadsheet. Two CTAs: tour dates and booking inquiry.

### Tour Dates
Live show list grouped by month, filterable by artist. Stats strip (shows, cities, acts) computed dynamically from the sheet. Private engagements are labeled but venue details are intentionally hidden.

### Flight Map
The most complex page — and the one I'm most proud of. An animated Leaflet map that plots the tour route city by city, synced to a "Now Playing" card that cycles through upcoming shows. The route animates stop by stop with a dashed flight-path line and glowing dot markers, then loops.

### About
Bio, career timeline (2021–present), a guitar collection section telling the story of 13 years as a PRS player, and a credits section covering acts and partners — with expandable details on a few entries (church work, the wider Dallas artist network).

### Booking
Single-screen contact page. Email and Instagram. No form — just direct contact.

---

## Data Format

Tour dates live in [this Google Sheet](https://docs.google.com/spreadsheets/d/1emqiAiZPufCuJ0n9bkewzMdNzRAea9sJopSlLKkdqcs) with these columns:

| Column | Description |
|--------|-------------|
| `date` | Show date |
| `artist` | Performing act |
| `venue` | Venue name |
| `city` / `state` | Location |
| `ticket_url` | Link to tickets (optional) |
| `is_public` | `true` for public shows without ticket links |
| `latitude` / `longitude` | City centroids for map plotting |

---

## License

Released under the [MIT License](LICENSE) — © 2026 Marcus Maldonado.

Reuse is welcome. If you (or a tool you're using) borrow code or content from this repo, please retain the copyright notice and attribute back to [marcus.band](https://marcus.band).
