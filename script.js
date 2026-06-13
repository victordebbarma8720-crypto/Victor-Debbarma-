/* ============================================================
   VitokAgent.com — Main JavaScript
   Vitok Agency India
   ============================================================ */

(function () {
  'use strict';

  /* ── Header scroll effect ── */
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile nav toggle ── */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav  = document.getElementById('mobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── FAQ accordion ── */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const q = other.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ── Intersection Observer: fade-up animations ── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
  }

  /* ── Contact form → WhatsApp redirect ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name     = (contactForm.querySelector('#name')?.value || '').trim();
      const phone    = (contactForm.querySelector('#phone')?.value || '').trim();
      const interest = (contactForm.querySelector('#interest')?.value || '').trim();
      const city     = (contactForm.querySelector('#city')?.value || '').trim();
      const message  = (contactForm.querySelector('#message')?.value || '').trim();

      if (!name || !phone) {
        alert('Please fill in your name and WhatsApp number.');
        return;
      }

      let text = `Hi, I am contacting Vitok Agency India.\n\nName: ${name}\nPhone: ${phone}`;
      if (interest) text += `\nInterested In: ${interest}`;
      if (city)     text += `\nCity: ${city}`;
      if (message)  text += `\nMessage: ${message}`;

      window.open(
        `https://wa.me/918132958338?text=${encodeURIComponent(text)}`,
        '_blank',
        'noopener,noreferrer'
      );
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 74;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Highlight current page nav link ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── WhatsApp float attention pulse on first load ── */
  const waFloat = document.querySelector('.wa-float-btn');
  if (waFloat) {
    setTimeout(() => {
      waFloat.style.transition = 'transform 0.3s ease';
      waFloat.style.transform  = 'scale(1.18)';
      setTimeout(() => { waFloat.style.transform = ''; }, 400);
    }, 3500);
  }

})();
