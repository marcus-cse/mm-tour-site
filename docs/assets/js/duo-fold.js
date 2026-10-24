/* SPDX-License-Identifier: MIT · © 2026 Marcus Maldonado · https://marcus.band */
// iPhone Duo: switch to a split layout when the device is partially folded in portrait.
// Device Posture and Viewport Segments are a Safari 27.1 developer preview (behind flags),
// so this is an enhancement only: without the APIs, nothing changes.
// Load in <head> so the folded layout is applied before first paint.
(function() {
  const root = document.documentElement;
  const mq = (q) => { try { return window.matchMedia(q); } catch (e) { return null; } };
  const foldedMq = mq('(device-posture: folded)');
  const portraitMq = mq('(orientation: portrait)');
  const sideBySideMq = mq('(horizontal-viewport-segments: 2)');
  const reduceMotionMq = mq('(prefers-reduced-motion: reduce)');

  function isFoldedPortrait() {
    const posture = navigator.devicePosture ? navigator.devicePosture.type : null;
    const folded = posture ? posture === 'folded' : !!(foldedMq && foldedMq.matches);
    // The split assumes a horizontal hinge (top + bottom halves), so skip side-by-side segments
    return folded && !!(portraitMq && portraitMq.matches) && !(sideBySideMq && sideBySideMq.matches);
  }

  function applyMetrics() {
    const segs = window.viewport && window.viewport.segments;
    // Only the top segment is trusted: the simulator reports a bottom segment taller than the viewport
    const fold = segs && segs.length === 2 ? segs[0].height : window.innerHeight / 2;
    root.style.setProperty('--duo-fold', fold + 'px');
    root.style.setProperty('--duo-vh', window.innerHeight + 'px');
  }

  function apply(folded) {
    applyMetrics();
    root.classList.toggle('duo-folded', folded);
    window.dispatchEvent(new CustomEvent('duo:layout', { detail: { folded } }));
  }

  let current = isFoldedPortrait();
  if (current) apply(true);

  function update() {
    const next = isFoldedPortrait();
    if (next === current) {
      if (next) applyMetrics();
      return;
    }
    current = next;

    if (reduceMotionMq && reduceMotionMq.matches) return apply(next);

    if (document.startViewTransition) {
      // Names the shared elements only while capturing, so they don't affect normal rendering
      root.classList.add('duo-capture');
      const transition = document.startViewTransition(() => apply(next));
      transition.finished.finally(() => {
        root.classList.remove('duo-capture');
        window.dispatchEvent(new CustomEvent('duo:settled'));
      });
    } else {
      // Fallback: frost the page, swap the layout while it's blurred, then clear
      root.classList.add('duo-frost');
      setTimeout(() => {
        apply(next);
        requestAnimationFrame(() => root.classList.remove('duo-frost'));
        window.dispatchEvent(new CustomEvent('duo:settled'));
      }, 260);
    }
  }

  if (navigator.devicePosture) navigator.devicePosture.addEventListener('change', update);
  [foldedMq, portraitMq, sideBySideMq].forEach((m) => m && m.addEventListener('change', update));
  window.addEventListener('resize', update);
})();
