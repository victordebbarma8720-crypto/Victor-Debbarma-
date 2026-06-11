/* ============================================================
   Kome Agency India — kome-script.js (Premium v2)
   Komeagency.tech
   ============================================================ */

(function () {
  'use strict';

  /* ── Page Loader ── */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 300);
    });
  }

  /* ── Sticky Nav ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Menu ── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    document.addEventListener('click', (e) => {
      if (nav && !nav.contains(e.target) && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const inner = item.querySelector('.faq-answer-inner');
      const isOpen = item.classList.contains('open');

      const list = item.closest('.faq-list');
      if (list) {
        list.querySelectorAll('.faq-item.open').forEach((open) => {
          if (open !== item) {
            open.classList.remove('open');
            const a = open.querySelector('.faq-answer');
            if (a) a.style.maxHeight = '0';
          }
        });
      }

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = (inner.scrollHeight + 48) + 'px';
      }
    });
  });

  /* ── Scroll Reveal ── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => el.classList.add('revealed'));
  }

  /* ── Counter Animation ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = Date.now();
    const suffix = el.dataset.suffix || '';
    const fmt = (n) => n.toLocaleString('en-IN');
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = fmt(Math.round(eased * target)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    const cObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { animateCounter(e.target); cObs.unobserve(e.target); } }),
      { threshold: 0.6 }
    );
    document.querySelectorAll('[data-count]').forEach((el) => cObs.observe(el));
  }

  /* ── Typewriter Effect ── */
  const tw = document.getElementById('typewriter');
  if (tw) {
    const words = tw.dataset.words ? tw.dataset.words.split('|') : [];
    if (words.length > 0) {
      let wi = 0, ci = 0, deleting = false;
      const cursor = document.createElement('span');
      cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:currentColor;margin-left:2px;animation:blink 0.8s step-end infinite;vertical-align:text-bottom;';
      tw.after(cursor);
      const style = document.createElement('style');
      style.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
      document.head.appendChild(style);
      const type = () => {
        const word = words[wi];
        if (!deleting) {
          tw.textContent = word.slice(0, ++ci);
          if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
        } else {
          tw.textContent = word.slice(0, --ci);
          if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        }
        setTimeout(type, deleting ? 60 : 100);
      };
      setTimeout(type, 600);
    }
  }

  /* ── Smooth Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
    });
  });

  /* ── Back to Top ── */
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 500), { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Active Nav ── */
  const path = window.location.pathname.split('/').pop() || 'kome-index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach((a) => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ── Contact Form ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '✅ Sent! We\'ll reply on WhatsApp soon.';
      btn.disabled = true;
      btn.style.background = 'linear-gradient(135deg,#059669,#10B981)';
      setTimeout(() => { btn.innerHTML = original; btn.disabled = false; btn.style.background = ''; form.reset(); }, 4000);
    });
  }

  /* ── Hover: nav register links pulse on mobile ── */
  document.querySelectorAll('.btn-host, .btn-agency').forEach((btn) => {
    btn.addEventListener('mouseenter', () => btn.style.willChange = 'transform');
    btn.addEventListener('mouseleave', () => btn.style.willChange = '');
  });

})();
