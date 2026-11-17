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
    /*var sections = document.querySelectorAll('main section[id]');
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
 
    sections.forEach(function (section) { observer.observe(section); });*/
    //^^ ABOVE CODE NEEDED DIDN'T ALLOW FOR ACTIVE NAV LINK BASED ON CURRENT PAGE.
    var navLinks = document.querySelectorAll('.primary-nav .nav-item > a');
    var currentPage = location.pathname.split('/').pop() || 'index.html';

    function setActiveByPage() {
      navLinks.forEach(function (link) {
        var linkPage = link.getAttribute('href').split('#')[0];
        var isCurrentPage = linkPage !== '' && linkPage === currentPage;
        link.closest('.nav-item').classList.toggle('is-active', isCurrentPage);
      });
    }

    setActiveByPage();

    var contactSection = document.getElementById('contact');
    var contactLink = document.querySelector('.primary-nav a[href="#contact"]');

    if (contactSection && contactLink && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) { link.closest('.nav-item').classList.remove('is-active'); });
            contactLink.closest('.nav-item').classList.add('is-active');
          } else {
            setActiveByPage();
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });

      observer.observe(contactSection);
    }
 
   
        /* ---------- CONTACT FORM ---------- */
    // Everything you might change later lives in these four lines.
    var FORM_ENDPOINT = 'https://api.web3forms.com/submit';
    var FORM_ACCESS_KEY = '1e12ca83-690b-402e-ad85-af7fcc204876';
    var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var THANK_YOU = 'Thank you for reaching out! Your message is on its way, and I\'ll be in touch within 24–48 hours.';

    function initContactForm(formEl, statusEl) {
      var submitButton = formEl.querySelector('button[type="submit"]');
      var idleLabel = submitButton ? submitButton.textContent : 'Send message';
      var isSending = false;

      function showStatus(message, type) {
        statusEl.textContent = message;
        statusEl.className = type ? 'form-status ' + type : 'form-status';
      }

      function setSending(sending) {
        isSending = sending;
        if (!submitButton) { return; }
        if (sending) {
          submitButton.setAttribute('aria-disabled', 'true');
        } else {
          submitButton.removeAttribute('aria-disabled');
        }
        submitButton.textContent = sending ? 'Sending...' : idleLabel;
      }

      formEl.addEventListener('submit', function (e) {
        e.preventDefault();
        if (isSending) { return; }

        var data = Object.fromEntries(new FormData(formEl));
        var name = (data.name || '').trim();
        var email = (data.email || '').trim();
        var message = (data.message || '').trim();

        // Honeypot: real visitors never see this checkbox. If it is checked,
        // act like it worked but send nothing.
        if (data.botcheck) {
          showStatus(THANK_YOU, 'is-success');
          formEl.reset();
          return;
        }

        if (!name || !email || !message) {
          showStatus('Please fill in every field before sending.', 'is-error');
          return;
        }
        if (!EMAIL_PATTERN.test(email)) {
          showStatus('That email address doesn\'t look quite right.', 'is-error');
          return;
        }

        // hCaptcha adds a hidden field named h-captcha-response once solved.
        var captchaField = formEl.querySelector('[name="h-captcha-response"]');
        if (captchaField && !captchaField.value) {
          showStatus('Please complete the captcha check before sending.', 'is-error');
          return;
        }

        data.name = name;
        data.email = email;
        data.message = message;
        data.access_key = FORM_ACCESS_KEY;
        data.subject = 'New portfolio inquiry from ' + name;
        data.from_name = 'Portfolio contact form';

        setSending(true);
        showStatus('Sending your message...', '');

        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(function (response) {
            return response.json().then(function (result) {
              return { ok: response.ok, result: result };
            });
          })
          .then(function (outcome) {
            if (outcome.ok) {
              showStatus(THANK_YOU, 'is-success');
              formEl.reset();
            } else {
              console.error('Form service error:', outcome.result);
              showStatus('Sorry, something went wrong and your message was not sent. Please try again in a moment.', 'is-error');
            }
          })
          .catch(function (error) {
            console.error('Form network error:', error);
            showStatus('Network problem. Please check your connection and try again.', 'is-error');
          })
          .then(function () {
            setSending(false);
            // A captcha answer works only once, so clear the box for the next try.
            if (window.hcaptcha && typeof window.hcaptcha.reset === 'function') {
              window.hcaptcha.reset();
            }
          });
      });
    }

    var contactForm = document.getElementById('contactForm');
    var contactStatus = document.getElementById('formStatus');
    if (contactForm && contactStatus) {
      initContactForm(contactForm, contactStatus);
    }
    
        /* ---------- CERTIFICATE VIEWER ---------- */
    var certDialog = document.getElementById('certDialog');

    if (certDialog) {
      var certDialogImg = document.getElementById('certDialogImg');

               document.querySelectorAll('.media-thumb:not([data-video])').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          var img = thumb.querySelector('img');
          certDialogImg.src = img.src;
          certDialogImg.alt = img.alt;
          certDialog.showModal();
        });
      });

      // Clicking the dark area outside the picture closes the dialog
      certDialog.addEventListener('click', function (e) {
        if (e.target === certDialog) { certDialog.close(); }
      });
    }
        /* ---------- DEMO VIDEO VIEWER ---------- */
    var videoDialog = document.getElementById('videoDialog');

    if (videoDialog) {
      var videoPlayer = document.getElementById('videoDialogPlayer');

      document.querySelectorAll('.media-thumb[data-video]').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          videoPlayer.src = thumb.dataset.video;
          videoDialog.showModal();
          videoPlayer.play();
        });
      });

      // Clicking the dark area outside the video closes the dialog
      videoDialog.addEventListener('click', function (e) {
        if (e.target === videoDialog) { videoDialog.close(); }
      });

      // However it closes (X, Esc, outside click), stop the video and release the file
      videoDialog.addEventListener('close', function () {
        videoPlayer.pause();
        videoPlayer.removeAttribute('src');
        videoPlayer.load();
      });
    }

        /* ---------- TESTIMONIAL READ MORE ---------- */
    var toggles = document.querySelectorAll('.testimonial-toggle');

    function setExpanded(btn, open) {
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Read less' : 'Read more';
      document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
    }

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        toggles.forEach(function (other) { setExpanded(other, false); });
        setExpanded(btn, open);
        if (!open) {
          btn.closest('.testimonial-card').scrollIntoView({ block: 'nearest', behavior: 'instant' });
        }
      });
    });
 
    /* ---------- FOOTER YEAR ---------- */
    document.getElementById('year').textContent = new Date().getFullYear();
  })();