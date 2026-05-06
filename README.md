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
- **Design** — Designed in Figma using Claude Design. Warm off-white palette, Anton display type, editorial layout inspired by tour books and concert programs.
- **Code** — Built and refined with Claude Code. No framework, no bundler — vanilla HTML, CSS, and JS.

---

## Pages

### Home
Full-viewport photo hero with the next upcoming show pulled live from the spreadsheet. Two CTAs: tour dates and booking inquiry.

### Tour Dates
Live show list grouped by month, filterable by artist. Stats strip (shows, cities, acts) computed dynamically from the sheet. Private engagements are labeled but venue details are intentionally hidden.

### Flight Map
The most complex page — and the one I'm most proud of. An animated Leaflet map that plots the tour route city by city, synced to a "Now Playing" card that cycles through upcoming shows. The route animates stop by stop with a dashed flight-path line and glowing dot markers, then loops.

### About
Bio, career timeline (2021–present), and a credits section covering acts and partners.

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
