// Reactive mouse-tracking glow
(function () {
  const SEL = '.card, .resource-card, .cert-card, .activity-card, .part-card, .info-box, .cert-premium, .demo, pre';

  function track(el) {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--gx', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
      el.style.setProperty('--gy', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
    });
    el.addEventListener('mouseleave', () => {
      setTimeout(() => {
        el.style.setProperty('--gx', '50%');
        el.style.setProperty('--gy', '50%');
      }, 270);
    });
  }

  function attach() {
    document.querySelectorAll(SEL).forEach(track);
  }

  // On scroll: reset glow ONLY on elements the mouse is NOT hovering
  // This kills ghost glow without breaking active hover
  window.addEventListener('scroll', () => {
    document.querySelectorAll(SEL).forEach(el => {
      if (!el.matches(':hover')) {
        el.style.setProperty('--gx', '50%');
        el.style.setProperty('--gy', '50%');
      }
    });
  }, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();
