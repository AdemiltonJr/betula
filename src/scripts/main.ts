// Bétula RH — interações (bundled pelo Astro)

/* Header: sombra ao rolar */
const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = document.querySelector<HTMLButtonElement>('[data-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

const onScroll = () => { if (header) header.classList.toggle('scrolled', window.scrollY > 8); };
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Menu mobile */
if (toggle && header) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  menu?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) {
      header.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Reveal ao entrar na viewport */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

/* Link ativo no menu conforme seção visível */
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-list a'));
const sections = navLinks
  .map((a) => {
    const id = a.getAttribute('href');
    const sec = id && id.startsWith('#') ? document.querySelector(id) : null;
    return sec ? { link: a, sec } : null;
  })
  .filter((x): x is { link: HTMLAnchorElement; sec: Element } => x !== null);
if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove('active'));
        const m = sections.find((s) => s.sec === en.target);
        if (m) m.link.classList.add('active');
      }
    });
  }, { threshold: 0.4, rootMargin: '-40% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s.sec));
}

/* Slider de depoimentos (transform + transição CSS) */
const track = document.querySelector<HTMLElement>('[data-depo-track]');
const viewport = track?.parentElement ?? null;
if (track && viewport && track.children.length) {
  const prevBtn = document.querySelector<HTMLButtonElement>('[data-depo-prev]');
  const nextBtn = document.querySelector<HTMLButtonElement>('[data-depo-next]');
  const dotsWrap = document.querySelector<HTMLElement>('[data-depo-dots]');
  const cards = Array.from(track.children) as HTMLElement[];
  let index = 0;
  let autoTimer: number | null = null;
  let builtDots = -1;

  const metrics = () => {
    const cardW = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const per = Math.max(1, Math.round(viewport.clientWidth / (cardW + gap)));
    return { cardW, gap, per, max: Math.max(0, cards.length - per) };
  };
  const render = () => {
    const m = metrics();
    if (index > m.max) index = m.max;
    if (index < 0) index = 0;
    track.style.transform = `translateX(-${index * (m.cardW + m.gap)}px)`;
    syncDots(m.max + 1);
  };
  const goTo = (i: number) => {
    const m = metrics();
    if (i < 0) i = m.max;
    if (i > m.max) i = 0;
    index = i;
    render();
  };
  const syncDots = (count: number) => {
    if (!dotsWrap) return;
    if (builtDots !== count) {
      dotsWrap.innerHTML = '';
      for (let p = 0; p < count; p++) {
        const idx = p;
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Ir para o depoimento ${idx + 1}`);
        b.addEventListener('click', () => { goTo(idx); restartAuto(); });
        dotsWrap.appendChild(b);
      }
      builtDots = count;
    }
    Array.from(dotsWrap.children).forEach((d, i) =>
      d.setAttribute('aria-current', i === index ? 'true' : 'false'),
    );
  };
  const startAuto = () => { stopAuto(); autoTimer = window.setInterval(() => goTo(index + 1), 6000); };
  const stopAuto = () => { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } };
  const restartAuto = () => startAuto();

  nextBtn?.addEventListener('click', () => { goTo(index + 1); restartAuto(); });
  prevBtn?.addEventListener('click', () => { goTo(index - 1); restartAuto(); });

  const slider = track.closest('.depo-slider');
  slider?.addEventListener('pointerenter', stopAuto);
  slider?.addEventListener('pointerleave', startAuto);
  slider?.addEventListener('focusin', stopAuto);

  let dragX0: number | null = null;
  track.addEventListener('pointerdown', (e) => { dragX0 = e.clientX; stopAuto(); });
  window.addEventListener('pointerup', (e) => {
    if (dragX0 === null) return;
    const dx = e.clientX - dragX0;
    dragX0 = null;
    if (dx <= -40) goTo(index + 1);
    else if (dx >= 40) goTo(index - 1);
    startAuto();
  });

  let resizeT: number | null = null;
  window.addEventListener('resize', () => {
    if (resizeT) clearTimeout(resizeT);
    resizeT = window.setTimeout(render, 150);
  });

  render();
  startAuto();
}

/* Contato — envio por e-mail (API) + atalho de WhatsApp */
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
if (form) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const val = (n: string) =>
    (form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${n}"]`)?.value ?? '').trim();
  const setStatus = (msg: string, kind: 'ok' | 'err' | 'info') => {
    if (status) { status.textContent = msg; status.dataset.kind = kind; }
  };
  const buildWhats = () => {
    const linhas = ['Olá! Vim pelo site da Bétula RH.'];
    if (val('nome')) linhas.push('Nome: ' + val('nome'));
    if (val('empresa')) linhas.push('Empresa: ' + val('empresa'));
    if (val('contato')) linhas.push('Contato: ' + val('contato'));
    if (val('mensagem')) linhas.push('Mensagem: ' + val('mensagem'));
    return 'https://api.whatsapp.com/send?phone=5519983631912&text=' + encodeURIComponent(linhas.join('\n'));
  };

  form.querySelector('[data-wa-btn]')?.addEventListener('click', () => {
    if (!val('nome') || !val('contato')) { setStatus('Preencha nome e contato para continuar.', 'err'); return; }
    window.open(buildWhats(), '_blank', 'noopener');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!val('nome') || !val('contato')) { setStatus('Preencha nome e contato para continuar.', 'err'); return; }
    const btn = form.querySelector<HTMLButtonElement>('[type="submit"]');
    if (btn) btn.disabled = true;
    setStatus('Enviando...', 'info');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: val('nome'), empresa: val('empresa'), contato: val('contato'), mensagem: val('mensagem') }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setStatus('Mensagem enviada! Em breve entramos em contato.', 'ok'); form.reset(); }
      else if (res.status === 503) { setStatus('Envio por e-mail ainda não configurado. Use o botão do WhatsApp ao lado.', 'err'); }
      else { setStatus(data.error || 'Não foi possível enviar agora. Tente pelo WhatsApp.', 'err'); }
    } catch {
      setStatus('Falha de conexão. Tente enviar pelo WhatsApp.', 'err');
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}

/* Ano no rodapé */
const y = document.querySelector('[data-year]');
if (y) y.textContent = String(new Date().getFullYear());
