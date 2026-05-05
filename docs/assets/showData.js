// showData.js
// Standalone module for fetching, filtering, and formatting show data
// Requires dayjs and PapaParse to be loaded in the environment

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1emqiAiZPufCuJ0n9bkewzMdNzRAea9sJopSlLKkdqcs/export?format=csv';

async function fetchShows() {
  const response = await fetch(SHEET_URL);
  const text = await response.text();
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  return parsed.data;
}

function parseShowDate(dateStr) {
  // Assumes dateStr is in 'DD MMM' format, adds current year
  return dayjs(`${dateStr} ${dayjs().year()}`, 'DD MMM YYYY');
}

function filterUpcomingShows(shows) {
  const today = dayjs();
  return shows.filter(show => {
    const showDate = parseShowDate(show.date);
    return showDate.isValid() && showDate > today;
  });
}

function sortShowsByDate(shows) {
  return shows.slice().sort((a, b) => {
    const dateA = parseShowDate(a.date);
    const dateB = parseShowDate(b.date);
    return dateA - dateB;
  });
}

function formatShow(show) {
  const showDate = parseShowDate(show.date);
  const formattedDate = showDate.isValid() ? showDate.format('DD MMM') : show.date;
  const location = `${show.city}, ${show.state}`;
  return {
    artist: show.artist,
    date: formattedDate,
    venue: show.venue,
    location,
    ticket_url: show.ticket_url,
    is_public: String(show.is_public).toLowerCase() === 'true',
  };
}

export { fetchShows, parseShowDate, filterUpcomingShows, sortShowsByDate, formatShow };
