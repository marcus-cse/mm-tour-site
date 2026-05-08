(function() {
  const assets = new URL('../', document.currentScript.src).href;

  document.head.insertAdjacentHTML('beforeend', `
    <link rel="icon" type="image/x-icon" href="${assets}img/favicon.ico" />
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${assets}css/styles.css">
  `);
})();
