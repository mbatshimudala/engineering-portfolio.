/* Decorative video: show the poster unless playback is genuinely running.
   iOS Low Power Mode may block autoplay. Never present a play button. */
(function () {
  const video = document.getElementById('engineering-hero-video');
  if (!video) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hide = () => { video.style.visibility = 'hidden'; };
  const showIfPlaying = () => {
    if (!motion.matches && !video.paused && video.readyState >= 2) {
      video.style.visibility = 'visible';
    } else {
      hide();
    }
  };
  video.controls = false;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.removeAttribute('controls');
  hide();
  function tryAutoplay() {
    hide();
    if (motion.matches) { video.pause(); return; }
    try {
      const result = video.play();
      if (result && typeof result.catch === 'function') result.catch(hide);
    } catch (e) { hide(); }
  }
  video.addEventListener('playing', showIfPlaying);
  video.addEventListener('pause', hide);
  video.addEventListener('waiting', hide);
  video.addEventListener('stalled', hide);
  video.addEventListener('error', hide);
  video.addEventListener('ended', hide);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) hide(); else tryAutoplay();
  });
  if (motion.addEventListener) motion.addEventListener('change', tryAutoplay);
  tryAutoplay();
})();
