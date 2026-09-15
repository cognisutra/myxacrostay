/* ==========================================================
   Silver Rain Suites — Admin Command Center
   PIN gate is client-side (static backend-less app).
   ========================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'srs_feedbacks';
  const ROOMS_KEY = 'srs_rooms';
  const SESSION_KEY = 'srs_admin_auth';
  const DEFAULT_ROOMS = [
    { number: '001', type: 'Suite Room' },
    { number: '002', type: 'Standard Room' },
    { number: '003', type: 'Executive Room' },
    { number: '004', type: 'Standard Room' },
    { number: '005', type: 'Standard Room' },
    { number: '006', type: 'Standard Room' },
    { number: '007', type: 'Standard Room' },
    { number: '008', type: 'Standard Room' },
    { number: '101', type: 'Suite Room' },
    { number: '102', type: 'Standard Room' },
    { number: '103', type: 'Standard Room' },
    { number: '104', type: 'Executive Room' },
    { number: '105', type: 'Standard Room' },
    { number: '106', type: 'Standard Room' },
    { number: '107', type: 'Standard Room' },
    { number: '108', type: 'Twin Bed Room' },
    { number: '109', type: 'Twin Bed Room' },
    { number: '201', type: 'Standard Room' },
    { number: '202', type: 'Standard Room' },
    { number: '203', type: 'Standard Room' },
    { number: '204', type: 'Suite Room' },
  ];

  const CATEGORIES = [
    { id: 'reservation',   num: '01', title: 'Reservation & Pre-arrival' },
    { id: 'arrival',       num: '02', title: 'Arrival & Welcome' },
    { id: 'room',          num: '03', title: 'Room' },
    { id: 'housekeeping',  num: '04', title: 'Housekeeping' },
    { id: 'dining',        num: '05', title: 'Dining' },
    { id: 'instay',        num: '06', title: 'In-stay Service' },
    { id: 'departure',     num: '07', title: 'Departure' },
    { id: 'overall',       num: '08', title: 'Overall Experience' },
  ];

  const TAB_METADATA = {
    'tab-overview': { title: 'Analytics & KPIs', subtitle: 'Real-time telemetry and guest experience insights' },
    'tab-feedbacks': { title: 'Guest Feedbacks', subtitle: 'Search, filter, and inspect guest response submissions' },
    'tab-rooms': { title: 'Room Inventory Control', subtitle: 'Manage active room dropdown options on guest feedback forms' },
    'tab-insights': { title: 'Staff & Voice Insights', subtitle: 'Staff member recognitions and guest feedback highlights' },
    'tab-settings': { title: 'Data & Security Controls', subtitle: 'Backup exports, spreadsheet CSV generators, and system storage' },
  };

  /* ---------------------------------------------------------
     Magical Canvas Background System — Floating Aurora Orbs,
     Glistening Rain, Twinkling Sparkles & Interactive Ripples
     --------------------------------------------------------- */
  function initRain() {
    const canvas = document.getElementById('rain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    let drops = [];
    let sparkles = [];
    let ripples = [];
    let orbs = [];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      // Initialize Rain Drops with Glowing Tips
      const dropCount = Math.max(40, Math.floor((w * h) / 20000));
      drops = Array.from({ length: dropCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        len: 12 + Math.random() * 24,
        speed: 2.2 + Math.random() * 3.5,
        opacity: 0.15 + Math.random() * 0.35,
        width: 1 + Math.random() * 1.5,
        isGold: Math.random() > 0.55
      }));

      // Initialize Twinkling Star Sparkles
      const sparkleCount = Math.max(25, Math.floor(w / 50));
      sparkles = Array.from({ length: sparkleCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 1 + Math.random() * 2.5,
        alpha: Math.random(),
        speed: 0.008 + Math.random() * 0.018,
        increasing: Math.random() > 0.5
      }));

      // Floating Aurora Orbs
      orbs = [
        { x: w * 0.2, y: h * 0.25, radius: 260, vx: 0.25, vy: 0.15, color: 'rgba(185, 146, 79, 0.14)' },
        { x: w * 0.8, y: h * 0.75, radius: 320, vx: -0.2, vy: -0.25, color: 'rgba(126, 151, 160, 0.16)' },
        { x: w * 0.5, y: h * 0.15, radius: 220, vx: 0.12, vy: -0.12, color: 'rgba(60, 74, 82, 0.25)' }
      ];
    }

    // Add Interactive Ripples on Mouse / Touch
    function addRipple(x, y) {
      if (ripples.length < 18) {
        ripples.push({
          x: x,
          y: y,
          radius: 2,
          maxRadius: 45 + Math.random() * 35,
          opacity: 0.65,
          color: Math.random() > 0.5 ? 'rgba(185, 146, 79, ' : 'rgba(126, 151, 160, '
        });
      }
    }

    window.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.82) addRipple(e.clientX, e.clientY);
    });
    window.addEventListener('click', (e) => {
      addRipple(e.clientX, e.clientY);
      addRipple(e.clientX, e.clientY);
    });

    function tick() {
      ctx.clearRect(0, 0, w, h);

      // 1. Draw Floating Aurora Orbs
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -120 || orb.x > w + 120) orb.vx *= -1;
        if (orb.y < -120 || orb.y > h + 120) orb.vy *= -1;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Interactive Water Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color + rip.opacity + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        rip.radius += 1.3;
        rip.opacity *= 0.95;

        if (rip.opacity < 0.02 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // 3. Draw Glistening Raindroplets with Glowing Heads
      for (const d of drops) {
        ctx.globalAlpha = d.opacity;
        const colorGrad = ctx.createLinearGradient(d.x, d.y, d.x - 1.5, d.y + d.len);
        if (d.isGold) {
          colorGrad.addColorStop(0, 'rgba(185, 146, 79, 0.08)');
          colorGrad.addColorStop(1, 'rgba(216, 190, 140, 0.85)');
        } else {
          colorGrad.addColorStop(0, 'rgba(126, 151, 160, 0.08)');
          colorGrad.addColorStop(1, 'rgba(237, 241, 242, 0.75)');
        }

        ctx.strokeStyle = colorGrad;
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1.5, d.y + d.len);
        ctx.stroke();

        // Glowing Drop Head
        ctx.fillStyle = d.isGold ? 'rgba(235, 195, 120, 0.95)' : 'rgba(237, 241, 242, 0.95)';
        ctx.beginPath();
        ctx.arc(d.x - 1.5, d.y + d.len, d.width * 1.1, 0, Math.PI * 2);
        ctx.fill();

        d.y += d.speed;
        d.x -= 0.18;
        if (d.y > h) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }
      }

      // 4. Draw Twinkling Sparkles
      for (const s of sparkles) {
        ctx.globalAlpha = s.alpha * 0.75;
        ctx.fillStyle = '#FFE6B3';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        if (s.increasing) {
          s.alpha += s.speed;
          if (s.alpha >= 1) s.increasing = false;
        } else {
          s.alpha -= s.speed;
          if (s.alpha <= 0.1) s.increasing = true;
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------
     PIN Authentication
     --------------------------------------------------------- */
  let pinBuffer = '';
  function initLogin() {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      showDashboard();
      return;
    }
    const dots = () => document.querySelectorAll('.pin-dot');
    const errEl = document.getElementById('pin-error');

    function render() {
      dots().forEach((d, i) => d.classList.toggle('filled', i < pinBuffer.length));
    }
    function reject() {
      const panel = document.getElementById('login-screen').firstElementChild;
      panel.classList.add('shake');
      errEl.textContent = 'Incorrect PIN — try again';
      setTimeout(() => panel.classList.remove('shake'), 400);
      pinBuffer = '';
      render();
    }
    function tryAuth() {
      if (pinBuffer.length !== 6) return;
      if (pinBuffer === PIN) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        showDashboard();
      } else {
        reject();
      }
    }

    document.querySelectorAll('#keypad [data-key]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (pinBuffer.length >= 6) return;
        pinBuffer += btn.dataset.key;
        errEl.textContent = '';
        render();
        if (pinBuffer.length === 6) setTimeout(tryAuth, 120);
      });
    });
    document.getElementById('pin-clear').addEventListener('click', () => { pinBuffer = ''; errEl.textContent = ''; render(); });
    document.getElementById('pin-back').addEventListener('click', () => { pinBuffer = pinBuffer.slice(0, -1); render(); });

    window.addEventListener('keydown', (e) => {
      if (document.getElementById('login-screen').classList.contains('hidden')) return;
      if (/^[0-9]$/.test(e.key) && pinBuffer.length < 6) { pinBuffer += e.key; errEl.textContent=''; render(); if (pinBuffer.length===6) setTimeout(tryAuth,120); }
      if (e.key === 'Backspace') { pinBuffer = pinBuffer.slice(0, -1); render(); }
    });
  }

  function showDashboard() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard-screen').classList.remove('hidden');
    renderDashboard();
  }

  /* ---------------------------------------------------------
     Data Helpers
     --------------------------------------------------------- */
  function getEntries() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }
  function setEntries(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  /* ---------------------------------------------------------
     Room Management
     --------------------------------------------------------- */
  function getRooms() {
    try {
      const stored = localStorage.getItem(ROOMS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(r => {
            if (typeof r === 'string') {
              const defaultMatch = DEFAULT_ROOMS.find(d => d.number === r);
              return defaultMatch || { number: r, type: 'Standard Room' };
            }
            return r;
          });
        }
      }
    } catch (e) {}
    return DEFAULT_ROOMS;
  }

  function setRooms(rooms) {
    localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
  }

  function roomBadgeHTML(type) {
    if (type === 'Suite Room') {
      return `<span class="px-2 py-0.5 text-[10.5px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300"><i class="fa-solid fa-crown mr-1 text-[9px]"></i>Suite</span>`;
    }
    if (type === 'Executive Room') {
      return `<span class="px-2 py-0.5 text-[10.5px] font-bold rounded-full bg-purple-100 text-purple-800 border border-purple-300"><i class="fa-solid fa-user-tie mr-1 text-[9px]"></i>Executive</span>`;
    }
    if (type === 'Twin Bed Room') {
      return `<span class="px-2 py-0.5 text-[10.5px] font-bold rounded-full bg-teal-100 text-teal-800 border border-teal-300"><i class="fa-solid fa-bed mr-1 text-[9px]"></i>Twin Bed</span>`;
    }
    return `<span class="px-2 py-0.5 text-[10.5px] font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-300"><i class="fa-solid fa-door-closed mr-1 text-[9px]"></i>Standard</span>`;
  }

  function renderRooms() {
    const mount = document.getElementById('rooms-pill-list');
    const countsMount = document.getElementById('room-type-counts');
    const filterSelect = document.getElementById('filter-room-type');
    if (!mount) return;

    const rooms = getRooms();
    const typeFilter = filterSelect ? filterSelect.value : '';

    // Render type summary counts
    if (countsMount) {
      const counts = { 'Suite Room': 0, 'Executive Room': 0, 'Twin Bed Room': 0, 'Standard Room': 0 };
      rooms.forEach(r => { counts[r.type] = (counts[r.type] || 0) + 1; });
      countsMount.innerHTML = `
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <p class="text-[10.5px] font-extrabold text-amber-800 uppercase tracking-wider">Suite Rooms</p>
          <p class="font-display text-2xl font-bold text-amber-950 mt-0.5">${counts['Suite Room'] || 0}</p>
        </div>
        <div class="p-3 rounded-xl bg-purple-50 border border-purple-200">
          <p class="text-[10.5px] font-extrabold text-purple-800 uppercase tracking-wider">Executive</p>
          <p class="font-display text-2xl font-bold text-purple-950 mt-0.5">${counts['Executive Room'] || 0}</p>
        </div>
        <div class="p-3 rounded-xl bg-teal-50 border border-teal-200">
          <p class="text-[10.5px] font-extrabold text-teal-800 uppercase tracking-wider">Twin Bed</p>
          <p class="font-display text-2xl font-bold text-teal-950 mt-0.5">${counts['Twin Bed Room'] || 0}</p>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <p class="text-[10.5px] font-extrabold text-slate-700 uppercase tracking-wider">Standard</p>
          <p class="font-display text-2xl font-bold text-slate-900 mt-0.5">${counts['Standard Room'] || 0}</p>
        </div>
      `;
    }

    const filteredRooms = typeFilter ? rooms.filter(r => r.type === typeFilter) : rooms;

    mount.innerHTML = filteredRooms.map(r => `
      <div class="p-3 rounded-xl border border-mist-line bg-white flex items-center justify-between shadow-sm hover:border-rain transition-all">
        <div>
          <span class="text-sm font-bold text-ink block">Room ${escapeHTML(r.number)}</span>
          <div class="mt-1">${roomBadgeHTML(r.type)}</div>
        </div>
        <button type="button" class="text-storm/40 hover:text-red-600 transition-colors p-1" data-delete-room="${escapeHTML(r.number)}" title="Remove Room ${escapeHTML(r.number)}">
          <i class="fa-solid fa-trash text-xs"></i>
        </button>
      </div>
    `).join('');

    mount.querySelectorAll('[data-delete-room]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetNum = btn.dataset.deleteRoom;
        const current = getRooms();
        const updated = current.filter(r => r.number !== targetNum);
        setRooms(updated);
        showToast(`Room ${targetNum} removed`);
        renderDashboard();
      });
    });
  }

  function initRoomManagement() {
    const form = document.getElementById('add-room-form');
    const input = document.getElementById('new-room-input');
    const typeSelect = document.getElementById('new-room-type');
    const resetBtn = document.getElementById('reset-rooms-btn');
    const filterSelect = document.getElementById('filter-room-type');

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const numVal = input.value.trim();
        const typeVal = typeSelect ? typeSelect.value : 'Standard Room';
        if (!numVal) return;
        const rooms = getRooms();
        if (rooms.some(r => r.number.toLowerCase() === numVal.toLowerCase())) {
          showToast(`Room "${numVal}" already exists`);
          return;
        }
        rooms.push({ number: numVal, type: typeVal });
        setRooms(rooms);
        input.value = '';
        showToast(`Room "${numVal}" (${typeVal}) added`);
        renderDashboard();
      });
    }

    if (filterSelect) {
      filterSelect.addEventListener('change', () => renderRooms());
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (!confirm('Reset room list to default 21 rooms?')) return;
        setRooms(DEFAULT_ROOMS);
        showToast('Rooms reset to default 21 rooms');
        renderDashboard();
      });
    }
  }

  /* ---------------------------------------------------------
     Sidebar & Tab Navigation
     --------------------------------------------------------- */
  function initSidebarNav() {
    const links = document.querySelectorAll('#sidebar-nav .sidebar-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        const tabId = link.dataset.tab;
        if (!tabId) return;

        links.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');

        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('is-active'));
        const targetTab = document.getElementById(tabId);
        if (targetTab) targetTab.classList.add('is-active');

        const meta = TAB_METADATA[tabId] || { title: 'Dashboard', subtitle: '' };
        const titleEl = document.getElementById('page-title');
        const subEl = document.getElementById('page-subtitle');
        if (titleEl) titleEl.textContent = meta.title;
        if (subEl) subEl.textContent = meta.subtitle;

        // Mobile drawer collapse
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth < 768 && sidebar) {
          sidebar.classList.add('hidden');
        }
      });
    });

    const toggle = document.getElementById('sidebar-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.toggle('hidden');
      });
    }
  }

  function initLiveClock() {
    const timeEl = document.getElementById('system-time');
    if (!timeEl) return;
    const update = () => {
      const now = new Date();
      timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' · Local Disk';
    };
    update();
    setInterval(update, 1000);
  }

  /* ---------------------------------------------------------
     Dashboard Analytics & Visualizations
     --------------------------------------------------------- */
  function renderDashboard() {
    const entries = getEntries();
    renderStats(entries);
    renderCategoryBars(entries);
    renderRatingBreakdown(entries);
    renderRooms();
    renderInsights(entries);
    renderEntries(applyFilters(entries));

    const navBadge = document.getElementById('nav-count-badge');
    if (navBadge) navBadge.textContent = entries.length;
    const roomBadge = document.getElementById('nav-room-badge');
    if (roomBadge) roomBadge.textContent = getRooms().length;
  }

  function renderStats(entries) {
    document.getElementById('stat-total').textContent = entries.length;

    const overallVals = entries.map(e => e.ratings && e.ratings.overall).filter(Boolean);
    const avg = overallVals.length ? (overallVals.reduce((a, b) => a + b, 0) / overallVals.length) : null;
    document.getElementById('stat-avg').textContent = avg ? avg.toFixed(1) + ' / 5' : '—';

    const recCount = entries.filter(e => e.recommend === 'Yes').length;
    document.getElementById('stat-recommend').textContent = entries.length ? Math.round((recCount / entries.length) * 100) + '%' : '—';

    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recent = entries.filter(e => new Date(e.submittedAt).getTime() >= weekAgo).length;
    document.getElementById('stat-recent').textContent = recent;
  }

  function renderCategoryBars(entries) {
    const mount = document.getElementById('category-bars');
    if (!mount) return;
    mount.innerHTML = CATEGORIES.map(cat => {
      const vals = entries.map(e => e.ratings && e.ratings[cat.id]).filter(Boolean);
      const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
      const pct = (avg / 5) * 100;
      return `
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[13px] font-medium" style="color:var(--ink)">${cat.num} · ${cat.title}</span>
            <span class="text-[12.5px] font-semibold" style="color:var(--storm)">${vals.length ? avg.toFixed(1) : '—'}</span>
          </div>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        </div>`;
    }).join('');
  }

  function renderRatingBreakdown(entries) {
    const mount = document.getElementById('rating-breakdown');
    if (!mount) return;

    const total = entries.length;
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    entries.forEach(e => {
      const r = e.ratings && e.ratings.overall;
      if (r && counts[r] !== undefined) counts[r]++;
    });

    const stars = [5, 4, 3, 2, 1];
    mount.innerHTML = stars.map(s => {
      const count = counts[s];
      const pct = total ? Math.round((count / total) * 100) : 0;
      return `
        <div>
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="font-semibold text-ink flex items-center gap-1">
              ${s} Stars <i class="fa-solid fa-star text-[10px]" style="color:var(--champagne)"></i>
            </span>
            <span class="font-bold text-storm">${count} (${pct}%)</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderInsights(entries) {
    const staffMount = document.getElementById('staff-wall-list');
    const highlightsMount = document.getElementById('insights-highlights-list');
    const badge = document.getElementById('staff-count-badge');

    const staffEntries = entries.filter(e => e.teamMember && e.teamMember.trim());
    if (badge) badge.textContent = `${staffEntries.length} Recognized`;

    if (staffMount) {
      if (!staffEntries.length) {
        staffMount.innerHTML = `<p class="text-xs text-storm/50 py-4 text-center">No staff members recognized yet.</p>`;
      } else {
        staffMount.innerHTML = staffEntries.map(e => `
          <div class="p-3.5 rounded-xl border border-mist-line bg-mist/20">
            <div class="flex items-center justify-between gap-2">
              <span class="text-xs font-bold text-ink"><i class="fa-solid fa-user-check text-champagne mr-1.5"></i>${escapeHTML(e.teamMember)}</span>
              <span class="text-[11px] text-storm/60">${e.guest?.name ? escapeHTML(e.guest.name) : 'Guest'}${e.guest?.room ? ' · Rm ' + escapeHTML(e.guest.room) : ''}</span>
            </div>
            ${e.highlight ? `<p class="text-xs mt-1.5 text-storm italic">"${escapeHTML(e.highlight)}"</p>` : ''}
          </div>
        `).join('');
      }
    }

    if (highlightsMount) {
      const voiceEntries = entries.filter(e => e.highlight || e.improve);
      if (!voiceEntries.length) {
        highlightsMount.innerHTML = `<p class="text-xs text-storm/50 py-4 text-center">No feedback quotes written yet.</p>`;
      } else {
        highlightsMount.innerHTML = voiceEntries.slice(0, 5).map(e => `
          <div class="p-3.5 rounded-xl border border-mist-line bg-mist/20 space-y-1.5">
            <div class="flex items-center justify-between text-[11.5px]">
              <span class="font-bold text-ink">${e.guest?.name ? escapeHTML(e.guest.name) : 'Anonymous'} ${e.guest?.room ? '· Room ' + escapeHTML(e.guest.room) : ''}</span>
              <span class="text-storm/50">${e.submittedAt ? fmtDate(e.submittedAt) : ''}</span>
            </div>
            ${e.highlight ? `<p class="text-xs text-ink"><strong class="text-champagne font-semibold">Enjoyed:</strong> ${escapeHTML(e.highlight)}</p>` : ''}
            ${e.improve ? `<p class="text-xs text-ink"><strong class="text-rain-dim font-semibold">Could improve:</strong> ${escapeHTML(e.improve)}</p>` : ''}
          </div>
        `).join('');
      }
    }
  }

  /* ---------------------------------------------------------
     Filtering & Feed Rendering
     --------------------------------------------------------- */
  function applyFilters(entries) {
    const q = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
    const rec = document.getElementById('filter-recommend')?.value;
    const ratingFilter = document.getElementById('filter-rating')?.value;

    return entries
      .slice()
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .filter(e => {
        if (rec && e.recommend !== rec) return false;

        if (ratingFilter) {
          const overall = e.ratings && e.ratings.overall;
          if (ratingFilter === 'low') {
            if (!overall || overall > 2) return false;
          } else if (Number(ratingFilter) !== overall) {
            return false;
          }
        }

        if (!q) return true;
        const hay = [
          e.guest && e.guest.name, e.guest && e.guest.room,
          e.guest && e.guest.stayDates, e.guest && e.guest.checkIn, e.guest && e.guest.checkOut,
          e.highlight, e.improve, e.comments, e.teamMember
        ].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(q);
      });
  }

  function ratingDropsHTML(n) {
    if (!n) return '<span class="text-[12px]" style="color:var(--storm);opacity:.4">Not rated</span>';
    let out = '';
    for (let i = 1; i <= 5; i++) {
      const filled = i <= n;
      out += `<span class="mini-drop" style="background:${filled ? 'var(--champagne)' : 'var(--mist-dim)'}"></span>`;
    }
    return `<span class="inline-flex gap-1 items-center">${out}<span class="ml-1.5 text-[12px] font-semibold" style="color:var(--storm)">${n}/5</span></span>`;
  }

  function tagHTML(label, value) {
    if (!value) return '';
    const cls = value === 'Yes' ? 'tag-yes' : value === 'No' ? 'tag-no' : 'tag-maybe';
    return `<span class="tag ${cls}">${label}: ${value}</span>`;
  }

  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleString(undefined, { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
    } catch (e) { return iso; }
  }

  function renderEntries(list) {
    const mount = document.getElementById('entries-list');
    const empty = document.getElementById('empty-state');
    if (!mount || !empty) return;

    if (!list.length) {
      mount.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');

    mount.innerHTML = list.map(e => {
      const guestLabel = (e.guest && e.guest.name) ? e.guest.name : 'Anonymous guest';
      const roomLabel = (e.guest && e.guest.room) ? ` · Room ${e.guest.room}` : '';
      const stayDatesStr = e.guest ? (e.guest.stayDates || (e.guest.checkIn ? (e.guest.checkIn + (e.guest.checkOut ? ' – ' + e.guest.checkOut : '')) : '')) : '';
      const ratingsRows = CATEGORIES.map(cat => `
        <div class="flex items-center justify-between py-1.5">
          <span class="text-[12.5px]" style="color:var(--storm)">${cat.title}</span>
          ${ratingDropsHTML(e.ratings && e.ratings[cat.id])}
        </div>`).join('');

      return `
      <details class="entry-card px-5 sm:px-6 py-4" data-id="${e.id}">
        <summary class="flex items-center justify-between gap-4 cursor-pointer list-none">
          <div class="min-w-0">
            <p class="text-[14.5px] font-semibold truncate" style="color:var(--ink)">${escapeHTML(guestLabel)}${roomLabel}</p>
            <p class="text-[12px]" style="color:var(--storm);opacity:.6">${fmtDate(e.submittedAt)}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            ${tagHTML('Recommend', e.recommend)}
            <i class="fa-solid fa-chevron-down text-[12px] transition-transform" style="color:var(--storm)"></i>
          </div>
        </summary>

        <div class="mt-4 pt-4 grid sm:grid-cols-2 gap-x-8" style="border-top:1px solid var(--mist-line)">
          <div>${ratingsRows}</div>
          <div class="mt-4 sm:mt-0 space-y-4">
            ${stayDatesStr ? `<div><p class="text-[11.5px] font-bold" style="color:var(--storm);opacity:.6">STAY DATES</p><p class="text-[13.5px] mt-1" style="color:var(--ink)"><i class="fa-regular fa-calendar mr-1.5" style="color:var(--rain)"></i>${escapeHTML(stayDatesStr)}</p></div>` : ''}
            ${e.highlight ? `<div><p class="text-[11.5px] font-bold" style="color:var(--storm);opacity:.6">HIGHLIGHT</p><p class="text-[13.5px] mt-1" style="color:var(--ink)">${escapeHTML(e.highlight)}</p></div>` : ''}
            ${e.improve ? `<div><p class="text-[11.5px] font-bold" style="color:var(--storm);opacity:.6">COULD IMPROVE</p><p class="text-[13.5px] mt-1" style="color:var(--ink)">${escapeHTML(e.improve)}</p></div>` : ''}
            ${e.comments ? `<div><p class="text-[11.5px] font-bold" style="color:var(--storm);opacity:.6">COMMENTS</p><p class="text-[13.5px] mt-1" style="color:var(--ink)">${escapeHTML(e.comments)}</p></div>` : ''}
            ${e.teamMember ? `<div><p class="text-[11.5px] font-bold" style="color:var(--storm);opacity:.6">TEAM MEMBER RECOGNIZED</p><p class="text-[13.5px] mt-1" style="color:var(--ink)">${escapeHTML(e.teamMember)}</p></div>` : ''}
            <div class="flex flex-wrap gap-2">${tagHTML('Stay again', e.stayAgain)}</div>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <button class="text-[12.5px] font-semibold" style="color:#A63B32" data-delete="${e.id}">
            <i class="fa-solid fa-trash mr-1"></i>Delete entry
          </button>
        </div>
      </details>`;
    }).join('');

    mount.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const id = btn.dataset.delete;
        const remaining = getEntries().filter(e => e.id !== id);
        setEntries(remaining);
        showToast('Entry deleted');
        renderDashboard();
      });
    });
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  /* ---------------------------------------------------------
     Export & Import Functions
     --------------------------------------------------------- */
  function exportJSON() {
    const entries = getEntries();
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `silver-rain-suites-feedback-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(`Exported ${entries.length} response${entries.length === 1 ? '' : 's'} as JSON`);
  }

  function exportCSV() {
    const entries = getEntries();
    if (!entries.length) {
      showToast('No feedback entries to export');
      return;
    }

    const headers = [
      'ID', 'Submitted At', 'Guest Name', 'Room No', 'Check-in Date', 'Check-out Date',
      'Stay Dates', 'Feedback Date', 'Would Recommend', 'Stay Again',
      'Overall Rating', 'Reservation Rating', 'Arrival Rating', 'Room Rating',
      'Housekeeping Rating', 'Dining Rating', 'In-Stay Rating', 'Departure Rating',
      'Highlight', 'Could Improve', 'Staff Recognized', 'Comments'
    ];

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = entries.map(e => [
      e.id || '',
      e.submittedAt || '',
      e.guest?.name || '',
      e.guest?.room || '',
      e.guest?.checkIn || '',
      e.guest?.checkOut || '',
      e.guest?.stayDates || '',
      e.guest?.feedbackDate || '',
      e.recommend || '',
      e.stayAgain || '',
      e.ratings?.overall || '',
      e.ratings?.reservation || '',
      e.ratings?.arrival || '',
      e.ratings?.room || '',
      e.ratings?.housekeeping || '',
      e.ratings?.dining || '',
      e.ratings?.instay || '',
      e.ratings?.departure || '',
      e.highlight || '',
      e.improve || '',
      e.teamMember || '',
      e.comments || ''
    ].map(escapeCSV).join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `silver-rain-feedback-${stamp}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast(`Exported ${entries.length} response${entries.length === 1 ? '' : 's'} as CSV`);
  }

  function importJSON(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const incoming = JSON.parse(reader.result);
        if (!Array.isArray(incoming)) throw new Error('not an array');
        const existing = getEntries();
        const byId = new Map(existing.map(e => [e.id, e]));
        incoming.forEach(e => { if (e && e.id) byId.set(e.id, e); });
        setEntries(Array.from(byId.values()));
        showToast(`Imported — ${byId.size} total responses now`);
        renderDashboard();
      } catch (err) {
        showToast('Could not read that file — expected exported feedback JSON');
      }
    };
    reader.readAsText(file);
  }

  function clearAll() {
    if (!confirm('Delete ALL feedback responses from this browser? This cannot be undone. Export a backup first if you need one.')) return;
    setEntries([]);
    showToast('All responses cleared');
    renderDashboard();
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  function init() {
    initRain();
    initLogin();
    initSidebarNav();
    initLiveClock();
    initRoomManagement();
    if (window.AOS) AOS.init({ once: true, duration: 500 });

    // Export wiring
    const quickJson = document.getElementById('quick-export-json');
    const tabJson = document.getElementById('export-json-btn-tab');
    if (quickJson) quickJson.addEventListener('click', exportJSON);
    if (tabJson) tabJson.addEventListener('click', exportJSON);

    const quickCsv = document.getElementById('quick-export-csv');
    const tabCsv = document.getElementById('export-csv-btn-tab');
    if (quickCsv) quickCsv.addEventListener('click', exportCSV);
    if (tabCsv) tabCsv.addEventListener('click', exportCSV);

    // Import wiring
    const tabImport = document.getElementById('import-input-tab');
    if (tabImport) {
      tabImport.addEventListener('change', (e) => {
        if (e.target.files[0]) importJSON(e.target.files[0]);
        e.target.value = '';
      });
    }

    const clearBtn = document.getElementById('clear-all-btn');
    if (clearBtn) clearBtn.addEventListener('click', clearAll);

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem(SESSION_KEY);
        location.reload();
      });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.addEventListener('input', () => renderEntries(applyFilters(getEntries())));

    const filterRec = document.getElementById('filter-recommend');
    if (filterRec) filterRec.addEventListener('change', () => renderEntries(applyFilters(getEntries())));

    const filterRat = document.getElementById('filter-rating');
    if (filterRat) filterRat.addEventListener('change', () => renderEntries(applyFilters(getEntries())));
  }

  document.addEventListener('DOMContentLoaded', init);
})();
