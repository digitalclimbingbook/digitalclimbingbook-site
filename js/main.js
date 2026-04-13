// Scroll-triggered animations for feature sections
(function () {
  const sections = document.querySelectorAll('.feature-section');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  // Subtle parallax offset on phone mockups during scroll
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      sections.forEach((section) => {
        const phone = section.querySelector('.phone-mockup');
        if (!phone) return;
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (center - viewCenter) * 0.06;
        phone.style.transform = 'translateY(' + offset + 'px)';
      });
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
