// ============================================================
// 데일리 미션 + 듣기 퀴즈 + 문장 만들기
// app.js 뒤에 로드됩니다. (renderHome을 감싸 미션 카드를 추가)
// ============================================================

var listenS = null;
var arrangeS = null;

function learnedWordList() {
  const st = loadStore();
  return Object.keys(st.progress).map(function (id) { return wordById[id]; }).filter(Boolean);
}

// ---------- 듣기 퀴즈 ----------
function newListenSession() {
  const pool = learnedWordList();
  if (pool.length < 4) return { phase: "empty" };
  const targets = shuffle(pool).slice(0, Math.min(10, pool.length));
  const qs = targets.map(function (w) {
    const others = shuffle(pool.filter(function (p) { return p.id !== w.id && p.ko !== w.ko; })).slice(0, 3);
    const choices = shuffle([w.ko].concat(others.map(function (o) { return o.ko; })));
    return { wordId: w.id, en: w.en, choices: choices, answer: choices.indexOf(w.ko) };
  });
  return { phase: "quiz", qs: qs, i: 0, sel: null, results: [] };
}

function renderListen() {
  const S = listenS;
  if (S.phase === "empty") {
    view.innerHTML = centerHtml("🎧", "아직 들을 단어가 부족해요", "단어를 4개 이상 배우면 듣기 퀴즈가 열려요.", "새 단어 배우기", "learn");
    bindCenterBtn();
    return;
  }
  if (S.phase === "quiz") {
    const q = S.qs[S.i];
    const answered = S.sel !== null;
    let html = '<p class="section-title" style="color:#0e7490">' + I_HEAD + ' 듣기 퀴즈 (' + (S.i + 1) + '/' + S.qs.length + ')</p>' +
      '<div class="progress-top"><div style="width:' + (((S.i + 1) / S.qs.length) * 100) + '%"></div></div>' +
      '<div class="listen-box">' +
      '<button class="play-big" id="play-word" aria-label="다시 듣기">' + SPK + '</button>' +
      '<p class="muted" style="margin-top:10px">' +
      (answered ? '<b style="color:#0f172a;font-size:18px">' + esc(q.en) + '</b>' : '버튼을 눌러 듣고 알맞은 뜻을 고르세요') +
      '</p></div>';
    q.choices.forEach(function (c, i) {
      let cls = "choice";
      if (answered) {
        if (i === q.answer) cls += " correct";
        else if (i === S.sel) cls += " wrong";
        else cls += " dim";
      }
      html += '<button class="' + cls + '" data-lc="' + i + '">' + esc(c) + '</button>';
    });
    if (answered) {
      html += '<button class="btn btn-primary" id="listen-next" style="margin-top:14px">' +
        (S.i + 1 >= S.qs.length ? "결과 보기" : "다음") + '</button>';
    }
    view.innerHTML = html;
    document.getElementById("play-word").addEventListener("click", function () { speak(q.en); });
    if (!answered) speak(q.en); // 문제 시작 시 자동 재생
    view.querySelectorAll("[data-lc]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (S.sel !== null) return;
        const i = parseInt(b.getAttribute("data-lc"), 10);
        S.sel = i;
        S.results.push({ wordId: q.wordId, correct: i === q.answer });
        render();
      });
    });
    const nx = document.getElementById("listen-next");
    if (nx) nx.addEventListener("click", function () {
      if (S.i + 1 >= S.qs.length) finishListen(S);
      else { S.i += 1; S.sel = null; render(); }
    });
    return;
  }
  view.innerHTML = centerHtml(
    S.score.ok === S.score.total ? "💯" : "👏", "듣기 퀴즈 완료!",
    S.score.total + "문제 중 " + S.score.ok + "개 정답 · 귀가 트이고 있어요.", "홈으로", "home");
  bindCenterBtn();
}

function finishListen(S) {
  const st = loadStore();
  S.results.forEach(function (r) {
    const p = st.progress[r.wordId];
    if (p) st.progress[r.wordId] = updateSrs(p, r.correct);
  });
  const ok = S.results.filter(function (r) { return r.correct; }).length;
  st.sessions.push({ date: todayStr(), type: "listen", count: S.results.length, correct: ok });
  saveStore(st);
  S.phase = "done";
  S.score = { ok: ok, total: S.results.length };
  render();
}

// ---------- 문장 만들기 (어순 배열) ----------
function newArrangeSession() {
  const pool = learnedWordList()
    .map(function (w) { return { w: w, parts: w.exEn.replace(/[.,!?]/g, "").split(/\s+/) }; })
    .filter(function (c) { return c.parts.length >= 4 && c.parts.length <= 9; });
  if (pool.length === 0) return { phase: "empty" };
  const picked = shuffle(pool).slice(0, Math.min(5, pool.length));
  return { phase: "quiz", qs: picked, i: 0, built: [], checked: null, results: [] };
}

function renderArrange() {
  const S = arrangeS;
  if (S.phase === "empty") {
    view.innerHTML = centerHtml("🧩", "연습할 문장이 부족해요", "단어를 배우면 그 예문으로 문장 만들기가 열려요.", "새 단어 배우기", "learn");
    bindCenterBtn();
    return;
  }
  if (S.phase === "quiz") {
    const q = S.qs[S.i];
    if (!q.shuffled) {
      q.shuffled = shuffle(q.parts.map(function (p, i) { return { t: p, k: i }; }));
    }
    const used = {};
    S.built.forEach(function (b) { used[b.k] = 1; });
    let html = '<p class="section-title" style="color:#9333ea">' + I_SHAPES + ' 문장 만들기 (' + (S.i + 1) + '/' + S.qs.length + ')</p>' +
      '<div class="progress-top"><div style="width:' + (((S.i + 1) / S.qs.length) * 100) + '%"></div></div>' +
      '<p class="muted">뜻에 맞게 단어를 순서대로 누르세요</p>' +
      '<p style="font-size:17px;font-weight:700;margin:6px 0 14px">' + esc(q.w.exKo) + '</p>' +
      '<div class="answer-line">' +
      (S.built.length
        ? S.built.map(function (b, bi) { return '<button class="word-chip on" data-rm="' + bi + '">' + esc(b.t) + '</button>'; }).join("")
        : '<span class="muted">여기에 문장이 만들어져요</span>') +
      '</div>' +
      '<div class="chips-pool">' +
      q.shuffled.map(function (p) { return used[p.k] ? "" : '<button class="word-chip" data-add="' + p.k + '">' + esc(p.t) + '</button>'; }).join("") +
      '</div>';
    if (S.checked) {
      html += '<div class="spell-fb ' + (S.checked.correct ? "good" : "bad") + '">' +
        (S.checked.correct ? "⭕ 정답!" : "❌ 정답: " + esc(q.w.exEn)) + '</div>' +
        '<button class="btn btn-primary" id="ar-next" style="margin-top:12px">' +
        (S.i + 1 >= S.qs.length ? "결과 보기" : "다음") + '</button>';
    } else if (S.built.length === q.parts.length) {
      html += '<button class="btn btn-primary" id="ar-check" style="margin-top:14px">확인</button>';
    }
    view.innerHTML = html;
    view.querySelectorAll("[data-add]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (S.checked) return;
        const k = parseInt(b.getAttribute("data-add"), 10);
        const p = q.shuffled.find(function (x) { return x.k === k; });
        S.built.push(p);
        render();
      });
    });
    view.querySelectorAll("[data-rm]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (S.checked) return;
        S.built.splice(parseInt(b.getAttribute("data-rm"), 10), 1);
        render();
      });
    });
    const ck = document.getElementById("ar-check");
    if (ck) ck.addEventListener("click", function () {
      const ans = S.built.map(function (b) { return b.t; }).join(" ");
      const correct = ans === q.parts.join(" ");
      S.checked = { correct: correct };
      S.results.push({ correct: correct });
      speak(q.w.exEn);
      render();
    });
    const nx = document.getElementById("ar-next");
    if (nx) nx.addEventListener("click", function () {
      if (S.i + 1 >= S.qs.length) finishArrange(S);
      else { S.i += 1; S.built = []; S.checked = null; render(); }
    });
    return;
  }
  view.innerHTML = centerHtml(
    S.score.ok === S.score.total ? "💯" : "👏", "문장 만들기 완료!",
    S.score.total + "문제 중 " + S.score.ok + "개 정답 · 어순 감각이 자라고 있어요.", "홈으로", "home");
  bindCenterBtn();
}

function finishArrange(S) {
  const st = loadStore();
  const ok = S.results.filter(function (r) { return r.correct; }).length;
  st.sessions.push({ date: todayStr(), type: "arrange", count: S.results.length, correct: ok });
  saveStore(st);
  S.phase = "done";
  S.score = { ok: ok, total: S.results.length };
  render();
}

// ---------- 홈: 오늘의 미션 카드 ----------
const MISSIONS = [
  { key: "learn", icon: I_BOOK, label: "새 단어 학습", go: "learn" },
  { key: "review", icon: I_LOOP, label: "복습", go: "review" },
  { key: "listen", icon: I_HEAD, label: "듣기 퀴즈", go: "listen" },
  { key: "arrange", icon: I_SHAPES, label: "문장 만들기", go: "arrange" },
  { key: "talk", icon: I_MSG, label: "회화 한 편", go: "talk" },
];

function missionDone(st, key) {
  const t = todayStr();
  if (key === "talk") {
    return Object.keys(st.dialogs || {}).some(function (k) { return st.dialogs[k] === t; });
  }
  if (key === "review") {
    if (st.sessions.some(function (s) { return s.date === t && s.type === "review"; })) return true;
    const learned = Object.keys(st.progress).length;
    const due = Object.keys(st.progress).map(function (k) { return st.progress[k]; }).filter(isDue).length;
    return learned > 0 && due === 0; // 복습할 게 없으면 완료로 인정
  }
  return st.sessions.some(function (s) { return s.date === t && s.type === key; });
}

const _actOrigRenderHome = renderHome;
renderHome = function () {
  _actOrigRenderHome();
  const st = loadStore();
  const doneCount = MISSIONS.filter(function (m) { return missionDone(st, m.key); }).length;
  let inner = '<p class="section-title">' + I_TARGET + ' 오늘의 미션 <span class="badge ' +
    (doneCount === MISSIONS.length ? 'blue">완료! 🎉' : 'gray">' + doneCount + "/" + MISSIONS.length) + '</span></p>';
  MISSIONS.forEach(function (m) {
    const done = missionDone(st, m.key);
    inner += '<button class="m-item' + (done ? " done" : "") + '" data-mgo="' + m.go + '">' +
      '<span class="m-ic">' + m.icon + '</span>' +
      '<span class="m-label">' + m.label + '</span>' +
      '<span class="m-state">' + (done ? "완료 ✓" : "하러 가기 ▸") + '</span></button>';
  });
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = inner;
  const grad = view.querySelector(".grad");
  if (grad && grad.nextSibling) view.insertBefore(card, grad.nextSibling);
  else view.appendChild(card);
  card.querySelectorAll("[data-mgo]").forEach(function (b) {
    b.addEventListener("click", function () { setTab(b.getAttribute("data-mgo")); });
  });
};

// 초기 홈 화면은 이 파일 로드 전에 그려졌으므로 한 번 다시 그린다
if (typeof tab !== "undefined" && tab === "home") render();
// end of activities.js
