/* =====================================================================
   Center of Hope Assembly of God — shared site script
   Loaded by every page. Expects: #year, header#navbar, #hamburgerBtn,
   #hamburgerIcon, #mobileDrawer, and elements with class "reveal".
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile drawer ----------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (hamburgerBtn && hamburgerIcon && mobileDrawer) {
    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerIcon.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
    };

    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      hamburgerIcon.innerHTML = isOpen
        ? '<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>'
        : '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
    });

    mobileDrawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  // ---------- Sticky navbar blur-on-scroll ----------
  const header = document.getElementById('navbar');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ---------- Scroll-reveal ----------
  const observerOptions = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.12 };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }, 100);
});
