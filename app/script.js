/*Set theme before first paint to avoid a flash of the wrong colors */

  (function () {
    var stored = localStorage.getItem('theme-preference') || 'system';
    var resolved = stored === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : stored;
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.setAttribute('data-theme-preference', stored);
  })();
/*-----------------------------------------*/

(function () {
    'use strict';
 
    /* ---------- THEME TOGGLE ---------- */
    var root = document.documentElement;
    var toggleButtons = document.querySelectorAll('[data-theme-choice]');
    var media = window.matchMedia('(prefers-color-scheme: dark)');
 
    function applyTheme(preference) {
      var resolved = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
      root.setAttribute('data-theme', resolved);
      root.setAttribute('data-theme-preference', preference);
      toggleButtons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(btn.dataset.themeChoice === preference));
      });
      localStorage.setItem('theme-preference', preference);
    }
 
    // Initialize button states to match what the inline head-script already set
    applyTheme(localStorage.getItem('theme-preference') || 'system');
 
    toggleButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.dataset.themeChoice);
      });
    });
 
    media.addEventListener('change', function () {
      if (root.getAttribute('data-theme-preference') === 'system') {
        applyTheme('system');
      }
    });
 
    /* ---------- MOBILE MENU ---------- */
    var menuToggle = document.getElementById('menuToggle');
    var mobileNav = document.getElementById('mobileNav');
 
    function closeMenu() {
      mobileNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    }
    function openMenu() {
      mobileNav.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close menu');
    }
 
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
 
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
 
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
 
    /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
    var sections = document.querySelectorAll('main section[id]');
    var navLinks = document.querySelectorAll('.primary-nav a');
 
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.closest('li').classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
 
    sections.forEach(function (section) { observer.observe(section); });
 
    /* ---------- CONTACT FORM ---------- */
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
 
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
      if (!name || !email || !message) {
        status.textContent = 'Please fill in every field before sending.';
        status.className = 'form-status is-error';
        return;
      }
      if (!emailPattern.test(email)) {
        status.textContent = 'That email address doesn\'t look quite right.';
        status.className = 'form-status is-error';
        return;
      }
 
      // TODO: replace this mailto handoff with a real form backend (Formspree, Netlify Forms, etc.)
      var subject = encodeURIComponent('New project inquiry from ' + name);
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:name@example.com?subject=' + subject + '&body=' + body;
 
      status.textContent = 'Opening your email app to send this to Michelle…';
      status.className = 'form-status is-success';
    });
 
    /* ---------- FOOTER YEAR ---------- */
    document.getElementById('year').textContent = new Date().getFullYear();
  })();