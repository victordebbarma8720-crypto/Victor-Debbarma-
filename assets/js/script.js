/* =========================================================
   SitarliveAgency.in — Global Script (Vanilla JS, no deps)
   ========================================================= */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Mobile Navigation ---------- */
  function initMobileNav() {
    var toggle = document.querySelector(".hamburger");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* ---------- Sticky Header Shadow ---------- */
  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Active Navigation Highlighting ---------- */
  function initActiveNav() {
    var links = document.querySelectorAll(".main-nav a");
    if (!links.length) return;

    var currentPath = window.location.pathname.split("/").pop() || "index.html";
    var currentHash = window.location.hash;

    links.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var hrefPath = href.split("#")[0] || "index.html";
      var hrefHash = href.includes("#") ? "#" + href.split("#")[1] : "";

      var samePage =
        hrefPath === currentPath ||
        (hrefPath === "index.html" && currentPath === "");

      if (hrefHash) {
        if (samePage && hrefHash === currentHash) {
          link.classList.add("active");
        }
      } else if (samePage && !currentHash) {
        link.classList.add("active");
      }
    });
  }

  /* ---------- FAQ Accordion (native <details>, enhanced) ---------- */
  function initFaqAccordion() {
    var faqItems = document.querySelectorAll(".faq-item");
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          faqItems.forEach(function (other) {
            if (other !== item) other.removeAttribute("open");
          });
        }
      });
    });
  }

  /* ---------- Scroll Reveal (Intersection Observer) ---------- */
  function initScrollReveal() {
    var revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Back To Top ---------- */
  function initBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;

    function onScroll() {
      if (window.scrollY > 500) {
        btn.classList.add("is-visible");
      } else {
        btn.classList.remove("is-visible");
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* ---------- Footer Current Year ---------- */
  function initCurrentYear() {
    var yearEls = document.querySelectorAll("[data-current-year]");
    var year = new Date().getFullYear();
    yearEls.forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ---------- Copy Agency Code ---------- */
  function initCopyCode() {
    var buttons = document.querySelectorAll("[data-copy-target]");
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      var targetId = btn.getAttribute("data-copy-target");
      var target = document.getElementById(targetId);
      if (!target) return;

      btn.addEventListener("click", function () {
        var text = target.textContent.trim();

        function showCopied() {
          btn.classList.add("is-copied");
          var original = btn.getAttribute("aria-label");
          btn.setAttribute("aria-label", "Copied " + text + " to clipboard");
          window.setTimeout(function () {
            btn.classList.remove("is-copied");
            btn.setAttribute("aria-label", original);
          }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(showCopied, showCopied);
        } else {
          var temp = document.createElement("textarea");
          temp.value = text;
          temp.style.position = "fixed";
          temp.style.opacity = "0";
          document.body.appendChild(temp);
          temp.select();
          try {
            document.execCommand("copy");
          } catch (e) {
            /* clipboard unavailable, ignore */
          }
          document.body.removeChild(temp);
          showCopied();
        }
      });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initStickyHeader();
    initActiveNav();
    initFaqAccordion();
    initScrollReveal();
    initBackToTop();
    initCurrentYear();
    initCopyCode();
  });
})();
