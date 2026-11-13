/* Kamaichat Official — site script (vanilla JS, no dependencies) */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setNav(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1000) setNav(false);
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Footer year ---------- */
  var years = document.querySelectorAll("[data-year]");
  for (var y = 0; y < years.length; y++) years[y].textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Registration tabs (Host / Agency) ---------- */
  var tabs = document.querySelectorAll("[role='tab']");
  function selectTab(name, focus) {
    tabs.forEach(function (tab) {
      var on = tab.getAttribute("data-tab") === name;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(tab.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
      if (on && focus) tab.focus();
    });
  }
  if (tabs.length) {
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        selectTab(tab.getAttribute("data-tab"));
        if (history.replaceState) history.replaceState(null, "", "?type=" + tab.getAttribute("data-tab"));
      });
      tab.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        var next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        selectTab(next.getAttribute("data-tab"), true);
      });
    });
    var params = new URLSearchParams(window.location.search);
    var type = params.get("type") || (window.location.hash || "").replace("#", "");
    selectTab(type === "agency" ? "agency" : "host");
  }

  /* ---------- Forms -> WhatsApp ---------- */
  function fieldWrap(el) { return el.closest(".field") || el.parentNode; }

  function setError(el, msg) {
    var wrap = fieldWrap(el);
    var err = wrap.querySelector(".error");
    wrap.classList.toggle("invalid", !!msg);
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg || "";
  }

  function validate(el) {
    var v = (el.value || "").trim();
    if (el.type === "checkbox") {
      if (el.required && !el.checked) return "Please tick this box to continue.";
      return "";
    }
    if (el.required && !v) return "This field is required.";
    if (!v) return "";
    if (el.name === "phone" && !/^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""))) {
      return "Enter a valid 10-digit Indian mobile number.";
    }
    if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address.";
    if (el.name === "age") {
      var n = parseInt(v, 10);
      if (isNaN(n) || n < 18) return "You must be 18 or older to register.";
      if (n > 80) return "Please enter a valid age.";
    }
    if (el.name === "name" && v.length < 2) return "Please enter your full name.";
    return "";
  }

  var forms = document.querySelectorAll("form[data-wa-form]");
  forms.forEach(function (form) {
    var status = form.querySelector(".form-status");
    var inputs = Array.prototype.filter.call(
      form.querySelectorAll("input, select, textarea"),
      function (el) { return !el.closest(".hp"); }
    );

    inputs.forEach(function (el) {
      el.addEventListener("blur", function () { if (el.value || el.type === "checkbox") setError(el, validate(el)); });
      el.addEventListener("input", function () {
        if (fieldWrap(el).classList.contains("invalid")) setError(el, validate(el));
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      inputs.forEach(function (el) {
        var msg = validate(el);
        setError(el, msg);
        if (msg && !firstBad) firstBad = el;
      });

      // Honeypot: bots fill hidden fields.
      var trap = form.querySelector(".hp input");
      if (trap && trap.value) return;

      if (firstBad) {
        if (status) {
          status.className = "form-status show bad";
          status.textContent = "Please fix the highlighted fields and try again.";
        }
        firstBad.focus();
        return;
      }

      var lines = [form.getAttribute("data-title") || "New enquiry from kamaichatofficial.in", ""];
      inputs.forEach(function (el) {
        if (el.type === "checkbox" || !el.value.trim()) return;
        var label = el.getAttribute("data-label") || el.name;
        var val = el.value.trim();
        if (el.name === "phone") val = "+91 " + val.replace(/[\s-]/g, "");
        lines.push(label + ": " + val);
      });

      var number = form.getAttribute("data-wa") || "";
      var url = "https://wa.me/" + number + "?text=" + encodeURIComponent(lines.join("\n"));

      if (status) {
        status.className = "form-status show ok";
        status.innerHTML = "Thank you! WhatsApp is opening with your details. Just press <strong>Send</strong> to finish. " +
          "If it doesn't open, <a href=\"" + url + "\" target=\"_blank\" rel=\"noopener\">tap here</a>.";
      }
      // window.open with "noopener" always returns null, so clear opener manually.
      var win = window.open(url, "_blank");
      if (win) { try { win.opener = null; } catch (err) { /* ignore */ } }
      else window.location.href = url;
      form.reset();
    });
  });
})();
