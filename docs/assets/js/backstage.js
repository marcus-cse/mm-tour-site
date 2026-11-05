/* SPDX-License-Identifier: MIT · © 2026 Marcus Maldonado · https://marcus.band */
(function() {
  const SITE_ROOT = new URL('../../', document.currentScript.src).href;
  const DATA_URL = new URL('backstage/shows.json', SITE_ROOT).href;
  const POSTER_FILLS = ['#5A2E22', '#2B3A55', '#1F4E4A', '#4A3B5C', '#6B4E1F'];
  const PAST_FILLS = ['#2A2A2E', '#26262A'];
  const DAY = 24 * 60 * 60 * 1000;

  // "2026-12-12" -> local midnight, so a show stays upcoming through its own day
  function parseDate(iso) {
    const [y, m, d] = String(iso).split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function today() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  const isColor = c => /^#[0-9a-f]{3,8}$/i.test(c || '');

  // Inline style for a show's card/poster: its fill color, plus its photo when it has one.
  // `poster` is a path from the site root, e.g. "assets/img/backstage/show.jpg".
  function posterStyle(s) {
    if (!s.poster) return `--bs-poster: ${s.fill}`;
    const href = new URL(s.poster, SITE_ROOT).href.replace(/[()'"\s]/g, c => '%' + c.charCodeAt(0).toString(16));
    return `--bs-poster: ${s.fill}; --bs-poster-img: url(${href})`;
  }

  async function fetchShows() {
    const res = await fetch(DATA_URL, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`shows.json: HTTP ${res.status}`);
    const { shows = [] } = await res.json();
    const start = today();
    // a show without a date yet is upcoming, listed after the dated ones
    const dated = shows
      .map(s => ({ ...s, when: s.date ? parseDate(s.date) : null }))
      .filter(s => s.id && (s.when === null || !isNaN(s.when)));
    const upcoming = dated.filter(s => s.when === null || s.when >= start)
      .sort((a, b) => (a.when ?? Infinity) - (b.when ?? Infinity));
    const past = dated.filter(s => s.when !== null && s.when < start).sort((a, b) => b.when - a.when);
    const all = [...upcoming, ...past];
    all.forEach((s, i) => {
      s.num = String(i + 1).padStart(2, '0');
      s.isPast = s.when !== null && s.when < start;
      s.daysOut = s.when === null ? null : Math.round((s.when - start) / DAY);
      s.fill = s.isPast ? PAST_FILLS[i % PAST_FILLS.length]
             : isColor(s.color) ? s.color : POSTER_FILLS[i % POSTER_FILLS.length];
      s.art = posterStyle(s);
    });
    return { upcoming, past, all };
  }

  const fmt = {
    date:  d => d ? d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD',
    short: d => d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Date TBD',
    days:  n => n === null ? 'Date TBD' : n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : `${n} days out`,
    place: s => [s.venue, s.city].filter(Boolean).join(', '),
    time:  sec => isFinite(sec) ? `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}` : '—:—',
  };

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  window.MM = window.MM || {};
  window.MM.Backstage = { fetch: fetchShows, fmt, esc };
})();
