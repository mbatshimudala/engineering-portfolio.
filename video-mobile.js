/* Decorative background only: autoplay when permitted, otherwise show still image. */
(function () {
  const video = document.getElementById('engineering-hero-video');
  if (!video) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  function usePoster() { video.style.visibility = 'hidden'; }
  function attemptAutoplay() {
    if (reducedMotion.matches) { usePoster(); video.pause(); return; }
    const attempt = video.play();
    if (attempt && typeof attempt.then === 'function') {
      attempt.then(function () { video.style.visibility = 'visible'; }).catch(usePoster);
    }
  }
  video.addEventListener('playing', function () { if (!reducedMotion.matches) video.style.visibility = 'visible'; });
  video.addEventListener('error', usePoster);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) attemptAutoplay(); });
  reducedMotion.addEventListener('change', attemptAutoplay);
  attemptAutoplay();
})();
