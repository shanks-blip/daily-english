// ============================================================
// 회화 확장 — 고급 회화 + 매일 예약 작업이 1편씩 추가하는 파일
// 형식: DIALOGS에 push. id는 dd001부터 순차, 데일리는 ddMMDD.
// ============================================================

[].push.apply(DIALOGS, [
  {
    id: "dd001", level: "lv3", icon: "🏦", title: "은행에서 카드 문제 해결",
    lines: [
      { sp: "B", en: "Hi, my debit card got declined this morning, but I have money in my account.", ko: "안녕하세요, 오늘 아침에 체크카드가 승인 거절됐는데 계좌에 돈은 있거든요." },
      { sp: "A", en: "I'm sorry about that. Let me look into it. Can I see your ID?", ko: "불편을 드려 죄송합니다. 확인해 볼게요. 신분증 보여주시겠어요?" },
      { sp: "B", en: "Sure, here you go.", ko: "네, 여기요." },
      { sp: "A", en: "I see the issue. Your card was flagged for suspicious activity.", ko: "문제를 찾았어요. 의심 거래로 카드에 제한이 걸렸네요." },
      { sp: "B", en: "Oh, I did make a large purchase yesterday.", ko: "아, 어제 큰 금액을 결제하긴 했어요." },
      { sp: "A", en: "That explains it. I'll remove the hold right away.", ko: "그래서 그런 거네요. 바로 제한을 풀어 드릴게요." },
      { sp: "B", en: "Great. Is there anything I should do to prevent this?", ko: "다행이네요. 이런 일을 막으려면 뭘 해야 할까요?" },
      { sp: "A", en: "You can set up travel and purchase alerts in the app.", ko: "앱에서 여행·결제 알림을 설정해 두시면 돼요." }
    ]
  },
  {
    id: "dd002", level: "lv3", icon: "🏠", title: "아파트 보러 가기",
    lines: [
      { sp: "A", en: "Thanks for coming. This is the two-bedroom I mentioned.", ko: "와 주셔서 감사해요. 말씀드렸던 방 두 개짜리예요." },
      { sp: "B", en: "It's brighter than I expected. What's included in the rent?", ko: "생각보다 밝네요. 월세에 뭐가 포함돼 있나요?" },
      { sp: "A", en: "Water and trash are included. Electricity is separate.", ko: "수도와 쓰레기 처리비는 포함이고, 전기는 별도예요." },
      { sp: "B", en: "How much is the deposit?", ko: "보증금은 얼마예요?" },
      { sp: "A", en: "One month's rent, and it's refundable when you move out.", ko: "한 달 치 월세이고, 이사 나가실 때 돌려드려요." },
      { sp: "B", en: "Is the neighborhood quiet at night?", ko: "동네는 밤에 조용한가요?" },
      { sp: "A", en: "Very. Most residents are young professionals.", ko: "아주 조용해요. 주민 대부분이 젊은 직장인이에요." },
      { sp: "B", en: "I like it. Can I think it over and get back to you tomorrow?", ko: "마음에 드네요. 생각해 보고 내일 연락드려도 될까요?" }
    ]
  },
  {
    id: "dd003", level: "lv3", icon: "🍝", title: "주문이 잘못 나왔을 때",
    lines: [
      { sp: "B", en: "Excuse me, I ordered the seafood pasta, but this is carbonara.", ko: "저기요, 해산물 파스타를 시켰는데 이건 카르보나라네요." },
      { sp: "A", en: "Oh, I'm so sorry about the mix-up. Let me fix that right away.", ko: "아, 착오가 있었네요. 정말 죄송합니다. 바로 바꿔 드릴게요." },
      { sp: "B", en: "Thank you. Also, could we get the drinks we ordered?", ko: "감사해요. 그리고 주문한 음료도 주시겠어요?" },
      { sp: "A", en: "Of course. They're on their way. Again, I apologize.", ko: "물론이죠. 곧 나옵니다. 다시 한번 사과드려요." },
      { sp: "A", en: "Here's your seafood pasta, and dessert is on the house tonight.", ko: "해산물 파스타 나왔습니다. 오늘 디저트는 서비스로 드릴게요." },
      { sp: "B", en: "Oh, that's very kind. Thank you for handling it so well.", ko: "와, 감사합니다. 잘 처리해 주셔서 고마워요." }
    ]
  },
  {
    id: "dd004", level: "lv4", icon: "💻", title: "재택근무에 대한 토론",
    lines: [
      { sp: "A", en: "Honestly, I think we're more productive working from home.", ko: "솔직히 우리는 재택근무할 때 더 생산적인 것 같아요." },
      { sp: "B", en: "I see your point, but I feel like collaboration suffers.", ko: "무슨 말인지 알겠는데, 협업이 잘 안 되는 느낌이에요." },
      { sp: "A", en: "That's fair. Brainstorming is definitely better in person.", ko: "일리 있어요. 브레인스토밍은 확실히 대면이 낫죠." },
      { sp: "B", en: "Maybe a hybrid schedule is the best compromise.", ko: "하이브리드 근무가 최선의 절충안일지도요." },
      { sp: "A", en: "Agreed. Two days in the office would be ideal for me.", ko: "동의해요. 저는 주 2일 출근이 이상적일 것 같아요." },
      { sp: "B", en: "Same here. Let's bring it up at the next team meeting.", ko: "저도요. 다음 팀 회의 때 이 얘기를 꺼내 봅시다." }
    ]
  }
]);

[].push.apply(DIALOGS, [{
  id: "dd0707", level: "lv3", icon: "💇", title: "미용실에서 원하는 스타일 말하기",
  lines: [
    { sp: "B", en: "Hi, I have a two o'clock appointment. I'd just like a trim—nothing drastic.", ko: "안녕하세요, 2시에 예약했는데요. 그냥 살짝 다듬기만 하고 크게 바꾸진 않을 거예요." },
    { sp: "A", en: "Sure thing. How much length are we taking off today?", ko: "네, 알겠습니다. 오늘 길이는 얼마나 자를까요?" },
    { sp: "B", en: "Just an inch or so. I'm trying to grow it out, but the ends are a mess.", ko: "2~3센티 정도만요. 기르는 중인데 끝이 좀 엉망이라서요." },
    { sp: "A", en: "Got it. I'll clean up the split ends and add a few layers to give it some shape.", ko: "알겠어요. 갈라진 끝을 정리하고 층을 살짝 내서 모양을 잡아 드릴게요." },
    { sp: "B", en: "That sounds perfect. Oh, and could you go a little lighter on the bangs?", ko: "딱 좋네요. 아, 그리고 앞머리는 조금만 가볍게 해 주시겠어요?" },
    { sp: "A", en: "Absolutely. Do you want me to touch up your color while you're here?", ko: "그럼요. 오신 김에 염색도 손봐 드릴까요?" },
    { sp: "B", en: "Maybe next time. Let's just play it safe today.", ko: "다음에 할게요. 오늘은 그냥 무난하게 가죠." },
    { sp: "A", en: "No problem. Sit back and relax—I'll have you out of here in about half an hour.", ko: "알겠습니다. 편히 기대서 쉬고 계세요—30분 정도면 끝날 거예요." }
  ]
}]);

[].push.apply(DIALOGS, [{
  id: "dd0708", level: "lv4", icon: "🔧", title: "자동차 정비소에서 수리 맡기기",
  lines: [
    { sp: "B", en: "Hi, my car's been making this weird rattling noise, and the check-engine light just came on.", ko: "안녕하세요, 차에서 이상하게 덜컹거리는 소리가 나는데, 엔진 경고등도 방금 들어왔어요." },
    { sp: "A", en: "Let's pop the hood and take a look. When did you first notice it acting up?", ko: "보닛 열고 한번 봅시다. 차가 말썽 부리기 시작한 게 언제부터예요?" },
    { sp: "B", en: "About a week ago. I was hoping it was nothing, but it's only gotten worse.", ko: "일주일쯤 전에요. 별거 아니길 바랐는데, 점점 더 심해지기만 하네요." },
    { sp: "A", en: "Could be the timing belt. I'll run a quick diagnostic before we jump to conclusions.", ko: "타이밍 벨트 문제일 수도 있어요. 성급하게 단정 짓기 전에 간단히 진단부터 돌려볼게요." },
    { sp: "B", en: "Sounds good. Any idea what it'll run me, ballpark?", ko: "좋아요. 대충 얼마나 나올지 감이 오세요?" },
    { sp: "A", en: "Hard to say until I get in there, but I'll call you with an estimate before I touch anything.", ko: "직접 들여다보기 전엔 말하기 어렵지만, 뭐라도 손대기 전에 견적 내서 전화드릴게요." },
    { sp: "B", en: "I'd appreciate that. I can't afford to have it break down on the highway again.", ko: "그래 주시면 감사하죠. 또 고속도로에서 차가 퍼지면 정말 곤란하거든요." },
    { sp: "A", en: "Totally understand. Leave it with me and I'll have it up and running by tomorrow afternoon.", ko: "충분히 이해해요. 저한테 맡겨 두시면 내일 오후까지 다시 굴러가게 해 드릴게요." }
  ]
}]);
[].push.apply(DIALOGS, [{
  id: "dd0710", level: "lv3", icon: "💪", title: "헬스장 회원 등록하기",
  lines: [
    { sp: "B", en: "Hi, I'm interested in signing up. What kind of membership plans do you offer?", ko: "안녕하세요, 등록하고 싶은데요. 어떤 회원권 종류가 있나요?" },
    { sp: "A", en: "We've got a monthly plan and an annual one. The annual works out cheaper if you're in it for the long haul.", ko: "월간과 연간이 있어요. 오래 다니실 거면 연간이 더 저렴하게 나와요." },
    { sp: "B", en: "That makes sense. Is there a sign-up fee I should know about?", ko: "그렇군요. 제가 알아 둬야 할 등록비가 따로 있나요?" },
    { sp: "A", en: "There's a small one-time fee, but we're waiving it this month as a promotion.", ko: "일회성 소액 등록비가 있는데, 이번 달엔 프로모션으로 면제해 드리고 있어요." },
    { sp: "B", en: "Great. Can I freeze my membership if I go out of town for a while?", ko: "좋네요. 한동안 여행 가면 회원권을 정지할 수 있나요?" },
    { sp: "A", en: "Absolutely. Just give us a heads-up a few days in advance and we'll put it on hold.", ko: "그럼요. 며칠 전에 미리 알려만 주시면 정지해 드릴게요." },
    { sp: "B", en: "Perfect. Let's go ahead and set it up.", ko: "완벽해요. 그럼 등록 진행할게요." },
    { sp: "A", en: "Great choice! Let me get a few details, and I'll show you around afterward.", ko: "잘 결정하셨어요! 몇 가지 정보만 받고, 그다음에 시설을 구경시켜 드릴게요." }
  ]
}]);

[].push.apply(DIALOGS, [{
  id: "dd0712", level: "lv3", icon: "🛂", title: "공항 입국심사",
  lines: [
    { sp: "A", en: "Good morning. May I see your passport and customs form, please?", ko: "안녕하세요. 여권과 세관 신고서를 보여 주시겠어요?" },
    { sp: "B", en: "Here you go. I filled out the form on the plane.", ko: "여기 있습니다. 신고서는 기내에서 작성했어요." },
    { sp: "A", en: "What's the purpose of your visit, and how long are you planning to stay?", ko: "방문 목적이 무엇이고, 얼마나 머무를 예정인가요?" },
    { sp: "B", en: "I'm here for sightseeing. I'll be staying for two weeks.", ko: "관광하러 왔어요. 2주 동안 머무를 예정입니다." },
    { sp: "A", en: "Where will you be staying during your trip?", ko: "여행 중에는 어디에 머무실 건가요?" },
    { sp: "B", en: "I've booked a hotel downtown. I can pull up the reservation on my phone if you need it.", ko: "시내 호텔을 예약했어요. 필요하시면 휴대폰으로 예약 내역을 띄워 드릴 수 있어요." },
    { sp: "A", en: "That won't be necessary. Are you carrying more than ten thousand dollars in cash?", ko: "그럴 필요는 없습니다. 현금을 1만 달러 넘게 소지하고 계신가요?" },
    { sp: "B", en: "No, nothing close to that. Just some spending money.", ko: "아니요, 그 근처도 안 돼요. 쓸 돈만 조금 있어요." }
  ]
}]);
// end of dialogs-daily.js
