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
// end of dialogs-daily.js
