(function() {
  const cfg = window.MM_PAGE || {};
  const assets = new URL('../', document.currentScript.src).href;

  document.head.insertAdjacentHTML('beforeend', `
    <link rel="icon" type="image/x-icon" href="${assets}img/favicon.ico" />
    <link rel="apple-touch-icon" href="${assets}img/apple-touch-icon.png" />
    <meta property="og:title" content="${document.title}" />
    <meta property="og:description" content="${cfg.ogDescription || ''}" />
    <meta property="og:image" content="https://marcus.band/assets/img/mm-backdrop.jpg" />
    <meta property="og:url" content="${cfg.ogUrl || 'https://marcus.band'}" />
    <meta property="og:type" content="website" />
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${assets}css/styles.css">
  `);
})();
