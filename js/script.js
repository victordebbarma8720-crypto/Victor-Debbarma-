/* ==========================================================================
   SitarliveOfficial.in — Vanilla JS interactions
   ========================================================================== */
(function () {
  "use strict";

  var WHATSAPP_URL = "https://wa.me/918132958338?text=Hello%20I%20want%20to%20join%20Sitarlive%20as%20an%20Agency.%20Please%20guide%20me.";
  var WHATSAPP_BASE = "https://wa.me/918132958338";
  var APK_URL = "https://staticstorge.com/live/package/20260706/sitar_live_v1.0.3.3-10033_20260706102224-release.apk";
  var AGENCY_CODE = "C063";

  document.addEventListener("DOMContentLoaded", function () {
    initNavbar();
    initSmoothScroll();
    initActiveNav();
    initCopyCode();
    initHostDownload();
    initAgencyCTA();
    initFaq();
    initCounters();
    initReveal();
    initWhatsAppPopup();
    initModalClosers();
    initFooterYear();
  });

  /* -------------------- Navbar: scroll blur + mobile menu -------------------- */
  function initNavbar() {
    var navbar = document.querySelector(".navbar");
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 12) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var isOpen = links.classList.toggle("open");
        toggle.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("open");
          toggle.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* -------------------- Smooth scroll for in-page anchors -------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href*="#"]').forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href) return;
      var hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      var path = href.substring(0, hashIndex);
      var hash = href.substring(hashIndex + 1);
      var samePage = path === "" || path === window.location.pathname.split("/").pop() || (path === "index.html" && (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("index.html")));
      if (!hash || !samePage) return;

      link.addEventListener("click", function (e) {
        var target = document.getElementById(hash);
        if (target) {
          e.preventDefault();
          var headerH = document.querySelector(".navbar") ? document.querySelector(".navbar").offsetHeight : 0;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerH + 1;
          window.scrollTo({ top: top, behavior: "smooth" });
          history.pushState(null, "", "#" + hash);
        }
      });
    });
  }

  /* -------------------- Active nav link highlight -------------------- */
  function initActiveNav() {
    var links = document.querySelectorAll(".nav-links a[href]");
    var currentFile = window.location.pathname.split("/").pop() || "index.html";
    var sections = [];

    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("https://wa.me")) return;

      var hashIndex = href.indexOf("#");
      var file = hashIndex === -1 ? href : href.substring(0, hashIndex);
      var hash = hashIndex === -1 ? null : href.substring(hashIndex + 1);
      if (file === "") file = "index.html";

      if (file === currentFile && hash) {
        var section = document.getElementById(hash);
        if (section) sections.push({ link: link, section: section });
      } else if (file === currentFile && !hash) {
        link.classList.add("active");
      }
    });

    if (!sections.length) return;

    function onScroll() {
      var scrollPos = window.scrollY + 140;
      var activeSet = false;
      for (var i = sections.length - 1; i >= 0; i--) {
        if (sections[i].section.offsetTop <= scrollPos) {
          sections.forEach(function (s) { s.link.classList.remove("active"); });
          sections[i].link.classList.add("active");
          activeSet = true;
          break;
        }
      }
      if (!activeSet) sections.forEach(function (s) { s.link.classList.remove("active"); });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------- Copy Agency Code -------------------- */
  function initCopyCode() {
    document.querySelectorAll(".copy-code-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var code = btn.getAttribute("data-code") || AGENCY_CODE;
        copyText(code).then(function () {
          btn.classList.add("copied");
          setTimeout(function () { btn.classList.remove("copied"); }, 1800);
        });
      });
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
    }
    return new Promise(function (resolve) {
      fallbackCopy(text);
      resolve();
    });
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* no-op */ }
    document.body.removeChild(ta);
  }

  /* -------------------- Join as Host: APK download + popup -------------------- */
  function initHostDownload() {
    var triggers = document.querySelectorAll("[data-action='download-host']");
    var modal = document.getElementById("downloadModal");
    if (!triggers.length) return;

    triggers.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        triggerApkDownload();
        if (modal) openModal(modal);
      });
    });
  }

  function triggerApkDownload() {
    var link = document.createElement("a");
    link.href = APK_URL;
    link.setAttribute("download", "sitar_live_v1.0.3.3.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /* -------------------- Join as Agency: WhatsApp -------------------- */
  function initAgencyCTA() {
    document.querySelectorAll("[data-action='join-agency']").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        window.open(WHATSAPP_URL, "_blank", "noopener");
      });
    });
  }

  /* -------------------- Modal helpers -------------------- */
  function openModal(modal) {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function initModalClosers() {
    document.querySelectorAll(".modal-overlay").forEach(function (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal(modal);
      });
      modal.querySelectorAll("[data-close-modal]").forEach(function (btn) {
        btn.addEventListener("click", function () { closeModal(modal); });
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.show").forEach(function (m) { closeModal(m); });
      }
    });
  }

  /* -------------------- FAQ accordion -------------------- */
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var question = item.querySelector(".faq-question");
      if (!question) return;
      question.addEventListener("click", function () {
        var wasOpen = item.classList.contains("open");
        item.closest(".faq-list").querySelectorAll(".faq-item.open").forEach(function (open) {
          if (open !== item) {
            open.classList.remove("open");
            open.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("open", !wasOpen);
        question.setAttribute("aria-expanded", (!wasOpen).toString());
      });
    });
  }

  /* -------------------- Animated counters -------------------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  /* -------------------- Scroll reveal animations -------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* -------------------- WhatsApp auto popup (after 3s) -------------------- */
  function initWhatsAppPopup() {
    var popup = document.getElementById("waPopup");
    if (!popup) return;
    var dismissed = sessionStorage.getItem("waPopupDismissed");
    if (dismissed) return;

    setTimeout(function () {
      popup.classList.add("show");
    }, 3000);

    popup.querySelectorAll("[data-close-wa-popup]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        popup.classList.remove("show");
        sessionStorage.setItem("waPopupDismissed", "1");
      });
    });
  }

  /* -------------------- Footer year -------------------- */
  function initFooterYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  // expose for inline handlers if ever needed
  window.Sitarlive = {
    WHATSAPP_BASE: WHATSAPP_BASE,
    AGENCY_CODE: AGENCY_CODE
  };
})();
