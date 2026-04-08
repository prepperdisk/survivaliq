/* ===== SurvivalIQ App Engine ===== */
(function () {
  'use strict';

  // ── Constants ──
  const BATCH_SIZE = 20;
  const XP_PER_CORRECT = 10;
  const XP_PER_BONUS = 5; // bonus for first-time mastery
  const PLAYERS_KEY = 'survivaliq_players';
  const ACTIVE_KEY = 'survivaliq_active';
  const LETTERS = ['A', 'B', 'C', 'D', 'E'];

  // ── API persistence layer ──
  const API_URL = 'api.php';
  const API_TIMEOUT = 2000;
  let apiAvailable = false;

  const SurvivalAPI = {
    async check() {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), API_TIMEOUT);
        const res = await fetch(`${API_URL}?action=health`, { signal: ctrl.signal });
        clearTimeout(t);
        const json = await res.json();
        return json.ok === true;
      } catch (_) {
        return false;
      }
    },
    async getPlayers() {
      const res = await fetch(`${API_URL}?action=players`);
      const json = await res.json();
      return json.players || [];
    },
    async loadPlayerData(name) {
      const res = await fetch(`${API_URL}?action=load&name=${encodeURIComponent(name)}`);
      const json = await res.json();
      return json.data || null;
    },
    async savePlayerData(name, playerData) {
      await fetch(`${API_URL}?action=save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, data: playerData }),
      });
    },
    async createPlayer(name) {
      await fetch(`${API_URL}?action=create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
    },
  };

  // ── Sound effects (Web Audio API — no files needed) ──
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playCorrectSound() {
    const t = audioCtx.currentTime;
    const g = audioCtx.createGain();
    g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    // two-tone rising chime
    [520, 780].forEach((freq, i) => {
      const o = audioCtx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, t + i * 0.12);
      o.connect(g);
      o.start(t + i * 0.12);
      o.stop(t + 0.4);
    });
  }

  function playIncorrectSound() {
    const t = audioCtx.currentTime;
    const g = audioCtx.createGain();
    g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.2, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    // low descending buzz
    const o = audioCtx.createOscillator();
    o.type = 'square';
    o.frequency.setValueAtTime(200, t);
    o.frequency.linearRampToValueAtTime(120, t + 0.3);
    o.connect(g);
    o.start(t);
    o.stop(t + 0.35);
  }

  // Scenario-specific sounds — subtler than quiz sounds
  function playScenarioPositive() {
    const t = audioCtx.currentTime;
    const g = audioCtx.createGain();
    g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.12, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    // soft warm mallet tone
    const o = audioCtx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(440, t);
    o.frequency.exponentialRampToValueAtTime(660, t + 0.15);
    o.connect(g);
    o.start(t);
    o.stop(t + 0.6);
  }

  function playScenarioNegative() {
    const t = audioCtx.currentTime;
    const g = audioCtx.createGain();
    g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.1, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    // gentle low descending note
    const o = audioCtx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(280, t);
    o.frequency.exponentialRampToValueAtTime(180, t + 0.4);
    o.connect(g);
    o.start(t);
    o.stop(t + 0.5);
  }

  const CATEGORIES = {
    'first-aid':      { name: 'First Aid',                   icon: '🏥', color: 'var(--cat-first-aid)' },
    'shelter':        { name: 'Shelter',                      icon: '⛺', color: 'var(--cat-shelter)' },
    'water':          { name: 'Water',                        icon: '💧', color: 'var(--cat-water)' },
    'food':           { name: 'Food & Nutrition',             icon: '🥫', color: 'var(--cat-food)' },
    'comms':          { name: 'Emergency Comms',              icon: '📡', color: 'var(--cat-comms)' },
    'navigation':     { name: 'Navigation',                   icon: '🧭', color: 'var(--cat-navigation)' },
    'rescue':         { name: 'Rescue',                       icon: '🚁', color: 'var(--cat-rescue)' },
    'psychology':     { name: 'Survival Psychology',           icon: '🧠', color: 'var(--cat-psychology)' },
    'fire-clothing':  { name: 'Fire, Clothing & Equipment',   icon: '🔥', color: 'var(--cat-fire-clothing)' },
    'planning':       { name: 'Planning & Preparation',       icon: '📋', color: 'var(--cat-planning)' },
    'hazards-ppe':    { name: 'Hazards & PPE',                icon: '⚠️', color: 'var(--cat-hazards-ppe)' },
    'campcraft':      { name: 'Campcraft',                    icon: '🏕️', color: 'var(--cat-campcraft)' },
    'priorities':     { name: 'Survival Priorities',           icon: '🎯', color: 'var(--cat-priorities)' },
  };

  // ── State ──
  let currentPlayer = null;
  let data = null;
  let quizState = null;
  let scenariosData = [];
  let scenarioState = null;

  // ── DOM refs ──
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── Player management ──
  function getPlayers() {
    try {
      return JSON.parse(localStorage.getItem(PLAYERS_KEY)) || [];
    } catch (_) { return []; }
  }

  function savePlayers(players) {
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
  }

  function storageKeyFor(name) {
    return 'survivaliq_data_' + name.toLowerCase().replace(/\s+/g, '_');
  }

  function defaultData() {
    return {
      mastered: [],
      failed: [],
      xp: 0,
      streak: 0,
      bestStreak: 0,
      lastDate: null,
      scenarioGrades: {},
    };
  }

  function loadPlayerData(name) {
    try {
      const raw = localStorage.getItem(storageKeyFor(name));
      if (raw) {
        const d = JSON.parse(raw);
        d.mastered = d.mastered || [];
        d.failed = d.failed || [];
        d.scenarioGrades = d.scenarioGrades || {};
        return d;
      }
    } catch (_) {}
    return defaultData();
  }

  function saveData() {
    if (!currentPlayer) return;
    localStorage.setItem(storageKeyFor(currentPlayer), JSON.stringify(data));
    if (apiAvailable) {
      SurvivalAPI.savePlayerData(currentPlayer, data).catch(() => {});
    }
  }

  function selectPlayer(name) {
    currentPlayer = name;
    localStorage.setItem(ACTIVE_KEY, name);
    data = loadPlayerData(name);

    // Check streak continuity
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (data.lastDate && data.lastDate !== today && data.lastDate !== yesterday) {
      data.streak = 0;
      saveData();
    }

    renderDashboard();
  }

  function createPlayer(name) {
    const players = getPlayers();
    if (!players.includes(name)) {
      players.push(name);
      savePlayers(players);
    }
    if (apiAvailable) {
      SurvivalAPI.createPlayer(name).catch(() => {});
    }
    selectPlayer(name);
  }

  // ── Player select screen ──
  function renderPlayerScreen() {
    const players = getPlayers();
    const listSection = $('#player-list-section');
    const list = $('#player-list');
    const heading = $('#player-create-heading');

    if (players.length > 0) {
      listSection.classList.remove('hidden');
      heading.textContent = 'New Player';
      list.innerHTML = '';
      players.forEach(name => {
        const pd = loadPlayerData(name);
        const lvl = getLevel(pd.xp);
        const btn = document.createElement('button');
        btn.className = 'player-btn';
        btn.innerHTML = `
          <div class="player-btn-info">
            <span class="player-btn-name">${name}</span>
            <span class="player-btn-stats">Lv ${lvl.level} · ${pd.mastered.length} mastered · ${pd.xp} XP</span>
          </div>
          <span class="player-btn-arrow">→</span>
        `;
        btn.addEventListener('click', () => selectPlayer(name));
        list.appendChild(btn);
      });
    } else {
      listSection.classList.add('hidden');
      heading.textContent = 'Create Your Profile';
    }

    $('#player-name-input').value = '';
    showScreen('player');
  }

  // ── Helpers ──
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getLevel(xp) {
    let level = 1;
    let threshold = 100;
    let remaining = xp;
    while (remaining >= threshold) {
      remaining -= threshold;
      level++;
      threshold = Math.floor(threshold * 1.35);
    }
    return { level, nextThreshold: threshold, progress: remaining };
  }

  function showScreen(id) {
    $$('.screen').forEach(s => s.classList.remove('active'));
    $(`#screen-${id}`).classList.add('active');
    window.scrollTo(0, 0);
  }

  function toast(msg, type = 'success') {
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    $('#toast-container').appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  function spawnConfetti() {
    const container = $('#confetti-container');
    const colors = ['#58CC02', '#1CB0F6', '#FF9600', '#FF4B4B', '#A66BFF', '#FFD900'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (1.5 + Math.random() * 2) + 's';
      piece.style.animationDelay = Math.random() * 0.5 + 's';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = (6 + Math.random() * 8) + 'px';
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }

  // ── Streak logic ──
  function updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (data.lastDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (data.lastDate === yesterday) {
      data.streak++;
    } else if (data.lastDate !== today) {
      data.streak = 1;
    }
    data.lastDate = today;
    if (data.streak > data.bestStreak) data.bestStreak = data.streak;
    saveData();
  }

  // ── Dashboard ──
  function renderDashboard() {
    const masteredSet = new Set(data.mastered);
    const totalQ = QUESTIONS.length;
    const masteredCount = masteredSet.size;
    const pct = Math.round((masteredCount / totalQ) * 100);
    const lvl = getLevel(data.xp);

    $('#dash-player-name').textContent = currentPlayer;
    $('#dash-xp').textContent = data.xp;
    $('#dash-streak').textContent = data.streak;
    $('#dash-level').textContent = lvl.level;
    $('#overall-bar-fill').style.width = pct + '%';
    $('#overall-bar-label').textContent = `${masteredCount} / ${totalQ} mastered`;

    // Category cards
    const grid = $('#category-grid');
    grid.innerHTML = '';
    for (const [key, cat] of Object.entries(CATEGORIES)) {
      const catQuestions = QUESTIONS.filter(q => q.cat === key);
      const catMastered = catQuestions.filter(q => masteredSet.has(q.id)).length;
      const catPct = catQuestions.length ? Math.round((catMastered / catQuestions.length) * 100) : 0;

      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `
        <div class="category-card-header">
          <div class="category-icon" style="color:${cat.color}">${cat.icon}</div>
          <h3>${cat.name}</h3>
        </div>
        <div class="cat-progress-bar">
          <div class="cat-progress-fill" style="width:${catPct}%; background:${cat.color}"></div>
        </div>
        <div class="cat-progress-label">${catMastered}/${catQuestions.length}</div>
      `;
      grid.appendChild(card);
    }

    showScreen('dashboard');
  }

  // ── Quiz selection ──
  function selectQuizQuestions(mode) {
    const masteredSet = new Set(data.mastered);
    let pool;

    if (mode === 'weak') {
      const failedSet = new Set(data.failed);
      const failedQs = QUESTIONS.filter(q => failedSet.has(q.id) && !masteredSet.has(q.id));
      const unmasteredQs = QUESTIONS.filter(q => !masteredSet.has(q.id) && !failedSet.has(q.id));
      pool = [...shuffle(failedQs), ...shuffle(unmasteredQs)];
    } else {
      const unmastered = QUESTIONS.filter(q => !masteredSet.has(q.id));
      pool = unmastered.length > 0 ? shuffle(unmastered) : shuffle(QUESTIONS);
    }

    return pool.slice(0, BATCH_SIZE);
  }

  function startQuiz(mode = 'random') {
    const questions = selectQuizQuestions(mode);
    if (questions.length === 0) {
      toast('No questions available!', 'info');
      return;
    }
    quizState = {
      questions,
      currentIndex: 0,
      answers: [],
      mode,
      correctCount: 0,
    };
    renderQuestion();
    showScreen('quiz');
  }

  // ── Quiz rendering ──
  function renderQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    const cat = CATEGORIES[q.cat];
    const idx = quizState.currentIndex;
    const total = quizState.questions.length;

    $('#quiz-progress-fill').style.width = ((idx / total) * 100) + '%';
    $('#quiz-progress-label').textContent = `${idx + 1} / ${total}`;
    $('#quiz-correct-count').textContent = quizState.correctCount;

    const badge = $('#quiz-category-badge');
    badge.textContent = cat.name;
    badge.style.background = cat.color + '22';
    badge.style.color = cat.color;

    $('#quiz-question').textContent = q.q;

    // Render optional media (image or video)
    const mediaBox = $('#quiz-media');
    mediaBox.innerHTML = '';
    if (q.media) {
      mediaBox.classList.remove('hidden');
      if (q.media.type === 'image') {
        const img = document.createElement('img');
        img.src = q.media.url;
        img.alt = q.media.alt || 'Question image';
        img.loading = 'lazy';
        mediaBox.appendChild(img);
      } else if (q.media.type === 'video') {
        const video = document.createElement('video');
        video.src = q.media.url;
        video.controls = true;
        video.preload = 'metadata';
        video.playsInline = true;
        if (q.media.poster) video.poster = q.media.poster;
        mediaBox.appendChild(video);
      }
      if (q.media.caption) {
        const cap = document.createElement('p');
        cap.className = 'media-caption';
        cap.textContent = q.media.caption;
        mediaBox.appendChild(cap);
      }
    } else {
      mediaBox.classList.add('hidden');
    }

    // Shuffle option display order
    const indices = q.o.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    quizState.optionMap = indices; // maps display position → original index

    const optContainer = $('#quiz-options');
    optContainer.innerHTML = '';
    indices.forEach((origIdx, displayIdx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-letter">${LETTERS[displayIdx]}</span><span>${q.o[origIdx]}</span>`;
      btn.addEventListener('click', () => handleAnswer(origIdx));
      optContainer.appendChild(btn);
    });

    $('#quiz-explanation').classList.add('hidden');
    $('#btn-next').classList.add('hidden');
  }

  function handleAnswer(selectedIndex) {
    const q = quizState.questions[quizState.currentIndex];
    const correct = selectedIndex === q.a;
    const buttons = $$('.option-btn');
    const map = quizState.optionMap; // maps display position → original index

    buttons.forEach((btn, displayIdx) => {
      btn.classList.add('disabled');
      if (map[displayIdx] === q.a) btn.classList.add('correct');
      if (map[displayIdx] === selectedIndex && !correct) btn.classList.add('incorrect');
    });

    quizState.answers.push({ questionId: q.id, selectedIndex, correct });
    if (audioCtx.state === 'suspended') audioCtx.resume();
    correct ? playCorrectSound() : playIncorrectSound();

    if (correct) {
      quizState.correctCount++;
      if (!data.mastered.includes(q.id)) {
        data.mastered.push(q.id);
        data.xp += XP_PER_CORRECT + XP_PER_BONUS;
      } else {
        data.xp += XP_PER_CORRECT;
      }
      data.failed = data.failed.filter(id => id !== q.id);
    } else {
      if (!data.failed.includes(q.id)) data.failed.push(q.id);
      data.mastered = data.mastered.filter(id => id !== q.id);
    }
    saveData();

    const expBox = $('#quiz-explanation');
    expBox.classList.remove('hidden');
    const header = $('#explanation-header');
    header.textContent = correct ? '✓ Correct!' : '✗ Incorrect';
    header.className = 'explanation-header ' + (correct ? 'correct-header' : 'incorrect-header');
    $('#explanation-text').textContent = q.exp;
    $('#explanation-source').textContent = q.src ? `Source: ${q.src}` : '';

    const learnBox = $('#explanation-learn-more');
    const learnList = $('#learn-more-list');
    learnList.innerHTML = '';
    if (Array.isArray(q.learnMore) && q.learnMore.length > 0) {
      q.learnMore.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.title;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        li.appendChild(a);
        learnList.appendChild(li);
      });
      learnBox.classList.remove('hidden');
    } else {
      learnBox.classList.add('hidden');
    }

    $('#btn-next').classList.remove('hidden');
    $('#btn-next').focus();
    $('#quiz-correct-count').textContent = quizState.correctCount;
  }

  function nextQuestion() {
    quizState.currentIndex++;
    if (quizState.currentIndex >= quizState.questions.length) {
      finishQuiz();
    } else {
      renderQuestion();
    }
  }

  // ── Results ──
  function finishQuiz() {
    updateStreak();
    const correct = quizState.correctCount;
    const total = quizState.questions.length;
    const pct = Math.round((correct / total) * 100);
    const newMastered = quizState.answers.filter(a => a.correct).length;

    const xpEarned = quizState.answers.reduce((sum, a) => {
      return sum + (a.correct ? XP_PER_CORRECT : 0);
    }, 0);

    let emoji, title;
    if (pct === 100) { emoji = '🏆'; title = 'Perfect Score!'; spawnConfetti(); }
    else if (pct >= 80) { emoji = '🌟'; title = 'Excellent!'; spawnConfetti(); }
    else if (pct >= 60) { emoji = '💪'; title = 'Good Work!'; }
    else if (pct >= 40) { emoji = '📚'; title = 'Keep Practicing!'; }
    else { emoji = '🔄'; title = 'Room to Grow'; }

    $('#results-emoji').textContent = emoji;
    $('#results-title').textContent = title;
    $('#results-subtitle').textContent = `You got ${correct} out of ${total} correct (${pct}%)`;

    $('#res-correct').textContent = correct;
    $('#res-total').textContent = total;
    $('#res-xp').textContent = '+' + xpEarned;
    $('#res-new-mastered').textContent = newMastered;

    const reviewList = $('#review-list');
    reviewList.innerHTML = '';
    const incorrect = quizState.answers.filter(a => !a.correct);
    if (incorrect.length === 0) {
      $('#results-review').style.display = 'none';
    } else {
      $('#results-review').style.display = 'block';
      incorrect.forEach(a => {
        const q = QUESTIONS.find(qq => qq.id === a.questionId);
        if (!q) return;
        const item = document.createElement('div');
        item.className = 'review-item';
        item.innerHTML = `
          <div class="review-item-q">${q.q}</div>
          <div class="review-item-your">Your answer: ${q.o[a.selectedIndex]}</div>
          <div class="review-item-correct">Correct: ${q.o[q.a]}</div>
          <div class="review-item-exp">${q.exp}</div>
        `;
        reviewList.appendChild(item);
      });
    }

    showScreen('results');
  }

  // ── Scenario effects ──
  let activeEffect = null;

  function showEffect(type) {
    clearEffect();
    if (type === 'fire') {
      const el = document.createElement('div');
      el.className = 'effect-fire';
      el.id = 'scenario-effect';

      // Flame tongues
      const flames = document.createElement('div');
      flames.className = 'fire-flames';
      for (let i = 0; i < 7; i++) {
        const flame = document.createElement('div');
        flame.className = 'fire-flame';
        flames.appendChild(flame);
      }
      el.appendChild(flames);

      // Ember particles
      for (let i = 0; i < 12; i++) {
        const ember = document.createElement('div');
        ember.className = 'fire-ember';
        ember.style.left = (40 + Math.random() * 20) + '%';
        ember.style.bottom = '10px';
        ember.style.animationDuration = (2 + Math.random() * 3) + 's';
        ember.style.animationDelay = (Math.random() * 4) + 's';
        ember.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');
        el.appendChild(ember);
      }

      document.body.appendChild(el);
      activeEffect = el;
    } else if (type === 'snow') {
      const el = document.createElement('div');
      el.className = 'effect-snow';
      el.id = 'scenario-effect';

      for (let i = 0; i < 40; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow-flake';
        const size = 2 + Math.random() * 5;
        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.left = Math.random() * 100 + '%';
        flake.style.animationDuration = (5 + Math.random() * 8) + 's';
        flake.style.animationDelay = (Math.random() * 6) + 's';
        flake.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
        flake.style.setProperty('--flake-opacity', (0.3 + Math.random() * 0.5).toFixed(2));
        el.appendChild(flake);
      }

      document.body.appendChild(el);
      activeEffect = el;
    }
  }

  function clearEffect() {
    if (activeEffect) {
      activeEffect.remove();
      activeEffect = null;
    }
  }

  // ── Scenario helpers ──
  const GRADE_WEIGHTS = {
    'A': 100, 'A-': 92, 'B+': 85, 'B': 80, 'B-': 72,
    'C+': 65, 'C': 60, 'C-': 55,
    'D+': 45, 'D': 30, 'F': 0
  };

  function calcScenarioScore(answers, scenario) {
    const weights = scenario.debrief.option_grade_weights || GRADE_WEIGHTS;
    const total = answers.reduce((sum, a) => sum + (weights[a.grade] || 0), 0);
    return Math.round(total / answers.length);
  }

  function scoreToLetterGrade(score, thresholds) {
    if (score >= thresholds.A.min_score) return 'A';
    if (score >= thresholds.B.min_score) return 'B';
    if (score >= thresholds.C.min_score) return 'C';
    return 'D';
  }

  function loadScenarios() {
    scenariosData = (typeof SCENARIOS !== 'undefined') ? SCENARIOS : [];
  }

  // ── Scenario Picker ──
  function renderScenarioPicker() {
    const list = $('#scenario-list');
    list.innerHTML = '';

    if (scenariosData.length === 0) {
      list.innerHTML = '<p style="color:var(--text-dim);padding:40px;text-align:center">No scenarios available yet.</p>';
      showScreen('scenario-picker');
      return;
    }

    const diffColors = { easy: 'var(--primary)', intermediate: 'var(--accent)', hard: 'var(--danger)', expert: 'var(--danger)' };

    const diffOrder = { easy: 0, beginner: 0, intermediate: 1, hard: 2, expert: 3 };
    const sorted = [...scenariosData].sort((a, b) =>
      (diffOrder[a.meta.difficulty] ?? 99) - (diffOrder[b.meta.difficulty] ?? 99)
    );
    sorted.forEach(scenario => {
      const saved = data.scenarioGrades[scenario.id];
      const card = document.createElement('div');
      card.className = 'scenario-card';
      const diffColor = diffColors[scenario.meta.difficulty] || 'var(--text-dim)';

      const imgSrc = scenario.meta.image || `images/${scenario.id}.jpg`;
      card.innerHTML = `
        <div class="scenario-card-image" style="background-image:url('${imgSrc}')">
          <span class="scenario-difficulty-badge" style="background:${diffColor}">${scenario.meta.difficulty}</span>
        </div>
        <div class="scenario-card-body">
        <div class="scenario-card-header">
          <h3>${scenario.meta.title}</h3>
        </div>
        <div class="scenario-card-meta">
          <span>📍 ${scenario.meta.setting}</span>
          <span>⏱ ~${scenario.meta.estimated_minutes} min</span>
        </div>
        <div class="scenario-card-tags">
          ${scenario.meta.tags.map(t => `<span class="scenario-tag">${t.replace(/_/g, ' ')}</span>`).join('')}
        </div>
        <div class="scenario-card-footer">
          ${saved
            ? `<span class="scenario-best-grade">Best: <strong>${saved.grade}</strong> (${saved.score}/100)</span>`
            : '<span class="scenario-new">NEW</span>'}
          <button class="btn btn-primary btn-sm scenario-start-btn">${saved ? 'Replay' : 'Start'}</button>
        </div>
        </div>
      `;

      card.querySelector('.scenario-start-btn').addEventListener('click', () => startScenario(scenario));
      list.appendChild(card);
    });

    showScreen('scenario-picker');
  }

  // ── Scenario Player ──
  function startScenario(scenario) {
    scenarioState = {
      scenario,
      currentDPIndex: 0,
      answers: [],
      lastConsequence: null,
    };
    renderScenarioIntro();
    showScreen('scenario-play');
  }

  function renderScenarioIntro() {
    const s = scenarioState.scenario;
    const totalDP = s.decision_points.length;
    const body = $('#scenario-body');

    $('#scenario-progress-fill').style.width = '0%';
    $('#scenario-progress-label').textContent = `0 / ${totalDP}`;

    const narrativeHtml = s.intro.narrative
      .split('\n\n')
      .map(p => `<p>${p}</p>`)
      .join('');

    body.innerHTML = `
      <div class="scenario-intro">
        <h2 class="scenario-title">${s.meta.title}</h2>
        <div class="scenario-narrative">${narrativeHtml}</div>
        <div class="scenario-gear">
          <h3>Your Gear</h3>
          <ul>${s.intro.gear.map(g => `<li>${g}</li>`).join('')}</ul>
        </div>
        <div class="scenario-threat">
          <strong>Threat:</strong> ${s.intro.threat_summary}
        </div>
        <button id="btn-scenario-begin" class="btn btn-primary btn-lg">Begin Scenario →</button>
      </div>
    `;

    body.querySelector('#btn-scenario-begin').addEventListener('click', () => {
      renderDecisionPoint();
    });
  }

  function renderDecisionPoint() {
    const s = scenarioState.scenario;
    const dpIndex = scenarioState.currentDPIndex;
    const dp = s.decision_points[dpIndex];

    // Show ambient effect for this decision point, or clear any existing one
    if (dp.ambient_effect) {
      clearEffect();
      showEffect(dp.ambient_effect);
    } else {
      clearEffect();
    }
    const totalDP = s.decision_points.length;
    const body = $('#scenario-body');

    $('#scenario-progress-fill').style.width = ((dpIndex / totalDP) * 100) + '%';
    $('#scenario-progress-label').textContent = `${dpIndex + 1} / ${totalDP}`;

    const bridgeHtml = scenarioState.lastConsequence
      ? `<div class="scenario-bridge">${scenarioState.lastConsequence}</div>`
      : '';

    body.innerHTML = `
      <div class="scenario-decision">
        ${bridgeHtml}
        <div class="scenario-dp-label">Decision ${dp.sequence} of ${totalDP}</div>
        <h2 class="scenario-situation">${dp.situation}</h2>
        <div class="scenario-options" id="scenario-options"></div>
      </div>
    `;

    const optContainer = body.querySelector('#scenario-options');
    dp.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-letter">${opt.id}</span><span>${opt.text}</span>`;
      btn.addEventListener('click', () => handleScenarioAnswer(dp, opt));
      optContainer.appendChild(btn);
    });
  }

  function handleScenarioAnswer(dp, selectedOption) {
    // Disable all buttons
    const buttons = $$('#scenario-options .option-btn');
    buttons.forEach(btn => btn.classList.add('disabled'));

    scenarioState.answers.push({
      dpId: dp.id,
      optionId: selectedOption.id,
      grade: selectedOption.grade,
      correct: selectedOption.correct,
    });

    if (audioCtx.state === 'suspended') audioCtx.resume();
    selectedOption.correct ? playScenarioPositive() : playScenarioNegative();

    scenarioState.lastConsequence = selectedOption.consequence;

    // Trigger visual effect if the option has one
    if (selectedOption.effect) {
      showEffect(selectedOption.effect);
    }

    renderConsequence(dp, selectedOption);
  }

  function renderConsequence(dp, selectedOption) {
    const s = scenarioState.scenario;
    const totalDP = s.decision_points.length;
    const body = $('#scenario-body');
    const isLast = scenarioState.currentDPIndex >= totalDP - 1;
    const bestOption = dp.options.find(o => o.correct);

    const gradeColor = selectedOption.correct ? 'var(--primary)' :
                       selectedOption.grade.startsWith('B') ? 'var(--accent)' : 'var(--danger)';

    body.innerHTML = `
      <div class="scenario-consequence">
        <div class="scenario-grade-badge" style="border-color:${gradeColor}; color:${gradeColor}">
          Grade: ${selectedOption.grade}
        </div>
        <div class="scenario-consequence-text">
          <h3>What Happened</h3>
          <p>${selectedOption.consequence}</p>
        </div>
        <div class="scenario-teaching">
          <h3>Key Insight</h3>
          <p>${selectedOption.teaching_point}</p>
        </div>
        ${!selectedOption.correct && bestOption ? `
          <div class="scenario-best-answer">
            <h3>Best Choice</h3>
            <p><strong>${bestOption.id}:</strong> ${bestOption.text}</p>
          </div>
        ` : ''}
        <button id="btn-scenario-continue" class="btn btn-primary btn-lg">
          ${isLast ? 'See Results →' : 'Next Decision →'}
        </button>
      </div>
    `;

    body.querySelector('#btn-scenario-continue').addEventListener('click', () => {
      if (isLast) {
        finishScenario();
      } else {
        scenarioState.currentDPIndex++;
        renderDecisionPoint();
      }
    });
  }

  // ── Scenario Debrief ──
  function finishScenario() {
    clearEffect();
    const s = scenarioState.scenario;
    const answers = scenarioState.answers;
    const score = calcScenarioScore(answers, s);
    const letterGrade = scoreToLetterGrade(score, s.debrief.grade_thresholds);
    const gradeInfo = s.debrief.grade_thresholds[letterGrade];

    // Persist best grade
    const prev = data.scenarioGrades[s.id];
    if (!prev || score > prev.score) {
      data.scenarioGrades[s.id] = { grade: letterGrade, score };
    }

    // Award XP
    const xpAward = letterGrade === 'A' ? 50 : letterGrade === 'B' ? 35 : letterGrade === 'C' ? 20 : 10;
    data.xp += xpAward;
    saveData();

    const emojiMap = { A: '🏆', B: '🌟', C: '💪', D: '📚' };
    $('#scenario-debrief-emoji').textContent = emojiMap[letterGrade] || '🎯';
    $('#scenario-debrief-title').textContent = gradeInfo.label;
    $('#scenario-debrief-subtitle').textContent = gradeInfo.description;

    const gradeColorMap = { A: 'var(--primary)', B: 'var(--secondary)', C: 'var(--accent)', D: 'var(--danger)' };

    $('#scenario-grade-box').innerHTML = `
      <div class="scenario-final-grade" style="color:${gradeColorMap[letterGrade] || 'var(--text)'}">
        ${letterGrade}
      </div>
      <div class="scenario-score-label">${score} / 100 · +${xpAward} XP</div>
      ${prev && score > prev.score ? '<div class="scenario-improved">New Personal Best!</div>' : ''}
    `;

    $('#scenario-core-lesson').innerHTML = `
      <h3>Core Lesson</h3>
      <p>${s.debrief.core_lesson}</p>
    `;

    $('#scenario-skills').innerHTML = `
      <h3>Skills Tested</h3>
      <ul>${s.debrief.key_skills_tested.map(sk => `<li>${sk}</li>`).join('')}</ul>
    `;

    const reviewList = $('#scenario-review-list');
    reviewList.innerHTML = '';
    s.decision_points.forEach((dp, i) => {
      const ans = answers[i];
      const chosenOpt = dp.options.find(o => o.id === ans.optionId);
      const bestOpt = dp.options.find(o => o.correct);

      const item = document.createElement('div');
      item.className = 'review-item';
      item.style.borderLeftColor = ans.correct ? 'var(--primary)' : 'var(--danger)';
      item.innerHTML = `
        <div class="review-item-q">Decision ${dp.sequence}: ${dp.situation.length > 100 ? dp.situation.substring(0, 100) + '…' : dp.situation}</div>
        <div class="review-item-your">Your choice: <strong>${chosenOpt.id}</strong> — ${chosenOpt.text} <span style="color:${ans.correct ? 'var(--primary)' : 'var(--accent)'}">(${ans.grade})</span></div>
        ${!ans.correct ? `<div class="review-item-correct">Best: <strong>${bestOpt.id}</strong> — ${bestOpt.text}</div>` : ''}
        <div class="review-item-exp">${chosenOpt.teaching_point}</div>
      `;
      reviewList.appendChild(item);
    });

    if (letterGrade === 'A') spawnConfetti();
    showScreen('scenario-debrief');
  }

  // ── Reset ──
  function showResetModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h3>Reset All Progress?</h3>
        <p>This will clear all mastered questions, XP, and streaks for <strong>${currentPlayer}</strong>. This cannot be undone.</p>
        <div class="modal-actions">
          <button class="btn btn-ghost btn-sm" id="modal-cancel">Cancel</button>
          <button class="btn btn-sm" style="background:var(--danger);color:#fff;box-shadow:0 3px 0 var(--danger-dark);" id="modal-confirm">Reset</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#modal-cancel').addEventListener('click', () => overlay.remove());
    overlay.querySelector('#modal-confirm').addEventListener('click', () => {
      data = defaultData();
      saveData();
      overlay.remove();
      renderDashboard();
      toast('Progress reset', 'info');
    });
  }

  // ── Event listeners ──
  function initEvents() {
    // Player screen
    $('#btn-create-player').addEventListener('click', () => {
      const name = $('#player-name-input').value.trim();
      if (!name) {
        toast('Please enter a name', 'info');
        return;
      }
      createPlayer(name);
    });
    $('#player-name-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') $('#btn-create-player').click();
    });

    // Dashboard
    $('#btn-start-quiz').addEventListener('click', () => startQuiz('random'));
    $('#btn-start-weak').addEventListener('click', () => startQuiz('weak'));
    $('#btn-reset').addEventListener('click', showResetModal);
    $('#btn-switch-player').addEventListener('click', () => {
      currentPlayer = null;
      data = null;
      renderPlayerScreen();
    });
    $('#btn-next').addEventListener('click', nextQuestion);
    $('#btn-quit').addEventListener('click', () => renderDashboard());
    $('#btn-back-dash').addEventListener('click', () => renderDashboard());
    $('#btn-play-again').addEventListener('click', () => startQuiz(quizState?.mode || 'random'));

    // Scenarios
    $('#btn-scenarios').addEventListener('click', () => renderScenarioPicker());
    $('#btn-scenario-back').addEventListener('click', () => renderDashboard());
    $('#btn-scenario-quit').addEventListener('click', () => { clearEffect(); renderScenarioPicker(); });
    $('#btn-scenario-debrief-back').addEventListener('click', () => renderScenarioPicker());
    $('#btn-scenario-replay').addEventListener('click', () => startScenario(scenarioState.scenario));
    $('#btn-scenario-prev').addEventListener('click', () => {
      const list = $('#scenario-list');
      const card = list.querySelector('.scenario-card');
      const step = card ? card.offsetWidth + 20 : list.clientWidth * 0.8;
      list.scrollBy({ left: -step, behavior: 'smooth' });
    });
    $('#btn-scenario-next').addEventListener('click', () => {
      const list = $('#scenario-list');
      const card = list.querySelector('.scenario-card');
      const step = card ? card.offsetWidth + 20 : list.clientWidth * 0.8;
      list.scrollBy({ left: step, behavior: 'smooth' });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Quiz shortcuts
      if ($('#screen-quiz').classList.contains('active')) {
        const buttons = $$('.option-btn:not(.disabled)');
        if (e.key >= '1' && e.key <= '5') {
          const idx = parseInt(e.key) - 1;
          if (buttons[idx]) buttons[idx].click();
        }
        if (e.key === 'Enter' && !$('#btn-next').classList.contains('hidden')) {
          nextQuestion();
        }
      }
      // Scenario shortcuts
      if ($('#screen-scenario-play').classList.contains('active')) {
        const scenButtons = $$('#scenario-options .option-btn:not(.disabled)');
        if (e.key >= '1' && e.key <= '4') {
          const idx = parseInt(e.key) - 1;
          if (scenButtons[idx]) scenButtons[idx].click();
        }
        if (e.key === 'Enter') {
          const cont = $('#btn-scenario-continue');
          if (cont) cont.click();
          const begin = $('#btn-scenario-begin');
          if (begin) begin.click();
        }
      }
    });
  }

  // ── Migrate legacy single-player data ──
  function migrateLegacy() {
    const legacy = localStorage.getItem('survivaliq_data');
    if (!legacy) return;
    try {
      const d = JSON.parse(legacy);
      if (d && (d.xp > 0 || d.mastered?.length > 0)) {
        const name = 'Player';
        localStorage.setItem(storageKeyFor(name), legacy);
        const players = getPlayers();
        if (!players.includes(name)) {
          players.push(name);
          savePlayers(players);
        }
      }
      localStorage.removeItem('survivaliq_data');
    } catch (_) {}
  }

  // ── Cheat menu: jump to question by ID ──
  function jumpToQuestion(id) {
    const q = QUESTIONS.find(q => q.id === id);
    if (!q) {
      toast(`Question #${id} not found`, 'info');
      return;
    }
    // Ensure we have a player loaded
    if (!currentPlayer) {
      const players = getPlayers();
      if (players.length > 0) {
        selectPlayer(players[0]);
      } else {
        createPlayer('Debug');
      }
    }
    quizState = {
      questions: [q],
      currentIndex: 0,
      answers: [],
      mode: 'random',
      correctCount: 0,
    };
    renderQuestion();
    showScreen('quiz');
  }

  function initCheatMenu() {
    const overlay = $('#cheat-overlay');
    const input = $('#cheat-id-input');
    const catSelect = $('#cheat-cat-select');

    // Populate category dropdown
    for (const [key, cat] of Object.entries(CATEGORIES)) {
      const count = QUESTIONS.filter(q => q.cat === key).length;
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = `${cat.icon} ${cat.name} (${count})`;
      catSelect.appendChild(opt);
    }

    function toggleCheat() {
      overlay.classList.toggle('hidden');
      if (!overlay.classList.contains('hidden')) {
        input.value = '';
        catSelect.value = '';
        input.focus();
      }
    }

    function goToId() {
      const id = parseInt(input.value, 10);
      if (!id || id < 1) {
        toast('Enter a valid question ID', 'info');
        return;
      }
      overlay.classList.add('hidden');
      jumpToQuestion(id);
    }

    function playCategory() {
      const cat = catSelect.value;
      if (!cat) {
        toast('Choose a category', 'info');
        return;
      }
      const catQuestions = QUESTIONS.filter(q => q.cat === cat);
      if (catQuestions.length === 0) {
        toast('No questions in this category', 'info');
        return;
      }
      overlay.classList.add('hidden');

      // Ensure player is loaded
      if (!currentPlayer) {
        const players = getPlayers();
        if (players.length > 0) {
          selectPlayer(players[0]);
        } else {
          createPlayer('Debug');
        }
      }

      quizState = {
        questions: catQuestions,
        currentIndex: 0,
        answers: [],
        mode: 'random',
        correctCount: 0,
      };
      renderQuestion();
      showScreen('quiz');
    }

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        e.preventDefault();
        toggleCheat();
      }
      if (!overlay.classList.contains('hidden') && e.key === 'Escape') {
        overlay.classList.add('hidden');
      }
    });

    $('#cheat-go').addEventListener('click', goToId);
    $('#cheat-cat-go').addEventListener('click', playCategory);
    $('#cheat-close').addEventListener('click', () => overlay.classList.add('hidden'));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') goToId();
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.add('hidden');
    });
  }

  // ── Init ──
  async function init() {
    loadScenarios();
    migrateLegacy();

    // Detect API and sync data
    apiAvailable = await SurvivalAPI.check();
    if (apiAvailable) {
      try {
        const apiPlayers = await SurvivalAPI.getPlayers();
        const localPlayers = getPlayers();
        const allPlayers = [...new Set([...localPlayers, ...apiPlayers])];

        for (const name of allPlayers) {
          const localData = loadPlayerData(name);
          let apiData = null;
          if (apiPlayers.includes(name)) {
            apiData = await SurvivalAPI.loadPlayerData(name);
          }

          // Merge: keep whichever is more progressed (higher XP, then more mastered)
          let best = localData;
          if (apiData) {
            const apiXP = apiData.xp || 0;
            const localXP = localData.xp || 0;
            if (apiXP > localXP) {
              best = apiData;
            } else if (apiXP === localXP) {
              const apiM = (apiData.mastered || []).length;
              const localM = (localData.mastered || []).length;
              if (apiM > localM) best = apiData;
            }
          }

          best.mastered = best.mastered || [];
          best.failed = best.failed || [];
          best.scenarioGrades = best.scenarioGrades || {};

          // Write merged data to both stores
          localStorage.setItem(storageKeyFor(name), JSON.stringify(best));
          SurvivalAPI.savePlayerData(name, best).catch(() => {});
        }

        savePlayers(allPlayers);
      } catch (_) {
        // Sync failed — proceed with localStorage only
      }
    }

    initEvents();
    initCheatMenu();
    renderPlayerScreen();
  }

  init();
})();
