/* =========================================================
   SitarliveAgency.in — Global Script
   Defensive, dependency-free JavaScript.
   ========================================================= */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile Navigation ---------- */
  var hamburger = document.querySelector(".hamburger");
  var navLinks = document.querySelector(".nav-links");

  function closeMenu() {
    if (!hamburger || !navLinks) return;
    hamburger.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  }

  function toggleMenu() {
    if (!hamburger || !navLinks) return;
    var expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("is-open", !expanded);
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", toggleMenu);

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Sticky Header Visual State ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var updateHeader = function () {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* ---------- FAQ Accordion ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        var otherQuestion = other.querySelector(".faq-question");
        if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Scroll Reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ---------- Active Navigation Highlighting ---------- */
  (function highlightActiveNav() {
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    var navAnchors = document.querySelectorAll(".nav-links a");

    navAnchors.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var hrefPage = href.split("#")[0] || "index.html";
      if (hrefPage === "" ) hrefPage = "index.html";
      if (hrefPage === currentPage && !href.includes("#")) {
        a.classList.add("active");
      }
    });

    if (currentPage === "index.html" || currentPage === "") {
      var sections = ["about", "contact"];
      var sectionEls = sections
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);

      if (sectionEls.length && "IntersectionObserver" in window) {
        var navByHash = {};
        navAnchors.forEach(function (a) {
          var href = a.getAttribute("href") || "";
          var hash = href.split("#")[1];
          if (hash) navByHash[hash] = a;
        });

        var sectionObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              var link = navByHash[entry.target.id];
              if (!link) return;
              if (entry.isIntersecting) {
                navAnchors.forEach(function (a) { a.classList.remove("active"); });
                link.classList.add("active");
              }
            });
          },
          { threshold: 0.3, rootMargin: "-40% 0px -40% 0px" }
        );

        sectionEls.forEach(function (el) { sectionObserver.observe(el); });
      }
    }
  })();

  /* ---------- Smooth Anchor Scrolling ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href*="#"]');
    if (!link) return;

    var url = new URL(link.href, window.location.href);
    var samePage = url.pathname === window.location.pathname || url.pathname.endsWith(window.location.pathname);
    var hash = url.hash;
    if (!hash || !samePage) return;

    var target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    history.pushState(null, "", hash);
  });

  /* ---------- Back to Top ---------- */
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    var toggleBackToTop = function () {
      if (window.scrollY > 480) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    };
    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Footer Year ---------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Image Error Fallback ---------- */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function () {
      img.classList.add("img-error");
    });
  });
})();
