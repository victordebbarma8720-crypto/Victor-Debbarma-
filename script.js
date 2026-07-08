/* =========================================================
   YOMI OFFICIAL — script.js
   Vanilla JavaScript. No dependencies.
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initMobileMenu();
    initThemeToggle();
    initFaqAccordion();
    initScrollSpy();
    initScrollTop();
    initAos();
    initStatCounters();
    initSmoothAnchors();
  });

  /* ---------- Sticky header shadow on scroll ---------- */
  function initHeaderScroll() {
    var header = document.querySelector(".header");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 12) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu toggle ---------- */
  function initMobileMenu() {
    var hamburger = document.querySelector(".hamburger");
    var menu = document.getElementById("mobile-menu");
    if (!hamburger || !menu) return;

    function closeMenu() {
      hamburger.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
      document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", function () {
      var expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("open");
      document.body.style.overflow = expanded ? "" : "hidden";
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Dark mode toggle ---------- */
  function initThemeToggle() {
    var toggle = document.querySelector(".theme-toggle");
    var root = document.documentElement;
    var stored = null;
    try {
      stored = localStorage.getItem("yomi-theme");
    } catch (e) { /* localStorage unavailable */ }

    if (stored === "dark" || stored === "light") {
      root.setAttribute("data-theme", stored);
    }

    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      var isDark = current ? current === "dark" : prefersDark;
      var next = isDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("yomi-theme", next);
      } catch (e) { /* localStorage unavailable */ }
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaqAccordion() {
    var questions = document.querySelectorAll(".faq-question");
    questions.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        var answer = document.getElementById(btn.getAttribute("aria-controls"));

        // Close other items within the same faq-list for a clean accordion feel
        var list = btn.closest(".faq-list");
        if (list) {
          list.querySelectorAll(".faq-question[aria-expanded='true']").forEach(function (other) {
            if (other !== btn) {
              other.setAttribute("aria-expanded", "false");
              var otherAnswer = document.getElementById(other.getAttribute("aria-controls"));
              if (otherAnswer) otherAnswer.style.maxHeight = null;
            }
          });
        }

        btn.setAttribute("aria-expanded", String(!expanded));
        if (answer) {
          answer.style.maxHeight = expanded ? null : answer.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Scroll spy for active nav link ---------- */
  function initScrollSpy() {
    var sections = document.querySelectorAll("main section[id]");
    var navLinks = document.querySelectorAll(".nav-links a[href^='#'], .mobile-menu a[href^='#']");
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            var match = link.getAttribute("href") === "#" + id;
            if (match) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- Scroll-to-top button ---------- */
  function initScrollTop() {
    var btn = document.querySelector(".scroll-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("visible", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  function initAos() {
    var items = document.querySelectorAll("[data-aos]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("aos-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Animated stat counters ---------- */
  function initStatCounters() {
    var counters = document.querySelectorAll(".stat-number[data-count]");
    if (!counters.length) return;

    function animate(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1400;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var value = Math.floor(progress * target);
        el.textContent = value + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
        }
      }
      window.requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Smooth anchor scrolling fallback ---------- */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var hash = link.getAttribute("href");
        if (hash.length < 2) return;
        var target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", hash);
      });
    });
  }
})();
