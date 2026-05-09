/**
 * Orchidea Virágüzlet — Gallery
 * Scroll Snap carousel + Lightbox
 */
(function () {
  const track    = document.querySelector('.gallery-track');
  const slides   = document.querySelectorAll('.gallery-slide');
  const dots     = document.querySelectorAll('.gallery-dot');
  const prevBtn  = document.querySelector('.gallery-nav--prev');
  const nextBtn  = document.querySelector('.gallery-nav--next');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.querySelector('.lightbox__img');
  const lbClose  = document.querySelector('.lightbox__close');
  const lbPrev   = document.querySelector('.lightbox__prev');
  const lbNext   = document.querySelector('.lightbox__next');
  const lbCount  = document.querySelector('.lightbox__counter');

  if (!track) return;

  const images = Array.from(slides).map(s => ({
    src: s.querySelector('img').src,
    alt: s.querySelector('img').alt,
  }));
  let currentLb = 0;

  /* ── Slide szélesség ──────────────────────────────────── */
  function slideWidth() {
    return slides[0].offsetWidth + 16; // + gap
  }

  /* ── Aktív dot frissítése ─────────────────────────────── */
  function updateDots() {
    const idx = Math.round(track.scrollLeft / slideWidth());
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  /* ── Nyilak ───────────────────────────────────────────── */
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -slideWidth(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: slideWidth(), behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateDots, { passive: true });

  /* ── Dot kattintás ────────────────────────────────────── */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      track.scrollTo({ left: i * slideWidth(), behavior: 'smooth' });
    });
  });

  /* ── Lightbox megnyitás ───────────────────────────────── */
  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => openLightbox(i));
  });

  function openLightbox(index) {
    currentLb = index;
    setLbImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function setLbImage(index) {
    lbImg.classList.add('loading');
    lbImg.src = images[index].src;
    lbImg.alt = images[index].alt;
    lbImg.onload = () => lbImg.classList.remove('loading');
    if (lbCount) lbCount.textContent = `${index + 1} / ${images.length}`;
  }

  /* ── Lightbox navigáció ───────────────────────────────── */
  lbClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lbPrev.addEventListener('click', () => {
    currentLb = (currentLb - 1 + images.length) % images.length;
    setLbImage(currentLb);
  });

  lbNext.addEventListener('click', () => {
    currentLb = (currentLb + 1) % images.length;
    setLbImage(currentLb);
  });

  /* ── Billentyűzet ─────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   { currentLb = (currentLb - 1 + images.length) % images.length; setLbImage(currentLb); }
    if (e.key === 'ArrowRight')  { currentLb = (currentLb + 1) % images.length; setLbImage(currentLb); }
  });
})();
