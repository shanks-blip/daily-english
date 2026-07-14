// ============================================================
// Supabase 클라우드 동기화 — 어느 기기에서 접속해도 진도 유지
// 설정 탭에서 Supabase URL/anon key를 입력하면 활성화됩니다.
// 설정 방법: SETUP-SUPABASE.md 참고
// ============================================================

(function () {
  const CFG_KEY = "daily-english-sync";
  let client = null;
  let pushTimer = null;
  let syncState = { status: "off", email: null }; // off | ready | sending | in | error

  function cfg() {
    try { return JSON.parse(localStorage.getItem(CFG_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveCfg(c) { localStorage.setItem(CFG_KEY, JSON.stringify(c)); }

  function getClient() {
    const c = cfg();
    if (!c.url || !c.key || typeof supabase === "undefined") return null;
    if (!client) {
      try { client = supabase.createClient(c.url, c.key); } catch (e) { return null; }
    }
    return client;
  }

  // ---------- 병합 (두 기기의 기록을 잃지 않게 합침) ----------
  function mergeStores(local, remote) {
    if (!remote) return local;
    const out = { progress: {}, sessions: [], dialogs: {}, settings: local.settings, dailySet: null };
    // dailySet(그날 고정된 학습 세트) 보존: 오늘 날짜인 쪽 우선, 로컬 우선
    const t = todayStr();
    const lds = local.dailySet, rds = remote.dailySet;
    out.dailySet = (lds && lds.date === t) ? lds : ((rds && rds.date === t) ? rds : (lds || rds || null));
    const ids = {};
    Object.keys(local.progress || {}).forEach(function (k) { ids[k] = 1; });
    Object.keys(remote.progress || {}).forEach(function (k) { ids[k] = 1; });
    Object.keys(ids).forEach(function (id) {
      const a = (local.progress || {})[id], b = (remote.progress || {})[id];
      if (!a) out.progress[id] = b;
      else if (!b) out.progress[id] = a;
      else out.progress[id] = (a.ok + a.no) >= (b.ok + b.no) ? a : b; // 더 많이 학습된 쪽 우선
    });
    const seen = {};
    (local.sessions || []).concat(remote.sessions || []).forEach(function (s) {
      const k = JSON.stringify(s);
      if (!seen[k]) { seen[k] = 1; out.sessions.push(s); }
    });
    out.sessions.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    out.dialogs = Object.assign({}, remote.dialogs || {}, local.dialogs || {});
    // 문장 복습(sentSrs)도 진도처럼 병합: 더 많이 연습된 쪽 우선
    out.sentSrs = {};
    const sids = {};
    Object.keys(local.sentSrs || {}).forEach(function (k) { sids[k] = 1; });
    Object.keys(remote.sentSrs || {}).forEach(function (k) { sids[k] = 1; });
    Object.keys(sids).forEach(function (id) {
      const a = (local.sentSrs || {})[id], b = (remote.sentSrs || {})[id];
      if (!a) out.sentSrs[id] = b;
      else if (!b) out.sentSrs[id] = a;
      else out.sentSrs[id] = (a.ok + a.no) >= (b.ok + b.no) ? a : b;
    });
    return out;
  }
  // 테스트용 노출
  window.__mergeStores = mergeStores;

  // ---------- 푸시 / 풀 ----------
  async function push() {
    const cl = getClient();
    if (!cl) return;
    try {
      const res = await cl.auth.getUser();
      const user = res.data && res.data.user;
      if (!user) return;
      syncState.status = "sending";
      await cl.from("progress").upsert({
        user_id: user.id,
        data: loadStore(),
        updated_at: new Date().toISOString(),
      });
      syncState.status = "in";
      updateBadge();
    } catch (e) { syncState.status = "error"; updateBadge(); }
  }

  async function pull() {
    const cl = getClient();
    if (!cl) return;
    try {
      const res = await cl.auth.getUser();
      const user = res.data && res.data.user;
      if (!user) { syncState.status = "ready"; updateBadge(); return; }
      syncState.email = user.email;
      const q = await cl.from("progress").select("data").eq("user_id", user.id).maybeSingle();
      const remote = q.data && q.data.data;
      const merged = mergeStores(loadStore(), remote);
      _origSaveStore(merged); // 병합 결과 저장 (푸시 루프 방지 위해 원본 사용)
      syncState.status = "in";
      updateBadge();
      await push(); // 병합본을 클라우드에도 반영
      if (typeof render === "function") render();
    } catch (e) { syncState.status = "error"; updateBadge(); }
  }

  // ---------- saveStore 후킹: 저장할 때마다 자동 푸시 (2초 디바운스) ----------
  const _origSaveStore = saveStore;
  saveStore = function (st) {
    _origSaveStore(st);
    if (!getClient()) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(push, 2000);
  };

  // ---------- 설정 탭에 동기화 카드 주입 ----------
  function el(html) {
    const d = document.createElement("div");
    d.innerHTML = html;
    return d.firstElementChild;
  }

  function updateBadge() {
    const b = document.getElementById("sync-status");
    if (!b) return;
    const map = {
      off: "⚪ 미설정", ready: "🟡 로그인 필요", sending: "🔄 동기화 중...",
      in: "🟢 동기화 켜짐" + (syncState.email ? " · " + syncState.email : ""), error: "🔴 오류 (설정 확인)",
    };
    b.textContent = map[syncState.status] || "";
  }

  async function buildCard() {
    const c = cfg();
    const cl = getClient();
    let inner = '<p class="section-title">☁️ 클라우드 동기화 <span id="sync-status" class="badge gray"></span></p>';

    if (!cl) {
      inner +=
        '<p class="muted" style="margin-bottom:10px">Supabase 프로젝트 정보를 입력하면 어느 기기에서든 진도가 이어져요. 만드는 방법은 SETUP-SUPABASE.md 참고 (무료, 10분).</p>' +
        '<input id="sb-url" class="spell-input" style="font-size:13px;margin-bottom:8px" placeholder="Project URL (https://xxxx.supabase.co)" value="' + (c.url || "") + '">' +
        '<input id="sb-key" class="spell-input" style="font-size:13px;margin-bottom:10px" placeholder="anon public key" value="' + (c.key || "") + '">' +
        '<button class="btn-sm gray" id="sb-save">저장</button>';
    } else {
      let user = null;
      try {
        const res = await cl.auth.getUser();
        user = res.data && res.data.user;
      } catch (e) { /* ignore */ }
      if (!user) {
        syncState.status = "ready";
        inner +=
          '<p class="muted" style="margin-bottom:10px">이메일을 입력하면 로그인 링크를 보내드려요. 메일의 링크를 누르면 이 기기가 연결됩니다.</p>' +
          '<input id="sb-email" class="spell-input" style="font-size:14px;margin-bottom:10px" type="email" placeholder="이메일 주소">' +
          '<div style="display:flex;gap:8px">' +
          '<button class="btn-sm gray" id="sb-login">로그인 링크 보내기</button>' +
          '<button class="btn-sm red" id="sb-reset">연동 해제</button></div>';
      } else {
        syncState.status = "in";
        syncState.email = user.email;
        inner +=
          '<p class="muted" style="margin-bottom:10px">저장할 때마다 자동으로 클라우드에 백업되고, 다른 기기에서 로그인하면 이어집니다.</p>' +
          '<div style="display:flex;gap:8px">' +
          '<button class="btn-sm gray" id="sb-now">지금 동기화</button>' +
          '<button class="btn-sm red" id="sb-logout">로그아웃</button></div>';
      }
    }

    const card = el('<div class="card">' + inner + '</div>');

    const save = card.querySelector("#sb-save");
    if (save) save.addEventListener("click", function () {
      const url = card.querySelector("#sb-url").value.trim();
      const key = card.querySelector("#sb-key").value.trim();
      if (!url || !key) { alert("URL과 key를 모두 입력하세요."); return; }
      saveCfg({ url: url, key: key });
      client = null;
      alert("저장됐어요! 이제 이메일로 로그인하세요.");
      render();
    });
    const login = card.querySelector("#sb-login");
    if (login) login.addEventListener("click", async function () {
      const email = card.querySelector("#sb-email").value.trim();
      if (!email) { alert("이메일을 입력하세요."); return; }
      const cl2 = getClient();
      const r = await cl2.auth.signInWithOtp({ email: email, options: { emailRedirectTo: location.origin + location.pathname } });
      if (r.error) alert("전송 실패: " + r.error.message);
      else alert("로그인 링크를 보냈어요! " + email + " 메일함을 확인하세요.");
    });
    const reset = card.querySelector("#sb-reset");
    if (reset) reset.addEventListener("click", function () {
      if (confirm("동기화 연동을 해제할까요? (학습 기록은 이 기기에 그대로 남아요)")) {
        localStorage.removeItem(CFG_KEY);
        client = null;
        syncState = { status: "off", email: null };
        render();
      }
    });
    const logout = card.querySelector("#sb-logout");
    if (logout) logout.addEventListener("click", async function () {
      await getClient().auth.signOut();
      syncState.status = "ready";
      render();
    });
    const now = card.querySelector("#sb-now");
    if (now) now.addEventListener("click", function () { pull(); });

    return card;
  }

  // renderSettings 후킹: 설정 화면에 카드 추가
  const _origRenderSettings = renderSettings;
  renderSettings = function () {
    _origRenderSettings();
    buildCard().then(function (card) {
      if (tab !== "settings") return; // 비동기 응답 전에 다른 탭으로 이동했으면 붙이지 않음
      const footer = view.querySelector(".footer-note");
      if (footer) view.insertBefore(card, footer);
      else view.appendChild(card);
      updateBadge();
    });
  };

  // 시작 시: 로그인 상태면 자동 풀 + 인증 이벤트 반응
  const cl = getClient();
  if (cl) {
    cl.auth.onAuthStateChange(function (event, session) {
      if (event === "SIGNED_IN" && session) pull();
    });
    pull();
  }
})();
// end of sync.js
