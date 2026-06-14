/* ===========================
   Clive Agency India
   script.js - Main JavaScript
   =========================== */

'use strict';

// ===========================
// Sticky Header
// ===========================
(function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===========================
// Mobile Menu Toggle
// ===========================
(function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('active');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('active');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    if (menu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on nav link click
  const navLinks = menu.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('active') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      closeMenu();
    }
  });
})();

// ===========================
// FAQ Accordion
// ===========================
(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(function (other) {
        other.classList.remove('active');
        const q = other.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it wasn't open
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
(function initSmoothScroll() {
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href').slice(1);
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
})();

// ===========================
// Intersection Observer — Animate on Scroll
// ===========================
(function initAnimations() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements
    document.querySelectorAll('.feature-card, .income-card, .call-card, .faq-item')
      .forEach(function (el) { el.classList.add('animate-in'); });
    return;
  }

  const options = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Stagger animation for grid children
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.children) : [];
        const index = siblings.indexOf(entry.target);

        setTimeout(function () {
          entry.target.classList.add('animate-in');
        }, index * 80);

        observer.unobserve(entry.target);
      }
    });
  }, options);

  const animatables = document.querySelectorAll(
    '.feature-card, .income-card, .call-card, .faq-item'
  );
  animatables.forEach(function (el) { observer.observe(el); });
})();

// ===========================
// Active Nav Link on Scroll
// ===========================
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"], .nav-link[href$="index.html"]');
  if (!sections.length || !navLinks.length) return;

  const header = document.getElementById('header');

  function updateActiveLink() {
    const headerHeight = header ? header.offsetHeight : 70;
    const scrollPos = window.scrollY + headerHeight + 60;

    let currentSection = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (currentSection && href === '#' + currentSection) {
        link.classList.add('active');
      }
      if (!currentSection && (href === 'index.html' || href === '#home')) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

// ===========================
// Scroll-to-Top Button
// ===========================
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  function toggleVisibility() {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
})();

// ===========================
// Table Row Hover Enhancement
// ===========================
(function initTableHover() {
  const tables = document.querySelectorAll('.premium-table tbody');
  tables.forEach(function (tbody) {
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(function (row) {
      row.style.transition = 'background 0.2s ease';
    });
  });
})();

// ===========================
// Hero Stats Counter Animation
// ===========================
(function initCounterAnimation() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection || !('IntersectionObserver' in window)) return;

  // Simple fade-in enhancement already handled by CSS
  // This adds a subtle entry animation
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statsSection.style.opacity = '0';
  statsSection.style.transform = 'translateY(20px)';
  statsSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(statsSection);
})();
