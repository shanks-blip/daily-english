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
[].push.apply(DIALOGS, [{
  id: "dd0714", level: "lv3", icon: "📮", title: "우체국에서 소포 보내기",
  lines: [
    { sp: "A", en: "Hi, I'd like to send this package to Korea. What are my options?", ko: "안녕하세요, 이 소포를 한국으로 보내고 싶은데요. 어떤 방법들이 있나요?" },
    { sp: "B", en: "Sure. Priority mail takes about six to ten business days, or express gets it there in three to five.", ko: "네. 우선 취급 우편은 영업일 기준 6~10일 정도 걸리고, 특급은 3~5일이면 도착해요." },
    { sp: "A", en: "How much would express run me? I don't want it to cost an arm and a leg.", ko: "특급은 얼마나 나올까요? 너무 비싸게 물고 싶지는 않아서요." },
    { sp: "B", en: "Let me weigh it first. Okay, it comes out to about sixty-five dollars.", ko: "먼저 무게를 재 볼게요. 네, 대략 65달러 나오네요." },
    { sp: "A", en: "That's steep. I'll just go with priority then. There are a few fragile items inside, though.", ko: "꽤 비싸네요. 그럼 그냥 우선 취급으로 할게요. 그런데 안에 깨지기 쉬운 물건이 몇 개 있어요." },
    { sp: "B", en: "No problem, I'll mark it as fragile. You'll need to fill out this customs form with the contents and their value.", ko: "문제없어요, 파손 주의로 표시해 드릴게요. 이 세관 신고서에 내용물과 가격을 기입해 주셔야 해요." },
    { sp: "A", en: "Got it. And can I get a tracking number so I can keep an eye on it?", ko: "알겠습니다. 그리고 배송 조회할 수 있게 추적 번호도 받을 수 있나요?" },
    { sp: "B", en: "Of course, tracking is included. It'll be on your receipt.", ko: "물론이죠, 추적 서비스는 포함되어 있어요. 영수증에 나와 있을 거예요." }
  ]
}]);
[].push.apply(DIALOGS, [{
  id: "dd0716", level: "lv3", icon: "🏢", title: "이웃과 소음 문제 이야기하기",
  lines: [
    { sp: "A", en: "Hey, sorry to bother you, but could you keep it down a bit after ten? The music comes right through the wall.", ko: "저기, 귀찮게 해서 미안한데, 10시 이후엔 소리 좀 줄여 줄 수 있어요? 음악이 벽을 그대로 타고 넘어와서요." },
    { sp: "B", en: "Oh no, I'm so sorry. I had no idea it was that loud.", ko: "어머, 정말 죄송해요. 그렇게 시끄러운 줄 전혀 몰랐어요." },
    { sp: "A", en: "It's usually fine, but I've got early shifts these days, and I've been putting up with it for a couple of weeks.", ko: "평소엔 괜찮은데, 요즘 아침 일찍 출근하거든요. 몇 주째 참고 있었어요." },
    { sp: "B", en: "You should've told me sooner! I'll move the speaker away from the wall tonight.", ko: "진작 말씀하시지 그랬어요! 오늘 밤에 스피커를 벽에서 떨어뜨려 놓을게요." },
    { sp: "A", en: "Thanks, I really appreciate it. Other than that, you've been a great neighbor.", ko: "고마워요, 정말 감사해요. 그것만 빼면 정말 좋은 이웃이세요." },
    { sp: "B", en: "Ha, thanks. If it ever gets loud again, don't hesitate to knock on my door.", ko: "하하, 고맙습니다. 또 시끄러우면 망설이지 말고 문 두드리세요." },
    { sp: "A", en: "Will do. Have a good night!", ko: "그럴게요. 좋은 밤 보내세요!" }
  ]
}]);
[].push.apply(DIALOGS, [{
  id: "dd0718", level: "lv3", icon: "💊", title: "약국에서 증상 말하고 약 사기",
  lines: [
    { sp: "A", en: "Hi, I think I'm coming down with a cold. Could you recommend something?", ko: "안녕하세요, 감기 기운이 있는 것 같은데요. 뭐 좀 추천해 주시겠어요?" },
    { sp: "B", en: "Sure. What are your symptoms?", ko: "네. 증상이 어떠세요?" },
    { sp: "A", en: "I've got a sore throat and a runny nose, and I can't stop sneezing.", ko: "목이 따갑고 콧물이 나고, 재채기가 멈추질 않아요." },
    { sp: "B", en: "This one should do the trick. Take one tablet every six hours after meals.", ko: "이거면 효과가 있을 거예요. 식후 6시간마다 한 알씩 드세요." },
    { sp: "A", en: "Will it make me drowsy? I have to drive to work.", ko: "먹으면 졸린가요? 운전해서 출근해야 하거든요." },
    { sp: "B", en: "It can, so take the daytime kind in the morning. The drowsiness wears off after a few hours anyway.", ko: "그럴 수 있어요. 그러니 아침엔 주간용으로 드세요. 어차피 졸음은 몇 시간 지나면 가라앉아요." },
    { sp: "A", en: "Perfect. I'll take a box, and some throat lozenges too, please.", ko: "좋네요. 한 통 주시고, 목캔디도 좀 주세요." },
    { sp: "B", en: "That comes to twelve fifty. Feel better soon!", ko: "12달러 50센트입니다. 얼른 나으세요!" }
  ]
}]);
[].push.apply(DIALOGS, [{
  id: "dd0720", level: "lv3", icon: "👛", title: "분실물 센터에서 지갑 찾기",
  lines: [
    { sp: "A", en: "Excuse me, I think I left my wallet on the train this morning. Has anyone turned it in?", ko: "실례합니다, 오늘 아침 기차에 지갑을 두고 내린 것 같은데요. 혹시 들어온 물건 있나요?" },
    { sp: "B", en: "Let me check. Can you describe it for me?", ko: "확인해 볼게요. 어떻게 생긴 지갑인지 설명해 주시겠어요?" },
    { sp: "A", en: "It's a brown leather wallet with a small scratch on the corner. My ID and two credit cards are in it.", ko: "갈색 가죽 지갑이고 모서리에 작은 흠집이 있어요. 안에 신분증이랑 신용카드 두 장이 들어 있고요." },
    { sp: "B", en: "Hmm, nothing matching that so far. When did you notice it was missing?", ko: "음, 아직 그런 지갑은 안 들어왔네요. 없어진 건 언제 아셨어요?" },
    { sp: "A", en: "Around nine, right after I got off at Central Station. I retraced my steps, but no luck.", ko: "9시쯤에요, 센트럴역에서 내리자마자요. 왔던 길을 되짚어 봤는데 못 찾았어요." },
    { sp: "B", en: "Okay, I'll file a report and keep an eye out. If it turns up, we'll call you right away.", ko: "알겠습니다. 신고 접수해 두고 계속 지켜볼게요. 지갑이 나오면 바로 전화드릴게요." },
    { sp: "A", en: "I'd appreciate that. Should I cancel my cards in the meantime, just to be safe?", ko: "감사합니다. 혹시 모르니 그동안 카드는 정지해 두는 게 좋을까요?" },
    { sp: "B", en: "I'd say so. Better safe than sorry.", ko: "그러는 게 좋겠어요. 나중에 후회하는 것보다 조심하는 게 낫죠." }
  ]
}]);
[].push.apply(DIALOGS, [{
  id: "dd0722", level: "lv3", icon: "📶", title: "인터넷 고장 신고 전화",
  lines: [
    { sp: "A", en: "Hi, my internet has been on the fritz since last night. It keeps cutting out every few minutes.", ko: "안녕하세요, 어젯밤부터 인터넷이 계속 말썽이에요. 몇 분마다 끊기네요." },
    { sp: "B", en: "Sorry about that. Let me run a quick check on your line. Could you verify your account number?", ko: "불편을 드려 죄송합니다. 회선을 바로 점검해 볼게요. 계정 번호를 확인해 주시겠어요?" },
    { sp: "A", en: "Sure, it's 5501-2277.", ko: "네, 5501-2277이에요." },
    { sp: "B", en: "Thanks. I do see some signal issues on our end. Could you unplug the router and plug it back in?", ko: "감사합니다. 저희 쪽에서도 신호 문제가 확인되네요. 공유기를 뽑았다가 다시 꽂아 주시겠어요?" },
    { sp: "A", en: "Okay, give me a second... All right, it's rebooting now.", ko: "네, 잠시만요... 좋아요, 지금 재부팅되고 있어요." },
    { sp: "B", en: "Great. If it keeps acting up after this, we'll send a technician over tomorrow morning.", ko: "좋습니다. 이후에도 계속 말썽이면 내일 오전에 기사님을 보내 드릴게요." },
    { sp: "A", en: "That works. Could you walk me through how to check the signal myself next time?", ko: "그러면 되겠네요. 다음번엔 제가 직접 신호를 확인할 수 있게 방법 좀 알려 주시겠어요?" },
    { sp: "B", en: "Of course. I'll text you a link with step-by-step instructions.", ko: "물론이죠. 단계별 안내 링크를 문자로 보내 드릴게요." }
  ]
}]);
[].push.apply(DIALOGS, [{
  id: "dd0724", level: "lv3", icon: "🏝️", title: "상사에게 휴가 요청하기",
  lines: [
    { sp: "A", en: "Do you have a minute? I wanted to put in for some vacation time next month.", ko: "잠깐 시간 되세요? 다음 달에 휴가를 좀 신청하고 싶어서요." },
    { sp: "B", en: "Sure, have a seat. Which days did you have in mind?", ko: "그럼요, 앉으세요. 어느 날짜를 생각하고 있어요?" },
    { sp: "A", en: "The week of the 15th, if that works. I know things get busy around then.", ko: "가능하다면 15일이 있는 주로요. 그때쯤 바빠지는 거 알아요." },
    { sp: "B", en: "It's doable, but we'll be a little short-staffed. Can anyone cover for you?", ko: "가능하긴 한데 인력이 조금 부족할 거예요. 누가 대신 일해 줄 수 있나요?" },
    { sp: "A", en: "Mia already offered to fill in while I'm out.", ko: "미아가 제가 없는 동안 대신해 주겠다고 이미 얘기했어요." },
    { sp: "B", en: "Perfect. Just make sure your projects are wrapped up before you leave.", ko: "좋네요. 떠나기 전에 맡은 일들만 잘 마무리해 두세요." },
    { sp: "A", en: "Will do. I'll block out time next week to hand everything off.", ko: "그럴게요. 다음 주에 시간을 비워서 업무 인수인계할게요." },
    { sp: "B", en: "Sounds good. I'll approve the request this afternoon.", ko: "좋아요. 오늘 오후에 요청을 승인해 둘게요." }
  ]
}]);
[].push.apply(DIALOGS, [{
  id: "dd0726", level: "lv3", icon: "👔", title: "세탁소에 옷 맡기기",
  lines: [
    { sp: "A", en: "Hi, I'd like to drop off a couple of suits and this dress.", ko: "안녕하세요, 정장 두 벌이랑 이 원피스를 맡기려고요." },
    { sp: "B", en: "Sure. Just so you know, there's a stubborn stain here on the collar.", ko: "네. 참고로 여기 옷깃에 잘 안 지워지는 얼룩이 있네요." },
    { sp: "A", en: "Oh, I spilled some coffee on it. Do you think you can get it out?", ko: "아, 커피를 좀 흘렸어요. 그거 뺄 수 있을까요?" },
    { sp: "B", en: "We'll do our best, but I can't promise it'll come out completely.", ko: "최선을 다해 볼게요. 다만 완전히 빠진다고 장담은 못 드려요." },
    { sp: "A", en: "That's fine. By any chance, could I pick them up by Friday?", ko: "괜찮아요. 혹시 금요일까지 찾아갈 수 있을까요?" },
    { sp: "B", en: "Friday's a bit tight, but we can rush it for a small extra fee.", ko: "금요일은 좀 빠듯한데, 약간의 추가 요금을 주시면 급하게 처리해 드릴 수 있어요." },
    { sp: "A", en: "Let's do that. I'll swing by after work on Friday.", ko: "그렇게 할게요. 금요일에 퇴근하고 들를게요." },
    { sp: "B", en: "Perfect. Here's your ticket—please don't lose it.", ko: "좋아요. 여기 접수증이요. 잃어버리지 마세요." }
  ]
}]);
[].push.apply(DIALOGS, [{
  id: "dd0728", level: "lv3", icon: "🐶", title: "이웃에게 반려견 봐 달라 부탁하기",
  lines: [
    { sp: "A", en: "Hey, I hate to ask on such short notice, but could you look after my dog this weekend?", ko: "저기, 이렇게 갑자기 부탁해서 미안한데, 이번 주말에 우리 강아지 좀 봐 줄 수 있어?" },
    { sp: "B", en: "Sure, I'd be happy to. Are you heading out of town?", ko: "물론이지, 기꺼이 봐 줄게. 어디 멀리 가?" },
    { sp: "A", en: "Yeah, a family thing came up. I'll be gone from Saturday morning till Sunday night.", ko: "응, 집안일이 좀 생겨서. 토요일 아침부터 일요일 밤까지 자리를 비워." },
    { sp: "B", en: "No problem. What do I need to do, just feed her and let her out?", ko: "문제없어. 뭘 하면 돼? 그냥 밥 주고 밖에 좀 내보내면 돼?" },
    { sp: "A", en: "Pretty much. Feed her twice a day, and take her for a short walk if you can swing it.", ko: "거의 그거야. 하루 두 번 밥 주고, 가능하면 잠깐 산책도 시켜 주면 좋고." },
    { sp: "B", en: "Easy enough. Should I drop by your place, or are you leaving her with me?", ko: "그 정도야 쉽지. 내가 너희 집에 들르면 돼, 아니면 우리 집에 맡기는 거야?" },
    { sp: "A", en: "I'll drop her off at yours—she settles in faster in a new place with company.", ko: "내가 너희 집에 데려다줄게. 걔는 같이 있어 주는 사람이 있으면 새 장소에도 금방 적응하거든." },
    { sp: "B", en: "Works for me. Don't worry about a thing—she'll be in good hands.", ko: "난 좋아. 아무 걱정 하지 마. 잘 돌봐 줄게." }
  ]
}]);
[].push.apply(DIALOGS, [{
  id: "dd0730", level: "lv3", icon: "📦", title: "친구에게 이사 도와달라 부탁하기",
  lines: [
    { sp: "A", en: "Hey, are you free this Saturday? I could really use a hand moving into my new place.", ko: "저기, 이번 토요일에 시간 돼? 새 집으로 이사하는데 손 좀 빌렸으면 해서." },
    { sp: "B", en: "Yeah, I'm free. How much stuff are we talking about?", ko: "응, 시간 돼. 짐이 얼마나 되는데?" },
    { sp: "A", en: "Not too much—mostly boxes and a couple of pieces of furniture. It shouldn't take all day.", ko: "그렇게 많진 않아. 대부분 상자들이랑 가구 몇 개 정도. 하루 종일 걸리진 않을 거야." },
    { sp: "B", en: "Okay, count me in. Should I bring my brother? He could pitch in with the heavy stuff.", ko: "좋아, 나도 낄게. 우리 형 데려올까? 무거운 건 형이 거들어 줄 수 있어." },
    { sp: "A", en: "That would be a lifesaver. The couch is the only thing I'm worried about.", ko: "그럼 완전 살았지. 소파가 유일하게 걱정되는 거야." },
    { sp: "B", en: "No worries, we'll figure it out. What time should we swing by?", ko: "걱정 마, 어떻게든 될 거야. 몇 시에 들르면 돼?" },
    { sp: "A", en: "Around nine, if that's not too early. I'll have coffee and pizza to make up for it.", ko: "너무 이르지 않으면 아홉 시쯤. 대신 커피랑 피자 준비해 놓을게." },
    { sp: "B", en: "Sold. See you Saturday morning.", ko: "콜. 토요일 아침에 봐." }
  ]
}]);
[].push.apply(DIALOGS, [{
  id: "dd0801", level: "lv3", icon: "🧾", title: "식당에서 계산서 나눠 내기",
  lines: [
    { sp: "A", en: "That was a great meal. Should we just split the bill down the middle?", ko: "정말 잘 먹었다. 그냥 계산서 반씩 나눠서 낼까?" },
    { sp: "B", en: "Honestly, I only had the salad, so maybe we should figure out who had what.", ko: "솔직히 난 샐러드만 먹어서, 누가 뭘 먹었는지 따져 보는 게 나을 것 같아." },
    { sp: "A", en: "Fair enough. You chip in for your salad and a drink, and I'll cover the rest.", ko: "그게 맞겠다. 넌 샐러드랑 음료 값만 보태고, 나머지는 내가 낼게." },
    { sp: "B", en: "Works for me. Want me to leave the tip so it evens out?", ko: "난 좋아. 그럼 균형 맞게 팁은 내가 남길까?" },
    { sp: "A", en: "That'd be perfect. Do you want to just Venmo me your share later?", ko: "그럼 딱 좋겠다. 네 몫은 이따가 그냥 벤모로 보내 줄래?" },
    { sp: "B", en: "Sure, I'll send it over as soon as we're back. Thanks for picking up the bigger part.", ko: "그래, 돌아가자마자 보낼게. 더 많이 내줘서 고마워." },
    { sp: "A", en: "No problem—you can get the next one. Let's do this again soon.", ko: "괜찮아, 다음엔 네가 사면 돼. 조만간 또 오자." }
  ]
}]);

// end of dialogs-daily.js
