/* ===========================
   CherryOfficial.in
   script.js - Main JavaScript
   =========================== */

(function () {
  'use strict';

  var WHATSAPP_NUMBER = '918132958338';

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
    var setMenu = function (open) {
      mobileMenu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    hamburger.addEventListener('click', function () {
      setMenu(hamburger.getAttribute('aria-expanded') !== 'true');
    });

    // Close when a link is chosen (including same-page anchors like /#contact)
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        setMenu(false);
        hamburger.focus();
      }
    });

    // Reset if the viewport grows past the mobile breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > 920 && mobileMenu.classList.contains('open')) setMenu(false);
    });
  }

  /* ===========================
     HIDE MISSING BRAND IMAGES
     Keeps the layout clean until logo/hero files are uploaded.
     =========================== */
  document.querySelectorAll('img[data-hide-on-error]').forEach(function (img) {
    var hide = function () {
      var wrapper = img.closest('[data-image-wrapper]');
      (wrapper || img).style.display = 'none';
    };
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide);
  });

  /* ===========================
     CONTACT FORM -> WHATSAPP
     Builds a WhatsApp message from the form; nothing is stored on this site.
     =========================== */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var errorBox = contactForm.querySelector('.form-error');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.elements.name.value.trim();
      var topic = contactForm.elements.topic.value;
      var message = contactForm.elements.message.value.trim();

      if (!name || !message) {
        errorBox.textContent = 'Please enter your name and a short message.';
        errorBox.classList.add('visible');
        (name ? contactForm.elements.message : contactForm.elements.name).focus();
        return;
      }

      errorBox.classList.remove('visible');

      var text = 'Hello, my name is ' + name + '.\n' +
        'Topic: ' + topic + '\n\n' + message;

      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }

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
