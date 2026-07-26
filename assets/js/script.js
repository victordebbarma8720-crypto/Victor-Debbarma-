/* ==========================================================================
   SitarliveAgency.in — Global Script
   Defensive vanilla JS. No component throws if its markup is absent.
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScrollState();
    initMobileNav();
    initFaqAccordion();
    initScrollReveal();
    initActiveNavHighlight();
    initSmoothAnchorScroll();
    initBackToTop();
    initFooterYear();
    initImageFallback();
  });

  /* ---------- Sticky header visual state ---------- */
  function initHeaderScrollState() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    function toggleScrolled() {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    toggleScrolled();
    window.addEventListener("scroll", toggleScrolled, { passive: true });
  }

  /* ---------- Mobile navigation toggle ---------- */
  function initMobileNav() {
    var hamburger = document.getElementById("hamburger");
    var nav = document.getElementById("mainNav");
    if (!hamburger || !nav) return;

    function openMenu() {
      nav.classList.add("is-open");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      nav.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    var navLinks = nav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        hamburger.focus();
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaqAccordion() {
    var faqItems = document.querySelectorAll(".faq-item");
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var button = item.querySelector(".faq-question");
      var answer = item.querySelector(".faq-answer");
      if (!button || !answer) return;

      button.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");

        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove("is-open");
          var otherButton = otherItem.querySelector(".faq-question");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------- Scroll reveal via Intersection Observer ---------- */
  function initScrollReveal() {
    var revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Active navigation highlighting ---------- */
  function initActiveNavHighlight() {
    var navLinks = document.querySelectorAll(".nav-link");
    if (!navLinks.length) return;

    var currentPage = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href) return;
      var hrefPage = href.split("#")[0] || "index.html";

      if (
        hrefPage === currentPage ||
        (currentPage === "" && hrefPage === "index.html") ||
        (currentPage === "index.html" && hrefPage === "index.html" && !href.includes("#"))
      ) {
        if (href.includes("#") && hrefPage === "index.html" && currentPage === "index.html") {
          return;
        }
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- Smooth anchor scrolling (fallback for older browsers) ---------- */
  function initSmoothAnchorScroll() {
    var anchorLinks = document.querySelectorAll('a[href*="#"]');
    if (!anchorLinks.length) return;

    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    anchorLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        if (!href || href.indexOf("#") === -1) return;

        var parts = href.split("#");
        var path = parts[0];
        var hash = parts[1];
        if (!hash) return;

        var currentPath = window.location.pathname.split("/").pop() || "index.html";
        if (path && path !== "" && path !== currentPath) return;

        var target = document.getElementById(hash);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
        history.pushState(null, "", "#" + hash);
      });
    });
  }

  /* ---------- Back to top button ---------- */
  function initBackToTop() {
    var backToTop = document.getElementById("backToTop");
    if (!backToTop) return;

    function toggleVisibility() {
      if (window.scrollY > 400) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    }

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    backToTop.addEventListener("click", function () {
      var prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    var yearEl = document.getElementById("footerYear");
    if (!yearEl) return;
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Graceful image fallback ---------- */
  function initImageFallback() {
    var images = document.querySelectorAll("img[data-fallback-text]");
    if (!images.length) return;

    images.forEach(function (img) {
      img.addEventListener("error", function () {
        var wrapper = img.closest("[data-fallback-wrapper]") || img.parentElement;
        if (wrapper) {
          wrapper.classList.add("img-fallback-active");
        }
        img.style.display = "none";
      });
    });
  }
})();
