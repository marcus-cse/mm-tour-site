(function() {
  const mount = document.getElementById('footer-mount');
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.outerHTML = `
    <footer class="gl-footer">
      <div class="gl-footer-top">
        <div class="gl-footer-mark">MM</div>
        <div class="gl-footer-cols">
          <div>
            <div class="gl-footer-label">CONTACT</div>
            <div>marcus@marcian.live</div>
          </div>
          <div>
            <div class="gl-footer-label">FOLLOW</div>
            <a href="https://www.instagram.com/musicianmarcus/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div class="gl-footer-bot">
        <span>© ${year} MARCUS MALDONADO</span>
        <span>BUILT IN TEXAS</span>
      </div>
    </footer>`;
})();
