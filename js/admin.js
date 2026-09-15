/* ==========================================================
   Xacro Experiences — Admin Command Center
   Multi-Property Management & Telemetry Engine
   ========================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'srs_feedbacks';
  const ROOMS_KEY = 'srs_rooms';
  const PROPERTIES_KEY = 'srs_properties';
  const SESSION_KEY = 'srs_admin_auth';
  const PIN = '845416';

  const DEFAULT_PROPERTIES = [
    {
      id: 'srs',
      name: 'Silver Rain Suites',
      shortCode: 'SRS',
      brand: 'Xacro Experiences',
      tagline: 'Luxury Boutique Suites',
      city: 'Bengaluru',
      status: 'Active',
      accentColor: '#B9924F',
      rooms: [
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
        { number: '204', type: 'Suite Room' }
      ]
    },
    {
      id: 'xab',
      name: 'Xacro Azure Beach Resort',
      shortCode: 'XAB',
      brand: 'Xacro Experiences',
      tagline: 'Luxury Oceanfront & Villas',
      city: 'Goa',
      status: 'Active',
      accentColor: '#0EA5E9',
      rooms: [
        { number: '101', type: 'Ocean View Villa' },
        { number: '102', type: 'Ocean View Villa' },
        { number: '103', type: 'Beachfront Suite' },
        { number: '104', type: 'Beachfront Suite' },
        { number: '105', type: 'Standard Room' },
        { number: '106', type: 'Standard Room' },
        { number: '107', type: 'Executive Suite' },
        { number: '201', type: 'Sunset Villa' },
        { number: '202', type: 'Sunset Villa' },
        { number: '203', type: 'Royal Beach Villa' }
      ]
    },
    {
      id: 'xpg',
      name: 'Xacro Pinnacle Grand',
      shortCode: 'XPG',
      brand: 'Xacro Experiences',
      tagline: 'Urban Luxury & Business Tower',
      city: 'Mumbai',
      status: 'Active',
      accentColor: '#8B5CF6',
      rooms: [
        { number: '301', type: 'Executive Room' },
        { number: '302', type: 'Executive Room' },
        { number: '303', type: 'Standard Room' },
        { number: '304', type: 'Standard Room' },
        { number: '401', type: 'Suite Room' },
        { number: '402', type: 'Suite Room' },
        { number: '501', type: 'Presidential Suite' },
        { number: '502', type: 'Royal Penthouse' }
      ]
    },
    {
      id: 'xsr',
      name: 'Xacro Sanctuary Retreat',
      shortCode: 'XSR',
      brand: 'Xacro Experiences',
      tagline: 'Eco Wellness & Plantation Villas',
      city: 'Coorg',
      status: 'Active',
      accentColor: '#10B981',
      rooms: [
        { number: 'C01', type: 'Eco Cottage' },
        { number: 'C02', type: 'Eco Cottage' },
        { number: 'C03', type: 'Eco Cottage' },
        { number: 'T01', type: 'Treehouse Villa' },
        { number: 'T02', type: 'Treehouse Villa' },
        { number: 'V01', type: 'Private Pool Villa' }
      ]
    }
  ];

  const DEFAULT_ROOMS = DEFAULT_PROPERTIES[0].rooms;

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
    'tab-properties': { title: 'Hotel Portfolio Control', subtitle: 'Manage all Xacro luxury properties, room inventories, and separate feedback streams' },
    'tab-feedbacks': { title: 'Guest Feedbacks', subtitle: 'Search, filter, and inspect guest response submissions' },
    'tab-rooms': { title: 'Room Inventory Control', subtitle: 'Manage active room dropdown options on guest feedback forms' },
    'tab-insights': { title: 'Staff & Voice Insights', subtitle: 'Staff member recognitions and guest feedback highlights' },
    'tab-settings': { title: 'Data & Security Controls', subtitle: 'Backup exports, spreadsheet CSV generators, and system storage' },
  };

  let activePropertyId = 'ALL';
  let currentRoomPropertyId = 'srs';

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

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

      const sparkleCount = Math.max(25, Math.floor(w / 50));
      sparkles = Array.from({ length: sparkleCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 1 + Math.random() * 2.5,
        alpha: Math.random(),
        speed: 0.008 + Math.random() * 0.018,
        increasing: Math.random() > 0.5
      }));

      orbs = [
        { x: w * 0.2, y: h * 0.25, radius: 260, vx: 0.25, vy: 0.15, color: 'rgba(185, 146, 79, 0.14)' },
        { x: w * 0.8, y: h * 0.75, radius: 320, vx: -0.2, vy: -0.25, color: 'rgba(126, 151, 160, 0.16)' },
        { x: w * 0.5, y: h * 0.4, radius: 210, vx: 0.15, vy: -0.15, color: 'rgba(60, 74, 82, 0.22)' }
      ];
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('pointerdown', (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, radius: 2, maxRadius: 55 + Math.random() * 35, alpha: 0.7 });
    });

    function draw() {
      ctx.clearRect(0, 0, w, h);

      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -100 || orb.x > w + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > h + 100) orb.vy *= -1;

        const g = ctx.createRadialGradient(orb.x, orb.y, 10, orb.x, orb.y, orb.radius);
        g.addColorStop(0, orb.color);
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      sparkles.forEach(s => {
        if (s.increasing) {
          s.alpha += s.speed;
          if (s.alpha >= 0.85) s.increasing = false;
        } else {
          s.alpha -= s.speed;
          if (s.alpha <= 0.05) {
            s.increasing = true;
            s.x = Math.random() * w;
            s.y = Math.random() * h;
          }
        }
        ctx.fillStyle = `rgba(237, 241, 242, ${s.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(185, 146, 79, 0.8)';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      drops.forEach(d => {
        d.y += d.speed;
        d.x += d.speed * 0.12;
        if (d.y > h) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }

        const grad = ctx.createLinearGradient(d.x, d.y, d.x - d.len * 0.12, d.y - d.len);
        if (d.isGold) {
          grad.addColorStop(0, `rgba(185, 146, 79, ${d.opacity * 1.3})`);
          grad.addColorStop(1, 'rgba(185, 146, 79, 0)');
        } else {
          grad.addColorStop(0, `rgba(126, 151, 160, ${d.opacity})`);
          grad.addColorStop(1, 'rgba(126, 151, 160, 0)');
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * 0.12, d.y - d.len);
        ctx.stroke();
      });

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.8;
        r.alpha -= 0.015;
        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(185, 146, 79, ${r.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    }
    draw();
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
    const hiddenInput = document.getElementById('pin-input');

    function render() {
      dots().forEach((d, i) => d.classList.toggle('filled', i < pinBuffer.length));
      if (hiddenInput && hiddenInput.value !== pinBuffer) {
        hiddenInput.value = pinBuffer;
      }
    }

    function reject(msg) {
      const panel = document.getElementById('login-screen')?.firstElementChild;
      if (panel) {
        panel.classList.add('shake');
        setTimeout(() => panel.classList.remove('shake'), 400);
      }
      if (errEl) errEl.textContent = msg || 'Incorrect PIN — default is 845416';
      pinBuffer = '';
      render();
    }

    function tryAuth() {
      if (pinBuffer.length < 6) {
        if (errEl) errEl.textContent = 'Please enter all 6 digits of the PIN (Default: 845416)';
        return;
      }
      if (pinBuffer === PIN) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        showDashboard();
      } else {
        reject('Incorrect PIN — please try 845416');
      }
    }

    document.querySelectorAll('#keypad [data-key]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (pinBuffer.length >= 6) return;
        pinBuffer += btn.dataset.key;
        if (errEl) errEl.textContent = '';
        render();
        if (pinBuffer.length === 6) setTimeout(tryAuth, 80);
      });
    });

    document.getElementById('pin-clear')?.addEventListener('click', (e) => {
      e.preventDefault();
      pinBuffer = '';
      if (errEl) errEl.textContent = '';
      render();
    });

    document.getElementById('pin-back')?.addEventListener('click', (e) => {
      e.preventDefault();
      pinBuffer = pinBuffer.slice(0, -1);
      if (errEl) errEl.textContent = '';
      render();
    });

    document.getElementById('pin-submit')?.addEventListener('click', (e) => {
      e.preventDefault();
      tryAuth();
    });

    if (hiddenInput) {
      hiddenInput.addEventListener('input', () => {
        const val = hiddenInput.value.replace(/[^0-9]/g, '').slice(0, 6);
        pinBuffer = val;
        if (errEl) errEl.textContent = '';
        render();
        if (pinBuffer.length === 6) setTimeout(tryAuth, 80);
      });
    }

    document.getElementById('pin-dots')?.addEventListener('click', () => {
      if (hiddenInput) hiddenInput.focus();
    });

    window.addEventListener('keydown', (e) => {
      const loginScreen = document.getElementById('login-screen');
      if (!loginScreen || loginScreen.classList.contains('hidden')) return;

      if (/^[0-9]$/.test(e.key) && pinBuffer.length < 6) {
        pinBuffer += e.key;
        if (errEl) errEl.textContent = '';
        render();
        if (pinBuffer.length === 6) setTimeout(tryAuth, 80);
      }
      if (e.key === 'Backspace') {
        pinBuffer = pinBuffer.slice(0, -1);
        if (errEl) errEl.textContent = '';
        render();
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        tryAuth();
      }
    });
  }

  function showDashboard() {
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    if (loginScreen) loginScreen.classList.add('hidden');
    if (dashboardScreen) dashboardScreen.classList.remove('hidden');

    try {
      renderDashboard();
    } catch (err) {
      console.error('Error rendering dashboard:', err);
    }
  }



  /* ---------------------------------------------------------
     Data Helpers & Data Store
     --------------------------------------------------------- */
  function getProperties() {
    try {
      const stored = localStorage.getItem(PROPERTIES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_PROPERTIES;
  }

  function setProperties(props) {
    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(props));
  }

  function getEntries() {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      return list.map(e => {
        if (!e.propertyId) {
          e.propertyId = 'srs';
          e.propertyName = 'Silver Rain Suites';
          e.propertyCode = 'SRS';
        }
        return e;
      });
    } catch (e) {
      return [];
    }
  }

  function setEntries(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function getRoomsForProperty(propId) {
    const props = getProperties();
    const targetId = propId || currentRoomPropertyId || 'srs';
    const prop = props.find(p => p.id === targetId) || props[0];
    let rooms = (prop && prop.rooms) ? prop.rooms : [];
    if (targetId === 'srs') {
      try {
        const stored = localStorage.getItem(ROOMS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            rooms = parsed.map(r => typeof r === 'string' ? { number: r, type: 'Standard Room' } : r);
          }
        }
      } catch (e) {}
    }
    return rooms;
  }

  function setRoomsForProperty(propId, rooms) {
    const props = getProperties();
    const targetId = propId || currentRoomPropertyId || 'srs';
    const idx = props.findIndex(p => p.id === targetId);
    if (idx !== -1) {
      props[idx].rooms = rooms;
      setProperties(props);
    }
    if (targetId === 'srs') {
      localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
    }
  }

  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function roomBadgeHTML(type) {
    if (type === 'Suite Room' || type.includes('Suite')) {
      return `<span class="px-2 py-0.5 text-[10.5px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300"><i class="fa-solid fa-crown mr-1 text-[9px]"></i>${escapeHTML(type)}</span>`;
    }
    if (type === 'Executive Room' || type.includes('Executive')) {
      return `<span class="px-2 py-0.5 text-[10.5px] font-bold rounded-full bg-purple-100 text-purple-800 border border-purple-300"><i class="fa-solid fa-user-tie mr-1 text-[9px]"></i>${escapeHTML(type)}</span>`;
    }
    if (type === 'Twin Bed Room' || type.includes('Twin')) {
      return `<span class="px-2 py-0.5 text-[10.5px] font-bold rounded-full bg-teal-100 text-teal-800 border border-teal-300"><i class="fa-solid fa-bed mr-1 text-[9px]"></i>${escapeHTML(type)}</span>`;
    }
    if (type.includes('Villa')) {
      return `<span class="px-2 py-0.5 text-[10.5px] font-bold rounded-full bg-sky-100 text-sky-800 border border-sky-300"><i class="fa-solid fa-umbrella-beach mr-1 text-[9px]"></i>${escapeHTML(type)}</span>`;
    }
    return `<span class="px-2 py-0.5 text-[10.5px] font-bold rounded-full bg-gray-100 text-gray-700 border border-gray-300"><i class="fa-solid fa-door-closed mr-1 text-[9px]"></i>${escapeHTML(type)}</span>`;
  }

  /* ---------------------------------------------------------
     Property Dropdowns Updater & Global Handlers
     --------------------------------------------------------- */
  function updatePropertyDropdowns() {
    const props = getProperties();
    
    // Header Property Switcher
    const headerSelect = document.getElementById('header-property-select');
    if (headerSelect) {
      const prevVal = activePropertyId;
      headerSelect.innerHTML = `<option value="ALL">🌐 All Xacro Properties (Portfolio View)</option>` +
        props.map(p => `<option value="${p.id}">🏨 ${escapeHTML(p.name)} (${escapeHTML(p.city)})</option>`).join('');
      headerSelect.value = prevVal;
    }

    // Feedback Tab Filter
    const filterProp = document.getElementById('filter-property');
    if (filterProp) {
      const curVal = filterProp.value;
      filterProp.innerHTML = `<option value="ALL">All Properties (${props.length})</option>` +
        props.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');
      filterProp.value = curVal || activePropertyId;
    }

    // Room Tab Property Selector
    const roomPropSelect = document.getElementById('room-property-select');
    if (roomPropSelect) {
      const curVal = roomPropSelect.value;
      roomPropSelect.innerHTML = props.map(p => `<option value="${p.id}">${escapeHTML(p.name)} (${p.rooms ? p.rooms.length : 0} rooms)</option>`).join('');
      roomPropSelect.value = curVal || (activePropertyId !== 'ALL' ? activePropertyId : 'srs');
      currentRoomPropertyId = roomPropSelect.value;
    }

    const navPropBadge = document.getElementById('nav-prop-badge');
    if (navPropBadge) navPropBadge.textContent = props.length;
  }

  window.selectAndFilterProperty = function(id) {
    activePropertyId = id;
    const headerSelect = document.getElementById('header-property-select');
    if (headerSelect) headerSelect.value = id;
    const filterProp = document.getElementById('filter-property');
    if (filterProp) filterProp.value = id;
    renderDashboard();
    showToast(`Active filter: ${id === 'ALL' ? 'All Xacro Properties' : (getProperties().find(p=>p.id===id)?.name || id)}`);
  };

  window.openManageRoomsForProp = function(id) {
    activePropertyId = id;
    currentRoomPropertyId = id;
    const roomSelect = document.getElementById('room-property-select');
    if (roomSelect) roomSelect.value = id;
    switchTab('tab-rooms');
  };

  /* ---------------------------------------------------------
     Dashboard Analytics & Visualizations
     --------------------------------------------------------- */
  function renderDashboard() {
    updatePropertyDropdowns();
    checkDraftRecovery();
    const allEntries = getEntries();
    const filteredEntries = activePropertyId === 'ALL' ? allEntries : allEntries.filter(e => e.propertyId === activePropertyId);

    renderStats(filteredEntries);
    renderCategoryBars(filteredEntries);
    renderRatingBreakdown(filteredEntries);
    renderPropertiesTab();
    renderRooms();
    renderInsights(filteredEntries);
    renderEntries(applyFilters(allEntries));

    const navBadge = document.getElementById('nav-count-badge');
    if (navBadge) navBadge.textContent = filteredEntries.length;
    const roomBadge = document.getElementById('nav-room-badge');
    if (roomBadge) roomBadge.textContent = getRoomsForProperty(currentRoomPropertyId).length;
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

    if (!entries.length) {
      mount.innerHTML = `<p class="text-xs text-storm/50 py-4 text-center">No feedback recorded for this property selection yet</p>`;
      return;
    }

    mount.innerHTML = CATEGORIES.map(cat => {
      const vals = entries.map(e => e.ratings && e.ratings[cat.id]).filter(Boolean);
      const avg = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
      const pct = (avg / 5) * 100;
      return `
        <div>
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="font-semibold text-ink">${cat.num}. ${cat.title}</span>
            <span class="font-bold text-champagne">${avg ? avg.toFixed(1) : '—'}</span>
          </div>
          <div class="h-2 rounded-full bg-mist-dim overflow-hidden">
            <div class="h-full rounded-full transition-all duration-500" style="width:${pct}%; background:var(--champagne)"></div>
          </div>
        </div>`;
    }).join('');
  }

  function renderRatingBreakdown(entries) {
    const mount = document.getElementById('rating-breakdown');
    if (!mount) return;

    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    entries.forEach(e => {
      const score = e.ratings && e.ratings.overall;
      if (score && counts[score] !== undefined) counts[score]++;
    });

    const total = entries.length || 1;
    mount.innerHTML = [5, 4, 3, 2, 1].map(stars => {
      const cnt = counts[stars];
      const pct = Math.round((cnt / total) * 100);
      return `
        <div class="flex items-center gap-3 text-xs">
          <span class="w-12 font-semibold text-storm">${stars} ★</span>
          <div class="flex-1 h-2 rounded-full bg-mist-dim overflow-hidden">
            <div class="h-full rounded-full transition-all duration-500" style="width:${pct}%; background:var(--champagne)"></div>
          </div>
          <span class="w-10 text-right font-bold text-ink">${cnt} (${pct}%)</span>
        </div>`;
    }).join('');
  }

  /* ---------------------------------------------------------
     Hotel Portfolio Management Tab
     --------------------------------------------------------- */
  function renderPropertiesTab() {
    const props = getProperties();
    const allEntries = getEntries();
    
    const countEl = document.getElementById('prop-stat-count');
    if (countEl) countEl.textContent = props.length;

    let totalRooms = 0;
    props.forEach(p => { totalRooms += (p.rooms ? p.rooms.length : 0); });
    const roomsEl = document.getElementById('prop-stat-rooms');
    if (roomsEl) roomsEl.textContent = totalRooms;

    const feedbacksEl = document.getElementById('prop-stat-feedbacks');
    if (feedbacksEl) feedbacksEl.textContent = allEntries.length;

    const csatEl = document.getElementById('prop-stat-csat');
    const allOverall = allEntries.map(e => e.ratings && e.ratings.overall).filter(Boolean);
    if (csatEl) {
      if (allOverall.length) {
        const avg = allOverall.reduce((a, b) => a + b, 0) / allOverall.length;
        csatEl.textContent = avg.toFixed(1) + ' / 5.0';
      } else {
        csatEl.textContent = '—';
      }
    }

    const grid = document.getElementById('properties-cards-grid');
    if (!grid) return;

    grid.innerHTML = props.map(p => {
      const pEntries = allEntries.filter(e => e.propertyId === p.id);
      const pRatings = pEntries.map(e => e.ratings && e.ratings.overall).filter(Boolean);
      const pAvg = pRatings.length ? (pRatings.reduce((a, b) => a + b, 0) / pRatings.length).toFixed(1) : '—';
      const isActive = activePropertyId === p.id;
      const roomCount = p.rooms ? p.rooms.length : 0;
      const roomTypes = Array.from(new Set((p.rooms || []).map(r => r.type))).join(', ');

      return `
        <div class="glass-panel p-6 space-y-4 relative overflow-hidden group border ${isActive ? 'border-champagne shadow-2xl bg-champagne/5' : 'border-white/10 hover:border-champagne/40'}">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-lg text-lg" style="background:${p.accentColor || '#B9924F'}">
                ${escapeHTML(p.shortCode || p.name.substring(0, 3).toUpperCase())}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/10 text-champagne border border-white/10">${escapeHTML(p.city || 'Xacro')}</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300'}">${escapeHTML(p.status || 'Active')}</span>
                </div>
                <h4 class="font-display text-lg font-bold text-mist mt-1">${escapeHTML(p.name)}</h4>
                <p class="text-xs text-mist/60">${escapeHTML(p.tagline || 'Luxury Hotel')}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center">
            <div class="bg-white/5 p-2 rounded-xl">
              <p class="text-[10px] text-mist/50 uppercase font-bold">Inventory</p>
              <p class="text-sm font-bold text-mist">${roomCount} Rooms</p>
            </div>
            <div class="bg-white/5 p-2 rounded-xl">
              <p class="text-[10px] text-mist/50 uppercase font-bold">Feedbacks</p>
              <p class="text-sm font-bold text-champagne">${pEntries.length}</p>
            </div>
            <div class="bg-white/5 p-2 rounded-xl">
              <p class="text-[10px] text-mist/50 uppercase font-bold">CSAT Score</p>
              <p class="text-sm font-bold text-emerald-400">${pAvg} ${pAvg !== '—' ? '★' : ''}</p>
            </div>
          </div>

          <p class="text-[11px] text-mist/50 truncate"><i class="fa-solid fa-layer-group text-champagne mr-1"></i> ${escapeHTML(roomTypes || 'Standard Rooms')}</p>

          <div class="flex items-center gap-2 pt-1">
            <button onclick="window.selectAndFilterProperty('${p.id}')" class="btn ${isActive ? 'btn-champagne' : 'btn-dark-ghost'} text-xs flex-1 py-2 font-bold">
              ${isActive ? '<i class="fa-solid fa-circle-check mr-1"></i> Active Hotel' : '<i class="fa-solid fa-eye mr-1"></i> Inspect Telemetry'}
            </button>
            <button onclick="window.openManageRoomsForProp('${p.id}')" class="btn btn-dark-ghost text-xs py-2 px-3" title="Manage Rooms">
              <i class="fa-solid fa-door-open text-blue-400"></i>
            </button>
            <button onclick="window.editPropertyModal('${p.id}')" class="btn btn-dark-ghost text-xs py-2 px-3" title="Edit Property">
              <i class="fa-solid fa-pen-to-square text-amber-400"></i>
            </button>
            ${props.length > 1 ? `
              <button onclick="window.deleteProperty('${p.id}')" class="btn btn-dark-ghost text-xs py-2 px-3 hover:text-red-400" title="Delete Property">
                <i class="fa-solid fa-trash"></i>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  function initPropertyModal() {
    const modal = document.getElementById('property-modal');
    if (!modal) return;

    const openBtns = [document.getElementById('quick-add-property'), document.getElementById('btn-add-property-tab')].filter(Boolean);
    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('prop-modal-title').textContent = 'Add New Hotel Property';
        document.getElementById('prop-edit-id').value = '';
        document.getElementById('prop-form').reset();
        modal.classList.remove('hidden');
      });
    });

    document.getElementById('close-prop-modal')?.addEventListener('click', () => modal.classList.add('hidden'));
    document.getElementById('cancel-prop-modal')?.addEventListener('click', () => modal.classList.add('hidden'));

    document.getElementById('prop-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('prop-edit-id').value;
      const name = document.getElementById('prop-form-name').value.trim();
      const code = document.getElementById('prop-form-code').value.trim().toUpperCase();
      const city = document.getElementById('prop-form-city').value.trim();
      const tagline = document.getElementById('prop-form-tagline').value.trim();
      const color = document.getElementById('prop-form-color').value;
      const status = document.getElementById('prop-form-status').value;
      const roomsRaw = document.getElementById('prop-form-rooms').value.trim();

      let initialRooms = [];
      if (roomsRaw) {
        initialRooms = roomsRaw.split(',').map(r => r.trim()).filter(Boolean).map(r => ({
          number: r,
          type: 'Standard Room'
        }));
      }

      const props = getProperties();
      if (editId) {
        const idx = props.findIndex(p => p.id === editId);
        if (idx !== -1) {
          props[idx].name = name;
          props[idx].shortCode = code;
          props[idx].city = city;
          props[idx].tagline = tagline;
          props[idx].accentColor = color;
          props[idx].status = status;
          if (initialRooms.length > 0) props[idx].rooms = initialRooms;
        }
      } else {
        const newId = code.toLowerCase().replace(/[^a-z0-9]/g, '') || ('p_' + Date.now().toString(36));
        props.push({
          id: newId,
          name: name,
          shortCode: code,
          brand: 'Xacro Experiences',
          tagline: tagline || 'Luxury Hotel & Resort',
          city: city,
          status: status,
          accentColor: color,
          rooms: initialRooms.length > 0 ? initialRooms : [
            { number: '101', type: 'Suite Room' },
            { number: '102', type: 'Executive Room' },
            { number: '103', type: 'Standard Room' },
            { number: '104', type: 'Standard Room' }
          ]
        });
      }

      setProperties(props);
      modal.classList.add('hidden');
      updatePropertyDropdowns();
      renderDashboard();
      showToast(`Property "${name}" saved!`);
    });
  }

  window.editPropertyModal = function(id) {
    const modal = document.getElementById('property-modal');
    const props = getProperties();
    const p = props.find(x => x.id === id);
    if (!p || !modal) return;

    document.getElementById('prop-modal-title').textContent = `Edit Property — ${p.name}`;
    document.getElementById('prop-edit-id').value = p.id;
    document.getElementById('prop-form-name').value = p.name || '';
    document.getElementById('prop-form-code').value = p.shortCode || '';
    document.getElementById('prop-form-city').value = p.city || '';
    document.getElementById('prop-form-tagline').value = p.tagline || '';
    document.getElementById('prop-form-color').value = p.accentColor || '#B9924F';
    document.getElementById('prop-form-status').value = p.status || 'Active';
    document.getElementById('prop-form-rooms').value = (p.rooms || []).map(r => r.number).join(', ');

    modal.classList.remove('hidden');
  };

  window.deleteProperty = function(id) {
    const props = getProperties();
    const p = props.find(x => x.id === id);
    if (!p) return;
    if (confirm(`Are you sure you want to delete property "${p.name}"?`)) {
      const updated = props.filter(x => x.id !== id);
      setProperties(updated);
      if (activePropertyId === id) activePropertyId = 'ALL';
      updatePropertyDropdowns();
      renderDashboard();
      showToast(`Property "${p.name}" deleted.`);
    }
  };
  /* ---------------------------------------------------------
     Manual Feedback Modal & Draft Recovery
     --------------------------------------------------------- */
  function initManualFeedbackModal() {
    const modal = document.getElementById('manual-feedback-modal');
    if (!modal) return;

    const openBtns = [
      document.getElementById('btn-header-manual-feedback'),
      document.getElementById('btn-tab-manual-feedback')
    ].filter(Boolean);

    function populateMFDropdowns() {
      const props = getProperties();
      const propSelect = document.getElementById('mf-property');
      const roomSelect = document.getElementById('mf-room');

      if (propSelect) {
        propSelect.innerHTML = props.map(p => `<option value="${p.id}">${escapeHTML(p.name)} (${escapeHTML(p.city)})</option>`).join('');
        propSelect.value = 'srs';
      }

      function updateRooms(pId) {
        if (!roomSelect) return;
        const rooms = getRoomsForProperty(pId);
        roomSelect.innerHTML = '<option value="">Select room (Optional)...</option>' +
          rooms.map(r => `<option value="${escapeHTML(r.number)}">Room ${escapeHTML(r.number)} — ${escapeHTML(r.type)}</option>`).join('');
      }

      if (propSelect) {
        propSelect.addEventListener('change', () => updateRooms(propSelect.value));
      }
      updateRooms('srs');
    }

    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        populateMFDropdowns();
        document.getElementById('mf-form')?.reset();
        const checkIn = document.getElementById('mf-checkin');
        const checkOut = document.getElementById('mf-checkout');
        if (checkIn && !checkIn.value) checkIn.valueAsDate = new Date();
        if (checkOut && !checkOut.value) checkOut.valueAsDate = new Date();
        modal.classList.remove('hidden');
      });
    });

    document.getElementById('close-mf-modal')?.addEventListener('click', () => modal.classList.add('hidden'));
    document.getElementById('cancel-mf-modal')?.addEventListener('click', () => modal.classList.add('hidden'));

    document.getElementById('mf-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const propId = document.getElementById('mf-property')?.value || 'srs';
      const props = getProperties();
      const prop = props.find(p => p.id === propId) || props[0];

      const guestName = document.getElementById('mf-name')?.value.trim() || 'Valued Guest';
      const roomNo = document.getElementById('mf-room')?.value || '';
      const checkIn = document.getElementById('mf-checkin')?.value || '';
      const checkOut = document.getElementById('mf-checkout')?.value || '';
      const overallRating = parseInt(document.getElementById('mf-rating-overall')?.value || '5', 10);
      const highlight = document.getElementById('mf-highlight')?.value.trim() || '';
      const improve = document.getElementById('mf-improve')?.value.trim() || '';
      const teamMember = document.getElementById('mf-teammember')?.value.trim() || '';
      const recommend = document.getElementById('mf-recommend')?.value || 'Yes';
      const stayAgain = document.getElementById('mf-stayagain')?.value || 'Yes';
      const comments = document.getElementById('mf-comments')?.value.trim() || '';

      const entry = {
        id: 'mf_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        submittedAt: new Date().toISOString(),
        propertyId: prop.id,
        propertyName: prop.name,
        propertyCode: prop.shortCode,
        guest: {
          name: guestName,
          room: roomNo,
          checkIn: checkIn,
          checkOut: checkOut,
          stayDates: (checkIn && checkOut) ? `${checkIn} – ${checkOut}` : (checkIn || checkOut || ''),
          feedbackDate: new Date().toISOString().slice(0, 10)
        },
        ratings: {
          overall: overallRating,
          reservation: overallRating,
          arrival: overallRating,
          room: overallRating,
          housekeeping: overallRating,
          dining: overallRating,
          instay: overallRating,
          departure: overallRating
        },
        highlight: highlight,
        improve: improve,
        recommend: recommend,
        stayAgain: stayAgain,
        teamMember: teamMember,
        comments: comments
      };

      const entries = getEntries();
      entries.unshift(entry);
      setEntries(entries);

      modal.classList.add('hidden');
      renderDashboard();
      showToast(`Recorded feedback for ${guestName}! 🎉`);
    });
  }

  function checkDraftRecovery() {
    const DRAFT_KEY = 'srs_active_draft';
    const banner = document.getElementById('draft-recovery-banner');
    const btn = document.getElementById('btn-save-draft');
    if (!banner || !btn) return;

    try {
      const draftRaw = localStorage.getItem(DRAFT_KEY);
      if (draftRaw) {
        const draft = JSON.parse(draftRaw);
        const hasData = draft && (draft.guest?.name || draft.guest?.room || draft.highlight || draft.improve || draft.comments || Object.keys(draft.ratings || {}).length > 0);
        if (hasData) {
          const guestName = draft.guest?.name || (draft.guest?.room ? `Room ${draft.guest.room}` : 'Recent guest');
          const titleEl = document.getElementById('draft-banner-text');
          if (titleEl) titleEl.textContent = `In-progress draft captured for ${guestName}!`;
          banner.classList.remove('hidden');

          btn.onclick = () => {
            const entries = getEntries();
            draft.id = 'recovered_' + Date.now();
            draft.submittedAt = new Date().toISOString();
            entries.unshift(draft);
            setEntries(entries);
            localStorage.removeItem(DRAFT_KEY);
            banner.classList.add('hidden');
            renderDashboard();
            showToast(`Recovered & saved feedback draft for ${guestName}! 🎉`);
          };
          return;
        }
      }
    } catch (e) {}
    banner.classList.add('hidden');
  }

  /* ---------------------------------------------------------
     Staff & Insights
     --------------------------------------------------------- */
  function renderInsights(entries) {
    const staffMount = document.getElementById('staff-wall-list');
    const highlightsMount = document.getElementById('insights-highlights-list');
    const staffCountBadge = document.getElementById('staff-count-badge');

    if (staffMount) {
      const staffMap = {};
      entries.forEach(e => {
        if (e.teamMember) {
          const name = e.teamMember.trim();
          if (!staffMap[name]) staffMap[name] = [];
          staffMap[name].push(e);
        }
      });

      const staffEntries = Object.entries(staffMap);
      if (staffCountBadge) staffCountBadge.textContent = `${staffEntries.length} Recognized`;

      if (!staffEntries.length) {
        staffMount.innerHTML = `<p class="text-xs text-storm/50 py-4 text-center">No staff recognitions recorded yet</p>`;
      } else {
        staffMount.innerHTML = staffEntries.map(([name, list]) => `
          <div class="p-3.5 rounded-xl border border-mist-line bg-mist/20 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-champagne/20 text-champagne flex items-center justify-center font-bold text-xs">
                <i class="fa-solid fa-user-astronaut"></i>
              </div>
              <div>
                <p class="text-sm font-bold text-ink">${escapeHTML(name)}</p>
                <p class="text-xs text-storm/60">${list.length} guest praise${list.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-xs font-extrabold bg-champagne text-ink">${list.length} ★</span>
          </div>
        `).join('');
      }
    }

    if (highlightsMount) {
      const items = entries.filter(e => e.highlight || e.improve).slice(0, 5);
      if (!items.length) {
        highlightsMount.innerHTML = `<p class="text-xs text-storm/50 py-4 text-center">No guest comments recorded yet</p>`;
      } else {
        highlightsMount.innerHTML = items.map(e => `
          <div class="p-3.5 rounded-xl border border-mist-line bg-mist/20 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-ink">${escapeHTML(e.guest?.name || 'Guest')} (${escapeHTML(e.propertyCode || 'SRS')} · Room ${escapeHTML(e.guest?.room || '—')})</span>
              <span class="text-champagne font-semibold">${e.ratings?.overall ? e.ratings.overall + ' ★' : ''}</span>
            </div>
            ${e.highlight ? `<p class="text-xs text-storm"><span class="font-semibold text-emerald-600">Loved:</span> "${escapeHTML(e.highlight)}"</p>` : ''}
            ${e.improve ? `<p class="text-xs text-storm"><span class="font-semibold text-amber-600">Idea:</span> "${escapeHTML(e.improve)}"</p>` : ''}
          </div>
        `).join('');
      }
    }
  }

  /* ---------------------------------------------------------
     Room Management Controls
     --------------------------------------------------------- */
  function renderRooms() {
    const mount = document.getElementById('rooms-pill-list');
    const countsMount = document.getElementById('room-type-counts');
    const filterSelect = document.getElementById('filter-room-type');
    const roomTabSub = document.getElementById('room-tab-subtitle');
    if (!mount) return;

    const props = getProperties();
    const currentProp = props.find(p => p.id === currentRoomPropertyId) || props[0];
    const rooms = getRoomsForProperty(currentRoomPropertyId);

    if (roomTabSub && currentProp) {
      roomTabSub.textContent = `Managing room numbers & inventory for ${currentProp.name} (${currentProp.city})`;
    }

    const typeFilter = filterSelect ? filterSelect.value : '';

    if (countsMount) {
      const counts = {};
      rooms.forEach(r => { counts[r.type] = (counts[r.type] || 0) + 1; });
      const typesList = Object.keys(counts);

      countsMount.innerHTML = typesList.length ? typesList.map(type => `
        <div class="p-3 rounded-xl bg-white/5 border border-white/10">
          <p class="text-[10px] font-extrabold text-champagne uppercase tracking-wider truncate">${escapeHTML(type)}</p>
          <p class="font-display text-2xl font-bold text-mist mt-0.5">${counts[type]}</p>
        </div>
      `).join('') : `<p class="text-xs text-storm/50 col-span-4 text-center py-2">No rooms configured for this property</p>`;
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
        const current = getRoomsForProperty(currentRoomPropertyId);
        const updated = current.filter(r => r.number !== targetNum);
        setRoomsForProperty(currentRoomPropertyId, updated);
        showToast(`Room ${targetNum} removed from ${currentProp ? currentProp.name : 'property'}`);
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
    const roomPropSelect = document.getElementById('room-property-select');

    if (roomPropSelect) {
      roomPropSelect.addEventListener('change', () => {
        currentRoomPropertyId = roomPropSelect.value;
        renderRooms();
      });
    }

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const numVal = input.value.trim();
        const typeVal = typeSelect ? typeSelect.value : 'Standard Room';
        if (!numVal) return;
        const rooms = getRoomsForProperty(currentRoomPropertyId);
        if (rooms.some(r => r.number.toLowerCase() === numVal.toLowerCase())) {
          showToast(`Room "${numVal}" already exists for this property`);
          return;
        }
        rooms.push({ number: numVal, type: typeVal });
        setRoomsForProperty(currentRoomPropertyId, rooms);
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
        if (!confirm(`Reset rooms for this property to default?`)) return;
        setRoomsForProperty(currentRoomPropertyId, currentRoomPropertyId === 'srs' ? DEFAULT_ROOMS : [
          { number: '101', type: 'Suite Room' },
          { number: '102', type: 'Executive Room' },
          { number: '103', type: 'Standard Room' },
          { number: '104', type: 'Standard Room' }
        ]);
        showToast('Rooms reset to defaults');
        renderDashboard();
      });
    }
  }

  /* ---------------------------------------------------------
     Filtering & Feed Rendering
     --------------------------------------------------------- */
  function applyFilters(entries) {
    const q = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
    const rec = document.getElementById('filter-recommend')?.value;
    const ratingFilter = document.getElementById('filter-rating')?.value;
    const filterPropId = document.getElementById('filter-property')?.value || activePropertyId;

    return entries
      .slice()
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .filter(e => {
        if (filterPropId && filterPropId !== 'ALL' && e.propertyId !== filterPropId) return false;
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
          e.propertyName, e.propertyCode,
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
    const showingCount = document.getElementById('showing-count-text');

    if (showingCount) {
      showingCount.textContent = `Showing ${list.length} of ${getEntries().length} total entries`;
    }

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
      const propBadge = `<span class="px-2 py-0.5 text-[10.5px] font-bold rounded-full bg-champagne/15 text-champagne border border-champagne/30 mr-2"><i class="fa-solid fa-hotel mr-1 text-[9px]"></i>${escapeHTML(e.propertyCode || e.propertyName || 'SRS')}</span>`;

      const ratingsRows = CATEGORIES.map(cat => `
        <div class="flex items-center justify-between py-1.5">
          <span class="text-[12.5px]" style="color:var(--storm)">${cat.title}</span>
          ${ratingDropsHTML(e.ratings && e.ratings[cat.id])}
        </div>`).join('');

      return `
      <details class="entry-card px-5 sm:px-6 py-4" data-id="${e.id}">
        <summary class="flex items-center justify-between gap-4 cursor-pointer list-none">
          <div class="min-w-0 flex items-center gap-2">
            ${propBadge}
            <div>
              <p class="text-[14.5px] font-semibold truncate" style="color:var(--ink)">${escapeHTML(guestLabel)}${roomLabel}</p>
              <p class="text-[12px]" style="color:var(--storm);opacity:.6">${fmtDate(e.submittedAt)} · ${escapeHTML(e.propertyName || 'Silver Rain Suites')}</p>
            </div>
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
        try {
          fetch('/api/feedbacks', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
          }).catch(() => {});
        } catch (e) {}
        showToast('Entry deleted');
        renderDashboard();
      });
    });
  }

  /* ---------------------------------------------------------
     Exports & Imports
     --------------------------------------------------------- */
  function exportJSON() {
    const list = getEntries();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(list, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `xacro_feedbacks_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Exported raw JSON backup');
  }

  function exportCSV() {
    const list = getEntries();
    if (!list.length) {
      showToast('No feedback entries to export yet');
      return;
    }

    const headers = [
      'ID', 'Property Name', 'Property Code', 'Submitted At', 'Guest Name', 'Room', 'Stay Dates',
      'Overall', 'Reservation', 'Arrival', 'Room Rating', 'Housekeeping', 'Dining', 'In-stay Service', 'Departure',
      'Highlight', 'Could Improve', 'Recommend', 'Stay Again', 'Team Member Recognized', 'Comments'
    ];

    const rows = list.map(e => [
      e.id, e.propertyName || 'Silver Rain Suites', e.propertyCode || 'SRS', e.submittedAt,
      e.guest?.name || '', e.guest?.room || '', e.guest?.stayDates || '',
      e.ratings?.overall || '', e.ratings?.reservation || '', e.ratings?.arrival || '', e.ratings?.room || '',
      e.ratings?.housekeeping || '', e.ratings?.dining || '', e.ratings?.instay || '', e.ratings?.departure || '',
      e.highlight || '', e.improve || '', e.recommend || '', e.stayAgain || '', e.teamMember || '', e.comments || ''
    ]);

    const csvContent = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xacro_feedbacks_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported CSV spreadsheet');
  }

  function importJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const incoming = JSON.parse(e.target.result);
        if (!Array.isArray(incoming)) throw new Error('not an array');
        const existing = getEntries();
        const byId = new Map(existing.map(ex => [ex.id, ex]));
        incoming.forEach(inc => {
          if (inc && inc.id) {
            byId.set(inc.id, inc);
            try {
              fetch('/api/feedbacks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inc)
              }).catch(() => {});
            } catch (err) {}
          }
        });
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
    try {
      fetch('/api/feedbacks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'ALL' })
      }).catch(() => {});
    } catch (e) {}
    showToast('All responses cleared');
    renderDashboard();
  }

  /* ---------------------------------------------------------
     Sidebar & Tab Navigation
     --------------------------------------------------------- */
  function switchTab(tabId) {
    const links = document.querySelectorAll('#sidebar-nav .sidebar-link');
    links.forEach(l => {
      l.classList.toggle('is-active', l.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-content').forEach(tc => {
      tc.classList.toggle('is-active', tc.id === tabId);
      tc.classList.toggle('hidden', tc.id !== tabId);
    });

    const meta = TAB_METADATA[tabId] || { title: 'Dashboard', subtitle: '' };
    const titleEl = document.getElementById('page-title');
    const subEl = document.getElementById('page-subtitle');
    if (titleEl) titleEl.textContent = meta.title;
    if (subEl) subEl.textContent = meta.subtitle;

    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth < 768 && sidebar) {
      sidebar.classList.add('hidden');
    }
  }

  function initSidebarNav() {
    const links = document.querySelectorAll('#sidebar-nav .sidebar-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        const tabId = link.dataset.tab;
        if (tabId) switchTab(tabId);
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
     Real-Time Cross-Tab Synchronization & Auto Refresh
     --------------------------------------------------------- */
  const CLOUD_DB_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a0a41dc38a0c8a';

  function initRealtimeSync() {
    let lastKnownCount = getEntries().length;

    async function deepScanAndRecover() {
      const foundMap = new Map();

      // 1. Scan current entries
      getEntries().forEach(e => { if (e && e.id) foundMap.set(e.id, e); });

      // 2. Scan all localStorage & sessionStorage keys
      [localStorage, sessionStorage].forEach(store => {
        try {
          for (let i = 0; i < store.length; i++) {
            const key = store.key(i);
            if (!key) continue;
            try {
              const val = store.getItem(key);
              if (!val) continue;
              const parsed = JSON.parse(val);
              const arr = Array.isArray(parsed) ? parsed : [parsed];
              arr.forEach(item => {
                if (item && typeof item === 'object') {
                  if (item.id && (item.guest || item.ratings || item.submittedAt)) {
                    foundMap.set(item.id, item);
                  }
                }
              });
            } catch (err) {}
          }
        } catch (err) {}
      });

      // 3. Fetch from Server File Endpoint
      try {
        const res = await fetch('/api/feedbacks');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            data.forEach(e => { if (e && e.id) foundMap.set(e.id, e); });
          }
        }
      } catch (e) {}

      // 4. Fetch from Persistent Global Cloud Database
      try {
        const cloudRes = await fetch(CLOUD_DB_URL);
        if (cloudRes.ok) {
          const parsed = await cloudRes.json();
          const cloudEntries = (parsed && parsed.data && Array.isArray(parsed.data.feedbacks)) ? parsed.data.feedbacks : [];
          cloudEntries.forEach(e => { if (e && e.id) foundMap.set(e.id, e); });
        }
      } catch (e) {}

      const allRecovered = Array.from(foundMap.values()).map(e => {
        if (!e.propertyId) {
          e.propertyId = 'srs';
          e.propertyName = 'Silver Rain Suites';
          e.propertyCode = 'SRS';
        }
        return e;
      }).sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0));

      setEntries(allRecovered);
      try { localStorage.setItem('srs_feedbacks_backup', JSON.stringify(allRecovered)); } catch (e) {}

      // Push merged data back to Cloud DB
      try {
        fetch(CLOUD_DB_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: "xacro_experiences_global_db",
            data: { feedbacks: allRecovered }
          })
        }).catch(() => {});
      } catch (e) {}

      renderDashboard();
      return allRecovered;
    }

    async function syncWithServerFile() {
      let serverEntries = [];
      try {
        const res = await fetch('/api/feedbacks');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) serverEntries = data;
        }
      } catch (e) {}

      try {
        const cloudRes = await fetch(CLOUD_DB_URL);
        if (cloudRes.ok) {
          const parsed = await cloudRes.json();
          const cloudEntries = (parsed && parsed.data && Array.isArray(parsed.data.feedbacks)) ? parsed.data.feedbacks : [];
          if (cloudEntries.length > 0) {
            const map = new Map();
            serverEntries.forEach(e => { if (e && e.id) map.set(e.id, e); });
            cloudEntries.forEach(e => { if (e && e.id) map.set(e.id, e); });
            serverEntries = Array.from(map.values());
          }
        }
      } catch (e) {}

      const localEntries = getEntries();
      const byId = new Map();
      localEntries.forEach(e => { if (e && e.id) byId.set(e.id, e); });
      serverEntries.forEach(e => { if (e && e.id) byId.set(e.id, e); });

      const merged = Array.from(byId.values()).sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0));
      if (JSON.stringify(merged) !== JSON.stringify(localEntries)) {
        setEntries(merged);
        refreshIfChanged('server_file_sync');
      }
    }

    // Load initial central server data & run initial deep scan
    deepScanAndRecover();

    function refreshIfChanged(reason) {
      const currentEntries = getEntries();
      const countEl = document.getElementById('showing-count-text');
      if (countEl) {
        countEl.textContent = `Showing ${applyFilters(currentEntries).length} of ${currentEntries.length} total entries`;
      }
      const syncStatusEl = document.getElementById('sync-status-text');
      if (syncStatusEl) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        syncStatusEl.textContent = `Real-Time Sync Active (${timeStr})`;
      }

      if (currentEntries.length !== lastKnownCount || reason === 'force') {
        const diff = currentEntries.length - lastKnownCount;
        lastKnownCount = currentEntries.length;
        renderDashboard();
        if (diff > 0 && reason !== 'force') {
          showToast(`⚡ ${diff} new guest feedback received!`);
        }
      }
    }

    // 1. BroadcastChannel API for cross-tab messages
    try {
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('xacro_feedback_channel');
        channel.onmessage = (event) => {
          if (event.data && (event.data.type === 'NEW_FEEDBACK' || event.data.type === 'NEW_FEEDBACK_SUBMITTED')) {
            syncWithServerFile();
            refreshIfChanged('broadcast');
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel sync init warning:', e);
    }

    // 2. Window Storage Event (cross-window/tab local storage changes)
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY || e.key === PROPERTIES_KEY || e.key === ROOMS_KEY || e.key === 'srs_active_draft' || e.key === 'srs_feedbacks_backup') {
        syncWithServerFile();
        refreshIfChanged('storage_event');
      }
    });

    // 3. Periodic Polling Ticker (2.5 second fail-safe fallback)
    setInterval(() => {
      syncWithServerFile();
      refreshIfChanged('polling');
    }, 2500);

    // 4. Force Sync Button Click Listener
    const syncBtn = document.getElementById('btn-force-sync');
    if (syncBtn) {
      syncBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = syncBtn.querySelector('i');
        if (icon) icon.classList.add('fa-spin');
        syncWithServerFile().then(() => {
          refreshIfChanged('force');
          showToast('Database synchronized & refreshed! 🔄');
          setTimeout(() => {
            if (icon) icon.classList.remove('fa-spin');
          }, 600);
        });
      });
    }

    // 5. Deep Scan & Recover Reviews Button
    const recoverBtn = document.getElementById('btn-deep-recover');
    if (recoverBtn) {
      recoverBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = recoverBtn.querySelector('i');
        if (icon) icon.classList.add('fa-spin');
        deepScanAndRecover().then((recovered) => {
          showToast(`Deep scan complete — ${recovered.length} total reviews active & synced! 🔍✨`);
          setTimeout(() => {
            if (icon) icon.classList.remove('fa-spin');
          }, 600);
        });
      });
    }
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  function init() {
    initRain();
    initLogin();
    initSidebarNav();
    initLiveClock();
    initPropertyModal();
    initManualFeedbackModal();
    initRoomManagement();
    initRealtimeSync();
    if (window.AOS) AOS.init({ once: true, duration: 500 });

    const headerSelect = document.getElementById('header-property-select');
    if (headerSelect) {
      headerSelect.addEventListener('change', () => {
        activePropertyId = headerSelect.value;
        const filterProp = document.getElementById('filter-property');
        if (filterProp) filterProp.value = activePropertyId;
        renderDashboard();
      });
    }

    const filterProp = document.getElementById('filter-property');
    if (filterProp) {
      filterProp.addEventListener('change', () => {
        activePropertyId = filterProp.value;
        if (headerSelect) headerSelect.value = activePropertyId;
        renderDashboard();
      });
    }

    const quickJson = document.getElementById('quick-export-json');
    const tabJson = document.getElementById('export-json-btn-tab');
    if (quickJson) quickJson.addEventListener('click', exportJSON);
    if (tabJson) tabJson.addEventListener('click', exportJSON);

    const quickCsv = document.getElementById('quick-export-csv');
    const tabCsv = document.getElementById('export-csv-btn-tab');
    if (quickCsv) quickCsv.addEventListener('click', exportCSV);
    if (tabCsv) tabCsv.addEventListener('click', exportCSV);

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
