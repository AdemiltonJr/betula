/* Bétula RH — interações leves, sem dependências */
(function () {
  'use strict';
  var header = document.querySelector('[data-header]');
  var toggle = document.querySelector('[data-toggle]');
  var menu = document.querySelector('[data-menu]');

  /* Header: sombra ao rolar */
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    if (menu) {
      menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          header.classList.remove('menu-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  /* Reveal ao entrar na viewport */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Link ativo no menu conforme seção visível */
  var navLinks = document.querySelectorAll('.nav-list a');
  var sections = [];
  navLinks.forEach(function (a) {
    var id = a.getAttribute('href');
    if (id && id.charAt(0) === '#') {
      var sec = document.querySelector(id);
      if (sec) sections.push({ link: a, sec: sec });
    }
  });
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          var match = sections.filter(function (s) { return s.sec === en.target; })[0];
          if (match) match.link.classList.add('active');
        }
      });
    }, { threshold: 0.4, rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s.sec); });
  }

  /* Ano no rodapé */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());
})();
