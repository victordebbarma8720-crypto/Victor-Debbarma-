/* KamaichatOfficial.in — Main JavaScript (vanilla JS, no dependencies) */
(function () {
  "use strict";

  // ---------- Mobile navigation ----------
  var navToggle = document.querySelector(".nav-toggle");
  var navActions = document.querySelector(".nav-actions");

  if (navToggle && navActions) {
    navToggle.addEventListener("click", function () {
      var isOpen = navActions.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navActions.querySelectorAll(".nav-menu a").forEach(function (link) {
      link.addEventListener("click", function () {
        navActions.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navActions.classList.contains("is-open")) {
        navActions.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  // ---------- Active nav link ----------
  var currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll(".nav-menu a").forEach(function (link) {
    var linkPath = link.getAttribute("href");
    if (!linkPath) return;
    if (linkPath === currentPath || (linkPath !== "/" && currentPath.indexOf(linkPath) === 0)) {
      link.setAttribute("aria-current", "page");
    }
  });

  // ---------- FAQ accordion ----------
  document.querySelectorAll(".faq-question").forEach(function (button) {
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      var answer = document.getElementById(button.getAttribute("aria-controls"));

      button.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (answer) {
        answer.setAttribute("data-open", expanded ? "false" : "true");
      }
    });
  });

  // ---------- Footer year ----------
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
