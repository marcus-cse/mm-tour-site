(function() {
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1emqiAiZPufCuJ0n9bkewzMdNzRAea9sJopSlLKkdqcs/export?format=csv';

  function parseShowDate(dateStr) {
    return dayjs(`${dateStr} ${dayjs().year()}`);
  }

  const fmt = {
    day:       d => parseShowDate(d).format('DD'),
    month:     d => parseShowDate(d).format('MMM').toUpperCase(),
    week:      d => parseShowDate(d).format('ddd').toUpperCase(),
    monthYear: d => parseShowDate(d).format('MMMM YYYY').toUpperCase(),
  };

  function adaptShow(row) {
    const hasTickets = (row.ticket_url || '').trim();
    const isPublic   = String(row.is_public || '').toLowerCase() === 'true';
    return {
      date:      (row.date || '').trim(),
      artist:    (row.artist || '').trim(),
      artistUrl: (row.artist_url || '').trim() || null,
      venue:     (row.venue || '').trim(),
      city:      `${(row.city || '').trim()}, ${(row.state || '').trim()}`,
      status:    hasTickets ? 'tickets' : isPublic ? 'public' : 'private',
      url:       hasTickets || null,
      lat:       parseFloat(row.latitude),
      lng:       parseFloat(row.longitude),
    };
  }

  async function fetchShows() {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const rows = Papa.parse(text, { header: true, skipEmptyLines: true }).data;
    const today = dayjs();
    return rows
      .map(adaptShow)
      .filter(s => s.date && parseShowDate(s.date).isValid() && parseShowDate(s.date) >= today)
      .sort((a, b) => parseShowDate(a.date) - parseShowDate(b.date));
  }

  window.MM = window.MM || {};
  window.MM.Shows = { fetch: fetchShows, parseDate: parseShowDate, fmt };
})();
