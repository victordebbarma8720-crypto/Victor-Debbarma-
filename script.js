/* ===========================
   DarlingC Agency India
   script.js - Main JavaScript
   =========================== */

(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var primaryNav = document.getElementById("primary-nav");

  function closeMenu() {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  }

  function openMenu() {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute("aria-expanded", "true");
    primaryNav.classList.add("is-open");
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
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
      var withinNav = primaryNav.contains(event.target) || navToggle.contains(event.target);
      if (!withinNav) {
        closeMenu();
      }
    });
  }

  /* ---------- FAQ / expandable accordions ---------- */
  var accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      var panelId = trigger.getAttribute("aria-controls");
      var panel = panelId ? document.getElementById(panelId) : null;

      trigger.setAttribute("aria-expanded", String(!expanded));

      if (panel) {
        if (expanded) {
          panel.setAttribute("hidden", "");
        } else {
          panel.removeAttribute("hidden");
          if (trigger.classList.contains("read-more")) {
            panel.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    var currentYear = new Date().getFullYear();
    yearEl.textContent = currentYear >= 2026 ? String(currentYear) : "2026";
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  var contactForm = document.getElementById("contact-form");

  if (contactForm) {
    var whatsappNumber = "918132958338";

    var fields = {
      name: { el: document.getElementById("cf-name"), label: "Name", required: true },
      age: { el: document.getElementById("cf-age"), label: "Age", required: true },
      country: { el: document.getElementById("cf-country"), label: "Country", required: true },
      phone: { el: document.getElementById("cf-phone"), label: "Registration phone number", required: true },
      darlingcId: { el: document.getElementById("cf-id"), label: "DarlingC ID", required: false },
      message: { el: document.getElementById("cf-message"), label: "Message", required: true }
    };

    function showError(fieldEl, show) {
      if (!fieldEl) return;
      var row = fieldEl.closest(".form-row");
      if (!row) return;
      if (show) {
        row.classList.add("has-error");
      } else {
        row.classList.remove("has-error");
      }
    }

    function validateForm() {
      var isValid = true;
      Object.keys(fields).forEach(function (key) {
        var field = fields[key];
        if (!field.el) return;
        var value = field.el.value.trim();
        if (field.required && value === "") {
          showError(field.el, true);
          isValid = false;
        } else {
          showError(field.el, false);
        }
      });
      return isValid;
    }

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var statusEl = document.getElementById("form-status");

      if (!validateForm()) {
        if (statusEl) {
          statusEl.textContent = "Please complete all required fields before sending your message.";
          statusEl.className = "form-status error";
        }
        return;
      }

      var lines = [
        "Hello, I need help with DarlingC host or agency registration.",
        "Name: " + fields.name.el.value.trim(),
        "Age: " + fields.age.el.value.trim(),
        "Country: " + fields.country.el.value.trim(),
        "Phone: " + fields.phone.el.value.trim()
      ];

      if (fields.darlingcId.el && fields.darlingcId.el.value.trim() !== "") {
        lines.push("DarlingC ID: " + fields.darlingcId.el.value.trim());
      }

      lines.push("Message: " + fields.message.el.value.trim());

      var text = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + whatsappNumber + "?text=" + text;

      if (statusEl) {
        statusEl.textContent = "Opening WhatsApp with your details...";
        statusEl.className = "form-status success";
      }

      window.open(url, "_blank", "noopener,noreferrer");
    });

    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      if (field.el) {
        field.el.addEventListener("input", function () {
          showError(field.el, false);
        });
      }
    });
  }
})();
