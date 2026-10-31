/* =========================================
   CHERRY AGENCY INDIA — MAIN JAVASCRIPT
   cherryofficial.in
   ========================================= */

(function () {
  'use strict';

  /* ---- Sticky navbar ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- Mobile menu ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Active nav ---- */
  (function markActive() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const base = href.split('#')[0].split('/').pop() || 'index.html';
      if (base === path || (path === '' && base === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();

  /* ---- Scroll animations ---- */
  const animEls = document.querySelectorAll('.fade-up, .fade-in');
  if ('IntersectionObserver' in window && animEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    animEls.forEach(el => obs.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-answer').style.maxHeight = '0'; }
      });
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---- Contact form ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const successEl = document.getElementById('formSuccess');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (successEl) { successEl.classList.add('show'); successEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      }, 800);
    });
  }

  /* ---- Blog search ---- */
  const searchInput = document.getElementById('blogSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.blog-card').forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const desc  = card.querySelector('p')?.textContent.toLowerCase() || '';
        card.style.display = (!q || title.includes(q) || desc.includes(q)) ? '' : 'none';
      });
    });
  }

  /* ---- Blog category filter ---- */
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.blog-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });

  /* ---- Smooth scroll for anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 12, behavior: 'smooth' });
      }
    });
  });

  /* ---- Counter animation ---- */
  const statEls = document.querySelectorAll('.stat-number[data-count]');
  if (statEls.length && 'IntersectionObserver' in window) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1800;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => cObs.observe(el));
  }

})();
