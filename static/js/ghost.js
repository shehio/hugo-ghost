(function () {
  'use strict';

  // =========================================================================
  // Dark Mode Toggle
  // =========================================================================
  var STORAGE_KEY = 'ghost-theme';
  var darkModeToggle = document.getElementById('darkmode-toggle');

  function isDarkMode() {
    return document.documentElement.classList.contains('dark-mode');
  }

  function setDarkMode(dark) {
    if (dark) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      setDarkMode(!isDarkMode());
    });
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setDarkMode(e.matches);
    }
  });

  // =========================================================================
  // Mobile Menu (Burger)
  // =========================================================================
  var burger = document.getElementById('gh-burger');
  var navMenu = document.querySelector('.gh-nav-menu');

  if (burger && navMenu) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('gh-burger-active');
      navMenu.classList.toggle('gh-nav-menu-open');
      document.body.classList.toggle('gh-menu-open');
    });

    // Close menu when clicking a link
    var navLinks = navMenu.querySelectorAll('.gh-nav-link');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        burger.classList.remove('gh-burger-active');
        navMenu.classList.remove('gh-nav-menu-open');
        document.body.classList.remove('gh-menu-open');
      });
    }
  }

  // =========================================================================
  // Smooth scroll for anchor links
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // External links open in new tab
  // =========================================================================
  var links = document.querySelectorAll('.gh-content a');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  }

  // =========================================================================
  // Add loading="lazy" to content images
  // =========================================================================
  var images = document.querySelectorAll('.gh-content img');
  for (var j = 0; j < images.length; j++) {
    if (!images[j].hasAttribute('loading')) {
      images[j].setAttribute('loading', 'lazy');
    }
  }

  // =========================================================================
  // Header scroll behavior - add shadow on scroll
  // =========================================================================
  var header = document.querySelector('.gh-header');
  if (header) {
    var lastScrollY = 0;
    window.addEventListener('scroll', function () {
      var currentScrollY = window.scrollY;
      if (currentScrollY > 10) {
        header.classList.add('gh-header-shadow');
      } else {
        header.classList.remove('gh-header-shadow');
      }
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

})();
