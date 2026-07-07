/* Bétula RH — releitura moderna · interações leves, sem dependências */
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
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
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

  /* Slider de depoimentos (transform + transição CSS) */
  var track = document.querySelector('[data-depo-track]');
  var viewport = track ? track.parentElement : null;
  if (track && viewport && track.children.length) {
    var prevBtn = document.querySelector('[data-depo-prev]');
    var nextBtn = document.querySelector('[data-depo-next]');
    var dotsWrap = document.querySelector('[data-depo-dots]');
    var cards = Array.prototype.slice.call(track.children);
    var index = 0, autoTimer = null, builtDots = -1;

    function metrics() {
      var cardW = cards[0].getBoundingClientRect().width;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var per = Math.max(1, Math.round(viewport.clientWidth / (cardW + gap)));
      return { cardW: cardW, gap: gap, per: per, max: Math.max(0, cards.length - per) };
    }
    function render() {
      var m = metrics();
      if (index > m.max) index = m.max;
      if (index < 0) index = 0;
      track.style.transform = 'translateX(-' + (index * (m.cardW + m.gap)) + 'px)';
      syncDots(m.max + 1);
    }
    function goTo(i) {
      var m = metrics();
      if (i < 0) i = m.max;
      if (i > m.max) i = 0;
      index = i; render();
    }
    function syncDots(count) {
      if (!dotsWrap) return;
      if (builtDots !== count) {
        dotsWrap.innerHTML = '';
        for (var p = 0; p < count; p++) {
          (function (idx) {
            var b = document.createElement('button');
            b.type = 'button';
            b.setAttribute('aria-label', 'Ir para o depoimento ' + (idx + 1));
            b.addEventListener('click', function () { goTo(idx); restartAuto(); });
            dotsWrap.appendChild(b);
          })(p);
        }
        builtDots = count;
      }
      var dots = dotsWrap.children;
      for (var i = 0; i < dots.length; i++) {
        dots[i].setAttribute('aria-current', i === index ? 'true' : 'false');
      }
    }

    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); restartAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); restartAuto(); });

    function startAuto() { stopAuto(); autoTimer = window.setInterval(function () { goTo(index + 1); }, 6000); }
    function stopAuto() { if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; } }
    function restartAuto() { startAuto(); }

    var slider = track.closest('.depo-slider');
    if (slider) {
      slider.addEventListener('pointerenter', stopAuto);
      slider.addEventListener('pointerleave', startAuto);
      slider.addEventListener('focusin', stopAuto);
    }
    var dragX0 = null;
    track.addEventListener('pointerdown', function (e) { dragX0 = e.clientX; stopAuto(); });
    window.addEventListener('pointerup', function (e) {
      if (dragX0 === null) return;
      var dx = e.clientX - dragX0; dragX0 = null;
      if (dx <= -40) goTo(index + 1);
      else if (dx >= 40) goTo(index - 1);
      startAuto();
    });
    var resizeT;
    window.addEventListener('resize', function () { window.clearTimeout(resizeT); resizeT = window.setTimeout(render, 150); });

    render();
    startAuto();
  }

  /* Ano no rodapé */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());
})();
