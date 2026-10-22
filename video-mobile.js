/* Mobile Safari can block autoplay, especially with Low Power Mode enabled. */
(function () {
  const video = document.getElementById('engineering-hero-video');
  const button = document.getElementById('video-play-button');
  if (!video || !button) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function syncButton() {
    button.classList.toggle('is-visible', window.innerWidth <= 750 && video.paused && !reducedMotion.matches);
  }
  function attemptAutoplay() {
    if (reducedMotion.matches) return;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(syncButton);
  }
  button.addEventListener('click', function () {
    video.play().then(syncButton).catch(syncButton);
  });
  video.addEventListener('playing', syncButton);
  video.addEventListener('pause', syncButton);
  window.addEventListener('resize', syncButton);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) attemptAutoplay();
  });
  attemptAutoplay();
  window.setTimeout(syncButton, 900);
})();
