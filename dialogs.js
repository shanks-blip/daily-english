// ============================================================
// 상황별 회화 다이얼로그
// 추가 방법: DIALOGS 배열에 같은 형식으로 추가.
// sp: "A" 또는 "B" (말하는 사람), en/ko: 대사
// ============================================================

const DIALOGS = [
  // ---------- Lv.1 ----------
  {
    id: "d101", level: "lv1", icon: "☕", title: "카페에서 주문하기",
    lines: [
      { sp: "A", en: "Hi, what can I get for you?", ko: "안녕하세요, 뭘 드릴까요?" },
      { sp: "B", en: "Can I get an iced americano, please?", ko: "아이스 아메리카노 한 잔 주세요." },
      { sp: "A", en: "What size would you like?", ko: "어떤 사이즈로 드릴까요?" },
      { sp: "B", en: "A medium, please.", ko: "중간 사이즈로 주세요." },
      { sp: "A", en: "For here or to go?", ko: "매장에서 드시나요, 가져가시나요?" },
      { sp: "B", en: "To go, please.", ko: "가져갈게요." },
      { sp: "A", en: "That will be four dollars.", ko: "4달러입니다." },
      { sp: "B", en: "Here you go. Thank you!", ko: "여기요. 감사합니다!" }
    ]
  },
  {
    id: "d102", level: "lv1", icon: "🗺️", title: "길 묻기",
    lines: [
      { sp: "B", en: "Excuse me, how do I get to the subway station?", ko: "실례합니다, 지하철역에 어떻게 가나요?" },
      { sp: "A", en: "Go straight and turn left at the bank.", ko: "쭉 가시다가 은행에서 왼쪽으로 도세요." },
      { sp: "B", en: "Is it far from here?", ko: "여기서 먼가요?" },
      { sp: "A", en: "No, it takes about five minutes on foot.", ko: "아니요, 걸어서 5분 정도 걸려요." },
      { sp: "B", en: "Thank you so much!", ko: "정말 감사합니다!" },
      { sp: "A", en: "You are welcome. Have a nice day!", ko: "천만에요. 좋은 하루 보내세요!" }
    ]
  },
  {
    id: "d103", level: "lv1", icon: "👋", title: "처음 만난 사람과 인사",
    lines: [
      { sp: "A", en: "Hi, I am Minsu. Nice to meet you.", ko: "안녕하세요, 민수예요. 만나서 반가워요." },
      { sp: "B", en: "Nice to meet you too. I am Sarah.", ko: "저도 반가워요. 사라예요." },
      { sp: "A", en: "Where are you from, Sarah?", ko: "사라 씨는 어디에서 오셨어요?" },
      { sp: "B", en: "I am from Canada. How about you?", ko: "캐나다에서 왔어요. 민수 씨는요?" },
      { sp: "A", en: "I am from Korea. Is this your first visit here?", ko: "한국에서 왔어요. 여기는 처음 방문이세요?" },
      { sp: "B", en: "Yes, and I love it so far!", ko: "네, 지금까지 너무 좋아요!" }
    ]
  },

  // ---------- Lv.2 ----------
  {
    id: "d201", level: "lv2", icon: "🍽️", title: "식당에서 주문과 요청",
    lines: [
      { sp: "A", en: "Are you ready to order?", ko: "주문하시겠어요?" },
      { sp: "B", en: "Yes, I will have the grilled chicken salad.", ko: "네, 그릴드 치킨 샐러드로 할게요." },
      { sp: "A", en: "Anything to drink?", ko: "마실 것은요?" },
      { sp: "B", en: "Just water is fine.", ko: "물이면 돼요." },
      { sp: "B", en: "Excuse me, could we get some more napkins?", ko: "저기요, 냅킨 좀 더 주시겠어요?" },
      { sp: "A", en: "Of course, right away.", ko: "물론이죠, 바로 드릴게요." },
      { sp: "B", en: "Could I get the check, please?", ko: "계산서 주시겠어요?" },
      { sp: "A", en: "Sure, I will bring it right over.", ko: "네, 바로 가져다드릴게요." }
    ]
  },
  {
    id: "d202", level: "lv2", icon: "🛍️", title: "옷 가게에서 교환하기",
    lines: [
      { sp: "B", en: "Hi, I would like to exchange this shirt.", ko: "안녕하세요, 이 셔츠를 교환하고 싶은데요." },
      { sp: "A", en: "Sure. Is there a problem with it?", ko: "네. 무슨 문제가 있나요?" },
      { sp: "B", en: "It is too small. Do you have a bigger size?", ko: "너무 작아서요. 더 큰 사이즈 있나요?" },
      { sp: "A", en: "Let me check. Do you have the receipt?", ko: "확인해 볼게요. 영수증 있으세요?" },
      { sp: "B", en: "Yes, here it is.", ko: "네, 여기요." },
      { sp: "A", en: "We have a large in stock. Here you go.", ko: "라지 사이즈 재고가 있네요. 여기 있습니다." },
      { sp: "B", en: "Perfect. Thank you for your help!", ko: "딱 좋네요. 도와주셔서 감사해요!" }
    ]
  },
  {
    id: "d203", level: "lv2", icon: "🏥", title: "병원 예약하기",
    lines: [
      { sp: "B", en: "Hello, I would like to make an appointment.", ko: "여보세요, 진료 예약을 하고 싶은데요." },
      { sp: "A", en: "What seems to be the problem?", ko: "어디가 불편하세요?" },
      { sp: "B", en: "I have a sore throat and a slight fever.", ko: "목이 아프고 열이 조금 있어요." },
      { sp: "A", en: "Can you come in tomorrow at ten?", ko: "내일 10시에 오실 수 있나요?" },
      { sp: "B", en: "Yes, that works for me.", ko: "네, 괜찮아요." },
      { sp: "A", en: "May I have your name, please?", ko: "성함이 어떻게 되세요?" },
      { sp: "B", en: "It is Kim Jiho. Thank you!", ko: "김지호입니다. 감사합니다!" }
    ]
  },
  {
    id: "d204", level: "lv2", icon: "⛅", title: "날씨 스몰토크",
    lines: [
      { sp: "A", en: "It is freezing today, isn't it?", ko: "오늘 정말 춥네요, 그렇죠?" },
      { sp: "B", en: "Yeah, the temperature dropped suddenly.", ko: "네, 기온이 갑자기 떨어졌어요." },
      { sp: "A", en: "I heard it might snow this weekend.", ko: "이번 주말에 눈이 올 수도 있대요." },
      { sp: "B", en: "Really? I should cancel my hiking plans then.", ko: "정말요? 그럼 등산 계획을 취소해야겠네요." },
      { sp: "A", en: "Good idea. Stay warm!", ko: "좋은 생각이에요. 따뜻하게 지내세요!" }
    ]
  },

  // ---------- Lv.3 ----------
  {
    id: "d301", level: "lv3", icon: "📅", title: "회의 일정 조율",
    lines: [
      { sp: "A", en: "Do you have time for a meeting this week?", ko: "이번 주에 회의할 시간 있으세요?" },
      { sp: "B", en: "I am pretty busy, but I could do Thursday afternoon.", ko: "꽤 바쁘지만 목요일 오후는 가능해요." },
      { sp: "A", en: "Thursday works. How about two o'clock?", ko: "목요일 좋아요. 2시 어때요?" },
      { sp: "B", en: "Could we push it to three? I have a deadline that day.", ko: "3시로 미룰 수 있을까요? 그날 마감이 있어서요." },
      { sp: "A", en: "No problem. I will send you a calendar invite.", ko: "문제없어요. 캘린더 초대 보낼게요." },
      { sp: "B", en: "Great. I look forward to it.", ko: "좋아요. 기대할게요." }
    ]
  },
  {
    id: "d302", level: "lv3", icon: "📦", title: "배송 문제 항의 전화",
    lines: [
      { sp: "B", en: "Hi, I am calling about my order. It has not arrived yet.", ko: "안녕하세요, 주문 건으로 전화드렸어요. 아직 도착을 안 해서요." },
      { sp: "A", en: "I am sorry about that. Can I have your order number?", ko: "죄송합니다. 주문 번호를 알려주시겠어요?" },
      { sp: "B", en: "It is 58204. It was supposed to arrive last Friday.", ko: "58204예요. 지난 금요일에 왔어야 했거든요." },
      { sp: "A", en: "I see. It looks like the package was delayed at the warehouse.", ko: "확인했습니다. 창고에서 배송이 지연된 것 같네요." },
      { sp: "B", en: "That is frustrating. When can I expect it?", ko: "답답하네요. 언제쯤 받을 수 있을까요?" },
      { sp: "A", en: "It should arrive within two days. We will refund the shipping fee.", ko: "이틀 안에 도착할 거예요. 배송비는 환불해 드리겠습니다." },
      { sp: "B", en: "Okay, I appreciate that.", ko: "알겠습니다, 감사합니다." }
    ]
  },
  {
    id: "d303", level: "lv3", icon: "💼", title: "동료와 업무 대화",
    lines: [
      { sp: "A", en: "How is the report coming along?", ko: "보고서는 잘 되어 가요?" },
      { sp: "B", en: "Almost done. I am struggling with the last section, though.", ko: "거의 다 됐어요. 그런데 마지막 부분에서 애먹고 있어요." },
      { sp: "A", en: "Want me to take a look? A fresh perspective might help.", ko: "제가 한번 볼까요? 새로운 시각이 도움이 될 수도 있어요." },
      { sp: "B", en: "That would be great. I really appreciate it.", ko: "그러면 정말 좋죠. 정말 감사해요." },
      { sp: "A", en: "No problem. Let's go over it after lunch.", ko: "별말씀을요. 점심 먹고 같이 봐요." },
      { sp: "B", en: "Perfect. I will buy the coffee then.", ko: "좋아요. 그럼 커피는 제가 살게요." }
    ]
  }
];
// end of dialogs.js
