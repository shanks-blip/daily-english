// ============================================================
// 회화 연습 모드 — 롤플레이 · 섀도잉 · 받아쓰기 + 문장 복습(SRS)
// activities.js 뒤, sync.js 앞에 로드됩니다.
// 틀린 문장은 st.sentSrs에 쌓여 간격 반복으로 다시 나옵니다.
// ============================================================

// ---------- 문장 SRS ----------
function sentKey(dlgId, li) { return dlgId + "|" + li; }

function initSentProgress(key) {
  return { id: key, ef: 2.5, iv: 0, reps: 0, next: todayStr(), ok: 0, no: 0, at: todayStr() };
}

// 규칙: 이미 큐에 있으면 결과 반영, 없으면 "틀렸을 때만" 새로 추가
// (잘하는 문장까지 쌓이면 복습 큐가 무한히 커지므로)
function touchSentence(dlgId, li, correct) {
  const st = loadStore();
  const k = sentKey(dlgId, li);
  const existing = st.sentSrs[k];
  if (!existing && correct) return;
  st.sentSrs[k] = updateSrs(existing || initSentProgress(k), correct);
  saveStore(st);
}

function dueSentences() {
  const st = loadStore();
  const out = [];
  Object.keys(st.sentSrs || {}).forEach(function (k) {
    const p = st.sentSrs[k];
    if (!p || p.next > todayStr()) return;
    const li = parseInt(k.split("|")[1], 10);
    const d = DIALOGS.find(function (x) { return x.id === k.split("|")[0]; });
    const line = d && d.lines[li];
    if (line) out.push({ key: k, dlg: d, li: li, line: line });
  });
  return out;
}

// ---------- 속도 조절 TTS (섀도잉용) ----------
function speakRate(text, rate) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  const st = loadStore();
  if (st.settings && st.settings.voiceURI) {
    const v = window.speechSynthesis.getVoices().filter(function (x) { return x.voiceURI === st.settings.voiceURI; })[0];
    if (v) { u.voice = v; u.lang = v.lang; }
  }
  window.speechSynthesis.speak(u);
}

// ---------- 공통 헤더 ----------
function tpHeader(icon, title, cur, total) {
  return '<button class="btn btn-ghost" id="tp-back" style="width:auto;padding:8px 14px;font-size:13px;margin-bottom:14px">‹ 그만하기</button>' +
    '<div class="row" style="justify-content:space-between;margin-bottom:10px">' +
      '<h2 style="font-size:19px;font-weight:800">' + icon + ' ' + esc(title) + '</h2>' +
      '<span class="badge gray">' + cur + '/' + total + '</span></div>' +
    '<div class="progress-top"><div style="width:' + ((cur / total) * 100) + '%"></div></div>';
}
function tpBindBack() {
  document.getElementById("tp-back").addEventListener("click", function () { setTab("talk"); });
}

// ---------- 롤플레이 ----------
function renderRolePlay(S) {
  const d = S.dlg, lines = d.lines;
  if (S.i >= lines.length) {
    const ok = S.results.filter(function (r) { return r.correct; }).length;
    if (!S.saved) {
      S.saved = true;
      const st = loadStore();
      st.dialogs[d.id] = todayStr();
      st.sessions.push({ date: todayStr(), type: "talk", count: Math.max(1, S.results.length), correct: ok });
      saveStore(st);
    }
    view.innerHTML = centerHtml(
      S.results.length && ok === S.results.length ? "💯" : "👏", "롤플레이 완료!",
      "내 대사 " + S.results.length + "개 중 " + ok + "개 성공 · 틀린 문장은 문장 복습에서 다시 나와요.",
      "회화 목록으로", "talk");
    bindCenterBtn();
    return;
  }
  const cur = lines[S.i];
  const mine = cur.sp === S.role;
  let html = tpHeader("🎭", d.title, S.i + 1, lines.length) +
    '<div class="chips" style="margin:10px 0 12px"><button class="chip" id="tp-swap">역할 바꾸기 (내 역할: ' + S.role + ')</button></div>';
  for (let i = 0; i < S.i; i++) {
    const l = lines[i];
    const me = l.sp === S.role;
    html += '<div class="bubble-row' + (me ? " right" : "") + '"><div class="bubble ' + (me ? "b" : "a") + '">' +
      '<div class="row"><span style="flex:1">' + esc(l.en) + '</span><button class="say" data-say="' + esc(l.en) + '">' + SPK + '</button></div>' +
      '<p class="ko-line">' + esc(l.ko) + '</p></div></div>';
  }
  if (!mine) {
    html += '<div class="bubble-row"><div class="bubble a pop">' +
      '<div class="row"><span style="flex:1">' + esc(cur.en) + '</span><button class="say" data-say="' + esc(cur.en) + '">' + SPK + '</button></div>' +
      '<p class="ko-line">' + esc(cur.ko) + '</p></div></div>' +
      '<button class="btn btn-primary" id="tp-next" style="margin-top:8px">다음 ▸</button>';
  } else if (!S.revealed) {
    html += '<div class="bubble-row right"><div class="bubble b pop">' +
      '<div class="row"><span style="flex:1">🎤 내 차례! 소리 내어 영어로 말해보세요</span></div>' +
      '<p class="ko-line" style="opacity:1;font-size:14px">' + esc(cur.ko) + '</p></div></div>' +
      '<button class="btn btn-primary" id="tp-reveal" style="margin-top:8px">정답 보기</button>';
  } else {
    html += '<div class="bubble-row right"><div class="bubble b pop">' +
      '<div class="row"><span style="flex:1">' + esc(cur.en) + '</span><button class="say" data-say="' + esc(cur.en) + '">' + SPK + '</button></div>' +
      '<p class="ko-line">' + esc(cur.ko) + '</p></div></div>' +
      '<p class="muted" style="margin:4px 0 8px">방금 말한 문장과 비교해 보세요.</p>' +
      '<div class="btn-row" style="margin-top:0">' +
      '<button class="btn btn-ghost" id="tp-no">❌ 틀렸어요</button>' +
      '<button class="btn btn-primary" id="tp-ok">⭕ 맞았어요</button></div>';
  }
  view.innerHTML = html;
  bindSpeakButtons(view);
  tpBindBack();
  const spkKey = S.i + (S.revealed ? "r" : "");
  if (S.lastSpoken !== spkKey && (!mine || S.revealed)) { S.lastSpoken = spkKey; speak(cur.en); }
  document.getElementById("tp-swap").addEventListener("click", function () {
    talkS = { mode: "role", dlg: d, role: S.role === "B" ? "A" : "B", i: 0, revealed: false, results: [] };
    render();
  });
  const nx = document.getElementById("tp-next");
  if (nx) nx.addEventListener("click", function () { S.i += 1; S.revealed = false; render(); });
  const rv = document.getElementById("tp-reveal");
  if (rv) rv.addEventListener("click", function () { S.revealed = true; render(); });
  function assess(correct) {
    S.results.push({ li: S.i, correct: correct });
    touchSentence(d.id, S.i, correct);
    S.i += 1; S.revealed = false;
    render();
  }
  const okb = document.getElementById("tp-ok");
  if (okb) okb.addEventListener("click", function () { assess(true); });
  const nob = document.getElementById("tp-no");
  if (nob) nob.addEventListener("click", function () { assess(false); });
}

// ---------- 섀도잉 ----------
function renderShadow(S) {
  const d = S.dlg, lines = d.lines;
  if (S.i >= lines.length) {
    if (!S.saved) {
      S.saved = true;
      const st = loadStore();
      st.dialogs[d.id] = todayStr();
      st.sessions.push({ date: todayStr(), type: "talk", count: lines.length, correct: lines.length });
      saveStore(st);
    }
    view.innerHTML = centerHtml("🗣️", "섀도잉 완료!",
      lines.length + "문장을 따라 말했어요. 발음뿐 아니라 억양과 리듬까지 흉내 내는 게 포인트예요.",
      "회화 목록으로", "talk");
    bindCenterBtn();
    return;
  }
  const cur = lines[S.i];
  const rate = S.slow ? 0.65 : 0.9;
  view.innerHTML = tpHeader("🗣️", d.title + " · 섀도잉", S.i + 1, lines.length) +
    '<div class="card" style="padding:22px 18px;margin-top:14px">' +
      '<p class="muted" style="margin-bottom:8px">' + (cur.sp === "A" ? "상대 대사" : "내 대사") + ' · 듣고 거의 동시에 따라 말하세요</p>' +
      '<p class="s-en">' + esc(cur.en) + '</p>' +
      '<p class="s-ko" style="margin-top:6px">' + esc(cur.ko) + '</p>' +
      '<div class="btn-row" style="margin-top:16px">' +
        '<button class="btn btn-ghost" id="sh-play">🔊 다시 듣기</button>' +
        '<button class="btn btn-ghost" id="sh-slow">' + (S.slow ? "🐢 천천히 켜짐" : "🐢 천천히") + '</button></div>' +
    '</div>' +
    '<button class="btn btn-primary" id="sh-next">따라 말했어요 ▸</button>';
  tpBindBack();
  if (S.lastSpoken !== S.i) { S.lastSpoken = S.i; speakRate(cur.en, rate); }
  document.getElementById("sh-play").addEventListener("click", function () { speakRate(cur.en, rate); });
  document.getElementById("sh-slow").addEventListener("click", function () {
    S.slow = !S.slow; S.lastSpoken = null; render();
  });
  document.getElementById("sh-next").addEventListener("click", function () { S.i += 1; render(); });
}

// ---------- 받아쓰기 ----------
function normalizeSent(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9' ]/g, " ").replace(/\s+/g, " ").trim();
}

function renderDictation(S) {
  const d = S.dlg, lines = d.lines;
  if (S.i >= lines.length) {
    const ok = S.results.filter(function (r) { return r.correct; }).length;
    if (!S.saved) {
      S.saved = true;
      const st = loadStore();
      st.dialogs[d.id] = todayStr();
      st.sessions.push({ date: todayStr(), type: "talk", count: S.results.length, correct: ok });
      saveStore(st);
    }
    view.innerHTML = centerHtml(ok === S.results.length ? "💯" : "👏", "받아쓰기 완료!",
      S.results.length + "문장 중 " + ok + "개 정확 · 틀린 문장은 문장 복습에서 다시 나와요.",
      "회화 목록으로", "talk");
    bindCenterBtn();
    return;
  }
  const cur = lines[S.i];
  let html = tpHeader("⌨️", d.title + " · 받아쓰기", S.i + 1, lines.length) +
    '<div class="listen-box"><button class="play-big" id="dc-play" aria-label="다시 듣기">' + SPK + '</button>' +
    '<p class="muted" style="margin-top:10px">듣고 그대로 입력하세요 · 힌트: ' + esc(cur.ko) + '</p></div>';
  if (!S.fb) {
    html += '<input id="dc-input" class="spell-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="들은 문장을 영어로 입력">' +
      '<button class="btn btn-primary" id="dc-submit" style="margin-top:12px">확인</button>';
  } else {
    html += '<input class="spell-input" type="text" disabled value="' + esc(S.fb.given) + '">' +
      '<div class="spell-fb ' + (S.fb.correct ? "good" : "bad") + '">' +
      (S.fb.correct ? "⭕ 정답!" : "❌ 정답: " + esc(cur.en)) + '</div>' +
      '<button class="btn btn-primary" id="dc-next" style="margin-top:12px">' +
      (S.i + 1 >= lines.length ? "결과 보기" : "다음") + '</button>';
  }
  view.innerHTML = html;
  tpBindBack();
  if (S.lastSpoken !== S.i) { S.lastSpoken = S.i; speak(cur.en); }
  document.getElementById("dc-play").addEventListener("click", function () { speak(cur.en); });
  const submit = document.getElementById("dc-submit");
  if (submit) {
    const input = document.getElementById("dc-input");
    const doSubmit = function () {
      if (S.fb) return;
      const given = (input.value || "").trim();
      const correct = normalizeSent(given) === normalizeSent(cur.en);
      S.fb = { given: given, correct: correct };
      S.results.push({ li: S.i, correct: correct });
      touchSentence(d.id, S.i, correct);
      render();
    };
    submit.addEventListener("click", doSubmit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") doSubmit(); });
    input.focus();
  }
  const nx = document.getElementById("dc-next");
  if (nx) nx.addEventListener("click", function () { S.i += 1; S.fb = null; render(); });
}

// ---------- 문장 복습 (SRS 큐) ----------
function renderSentReview(S) {
  if (!S.queue.length || S.i >= S.queue.length) {
    const ok = S.results.filter(function (r) { return r.correct; }).length;
    if (!S.saved && S.results.length) {
      S.saved = true;
      const st = loadStore();
      st.sessions.push({ date: todayStr(), type: "sent", count: S.results.length, correct: ok });
      saveStore(st);
    }
    view.innerHTML = centerHtml("🔁", "문장 복습 완료!",
      S.results.length + "문장 중 " + ok + "개 성공 · 맞힌 문장은 더 긴 간격 후에 나와요.",
      "회화 목록으로", "talk");
    bindCenterBtn();
    return;
  }
  const q = S.queue[S.i];
  let html = tpHeader("🔁", "문장 복습", S.i + 1, S.queue.length) +
    '<div class="card" style="padding:22px 18px;margin-top:14px">' +
      '<span class="badge blue">' + esc(q.dlg.icon) + ' ' + esc(q.dlg.title) + '</span>' +
      '<p style="font-size:18px;font-weight:700;margin-top:12px">' + esc(q.line.ko) + '</p>';
  if (!S.revealed) {
    html += '<p class="muted" style="margin-top:10px">영어로 소리 내어 말해본 뒤 정답을 확인하세요</p></div>' +
      '<button class="btn btn-primary" id="sr-reveal">정답 보기</button>';
  } else {
    html += '<div class="example" style="margin-top:14px"><div class="row">' +
      '<p class="en" style="flex:1">' + esc(q.line.en) + '</p>' +
      '<button class="speak-btn sm" data-say="' + esc(q.line.en) + '">' + SPK + '</button></div></div></div>' +
      '<div class="btn-row" style="margin-top:0">' +
      '<button class="btn btn-ghost" id="sr-no">❌ 틀렸어요</button>' +
      '<button class="btn btn-primary" id="sr-ok">⭕ 맞았어요</button></div>';
  }
  view.innerHTML = html;
  bindSpeakButtons(view);
  tpBindBack();
  const rv = document.getElementById("sr-reveal");
  if (rv) rv.addEventListener("click", function () { S.revealed = true; speak(q.line.en); render(); });
  function assess(correct) {
    const st = loadStore();
    st.sentSrs[q.key] = updateSrs(st.sentSrs[q.key] || initSentProgress(q.key), correct);
    saveStore(st);
    S.results.push({ correct: correct });
    S.i += 1; S.revealed = false;
    render();
  }
  const okb = document.getElementById("sr-ok");
  if (okb) okb.addEventListener("click", function () { assess(true); });
  const nob = document.getElementById("sr-no");
  if (nob) nob.addEventListener("click", function () { assess(false); });
}

// ---------- 회화 목록에 문장 복습 카드 ----------
function injectSentCard() {
  const due = dueSentences();
  if (!due.length) return;
  const btn = document.createElement("button");
  btn.className = "dlg-card";
  btn.innerHTML = '<span class="ic">🔁</span>' +
    '<span class="tt">문장 복습 <span class="badge blue">' + due.length + '개</span></span>' +
    '<span class="todo">시작 ▸</span>';
  const header = view.querySelector("header");
  if (header && header.nextSibling) view.insertBefore(btn, header.nextSibling);
  else view.appendChild(btn);
  btn.addEventListener("click", function () {
    talkS = { mode: "sent", queue: shuffle(dueSentences()).slice(0, 20), i: 0, revealed: false, results: [] };
    render();
  });
}

// ---------- 라우팅: renderTalk 확장 ----------
const _tpOrigRenderTalk = renderTalk;
renderTalk = function () {
  const S = talkS || {};
  if (S.mode === "role") { renderRolePlay(S); return; }
  if (S.mode === "shadow") { renderShadow(S); return; }
  if (S.mode === "dict") { renderDictation(S); return; }
  if (S.mode === "sent") { renderSentReview(S); return; }
  _tpOrigRenderTalk();
  if (!S.mode || S.mode === "list") injectSentCard();
};

// ---------- 읽기 화면에 연습 모드 버튼 추가 ----------
const _tpOrigTalkRead = renderTalkRead;
renderTalkRead = function (S) {
  _tpOrigTalkRead(S);
  const bar = document.createElement("div");
  bar.className = "chips";
  bar.style.margin = "2px 0 12px";
  bar.innerHTML =
    '<button class="chip" data-tmode="role">🎭 롤플레이</button>' +
    '<button class="chip" data-tmode="shadow">🗣️ 섀도잉</button>' +
    '<button class="chip" data-tmode="dict">⌨️ 받아쓰기</button>';
  const titleRow = view.querySelector(".row");
  if (titleRow && titleRow.nextSibling) view.insertBefore(bar, titleRow.nextSibling);
  else view.appendChild(bar);
  bar.querySelectorAll("[data-tmode]").forEach(function (b) {
    b.addEventListener("click", function () {
      const m = b.getAttribute("data-tmode");
      if (m === "role") talkS = { mode: "role", dlg: S.dlg, role: "B", i: 0, revealed: false, results: [] };
      else if (m === "shadow") talkS = { mode: "shadow", dlg: S.dlg, i: 0, slow: false };
      else talkS = { mode: "dict", dlg: S.dlg, i: 0, fb: null, results: [] };
      render();
    });
  });
};
// end of talk-practice.js
