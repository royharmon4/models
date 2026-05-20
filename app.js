// app.js — Model Mastery Application Core

import { MODELS, CATEGORIES, SR_INTERVALS, SR_MULTIPLIERS, initializeMastery } from './models.js';
import { SCENARIOS, RELATIONSHIP_CHAINS } from './scenarios.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ============================================================
// SUPABASE
// ============================================================

const SUPABASE_URL = 'https://avxhghfkszokzpuoovnm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_XKf32HD_igMgwhgBOPAscQ__FOV2lRb';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
let currentUser = null;
let syncTimer = null;

function setSyncStatus(status) {
  const el = document.getElementById('sync-status');
  if (!el) return;
  el.textContent = status;
  el.title = status;
}

async function loadFromSupabase() {
  if (!currentUser) return;
  setSyncStatus('↻');
  const { data, error } = await supabase
    .from('progress')
    .select('mastery, stats, settings')
    .eq('user_id', currentUser.id)
    .maybeSingle();
  if (error) { setSyncStatus('✗'); return; }
  if (data) {
    state.mastery = data.mastery || state.mastery;
    state.stats = { ...state.stats, ...(data.stats || {}) };
    state.settings = { ...state.settings, ...(data.settings || {}) };
    try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (_) {}
  }
  setSyncStatus('✓');
}

async function syncToSupabase() {
  if (!currentUser) return;
  setSyncStatus('↻');
  const { error } = await supabase.from('progress').upsert({
    user_id: currentUser.id,
    mastery: state.mastery,
    stats: state.stats,
    settings: state.settings,
    updated_at: new Date().toISOString()
  });
  setSyncStatus(error ? '✗' : '✓');
}

function scheduleSyncToSupabase() {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(syncToSupabase, 2000);
}

// ============================================================
// STATE MANAGEMENT
// ============================================================

const STATE_KEY = 'modelMastery_v1';

let state = {
  mastery: {}, // keyed by model number
  stats: {
    streak: 0,
    lastStudyDate: null,
    totalReviews: 0,
    scenarioAccuracy: { correct: 0, total: 0 },
    numberAccuracy: { correct: 0, total: 0 },
    studySessions: 0
  },
  settings: {
    dailyGoal: 20
  }
};

function loadState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    }
  } catch (e) {
    console.warn('Could not load saved state:', e);
  }
  // Ensure all models have mastery data
  MODELS.forEach(m => {
    if (!state.mastery[m.number]) {
      state.mastery[m.number] = initializeMastery();
    }
  });
  // Update streak
  updateStreak();
}

function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save state:', e);
  }
  scheduleSyncToSupabase();
}

function updateStreak() {
  const today = getTodayStr();
  const lastStudy = state.stats.lastStudyDate;
  if (!lastStudy) return;
  const yesterday = getDateStr(new Date(Date.now() - 86400000));
  if (lastStudy === today) return; // already today
  if (lastStudy !== yesterday) {
    state.stats.streak = 0;
    saveState();
  }
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function getDateStr(d) {
  return d.toISOString().split('T')[0];
}

function recordStudy() {
  const today = getTodayStr();
  const lastStudy = state.stats.lastStudyDate;
  if (lastStudy !== today) {
    const yesterday = getDateStr(new Date(Date.now() - 86400000));
    if (lastStudy === yesterday) {
      state.stats.streak += 1;
    } else if (!lastStudy) {
      state.stats.streak = 1;
    } else {
      state.stats.streak = 1;
    }
    state.stats.lastStudyDate = today;
    state.stats.studySessions += 1;
  }
  saveState();
}

// Spaced repetition
function updateMastery(modelNumber, grade) {
  const m = state.mastery[modelNumber];
  const today = getTodayStr();
  m.lastReviewed = today;
  state.stats.totalReviews += 1;

  if (grade === 'missed') {
    m.incorrect += 1;
    m.interval = 0;
    m.nextReview = today;
    m.easeFactor = Math.max(1.3, m.easeFactor - 0.2);
  } else if (grade === 'hard') {
    m.incorrect += 1;
    m.interval = Math.max(1, Math.round(m.interval * 0.8));
    m.nextReview = addDays(today, 1);
    m.easeFactor = Math.max(1.3, m.easeFactor - 0.15);
  } else if (grade === 'got_it') {
    m.correct += 1;
    if (m.interval === 0) m.interval = 3;
    else m.interval = Math.round(m.interval * m.easeFactor);
    m.nextReview = addDays(today, m.interval);
  } else if (grade === 'easy') {
    m.correct += 1;
    if (m.interval === 0) m.interval = 7;
    else m.interval = Math.round(m.interval * m.easeFactor * 1.3);
    m.easeFactor = Math.min(4.0, m.easeFactor + 0.1);
    m.nextReview = addDays(today, m.interval);
  }

  // Calculate mastery level (0-5)
  const total = m.correct + m.incorrect;
  if (total === 0) m.level = 0;
  else {
    const ratio = m.correct / total;
    if (ratio >= 0.95 && m.correct >= 10) m.level = 5;
    else if (ratio >= 0.85 && m.correct >= 7) m.level = 4;
    else if (ratio >= 0.75 && m.correct >= 4) m.level = 3;
    else if (ratio >= 0.6 && m.correct >= 2) m.level = 2;
    else if (m.correct >= 1) m.level = 1;
    else m.level = 0;
  }

  recordStudy();
  saveState();
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function getDueModels() {
  const today = getTodayStr();
  return MODELS.filter(m => {
    const mastery = state.mastery[m.number];
    return !mastery.nextReview || mastery.nextReview <= today;
  });
}

function getMasteryPercent() {
  const total = MODELS.length;
  const mastered = MODELS.filter(m => state.mastery[m.number].level >= 3).length;
  return Math.round((mastered / total) * 100);
}

function getWeakModels(limit = 10) {
  return MODELS
    .filter(m => {
      const ms = state.mastery[m.number];
      return ms.lastReviewed !== null;
    })
    .sort((a, b) => {
      const ma = state.mastery[a.number];
      const mb = state.mastery[b.number];
      return ma.level - mb.level || (ma.incorrect - ma.correct) - (mb.incorrect - mb.correct);
    })
    .slice(0, limit);
}

function getReviewedToday() {
  const today = getTodayStr();
  return MODELS.filter(m => state.mastery[m.number].lastReviewed === today).length;
}

function getCategoryMastery() {
  return CATEGORIES.map(cat => {
    const catModels = MODELS.filter(m => m.category === cat);
    const mastered = catModels.filter(m => state.mastery[m.number].level >= 3).length;
    return {
      name: cat,
      total: catModels.length,
      mastered,
      percent: catModels.length ? Math.round((mastered / catModels.length) * 100) : 0
    };
  });
}

// ============================================================
// VIEW SYSTEM
// ============================================================

let currentView = 'dashboard';
let reviewSession = null;
let scenarioSession = null;

function showView(name) {
  currentView = name;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(`view-${name}`);
  if (el) el.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === name);
  });
  renderView(name);
}

function renderView(name) {
  switch (name) {
    case 'dashboard': renderDashboard(); break;
    case 'library': renderLibrary(); break;
    case 'review': renderReviewStart(); break;
    case 'scenarios': renderScenariosStart(); break;
    case 'chains': renderChains(); break;
    case 'numberdrill': renderNumberDrillStart(); break;
  }
}

// ============================================================
// DASHBOARD
// ============================================================

function renderDashboard() {
  const due = getDueModels().length;
  const reviewedToday = getReviewedToday();
  const masteryPct = getMasteryPercent();
  const weakCats = getCategoryMastery().filter(c => c.percent < 50).slice(0, 3);

  const el = document.getElementById('view-dashboard');
  el.innerHTML = `
    <div class="dashboard-header">
      <div class="dash-title">MODEL<br>MASTERY</div>
      <div class="dash-subtitle">${MODELS.length} management models</div>
    </div>

    <div class="stats-grid">
      <div class="stat-card accent">
        <div class="stat-num">${due}</div>
        <div class="stat-label">Due Today</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">${reviewedToday}</div>
        <div class="stat-label">Reviewed Today</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">${state.stats.streak}</div>
        <div class="stat-label">Day Streak</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">${masteryPct}%</div>
        <div class="stat-label">Mastery</div>
      </div>
    </div>

    <div class="mastery-bar-container">
      <div class="mastery-bar-label">Overall Mastery Progress</div>
      <div class="mastery-bar-track">
        <div class="mastery-bar-fill" style="width:${masteryPct}%"></div>
      </div>
      <div class="mastery-bar-count">${MODELS.filter(m => state.mastery[m.number].level >= 3).length} of ${MODELS.length} models</div>
    </div>

    ${weakCats.length ? `
    <div class="weak-section">
      <div class="section-label">Weakest Categories</div>
      ${weakCats.map(c => `
        <div class="weak-cat-row">
          <span class="weak-cat-name">${c.name}</span>
          <div class="mini-bar-track">
            <div class="mini-bar-fill" style="width:${c.percent}%"></div>
          </div>
          <span class="weak-cat-pct">${c.percent}%</span>
        </div>
      `).join('')}
    </div>` : ''}

    <div class="quick-actions">
      <div class="section-label">Quick Actions</div>
      <div class="action-grid">
        <button class="action-btn primary" onclick="startDailyReview()">
          <span class="action-icon">⚡</span>
          <span class="action-text">Daily Review<br><small>${due} due</small></span>
        </button>
        <button class="action-btn" onclick="showView('numberdrill')">
          <span class="action-icon">#</span>
          <span class="action-text">Number Drill</span>
        </button>
        <button class="action-btn" onclick="showView('scenarios')">
          <span class="action-icon">⚙</span>
          <span class="action-text">Scenario Trainer</span>
        </button>
        <button class="action-btn" onclick="showView('library')">
          <span class="action-icon">◉</span>
          <span class="action-text">Model Library</span>
        </button>
        <button class="action-btn" onclick="showView('chains')">
          <span class="action-icon">⛓</span>
          <span class="action-text">Relationship Map</span>
        </button>
        <button class="action-btn" onclick="startWeakReview()">
          <span class="action-icon">↑</span>
          <span class="action-text">Weak Models</span>
        </button>
      </div>
    </div>

    <div class="total-reviews-footer">
      ${state.stats.totalReviews} total reviews · ${state.stats.studySessions} sessions
    </div>
  `;
}

// ============================================================
// LIBRARY
// ============================================================

let libraryFilter = { search: '', category: 'all', sort: 'number' };

function renderLibrary() {
  const el = document.getElementById('view-library');
  el.innerHTML = `
    <div class="library-toolbar">
      <input type="text" id="lib-search" placeholder="Search models…" class="search-input" value="${libraryFilter.search}" oninput="onLibSearch(this.value)">
      <select class="filter-select" onchange="onLibCategory(this.value)">
        <option value="all" ${libraryFilter.category === 'all' ? 'selected' : ''}>All Categories</option>
        ${CATEGORIES.map(c => `<option value="${c}" ${libraryFilter.category === c ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
      <select class="filter-select" onchange="onLibSort(this.value)">
        <option value="number" ${libraryFilter.sort === 'number' ? 'selected' : ''}># Number</option>
        <option value="name" ${libraryFilter.sort === 'name' ? 'selected' : ''}>A–Z Name</option>
        <option value="mastery" ${libraryFilter.sort === 'mastery' ? 'selected' : ''}>Mastery</option>
      </select>
    </div>
    <div id="library-list" class="library-list">
      ${renderModelCards()}
    </div>
  `;
}

function renderModelCards() {
  let models = [...MODELS];

  if (libraryFilter.search) {
    const q = libraryFilter.search.toLowerCase();
    models = models.filter(m =>
      m.name.toLowerCase().includes(q) ||
      String(m.number).includes(q) ||
      m.meaning.toLowerCase().includes(q) ||
      m.example.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.trigger.toLowerCase().includes(q)
    );
  }

  if (libraryFilter.category !== 'all') {
    models = models.filter(m => m.category === libraryFilter.category);
  }

  if (libraryFilter.sort === 'name') {
    models.sort((a, b) => a.name.localeCompare(b.name));
  } else if (libraryFilter.sort === 'mastery') {
    models.sort((a, b) => (state.mastery[a.number]?.level || 0) - (state.mastery[b.number]?.level || 0));
  } else {
    models.sort((a, b) => a.number - b.number);
  }

  if (models.length === 0) {
    return '<div class="empty-state">No models match your search.</div>';
  }

  return models.map(m => renderModelCard(m)).join('');
}

function renderModelCard(m) {
  const ms = state.mastery[m.number];
  const levelLabel = ['New', 'Learning', 'Familiar', 'Good', 'Strong', 'Mastered'][ms.level];
  const levelClass = ['level-0', 'level-1', 'level-2', 'level-3', 'level-4', 'level-5'][ms.level];
  const related = m.relatedModels.map(n => {
    const rm = MODELS.find(x => x.number === n);
    return rm ? `<span class="related-tag" onclick="scrollToModel(${n})">#${n} ${rm.name}</span>` : '';
  }).join('');

  return `
    <div class="model-card" id="model-${m.number}">
      <div class="model-card-header" onclick="toggleCard(${m.number})">
        <div class="model-number">${m.number}</div>
        <div class="model-name-block">
          <div class="model-name">${m.name}</div>
          <div class="model-cat-tag">${m.category}</div>
        </div>
        <div class="model-level ${levelClass}">${levelLabel}</div>
        <div class="card-toggle">▼</div>
      </div>
      <div class="model-card-body" id="card-body-${m.number}" style="display:none">
        <div class="model-meaning"><strong>Meaning:</strong> ${m.meaning}</div>
        <div class="model-example"><strong>Example:</strong> ${m.example}</div>
        <div class="model-trigger"><strong>When to use:</strong> ${m.trigger}</div>
        <div class="model-diagnostic"><strong>Ask:</strong> "${m.diagnosticQuestion}"</div>
        ${related ? `<div class="model-related"><strong>Related:</strong> ${related}</div>` : ''}
        <div class="model-stats-row">
          <span>✓ ${ms.correct} correct</span>
          <span>✗ ${ms.incorrect} incorrect</span>
          ${ms.lastReviewed ? `<span>Last: ${ms.lastReviewed}</span>` : '<span>Never reviewed</span>'}
        </div>
        <button class="mini-review-btn" onclick="reviewSingleModel(${m.number})">Review this model</button>
      </div>
    </div>
  `;
}

function toggleCard(num) {
  const body = document.getElementById(`card-body-${num}`);
  const card = document.getElementById(`model-${num}`);
  if (body) {
    const isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    card.classList.toggle('expanded', !isOpen);
  }
}

function scrollToModel(num) {
  showView('library');
  libraryFilter.search = String(num);
  renderLibrary();
  setTimeout(() => {
    const el = document.getElementById(`model-${num}`);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); toggleCard(num); }
  }, 100);
}

function onLibSearch(val) {
  libraryFilter.search = val;
  document.getElementById('library-list').innerHTML = renderModelCards();
}

function onLibCategory(val) {
  libraryFilter.category = val;
  document.getElementById('library-list').innerHTML = renderModelCards();
}

function onLibSort(val) {
  libraryFilter.sort = val;
  document.getElementById('library-list').innerHTML = renderModelCards();
}

// ============================================================
// REVIEW SESSION
// ============================================================

const QUESTION_TYPES = ['name_to_meaning', 'meaning_to_name', 'number_to_name', 'name_to_number', 'scenario_to_model'];

function buildReviewQueue(models, maxSize = 20) {
  const queue = [];
  const today = getTodayStr();

  models.forEach(m => {
    // Pick question type based on mastery level
    const ms = state.mastery[m.number];
    const types = ms.level < 2
      ? ['name_to_meaning', 'meaning_to_name', 'number_to_name']
      : ['name_to_meaning', 'meaning_to_name', 'number_to_name', 'name_to_number'];

    const qType = types[Math.floor(Math.random() * types.length)];
    queue.push({ model: m, type: qType, answered: false, grade: null });
  });

  // Shuffle
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  return queue.slice(0, maxSize);
}

function startDailyReview() {
  const due = getDueModels();
  if (due.length === 0) {
    showView('review');
    return;
  }
  reviewSession = {
    queue: buildReviewQueue(due),
    currentIdx: 0,
    revealed: false,
    type: 'daily'
  };
  showView('review');
}

function startWeakReview() {
  const weak = getWeakModels(15);
  if (weak.length === 0) {
    alert('Keep reviewing! Weak models will appear here once you have review history.');
    return;
  }
  reviewSession = {
    queue: buildReviewQueue(weak),
    currentIdx: 0,
    revealed: false,
    type: 'weak'
  };
  showView('review');
}

function reviewSingleModel(num) {
  const model = MODELS.find(m => m.number === num);
  reviewSession = {
    queue: [{ model, type: 'name_to_meaning', answered: false, grade: null }],
    currentIdx: 0,
    revealed: false,
    type: 'single'
  };
  showView('review');
}

function startCategoryReview(category) {
  const models = MODELS.filter(m => m.category === category);
  reviewSession = {
    queue: buildReviewQueue(models),
    currentIdx: 0,
    revealed: false,
    type: 'category'
  };
  showView('review');
}

function startChainReview(chainId) {
  const chain = RELATIONSHIP_CHAINS.find(c => c.id === chainId);
  if (!chain) return;
  const models = chain.models.map(n => MODELS.find(m => m.number === n)).filter(Boolean);
  reviewSession = {
    queue: buildReviewQueue(models),
    currentIdx: 0,
    revealed: false,
    type: 'chain',
    chainName: chain.name
  };
  showView('review');
}

function renderReviewStart() {
  const el = document.getElementById('view-review');

  if (!reviewSession) {
    const due = getDueModels();
    el.innerHTML = `
      <div class="review-start">
        <div class="review-start-title">Review</div>
        <div class="review-due-count">${due.length} models due</div>

        <div class="review-options">
          <button class="review-option-btn" onclick="startDailyReview()">
            <div class="ro-icon">⚡</div>
            <div class="ro-label">Daily Review</div>
            <div class="ro-sub">${due.length} due today</div>
          </button>
          <button class="review-option-btn" onclick="startWeakReview()">
            <div class="ro-icon">↑</div>
            <div class="ro-label">Weak Models</div>
            <div class="ro-sub">Focus on lowest mastery</div>
          </button>
          <button class="review-option-btn" onclick="startAllReview()">
            <div class="ro-icon">◉</div>
            <div class="ro-label">All Models</div>
            <div class="ro-sub">Random selection</div>
          </button>
        </div>

        <div class="cat-review-section">
          <div class="section-label">Review by Category</div>
          <div class="cat-buttons">
            ${CATEGORIES.map(c => `
              <button class="cat-btn" onclick="startCategoryReview('${c}')">${c}</button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    return;
  }

  renderReviewCard();
}

function startAllReview() {
  const shuffled = [...MODELS].sort(() => Math.random() - 0.5).slice(0, 20);
  reviewSession = {
    queue: buildReviewQueue(shuffled),
    currentIdx: 0,
    revealed: false,
    type: 'all'
  };
  renderReviewCard();
}

function renderReviewCard() {
  const el = document.getElementById('view-review');
  const session = reviewSession;

  if (!session || session.currentIdx >= session.queue.length) {
    renderReviewComplete();
    return;
  }

  const item = session.queue[session.currentIdx];
  const m = item.model;
  const progress = `${session.currentIdx + 1} / ${session.queue.length}`;
  const pct = Math.round(((session.currentIdx) / session.queue.length) * 100);

  let question = '', hint = '', answer = '';

  switch (item.type) {
    case 'name_to_meaning':
      question = `<div class="q-label">What does this model mean?</div><div class="q-main">${m.name}</div>`;
      hint = `Model #${m.number} · ${m.category}`;
      answer = `
        <div class="ans-meaning">${m.meaning}</div>
        <div class="ans-example"><strong>Example:</strong> ${m.example}</div>
        <div class="ans-trigger"><strong>Use when:</strong> ${m.trigger}</div>
      `;
      break;
    case 'meaning_to_name':
      question = `<div class="q-label">Name the model:</div><div class="q-main q-meaning">${m.meaning}</div>`;
      hint = `${m.category} · #${m.number}s`;
      answer = `<div class="ans-name">${m.name}</div><div class="ans-num">Model #${m.number}</div><div class="ans-example"><strong>Example:</strong> ${m.example}</div>`;
      break;
    case 'number_to_name':
      question = `<div class="q-label">Name this model number:</div><div class="q-main q-number">#${m.number}</div>`;
      hint = `Category: ${m.category}`;
      answer = `<div class="ans-name">${m.name}</div><div class="ans-meaning">${m.meaning}</div>`;
      break;
    case 'name_to_number':
      question = `<div class="q-label">What is the model number?</div><div class="q-main">${m.name}</div>`;
      hint = `${m.category}`;
      answer = `<div class="ans-num">#${m.number}</div><div class="ans-meaning">${m.meaning}</div>`;
      break;
  }

  el.innerHTML = `
    <div class="review-session">
      <div class="review-progress-bar">
        <div class="review-progress-fill" style="width:${pct}%"></div>
      </div>
      <div class="review-progress-text">${progress}</div>

      <div class="review-card">
        <div class="review-question">${question}</div>
        ${!session.revealed ? `<div class="review-hint">${hint}</div>` : ''}
        ${session.revealed ? `<div class="review-answer">${answer}</div>` : ''}
      </div>

      ${!session.revealed ? `
        <button class="reveal-btn" onclick="revealAnswer()" id="reveal-btn">
          Reveal Answer <span class="kbd">Space</span>
        </button>
      ` : `
        <div class="grade-section">
          <div class="grade-label">How did you do?</div>
          <div class="grade-buttons">
            <button class="grade-btn missed" onclick="gradeAnswer('missed')"><span class="kbd">1</span> Missed</button>
            <button class="grade-btn hard" onclick="gradeAnswer('hard')"><span class="kbd">2</span> Hard</button>
            <button class="grade-btn got_it" onclick="gradeAnswer('got_it')"><span class="kbd">3</span> Got It</button>
            <button class="grade-btn easy" onclick="gradeAnswer('easy')"><span class="kbd">4</span> Easy</button>
          </div>
        </div>
      `}

      <button class="exit-review-btn" onclick="exitReview()">Exit Review</button>
    </div>
  `;
}

function revealAnswer() {
  if (reviewSession) {
    reviewSession.revealed = true;
    renderReviewCard();
  }
}

function gradeAnswer(grade) {
  if (!reviewSession) return;
  const item = reviewSession.queue[reviewSession.currentIdx];
  item.grade = grade;
  item.answered = true;
  updateMastery(item.model.number, grade);
  reviewSession.currentIdx += 1;
  reviewSession.revealed = false;
  renderReviewCard();
}

function renderReviewComplete() {
  const el = document.getElementById('view-review');
  const session = reviewSession;
  const grades = session.queue.map(i => i.grade).filter(Boolean);
  const correct = grades.filter(g => g === 'got_it' || g === 'easy').length;
  const total = grades.length;

  el.innerHTML = `
    <div class="review-complete">
      <div class="complete-icon">✓</div>
      <div class="complete-title">Session Complete</div>
      <div class="complete-score">${correct} / ${total} correct</div>
      <div class="complete-breakdown">
        ${['missed','hard','got_it','easy'].map(g => {
          const count = grades.filter(x => x === g).length;
          const label = { missed: 'Missed', hard: 'Hard', got_it: 'Got It', easy: 'Easy' }[g];
          return `<div class="grade-result ${g}">${label}: ${count}</div>`;
        }).join('')}
      </div>
      <div class="complete-actions">
        <button class="action-btn primary" onclick="reviewSession = null; renderReviewStart()">New Session</button>
        <button class="action-btn" onclick="showView('dashboard')">Dashboard</button>
      </div>
    </div>
  `;
  reviewSession = null;
}

function exitReview() {
  reviewSession = null;
  renderReviewStart();
}

// ============================================================
// NUMBER DRILL
// ============================================================

let drillSession = null;

function renderNumberDrillStart() {
  const el = document.getElementById('view-numberdrill');

  if (!drillSession) {
    el.innerHTML = `
      <div class="drill-start">
        <div class="drill-title">Number Drill</div>
        <div class="drill-sub">Master the model numbers</div>

        <div class="drill-options">
          <button class="drill-opt-btn" onclick="startDrill('number_to_name')">
            <div class="do-icon">#</div>
            <div class="do-label">#63 → ?</div>
            <div class="do-sub">Number to name</div>
          </button>
          <button class="drill-opt-btn" onclick="startDrill('name_to_number')">
            <div class="do-icon">?</div>
            <div class="do-label">KASH → #?</div>
            <div class="do-sub">Name to number</div>
          </button>
          <button class="drill-opt-btn" onclick="startDrill('mixed')">
            <div class="do-icon">~</div>
            <div class="do-label">Mixed</div>
            <div class="do-sub">Both directions</div>
          </button>
          <button class="drill-opt-btn" onclick="startDrill('decades')">
            <div class="do-icon">10</div>
            <div class="do-label">Decades</div>
            <div class="do-sub">Anchor to 10, 20, 30…</div>
          </button>
        </div>

        <div class="drill-stats">
          <div>Number Accuracy: ${state.stats.numberAccuracy.total > 0
            ? Math.round((state.stats.numberAccuracy.correct / state.stats.numberAccuracy.total) * 100)
            : 0}%</div>
          <div>${state.stats.numberAccuracy.correct} correct of ${state.stats.numberAccuracy.total} attempts</div>
        </div>
      </div>
    `;
    return;
  }

  renderDrillCard();
}

function startDrill(type) {
  let models = [...MODELS].sort(() => Math.random() - 0.5).slice(0, 20);

  if (type === 'decades') {
    // Focus on decade-anchor models and nearby ones
    const decades = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
    models = MODELS.filter(m => decades.includes(m.number) || decades.some(d => Math.abs(m.number - d) <= 2));
    models = models.sort(() => Math.random() - 0.5).slice(0, 20);
  }

  drillSession = {
    type,
    models,
    currentIdx: 0,
    revealed: false,
    correct: 0,
    total: 0
  };
  renderDrillCard();
}

function renderDrillCard() {
  const el = document.getElementById('view-numberdrill');
  const s = drillSession;

  if (s.currentIdx >= s.models.length) {
    el.innerHTML = `
      <div class="review-complete">
        <div class="complete-icon">✓</div>
        <div class="complete-title">Drill Complete</div>
        <div class="complete-score">${s.correct} / ${s.total}</div>
        <div class="complete-actions">
          <button class="action-btn primary" onclick="drillSession = null; renderNumberDrillStart()">Drill Again</button>
          <button class="action-btn" onclick="showView('dashboard')">Dashboard</button>
        </div>
      </div>
    `;
    return;
  }

  const m = s.models[s.currentIdx];
  const pct = Math.round((s.currentIdx / s.models.length) * 100);
  const progress = `${s.currentIdx + 1} / ${s.models.length}`;

  // Determine question direction
  let qDir = s.type;
  if (s.type === 'mixed') qDir = Math.random() > 0.5 ? 'number_to_name' : 'name_to_number';
  if (s.type === 'decades') qDir = Math.random() > 0.5 ? 'number_to_name' : 'name_to_number';

  // Nearby hint
  const nearby = MODELS.filter(x => Math.abs(x.number - m.number) === 1);
  const nearbyHint = nearby.map(x => `#${x.number} ${x.name}`).join(' · ');

  const question = qDir === 'number_to_name'
    ? `<div class="q-label">Name this model:</div><div class="q-main q-number">#${m.number}</div>`
    : `<div class="q-label">What number?</div><div class="q-main">${m.name}</div>`;

  const answer = qDir === 'number_to_name'
    ? `<div class="ans-name">${m.name}</div><div class="ans-meaning">${m.meaning}</div>`
    : `<div class="ans-num">#${m.number}</div><div class="ans-meaning">${m.meaning}</div>`;

  el.innerHTML = `
    <div class="review-session">
      <div class="review-progress-bar"><div class="review-progress-fill" style="width:${pct}%"></div></div>
      <div class="review-progress-text">${progress} · ${s.correct} correct</div>

      <div class="review-card">
        <div class="review-question">${question}</div>
        ${!s.revealed ? `<div class="review-hint">Near: ${nearbyHint || 'no adjacent'}</div>` : ''}
        ${s.revealed ? `<div class="review-answer">${answer}</div>` : ''}
      </div>

      ${!s.revealed ? `
        <button class="reveal-btn" onclick="revealDrill()">Reveal <span class="kbd">Space</span></button>
      ` : `
        <div class="grade-section">
          <div class="grade-label">Did you get it?</div>
          <div class="grade-buttons">
            <button class="grade-btn missed" onclick="gradeDrill(false)"><span class="kbd">1</span> No</button>
            <button class="grade-btn got_it" onclick="gradeDrill(true)"><span class="kbd">3</span> Yes</button>
          </div>
        </div>
      `}

      <button class="exit-review-btn" onclick="drillSession = null; renderNumberDrillStart()">Exit Drill</button>
    </div>
  `;
}

function revealDrill() {
  if (drillSession) {
    drillSession.revealed = true;
    renderDrillCard();
  }
}

function gradeDrill(correct) {
  if (!drillSession) return;
  drillSession.total += 1;
  state.stats.numberAccuracy.total += 1;
  if (correct) {
    drillSession.correct += 1;
    state.stats.numberAccuracy.correct += 1;
  }
  drillSession.currentIdx += 1;
  drillSession.revealed = false;
  updateMastery(drillSession.models[drillSession.currentIdx - 1]?.number, correct ? 'got_it' : 'missed');
  saveState();
  renderDrillCard();
}

// ============================================================
// SCENARIO TRAINER
// ============================================================

function renderScenariosStart() {
  const el = document.getElementById('view-scenarios');

  if (!scenarioSession) {
    const contexts = [...new Set(SCENARIOS.map(s => s.context))];
    el.innerHTML = `
      <div class="scenario-start">
        <div class="scenario-title">Scenario Trainer</div>
        <div class="scenario-sub">Match real situations to management models</div>

        <div class="scenario-options">
          <button class="drill-opt-btn" onclick="startScenarios('all')">
            <div class="do-icon">⚙</div>
            <div class="do-label">All Scenarios</div>
            <div class="do-sub">${SCENARIOS.length} total</div>
          </button>
          ${contexts.map(c => `
            <button class="drill-opt-btn" onclick="startScenarios('${c}')">
              <div class="do-icon">→</div>
              <div class="do-label">${c.charAt(0).toUpperCase() + c.slice(1)}</div>
              <div class="do-sub">${SCENARIOS.filter(s => s.context === c).length} scenarios</div>
            </button>
          `).join('')}
        </div>

        <div class="drill-stats">
          <div>Scenario Accuracy: ${state.stats.scenarioAccuracy.total > 0
            ? Math.round((state.stats.scenarioAccuracy.correct / state.stats.scenarioAccuracy.total) * 100)
            : 0}%</div>
          <div>${state.stats.scenarioAccuracy.total} scenarios attempted</div>
        </div>
      </div>
    `;
    return;
  }

  renderScenarioCard();
}

function startScenarios(context) {
  let scenarios = context === 'all' ? [...SCENARIOS] : SCENARIOS.filter(s => s.context === context);
  scenarios = scenarios.sort(() => Math.random() - 0.5).slice(0, 15);

  scenarioSession = {
    scenarios,
    currentIdx: 0,
    revealed: false,
    correct: 0,
    total: 0
  };
  renderScenarioCard();
}

function renderScenarioCard() {
  const el = document.getElementById('view-scenarios');
  const s = scenarioSession;

  if (s.currentIdx >= s.scenarios.length) {
    el.innerHTML = `
      <div class="review-complete">
        <div class="complete-icon">✓</div>
        <div class="complete-title">Scenarios Complete</div>
        <div class="complete-score">${s.correct} / ${s.total}</div>
        <div class="complete-actions">
          <button class="action-btn primary" onclick="scenarioSession = null; renderScenariosStart()">More Scenarios</button>
          <button class="action-btn" onclick="showView('dashboard')">Dashboard</button>
        </div>
      </div>
    `;
    return;
  }

  const sc = s.scenarios[s.currentIdx];
  const pct = Math.round((s.currentIdx / s.scenarios.length) * 100);
  const progress = `${s.currentIdx + 1} / ${s.scenarios.length}`;

  const bestModelsList = sc.bestModels.map(n => {
    const m = MODELS.find(x => x.number === n);
    return m ? `
      <div class="scenario-model-result">
        <div class="smr-header">
          <span class="smr-num">#${n}</span>
          <span class="smr-name">${m.name}</span>
        </div>
        <div class="smr-explanation">${sc.explanations[n]}</div>
      </div>
    ` : '';
  }).join('');

  el.innerHTML = `
    <div class="review-session">
      <div class="review-progress-bar"><div class="review-progress-fill" style="width:${pct}%"></div></div>
      <div class="review-progress-text">${progress} · Context: ${sc.context}</div>

      <div class="scenario-card">
        <div class="scenario-card-title">${sc.title}</div>
        <div class="scenario-card-body">${sc.scenario}</div>
        <div class="scenario-question">Which model or models apply?</div>
      </div>

      ${!s.revealed ? `
        <div class="scenario-think-space">
          <div class="think-label">Think through it… then reveal.</div>
        </div>
        <button class="reveal-btn" onclick="revealScenario()">Reveal Answer <span class="kbd">Space</span></button>
      ` : `
        <div class="scenario-answer">
          <div class="scenario-answer-title">Best Model Matches:</div>
          ${bestModelsList}
        </div>
        <div class="grade-section">
          <div class="grade-label">How well did you identify the models?</div>
          <div class="grade-buttons">
            <button class="grade-btn missed" onclick="gradeScenario('missed')"><span class="kbd">1</span> Missed</button>
            <button class="grade-btn hard" onclick="gradeScenario('hard')"><span class="kbd">2</span> Partial</button>
            <button class="grade-btn got_it" onclick="gradeScenario('got_it')"><span class="kbd">3</span> Got Some</button>
            <button class="grade-btn easy" onclick="gradeScenario('easy')"><span class="kbd">4</span> Nailed It</button>
          </div>
        </div>
      `}

      <button class="exit-review-btn" onclick="scenarioSession = null; renderScenariosStart()">Exit Scenarios</button>
    </div>
  `;
}

function revealScenario() {
  if (scenarioSession) {
    scenarioSession.revealed = true;
    renderScenarioCard();
  }
}

function gradeScenario(grade) {
  if (!scenarioSession) return;
  const sc = scenarioSession.scenarios[scenarioSession.currentIdx];
  const correct = grade === 'got_it' || grade === 'easy';
  scenarioSession.total += 1;
  state.stats.scenarioAccuracy.total += 1;
  if (correct) {
    scenarioSession.correct += 1;
    state.stats.scenarioAccuracy.correct += 1;
  }
  // Update mastery for all models in the scenario
  sc.bestModels.forEach(n => {
    updateMastery(n, grade);
  });
  scenarioSession.currentIdx += 1;
  scenarioSession.revealed = false;
  saveState();
  renderScenarioCard();
}

// ============================================================
// RELATIONSHIP CHAINS
// ============================================================

function renderChains() {
  const el = document.getElementById('view-chains');
  el.innerHTML = `
    <div class="chains-header">
      <div class="chains-title">Relationship Maps</div>
      <div class="chains-sub">Connected model chains</div>
    </div>
    <div class="chains-list">
      ${RELATIONSHIP_CHAINS.map(chain => renderChain(chain)).join('')}
    </div>
  `;
}

function renderChain(chain) {
  const models = chain.models.map(n => MODELS.find(m => m.number === n)).filter(Boolean);
  return `
    <div class="chain-card">
      <div class="chain-header">
        <div class="chain-name">${chain.name}</div>
        <div class="chain-desc">${chain.description}</div>
      </div>
      <div class="chain-flow">
        ${models.map((m, i) => `
          <div class="chain-model" onclick="scrollToModel(${m.number})">
            <div class="cm-num">${m.number}</div>
            <div class="cm-name">${m.name}</div>
          </div>
          ${i < models.length - 1 ? '<div class="chain-arrow">→</div>' : ''}
        `).join('')}
      </div>
      <div class="chain-summary">${chain.summary}</div>
      <button class="chain-review-btn" onclick="startChainReview('${chain.id}')">Review This Chain</button>
    </div>
  `;
}

// ============================================================
// IMPORT / EXPORT
// ============================================================

function exportProgress() {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `model-mastery-progress-${getTodayStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importProgress() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        state = { ...state, ...imported };
        saveState();
        renderView(currentView);
        alert('Progress imported successfully!');
      } catch (err) {
        alert('Could not import: invalid file.');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

async function resetProgress() {
  if (!confirm('Reset ALL progress? This cannot be undone.')) return;
  state = {
    mastery: {},
    stats: { streak: 0, lastStudyDate: null, totalReviews: 0, scenarioAccuracy: { correct: 0, total: 0 }, numberAccuracy: { correct: 0, total: 0 }, studySessions: 0 },
    settings: { dailyGoal: 20 }
  };
  MODELS.forEach(m => { state.mastery[m.number] = initializeMastery(); });
  saveState();
  if (currentUser) await syncToSupabase();
  renderView(currentView);
  alert('Progress reset.');
}

function exportCSV() {
  const rows = [
    ['Number', 'Name', 'Category', 'Meaning', 'Example', 'Trigger', 'Level', 'Correct', 'Incorrect', 'Last Reviewed']
  ];
  MODELS.forEach(m => {
    const ms = state.mastery[m.number];
    rows.push([m.number, m.name, m.category, m.meaning, m.example, m.trigger, ms.level, ms.correct, ms.incorrect, ms.lastReviewed || '']);
  });
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `model-mastery-models.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (e.key === ' ' || e.code === 'Space') {
    e.preventDefault();
    if (reviewSession && !reviewSession.revealed) revealAnswer();
    else if (drillSession && !drillSession.revealed) revealDrill();
    else if (scenarioSession && !scenarioSession.revealed) revealScenario();
  }

  if (reviewSession && reviewSession.revealed) {
    if (e.key === '1') gradeAnswer('missed');
    if (e.key === '2') gradeAnswer('hard');
    if (e.key === '3') gradeAnswer('got_it');
    if (e.key === '4') gradeAnswer('easy');
  }

  if (drillSession && drillSession.revealed) {
    if (e.key === '1') gradeDrill(false);
    if (e.key === '3') gradeDrill(true);
  }

  if (scenarioSession && scenarioSession.revealed) {
    if (e.key === '1') gradeScenario('missed');
    if (e.key === '2') gradeScenario('hard');
    if (e.key === '3') gradeScenario('got_it');
    if (e.key === '4') gradeScenario('easy');
  }

  if (e.key === '/') {
    e.preventDefault();
    showView('library');
    setTimeout(() => { const s = document.getElementById('lib-search'); if (s) s.focus(); }, 100);
  }
});

// ============================================================
// AUTH
// ============================================================

function showLoginOverlay() {
  const el = document.getElementById('login-overlay');
  if (el) el.style.display = 'flex';
}

function hideLoginOverlay() {
  const el = document.getElementById('login-overlay');
  if (el) el.style.display = 'none';
}

async function signInWithGitHub() {
  const btn = document.getElementById('login-btn');
  btn.disabled = true;
  btn.textContent = 'Redirecting…';
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: 'https://royharmon4.github.io/models' }
  });
  if (error) {
    btn.textContent = 'Sign in with GitHub';
    btn.disabled = false;
    alert('Error: ' + error.message);
  }
}

async function handleLogout() {
  await supabase.auth.signOut();
  currentUser = null;
  const logoutBtn = document.getElementById('logout-btn');
  const syncEl = document.getElementById('sync-status');
  if (logoutBtn) logoutBtn.style.display = 'none';
  if (syncEl) syncEl.style.display = 'none';
  showLoginOverlay();
}

supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && !currentUser) {
    currentUser = session.user;
    hideLoginOverlay();
    const logoutBtn = document.getElementById('logout-btn');
    const syncEl = document.getElementById('sync-status');
    if (logoutBtn) logoutBtn.style.display = '';
    if (syncEl) syncEl.style.display = '';
    await loadFromSupabase();
    renderView(currentView);
  }
});

// ============================================================
// INIT
// ============================================================

async function init() {
  loadState();
  showView('dashboard');

  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    currentUser = session.user;
    const logoutBtn = document.getElementById('logout-btn');
    const syncEl = document.getElementById('sync-status');
    if (logoutBtn) logoutBtn.style.display = '';
    if (syncEl) syncEl.style.display = '';
    await loadFromSupabase();
    renderView(currentView);
  } else {
    showLoginOverlay();
  }
}

// Expose globals for inline handlers
window.showView = showView;
window.startDailyReview = startDailyReview;
window.startWeakReview = startWeakReview;
window.startAllReview = startAllReview;
window.startCategoryReview = startCategoryReview;
window.startChainReview = startChainReview;
window.revealAnswer = revealAnswer;
window.gradeAnswer = gradeAnswer;
window.exitReview = exitReview;
window.reviewSingleModel = reviewSingleModel;
window.toggleCard = toggleCard;
window.scrollToModel = scrollToModel;
window.onLibSearch = onLibSearch;
window.onLibCategory = onLibCategory;
window.onLibSort = onLibSort;
window.startDrill = startDrill;
window.revealDrill = revealDrill;
window.gradeDrill = gradeDrill;
window.startScenarios = startScenarios;
window.revealScenario = revealScenario;
window.gradeScenario = gradeScenario;
window.startChainReview = startChainReview;
window.renderReviewStart = renderReviewStart;
window.renderNumberDrillStart = renderNumberDrillStart;
window.renderScenariosStart = renderScenariosStart;
window.exportProgress = exportProgress;
window.importProgress = importProgress;
window.resetProgress = resetProgress;
window.exportCSV = exportCSV;
window.signInWithGitHub = signInWithGitHub;
window.handleLogout = handleLogout;

window.addEventListener('DOMContentLoaded', init);
