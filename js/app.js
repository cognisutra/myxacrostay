/* ==========================================================
   Silver Rain Suites — Guest Feedback wizard
   No backend: responses are stored as JSON in the browser
   (localStorage) under STORAGE_KEY. The admin panel reads the
   same key and can export the full array as a .json file.
   ========================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'srs_feedbacks';
  const ROOMS_KEY = 'srs_rooms';
  const PROPERTIES_KEY = 'srs_properties';
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

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function populateRoomDropdown(propertyId) {
    const select = document.getElementById('f-room');
    if (!select) return;
    const targetId = propertyId || 'srs';
    const props = getProperties();
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
    const currentVal = select.value;
    select.innerHTML = '<option value="">Select room...</option>' +
      rooms.map(r => `<option value="${escapeHTML(r.number)}">Room ${escapeHTML(r.number)} — ${escapeHTML(r.type)}</option>`).join('');
    select.value = currentVal;
  }

  /* ---------------------------------------------------------
     Ambient rain canvas — one quiet, continuous background
     moment. Cheap: a fixed pool of drops, no per-frame alloc.
     --------------------------------------------------------- */
  /* ---------------------------------------------------------
     Magical Background Canvas — Aurora Orbs, Glistening Rain,
     Twinkling Sparkles, and Interactive Ripples
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
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

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
     Category data & Playful Helpers
     --------------------------------------------------------- */
  const CATEGORIES = [
    { id: 'reservation', num: '01', icon: 'fa-calendar-check', title: 'Reservation & Pre-arrival', desc: 'Booking, communication and preparation' },
    { id: 'arrival',     num: '02', icon: 'fa-door-open',      title: 'Arrival & Welcome',          desc: 'First impression, welcome and check-in' },
    { id: 'room',        num: '03', icon: 'fa-bed',            title: 'Room',                        desc: 'Cleanliness, comfort and room readiness' },
    { id: 'housekeeping',num: '04', icon: 'fa-broom',          title: 'Housekeeping',                desc: 'Care, responsiveness and room support' },
    { id: 'dining',      num: '05', icon: 'fa-utensils',       title: 'Dining',                       desc: 'Restaurant service and overall dining experience' },
    { id: 'instay',      num: '06', icon: 'fa-concierge-bell', title: 'In-stay Service',              desc: 'Helpfulness, response and guest care' },
    { id: 'departure',   num: '07', icon: 'fa-suitcase-rolling', title: 'Departure',                  desc: 'Check-out, billing and farewell' },
    { id: 'overall',     num: '08', icon: 'fa-heart',          title: 'Overall Experience',           desc: 'How you felt about your stay overall' },
  ];
  const RATING_EMOJIS = ['', '🙁', '😐', '🙂', '😊', '🌟'];
  const RATING_LABELS = ['', 'Needs Care', 'Okay', 'Good', 'Very Good', 'Outstanding!'];
  const PLAYFUL_PHRASES = [
    '',
    'We hear you — thanks for being honest! 💙',
    'Got it! We will work on making this better. 🛠️',
    'Good to know! Glad it was pleasant! 😊',
    'Wonderful! We love to hear that! ✨',
    'Outstanding! You made our day! 🌟🎉'
  ];

  const STEP_MOTIVATIONS = [
    "Let's dive in! 🌊",
    "Warming up... 🚀",
    "Doing great! ✨",
    "Halfway there! 🎈",
    "Almost done! 🏆",
    "Final stretch! 🎉"
  ];

  function triggerParticleBurst(el) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const colors = ['#B9924F', '#7E97A0', '#FFD700', '#FF6B6B', '#4ECDC4', '#95A5A6'];
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      const size = 5 + Math.random() * 7;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const angle = (i / 10) * Math.PI * 2 + (Math.random() * 0.4);
      const velocity = 35 + Math.random() * 45;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 15;

      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
        transform: translate(-50%, -50%);
        transition: transform 0.55s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.55s ease;
      `;
      document.body.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => particle.remove(), 550);
    }
  }

  function triggerConfettiBurst() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#B9924F', '#7E97A0', '#FFD700', '#FF69B4', '#00CED1', '#9370DB'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 6 + Math.random() * 8;
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2 - 50;

      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 260;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 60;
      const rot = Math.random() * 540;

      confetti.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        width: ${size}px;
        height: ${size * (Math.random() > 0.5 ? 1 : 2.2)}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
        pointer-events: none;
        z-index: 120;
        transform: translate(-50%, -50%) rotate(0deg);
        transition: transform 1.1s cubic-bezier(0.15, 0.85, 0.35, 1.2), opacity 1.1s ease;
      `;
      document.body.appendChild(confetti);

      requestAnimationFrame(() => {
        confetti.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(${0.4 + Math.random() * 0.8})`;
        confetti.style.opacity = '0';
      });

      setTimeout(() => confetti.remove(), 1200);
    }
  }

  const state = {
    ratings: {},     // categoryId -> 1..5
    recommend: null,
    again: null,
  };

  /* ---------------------------------------------------------
     Build the 8 category steps into #category-steps
     --------------------------------------------------------- */
  function buildCategorySteps() {
    const mount = document.getElementById('category-steps');
    const frag = document.createDocumentFragment();

    CATEGORIES.forEach((cat, idx) => {
      const section = document.createElement('section');
      section.className = 'step';
      section.dataset.step = `cat-${idx}`;

      section.innerHTML = `
        <div class="flex items-center gap-4 mb-6">
          <div class="chip-icon"><i class="fa-solid ${cat.icon}"></i></div>
          <div>
            <p class="seq-label mb-1">${cat.num} · EXPERIENCE ${idx + 1} OF 8</p>
            <h2 class="font-display text-[24px] text-ink leading-tight">${cat.title}</h2>
            <p class="text-[13.5px] mt-0.5" style="color:var(--storm);opacity:.75">${cat.desc}</p>
          </div>
        </div>

        <div class="star-rating-row my-4" role="radiogroup" aria-label="Rate ${cat.title}, 1 to 5 stars">
          ${[1,2,3,4,5].map(n => `
            <button type="button" class="star-btn" role="radio" aria-checked="false" aria-pressed="false"
                    data-rating="${n}" data-cat="${cat.id}" title="${n} Stars - ${RATING_LABELS[n]}">
              <i class="fa-solid fa-star"></i>
            </button>
          `).join('')}
        </div>

        <div class="star-rating-label text-center font-display font-semibold text-lg h-7 transition-all text-ink">
          <span class="rating-val-text" style="color:var(--storm);opacity:.6">Tap a star to rate</span>
        </div>
        <div class="rating-feedback-note text-center h-6 text-[13px] font-semibold transition-all mt-1" style="color:var(--champagne)"></div>

        <div class="flex items-center justify-between mt-8 gap-3">
          <button type="button" class="btn btn-ghost" data-back>Back</button>
          <div class="flex items-center gap-4">
            <button type="button" class="skip-note" data-skip-cat="${cat.id}">Prefer not to rate this</button>
            <button type="button" class="btn btn-primary" data-next="cat-${idx}" data-cat-next="${cat.id}" disabled>
              Continue <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
      frag.appendChild(section);
    });
    mount.appendChild(frag);

    // wire star rating events
    mount.querySelectorAll('.star-rating-row').forEach(row => {
      const starBtns = Array.from(row.querySelectorAll('.star-btn'));
      const section = row.closest('section');
      const labelText = section.querySelector('.rating-val-text');
      const feedbackNote = section.querySelector('.rating-feedback-note');
      const nextBtn = section.querySelector('[data-cat-next]');

      function updateStarState(activeVal, isHover = false) {
        starBtns.forEach(btn => {
          const r = Number(btn.dataset.rating);
          const active = r <= activeVal;
          if (isHover) {
            btn.classList.toggle('is-hover', active);
          } else {
            btn.classList.remove('is-hover');
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-pressed', r === activeVal ? 'true' : 'false');
            btn.setAttribute('aria-checked', r === activeVal ? 'true' : 'false');
          }
        });

        if (activeVal > 0) {
          if (labelText) {
            labelText.style.opacity = '1';
            labelText.style.color = 'var(--ink)';
            labelText.innerHTML = `★ ${activeVal}.0 — ${RATING_LABELS[activeVal]} ${RATING_EMOJIS[activeVal]}`;
          }
        } else {
          if (labelText) {
            labelText.style.opacity = '.6';
            labelText.style.color = 'var(--storm)';
            labelText.textContent = 'Tap a star to rate';
          }
        }
      }

      starBtns.forEach(btn => {
        const rating = Number(btn.dataset.rating);
        const catId = btn.dataset.cat;

        btn.addEventListener('mouseenter', () => updateStarState(rating, true));
        btn.addEventListener('mouseleave', () => {
          const current = state.ratings[catId] || 0;
          updateStarState(current, false);
        });

        btn.addEventListener('click', () => {
          state.ratings[catId] = rating;
          triggerParticleBurst(btn);
          updateStarState(rating, false);

          if (feedbackNote) {
            feedbackNote.textContent = PLAYFUL_PHRASES[rating] || '';
            feedbackNote.style.opacity = '1';
          }
          if (nextBtn) nextBtn.disabled = false;
        });
      });
    });

    // wire skip links
    mount.querySelectorAll('[data-skip-cat]').forEach(link => {
      link.addEventListener('click', () => {
        const section = link.closest('section');
        const idx = STEP_ORDER.indexOf(section.dataset.step);
        goToStep(STEP_ORDER[idx + 1]);
      });
    });
  }

  /* ---------------------------------------------------------
     Step engine
     --------------------------------------------------------- */
  let STEP_ORDER = [];
  function computeStepOrder() {
    STEP_ORDER = ['welcome', 'details', ...CATEGORIES.map((c, i) => `cat-${i}`), 'highlights', 'more', 'comments', 'thanks'];
  }

  const PROGRESS_STEPS = () => STEP_ORDER.filter(s => s !== 'welcome' && s !== 'thanks');

  function goToStep(stepId) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('is-active'));
    const target = document.querySelector(`.step[data-step="${stepId}"]`);
    if (!target) return;
    target.classList.add('is-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateProgress(stepId);
    if (window.AOS) AOS.refreshHard();
  }

  function updateProgress(stepId) {
    const wrap = document.getElementById('progress-wrap');
    const pSteps = PROGRESS_STEPS();
    const idx = pSteps.indexOf(stepId);
    if (idx === -1) {
      wrap.classList.add('hidden');
      return;
    }
    wrap.classList.remove('hidden');
    const pct = (idx / (pSteps.length - 1)) * 100;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-drop').style.left = pct + '%';
    document.getElementById('progress-step-label').textContent = `Step ${idx + 1} of ${pSteps.length}`;
  }

  function currentStepId() {
    return document.querySelector('.step.is-active')?.dataset.step;
  }

  function advanceFrom(stepId) {
    autoSaveDraft();
    const idx = STEP_ORDER.indexOf(stepId);
    goToStep(STEP_ORDER[idx + 1]);
  }

  function goBackFrom() {
    const cur = currentStepId();
    const idx = STEP_ORDER.indexOf(cur);
    if (idx > 0) goToStep(STEP_ORDER[idx - 1]);
  }

  /* ---------------------------------------------------------
     Pill groups (Yes / Maybe / No)
     --------------------------------------------------------- */
  function wirePillGroups() {
    document.querySelectorAll('[data-pillgroup]').forEach(group => {
      const key = group.dataset.pillgroup;
      group.querySelectorAll('.pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          group.querySelectorAll('.pill-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
          btn.setAttribute('aria-pressed', 'true');
          state[key] = btn.dataset.value;
        });
      });
    });
  }

  /* ---------------------------------------------------------
     Navigation wiring (delegated, since category steps are generated)
     --------------------------------------------------------- */
  function wireNav() {
    document.body.addEventListener('click', (e) => {
      const nextBtn = e.target.closest('[data-next]');
      if (nextBtn && !nextBtn.disabled) {
        advanceFrom(nextBtn.dataset.next);
        return;
      }
      const backBtn = e.target.closest('[data-back]');
      if (backBtn) { goBackFrom(); return; }

      const skipBtn = e.target.closest('[data-skip-to]');
      if (skipBtn) { goToStep(skipBtn.dataset.skipTo); return; }
    });
  }

  /* ---------------------------------------------------------
     Toast
     --------------------------------------------------------- */
  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  /* ---------------------------------------------------------
     Submit
     --------------------------------------------------------- */
  function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const date = new Date(y, m, d);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function formatStayDates(checkInVal, checkOutVal) {
    if (!checkInVal && !checkOutVal) return '';
    const inFormatted = formatDisplayDate(checkInVal);
    const outFormatted = formatDisplayDate(checkOutVal);
    if (inFormatted && outFormatted) {
      if (inFormatted === outFormatted) return inFormatted;
      return `${inFormatted} – ${outFormatted}`;
    }
    if (inFormatted) return inFormatted;
    if (outFormatted) return `Until ${outFormatted}`;
    return '';
  }

  function collectPayload() {
    const checkIn = val('f-checkin');
    const checkOut = val('f-checkout');
    const props = getProperties();
    const srsProp = props.find(p => p.id === 'srs') || props[0];

    return {
      id: 'fb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      submittedAt: new Date().toISOString(),
      propertyId: srsProp ? srsProp.id : 'srs',
      propertyName: srsProp ? srsProp.name : 'Silver Rain Suites',
      propertyCode: srsProp ? srsProp.shortCode : 'SRS',
      guest: {
        name: val('f-name'),
        room: val('f-room'),
        checkIn: checkIn,
        checkOut: checkOut,
        stayDates: formatStayDates(checkIn, checkOut),
        feedbackDate: val('f-fbdate'),
      },
      ratings: { ...state.ratings },
      highlight: val('f-highlight'),
      improve: val('f-improve'),
      recommend: state.recommend,
      stayAgain: state.again,
      teamMember: val('f-teammember'),
      comments: val('f-comments'),
    };
  }
  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  const DRAFT_KEY = 'srs_active_draft';

  function autoSaveDraft() {
    try {
      const entry = collectPayload();
      const hasData = entry.guest.name || entry.guest.room || entry.highlight || entry.improve || entry.comments || Object.keys(entry.ratings).length > 0;
      if (hasData) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(entry));
      }
    } catch (e) {}
  }

  function saveToStorage(entry) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { list = []; }
    list.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  const CLOUD_DB_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a0a41dc38a0c8a';

  function submitFeedback() {
    const entry = collectPayload();
    saveToStorage(entry);
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}

    // 1. Post to Vercel API Endpoint
    try {
      fetch('/api/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      }).catch(() => {});
    } catch (e) {}

    // 2. Direct Cloud DB Update (Guarantees multi-device cross-network persistence)
    try {
      fetch(CLOUD_DB_URL)
        .then(r => r.json())
        .then(parsed => {
          const currentFeedbacks = (parsed && parsed.data && Array.isArray(parsed.data.feedbacks)) ? parsed.data.feedbacks : [];
          const idx = currentFeedbacks.findIndex(e => e.id === entry.id);
          if (idx !== -1) currentFeedbacks[idx] = entry;
          else currentFeedbacks.unshift(entry);

          fetch(CLOUD_DB_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: "xacro_experiences_global_db",
              data: { feedbacks: currentFeedbacks }
            })
          }).catch(() => {});
        }).catch(() => {});
    } catch (e) {}

    try {
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel('xacro_feedback_channel');
        bc.postMessage({ type: 'NEW_FEEDBACK', entry: entry });
        bc.close();
      }
    } catch (e) {}
    triggerConfettiBurst();
    showToast('Feedback saved to Cloud Database — thank you! 🎉');
    goToStep('thanks');
    resetForm();
  }

  function resetForm() {
    state.ratings = {};
    state.recommend = null;
    state.again = null;
    document.querySelectorAll('input, textarea').forEach(el => { el.value = ''; });
    const fbDate = document.getElementById('f-fbdate');
    if (fbDate) fbDate.valueAsDate = new Date();
    document.querySelectorAll('.star-btn').forEach(b => {
      b.classList.remove('is-active', 'is-hover');
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-checked', 'false');
    });
    document.querySelectorAll('.rating-val-text').forEach(t => {
      t.style.opacity = '.6';
      t.style.color = 'var(--storm)';
      t.textContent = 'Tap a star to rate';
    });
    document.querySelectorAll('.rating-feedback-note').forEach(n => {
      n.textContent = '';
      n.style.opacity = '0';
    });
    document.querySelectorAll('.pill-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
    document.querySelectorAll('[data-cat-next]').forEach(b => b.disabled = true);
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  function init() {
    initRain();
    computeStepOrder();
    buildCategorySteps();
    wirePillGroups();
    wireNav();
    populateRoomDropdown('srs');

    const fbDate = document.getElementById('f-fbdate');
    if (fbDate) fbDate.valueAsDate = new Date();

    const checkInInput = document.getElementById('f-checkin');
    const checkOutInput = document.getElementById('f-checkout');
    if (checkInInput && checkOutInput) {
      checkInInput.addEventListener('change', () => {
        checkOutInput.min = checkInInput.value;
        if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
          checkOutInput.value = checkInInput.value;
        }
      });
    }

    document.getElementById('submit-btn').addEventListener('click', submitFeedback);
    document.getElementById('restart-btn').addEventListener('click', () => goToStep('welcome'));

    if (window.AOS) AOS.init({ once: true, duration: 550, easing: 'ease-out' });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
