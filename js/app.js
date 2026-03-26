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

  const CATEGORIES = {
    'first-aid':   { name: 'First Aid',              icon: '🏥', color: 'var(--cat-first-aid)' },
    'shelter':     { name: 'Shelter',                 icon: '⛺', color: 'var(--cat-shelter)' },
    'water':       { name: 'Water',                   icon: '💧', color: 'var(--cat-water)' },
    'food':        { name: 'Food & Nutrition',        icon: '🥫', color: 'var(--cat-food)' },
    'comms':       { name: 'Emergency Comms',         icon: '📡', color: 'var(--cat-comms)' },
    'navigation':  { name: 'Navigation',              icon: '🧭', color: 'var(--cat-navigation)' },
    'rescue':      { name: 'Rescue',                  icon: '🚁', color: 'var(--cat-rescue)' },
  };

  // ── State ──
  let currentPlayer = null;
  let data = null;
  let quizState = null;

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
    };
  }

  function loadPlayerData(name) {
    try {
      const raw = localStorage.getItem(storageKeyFor(name));
      if (raw) {
        const d = JSON.parse(raw);
        d.mastered = d.mastered || [];
        d.failed = d.failed || [];
        return d;
      }
    } catch (_) {}
    return defaultData();
  }

  function saveData() {
    if (!currentPlayer) return;
    localStorage.setItem(storageKeyFor(currentPlayer), JSON.stringify(data));
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
          <div class="category-icon" style="background:${cat.color}20; color:${cat.color}">${cat.icon}</div>
          <div>
            <h3>${cat.name}</h3>
            <span class="cat-count">${catQuestions.length} questions</span>
          </div>
        </div>
        <div class="cat-progress-bar">
          <div class="cat-progress-fill" style="width:${catPct}%; background:${cat.color}"></div>
        </div>
        <div class="cat-progress-label">${catMastered} / ${catQuestions.length} mastered (${catPct}%)</div>
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

    const optContainer = $('#quiz-options');
    optContainer.innerHTML = '';
    q.o.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-letter">${LETTERS[i]}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => handleAnswer(i));
      optContainer.appendChild(btn);
    });

    $('#quiz-explanation').classList.add('hidden');
    $('#btn-next').classList.add('hidden');
  }

  function handleAnswer(selectedIndex) {
    const q = quizState.questions[quizState.currentIndex];
    const correct = selectedIndex === q.a;
    const buttons = $$('.option-btn');

    buttons.forEach((btn, i) => {
      btn.classList.add('disabled');
      if (i === q.a) btn.classList.add('correct');
      if (i === selectedIndex && !correct) btn.classList.add('incorrect');
    });

    quizState.answers.push({ questionId: q.id, selectedIndex, correct });

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

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (!$('#screen-quiz').classList.contains('active')) return;
      const buttons = $$('.option-btn:not(.disabled)');
      if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key) - 1;
        if (buttons[idx]) buttons[idx].click();
      }
      if (e.key === 'Enter' && !$('#btn-next').classList.contains('hidden')) {
        nextQuestion();
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

    function toggleCheat() {
      overlay.classList.toggle('hidden');
      if (!overlay.classList.contains('hidden')) {
        input.value = '';
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
    $('#cheat-close').addEventListener('click', () => overlay.classList.add('hidden'));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') goToId();
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.add('hidden');
    });
  }

  // ── Init ──
  function init() {
    migrateLegacy();
    initEvents();
    initCheatMenu();
    renderPlayerScreen();
  }

  init();
})();
