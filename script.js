/* ===========================
   ChingariLive Agency India
   script.js — Main JavaScript
   =========================== */

(function () {
  'use strict';

  // ====== HEADER SCROLL ======
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ====== HAMBURGER / MOBILE NAV ======
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          !hamburger.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ====== SCROLL TO TOP ======
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ====== FAQ ACCORDION ======
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherQ = other.querySelector('.faq-question');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // ====== FORM HANDLING ======
  function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value?.trim();
      const phone = form.querySelector('[name="phone"]')?.value?.trim();

      if (!name) {
        showFormMessage(form, 'Please enter your full name.', 'error');
        return;
      }

      if (!phone || phone.replace(/[\s\-\+]/g, '').length < 10) {
        showFormMessage(form, 'Please enter a valid phone number.', 'error');
        return;
      }

      const subject = form.querySelector('[name="subject"]')?.value || '';
      const city = form.querySelector('[name="city"]')?.value?.trim() || '';
      const message = form.querySelector('[name="message"]')?.value?.trim() || '';
      const experience = form.querySelector('[name="experience"]')?.value || '';
      const teamSize = form.querySelector('[name="teamSize"]')?.value || '';
      const age = form.querySelector('[name="age"]')?.value || '';

      let wa = `Hi, I want to register with ChingariLive.\n\nName: ${name}\nPhone: ${phone}`;
      if (age) wa += `\nAge: ${age}`;
      if (city) wa += `\nCity: ${city}`;
      if (subject) wa += `\nQuery: ${subject}`;
      if (experience) wa += `\nExperience: ${experience}`;
      if (teamSize) wa += `\nTeam Size: ${teamSize}`;
      if (message) wa += `\n\nMessage: ${message}`;

      showFormMessage(form, '✅ Redirecting you to WhatsApp for immediate support...', 'success');

      setTimeout(() => {
        window.open(`https://wa.me/918132958338?text=${encodeURIComponent(wa)}`, '_blank', 'noopener,noreferrer');
        form.reset();
      }, 1200);
    });
  }

  function showFormMessage(form, text, type) {
    let msg = form.querySelector('.form-msg');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'form-msg';
      msg.style.cssText = 'padding:12px 16px;border-radius:8px;font-size:0.9rem;margin-bottom:16px;transition:all 0.3s ease;';
      const btn = form.querySelector('button[type="submit"]');
      form.insertBefore(msg, btn);
    }
    msg.textContent = text;
    msg.style.background = type === 'success' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)';
    msg.style.border = `1px solid ${type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`;
    msg.style.color = type === 'success' ? '#22c55e' : '#ef4444';
  }

  handleFormSubmit('hostForm');
  handleFormSubmit('agencyForm');
  handleFormSubmit('contactForm');

  // ====== SMOOTH SCROLL ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ====== ANIMATE ON SCROLL ======
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    const animatable = document.querySelectorAll(
      '.benefit-card, .step-card, .why-card, .program-card, .blog-card, .elig-item, .faq-item, .info-stat'
    );

    animatable.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.07}s, transform 0.5s ease ${(i % 6) * 0.07}s`;
      observer.observe(el);
    });
  }

})();
