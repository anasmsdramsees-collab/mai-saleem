/* ============================================================
   MAI SALEEM COUTURE — site script
   ============================================================ */

/* ---------- TEMP diagnostic badge (remove after debugging) ---------- */
(function () {
  function mount() {
    var b = document.createElement('div');
    b.id = '__dbg';
    b.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:2147483647;' +
      'background:#1fa463;color:#fff;font:13px/1.3 -apple-system,monospace;' +
      'padding:7px 11px;border-radius:8px;pointer-events:none;box-shadow:0 2px 12px rgba(0,0,0,.5)';
    b.textContent = 'JS ✓ · taps: 0';
    document.body.appendChild(b);
    var n = 0;
    var bump = function (e) {
      n++;
      var t = e.target || {};
      b.textContent = 'JS ✓ · taps: ' + n + ' · ' + (t.tagName || '?') + (t.id ? '#' + t.id : '');
    };
    // capture phase on window: fires for ANY tap/click anywhere, before anything can swallow it
    window.addEventListener('click', bump, true);
    window.addEventListener('touchstart', bump, true);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();

/* ---------- Gallery source ---------- */
const GALLERY = {
  dresses: [
    '1D0EB9F7-A0A1-47F6-AC24-BF2ABD314474','31582511-F932-4E90-A836-24B631FBEC19',
    '318CE213-E125-4980-9CB7-6B25A339EBE4','380F9541-09A1-4342-856B-33D91D54A6B3',
    '40331030-33D1-480E-9367-B783586FA634','4B94C08F-2E95-4AE2-A862-87C97693307F',
    '678C91E5-4AF5-4619-A7A9-022399D10760','6B9CC8DE-C423-4E25-9368-D60FCCCC82AA',
    '92E6CB66-61A5-43D1-9875-60F98BD85479','9A52268A-ACB0-4BA9-B7AF-E12F116A3239',
    'A1342C73-BFFD-47B0-894D-1A4FDA4E63ED','AC205F5C-AD04-476E-810D-9B4AE6632CF8',
    'B9D6FC7B-8FD4-435E-81AB-D1B18D7CF3C8','C70B1229-93C7-49B4-9445-A4A88CC5DC38',
    'D55A67A5-2777-4690-BA0F-E83D98FFB5C1','DBF72BE9-0039-4126-839C-67FD5916E1C2',
    'E41140D1-56B2-43F6-BCD6-40DAF0F435DB','E93022D4-7433-4CD1-9D75-24265A4B4D1D',
    'FA84098E-A644-489D-9114-AF8017ED4236'
  ].map(n => ({ src: `assets/dresses/${n}.PNG`, cat: 'dresses' })),
  abaya: [
    '3821BBC1-A299-44A0-8D09-D230F331F18B','412897CD-E9C6-4EE9-A18C-E2B6640354F5',
    '46F981C6-7CD6-43B0-B2FC-816F7A8C805C','6C6C4C98-1CA3-47D7-9591-460AF4D0CB26',
    '73A93AAD-2047-4024-8E36-8B64D5C7DC54','B9EC9C76-4701-4EF9-8A7E-B1BA54B89440',
    'BBCC7CFE-A7EF-4120-95B5-901F90F69F6D','BBD9E616-F02E-4715-B737-3CBCEB7C46E6',
    'BD492A6F-CC5E-4EF3-A389-785549604E38','C388C4FC-9776-4414-8D9A-8C981915A54C',
    'D93A5C23-D593-4D81-9AB3-AAE4375CED26','E14EFDB7-7566-4562-8DEA-80CA0556EF3D',
    'ED1B3B84-85DA-401B-84CC-DDCF8C2C7AEC','F59177B0-C717-45E9-A03F-B1E22E8AED28'
  ].map(n => ({ src: `assets/abaya/${n}.PNG`, cat: 'abaya' }))
};

// Interleave the two collections so "All" looks varied
const ITEMS = (() => {
  const d = GALLERY.dresses, a = GALLERY.abaya, out = [];
  const max = Math.max(d.length, a.length);
  for (let i = 0; i < max; i++) { if (d[i]) out.push(d[i]); if (a[i]) out.push(a[i]); }
  return out;
})();

/* ---------- i18n ---------- */
const I18N = {
  en: {
    'brand.couture': 'COUTURE',
    'nav.about': 'The House', 'nav.collections': 'Collections', 'nav.lookbook': 'Lookbook',
    'nav.atelier': 'Atelier', 'nav.contact': 'Contact',
    'hero.eyebrow': 'ABAYAS · EVENING DRESSES · RECEPTION DRESSES · FORMAL SUITS',
    'hero.tagline': 'Timeless. Feminine. Refined.',
    'hero.ctaPrimary': 'Explore the Collection', 'hero.ctaSecondary': 'Book an Appointment',
    'about.eyebrow': 'The House',
    'about.title': 'A couture house for the modern woman',
    'about.p1': 'Mai Saleem is a luxury couture house creating timeless pieces that celebrate elegance, femininity and confidence. Every garment is conceived as a quiet statement — refined in line, generous in detail.',
    'about.p2': 'From hand-finished abayas to evening gowns and tailored formal suits, each creation is crafted to be worn for years, not seasons.',
    'about.v1': 'Timeless', 'about.v2': 'Feminine', 'about.v3': 'Refined',
    'collections.eyebrow': 'Collections', 'collections.title': 'Crafted for every occasion',
    'col.abaya': 'Abayas', 'col.abayaDesc': 'Reception and evening abayas, hand-embellished.',
    'col.evening': 'Evening Dresses', 'col.eveningDesc': 'Sculpted silhouettes for the night.',
    'col.reception': 'Reception Dresses', 'col.receptionDesc': 'Statement gowns for celebrations.',
    'col.suits': 'Formal Suits', 'col.suitsDesc': 'Tailored power, softly drawn.',
    'col.view': 'View pieces',
    'look.eyebrow': 'Lookbook', 'look.title': 'The Collection',
    'look.all': 'All', 'look.dresses': 'Dresses', 'look.abayas': 'Abayas',
    'atelier.eyebrow': 'The Atelier', 'atelier.title': 'Made to be yours',
    'atelier.p1': 'Beyond the collection, the Mai Saleem atelier offers a private bespoke service — from the first sketch to the final fitting. Fabrics are selected by hand, details are agreed in person, and every measurement is your own.',
    'atelier.s1': 'Private consultation & design', 'atelier.s2': 'Bespoke abayas, gowns & suits',
    'atelier.s3': 'Luxury bags, scarves & accessories', 'atelier.s4': 'Signature gift packaging',
    'atelier.cta': 'Request a fitting',
    'contact.eyebrow': 'Contact', 'contact.title': 'Begin your fitting',
    'contact.lead': 'Tell us about the occasion and our team will be in touch to arrange a private appointment.',
    'contact.phoneLabel': 'Phone', 'contact.emailLabel': 'Email', 'contact.socialLabel': 'Instagram',
    'form.name': 'Full name', 'form.email': 'Email', 'form.occasion': 'Occasion', 'form.message': 'Message',
    'form.submit': 'Send request', 'form.thanks': 'Thank you — we will be in touch shortly.',
    'footer.rights': 'All rights reserved.'
  },
  ar: {
    'brand.couture': 'كوتور',
    'nav.about': 'الدار', 'nav.collections': 'التشكيلات', 'nav.lookbook': 'المعرض',
    'nav.atelier': 'الأتيليه', 'nav.contact': 'تواصل',
    'hero.eyebrow': 'عبايات · فساتين سهرة · فساتين استقبال · بدل رسمية',
    'hero.tagline': 'أناقة خالدة. أنوثة. رقيّ.',
    'hero.ctaPrimary': 'اكتشفي التشكيلة', 'hero.ctaSecondary': 'احجزي موعدك',
    'about.eyebrow': 'الدار',
    'about.title': 'دار أزياء للمرأة العصرية',
    'about.p1': 'مي سليم دار أزياء فاخرة تصنع قطعاً خالدة تحتفي بالأناقة والأنوثة والثقة. كل قطعة تُصمَّم كلمسة هادئة راقية — دقيقة في الخطوط، غنيّة في التفاصيل.',
    'about.p2': 'من العبايات المُنفَّذة يدوياً إلى فساتين السهرة والبدل الرسمية المُفصَّلة، تُصاغ كل قطعة لتُرتدى لسنوات لا لموسم.',
    'about.v1': 'خالدة', 'about.v2': 'أنثوية', 'about.v3': 'راقية',
    'collections.eyebrow': 'التشكيلات', 'collections.title': 'مصمَّمة لكل مناسبة',
    'col.abaya': 'عبايات', 'col.abayaDesc': 'عبايات استقبال وسهرة مُطرَّزة يدوياً.',
    'col.evening': 'فساتين سهرة', 'col.eveningDesc': 'قصّات منحوتة تليق بالليل.',
    'col.reception': 'فساتين استقبال', 'col.receptionDesc': 'فساتين مميّزة للاحتفالات.',
    'col.suits': 'بدل رسمية', 'col.suitsDesc': 'قوّة مُفصَّلة برقّة.',
    'col.view': 'استعرضي القطع',
    'look.eyebrow': 'المعرض', 'look.title': 'التشكيلة',
    'look.all': 'الكل', 'look.dresses': 'فساتين', 'look.abayas': 'عبايات',
    'atelier.eyebrow': 'الأتيليه', 'atelier.title': 'مصمَّمة خصيصاً لكِ',
    'atelier.p1': 'إلى جانب التشكيلة، يقدّم أتيليه مي سليم خدمة تفصيل خاصة — من أول رسمة حتى البروفة الأخيرة. تُنتقى الأقمشة يدوياً، وتُتَّفق التفاصيل وجهاً لوجه، وكل قياس هو قياسكِ وحدك.',
    'atelier.s1': 'استشارة وتصميم خاص', 'atelier.s2': 'عبايات وفساتين وبدل بالتفصيل',
    'atelier.s3': 'شنط وشيلات وإكسسوارات فاخرة', 'atelier.s4': 'تغليف هدايا مميَّز',
    'atelier.cta': 'اطلبي موعد بروفة',
    'contact.eyebrow': 'تواصل', 'contact.title': 'ابدئي بروفتك',
    'contact.lead': 'أخبرينا عن المناسبة وسيتواصل فريقنا معكِ لترتيب موعد خاص.',
    'contact.phoneLabel': 'هاتف', 'contact.emailLabel': 'بريد', 'contact.socialLabel': 'إنستغرام',
    'form.name': 'الاسم الكامل', 'form.email': 'البريد الإلكتروني', 'form.occasion': 'المناسبة', 'form.message': 'رسالتك',
    'form.submit': 'إرسال الطلب', 'form.thanks': 'شكراً لكِ — سنتواصل معكِ قريباً.',
    'footer.rights': 'جميع الحقوق محفوظة.'
  }
};

function setLang(lang) {
  const dict = I18N[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('.lang-toggle__opt').forEach(o =>
    o.classList.toggle('is-active', o.dataset.lang === lang));
  try { localStorage.setItem('ms-lang', lang); } catch (e) {}
}

// Global handlers wired via inline onclick in the HTML (independent of event binding/timing)
window.msToggleLang = function () {
  setLang(document.documentElement.lang === 'ar' ? 'en' : 'ar');
};
window.msFilter = function (cat) { applyFilter(cat); };
window.msOpenLightbox = function (src) { openLightbox(src); };

/* ---------- Build gallery ---------- */
function buildGallery() {
  const wrap = document.getElementById('gallery');
  ITEMS.forEach(item => {
    const fig = document.createElement('figure');
    fig.className = 'gallery__item';
    fig.dataset.cat = item.cat;
    const img = document.createElement('img');
    img.src = item.src; img.alt = 'Mai Saleem'; img.loading = 'lazy';
    fig.appendChild(img);
    fig.addEventListener('click', () => openLightbox(item.src));
    wrap.appendChild(fig);
  });
}

function filterGallery(cat) {
  document.querySelectorAll('.gallery__item').forEach(el => {
    el.classList.toggle('is-hidden', cat !== 'all' && el.dataset.cat !== cat);
  });
}

// Apply a filter AND sync the active button (used by filter bar + collection cards)
function applyFilter(cat) {
  document.querySelectorAll('.filter').forEach(f =>
    f.classList.toggle('is-active', f.dataset.filter === cat));
  filterGallery(cat);
}

/* ---------- Lightbox ---------- */
let lbList = [], lbIndex = 0;
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');

function visibleSrcs() {
  return [...document.querySelectorAll('.gallery__item:not(.is-hidden)')]
    .map(el => el.querySelector('img').src);
}
function openLightbox(src) {
  lbList = visibleSrcs();
  lbIndex = Math.max(0, lbList.findIndex(s => s.endsWith(src)));
  showLb();
  lb.hidden = false;
  requestAnimationFrame(() => lb.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
}
function showLb() { lbImg.src = lbList[lbIndex]; }
function moveLb(d) { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLb(); }
function closeLightbox() {
  lb.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => { lb.hidden = true; }, 400);
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Language (default Arabic, remember choice; ?lang= overrides for testing/links)
  let saved = 'ar';
  try { saved = localStorage.getItem('ms-lang') || 'ar'; } catch (e) {}
  const urlLang = new URLSearchParams(location.search).get('lang');
  if (urlLang === 'en' || urlLang === 'ar') saved = urlLang;
  setLang(saved);
  document.getElementById('langToggle').addEventListener('click', () => {
    setLang(document.documentElement.lang === 'ar' ? 'en' : 'ar');
  });

  // Loader
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('is-hidden'), 350);
  });

  // Header solid on scroll
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open'); nav.classList.toggle('is-open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('is-open'); nav.classList.remove('is-open');
  }));

  // Gallery + filters
  buildGallery();
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.gallery__item').forEach(el => io.observe(el));

  document.getElementById('filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter'); if (!btn) return;
    applyFilter(btn.dataset.filter);
  });

  // Collection cards open the lookbook filtered to their category
  document.querySelectorAll('.ccard').forEach(card => {
    const cat = card.dataset.filter;
    const go = (e) => { applyFilter(cat); /* anchor #lookbook handles the scroll */ };
    card.querySelector('.link-gold')?.addEventListener('click', go);
    card.querySelector('.ccard__img')?.addEventListener('click', () => {
      applyFilter(cat);
      document.getElementById('lookbook').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Lightbox controls
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbNext').addEventListener('click', () => moveLb(1));
  document.getElementById('lbPrev').addEventListener('click', () => moveLb(-1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') moveLb(1);
    if (e.key === 'ArrowLeft') moveLb(-1);
  });

  // Scrollspy — highlight the current section in the nav
  const navLinks = [...document.querySelectorAll('.nav a')];
  const spyTargets = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = '#' + e.target.id;
      navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  spyTargets.forEach(t => spy.observe(t));

  // Reveal on scroll
  const rio = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); rio.unobserve(e.target); } });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => rio.observe(el));

  // Contact form (front-end only)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('formNote').hidden = false;
    form.reset();
  });
});
