// ============================================================
// 오늘의 문장 — 홈 화면에 날짜별로 하나씩 순환 표시됩니다.
// ============================================================

const SENTENCES = [
  { en: "Could you say that again?", ko: "다시 한번 말씀해 주시겠어요?", tag: "대화" },
  { en: "I'm just looking, thanks.", ko: "그냥 구경 중이에요, 감사해요.", tag: "쇼핑" },
  { en: "Long time no see!", ko: "오랜만이에요!", tag: "인사" },
  { en: "It's on me today.", ko: "오늘은 제가 살게요.", tag: "식사" },
  { en: "I'll keep that in mind.", ko: "명심할게요.", tag: "대화" },
  { en: "Sorry, I didn't catch that.", ko: "죄송해요, 못 알아들었어요.", tag: "대화" },
  { en: "What do you do for a living?", ko: "무슨 일 하세요?", tag: "스몰토크" },
  { en: "I'm on my way.", ko: "지금 가는 중이에요.", tag: "약속" },
  { en: "Take your time.", ko: "천천히 하세요.", tag: "배려" },
  { en: "It slipped my mind.", ko: "깜빡했어요.", tag: "일상" },
  { en: "That works for me.", ko: "저는 그 일정 괜찮아요.", tag: "약속" },
  { en: "Let me sleep on it.", ko: "하룻밤 생각해 볼게요.", tag: "결정" },
  { en: "I couldn't agree more.", ko: "전적으로 동의해요.", tag: "대화" },
  { en: "It's up to you.", ko: "당신이 결정하세요.", tag: "대화" },
  { en: "I have a lot on my plate.", ko: "요즘 할 일이 산더미예요.", tag: "일상" },
  { en: "Better late than never.", ko: "늦더라도 안 하는 것보단 나아요.", tag: "격려" },
  { en: "Keep me posted.", ko: "계속 소식 알려줘요.", tag: "업무" },
  { en: "I'm running late.", ko: "좀 늦을 것 같아요.", tag: "약속" },
  { en: "No worries at all.", ko: "전혀 신경 쓰지 마세요.", tag: "배려" },
  { en: "Is this seat taken?", ko: "이 자리에 누구 있나요?", tag: "외출" },
  { en: "Can I get this to go?", ko: "이거 포장해 주시겠어요?", tag: "식당" },
  { en: "I'm allergic to peanuts.", ko: "저는 땅콩 알레르기가 있어요.", tag: "식당" },
  { en: "How's it going?", ko: "요즘 어떻게 지내요?", tag: "인사" },
  { en: "It was worth the wait.", ko: "기다린 보람이 있네요.", tag: "일상" },
  { en: "Let's split the bill.", ko: "나눠서 계산해요.", tag: "식사" },
  { en: "I'll get back to you.", ko: "확인하고 다시 연락드릴게요.", tag: "업무" },
  { en: "Something came up.", ko: "갑자기 일이 생겼어요.", tag: "약속" },
  { en: "You made my day!", ko: "덕분에 오늘 기분 최고예요!", tag: "감사" },
  { en: "It doesn't ring a bell.", ko: "들어도 기억이 안 나는데요.", tag: "대화" },
  { en: "Fingers crossed!", ko: "행운을 빌어요!", tag: "격려" },
];
// end of sentences.js
