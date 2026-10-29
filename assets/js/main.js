/* ===========================
   ChametOfficialAgency.in
   assets/js/main.js - Main JavaScript (no libraries)
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
     FOOTER YEAR
     =========================== */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

})();
