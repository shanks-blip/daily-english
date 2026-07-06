// ============================================================
// 추가 회화 다이얼로그 — DIALOGS에 이어 붙습니다.
// ============================================================

[].push.apply(DIALOGS, [
  {
    id: "d205", level: "lv2", icon: "✈️", title: "공항 체크인",
    lines: [
      { sp: "A", en: "Good morning. May I see your passport?", ko: "안녕하세요. 여권 보여주시겠어요?" },
      { sp: "B", en: "Here you go.", ko: "여기 있습니다." },
      { sp: "A", en: "Are you checking any bags?", ko: "부치실 짐이 있으신가요?" },
      { sp: "B", en: "Yes, just this one suitcase.", ko: "네, 이 여행 가방 하나요." },
      { sp: "A", en: "Would you like a window or an aisle seat?", ko: "창가와 통로 좌석 중 어느 쪽으로 드릴까요?" },
      { sp: "B", en: "A window seat, please.", ko: "창가 좌석으로 주세요." },
      { sp: "A", en: "Here is your boarding pass. Boarding starts at gate twelve.", ko: "탑승권입니다. 12번 게이트에서 탑승합니다." },
      { sp: "B", en: "Thank you. Have a nice day!", ko: "감사합니다. 좋은 하루 되세요!" }
    ]
  },
  {
    id: "d206", level: "lv2", icon: "🏨", title: "호텔 체크인",
    lines: [
      { sp: "B", en: "Hi, I have a reservation under Kim.", ko: "안녕하세요, 김으로 예약했는데요." },
      { sp: "A", en: "Welcome! May I see your ID, please?", ko: "환영합니다! 신분증 보여주시겠어요?" },
      { sp: "B", en: "Sure. What time is breakfast?", ko: "네. 아침 식사는 몇 시예요?" },
      { sp: "A", en: "From seven to ten on the second floor.", ko: "2층에서 7시부터 10시까지예요." },
      { sp: "B", en: "Great. Is there free wifi in the room?", ko: "좋네요. 방에 무료 와이파이가 있나요?" },
      { sp: "A", en: "Yes, the password is on your key card.", ko: "네, 비밀번호는 키 카드에 적혀 있어요." },
      { sp: "B", en: "Perfect, thank you!", ko: "완벽해요, 감사합니다!" }
    ]
  },
  {
    id: "d304", level: "lv3", icon: "📞", title: "전화로 약속 변경",
    lines: [
      { sp: "B", en: "Hi, this is Jiho. I'm afraid I need to reschedule our meeting.", ko: "안녕하세요, 지호입니다. 죄송하지만 회의 일정을 변경해야 할 것 같아요." },
      { sp: "A", en: "Oh, is everything okay?", ko: "아, 무슨 일 있으세요?" },
      { sp: "B", en: "Something urgent came up at work. Could we meet on Friday instead?", ko: "회사에 급한 일이 생겨서요. 대신 금요일에 만날 수 있을까요?" },
      { sp: "A", en: "Let me check my schedule. Friday morning works for me.", ko: "일정 확인해 볼게요. 금요일 오전은 괜찮아요." },
      { sp: "B", en: "Perfect. Same place at ten?", ko: "좋아요. 같은 장소에서 10시요?" },
      { sp: "A", en: "Sounds good. Thanks for letting me know in advance.", ko: "좋습니다. 미리 알려줘서 고마워요." },
      { sp: "B", en: "Of course. Sorry again for the change.", ko: "물론이죠. 변경하게 되어 다시 한번 죄송해요." }
    ]
  },
  {
    id: "d305", level: "lv3", icon: "🤝", title: "첫 출근 자기소개",
    lines: [
      { sp: "A", en: "Everyone, this is Sujin. She is joining the marketing team today.", ko: "여러분, 수진 씨예요. 오늘부터 마케팅팀에 합류합니다." },
      { sp: "B", en: "Hi everyone. I'm excited to be here.", ko: "안녕하세요, 여러분. 함께하게 되어 기뻐요." },
      { sp: "A", en: "Sujin has five years of experience in advertising.", ko: "수진 씨는 광고 분야에서 5년 경력이 있어요." },
      { sp: "B", en: "I look forward to working with all of you.", ko: "여러분 모두와 함께 일하게 되기를 기대합니다." },
      { sp: "A", en: "If you have any questions, feel free to ask anyone.", ko: "궁금한 게 있으면 누구에게든 편하게 물어보세요." },
      { sp: "B", en: "Thank you. Please feel free to reach out anytime.", ko: "감사합니다. 언제든 편하게 말 걸어 주세요." }
    ]
  }
]);
// end of dialogs-extra.js
