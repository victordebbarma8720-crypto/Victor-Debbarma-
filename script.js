/* =========================================
   KANDY OFFICIAL — Main JavaScript
   kandyofficial.in
   ========================================= */

(function () {
  'use strict';

  /* --- Sticky Header --- */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* --- Hamburger Menu --- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.querySelectorAll('span')[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
      hamburger.querySelectorAll('span')[1].style.opacity = isOpen ? '0' : '';
      hamburger.querySelectorAll('span')[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        document.body.style.overflow = '';
      }
    });
  }

  /* --- Active Nav Link --- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
    if (currentPath === 'index.html' && href.startsWith('#')) {
      link.classList.remove('active');
    }
  });

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('active');
      });

      item.classList.toggle('active', !isActive);
    });
  });

  /* --- Scroll to Top --- */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Contact Form --- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        const successMsg = document.getElementById('formSuccess');
        if (successMsg) {
          successMsg.style.display = 'flex';
          contactForm.reset();
        }
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1200);
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- Intersection Observer for Animations --- */
  if ('IntersectionObserver' in window) {
    const animatableEls = document.querySelectorAll('.card, .stat-item, .step-item, .tier-card, .commission-card, .blog-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animatableEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
      observer.observe(el);
    });
  }

  /* --- Counter Animation --- */
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      el.textContent = isDecimal
        ? current.toFixed(1) + el.dataset.suffix
        : Math.round(current).toLocaleString() + (el.dataset.suffix || '');

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.counter);
          animateCounter(el, target, 1800);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* --- Lazy Load Images --- */
  if ('IntersectionObserver' in window) {
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    });

    lazyImgs.forEach(img => imgObserver.observe(img));
  }

})();
