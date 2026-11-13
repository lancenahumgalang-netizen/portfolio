/* Builds the portfolio page from data.js and adds the animations.
   You normally do not need to edit this file. */
(function () {
  'use strict';

  var D = window.PORTFOLIO;
  var app = document.getElementById('app');
  if (!D || !app) { return; }

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function each(list, fn) { return (list || []).map(fn).join(''); }
  function has(l) { return l && l.length; }
  function age(b) {
    var n = new Date(), a = n.getFullYear() - b.year, m = n.getMonth() + 1;
    if (m < b.month || (m === b.month && n.getDate() < b.day)) { a--; }
    return a;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- drawings (used when no photo is set) ---------- */
  var PERSON =
    '<svg viewBox="0 0 360 420" role="img" aria-label="Placeholder for your portrait">' +
    '<path d="M20 420c0-92 62-150 160-150s160 58 160 150z" fill="var(--ink)"/>' +
    '<path d="M150 276l30 60 30-60-30-18z" fill="var(--paper)"/>' +
    '<path d="M176 300h8l5 90h-18z" fill="var(--accent)"/>' +
    '<rect x="158" y="236" width="44" height="40" rx="14" fill="var(--skin)"/>' +
    '<ellipse cx="180" cy="170" rx="62" ry="76" fill="var(--skin)"/>' +
    '<path d="M116 150c-6-62 40-92 78-86 40 6 62 40 50 86-14-34-44-44-76-40-26 3-44 16-52 40z" fill="var(--ink)"/></svg>';

  var FAMILY =
    '<svg viewBox="0 0 400 300" role="img" aria-label="Placeholder for a photo with your parents">' +
    '<rect width="400" height="300" fill="var(--soft)"/><circle cx="200" cy="300" r="170" fill="var(--line)" opacity=".6"/>' +
    '<g fill="var(--muted)"><circle cx="110" cy="112" r="26"/><path d="M60 300v-80a50 50 0 0 1 100 0v80z"/>' +
    '<circle cx="290" cy="112" r="26"/><path d="M240 300v-80a50 50 0 0 1 100 0v80z"/></g>' +
    '<g fill="var(--accent)"><circle cx="200" cy="140" r="22"/><path d="M158 300v-60a42 42 0 0 1 84 0v60z"/></g></svg>';

  // Browser-window drawings for projects. look 1, 2 or 3 changes the layout and color mix.
  function shot(look) {
    var a = ['var(--accent)', 'var(--fg)', 'var(--muted)'];
    var c1 = a[(look - 1) % 3], c2 = a[look % 3];
    var body = look === 2
      ? '<rect x="28" y="58" width="150" height="100" rx="8" fill="var(--soft)"/><rect x="190" y="58" width="102" height="46" rx="8" fill="' + c1 + '" opacity=".9"/><rect x="190" y="112" width="102" height="46" rx="8" fill="var(--soft)"/><rect x="28" y="168" width="264" height="10" rx="5" fill="var(--soft)"/>'
      : look === 3
        ? '<rect x="28" y="58" width="60" height="120" rx="8" fill="var(--soft)"/><rect x="100" y="58" width="192" height="26" rx="6" fill="' + c1 + '" opacity=".9"/><rect x="100" y="94" width="92" height="84" rx="8" fill="var(--soft)"/><rect x="200" y="94" width="92" height="84" rx="8" fill="var(--soft)"/>'
        : '<rect x="28" y="58" width="120" height="14" rx="4" fill="' + c2 + '"/><rect x="28" y="80" width="84" height="8" rx="4" fill="var(--muted)" opacity=".6"/><rect x="28" y="108" width="100" height="70" rx="8" fill="' + c1 + '" opacity=".9"/><rect x="140" y="108" width="152" height="70" rx="8" fill="var(--soft)"/>';
    return '<svg viewBox="0 0 320 200" role="img" aria-label="Project preview"><rect width="320" height="200" fill="var(--surface)"/>' +
      '<rect width="320" height="34" fill="var(--soft)"/><circle cx="16" cy="17" r="4" fill="var(--muted)"/><circle cx="30" cy="17" r="4" fill="var(--muted)"/><circle cx="44" cy="17" r="4" fill="var(--muted)"/>' +
      body + '</svg>';
  }
  function certDraw(i) {
    return '<svg viewBox="0 0 300 200" role="img" aria-label="Certificate placeholder"><rect width="300" height="200" fill="var(--surface)"/>' +
      '<rect x="14" y="14" width="272" height="172" rx="6" fill="none" stroke="var(--fg)" stroke-width="3" opacity=".8"/>' +
      '<rect x="24" y="24" width="252" height="152" rx="3" fill="none" stroke="var(--line)" stroke-width="2"/>' +
      '<rect x="80" y="52" width="140" height="10" rx="3" fill="var(--fg)"/><rect x="104" y="72" width="92" height="6" rx="3" fill="var(--muted)"/>' +
      '<rect x="60" y="102" width="180" height="6" rx="3" fill="var(--soft)"/><rect x="76" y="116" width="148" height="6" rx="3" fill="var(--soft)"/>' +
      '<circle cx="' + (i % 2 ? 236 : 64) + '" cy="152" r="16" fill="var(--accent)"/><rect x="120" y="150" width="60" height="4" rx="2" fill="var(--muted)"/></svg>';
  }
  function tileDraw(i) {
    var fills = ['var(--accent)', 'var(--fg)', 'var(--muted)', 'var(--line)', 'var(--accent)'];
    return '<svg viewBox="0 0 100 100" role="img" aria-label="Photo placeholder"><rect width="100" height="100" fill="var(--soft)"/>' +
      '<circle cx="50" cy="40" r="14" fill="' + fills[i % 5] + '" opacity=".85"/><path d="M18 100c0-26 14-40 32-40s32 14 32 40z" fill="' + fills[(i + 1) % 5] + '" opacity=".85"/></svg>';
  }

  function head(tag, title, intro) {
    if (raw) { return '<div class="subhd reveal"><div class="eyebrow">' + esc(tag) + '</div><h3 class="subhead">' + esc(title) + '</h3>' + (intro ? '<p class="intro">' + esc(intro) + '</p>' : '') + '</div>'; }
    return '<div class="head reveal"><div class="eyebrow">' + esc(tag) + '</div><h2 class="caret">' + esc(title) + '</h2>' +
      (intro ? '<p class="intro">' + esc(intro) + '</p>' : '') + '</div>';
  }

  var nav = [];
  // every section is its own page; only one is visible at a time
  var raw = false, X = { imm: '', contact: '', aw: '', train: '' };
  function section(id, label, inner) {
    if (raw) { return '<div class="blk" id="s-' + id + '" data-tab="' + ({ immersion: 'Work immersion', contact: 'Contact', awards: 'Honors', trainings: 'Certificate' }[id] || id) + '">' + inner + '</div>'; }
    nav.push({ id: id, label: label });
    return '<section class="view" id="v-' + id + '" data-view="' + id + '" hidden>' + inner + '</section>';
  }

  // four-leaf clover (original drawing): four heart leaves and a curved stem
  var CLOVER = '<svg viewBox="-40 -40 80 96" aria-hidden="true"><g fill="currentColor">' +
    [0, 90, 180, 270].map(function (r) { return '<path transform="rotate(' + r + ')" d="M0 -3C-9 -4-19 -10-19 -21-19 -31-8 -35-3 -29-1.5 -27.5 0 -25 0 -22 0 -25 1.5 -27.5 3 -29 8 -35 19 -31 19 -21 19 -10 9 -4 0 -3Z"/>'; }).join('') +
    '</g><path d="M0 2C2 16 8 26 18 36" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>';

  // magic circle rings (original geometric drawing)
  function ring(r, dash, w) { return '<circle r="' + r + '" fill="none" stroke="currentColor" stroke-width="' + w + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>'; }
  function star(n, r, skip) { var p = []; for (var i = 0; i < n; i++) { var t = (i * skip) * 2 * Math.PI / n - Math.PI / 2; p.push((Math.cos(t) * r).toFixed(1) + ',' + (Math.sin(t) * r).toFixed(1)); } return '<polygon points="' + p.join(' ') + '" fill="none" stroke="currentColor" stroke-width="1.2"/>'; }
  function ticks(r1, r2, n) { var s = ''; for (var i = 0; i < n; i++) { var t = i * 2 * Math.PI / n; s += 'M' + (Math.cos(t) * r1).toFixed(1) + ' ' + (Math.sin(t) * r1).toFixed(1) + 'L' + (Math.cos(t) * r2).toFixed(1) + ' ' + (Math.sin(t) * r2).toFixed(1); } return '<path d="' + s + '" stroke="currentColor" stroke-width="1.4" fill="none"/>'; }
  var MAGIC = '<svg class="mc a" viewBox="-100 -100 200 200" aria-hidden="true">' + ring(96, '', 1.6) + ring(90, '2 5', 1.2) + ticks(80, 88, 48) + ring(78, '', 1) + star(8, 76, 3) + '</svg>' +
    '<svg class="mc b" viewBox="-100 -100 200 200" aria-hidden="true">' + ring(66, '10 6', 1.4) + star(6, 64, 2) + star(5, 52, 2) + ring(38, '', 1.2) + ticks(30, 38, 24) + '</svg>';

  /* ---------- sections ---------- */
  function hero() {
    var n = D.name, ph = D.hero.photo;
    var pic = ph ? '<img src="' + esc(ph) + '" alt="' + esc(n.first + ' ' + n.last) + '">' : PERSON;
    return '<header class="hero hx" id="top">' +
      '<div class="portrait"><div class="mcw" aria-hidden="true">' + MAGIC + '</div>' + pic + '</div>' +
      '<div class="hbody"><div class="eyebrow">Portfolio ' + esc(D.year) + '</div>' +
      '<h1 class="giant"><span><b>' + esc(n.first) + '</b></span><span><b>' + esc(n.last) + '</b></span><span class="vis" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">' + esc(n.middle) + '</span></h1>' +
      '<p class="fullname">' + esc(n.first + ' ' + n.middle + ' ' + n.last) + '</p>' +
      '<p class="role">' + esc(D.hero.role) + '</p></div>' +
      '<div class="hc hc1" aria-hidden="true">' + CLOVER + '</div><div class="hc hc2" aria-hidden="true">' + CLOVER + '</div></header>';
  }

  function home() {
    var c = D.contact, n = D.name, ph = D.hero.photo;
    var pic = ph ? '<img src="' + esc(ph) + '" alt="' + esc(n.first + ' ' + n.last) + '">' : PERSON;
    function row(k, v, href) {
      return '<div class="crow"><small>' + k + '</small>' + (href ? '<a href="' + esc(href) + '"' + (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '') + '>' + esc(v) + '</a>' : '<span>' + esc(v) + '</span>') +
        '<button type="button" data-copy="' + esc(v) + '">Copy</button></div>';
    }
    var fbLink = c.facebook && (c.facebook.link || ('https://www.facebook.com/search/top?q=' + encodeURIComponent(c.facebook.name)));
    var contact = '<div class="homec"><div class="eyebrow">Contact</div>' + row('Email', c.email, 'mailto:' + c.email) +
      (c.phone ? row('Phone', c.phone, 'tel:' + c.phone) : '') +
      (c.facebook && c.facebook.name ? row('Facebook', c.facebook.name, fbLink) : '') + '</div>';
    return section('home', 'Home Page',
      '<div class="split">' +
      '<div class="split-pic"><div class="portrait' + (ph ? ' photo' : '') + '">' + pic + '</div></div>' +
      '<div class="split-txt"><div class="eyebrow">Portfolio ' + esc(D.year) + '</div>' +
      '<h1 class="sname"><b>' + esc(n.first + ' ' + n.middle) + '</b><span>' + esc(n.last) + '</span></h1>' +
      '<div class="program"><b>' + esc(D.hero.program.short) + '</b> <span>' + esc(D.hero.program.full) + '</span><em>' + esc(D.hero.program.major) + '</em></div>' +
      '<p class="role">' + esc(D.hero.role) + '</p>' +
      '<p class="big-intro">' + esc(D.hero.intro) + '</p>' + contact + '</div></div>');
  }

  function about() {
    var a = D.about, M = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var age = '', bd = '';
    if (a.birth && a.birth.year) {
      var now = new Date(); age = now.getFullYear() - a.birth.year;
      if (now.getMonth() + 1 < a.birth.month || (now.getMonth() + 1 === a.birth.month && now.getDate() < a.birth.day)) { age--; }
      bd = M[a.birth.month - 1] + ' ' + a.birth.day + ', ' + a.birth.year;
    }
    var facts = each(a.facts || [], function (x) {
      var v = String(x.value).replace('{age}', age).replace('{birthday}', bd);
      return '<div><dt>' + esc(x.label) + '</dt><dd>' + esc(v) + '</dd></div>';
    });
    return section('about', 'Personal information',
      head('Personal information', a.heading || 'Personal Information') +
      '<dl class="pinfo">' + facts + '</dl>');
  }

  function education() {
    var ed = D.education, acts = D.activities;
    if (!ed || !has(ed.list)) { return ''; }
    var line = '<ol class="eduline">' + each(ed.list, function (x, xi) {
      return '<li>' + (x.logo ? '<img class="slogo' + (/uc\./.test(x.logo) ? ' tall' : '') + '" src="' + esc(x.logo) + '" alt="' + esc(x.school) + ' logo" width="64" height="64">' : '') + '<div class="lv"><span>' + esc(x.level) + '</span><span class="yr">' + esc(x.when) + '</span></div><div class="sc">' + esc(x.school) + '</div>' +
        (x.place ? '<div class="pl">' + esc(x.place) + '</div>' : '') +
        (x.note ? '<div class="nt">' + esc(x.note) + '</div>' : '') +
        (x.honors ? '<div class="nt hn">' + esc(x.honors) + '</div>' : '') +
        (x.extra ? '<div class="nt ex">' + esc(x.extra) + '</div>' : '') +
        (x.album && has(x.album.items) ? '<div class="ealb"><div class="ealb-h"><span class="alb-i" aria-hidden="true"></span>' + esc(x.album.label || 'Photos') + ' <b>' + x.album.items.length + '</b></div><div class="ealb-g">' + each(x.album.items, function (p, pk) {
          return '<button type="button" class="eph" data-album="' + xi + '" data-pk="' + pk + '" title="' + esc(p.title) + '" aria-label="' + esc(p.title) + '"><img src="' + esc(p.img) + '" alt="" loading="lazy"><em>' + esc(p.kind || '') + '</em></button>';
        }) + '</div></div>' : '') + '</li>';
    }) + '</ol>';
    var cats = '';
    if (has(acts)) {
      cats = '<div class="cats">' + each(acts, function (g, gi) {
        var n = g.items.length;
        return '<div class="cat' + (n > 5 ? ' two' : '') + '" role="group" style="--n:' + n + ';--g:' + gi + '" aria-label="' + esc(g.key) + '">' +
          '<h3 class="cat-h"><span>' + esc(g.key) + '</span><b>' + n + '</b></h3><div class="clist">' +
          each(g.items, function (it, k) {
            var comp = it.groups ? it.groups.map(function (q) { return q.items.length + ' ' + q.label.split(' ')[0].toLowerCase(); }).join(' · ') + ' competencies' : '';
            return '<div class="cert" style="--i:' + (gi * 4 + k) + '"><button type="button" class="cth' + (it.groups ? ' hasc' : '') + (/tesda/i.test(it.img) ? ' por' : '') + '" data-g="' + gi + '" data-k="' + k + '" title="' + esc(it.title) + '" aria-label="' + esc(g.key + ': ' + it.title) + '">' +
              '<img src="' + esc(it.img) + '" alt="" loading="lazy"></button>' +
              '<div class="ctx"><b>' + esc(it.title) + '</b><span>' + esc(it.detail || '') + '</span>' + (comp ? '<span class="cp">' + esc(comp) + '</span>' : '') + '</div></div>';
          }) + '</div></div>';
      }) + '</div>';
    }
    return section('education', 'Achievements',
      head('Educational attainment', ed.title || 'Educational Attainment') + line +
      cats);
  }

  /* ---------- build ---------- */
  var body = home() + about() + education();
  var full = D.name.first + ' ' + D.name.middle + ' ' + D.name.last;

  var menu = '<nav aria-label="Pages"><div class="pill">' +
    '<div class="links">' + each(nav, function (n) { return '<a href="#' + n.id + '" data-go="' + n.id + '"><span class="nf">' + esc(n.label) + '</span><span class="ns">' + esc(String(n.label).split(' ')[0]) + '</span></a>'; }) + '</div>' +
    '<button class="tsw" type="button" id="theme" role="switch" aria-checked="true" aria-label="Dark theme" title="Switch between dark and light">' +
    '<svg class="moon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.2 9.6A5.6 5.6 0 0 1 6.4 2.8a5.6 5.6 0 1 0 6.8 6.8z" fill="currentColor"/></svg>' +
    '<svg class="sun" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="3" fill="currentColor"/><g stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M3.2 12.8l1.1-1.1M11.7 4.3l1.1-1.1"/></g></svg>' +
    '<span class="knob" aria-hidden="true"></span></button>' +
    '</div></nav>';

  var banner = D.showSampleBanner ? '<div class="sample"><b>SAMPLE</b>Placeholder details. Replace everything with yours.</div>' : '';

  var drift = '';
  for (var ci = 0; ci < 9; ci++) {
    drift += '<i style="left:' + (6 + ci * 11) % 96 + '%;--s:' + (22 + (ci * 7) % 30) + 'px;--d:' + (16 + (ci * 5) % 14) + 's;--w:-' + (ci * 3.1).toFixed(1) + 's;--r:' + (ci % 2 ? 1 : -1) + '">' + CLOVER + '</i>';
  }
  app.innerHTML = '<div class="toast" id="toast" role="status"></div><div class="halftone" aria-hidden="true"></div><div class="drift" aria-hidden="true">' + drift + '</div>' + banner + menu + '<main class="wrap">' + body +
    '<div class="bigwrap"><button type="button" class="bigbtn ghost" id="bigPrev" hidden><svg width="22" height="22" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span id="bigPrevL"></span></button>' +
    '<button type="button" class="bigbtn" id="bigNext"><span id="bigNextL"></span><svg width="22" height="22" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>' +
    '<footer><span>© ' + esc(D.year) + ' ' + esc(full) + '</span><span>Made with HTML, CSS and JavaScript</span></footer></main>' +
    '<div class="wipe" aria-hidden="true"><div class="wp a"></div><div class="wp b"><div class="wsp"></div><div class="wc">' + CLOVER + '</div><span id="wl"></span></div></div>';

  document.title = D.siteTitle || full;
  var meta = document.querySelector('meta[name="description"]');
  if (meta && D.description) { meta.setAttribute('content', D.description); }

  /* ---------- behaviour ---------- */
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  // theme switch: dark / light, with a circular reveal from the switch
  var themeBtn = document.getElementById('theme');
  var sysLight = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : null;
  function currentTheme() {
    return root.getAttribute('data-theme') || (sysLight && sysLight.matches ? 'light' : 'dark');
  }
  function paintSwitch() {
    var t = currentTheme();
    themeBtn.setAttribute('data-mode', t);
    themeBtn.setAttribute('aria-checked', t === 'dark' ? 'true' : 'false');
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Dark theme. Switch to light.' : 'Light theme. Switch to dark.');
  }
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    paintSwitch();
  }
  try { var saved = localStorage.getItem('theme'); if (saved === 'dark' || saved === 'light') { root.setAttribute('data-theme', saved); } } catch (e) {}
  paintSwitch();
  if (sysLight && sysLight.addEventListener) { sysLight.addEventListener('change', paintSwitch); }

  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    if (reduce) { setTheme(next); return; }
    var r0 = themeBtn.getBoundingClientRect();
    var x = r0.left + r0.width / 2, y = r0.top + r0.height / 2;
    function fade() {
      root.classList.add('theming');
      setTheme(next);
      setTimeout(function () { root.classList.remove('theming'); }, 800);
    }
    if (!document.startViewTransition) { fade(); return; }
    try {
      var vt = document.startViewTransition(function () { setTheme(next); });
      var radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      vt.ready.then(function () {
        root.animate(
          { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
          { duration: 750, easing: 'cubic-bezier(.65,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(function () {});
    } catch (err) { fade(); }
  });

  // work carousel buttons
  var track = document.getElementById('track');
  if (track) {
    var step = function (dir) {
      var s = track.querySelector('.slide');
      track.scrollBy({ left: dir * (s ? s.offsetWidth + 20 : 300), behavior: reduce ? 'auto' : 'smooth' });
    };
    document.getElementById('prev').onclick = function () { step(-1); };
    document.getElementById('next').onclick = function () { step(1); };
  }

  /* ---------- pages ---------- */
  var views = [].slice.call(document.querySelectorAll('.view'));
  var keys = views.map(function (v) { return v.getAttribute('data-view'); });
  var labels = {}; nav.forEach(function (n) { labels[n.id] = n.label; });
  var links = [].slice.call(document.querySelectorAll('.links a'));
  var wipe = document.querySelector('.wipe'), wpA = wipe.querySelector('.a'), wpB = wipe.querySelector('.b');
  var current = null, busy = false, pending = null;
  var canAnimate = !!(wpA.animate && window.Promise);

  // previous / next buttons live in the top bar, so there is no need to scroll
  var stPrev = document.getElementById('stPrev'), stNext = document.getElementById('stNext');
  var bigPrev = document.getElementById('bigPrev'), bigNext = document.getElementById('bigNext');
  function setSteps(key) {
    var k = keys.indexOf(key), last = keys.length - 1;
    if (bigPrev && bigNext) {
      bigPrev.hidden = k <= 0; bigNext.hidden = k >= last;
      if (k > 0) { bigPrev.setAttribute('data-go', keys[k - 1]); document.getElementById('bigPrevL').textContent = 'Back: ' + labels[keys[k - 1]]; }
      if (k < last) { bigNext.setAttribute('data-go', keys[k + 1]); document.getElementById('bigNextL').textContent = 'Next: ' + labels[keys[k + 1]]; }
    }
    if (!stPrev || !stNext) { return; }
    var i = keys.indexOf(key), p = keys[(i + keys.length - 1) % keys.length], n = keys[(i + 1) % keys.length];
    stPrev.setAttribute('data-go', p); stPrev.title = 'Previous: ' + labels[p];
    stNext.setAttribute('data-go', n); stNext.title = 'Next: ' + labels[n];
  }

  // content of each page fades in one piece after another
  var STAG = '.head, .about .copy, .facts, .stats .stat, .polaroid, .thanks, .focus > div, .edublock, .skillsblock, .rows li, .train, .imm-info, .imm-photos, .svc, .slide, .list .row, .bc, .contact > div, .closing, .split-txt > *, .split-pic';
  views.forEach(function (v) {
    var n = 0;
    [].slice.call(v.querySelectorAll(STAG)).forEach(function (el) {
      el.classList.add('a-in'); el.style.setProperty('--i', Math.min(n++, 12));
    });
  });

  function countUp(key) {
    var v = document.getElementById('v-' + key); if (!v) { return; }
    [].slice.call(v.querySelectorAll('[data-count]')).forEach(function (el) {
      var end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = null;
      if (reduce) { el.textContent = end + suf; return; }
      el.textContent = '0' + suf;
      (function tick(t) {
        if (t0 === null) { t0 = t; }
        var p = Math.min((t - t0) / 1100, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) { requestAnimationFrame(tick); }
      })(performance.now());
    });
  }

  function swap(key) {
    views.forEach(function (v) { v.hidden = v.getAttribute('data-view') !== key; });
    current = key;
    setSteps(key);
    window.scrollTo(0, 0);
    links.forEach(function (a) {
      var on = a.getAttribute('data-go') === key;
      a.classList.toggle('on', on);
      if (on) {
        var strip = a.parentNode, l = a.offsetLeft, r = l + a.offsetWidth;   // move only the menu strip
        if (l < strip.scrollLeft || r > strip.scrollLeft + strip.clientWidth) { strip.scrollLeft = l - (strip.clientWidth - a.offsetWidth) / 2; }
      }
    });
    document.title = key === 'home' ? (D.siteTitle || full) : labels[key] + ' | ' + full;
    var v = document.getElementById('v-' + key);
    if (v) { v.setAttribute('tabindex', '-1'); try { v.focus({ preventScroll: true }); } catch (e) {} }
    countUp(key);
  }

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // wipe label: one word per line, sized so it always fits and sits in the centre
  function fitLabel(text) {
    var el = document.getElementById('wl');
    el.innerHTML = text.split(/\s+/).map(function (w) { return '<span class="wd">' + esc(w) + '</span>'; }).join('');
    el.style.fontSize = '100px';
    var maxW = 0, wds = el.querySelectorAll('.wd');
    for (var i = 0; i < wds.length; i++) { maxW = Math.max(maxW, wds[i].getBoundingClientRect().width); }
    var vw = window.innerWidth, vh = window.innerHeight;
    var byW = maxW ? 100 * (vw * 0.84) / maxW : 100;
    var byH = 100 * (vh * 0.6) / (wds.length * 90);
    el.style.fontSize = Math.max(28, Math.min(byW, byH, 220)) + 'px';
  }

  function go(key) {
    if (keys.indexOf(key) < 0) { key = 'home'; }
    if (busy) { pending = key; return; }
    if (key === current) { return; }
    if (current === null || reduce || !canAnimate) { swap(key); return; }
    busy = true;
    fitLabel(labels[key]);
    wipe.style.visibility = 'visible';
    var ease = 'cubic-bezier(.76,0,.24,1)';
    var inn = [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }];
    var out = [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }];
    function finish() {
      wpA.getAnimations().concat(wpB.getAnimations()).forEach(function (x) { x.cancel(); });
      wipe.style.visibility = 'hidden'; busy = false;
      if (pending) { var nx = pending; pending = null; remember(nx); go(nx); }
    }
    var guard = setTimeout(function () { if (busy) { swap(key); finish(); } }, 3500);
    try {
      wpA.animate(inn, { duration: 600, easing: ease, fill: 'forwards' });
      wpB.animate(inn, { duration: 600, delay: 80, easing: ease, fill: 'forwards' }).finished
        .then(function () { swap(key); return wait(100); })
        .then(function () {
          wpA.animate(out, { duration: 600, easing: ease, fill: 'forwards' });
          return wpB.animate(out, { duration: 600, delay: 80, easing: ease, fill: 'forwards' }).finished;
        })
        .then(function () { clearTimeout(guard); finish(); })
        .catch(function () { clearTimeout(guard); swap(key); finish(); });
    } catch (err) { clearTimeout(guard); swap(key); finish(); }
  }

  function keyFromHash() { return (location.hash || '').replace('#', ''); }
  function remember(key) { try { history.pushState(null, '', '#' + key); } catch (e) {} }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-go]') : null;
    if (!t) { return; }
    e.preventDefault();
    var key = t.getAttribute('data-go');
    if (key !== current) { remember(key); }
    go(key);
  });
  window.addEventListener('popstate', function () { go(keyFromHash()); });
  window.addEventListener('hashchange', function () { go(keyFromHash()); });
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) { return; }
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') { return; }
    if (e.target.closest && e.target.closest('.track, input, textarea, select')) { return; }
    if (typeof box !== 'undefined' && !box.hidden) { return; }
    var i = keys.indexOf(current) + (e.key === 'ArrowRight' ? 1 : -1);
    if (i >= 0 && i < keys.length) { remember(keys[i]); go(keys[i]); }
  });

  // certificate zoom
  var box = document.createElement('div');
  box.className = 'lightbox'; box.hidden = true;
  box.innerHTML = '<button type="button" class="lb-close" aria-label="Close">✕</button><img alt="">';
  document.body.appendChild(box);
  function closeBox() { box.hidden = true; document.documentElement.style.overflow = ''; }
  [].slice.call(document.querySelectorAll('[data-zoom]')).forEach(function (z) {
    z.addEventListener('click', function () {
      box.querySelector('img').src = z.getAttribute('data-zoom');
      box.hidden = false; document.documentElement.style.overflow = 'hidden';
      box.querySelector('.lb-close').focus();
    });
  });
  box.addEventListener('click', closeBox);
  // education page: tabs, thumbnails and zoom
  [].slice.call(document.querySelectorAll('.acts')).forEach(function (acts) {
    var tabs = [].slice.call(acts.querySelectorAll('.atab')), panes = [].slice.call(acts.querySelectorAll('.apane'));
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x, j) { x.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
        panes.forEach(function (p, j) { p.hidden = j !== i; });
      });
    });
    panes.forEach(function (p) {
      var main = p.querySelector('.amain img'), th = [].slice.call(p.querySelectorAll('.ath'));
      th.forEach(function (b, j) { b.style.setProperty('--i', j); });
      function replay(el) { if (!el) { return; } el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); }
      function pick(k) {
        th.forEach(function (b, j) { b.classList.toggle('on', j === k); });
        p.classList.toggle('nc', !!p.querySelector('.acomp[data-k="' + k + '"]'));
        [].slice.call(p.querySelectorAll('.acomp')).forEach(function (c) { c.hidden = c.getAttribute('data-k') !== String(k); });
        var b = th[k]; main.src = b.getAttribute('data-img'); main.alt = b.getAttribute('data-title');
        p.querySelector('.at').textContent = b.getAttribute('data-title');
        p.querySelector('.ad').textContent = b.getAttribute('data-detail');
        replay(main); replay(p.querySelector('.acap'));
        p.querySelector('.ac').textContent = (k + 1) + ' of ' + th.length + ' · click the picture to zoom';
      }
      th.forEach(function (b, k) { b.addEventListener('click', function () { pick(k); }); });
      p.querySelector('.amain').addEventListener('click', function () {
        box.querySelector('img').src = main.src; box.hidden = false; document.documentElement.style.overflow = 'hidden';
        box.querySelector('.lb-close').focus();
      });
      [].slice.call(p.querySelectorAll('.cgh')).forEach(function (h) {
        h.addEventListener('click', function () {
          var g = h.parentNode, open = !g.classList.contains('on');
          [].slice.call(g.parentNode.querySelectorAll('.cgrp')).forEach(function (o) {
            o.classList.remove('on'); o.querySelector('.cgh').setAttribute('aria-expanded', 'false');
          });
          if (open) { g.classList.add('on'); h.setAttribute('aria-expanded', 'true'); }
        });
      });
      if (th.length) { pick(0); }
    });
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeBox(); } });

  // copy buttons
  var toast = document.getElementById('toast');
  function say(t) { toast.textContent = t; setTimeout(function () { toast.textContent = ''; }, 2200); }
  [].slice.call(document.querySelectorAll('[data-copy]')).forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-copy');
      try {
        navigator.clipboard.writeText(v).then(function () { say('Copied: ' + v); }, function () { say('Select the text and press Ctrl+C'); });
      } catch (err) { say('Select the text and press Ctrl+C'); }
    });
  });

  // competency groups: slide open and closed, items glide in one by one
  [].slice.call(document.querySelectorAll('.grp')).forEach(function (d) {
    var sum = d.querySelector('summary'), body = d.querySelector('.gbody'), anim = null;
    [].slice.call(d.querySelectorAll('li')).forEach(function (li, i) { li.style.setProperty('--k', i); });
    if (d.hasAttribute('open')) { d.classList.add('on'); }
    sum.addEventListener('click', function (e) {
      e.preventDefault();
      if (anim) { anim.cancel(); anim = null; }
      var opening = !d.classList.contains('on');
      d.classList.toggle('on', opening);
      if (reduce || !body.animate) { if (opening) { d.setAttribute('open', ''); } else { d.removeAttribute('open'); } return; }
      var h;
      if (opening) {
        d.setAttribute('open', '');
        h = body.offsetHeight;
        anim = body.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' });
        anim.onfinish = function () { anim = null; };
      } else {
        h = body.offsetHeight;
        var a2 = anim = body.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 340, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
        a2.onfinish = function () { d.removeAttribute('open'); a2.cancel(); if (anim === a2) { anim = null; } };
      }
    });
  });

  // tabs: pages with several parts show one part at a time, so nothing needs a long scroll
  views.forEach(function (v) {
    var panels = [].slice.call(v.querySelectorAll(':scope > .blk[data-tab]'));
    if (panels.length < 2) { return; }
    var bar = document.createElement('div'); bar.className = 'tabs'; bar.setAttribute('role', 'tablist');
    panels.forEach(function (p, i) {
      p.classList.add('tabp'); p.hidden = i !== 0;
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab');
      b.textContent = p.getAttribute('data-tab'); b.className = i === 0 ? 'on' : '';
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () {
        panels.forEach(function (q, j) {
          var on = j === i; q.hidden = !on;
          bar.children[j].classList.toggle('on', on); bar.children[j].setAttribute('aria-selected', on ? 'true' : 'false');
          if (on) { q.classList.remove('tin'); void q.offsetWidth; q.classList.add('tin'); countUp(v.getAttribute('data-view')); }
        });
      });
      bar.appendChild(b);
    });
    var hd = v.querySelector('.head'); if (hd) { hd.insertAdjacentElement('afterend', bar); } else { v.insertBefore(bar, v.firstChild); }
  });

  // profile picture: gentle 3D tilt that follows the mouse
  var pp = document.querySelector('.portrait.photo');
  if (pp && !reduce && window.matchMedia && matchMedia('(hover:hover)').matches) {
    pp.addEventListener('mousemove', function (e) {
      var r = pp.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      pp.style.setProperty('--rx', (-y * 14).toFixed(1) + 'deg');
      pp.style.setProperty('--ry', (x * 14).toFixed(1) + 'deg');
    });
    pp.addEventListener('mouseleave', function () { pp.style.setProperty('--rx', '0deg'); pp.style.setProperty('--ry', '0deg'); });
  }

  // open the page named in the link, or the home page
  go(keyFromHash());
})();

/* opening transition: name card slides away, then the page rises in */
(function () {
  try {
    var root = document.documentElement;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
    root.classList.add('booting', 'hold');
    var el = document.createElement('div'); el.id = 'intro';
    var P = window.PORTFOLIO || {}, n = P.name || {};
    var full = [n.first, n.middle, n.last].filter(Boolean).join(' ') || 'Portfolio';
    el.innerHTML = '<div><b></b><i></i><small>Portfolio ' + new Date().getFullYear() + '</small></div>';
    el.querySelector('b').textContent = full;
    document.body.appendChild(el);
    var started = false;
    function go() {
      if (started) { return; } started = true;
      root.classList.remove('hold');
      setTimeout(function () { if (el.parentNode) { el.parentNode.removeChild(el); } }, 1700);
      setTimeout(function () { root.classList.remove('booting'); }, 2600);
    }
    setTimeout(go, 1200);
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('900 1em Archivo'), document.fonts.load('600 1em "Hanken Grotesk"'), document.fonts.load('500 1em "JetBrains Mono"')]).then(go, go);
    } else { go(); }
  } catch (e) {}
})();

/* fit engine: shrink the page text until nothing needs scrolling (any screen size) */
(function () {
  var root = document.documentElement, busy = false, timer = null;
  function over(v) {
    if (v.id === 'v-home') {
      var vb = v.getBoundingClientRect().bottom + 1, vr = v.getBoundingClientRect().right + 1, bad = false;
      [].slice.call(v.querySelectorAll('.split-txt > *, .split-pic .portrait')).forEach(function (e) {
        var r = e.getBoundingClientRect(); if (r.height && (r.bottom > vb || r.right > vr)) { bad = true; }
      });
      return bad;
    }
    return v.scrollHeight - v.clientHeight > 1 || v.scrollWidth - v.clientWidth > 1;
  }
  function tabsOf(v) { return [].slice.call(v.querySelectorAll('.atab')); }
  function panesOf(v) { return [].slice.call(v.querySelectorAll('.apane')); }
  function save(v) {
    var tabs = tabsOf(v), panes = panesOf(v);
    return {
      tab: tabs.map(function (t) { return t.getAttribute('aria-selected') === 'true'; }).indexOf(true),
      pick: panes.map(function (p) { return [].slice.call(p.querySelectorAll('.ath')).map(function (b) { return b.classList.contains('on'); }).indexOf(true); }),
      grp: panes.map(function (p) { return [].slice.call(p.querySelectorAll('.cgrp')).map(function (g) { return g.classList.contains('on'); }).indexOf(true); })
    };
  }
  function openGroup(p, g) {
    var gs = [].slice.call(p.querySelectorAll('.cgrp'));
    if (gs[g] && !gs[g].classList.contains('on')) { gs[g].querySelector('.cgh').click(); }
  }
  function restore(v, s) {
    var tabs = tabsOf(v), panes = panesOf(v);
    panes.forEach(function (p, i) {
      var th = p.querySelectorAll('.ath'); if (s.pick[i] >= 0 && th[s.pick[i]]) { th[s.pick[i]].click(); }
      var gs = p.querySelectorAll('.cgrp');
      if (s.grp[i] >= 0) { openGroup(p, s.grp[i]); } else { [].slice.call(gs).forEach(function (g) { g.classList.remove('on'); }); }
    });
    if (s.tab >= 0 && tabs[s.tab]) { tabs[s.tab].click(); }
  }
  /* worst case: every tab, the longest caption, and every competency group */
  function worst(v) {
    var tabs = tabsOf(v), panes = panesOf(v), bad = over(v);
    if (!tabs.length) { return bad; }
    tabs.forEach(function (t, i) {
      if (bad) { return; }
      t.click();
      var p = panes[i], th = [].slice.call(p.querySelectorAll('.ath'));
      var len = th.map(function (b) { return (b.getAttribute('data-title') + b.getAttribute('data-detail')).length; });
      var longest = len.indexOf(Math.max.apply(null, len));
      var nc = th.map(function (b, k) { return p.querySelector('.acomp[data-k="' + k + '"]') ? k : -1; }).filter(function (k) { return k >= 0; });
      var picks = [longest].concat(nc.filter(function (k) { return k !== longest; }));
      picks.forEach(function (k) {
        if (bad || k < 0) { return; }
        th[k].click();
        var n = p.querySelectorAll('.cgrp').length;
        if (nc.indexOf(k) >= 0 && n) { for (var g = 0; g < n && !bad; g++) { openGroup(p, g); bad = over(v); } }
        else { bad = over(v); }
      });
    });
    return bad;
  }
  function fit(v) {
    if (!v || !v.offsetHeight || busy) { return; }
    busy = true; root.classList.add('nofx');
    var st = save(v), lo = 0.3, hi = 1.4, best = lo;
    function setFit(f) {
      v.style.setProperty('--fit', f);
      if (v.id === 'v-home') { [].slice.call(v.querySelectorAll('.split-txt,.split-pic')).forEach(function (e) { e.style.zoom = f; }); }
    }
    setFit(hi);
    if (!worst(v)) { best = hi; }
    else {
      for (var i = 0; i < 8; i++) {
        var mid = (lo + hi) / 2; setFit(mid);
        if (!worst(v)) { best = mid; lo = mid; } else { hi = mid; }
      }
    }
    setFit(best);
    restore(v, st);
    root.classList.remove('nofx'); busy = false;
  }
  function run() {
    [].slice.call(document.querySelectorAll('main .view')).forEach(function (v) { if (v.offsetHeight) { fit(v); } });
  }
  function later() { clearTimeout(timer); timer = setTimeout(run, 120); }
  window.addEventListener('resize', later);
  window.addEventListener('orientationchange', later);
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(later);
    [].slice.call(document.querySelectorAll('main .view')).forEach(function (v) { ro.observe(v); });
  }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(later); }
  window.addEventListener('load', later);
  later();
})();


/* ---------- graduation album (diploma + photos) ---------- */
(function () {
  var D = window.PORTFOLIO || {}, list = (D.education && D.education.list) || [];
  var root = document.documentElement, al = document.createElement('div');
  al.className = 'album'; al.hidden = true; al.setAttribute('role', 'dialog'); al.setAttribute('aria-modal', 'true');
  al.innerHTML =
    '<div class="al-bar"><i class="al-prog"></i></div>' +
    '<div class="al-top"><div class="al-h"><span class="al-lv"></span><b class="al-sc"></b></div>' +
    '<button type="button" class="al-play" aria-pressed="false">&#9654; Slideshow</button>' +
    '<button type="button" class="al-x" aria-label="Close album">&#10005;</button></div>' +
    '<div class="al-stage"><figure class="al-fig"><button type="button" class="al-nav al-prev" aria-label="Previous">&#8249;</button><div class="al-frame"><img alt=""></div>' +
    '<figcaption><span class="al-kind"></span><b class="al-ct"></b><span class="al-cd"></span></figcaption>' +
    '<button type="button" class="al-nav al-next" aria-label="Next">&#8250;</button></figure>' +
    '<aside class="al-comp" aria-label="Competencies"></aside></div>' +
    '<div class="al-strip"></div>';
  document.body.appendChild(al);
  var img = al.querySelector('.al-frame img'), strip = al.querySelector('.al-strip'), fig = al.querySelector('.al-fig'),
      prog = al.querySelector('.al-prog'), playBtn = al.querySelector('.al-play'),
      items = [], cur = 0, timer = null, opener = null, metaCur = {};
  function e2(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function renderComp(it) {
    var c = qs('.al-comp');
    if (!it.groups) { al.classList.remove('has-comp'); c.innerHTML = ''; return; }
    al.classList.add('has-comp');
    c.innerHTML = it.groups.map(function (g, gi) {
      return '<div class="ag' + (gi === 0 ? ' on' : '') + '"><button type="button" class="agh" aria-expanded="' + (gi === 0) + '"><span>' + e2(g.label) + '</span><em>' + g.items.length + ' units</em><i aria-hidden="true">+</i></button><div class="agb"><ul>' + g.items.map(function (t, ti) { return '<li style="--k:' + ti + '">' + e2(t) + '</li>'; }).join('') + '</ul></div></div>';
    }).join('');
  }
  function qs(c) { return al.querySelector(c); }
  function show(k, dir) {
    cur = (k + items.length) % items.length;
    var it = items[cur];
    fig.classList.remove('go-next', 'go-prev'); void fig.offsetWidth;
    fig.classList.add(dir < 0 ? 'go-prev' : 'go-next');
    img.src = it.img; img.alt = it.title;
    qs('.al-kind').textContent = it.kind || '';
    qs('.al-ct').textContent = it.title; qs('.al-cd').textContent = it.detail || '';
    renderComp(it);
    if (metaCur.dyn) { qs('.al-lv').textContent = it.kind; qs('.al-sc').textContent = 'Certificate ' + (cur + 1) + ' of ' + items.length; }
    [].slice.call(strip.children).forEach(function (b, j) { b.classList.toggle('on', j === cur); b.setAttribute('aria-current', j === cur ? 'true' : 'false'); });
    if (timer) { run(); }
  }
  function run() {
    stop(true); playBtn.setAttribute('aria-pressed', 'true'); playBtn.innerHTML = '&#10074;&#10074; Pause';
    prog.style.animation = 'none'; void prog.offsetWidth; prog.style.animation = 'alProg 4s linear forwards';
    timer = setTimeout(function () { show(cur + 1, 1); }, 4000);
  }
  function stop(keep) {
    clearTimeout(timer); timer = null; prog.style.animation = 'none';
    if (!keep) { playBtn.setAttribute('aria-pressed', 'false'); playBtn.innerHTML = '&#9654; Slideshow'; }
  }
  function open(i, btn) {
    var e = list[i]; if (!e || !e.album) { return; }
    openWith({ lv: e.level + ' · ' + e.when, sc: e.school }, e.album.items, 0, btn);
  }
  function openWith(meta, its, start, btn) {
    items = its; opener = btn; metaCur = meta;
    qs('.al-lv').textContent = meta.lv; qs('.al-sc').textContent = meta.sc;
    al.style.setProperty('--n', items.length); al.classList.toggle('one', items.length < 2); al.classList.toggle('many', items.length > 8);
    strip.innerHTML = items.map(function (it, j) {
      return '<button type="button" class="al-th" style="--i:' + j + '" aria-label="' + e2(it.title) + '"><img src="' + it.img + '" alt=""><em>' + (it.kind || '') + '</em></button>';
    }).join('');
    [].slice.call(strip.children).forEach(function (b, j) { b.addEventListener('click', function () { show(j, j < cur ? -1 : 1); }); });
    items.forEach(function (it) { var p = new Image(); p.src = it.img; });
    al.hidden = false; root.classList.add('album-open'); void al.offsetWidth; al.classList.add('in');
    show(start, 1); stop(); qs('.al-x').focus();
  }
  function close() {
    if (al.hidden) { return; }
    stop(); al.classList.remove('in'); al.hidden = true; root.classList.remove('album-open');
    if (opener) { opener.focus(); }
  }
  [].slice.call(document.querySelectorAll('.alb')).forEach(function (b) {
    b.addEventListener('click', function () { open(+b.getAttribute('data-album'), b); });
  });
  [].slice.call(document.querySelectorAll('.eph')).forEach(function (b) {
    b.addEventListener('click', function () {
      var e = list[+b.getAttribute('data-album')]; if (!e || !e.album) { return; }
      openWith({ lv: e.level + ' · ' + e.when, sc: e.school }, e.album.items, +b.getAttribute('data-pk'), b);
    });
  });
  qs('.al-comp').addEventListener('click', function (e) {
    var h = e.target.closest ? e.target.closest('.agh') : null; if (!h) { return; }
    var g = h.parentNode, was = g.classList.contains('on');
    [].slice.call(g.parentNode.children).forEach(function (o) { o.classList.remove('on'); o.firstChild.setAttribute('aria-expanded', 'false'); });
    if (!was) { g.classList.add('on'); h.setAttribute('aria-expanded', 'true'); }
  });
  var flat = [];
  (D.activities || []).forEach(function (g) { g.items.forEach(function (it) { flat.push({ img: it.img, title: it.title, detail: it.detail, kind: g.key, groups: it.groups }); }); });
  [].slice.call(document.querySelectorAll('.cth')).forEach(function (b) {
    b.addEventListener('click', function () {
      var gi = +b.getAttribute('data-g'), k = +b.getAttribute('data-k'), idx = k;
      for (var q = 0; q < gi; q++) { idx += D.activities[q].items.length; }
      openWith({ dyn: true, lv: '', sc: '' }, flat, idx, b);
    });
  });
  qs('.al-x').addEventListener('click', close);
  qs('.al-prev').addEventListener('click', function () { show(cur - 1, -1); });
  qs('.al-next').addEventListener('click', function () { show(cur + 1, 1); });
  playBtn.addEventListener('click', function () { if (timer) { stop(); } else { run(); } });
  al.addEventListener('click', function (e) { if (e.target === al || e.target.classList.contains('al-stage')) { close(); } });
  window.addEventListener('keydown', function (e) {
    if (al.hidden) { return; }
    if (e.key === 'Escape') { close(); e.stopImmediatePropagation(); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { show(cur + 1, 1); e.stopImmediatePropagation(); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { show(cur - 1, -1); e.stopImmediatePropagation(); e.preventDefault(); }
  }, true);
  var sx = null;
  al.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  al.addEventListener('touchend', function (e) {
    if (sx === null) { return; }
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 45) { show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); }
  }, { passive: true });
})();
