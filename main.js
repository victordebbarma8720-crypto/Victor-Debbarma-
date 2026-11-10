/* ===========================
   ChametOfficialAgency.in
   main.js - Main JavaScript (no libraries)
   =========================== */

(function () {
  'use strict';

  /* ===========================
     STICKY HEADER
     =========================== */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===========================
     HAMBURGER MENU
     =========================== */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    var menuLinks = mobileMenu.querySelectorAll('a');

    var setMenu = function (open) {
      mobileMenu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open && menuLinks.length) menuLinks[0].focus();
    };

    hamburger.addEventListener('click', function () {
      setMenu(hamburger.getAttribute('aria-expanded') !== 'true');
    });

    // Close when a link is chosen (including same-page anchors like #contact)
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (!mobileMenu.classList.contains('open')) return;

      if (e.key === 'Escape') {
        setMenu(false);
        hamburger.focus();
        return;
      }

      // Keep keyboard focus inside the open menu (menu links + the close button)
      if (e.key === 'Tab' && menuLinks.length) {
        var first = hamburger;
        var last = menuLinks[menuLinks.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Reset if the viewport grows past the mobile breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > 920 && mobileMenu.classList.contains('open')) setMenu(false);
    });
  }

  /* ===========================
     HIDE MISSING BRAND IMAGES
     Keeps the layout clean if an image file has not been uploaded yet.
     =========================== */
  document.querySelectorAll('img[data-hide-on-error]').forEach(function (img) {
    var hide = function () {
      var wrapper = img.closest('[data-image-wrapper]');
      (wrapper || img).classList.add('is-missing');
    };
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide);
  });

  /* ===========================
     BLOG SEARCH FILTER
     =========================== */
  var blogSearch = document.getElementById('blog-search');
  if (blogSearch) {
    var cards = document.querySelectorAll('.blog-card');
    var emptyMsg = document.querySelector('.blog-empty');

    blogSearch.addEventListener('input', function () {
      var q = blogSearch.value.toLowerCase().trim();
      var shown = 0;

      cards.forEach(function (card) {
        var visible = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
        card.hidden = !visible;
        if (visible) shown++;
      });

      if (emptyMsg) emptyMsg.classList.toggle('visible', shown === 0);
    });
  }

  /* ===========================
     CALCULATORS (illustrative arithmetic only)
     =========================== */
  var num = function (el) {
    var v = parseFloat(el.value);
    return isFinite(v) && v >= 0 ? v : null;
  };
  var fmt = function (v, max) {
    return v.toLocaleString('en-US', { maximumFractionDigits: max });
  };
  var usd = function (v) {
    return '$' + v.toLocaleString('en-US', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 });
  };

  document.querySelectorAll('[data-calc]').forEach(function (box) {
    var inputs = box.querySelectorAll('input');
    var out = box.querySelector('output');
    var type = box.getAttribute('data-calc');

    var update = function () {
      var a = num(inputs[0]);
      var b = num(inputs[1]);
      if (a === null || b === null || (type === 'beans' && b === 0) || (type === 'commission' && b > 100)) {
        out.textContent = type === 'beans'
          ? 'Enter a Beans amount and a ratio above zero.'
          : 'Enter a revenue amount and a rate between 0 and 100.';
        return;
      }
      if (type === 'commission') {
        out.innerHTML = usd(a) + ' &times; ' + fmt(b, 2) + '% = <strong>' + usd(a * b / 100) + '</strong>';
      } else {
        out.innerHTML = fmt(a, 0) + ' Beans &divide; ' + fmt(b, 2) + ' = <strong>' + usd(a / b) + '</strong>';
      }
    };

    inputs.forEach(function (input) { input.addEventListener('input', update); });
    update();
  });

  /* ===========================
     REVEAL ON SCROLL
     Only elements that start below the fold are animated, so nothing that is
     already on screen flickers. Content stays visible without JavaScript.
     =========================== */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealTargets = document.querySelectorAll(
      '.section-header, .overview-grid > *, .grid-2 > *, .grid-3 > *, .grid-4 > *, ' +
      '.steps > li, .blog-grid > *, .faq-item, .about-grid > *, .contact-card, .cta-band, .trust-item, ' +
      '.calculator, .table-wrapper, .footer-grid > *'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    document.documentElement.classList.add('js');
    revealTargets.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--delay', Math.min(siblings % 4, 3) * 0.08 + 's');
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ===========================
     FOOTER YEAR
     =========================== */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

})();
