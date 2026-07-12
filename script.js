/* =========================================================
   HollahOfficial.in — script.js
   Vanilla JavaScript. No libraries.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("primaryMenu");

  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
  }

  function openMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "true");
    navMenu.classList.add("is-open");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        navToggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (!isOpen) return;
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        closeMenu();
      }
    });
  }

  /* ---------- Header scroll state ---------- */
  var siteHeader = document.getElementById("siteHeader");
  if (siteHeader) {
    var updateHeaderState = function () {
      if (window.scrollY > 8) {
        siteHeader.classList.add("is-scrolled");
      } else {
        siteHeader.classList.remove("is-scrolled");
      }
    };
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  /* ---------- Active nav link ---------- */
  (function setActiveNavLink() {
    var current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(function (link) {
      var href = link.getAttribute("href");
      var hrefPage = href.split("#")[0] || "index.html";
      if (hrefPage === current || (hrefPage === "index.html" && current === "")) {
        if (href.indexOf("#") === -1 || hrefPage === current) {
          link.classList.add("active");
        }
      }
    });
  })();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-question").forEach(function (button) {
    var answer = document.getElementById(button.getAttribute("aria-controls"));
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".faq-question").forEach(function (otherButton) {
        if (otherButton !== button) {
          otherButton.setAttribute("aria-expanded", "false");
          var otherAnswer = document.getElementById(otherButton.getAttribute("aria-controls"));
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });
      button.setAttribute("aria-expanded", String(!expanded));
      if (answer) {
        answer.style.maxHeight = expanded ? null : answer.scrollHeight + "px";
      }
    });
  });

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById("backToTop");
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Copyright year ---------- */
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Contact form: WhatsApp message generator + validation ---------- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    var fields = {
      name: document.getElementById("contactName"),
      whatsapp: document.getElementById("contactWhatsapp"),
      enquiry: document.getElementById("contactEnquiry"),
      message: document.getElementById("contactMessage"),
      consent: document.getElementById("contactConsent")
    };
    var successBox = document.getElementById("contactSuccess");

    function showError(field, show) {
      var group = field.closest(".form-group");
      if (group) group.classList.toggle("has-error", show);
    }

    function validateForm() {
      var isValid = true;

      if (!fields.name.value.trim()) {
        showError(fields.name, true);
        isValid = false;
      } else {
        showError(fields.name, false);
      }

      var whatsappPattern = /^[0-9+\s-]{7,15}$/;
      if (!whatsappPattern.test(fields.whatsapp.value.trim())) {
        showError(fields.whatsapp, true);
        isValid = false;
      } else {
        showError(fields.whatsapp, false);
      }

      if (!fields.enquiry.value) {
        showError(fields.enquiry, true);
        isValid = false;
      } else {
        showError(fields.enquiry, false);
      }

      if (!fields.message.value.trim()) {
        showError(fields.message, true);
        isValid = false;
      } else {
        showError(fields.message, false);
      }

      if (!fields.consent.checked) {
        showError(fields.consent, true);
        isValid = false;
      } else {
        showError(fields.consent, false);
      }

      return isValid;
    }

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (successBox) successBox.classList.remove("is-visible");

      if (!validateForm()) {
        return;
      }

      var lines = [
        "Hello, I need help with Hollah registration.",
        "Name: " + fields.name.value.trim(),
        "WhatsApp Number: " + fields.whatsapp.value.trim(),
        "Enquiry Type: " + fields.enquiry.options[fields.enquiry.selectedIndex].text,
        "Message: " + fields.message.value.trim()
      ];
      var text = encodeURIComponent(lines.join("\n"));
      var whatsappUrl = "https://wa.me/918132958338?text=" + text;

      if (successBox) {
        successBox.textContent = "Thank you. Opening WhatsApp with your details now.";
        successBox.classList.add("is-visible");
      }

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      contactForm.reset();
    });

    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      if (!field) return;
      var eventName = field.type === "checkbox" ? "change" : "input";
      field.addEventListener(eventName, function () {
        showError(field, false);
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
