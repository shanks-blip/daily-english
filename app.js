// ============================================================
// Daily English — 앱 로직 (서버 불필요, localStorage 저장)
// ============================================================

// ---------- 유틸 ----------
const LS_KEY = "daily-english-v1";

function todayStr(d) {
  d = d || new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + day;
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return todayStr(d);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---------- 데이터 인덱스 ----------
const unitById = {};
UNITS.forEach(function (u) { unitById[u.id] = u; });
const wordById = {};
WORDS.forEach(function (w) { wordById[w.id] = w; });

function wordsOfLevel(levelId) {
  return WORDS.filter(function (w) { return unitById[w.unit].level === levelId; });
}

// ---------- 저장소 (localStorage) ----------
function defaultStore() {
  return { progress: {}, sessions: [], dialogs: {}, settings: { dailyGoal: 6, level: "lv2" } };
}

function loadStore() {
  try {
    const s = localStorage.getItem(LS_KEY);
    if (s) {
      const p = JSON.parse(s);
      const d = defaultStore();
      return {
        progress: p.progress || d.progress,
        sessions: p.sessions || d.sessions,
        dialogs: p.dialogs || d.dialogs,
        settings: Object.assign(d.settings, p.settings || {}),
      };
    }
  } catch (e) { /* 파손 데이터 무시 */ }
  return defaultStore();
}

function saveStore(st) {
  localStorage.setItem(LS_KEY, JSON.stringify(st));
}

// ---------- SRS (SM-2 간소화) ----------
function initProgress(wordId) {
  return { id: wordId, ef: 2.5, iv: 0, reps: 0, next: todayStr(), ok: 0, no: 0, at: todayStr() };
}

function updateSrs(p, correct) {
  const q = Object.assign({}, p);
  if (correct) {
    q.reps += 1; q.ok += 1;
    if (q.reps === 1) q.iv = 1;
    else if (q.reps === 2) q.iv = 3;
    else q.iv = Math.round(q.iv * q.ef);
    q.ef = Math.min(2.8, q.ef + 0.05);
  } else {
    q.reps = 0; q.no += 1; q.iv = 1;
    q.ef = Math.max(1.3, q.ef - 0.2);
  }
  q.next = addDays(todayStr(), q.iv);
  return q;
}

function isDue(p) { return p.next <= todayStr(); }
function isWeak(p) { return p.no > 0 && p.no >= p.ok; }

function calcStreak(sessions) {
  const days = {};
  sessions.forEach(function (s) { days[s.date] = true; });
  let d = todayStr();
  if (!days[d]) d = addDays(d, -1);
  let n = 0;
  while (days[d]) { n += 1; d = addDays(d, -1); }
  return n;
}

function last7(sessions) {
  const out = [];
  for (let i = 6; i >= 0; i--) {
    const date = addDays(todayStr(), -i);
    let count = 0;
    sessions.forEach(function (s) { if (s.date === date) count += s.count; });
    out.push({ date: date, count: count });
  }
  return out;
}

// ---------- TTS ----------
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.9;
  const st = loadStore();
  if (st.settings && st.settings.voiceURI) {
    const v = window.speechSynthesis.getVoices().filter(function (x) { return x.voiceURI === st.settings.voiceURI; })[0];
    if (v) { u.voice = v; u.lang = v.lang; }
  }
  window.speechSynthesis.speak(u);
}

function voiceLabel(v) {
  const acc = { "en-US": "미국", "en-GB": "영국", "en-AU": "호주", "en-IN": "인도", "en-CA": "캐나다", "en-IE": "아일랜드", "en-ZA": "남아공", "en-NZ": "뉴질랜드" };
  const label = acc[v.lang] || v.lang;
  const n = (v.name || "").toLowerCase();
  let g = "";
  if (n.indexOf("female") >= 0) g = " · 여성";
  else if (n.indexOf("male") >= 0) g = " · 남성";
  return label + " · " + v.name + g;
}

function bindSpeakButtons(root) {
  root.querySelectorAll("[data-say]").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      speak(b.getAttribute("data-say"));
    });
  });
}

// ---------- 퀴즈 생성 ----------
// 문제 유형: choice(4지선다) / blank(예문 빈칸) / spell(철자 입력, 복습 전용)
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function blankify(w) {
  const re = new RegExp("\\b" + escapeRe(w.en) + "\\b", "i");
  return re.test(w.exEn) ? w.exEn.replace(re, "_____") : null;
}

function choiceQ(w, pool) {
  const en2ko = Math.random() < 0.5;
  const diff = function (p) { return p.id !== w.id && (en2ko ? p.ko !== w.ko : p.en !== w.en); };
  let cand = pool.filter(function (p) { return diff(p) && p.pos === w.pos; });
  if (cand.length < 3) cand = pool.filter(diff);
  const others = shuffle(cand).slice(0, 3);
  const correct = en2ko ? w.ko : w.en;
  const choices = shuffle([correct].concat(others.map(function (o) { return en2ko ? o.ko : o.en; })));
  return {
    type: "choice", wordId: w.id,
    prompt: en2ko ? w.en : w.ko,
    sub: en2ko ? "알맞은 뜻을 고르세요" : "알맞은 영어 단어를 고르세요",
    hint: null, choices: choices, answer: choices.indexOf(correct),
    say: en2ko ? w.en : null,
  };
}

function blankQ(w, blanked, pool) {
  const diff = function (p) { return p.id !== w.id && p.en !== w.en; };
  let cand = pool.filter(function (p) { return diff(p) && p.pos === w.pos; });
  if (cand.length < 3) cand = pool.filter(diff);
  const others = shuffle(cand).slice(0, 3);
  const choices = shuffle([w.en].concat(others.map(function (o) { return o.en; })));
  return {
    type: "blank", wordId: w.id, prompt: blanked,
    sub: "빈칸에 들어갈 단어를 고르세요", hint: w.exKo,
    choices: choices, answer: choices.indexOf(w.en), say: null,
  };
}

function spellQ(w, blanked) {
  return {
    type: "spell", wordId: w.id, prompt: w.ko,
    sub: "영어로 입력하세요 (철자 연습)", hint: blanked,
    accept: w.en, say: null,
  };
}

function makeQuestions(targets, pool, allowSpell) {
  return shuffle(targets).map(function (w) {
    const blanked = blankify(w);
    const r = Math.random();
    if (allowSpell && blanked && r < 0.25) return spellQ(w, blanked);
    if (blanked && r < 0.5) return blankQ(w, blanked, pool);
    return choiceQ(w, pool);
  });
}

// ---------- 전역 상태 ----------
let tab = "home";
let learnS = null;   // 학습 세션
let reviewS = null;  // 복습 세션
let talkS = null;    // 회화 세션
let wordsFilter = "all";
const view = document.getElementById("view");

function setTab(t) {
  tab = t;
  if (t === "learn") learnS = newLearnSession();
  if (t === "review") reviewS = newReviewSession();
  if (t === "talk") talkS = { mode: "list" };
  if (t === "listen" && typeof newListenSession === "function") listenS = newListenSession();
  if (t === "arrange" && typeof newArrangeSession === "function") arrangeS = newArrangeSession();
  document.querySelectorAll("#nav button").forEach(function (b) {
    b.classList.toggle("on", b.getAttribute("data-tab") === t);
  });
  view.classList.remove("fade-in");
  void view.offsetWidth; // 리플로우로 애니메이션 재시작
  view.classList.add("fade-in");
  render();
}

function render() {
  if (tab === "home") renderHome();
  else if (tab === "learn") renderLearn();
  else if (tab === "review") renderReview();
  else if (tab === "talk") renderTalk();
  else if (tab === "listen") renderListen();
  else if (tab === "arrange") renderArrange();
  else if (tab === "words") renderWords();
  else renderSettings();
  window.scrollTo(0, 0);
}

// ---------- 홈 ----------
function dailySentenceHtml() {
  if (typeof SENTENCES === "undefined" || !SENTENCES.length) return "";
  const idx = Math.floor(Date.now() / 86400000) % SENTENCES.length;
  const s = SENTENCES[idx];
  return '<div class="card sentence">' +
    '<p class="section-title">' + I_SPARK + ' 오늘의 문장 <span class="badge gray">' + esc(s.tag) + '</span></p>' +
    '<div class="row"><p class="s-en" style="flex:1">' + esc(s.en) + '</p>' +
    '<button class="speak-btn" data-say="' + esc(s.en) + '">' + SPK + '</button></div>' +
    '<p class="s-ko">' + esc(s.ko) + '</p></div>';
}

function renderHome() {
  const st = loadStore();
  const level = LEVELS.find(function (l) { return l.id === st.settings.level; });
  const levelWords = wordsOfLevel(st.settings.level);
  const learnedInLevel = levelWords.filter(function (w) { return st.progress[w.id]; }).length;
  const allProgress = Object.keys(st.progress).map(function (k) { return st.progress[k]; });
  const due = allProgress.filter(isDue).length;
  const remaining = levelWords.length - learnedInLevel;
  const streak = calcStreak(st.sessions);
  const doneToday = st.sessions.some(function (s) { return s.date === todayStr(); });
  const week = last7(st.sessions);
  const maxC = Math.max(1, Math.max.apply(null, week.map(function (d) { return d.count; })));

  view.innerHTML =
    '<header style="margin-bottom:18px">' +
      '<h1>Daily English</h1>' +
      '<p class="sub">매일 조금씩, 영어 습관 만들기</p>' +
    '</header>' +
    '<div class="card grad">' +
      '<div><p style="font-size:13px;opacity:.9">연속 학습</p><p class="big">' + streak + '일 🔥</p></div>' +
      '<div style="font-size:13px;opacity:.9">' + (doneToday ? "오늘 학습 완료! ✅" : "오늘 아직 안 했어요") + '</div>' +
    '</div>' +
    '<button class="chip on" id="level-chip" style="margin-bottom:14px">' + esc(level.title) + ' ▾</button>' +
    '<div class="grid2">' +
      '<button class="tile blue" data-go="learn">' +
        '<p>새 단어 학습</p><p class="num">' + Math.min(st.settings.dailyGoal, remaining) + '개</p>' +
        '<p>이 레벨 남은 단어 ' + remaining + '개</p>' +
      '</button>' +
      '<button class="tile ' + (due > 0 ? "green" : "off") + '" data-go="review">' +
        '<p>오늘의 복습</p><p class="num">' + due + '개</p>' +
        '<p>' + (due > 0 ? "복습할 시간이에요" : "복습할 단어 없음") + '</p>' +
      '</button>' +
    '</div>' +
    '<div class="card">' +
      '<p class="section-title">' + esc(level.title) + ' 진행률</p>' +
      '<div class="bar-bg"><div class="bar-fill" style="width:' + (levelWords.length ? (learnedInLevel / levelWords.length) * 100 : 0) + '%"></div></div>' +
      '<p class="muted">' + levelWords.length + '개 중 <b style="color:#1e293b">' + learnedInLevel + '개</b> 학습 · 전체 누적 ' + allProgress.length + '개</p>' +
    '</div>' +
    dailySentenceHtml() +
    '<button class="dlg-card" id="talk-shortcut"><span class="ic">' + I_MSG + '</span>' +
      '<span class="tt">상황별 회화</span>' +
      '<span class="todo">' + Object.keys(st.dialogs).length + ' / ' + DIALOGS.length + ' 완료</span>' +
    '</button>' +
    '<div class="card">' +
      '<p class="section-title">최근 7일</p>' +
      '<div class="week">' +
        week.map(function (d) {
          const h = d.count > 0 ? Math.max(10, (d.count / maxC) * 70) : 6;
          return '<div class="col"><div class="bar' + (d.count === 0 ? " zero" : "") + '" style="height:' + h + 'px"></div><span class="lbl">' + d.date.slice(8) + '</span></div>';
        }).join("") +
      '</div>' +
    '</div>';

  view.querySelectorAll("[data-go]").forEach(function (b) {
    b.addEventListener("click", function () { setTab(b.getAttribute("data-go")); });
  });
  document.getElementById("level-chip").addEventListener("click", function () { setTab("settings"); });
  document.getElementById("talk-shortcut").addEventListener("click", function () { setTab("talk"); });
  bindSpeakButtons(view);
}

// ---------- 학습 ----------
function newLearnSession() {
  const st = loadStore();
  const list = shuffle(wordsOfLevel(st.settings.level)
    .filter(function (w) { return !st.progress[w.id]; }))
    .slice(0, st.settings.dailyGoal);
  if (list.length === 0) return { phase: "empty" };
  return { phase: "cards", list: list, ci: 0, quiz: null, score: null };
}

function wordCardHtml(w) {
  const unit = unitById[w.unit];
  return '<div class="card wcard">' +
    '<div style="margin-bottom:10px"><span class="badge blue">' + esc(unit.title) + '</span> <span class="badge gray">' + esc(w.pos) + '</span></div>' +
    '<div class="row"><span class="word-en">' + esc(w.en) + '</span><button class="speak-btn" data-say="' + esc(w.en) + '">' + SPK + '</button></div>' +
    '<p class="word-ko">' + esc(w.ko) + '</p>' +
    '<div class="example"><div class="row"><p class="en" style="flex:1">' + esc(w.exEn) + '</p><button class="speak-btn sm" data-say="' + esc(w.exEn) + '">' + SPK + '</button></div>' +
    '<p class="ko">' + esc(w.exKo) + '</p></div>' +
    (typeof TIPS !== "undefined" && TIPS[w.id] ? '<div class="tip">💡 ' + esc(TIPS[w.id]) + '</div>' : '') +
  '</div>';
}

function quizHtml(S) {
  const q = S.quiz.qs[S.quiz.i];
  const total = S.quiz.qs.length;
  const answered = S.quiz.sel !== null;
  let html =
    '<div class="progress-top"><div style="width:' + (((S.quiz.i + 1) / total) * 100) + '%"></div></div>' +
    '<p class="muted">' + esc(q.sub) + ' (' + (S.quiz.i + 1) + '/' + total + ')</p>';

  if (q.type === "blank") {
    html += '<p style="font-size:19px;font-weight:700;margin:8px 0 4px">' + esc(q.prompt) + '</p>' +
      '<p class="muted" style="margin-bottom:16px">' + esc(q.hint) + '</p>';
  } else {
    html += '<div class="row" style="margin:6px 0 18px"><span class="word-en">' + esc(q.prompt) + '</span>' +
      (q.say ? '<button class="speak-btn" data-say="' + esc(q.say) + '">' + SPK + '</button>' : '') + '</div>';
  }

  if (q.type === "spell") {
    if (q.hint) html += '<p class="muted" style="margin-bottom:10px">힌트: ' + esc(q.hint) + '</p>';
    const fb = S.quiz.sel; // null 또는 {given, correct}
    html += '<input id="spell-input" class="spell-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="영어로 입력"' +
      (fb ? ' disabled value="' + esc(fb.given) + '"' : '') + '>';
    if (!fb) {
      html += '<button class="btn btn-primary" id="spell-submit" style="margin-top:12px">확인</button>';
    } else {
      html += '<div class="spell-fb ' + (fb.correct ? "good" : "bad") + '">' +
        (fb.correct ? "⭕ 정답!" : "❌ 정답: " + esc(q.accept)) + '</div>' +
        '<button class="btn btn-primary" id="quiz-next" style="margin-top:14px">' +
        (S.quiz.i + 1 >= total ? "결과 보기" : "다음") + '</button>';
    }
  } else {
    q.choices.forEach(function (c, i) {
      let cls = "choice";
      if (answered) {
        if (i === q.answer) cls += " correct";
        else if (i === S.quiz.sel) cls += " wrong";
        else cls += " dim";
      }
      html += '<button class="' + cls + '" data-choice="' + i + '">' + esc(c) + '</button>';
    });
    if (answered) {
      html += '<button class="btn btn-primary" id="quiz-next" style="margin-top:14px">' +
        (S.quiz.i + 1 >= total ? "결과 보기" : "다음") + '</button>';
    }
  }
  return html;
}

function bindQuiz(S, onDone) {
  const q = S.quiz.qs[S.quiz.i];
  view.querySelectorAll("[data-choice]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (S.quiz.sel !== null) return;
      const i = parseInt(b.getAttribute("data-choice"), 10);
      S.quiz.sel = i;
      S.quiz.results.push({ wordId: q.wordId, correct: i === q.answer });
      render();
    });
  });
  const submit = document.getElementById("spell-submit");
  if (submit) {
    const input = document.getElementById("spell-input");
    const doSubmit = function () {
      if (S.quiz.sel !== null) return;
      const given = (input.value || "").trim();
      const correct = given.toLowerCase() === q.accept.toLowerCase();
      S.quiz.sel = { given: given, correct: correct };
      S.quiz.results.push({ wordId: q.wordId, correct: correct });
      render();
    };
    submit.addEventListener("click", doSubmit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") doSubmit(); });
    input.focus();
  }
  const nextBtn = document.getElementById("quiz-next");
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      if (S.quiz.i + 1 >= S.quiz.qs.length) onDone(S.quiz.results);
      else { S.quiz.i += 1; S.quiz.sel = null; render(); }
    });
  }
  bindSpeakButtons(view);
}

function centerHtml(emoji, title, desc, btnLabel, btnGo) {
  return '<div class="center"><p class="emoji">' + emoji + '</p><h2>' + esc(title) + '</h2>' +
    '<p class="desc">' + esc(desc) + '</p>' +
    '<button class="btn btn-primary" data-go="' + btnGo + '">' + esc(btnLabel) + '</button></div>';
}

function bindCenterBtn() {
  view.querySelectorAll("[data-go]").forEach(function (b) {
    b.addEventListener("click", function () { setTab(b.getAttribute("data-go")); });
  });
}

function renderLearn() {
  const S = learnS;
  if (S.phase === "empty") {
    view.innerHTML = centerHtml("🎉", "이 레벨의 모든 단어를 학습했어요!", "설정에서 다음 레벨로 올리거나, 복습으로 기억을 다지세요.", "복습하러 가기", "review");
    bindCenterBtn();
    return;
  }
  if (S.phase === "cards") {
    const w = S.list[S.ci];
    const isLast = S.ci === S.list.length - 1;
    view.innerHTML =
      '<p class="muted" style="margin-bottom:12px">📖 새 단어 ' + (S.ci + 1) + ' / ' + S.list.length + '</p>' +
      wordCardHtml(w) +
      '<div class="btn-row">' +
      (S.ci > 0 ? '<button class="btn btn-ghost" id="prev-card">이전</button>' : '') +
      '<button class="btn btn-primary wide" id="next-card">' + (isLast ? "퀴즈 풀기 ✍️" : "다음") + '</button></div>';
    bindSpeakButtons(view);
    const prev = document.getElementById("prev-card");
    if (prev) prev.addEventListener("click", function () { S.ci -= 1; render(); });
    document.getElementById("next-card").addEventListener("click", function () {
      if (isLast) {
        S.phase = "quiz";
        S.quiz = { qs: makeQuestions(S.list, WORDS, false), i: 0, sel: null, results: [] };
      } else S.ci += 1;
      render();
    });
    return;
  }
  if (S.phase === "quiz") {
    view.innerHTML = quizHtml(S);
    bindQuiz(S, function (results) {
      const st = loadStore();
      results.forEach(function (r) {
        const p = st.progress[r.wordId] || initProgress(r.wordId);
        st.progress[r.wordId] = updateSrs(p, r.correct);
      });
      const ok = results.filter(function (r) { return r.correct; }).length;
      st.sessions.push({ date: todayStr(), type: "learn", count: results.length, correct: ok });
      saveStore(st);
      S.phase = "done";
      S.score = { ok: ok, total: results.length };
      render();
    });
    return;
  }
  // done
  view.innerHTML = centerHtml(
    S.score.ok === S.score.total ? "💯" : "👏",
    "오늘의 학습 완료!",
    S.score.total + "문제 중 " + S.score.ok + "개 정답 · 틀린 단어는 내일 복습에 나와요.",
    "홈으로", "home");
  bindCenterBtn();
}

// ---------- 복습 ----------
function newReviewSession() {
  const st = loadStore();
  const dueWords = Object.keys(st.progress)
    .map(function (k) { return st.progress[k]; })
    .filter(isDue)
    .map(function (p) { return wordById[p.id]; })
    .filter(Boolean);
  if (dueWords.length === 0) return { phase: "empty" };
  return {
    phase: "quiz",
    quiz: { qs: makeQuestions(dueWords, WORDS, true), i: 0, sel: null, results: [] },
    score: null,
  };
}

function renderReview() {
  const S = reviewS;
  if (S.phase === "empty") {
    view.innerHTML = centerHtml("😌", "오늘 복습할 단어가 없어요", "새 단어를 배우면 간격 반복 일정에 따라 복습이 생겨요.", "새 단어 배우기", "learn");
    bindCenterBtn();
    return;
  }
  if (S.phase === "quiz") {
    view.innerHTML = '<p class="section-title" style="color:#059669">🔁 복습 퀴즈</p>' + quizHtml(S);
    bindQuiz(S, function (results) {
      const st = loadStore();
      results.forEach(function (r) {
        const p = st.progress[r.wordId];
        if (p) st.progress[r.wordId] = updateSrs(p, r.correct);
      });
      const ok = results.filter(function (r) { return r.correct; }).length;
      st.sessions.push({ date: todayStr(), type: "review", count: results.length, correct: ok });
      saveStore(st);
      S.phase = "done";
      S.score = { ok: ok, total: results.length };
      render();
    });
    return;
  }
  view.innerHTML = centerHtml(
    S.score.ok === S.score.total ? "💯" : "👏",
    "복습 완료!",
    S.score.total + "문제 중 " + S.score.ok + "개 정답 · 맞힌 단어는 더 긴 간격 후에 나와요.",
    "홈으로", "home");
  bindCenterBtn();
}

// ---------- 회화 ----------
const TALK_STOP = { that: 1, this: 1, with: 1, have: 1, your: 1, will: 1, would: 1, could: 1, should: 1, please: 1, about: 1, what: 1, when: 1, where: 1, here: 1, there: 1, from: 1, they: 1, then: 1, some: 1, more: 1, just: 1, like: 1, does: 1, been: 1, yeah: 1, okay: 1, really: 1 };

function keywordOf(line) {
  const words = (line.en.match(/[A-Za-z]{4,}/g) || []).filter(function (x) {
    return !TALK_STOP[x.toLowerCase()];
  });
  if (!words.length) return null;
  words.sort(function (a, b) { return b.length - a.length; });
  return words[0];
}

function dialogQuestions(dlg) {
  const cands = dlg.lines
    .map(function (l) { return { line: l, kw: keywordOf(l) }; })
    .filter(function (c) { return c.kw; });
  const picked = shuffle(cands).slice(0, 5);
  const poolKw = [];
  DIALOGS.forEach(function (d) {
    d.lines.forEach(function (l) { const k = keywordOf(l); if (k) poolKw.push(k); });
  });
  return picked.map(function (c) {
    const re = new RegExp("\\b" + escapeRe(c.kw) + "\\b");
    const blanked = c.line.en.replace(re, "_____");
    const others = shuffle(poolKw.filter(function (k) { return k.toLowerCase() !== c.kw.toLowerCase(); })).slice(0, 3);
    const choices = shuffle([c.kw].concat(others));
    return {
      type: "blank",
      sub: "회화 빈칸 — 알맞은 단어를 고르세요",
      prompt: blanked,
      hint: c.line.ko,
      choices: choices,
      answer: choices.indexOf(c.kw),
      say: null,
      wordId: "talk-" + dlg.id + "-" + c.kw.toLowerCase(),
    };
  });
}

// ---------- 회화 ----------
function renderTalk() {
  const S = talkS || { mode: "list" };
  if (S.mode === "read") { renderTalkRead(S); return; }
  if (S.mode === "quiz" || S.mode === "done") { renderTalkQuiz(S); return; }

  const st = loadStore();
  const byLevel = {};
  DIALOGS.forEach(function (d) { (byLevel[d.level] = byLevel[d.level] || []).push(d); });
  let html = '<header style="margin-bottom:16px"><h1>' + I_MSG + ' 상황별 회화</h1>' +
    '<p class="sub">실제 대화를 한 대사씩 따라가며 익혀요</p></header>';
  LEVELS.forEach(function (lv) {
    const list = byLevel[lv.id];
    if (!list || !list.length) return;
    html += '<p class="section-title">' + esc(lv.title) + '</p>';
    list.forEach(function (d) {
      const done = st.dialogs[d.id];
      html += '<button class="dlg-card" data-dlg="' + esc(d.id) + '">' +
        '<span class="ic">' + esc(d.icon) + '</span>' +
        '<span class="tt">' + esc(d.title) + '</span>' +
        (done ? '<span class="done">완료 ✓</span>' : '<span class="todo">읽기 ▸</span>') +
        '</button>';
    });
  });
  view.innerHTML = html;
  view.querySelectorAll("[data-dlg]").forEach(function (b) {
    b.addEventListener("click", function () {
      const d = DIALOGS.find(function (x) { return x.id === b.getAttribute("data-dlg"); });
      talkS = { mode: "read", dlg: d, shown: 1 };
      render();
    });
  });
}

function renderTalkRead(S) {
  const d = S.dlg;
  const total = d.lines.length;
  const shown = Math.min(S.shown, total);
  const allShown = shown >= total;
  let html = '<button class="btn btn-ghost" id="talk-back" style="width:auto;padding:8px 14px;font-size:13px;margin-bottom:14px">‹ 회화 목록</button>' +
    '<div class="row" style="justify-content:space-between;margin-bottom:12px">' +
      '<h2 style="font-size:19px;font-weight:800">' + esc(d.icon) + ' ' + esc(d.title) + '</h2>' +
      '<span class="badge gray">' + shown + '/' + total + '</span></div>';
  for (let i = 0; i < shown; i++) {
    const l = d.lines[i];
    const me = l.sp === "B";
    const isNew = i === shown - 1;
    html += '<div class="bubble-row' + (me ? " right" : "") + '">' +
      '<div class="bubble ' + (me ? "b" : "a") + (isNew ? " pop" : "") + '">' +
        '<div class="row"><span style="flex:1">' + esc(l.en) + '</span>' +
        '<button class="say" data-say="' + esc(l.en) + '">' + SPK + '</button></div>' +
        '<p class="ko-line">' + esc(l.ko) + '</p>' +
      '</div></div>';
  }
  html += '<div class="btn-row">';
  if (!allShown) {
    html += '<button class="btn btn-ghost" id="talk-all">전체 보기</button>' +
      '<button class="btn btn-primary wide" id="talk-next">다음 대사 ▸</button>';
  } else {
    html += '<button class="btn btn-ghost" id="talk-restart">처음부터</button>' +
      '<button class="btn btn-primary wide" id="talk-quiz">빈칸 연습 ✍️</button>';
  }
  html += '</div>';
  view.innerHTML = html;

  document.getElementById("talk-back").addEventListener("click", function () { setTab("talk"); });
  bindSpeakButtons(view);
  if (shown > 0) speak(d.lines[shown - 1].en);

  const nx = document.getElementById("talk-next");
  if (nx) nx.addEventListener("click", function () { S.shown = shown + 1; render(); });
  const all = document.getElementById("talk-all");
  if (all) all.addEventListener("click", function () { S.shown = total; render(); });
  const rs = document.getElementById("talk-restart");
  if (rs) rs.addEventListener("click", function () { S.shown = 1; render(); });
  const qz = document.getElementById("talk-quiz");
  if (qz) qz.addEventListener("click", function () {
    talkS = { mode: "quiz", dlg: d, quiz: { qs: dialogQuestions(d), i: 0, sel: null, results: [] } };
    render();
  });
}

function renderTalkQuiz(S) {
  if (S.mode === "done") {
    view.innerHTML = centerHtml(
      S.score && S.score.ok === S.score.total ? "💯" : "👏",
      "회화 연습 완료!",
      (S.score ? S.score.total + "문제 중 " + S.score.ok + "개 정답 · " : "") + "다른 상황도 익혀보세요.",
      "회화 목록으로", "talk");
    bindCenterBtn();
    return;
  }
  if (!S.quiz || !S.quiz.qs.length) {
    const st = loadStore();
    st.dialogs[S.dlg.id] = todayStr();
    st.sessions.push({ date: todayStr(), type: "talk", count: 1, correct: 1 });
    saveStore(st);
    view.innerHTML = centerHtml("💬", "회화 완료!", "이 대화는 빈칸으로 만들 표현이 적어 바로 마쳤어요.", "회화 목록으로", "talk");
    bindCenterBtn();
    return;
  }
  view.innerHTML = '<p class="section-title" style="color:var(--brand)">' + I_MSG + ' ' + esc(S.dlg.title) + ' · 빈칸 연습</p>' + quizHtml(S);
  bindQuiz(S, function (results) {
    const st = loadStore();
    st.dialogs[S.dlg.id] = todayStr();
    const ok = results.filter(function (r) { return r.correct; }).length;
    st.sessions.push({ date: todayStr(), type: "talk", count: 1, correct: ok === results.length ? 1 : 0 });
    saveStore(st);
    S.mode = "done";
    S.score = { ok: ok, total: results.length };
    render();
  });
}

// ---------- 단어장 ----------
function renderWords() {
  const st = loadStore();
  const learned = Object.keys(st.progress)
    .map(function (k) { return st.progress[k]; })
    .map(function (p) { return { p: p, w: wordById[p.id] }; })
    .filter(function (x) { return x.w; });

  let list = learned;
  if (wordsFilter === "due") list = learned.filter(function (x) { return isDue(x.p); });
  else if (wordsFilter === "weak") list = learned.filter(function (x) { return isWeak(x.p); });

  const filters = [
    { id: "all", label: "전체", n: learned.length },
    { id: "due", label: "복습 예정", n: learned.filter(function (x) { return isDue(x.p); }).length },
    { id: "weak", label: "약한 단어", n: learned.filter(function (x) { return isWeak(x.p); }).length },
  ];

  let html = '<header style="margin-bottom:16px"><h1>단어장</h1>' +
    '<p class="sub">지금까지 학습한 단어 ' + learned.length + '개</p></header>' +
    '<div class="chips">';
  filters.forEach(function (f) {
    html += '<button class="chip' + (wordsFilter === f.id ? " on" : "") + '" data-filter="' + f.id + '">' +
      esc(f.label) + ' ' + f.n + '</button>';
  });
  html += '</div>';

  if (!list.length) {
    html += '<div class="center" style="min-height:40vh"><p class="emoji">📭</p>' +
      '<h2>표시할 단어가 없어요</h2><p class="desc">새 단어를 학습하면 여기에 쌓여요.</p></div>';
  } else {
    list.sort(function (a, b) { return a.p.next < b.p.next ? -1 : (a.p.next > b.p.next ? 1 : 0); });
    html += '<div class="list">';
    list.forEach(function (x) {
      const w = x.w, p = x.p;
      html += '<div class="item">' +
        '<div class="info"><div class="en">' + esc(w.en) + '</div>' +
          '<div class="ko">' + esc(w.ko) + '</div></div>' +
        '<button class="speak-btn sm" data-say="' + esc(w.en) + '">' + SPK + '</button>' +
        '<div class="stat' + (isWeak(p) ? " weak" : "") + '">' +
          (isDue(p) ? "복습 예정" : "복습 " + esc(p.next.slice(5))) + '</div>' +
      '</div>';
    });
    html += '</div>';
  }
  view.innerHTML = html;
  view.querySelectorAll("[data-filter]").forEach(function (b) {
    b.addEventListener("click", function () { wordsFilter = b.getAttribute("data-filter"); render(); });
  });
  bindSpeakButtons(view);
}

// ---------- 설정 ----------
function renderSettings() {
  const st = loadStore();
  let html = '<header style="margin-bottom:16px"><h1>설정</h1>' +
    '<p class="sub">학습 레벨과 하루 목표를 정하세요</p></header>';

  html += '<p class="section-title">학습 레벨</p>';
  LEVELS.forEach(function (lv) {
    const on = st.settings.level === lv.id;
    html += '<button class="level-card' + (on ? " on" : "") + '" data-level="' + lv.id + '">' +
      '<div class="t">' + esc(lv.title) + '</div>' +
      '<div class="d">' + esc(lv.desc) + ' · ' + wordsOfLevel(lv.id).length + '단어</div></button>';
  });

  const goals = [4, 6, 8, 10];
  html += '<p class="section-title" style="margin-top:8px">하루 새 단어 목표</p><div class="goal-row">';
  goals.forEach(function (g) {
    html += '<button class="goal-btn' + (st.settings.dailyGoal === g ? " on" : "") + '" data-goal="' + g + '">' + g + '개</button>';
  });
  html += '</div>';

  const _synth = ("speechSynthesis" in window) ? window.speechSynthesis : null;
  const _enV = _synth ? _synth.getVoices().filter(function (v) { return /^en[-_]?/i.test(v.lang); }) : [];
  if (_synth && !_enV.length) { _synth.onvoiceschanged = function () { if (tab === "settings") render(); }; }
  if (_synth) {
    html += '<p class="section-title" style="margin-top:18px">발음 목소리</p><div class="card">';
    if (_enV.length) {
      html += '<select id="voice-sel" style="width:100%;padding:12px;border:1.5px solid var(--line);border-radius:13px;font-size:15px;font-family:inherit;background:#fff;color:var(--ink)"><option value="">기기 기본 음성</option>';
      _enV.forEach(function (v) {
        html += '<option value="' + esc(v.voiceURI) + '"' + (st.settings.voiceURI === v.voiceURI ? " selected" : "") + '>' + esc(voiceLabel(v)) + '</option>';
      });
      html += '</select><button class="btn-sm gray" id="voice-test" style="margin-top:12px">🔊 들어보기</button><p class="muted" style="margin-top:10px">기기에 설치된 영어 음성만 표시돼요. 새 단어·회화 모두 이 목소리로 읽습니다.</p>';
    } else {
      html += '<p class="muted">음성을 불러오는 중이거나 이 기기에 영어 음성이 없어요. 설정을 다시 열거나, 휴대폰 설정 → 접근성/음성 출력에서 영어 TTS 음성을 추가해 보세요.</p>';
    }
    html += '</div>';
  }

  html += '<p class="section-title" style="margin-top:18px">데이터 백업</p>' +
    '<div class="card"><div class="btn-row" style="margin-top:0">' +
      '<button class="btn btn-ghost" id="export-btn">내보내기</button>' +
      '<button class="btn btn-ghost" id="import-btn">가져오기</button></div>' +
    '<input type="file" id="import-file" accept="application/json,.json" style="display:none">' +
    '<p class="muted" style="margin-top:10px">학습 기록을 파일로 저장하거나 다른 기기에서 불러옵니다.</p></div>';

  html += '<div class="card danger"><div class="t">학습 기록 초기화</div>' +
    '<p class="muted" style="margin:8px 0 12px">모든 진도와 복습 일정이 삭제됩니다. 되돌릴 수 없어요.</p>' +
    '<button class="btn-sm red" id="reset-btn">전체 초기화</button></div>';

  html += '<p class="footer-note">Daily English · 오프라인에서도 동작하는 나만의 영어 습관 앱</p>';
  view.innerHTML = html;

  view.querySelectorAll("[data-level]").forEach(function (b) {
    b.addEventListener("click", function () {
      st.settings.level = b.getAttribute("data-level");
      saveStore(st);
      render();
    });
  });
  view.querySelectorAll("[data-goal]").forEach(function (b) {
    b.addEventListener("click", function () {
      st.settings.dailyGoal = parseInt(b.getAttribute("data-goal"), 10);
      saveStore(st);
      render();
    });
  });

  const _vsel = document.getElementById("voice-sel");
  if (_vsel) _vsel.addEventListener("change", function () { st.settings.voiceURI = _vsel.value; saveStore(st); });
  const _vtest = document.getElementById("voice-test");
  if (_vtest) _vtest.addEventListener("click", function () { speak("Hello! How are you today?"); });

  document.getElementById("export-btn").addEventListener("click", function () {
    const data = JSON.stringify(loadStore(), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "daily-english-backup-" + todayStr() + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
  const importFile = document.getElementById("import-file");
  document.getElementById("import-btn").addEventListener("click", function () { importFile.click(); });
  importFile.addEventListener("change", function () {
    const f = importFile.files && importFile.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const s = JSON.parse(reader.result);
        if (!s || typeof s !== "object" || !s.settings) throw new Error("bad");
        localStorage.setItem(LS_KEY, JSON.stringify(s));
        alert("가져오기 완료! 학습 기록을 불러왔어요.");
        render();
      } catch (e) {
        alert("파일을 읽을 수 없어요. 올바른 백업 파일인지 확인해 주세요.");
      }
    };
    reader.readAsText(f);
  });

  document.getElementById("reset-btn").addEventListener("click", function () {
    if (confirm("정말 모든 학습 기록을 지울까요? 되돌릴 수 없어요.")) {
      localStorage.removeItem(LS_KEY);
      render();
    }
  });
}

// ---------- 부팅 ----------
document.querySelectorAll("#nav button").forEach(function (b) {
  b.addEventListener("click", function () { setTab(b.getAttribute("data-tab")); });
});

setTab("home");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () { /* 오프라인 미지원 무시 */ });
  });
}
