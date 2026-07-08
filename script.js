/* ===========================
   Vone Agency India
   script.js - Main JavaScript
   =========================== */

(function () {
  'use strict';

  /* ===========================
     STICKY HEADER
     =========================== */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===========================
     HAMBURGER MENU
     =========================== */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!header.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ===========================
     ACTIVE NAV LINK
     =========================== */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const page = href.split('/').pop().split('#')[0] || 'index.html';
    if (page === currentPath || (currentPath === '' && page === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ===========================
     FAQ ACCORDION
     =========================== */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });

      // Open clicked if was closed
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ===========================
     AOS SCROLL ANIMATIONS
     =========================== */
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-aos-delay') || '0');
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
        aosObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

  /* ===========================
     SCROLL TO TOP
     =========================== */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===========================
     CONTACT FORM
     =========================== */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate async submission
      setTimeout(() => {
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;

        const successMsg = document.querySelector('.form-success');
        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 5000);
        }
      }, 1000);
    });
  }

  /* ===========================
     BLOG SEARCH FILTER
     =========================== */
  const blogSearch = document.querySelector('#blog-search');
  if (blogSearch) {
    blogSearch.addEventListener('input', () => {
      const q = blogSearch.value.toLowerCase().trim();
      document.querySelectorAll('.blog-card').forEach(card => {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
        const visible = !q || title.includes(q) || desc.includes(q);
        card.style.display = visible ? '' : 'none';
      });
    });
  }

  const blogSearchBtn = document.querySelector('.blog-search-btn');
  if (blogSearchBtn) {
    blogSearchBtn.addEventListener('click', () => {
      const input = document.querySelector('#blog-search');
      if (input) input.dispatchEvent(new Event('input'));
    });
  }

  /* ===========================
     BLOG CATEGORY FILTER
     =========================== */
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat');
      document.querySelectorAll('.blog-card').forEach(card => {
        if (!cat || cat === 'all') {
          card.style.display = '';
        } else {
          const cardCat = card.getAttribute('data-category') || '';
          card.style.display = cardCat === cat ? '' : 'none';
        }
      });
    });
  });

  /* ===========================
     SMOOTH HASH SCROLL
     =========================== */
  document.querySelectorAll('a[href*="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href') || '';
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const hash = href.slice(hashIndex + 1);
      const page = href.slice(0, hashIndex);
      const isCurrentPage = !page || page === currentPath || page === '' || page === 'index.html';

      if (isCurrentPage && hash) {
        const target = document.getElementById(hash);
        if (target) {
          e.preventDefault();
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
          const top = target.getBoundingClientRect().top + window.scrollY - offset - 10;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ===========================
     COUNTER ANIMATION
     =========================== */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1500;
        const start = performance.now();

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* ===========================
     TABLE ROW HIGHLIGHT
     =========================== */
  document.querySelectorAll('.commission-table tbody tr, .level-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', () => row.classList.add('hovered'));
    row.addEventListener('mouseleave', () => row.classList.remove('hovered'));
  });

  /* ===========================
     LAZY LOAD IMAGES
     =========================== */
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(entries => {
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

    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }

  /* ===========================
     WHATSAPP BUTTON TOOLTIP
     =========================== */
  const waFloat = document.querySelector('.whatsapp-float');
  if (waFloat) {
    // Show tooltip after 3s
    setTimeout(() => {
      const tooltip = waFloat.querySelector('.whatsapp-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(0)';
        setTimeout(() => {
          tooltip.style.opacity = '';
          tooltip.style.transform = '';
        }, 3000);
      }
    }, 3000);
  }

  /* ===========================
     PHONE NUMBER FORMATTER
     =========================== */
  const phoneInput = document.querySelector('input[type="tel"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', e => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 10) val = val.slice(0, 10);
      e.target.value = val;
    });
  }

})();
