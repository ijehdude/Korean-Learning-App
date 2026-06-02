// =============================================
// KOREAN TRAVEL ESSENTIALS — app.js
// =============================================

// ---- TTS ----
const ttsSupported = 'speechSynthesis' in window;
let speakBtn = null;
let cachedVoices = [];
function loadVoices() { cachedVoices = speechSynthesis.getVoices(); }
loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;

function pickFemaleKoreanVoice() {
  const voices = cachedVoices.length ? cachedVoices : speechSynthesis.getVoices();
  return voices.find(v => v.lang === 'ko-KR' && v.name.toLowerCase().includes('female'))
      || voices.find(v => v.lang === 'ko-KR' && (v.name.includes('Yuna') || v.name.includes('Sora') || v.name.includes('Nari')))
      || voices.find(v => v.lang === 'ko-KR')
      || null;
}

function speak(text, onEnd) {
  if (!ttsSupported) return;
  speechSynthesis.cancel();
  const doSpeak = () => {
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ko-KR'; utt.rate = 0.85; utt.pitch = 1.05;
    if (speakBtn) speakBtn.classList.add('speaking');
    utt.onend  = () => { if (speakBtn) speakBtn.classList.remove('speaking'); if (onEnd) onEnd(); };
    utt.onerror = () => { if (speakBtn) speakBtn.classList.remove('speaking'); };
    const voice = pickFemaleKoreanVoice();
    if (voice) utt.voice = voice;
    speechSynthesis.speak(utt);
  };
  if (!cachedVoices.length) {
    const prev = speechSynthesis.onvoiceschanged;
    speechSynthesis.onvoiceschanged = () => { loadVoices(); if (prev) prev(); doSpeak(); };
  } else { doSpeak(); }
}

function isKorean(text) { return /[가-힯ᄀ-ᇿ]/.test(text); }

const SPEAKER_SVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M3 9H7L12 4V20L7 15H3V9Z" fill="currentColor"/><path d="M16 8.5C17.333 9.667 17.333 14.333 16 15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M19 6C21.667 8.333 21.667 15.667 19 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

// ---- MODULE DATA ----
const MODULES = [
  {
    id: 1, title: "Survival Basics", emoji: "🗣️",
    description: "Essential words and phrases every traveler needs from day one.",
    levels: [
      {
        level: 1, name: "Words", emoji: "📖",
        description: "Core vocabulary — the building blocks",
        cards: [
          { korean: "안녕", romanization: "annyeong", english: "Hi / Bye (casual)", tip: "Root of 안녕하세요. Casual use between friends — not for strangers." },
          { korean: "네", romanization: "ne", english: "Yes", tip: "Simple agreement. Also used to show you are listening." },
          { korean: "아니요", romanization: "aniyo", english: "No", tip: "Polite refusal. Softer than just shaking your head." },
          { korean: "물", romanization: "mul", english: "Water", tip: "Free in all Korean restaurants — just ask for it." },
          { korean: "화장실", romanization: "hwajangsil", english: "Bathroom / Toilet", tip: "Toilets in Korea are free and very clean. Never hesitate to ask." },
          { korean: "영어", romanization: "yeongeo", english: "English", tip: "Useful for asking if someone can help you in English." },
          { korean: "잠깐", romanization: "jamkkan", english: "A moment", tip: "Root of 잠깐만요 (just a moment, please)." },
          { korean: "천천히", romanization: "cheoncheonhi", english: "Slowly", tip: "Adverb. Pair with 말해주세요 to ask someone to speak slowly." },
          { korean: "다시", romanization: "dasi", english: "Again", tip: "Adverb. Pair with 한번 (one time) for 'once more'." },
          { korean: "도움", romanization: "doum", english: "Help (noun)", tip: "The noun form. 도와주세요 uses the verb form." },
          { korean: "사진", romanization: "sajin", english: "Photo", tip: "Always ask before photographing people or sacred places." },
          { korean: "감사", romanization: "gamsa", english: "Gratitude (root)", tip: "Root of 감사합니다. 감(feel) + 사(thank)." },
          { korean: "이름", romanization: "ireum", english: "Name", tip: "Useful at check-in or when introducing yourself." },
          { korean: "시간", romanization: "sigan", english: "Time", tip: "Can mean 'time' generally or a specific hour." },
          { korean: "괜찮아요", romanization: "gwaenchanayo", english: "It's okay / I'm fine", tip: "Means 'I'm fine', 'no thanks', or 'it's alright' depending on context." },
        ],
        scenarios: [
          { situation: "Someone asks if you're okay after bumping into you.", answer: "괜찮아요", romanization: "gwaenchanayo", english: "It's okay / I'm fine" },
          { situation: "You urgently need to find a toilet.", answer: "화장실", romanization: "hwajangsil", english: "Bathroom / Toilet" },
          { situation: "Someone offers you something you don't want.", answer: "아니요", romanization: "aniyo", english: "No" },
        ]
      },
      {
        level: 2, name: "Short Phrases", emoji: "💬",
        description: "2–3 word phrases using Level 1 words",
        cards: [
          { korean: "안녕하세요", romanization: "annyeonghaseyo", english: "Hello (formal)", tip: "안녕 + 하세요. Formal greeting, use any time of day with strangers." },
          { korean: "감사합니다", romanization: "gamsahamnida", english: "Thank you", tip: "감사 + 합니다. The most important polite phrase to know." },
          { korean: "죄송합니다", romanization: "joesonghamnida", english: "I'm sorry", tip: "Formal apology. Use with strangers and in shops." },
          { korean: "잠깐만요", romanization: "jamkkanmanyo", english: "Just a moment", tip: "잠깐 + 만요. Polite way to ask someone to wait briefly." },
          { korean: "물 주세요", romanization: "mul juseyo", english: "Water please", tip: "물 (water) + 주세요 (please give). This pattern works with any noun!" },
          { korean: "다시 한번", romanization: "dasi hanbeon", english: "Once more / Again", tip: "다시 (again) + 한번 (one time). Say before a request." },
          { korean: "맞아요", romanization: "majayo", english: "That's right", tip: "Great for confirming what someone said to you." },
          { korean: "모르겠어요", romanization: "moreugesseoyo", english: "I don't understand", tip: "Locals will often slow down or rephrase when they hear this." },
          { korean: "실례합니다", romanization: "sillyehamnida", english: "Excuse me", tip: "To get someone's attention politely — in the street or a shop." },
        ],
        scenarios: [
          { situation: "A shopkeeper helped you and you want to thank them.", answer: "감사합니다", romanization: "gamsahamnida", english: "Thank you" },
          { situation: "You want water at a restaurant.", answer: "물 주세요", romanization: "mul juseyo", english: "Water please" },
          { situation: "You need to politely get someone's attention on the street.", answer: "실례합니다", romanization: "sillyehamnida", english: "Excuse me" },
        ]
      },
      {
        level: 3, name: "Full Sentences", emoji: "🗣️",
        description: "Complete phrases for real travel situations",
        cards: [
          { korean: "천천히 말해주세요", romanization: "cheoncheonhi malhaejuseyo", english: "Please speak slowly", tip: "천천히 (slowly) + 말해주세요 (please speak). Follow with 감사합니다 when they do." },
          { korean: "화장실이 어디예요?", romanization: "hwajangsiri eodiyeyo?", english: "Where is the bathroom?", tip: "화장실 + 이 어디예요? (where is it?). One of the most essential travel questions." },
          { korean: "다시 한번 말해주세요", romanization: "dasi hanbeon malhaejuseyo", english: "Please say that again", tip: "다시 한번 (once more) + 말해주세요 (please speak)." },
          { korean: "영어 할 수 있어요?", romanization: "yeongeo hal su isseoyo?", english: "Can you speak English?", tip: "영어 + 할 수 있어요? (can you do?). Many younger Koreans can help." },
          { korean: "사진 찍어도 돼요?", romanization: "sajin jjigeodo dwaeyo?", english: "May I take a photo?", tip: "사진 + 찍어도 돼요? (is it okay to take?). Always ask first at temples." },
          { korean: "도움이 필요해요", romanization: "doumi piryohaeyo", english: "I need help", tip: "도움 + 이 필요해요 (is needed). Use when actively seeking assistance." },
          { korean: "몇 시예요?", romanization: "myeot siyeyo?", english: "What time is it?", tip: "시간 → 시 (hour) + 몇 (how many). Useful for checking schedules." },
          { korean: "안녕히 가세요", romanization: "annyeonghi gaseyo", english: "Goodbye (to someone leaving)", tip: "안녕 + 히 가세요. Said to the person who is leaving." },
        ],
        scenarios: [
          { situation: "Someone is speaking too fast and you need them to slow down.", answer: "천천히 말해주세요", romanization: "cheoncheonhi malhaejuseyo", english: "Please speak slowly" },
          { situation: "You need to ask where the bathroom is (formal).", answer: "화장실이 어디예요?", romanization: "hwajangsiri eodiyeyo?", english: "Where is the bathroom?" },
          { situation: "You want to ask if someone speaks English.", answer: "영어 할 수 있어요?", romanization: "yeongeo hal su isseoyo?", english: "Can you speak English?" },
        ]
      }
    ]
  },
  {
    id: 2, title: "Getting Around", emoji: "🚇",
    description: "Navigate subways, buses, taxis and streets with confidence.",
    levels: [
      {
        level: 1, name: "Words", emoji: "📖",
        description: "Core transport vocabulary",
        cards: [
          { korean: "왼쪽", romanization: "oenjjok", english: "Left", tip: "Point while saying this to confirm directions." },
          { korean: "오른쪽", romanization: "oreunjjok", english: "Right", tip: "Essential when giving taxi directions." },
          { korean: "직진", romanization: "jikjin", english: "Straight ahead", tip: "Use in taxis or when asking for walking directions." },
          { korean: "지하철", romanization: "jihacheol", english: "Subway", tip: "Seoul's subway is world-class and very easy to navigate." },
          { korean: "버스", romanization: "beoseu", english: "Bus", tip: "Buses in Korea are colour-coded by route type." },
          { korean: "택시", romanization: "taeksi", english: "Taxi", tip: "Use KakaoTaxi app for easy ordering with English support." },
          { korean: "공항", romanization: "gonghang", english: "Airport", tip: "Incheon (ICN) for Seoul, Jeju (CJU) for Jeju Island." },
          { korean: "역", romanization: "yeok", english: "Station", tip: "Subway stations end in 역 — e.g. 서울역 (Seoul Station)." },
          { korean: "출구", romanization: "chulgu", english: "Exit", tip: "Subway exits are numbered — check your map for the right number." },
          { korean: "입구", romanization: "ipgu", english: "Entrance", tip: "Opposite of 출구 (exit). Look for directional arrows." },
          { korean: "표", romanization: "pyo", english: "Ticket", tip: "T-money card is more convenient than single tickets." },
          { korean: "지도", romanization: "jido", english: "Map", tip: "Tourist information centres offer free maps." },
          { korean: "정류장", romanization: "jeongnyujang", english: "Stop / Bus stop", tip: "Also seen as 버스 정류장 (bus stop)." },
          { korean: "막차", romanization: "makcha", english: "Last train / Last bus", tip: "Seoul subway last trains are around midnight. Plan ahead!" },
        ],
        scenarios: [
          { situation: "You need to turn left at the junction.", answer: "왼쪽", romanization: "oenjjok", english: "Left" },
          { situation: "You're looking for the way out of the subway.", answer: "출구", romanization: "chulgu", english: "Exit" },
          { situation: "You want to take the underground metro.", answer: "지하철", romanization: "jihacheol", english: "Subway" },
        ]
      },
      {
        level: 2, name: "Short Phrases", emoji: "💬",
        description: "Combine transport words into useful phrases",
        cards: [
          { korean: "버스 정류장", romanization: "beoseu jeongnyujang", english: "Bus stop", tip: "버스 (bus) + 정류장 (stop). Look for covered blue shelters." },
          { korean: "가까워요", romanization: "gakkaweoyo", english: "It's near", tip: "Helpful to know if a destination is walkable." },
          { korean: "멀어요", romanization: "meoreoyo", english: "It's far", tip: "If you hear this, take the subway or a taxi." },
          { korean: "지도 있어요?", romanization: "jido isseoyo?", english: "Do you have a map?", tip: "지도 (map) + 있어요? (do you have?). Tourist centres always have maps." },
          { korean: "막차예요?", romanization: "makchayeyo?", english: "Is this the last train?", tip: "막차 + 예요? (is it?). Ask on the platform if unsure." },
          { korean: "여기요", romanization: "yeogiyo", english: "Here! / Stop here", tip: "Short, punchy way to tell a taxi driver to stop. Always works." },
          { korean: "지하철역", romanization: "jihacheol yeok", english: "Subway station", tip: "지하철 (subway) + 역 (station). The full compound you'll see on signs." },
          { korean: "환승이요", romanization: "hwanseungiyo", english: "Transfer please", tip: "Say at the fare gate if you need to switch lines." },
        ],
        scenarios: [
          { situation: "You're in a taxi and want the driver to stop here (short).", answer: "여기요", romanization: "yeogiyo", english: "Here! / Stop here" },
          { situation: "You asked if a place is near and someone says it is.", answer: "가까워요", romanization: "gakkaweoyo", english: "It's near" },
          { situation: "You want to ask if someone has a map.", answer: "지도 있어요?", romanization: "jido isseoyo?", english: "Do you have a map?" },
        ]
      },
      {
        level: 3, name: "Full Sentences", emoji: "🗣️",
        description: "Full phrases for navigating like a local",
        cards: [
          { korean: "여기 세워주세요", romanization: "yeogi sewojuseyo", english: "Please stop here", tip: "여기 (here) + 세워주세요 (please stop). Essential for every taxi ride." },
          { korean: "___에 어떻게 가요?", romanization: "_e eotteoke gayo?", english: "How do I get to ___?", tip: "Replace ___ with your destination name. Works anywhere." },
          { korean: "얼마나 걸려요?", romanization: "eolmana geollyeoyo?", english: "How long does it take?", tip: "Useful for estimating journey times before you set off." },
          { korean: "걸어서 갈 수 있어요?", romanization: "georeo galsu isseoyo?", english: "Can I walk there?", tip: "Koreans sometimes underestimate walking distances — also check your phone." },
          { korean: "지하철 몇 호선이에요?", romanization: "jihacheol myeot hoseoni-eyo?", english: "Which subway line?", tip: "Seoul has 9 numbered lines plus named lines — all colour-coded." },
          { korean: "몇 번 버스예요?", romanization: "myeot beon beoseuyeyo?", english: "Which bus number?", tip: "Naver Maps or KakaoMap will give you the exact bus number." },
          { korean: "이 버스 공항 가요?", romanization: "i beoseu gonghang gayo?", english: "Does this bus go to the airport?", tip: "이 버스 (this bus) + 공항 (airport) + 가요? (does it go?)." },
          { korean: "여기서 가까워요?", romanization: "yeogiseo gakkaweoyo?", english: "Is it close from here?", tip: "여기서 (from here) + 가까워요? (is it near?). Great before deciding to walk." },
        ],
        scenarios: [
          { situation: "You're in a taxi and need the driver to stop here (polite).", answer: "여기 세워주세요", romanization: "yeogi sewojuseyo", english: "Please stop here" },
          { situation: "You want to know how long the journey will take.", answer: "얼마나 걸려요?", romanization: "eolmana geollyeoyo?", english: "How long does it take?" },
          { situation: "You want to know if you can walk to your destination.", answer: "걸어서 갈 수 있어요?", romanization: "georeo galsu isseoyo?", english: "Can I walk there?" },
        ]
      }
    ]
  },
  {
    id: 3, title: "Food & Dining", emoji: "🍜",
    description: "Order food, handle dietary needs, and enjoy Korean cuisine.",
    levels: [
      {
        level: 1, name: "Words", emoji: "📖",
        description: "Key food vocabulary and must-try dishes",
        cards: [
          { korean: "밥", romanization: "bap", english: "Rice / Meal", tip: "밥 is both the word for rice and a general word for 'meal' in Korean." },
          { korean: "물", romanization: "mul", english: "Water", tip: "Free water is standard in all Korean restaurants — just ask." },
          { korean: "메뉴", romanization: "menyu", english: "Menu", tip: "Many restaurants have photo menus — great for pointing!" },
          { korean: "계산서", romanization: "gyesanseo", english: "Bill / Check", tip: "Or walk to the register — very common in Korean restaurants." },
          { korean: "비빔밥", romanization: "bibimbap", english: "Mixed rice bowl", tip: "Rice with vegetables, egg, and gochujang sauce. A must-try!" },
          { korean: "삼겹살", romanization: "samgyeopsal", english: "Grilled pork belly", tip: "Korean BBQ staple. Wrap in lettuce with garlic and ssamjang." },
          { korean: "불고기", romanization: "bulgogi", english: "Marinated beef", tip: "Sweet and savory grilled beef — great for non-spicy eaters." },
          { korean: "떡볶이", romanization: "tteokbokki", english: "Spicy rice cakes", tip: "Popular street food. Very spicy — you've been warned!" },
          { korean: "냉면", romanization: "naengmyeon", english: "Cold noodles", tip: "Perfect in summer. Choose 물냉면 (water-based) or 비빔냉면 (spicy)." },
          { korean: "돼지고기", romanization: "dwaejigogi", english: "Pork", tip: "Important to know for halal or religious dietary needs." },
          { korean: "소주", romanization: "soju", english: "Soju", tip: "Korea's national drink — a clear, mild spirit shared at the table." },
          { korean: "맥주", romanization: "maekju", english: "Beer", tip: "Try local brands: Cass, Hite, OB. Mix with soju for 소맥!" },
          { korean: "반찬", romanization: "banchan", english: "Side dishes", tip: "Free side dishes served with every meal. Refills are also free!" },
          { korean: "맛있어요", romanization: "maisseoyo", english: "Delicious!", tip: "Say this to your server — they'll love hearing it." },
          { korean: "매워요", romanization: "maewoyo", english: "It's spicy", tip: "Important to be able to say this if a dish is too hot for you." },
          { korean: "포장", romanization: "pojang", english: "Takeout / Packaging", tip: "Root of 포장해 주세요 (please pack it up). Say this when leaving with food." },
        ],
        scenarios: [
          { situation: "You taste the food and it's absolutely amazing.", answer: "맛있어요", romanization: "maisseoyo", english: "Delicious!" },
          { situation: "A server asks what you want to drink (Korean rice wine).", answer: "소주", romanization: "soju", english: "Soju" },
          { situation: "You want Korea's most iconic BBQ dish.", answer: "삼겹살", romanization: "samgyeopsal", english: "Grilled pork belly" },
        ]
      },
      {
        level: 2, name: "Short Phrases", emoji: "💬",
        description: "Ordering and dining phrases using food words",
        cards: [
          { korean: "물 주세요", romanization: "mul juseyo", english: "Water please", tip: "물 (water) + 주세요 (please give). Free and always available." },
          { korean: "메뉴 주세요", romanization: "menyu juseyo", english: "Menu please", tip: "메뉴 + 주세요. The first thing to say when you sit down." },
          { korean: "계산서 주세요", romanization: "gyesanseo juseyo", english: "Bill please", tip: "계산서 + 주세요. Or walk to the register — both are normal." },
          { korean: "안 매워요?", romanization: "an maewoyo?", english: "Is it not spicy?", tip: "안 (not) + 매워요? Crucial question before ordering." },
          { korean: "두 명이요", romanization: "du myeongiyo", english: "Two people", tip: "Hold up two fingers while saying this. Works for any number." },
          { korean: "이거 주세요", romanization: "igeo juseyo", english: "I'll have this", tip: "이거 (this) + 주세요. Point to the menu item. Universally understood." },
          { korean: "포장이요", romanization: "pojangiyo", english: "To go please", tip: "포장 (takeout) + 이요. Short and effective for taking food away." },
          { korean: "맥주 주세요", romanization: "maekju juseyo", english: "Beer please", tip: "맥주 + 주세요. Swap 맥주 for 소주 or any other drink." },
        ],
        scenarios: [
          { situation: "You sit down at a restaurant and need to see the options.", answer: "메뉴 주세요", romanization: "menyu juseyo", english: "Menu please" },
          { situation: "You've finished your meal and want to pay.", answer: "계산서 주세요", romanization: "gyesanseo juseyo", english: "Bill please" },
          { situation: "You want to take the food back to your hotel.", answer: "포장이요", romanization: "pojangiyo", english: "To go please" },
        ]
      },
      {
        level: 3, name: "Full Sentences", emoji: "🗣️",
        description: "Handle dietary needs and full dining conversations",
        cards: [
          { korean: "돼지고기 없이 해주세요", romanization: "dwaejigogi eopsi haejuseyo", english: "Without pork please", tip: "돼지고기 (pork) + 없이 (without) + 해주세요 (please do). Key for halal diners." },
          { korean: "맵지 않게 해주세요", romanization: "maepji ange haejuseyo", english: "Not spicy please", tip: "맵지 않게 (not spicy) + 해주세요. Say this early when ordering." },
          { korean: "이거 뭐예요?", romanization: "igeo mwoyeyo?", english: "What is this?", tip: "이거 (this) + 뭐예요? (what is it?). Point to the dish or menu item." },
          { korean: "포장해 주세요", romanization: "pojanghae juseyo", english: "Please pack it up", tip: "포장 (pack) + 해 주세요 (please do). For leftovers or takeout." },
          { korean: "알레르기 있어요", romanization: "allereugi isseoyo", english: "I have allergies", tip: "Follow with the specific allergen for clarity." },
          { korean: "맵지 않은 것 있어요?", romanization: "maepji aneun geot isseoyo?", english: "Do you have non-spicy options?", tip: "Bulgogi and japchae are usually safe bets for non-spicy eaters." },
          { korean: "반찬 더 주세요", romanization: "banchan deo juseyo", english: "More side dishes please", tip: "반찬 (side dishes) + 더 (more) + 주세요. Refills are always free!" },
          { korean: "잘 먹겠습니다", romanization: "jal meokgetseumnida", english: "I will eat well (said before eating)", tip: "Said before a meal — like 'bon appétit'. Koreans will be very impressed!" },
        ],
        scenarios: [
          { situation: "You don't eat pork and need to tell the server.", answer: "돼지고기 없이 해주세요", romanization: "dwaejigogi eopsi haejuseyo", english: "Without pork please" },
          { situation: "You can't handle spicy food and need to say so.", answer: "맵지 않게 해주세요", romanization: "maepji ange haejuseyo", english: "Not spicy please" },
          { situation: "You're not sure what a dish is and want to ask.", answer: "이거 뭐예요?", romanization: "igeo mwoyeyo?", english: "What is this?" },
        ]
      }
    ]
  },
  {
    id: 4, title: "Shopping", emoji: "🛍️",
    description: "Bargain at markets, understand prices, and shop like a local.",
    levels: [
      {
        level: 1, name: "Words", emoji: "📖",
        description: "Essential shopping vocabulary",
        cards: [
          { korean: "얼마", romanization: "eolma", english: "How much / Price", tip: "The root of 얼마예요? (how much is it?). Useful on its own too." },
          { korean: "비싸요", romanization: "bissayo", english: "Expensive", tip: "Saying this at a market can sometimes start a negotiation." },
          { korean: "싸요", romanization: "ssayo", english: "Cheap / Good value", tip: "A happy reaction to a good price!" },
          { korean: "작은", romanization: "jageun", english: "Small", tip: "Korean sizing runs small — always try before buying." },
          { korean: "중간", romanization: "junggan", english: "Medium", tip: "Ask for 중간 사이즈 (junggan saijeu) for medium size." },
          { korean: "큰", romanization: "keun", english: "Large", tip: "Say 큰 사이즈 주세요 for 'give me a large size'." },
          { korean: "약국", romanization: "yakguk", english: "Pharmacy", tip: "Look for the green cross sign. Staff often speak basic English." },
          { korean: "시장", romanization: "sijang", english: "Market", tip: "Gwangjang Market in Seoul, Dongmun Market in Jeju." },
          { korean: "편의점", romanization: "pyeonuijeom", english: "Convenience store", tip: "GS25, CU, 7-Eleven — open 24/7 and absolute lifesavers." },
          { korean: "현금", romanization: "hyeongeum", english: "Cash", tip: "Keep some cash for traditional markets and small eateries." },
          { korean: "카드", romanization: "kadeu", english: "Card (payment)", tip: "Most places accept cards, but small markets may be cash only." },
          { korean: "영수증", romanization: "yeongsujeung", english: "Receipt", tip: "Keep it — needed for tax refunds on purchases over ₩30,000." },
          { korean: "할인", romanization: "harin", english: "Discount / Sale", tip: "Look for 세일 (sale) or 할인 signs for deals." },
          { korean: "봉투", romanization: "bongtu", english: "Bag", tip: "Plastic bags cost extra in Korea (~₩100–300). Bring a tote!" },
          { korean: "탈의실", romanization: "taruisil", english: "Fitting room", tip: "Usually at the back of clothing stores." },
        ],
        scenarios: [
          { situation: "You see something at a market and need to know the cost.", answer: "얼마", romanization: "eolma", english: "How much / Price" },
          { situation: "You found an amazing deal and it's very affordable.", answer: "싸요", romanization: "ssayo", english: "Cheap / Good value" },
          { situation: "You need to find where to try clothes on.", answer: "탈의실", romanization: "taruisil", english: "Fitting room" },
        ]
      },
      {
        level: 2, name: "Short Phrases", emoji: "💬",
        description: "Prices, payments, and quick requests",
        cards: [
          { korean: "얼마예요?", romanization: "eolmayeyo?", english: "How much is it?", tip: "얼마 + 예요? The single most useful shopping phrase." },
          { korean: "너무 비싸요", romanization: "neomu bissayo", english: "Too expensive", tip: "너무 (too) + 비싸요. Can open a negotiation at traditional markets." },
          { korean: "카드 돼요?", romanization: "kadeu dwaeyo?", english: "Do you accept cards?", tip: "카드 + 돼요? (does it work?). Ask before you start shopping." },
          { korean: "영수증 주세요", romanization: "yeongsujeung juseyo", english: "Receipt please", tip: "영수증 + 주세요. Keep for tax refunds." },
          { korean: "이거 주세요", romanization: "igeo juseyo", english: "I'll take this", tip: "이거 (this) + 주세요. Point to the item. Works anywhere." },
          { korean: "할인 있어요?", romanization: "harin isseoyo?", english: "Is there a discount?", tip: "할인 + 있어요? (is there?). Polite way to ask about deals." },
          { korean: "봉투 주세요", romanization: "bongtu juseyo", english: "Bag please", tip: "봉투 + 주세요. Remember bags cost extra in Korea." },
          { korean: "큰 사이즈요", romanization: "keun saijeuyo", english: "Large size please", tip: "큰 (large) + 사이즈 (size) + 요. Swap 큰 for 작은 or 중간." },
        ],
        scenarios: [
          { situation: "You're at a market stall and want to know the price.", answer: "얼마예요?", romanization: "eolmayeyo?", english: "How much is it?" },
          { situation: "The item costs more than you want to pay.", answer: "너무 비싸요", romanization: "neomu bissayo", english: "Too expensive" },
          { situation: "You want to pay by card and need to check.", answer: "카드 돼요?", romanization: "kadeu dwaeyo?", english: "Do you accept cards?" },
        ]
      },
      {
        level: 3, name: "Full Sentences", emoji: "🗣️",
        description: "Negotiate, exchange, and shop with confidence",
        cards: [
          { korean: "깎아주세요", romanization: "kkakka juseyo", english: "Please give me a discount", tip: "Works best at traditional markets. Say with a smile!" },
          { korean: "입어봐도 돼요?", romanization: "ibeo bwado dwaeyo?", english: "Can I try this on?", tip: "입어봐도 (try wearing) + 돼요? (is it okay?). Use at clothing stores." },
          { korean: "탈의실이 어디예요?", romanization: "taruisiri eodiyeyo?", english: "Where is the fitting room?", tip: "탈의실 + 이 어디예요? (where is it?). Usually at the back of stores." },
          { korean: "교환할 수 있어요?", romanization: "gyohwanhal su isseoyo?", english: "Can I exchange this?", tip: "교환 (exchange) + 할 수 있어요? (can I do?). Bring your receipt." },
          { korean: "환불해 주세요", romanization: "hwanbul haejuseyo", english: "Please give me a refund", tip: "환불 (refund) + 해 주세요 (please do). Most stores allow refunds within 7–14 days." },
          { korean: "세금 환급 받을 수 있어요?", romanization: "segeum hwangeup badeul su isseoyo?", english: "Can I get a tax refund?", tip: "Foreigners can reclaim VAT at the airport. Minimum spend: ₩30,000." },
          { korean: "이걸로 할게요", romanization: "igeolro halgeyo", english: "I'll take this one", tip: "More decisive than 이거 주세요 — signals you've made your final choice." },
          { korean: "다른 색 있어요?", romanization: "dareun saek isseoyo?", english: "Do you have other colours?", tip: "다른 (other/different) + 색 (colour) + 있어요? (do you have?)." },
        ],
        scenarios: [
          { situation: "You want to negotiate the price down at a traditional market.", answer: "깎아주세요", romanization: "kkakka juseyo", english: "Please give me a discount" },
          { situation: "You want to try on a piece of clothing before deciding.", answer: "입어봐도 돼요?", romanization: "ibeo bwado dwaeyo?", english: "Can I try this on?" },
          { situation: "The item doesn't fit and you'd like a different size.", answer: "교환할 수 있어요?", romanization: "gyohwanhal su isseoyo?", english: "Can I exchange this?" },
        ]
      }
    ]
  },
  {
    id: 5, title: "Accommodation", emoji: "🏨",
    description: "Handle check-in, requests, and common hotel situations.",
    levels: [
      {
        level: 1, name: "Words", emoji: "📖",
        description: "Essential hotel and accommodation vocabulary",
        cards: [
          { korean: "방", romanization: "bang", english: "Room", tip: "방 번호 (bang beonho) = room number. Learn yours!" },
          { korean: "열쇠", romanization: "yeolsoe", english: "Key / Key card", tip: "Newer hotels use card keys. Traditional guesthouses may use real keys." },
          { korean: "와이파이", romanization: "waipai", english: "WiFi", tip: "Pronounced 'wai-pai' in Korean. Ask for 비밀번호 (password) next." },
          { korean: "비밀번호", romanization: "bimilbeonho", english: "Password", tip: "비밀 (secret) + 번호 (number). Used for WiFi, PIN codes, and locks." },
          { korean: "수건", romanization: "sugeon", english: "Towel", tip: "Call the front desk to request extra towels." },
          { korean: "이불", romanization: "ibul", english: "Blanket", tip: "Useful in winter or if the AC is too strong." },
          { korean: "조식", romanization: "josik", english: "Breakfast", tip: "Many Korean hotels offer 한식 (traditional Korean breakfast)." },
          { korean: "주차장", romanization: "juchajang", english: "Parking lot", tip: "주차장 있어요? (juchajang isseoyo?) = is there parking?" },
          { korean: "엘리베이터", romanization: "elribeeiteo", english: "Elevator", tip: "Borrowed from English 'elevator'. Notice how it sounds in Korean!" },
          { korean: "로비", romanization: "robi", english: "Lobby", tip: "The lobby is where you check in and find the concierge." },
          { korean: "프런트", romanization: "peurenteu", english: "Front desk / Reception", tip: "Available 24/7 in most Korean hotels." },
          { korean: "예약", romanization: "yeyak", english: "Reservation / Booking", tip: "Root of 예약했어요 (I have a reservation)." },
          { korean: "체크인", romanization: "chekeu-in", english: "Check-in", tip: "Present your passport — required by Korean law." },
          { korean: "체크아웃", romanization: "chekeu-aut", english: "Check-out", tip: "Standard checkout in Korea is 11am or 12pm." },
          { korean: "짐", romanization: "jim", english: "Luggage / Bags", tip: "Most hotels will store your bags after checkout until departure." },
          { korean: "에어컨", romanization: "eekon", english: "Air conditioning", tip: "에어컨이 안 돼요 (eekon-i an dwaeyo) = the AC isn't working." },
        ],
        scenarios: [
          { situation: "You need to check in and refer to the process.", answer: "체크인", romanization: "chekeu-in", english: "Check-in" },
          { situation: "You need to find the front desk of the hotel.", answer: "프런트", romanization: "peurenteu", english: "Front desk / Reception" },
          { situation: "You're referring to your bags after arriving.", answer: "짐", romanization: "jim", english: "Luggage / Bags" },
        ]
      },
      {
        level: 2, name: "Short Phrases", emoji: "💬",
        description: "Hotel requests using accommodation words",
        cards: [
          { korean: "수건 주세요", romanization: "sugeon juseyo", english: "Towel please", tip: "수건 + 주세요. Add 더 (deo = more) for 'more towels please'." },
          { korean: "이불 주세요", romanization: "ibul juseyo", english: "Blanket please", tip: "이불 + 주세요. Call the front desk or ask at reception." },
          { korean: "예약했어요", romanization: "yeyakhaesseoyo", english: "I have a reservation", tip: "예약 + 했어요 (I did). Follow with your name for quick service." },
          { korean: "방 번호", romanization: "bang beonho", english: "Room number", tip: "방 (room) + 번호 (number). Learn yours — needed for room service." },
          { korean: "와이파이 있어요?", romanization: "waipai isseoyo?", english: "Is there WiFi?", tip: "와이파이 + 있어요? (is there?). Always yes in Korean hotels!" },
          { korean: "짐 맡아요", romanization: "jim matayo", english: "Store luggage (short)", tip: "짐 (luggage) + 맡아요 (keep/store). Useful after checkout." },
          { korean: "에어컨 있어요?", romanization: "eekon isseoyo?", english: "Is there AC?", tip: "에어컨 + 있어요? Most Korean hotels have AC — confirm in guesthouses." },
          { korean: "체크인이요", romanization: "chekeu-in-iyo", english: "Check-in please", tip: "Short way to start the check-in process at reception." },
        ],
        scenarios: [
          { situation: "You arrive at the hotel and tell the desk you booked.", answer: "예약했어요", romanization: "yeyakhaesseoyo", english: "I have a reservation" },
          { situation: "Your room is too hot and you want to ask about cooling.", answer: "에어컨 있어요?", romanization: "eekon isseoyo?", english: "Is there AC?" },
          { situation: "You need an extra towel.", answer: "수건 주세요", romanization: "sugeon juseyo", english: "Towel please" },
        ]
      },
      {
        level: 3, name: "Full Sentences", emoji: "🗣️",
        description: "Handle all hotel situations with full phrases",
        cards: [
          { korean: "체크인 하고 싶어요", romanization: "chekeu-in hago sipeoyo", english: "I'd like to check in", tip: "체크인 + 하고 싶어요 (I want to do). Present your passport." },
          { korean: "몇 시에 체크아웃이에요?", romanization: "myeot sie chekeu-ausieyo?", english: "What time is checkout?", tip: "Standard Korean checkout is 11am or 12pm." },
          { korean: "와이파이 비밀번호가 뭐예요?", romanization: "waipai bimilbeonhoga mwoyeyo?", english: "What's the WiFi password?", tip: "와이파이 + 비밀번호 (password) + 가 뭐예요? (what is?). Often on a card in the room." },
          { korean: "룸서비스 있어요?", romanization: "rumsseobiseu isseoyo?", english: "Is there room service?", tip: "Many Korean hotels have 24-hour delivery options." },
          { korean: "에어컨이 안 돼요", romanization: "eeokeoni an dwaeyo", english: "The AC isn't working", tip: "에어컨 + 이 안 돼요 (isn't working). Call 프런트 immediately." },
          { korean: "청소해 주세요", romanization: "cheongsohae juseyo", english: "Please clean the room", tip: "Hang the housekeeping sign on your door or say this at reception." },
          { korean: "조식 포함이에요?", romanization: "josik pohamieyo?", english: "Is breakfast included?", tip: "조식 (breakfast) + 포함이에요? (is it included?). Ask when booking or checking in." },
          { korean: "짐 맡아주세요", romanization: "jim matajuseyo", english: "Please store my luggage", tip: "짐 + 맡아주세요 (please keep). Most hotels store bags after checkout." },
        ],
        scenarios: [
          { situation: "You arrive at the hotel and want to formally start check-in.", answer: "체크인 하고 싶어요", romanization: "chekeu-in hago sipeoyo", english: "I'd like to check in" },
          { situation: "You need the WiFi password for your room.", answer: "와이파이 비밀번호가 뭐예요?", romanization: "waipai bimilbeonhoga mwoyeyo?", english: "What's the WiFi password?" },
          { situation: "You want to know when you need to leave in the morning.", answer: "몇 시에 체크아웃이에요?", romanization: "myeot sie chekeu-ausieyo?", english: "What time is checkout?" },
        ]
      }
    ]
  },
  {
    id: 6, title: "Emergencies", emoji: "🆘",
    description: "Stay safe — essential words and phrases for urgent situations.",
    levels: [
      {
        level: 1, name: "Words", emoji: "📖",
        description: "Critical emergency vocabulary",
        cards: [
          { korean: "경찰", romanization: "gyeongchal", english: "Police", tip: "Emergency number in Korea: 112." },
          { korean: "병원", romanization: "byeongwon", english: "Hospital", tip: "Major cities have international clinics. 119 for ambulance." },
          { korean: "약국", romanization: "yakguk", english: "Pharmacy", tip: "Look for the green cross. Can direct you to the nearest hospital." },
          { korean: "의사", romanization: "uisa", english: "Doctor", tip: "Korean hospitals have English-speaking staff at international clinics." },
          { korean: "구급차", romanization: "gugeupcha", english: "Ambulance", tip: "Emergency number in Korea: 119 (also fire)." },
          { korean: "여권", romanization: "yeokkkwon", english: "Passport", tip: "Keep a photo copy separately. Report loss immediately to your embassy." },
          { korean: "지갑", romanization: "jigap", english: "Wallet", tip: "Report lost wallet to police (112) for documentation and contact your bank." },
          { korean: "대사관", romanization: "daesagwan", english: "Embassy", tip: "Each country has an embassy in Seoul. Save the number before you travel." },
          { korean: "비상구", romanization: "bisanggu", english: "Emergency exit", tip: "Look for the green running-man sign in all buildings." },
          { korean: "약", romanization: "yak", english: "Medicine", tip: "Pharmacies (약국) can recommend over-the-counter remedies." },
          { korean: "불", romanization: "bul", english: "Fire", tip: "불이야! (Fire!) is the shout to alert others." },
          { korean: "보험", romanization: "bohom", english: "Insurance", tip: "Keep your travel insurance card and policy number accessible." },
          { korean: "도둑", romanization: "doduk", english: "Thief", tip: "Korea is very safe but incidents can happen. Report to police: 112." },
        ],
        scenarios: [
          { situation: "You feel unwell and need to go somewhere for medical care.", answer: "병원", romanization: "byeongwon", english: "Hospital" },
          { situation: "You need to pick up medicine quickly.", answer: "약국", romanization: "yakguk", english: "Pharmacy" },
          { situation: "Something was stolen and you need to contact authorities.", answer: "경찰", romanization: "gyeongchal", english: "Police" },
        ]
      },
      {
        level: 2, name: "Short Phrases", emoji: "💬",
        description: "Urgent short phrases built from emergency words",
        cards: [
          { korean: "도와주세요!", romanization: "dowajuseyo!", english: "Help!", tip: "Shout loudly — Koreans will respond quickly." },
          { korean: "불이야!", romanization: "buriya!", english: "Fire!", tip: "불 (fire) + 이야! Shout this to alert everyone around you." },
          { korean: "아파요", romanization: "apayo", english: "I'm sick / It hurts", tip: "Point to where it hurts while saying this." },
          { korean: "여기 아파요", romanization: "yeogi apayo", english: "It hurts here", tip: "여기 (here) + 아파요. Point to the affected area." },
          { korean: "약 있어요?", romanization: "yak isseoyo?", english: "Do you have medicine?", tip: "약 + 있어요? Ask at a pharmacy (약국) for over-the-counter help." },
          { korean: "보험 있어요", romanization: "bohom isseoyo", english: "I have insurance", tip: "보험 + 있어요 (I have). Say this at a hospital or clinic." },
          { korean: "경찰 불러요", romanization: "gyeongchal bulleoyo", english: "Call the police (short)", tip: "경찰 (police) + 불러요 (call). Short, urgent form." },
          { korean: "병원 어디요?", romanization: "byeongwon eodiyo?", english: "Hospital — where?", tip: "병원 + 어디요? (where?). Quick and understood anywhere." },
        ],
        scenarios: [
          { situation: "You need urgent help and are calling out to bystanders.", answer: "도와주세요!", romanization: "dowajuseyo!", english: "Help!" },
          { situation: "You're in pain and need to express it quickly.", answer: "아파요", romanization: "apayo", english: "I'm sick / It hurts" },
          { situation: "You need to find the hospital quickly.", answer: "병원 어디요?", romanization: "byeongwon eodiyo?", english: "Hospital — where?" },
        ]
      },
      {
        level: 3, name: "Full Sentences", emoji: "🗣️",
        description: "Complete emergency phrases for serious situations",
        cards: [
          { korean: "경찰을 불러주세요", romanization: "gyeongchareul bulleojuseyo", english: "Please call the police", tip: "경찰 + 을 불러주세요 (please call). Emergency: 112." },
          { korean: "구급차를 불러주세요", romanization: "gugeupchareul bulleojuseyo", english: "Please call an ambulance", tip: "구급차 + 를 불러주세요. Emergency: 119." },
          { korean: "의사가 필요해요", romanization: "uisaga piryohaeyo", english: "I need a doctor", tip: "의사 + 가 필요해요 (is needed). Use at a clinic or ask bystanders." },
          { korean: "여권을 잃어버렸어요", romanization: "yeokkwoneul ireobeoryeosseoyo", english: "I lost my passport", tip: "여권 + 을 잃어버렸어요 (I lost). Contact your embassy immediately." },
          { korean: "지갑을 잃어버렸어요", romanization: "jigabeul ireobeoryeosseoyo", english: "I lost my wallet", tip: "지갑 + 을 잃어버렸어요. Report to police (112) and call your bank." },
          { korean: "병원이 어디예요?", romanization: "byeongwoni eodiyeyo?", english: "Where is the hospital?", tip: "병원 + 이 어디예요? Any pharmacy can direct you to the nearest hospital." },
          { korean: "약국이 어디예요?", romanization: "yakgugi eodiyeyo?", english: "Where is the pharmacy?", tip: "약국 + 이 어디예요? Look for the green cross sign." },
          { korean: "길을 잃었어요", romanization: "gireul ireosseoyo", english: "I'm lost", tip: "Show your hotel's address card — most hotels provide one for this." },
        ],
        scenarios: [
          { situation: "Someone collapsed and you need emergency medical services.", answer: "구급차를 불러주세요", romanization: "gugeupchareul bulleojuseyo", english: "Please call an ambulance" },
          { situation: "Your passport is missing and you need to explain.", answer: "여권을 잃어버렸어요", romanization: "yeokkwoneul ireobeoryeosseoyo", english: "I lost my passport" },
          { situation: "You need a doctor urgently.", answer: "의사가 필요해요", romanization: "uisaga piryohaeyo", english: "I need a doctor" },
        ]
      }
    ]
  },
  {
    id: 7, title: "Read Korean", emoji: "🔤",
    description: "Learn Hangul — the Korean alphabet. Sound out letters step by step.",
    isAlphabet: true,
    levels: [
      {
        level: 1, name: "Basic Letters", emoji: "📖",
        description: "10 vowels + 10 consonants — the Hangul foundation",
        cards: [
          { korean: "ㅏ", romanization: "a", english: "Vowel: 'a'", tip: "Like 'a' in 'father'. Vertical stroke with a branch to the right.", breakdown: "Simple vowel — sounds like: AH" },
          { korean: "ㅓ", romanization: "eo", english: "Vowel: 'eo'", tip: "Like 'u' in 'sun'. Branch points left.", breakdown: "Simple vowel — sounds like: UH" },
          { korean: "ㅗ", romanization: "o", english: "Vowel: 'o'", tip: "Like 'o' in 'bone'. Horizontal line with branch pointing up.", breakdown: "Simple vowel — sounds like: OH" },
          { korean: "ㅜ", romanization: "u", english: "Vowel: 'u'", tip: "Like 'oo' in 'moon'. Branch points down.", breakdown: "Simple vowel — sounds like: OO" },
          { korean: "ㅡ", romanization: "eu", english: "Vowel: 'eu'", tip: "No English equivalent. Lips flat, sound from the back of the throat.", breakdown: "Simple vowel — sounds like: UH (lips flat)" },
          { korean: "ㅣ", romanization: "i", english: "Vowel: 'i'", tip: "Like 'ee' in 'feet'. Just a vertical stroke.", breakdown: "Simple vowel — sounds like: EE" },
          { korean: "ㅑ", romanization: "ya", english: "Vowel: 'ya'", tip: "Like 'ya' in 'yard'. ㅏ with an extra branch.", breakdown: "Double ㅏ = YA sound" },
          { korean: "ㅕ", romanization: "yeo", english: "Vowel: 'yeo'", tip: "Like 'yo' in 'young'. Double-branched ㅓ.", breakdown: "Double ㅓ = YEO sound" },
          { korean: "ㅛ", romanization: "yo", english: "Vowel: 'yo'", tip: "Like 'yo' in 'yoga'. ㅗ with double branches.", breakdown: "Double ㅗ = YO sound" },
          { korean: "ㅠ", romanization: "yu", english: "Vowel: 'yu'", tip: "Like 'you'. ㅜ with double branches.", breakdown: "Double ㅜ = YU sound" },
          { korean: "ㄱ", romanization: "g/k", english: "Consonant: 'g' or 'k'", tip: "Like 'g' in 'go' at the start, 'k' at the end of a syllable.", breakdown: "L-shape — G at start, K at end" },
          { korean: "ㄴ", romanization: "n", english: "Consonant: 'n'", tip: "Like 'n' in 'no'. Shaped like an angled L.", breakdown: "Corner shape — always N sound" },
          { korean: "ㄷ", romanization: "d/t", english: "Consonant: 'd' or 't'", tip: "Like 'd' in 'do' or 't' in 'top'.", breakdown: "Backwards C — D at start, T at end" },
          { korean: "ㄹ", romanization: "r/l", english: "Consonant: 'r' or 'l'", tip: "Between English R and L. A tongue-flap sound.", breakdown: "Complex shape — R between vowels, L at end" },
          { korean: "ㅁ", romanization: "m", english: "Consonant: 'm'", tip: "Like 'm' in 'mother'. Looks like a small square.", breakdown: "Square shape — always M sound" },
          { korean: "ㅂ", romanization: "b/p", english: "Consonant: 'b' or 'p'", tip: "Like 'b' in 'boy' or 'p' in 'pop'.", breakdown: "π shape — B at start, P at end" },
          { korean: "ㅅ", romanization: "s", english: "Consonant: 's'", tip: "Like 's' in 'sun'. Looks like a person with arms out.", breakdown: "Person shape — S sound" },
          { korean: "ㅇ", romanization: "-/ng", english: "Consonant: silent / 'ng'", tip: "Silent at the start of a syllable. 'ng' sound at the end.", breakdown: "Circle — silent at start, NG at end" },
          { korean: "ㅈ", romanization: "j", english: "Consonant: 'j'", tip: "Like 'j' in 'jump'.", breakdown: "Like ㅅ with a crossbar — J sound" },
          { korean: "ㅎ", romanization: "h", english: "Consonant: 'h'", tip: "Like 'h' in 'hello'.", breakdown: "Circle with a hat — H sound" },
        ],
        scenarios: []
      },
      {
        level: 2, name: "Advanced Letters", emoji: "💬",
        description: "Compound vowels + aspirated & tense consonants",
        cards: [
          { korean: "ㅐ", romanization: "ae", english: "Compound vowel: 'ae'", tip: "Like 'e' in 'bed'. Very common in Korean.", breakdown: "Compound vowel — sounds like: EH (as in bed)" },
          { korean: "ㅔ", romanization: "e", english: "Compound vowel: 'e'", tip: "Like 'e' in 'set'. In modern Korean, sounds almost identical to ㅐ.", breakdown: "Compound vowel — sounds like: EH (as in set)" },
          { korean: "ㅘ", romanization: "wa", english: "Compound vowel: 'wa'", tip: "ㅗ + ㅏ combined. Like 'wa' in 'water'. Heard in 봐요 (look/see).", breakdown: "ㅗ + ㅏ = WA sound" },
          { korean: "ㅝ", romanization: "wo", english: "Compound vowel: 'wo'", tip: "ㅜ + ㅓ combined. Heard in 뭐 (mwo = what).", breakdown: "ㅜ + ㅓ = WO sound" },
          { korean: "ㅚ", romanization: "oe", english: "Compound vowel: 'oe'", tip: "ㅗ + ㅣ combined. Heard in 외국 (oeguk = foreign country).", breakdown: "ㅗ + ㅣ = OE sound" },
          { korean: "ㅟ", romanization: "wi", english: "Compound vowel: 'wi'", tip: "ㅜ + ㅣ combined. Like 'wee'. Heard in 위 (wi = above).", breakdown: "ㅜ + ㅣ = WI sound" },
          { korean: "ㅢ", romanization: "ui", english: "Compound vowel: 'ui'", tip: "ㅡ + ㅣ combined. Slide from 'eu' to 'ee'. Heard in 의사 (doctor).", breakdown: "ㅡ + ㅣ = UI sound (slide)" },
          { korean: "ㅋ", romanization: "k", english: "Aspirated: strong 'k'", tip: "ㄱ with an extra stroke. Stronger 'k' with a puff of air.", breakdown: "ㄱ + stroke = aspirated K" },
          { korean: "ㅌ", romanization: "t", english: "Aspirated: strong 't'", tip: "ㄷ with extra strokes. Stronger 't' with a puff of air.", breakdown: "ㄷ + strokes = aspirated T" },
          { korean: "ㅍ", romanization: "p", english: "Aspirated: strong 'p'", tip: "ㅂ extended. Stronger 'p' with a puff of air.", breakdown: "ㅂ extended = aspirated P" },
          { korean: "ㅊ", romanization: "ch", english: "Aspirated: 'ch'", tip: "ㅈ with a stroke on top. Like 'ch' in 'church'.", breakdown: "ㅈ + stroke = aspirated CH" },
          { korean: "ㄲ", romanization: "kk", english: "Tense: 'kk'", tip: "Doubled ㄱ. Clipped, tense — no puff of air. Like 'k' in 'sky'.", breakdown: "Double ㄱ = tense KK" },
          { korean: "ㄸ", romanization: "tt", english: "Tense: 'tt'", tip: "Doubled ㄷ. Like the 't' in 'star' — no aspiration.", breakdown: "Double ㄷ = tense TT" },
          { korean: "ㅃ", romanization: "pp", english: "Tense: 'pp'", tip: "Doubled ㅂ. Like the 'p' in 'spa' — very clipped.", breakdown: "Double ㅂ = tense PP" },
          { korean: "ㅆ", romanization: "ss", english: "Tense: 'ss'", tip: "Doubled ㅅ. A sharp hissing 's'. Heard in 있어요 (isseoyo = there is).", breakdown: "Double ㅅ = tense SS" },
          { korean: "ㅉ", romanization: "jj", english: "Tense: 'jj'", tip: "Doubled ㅈ. A sharp, stiff 'j' sound.", breakdown: "Double ㅈ = tense JJ" },
        ],
        scenarios: []
      },
      {
        level: 3, name: "Reading Practice", emoji: "🗣️",
        description: "Syllable blocks and real Korean words to read aloud",
        cards: [
          { korean: "가", romanization: "ga", english: "Syllable: ga", tip: "ㄱ(g) + ㅏ(a) = 가(ga). First syllable of the Korean alphabet!", breakdown: "ㄱ (g) + ㅏ (a) = 가 (ga)" },
          { korean: "나", romanization: "na", english: "Syllable: na", tip: "ㄴ(n) + ㅏ(a) = 나(na). Also means 'I/me' in casual speech!", breakdown: "ㄴ (n) + ㅏ (a) = 나 (na)" },
          { korean: "다", romanization: "da", english: "Syllable: da", tip: "ㄷ(d) + ㅏ(a) = 다(da). Also means 'all/everything'!", breakdown: "ㄷ (d) + ㅏ (a) = 다 (da)" },
          { korean: "마", romanization: "ma", english: "Syllable: ma", tip: "ㅁ(m) + ㅏ(a) = 마(ma). Appears in 마음 (maeum = heart/mind).", breakdown: "ㅁ (m) + ㅏ (a) = 마 (ma)" },
          { korean: "바", romanization: "ba", english: "Syllable: ba", tip: "ㅂ(b) + ㅏ(a) = 바(ba). 바다 (bada) = sea/ocean!", breakdown: "ㅂ (b) + ㅏ (a) = 바 (ba)" },
          { korean: "사", romanization: "sa", english: "Syllable: sa", tip: "ㅅ(s) + ㅏ(a) = 사(sa). Also means the number 4!", breakdown: "ㅅ (s) + ㅏ (a) = 사 (sa)" },
          { korean: "아", romanization: "a", english: "Syllable: a", tip: "ㅇ(silent) + ㅏ(a) = 아(a). ㅇ is a silent placeholder here.", breakdown: "ㅇ (silent) + ㅏ (a) = 아 (a)" },
          { korean: "머", romanization: "meo", english: "Syllable: meo", tip: "ㅁ(m) + ㅓ(eo) = 머. Found in 머리 (meori = head/hair).", breakdown: "ㅁ (m) + ㅓ (eo) = 머 (meo)" },
          { korean: "시", romanization: "si", english: "Syllable: si", tip: "ㅅ(s) + ㅣ(i) = 시. In 시간 (sigan = time) and 시장 (sijang = market).", breakdown: "ㅅ (s) + ㅣ (i) = 시 (si)" },
          { korean: "도", romanization: "do", english: "Syllable: do", tip: "ㄷ(d) + ㅗ(o) = 도. Means 'also/too'. In 도착 (arrival).", breakdown: "ㄷ (d) + ㅗ (o) = 도 (do)" },
          { korean: "주", romanization: "ju", english: "Syllable: ju", tip: "ㅈ(j) + ㅜ(u) = 주. The 주 in 주세요 (please give) — you've said this many times!", breakdown: "ㅈ (j) + ㅜ (u) = 주 (ju)" },
          { korean: "요", romanization: "yo", english: "Syllable: yo", tip: "ㅇ(silent) + ㅛ(yo) = 요. The polite ending you hear on every Korean sentence!", breakdown: "ㅇ (silent) + ㅛ (yo) = 요 (yo)" },
          { korean: "서울", romanization: "seoul", english: "Seoul", tip: "서(seo) + 울(ul). Korea's capital. Two syllables — sound each one out!", breakdown: "서 (seo) + 울 (ul) = Seoul" },
          { korean: "제주", romanization: "jeju", english: "Jeju", tip: "제(je) + 주(ju). Island paradise. You can now sound this out!", breakdown: "제 (je) + 주 (ju) = Jeju" },
          { korean: "한국", romanization: "hanguk", english: "Korea", tip: "한(han) + 국(guk). 한 = Korean/great, 국 = country.", breakdown: "한 (han) + 국 (guk) = Korea" },
          { korean: "사랑", romanization: "sarang", english: "Love", tip: "사(sa) + 랑(rang). 사랑해요 = I love you.", breakdown: "사 (sa) + 랑 (rang) = Love" },
          { korean: "안녕", romanization: "annyeong", english: "Hi / Bye (informal)", tip: "안(an) + 녕(nyeong). The root of 안녕하세요 — you've heard this all course!", breakdown: "안 (an) + 녕 (nyeong) = Peace/Hi" },
          { korean: "감사", romanization: "gamsa", english: "Gratitude (root)", tip: "감(gam) + 사(sa). The root of 감사합니다 — another familiar word!", breakdown: "감 (gam) + 사 (sa) = Gratitude" },
          { korean: "지하철", romanization: "jihacheol", english: "Subway", tip: "지(ji) + 하(ha) + 철(cheol). Three syllables — sound each one out!", breakdown: "지 (ji) + 하 (ha) + 철 (cheol) = Underground iron" },
          { korean: "버스", romanization: "beoseu", english: "Bus", tip: "버(beo) + 스(seu). English 'bus' adapted into Hangul — notice the pattern!", breakdown: "버 (beo) + 스 (seu) = Bus (loanword)" },
          { korean: "한국어", romanization: "han-gug-eo", english: "Korean language", tip: "You can now read this! 한(han) + 국(guk) + 어(eo).", breakdown: "한 (han) + 국 (guk) + 어 (eo) = Korean language" },
        ],
        scenarios: []
      }
    ]
  }
];

const STUDY_PLAN = [
  { day: 1,  topic: "Module 1 Level 1: Survival words" },
  { day: 2,  topic: "Module 1 Level 2: Short phrases + quiz" },
  { day: 3,  topic: "Module 7 Level 1: Korean alphabet basics" },
  { day: 4,  topic: "Module 7 Level 2: Advanced letters" },
  { day: 5,  topic: "Module 2 Level 1: Transport words" },
  { day: 6,  topic: "Module 2 Level 2: Getting around phrases" },
  { day: 7,  topic: "Review Modules 1–2 + rest day" },
  { day: 8,  topic: "Module 3 Level 1: Food vocabulary" },
  { day: 9,  topic: "Module 3 Level 2: Ordering phrases" },
  { day: 10, topic: "Module 4 Level 1: Shopping words" },
  { day: 11, topic: "Module 4 Level 2: Price & payment phrases" },
  { day: 12, topic: "Module 5: Accommodation" },
  { day: 13, topic: "Module 6: Emergency phrases (important!)" },
  { day: 14, topic: "Full review: all modules Level 3 quiz day 🎓" },
];

const BADGES = [
  { id: "firstLesson",    emoji: "🌱", name: "First Lesson" },
  { id: "streak7",        emoji: "🔥", name: "7-Day Streak" },
  { id: "quizMaster",     emoji: "🧠", name: "Quiz Master" },
  { id: "jejuReady",      emoji: "🍊", name: "Jeju Ready" },
  { id: "seoulReady",     emoji: "🏙️", name: "Seoul Ready" },
  { id: "courseComplete", emoji: "🎓", name: "Course Complete" },
];

// ---- STATE ----
const DEFAULT_STATE = {
  points: 0,
  difficulty: null,
  streak: { lastDate: null, count: 0 },
  modules: {
    1: { unlocked: true,  levels: { 1: { lessonsComplete: false, quizScore: null }, 2: { lessonsComplete: false, quizScore: null }, 3: { lessonsComplete: false, quizScore: null } } },
    2: { unlocked: false, levels: { 1: { lessonsComplete: false, quizScore: null }, 2: { lessonsComplete: false, quizScore: null }, 3: { lessonsComplete: false, quizScore: null } } },
    3: { unlocked: false, levels: { 1: { lessonsComplete: false, quizScore: null }, 2: { lessonsComplete: false, quizScore: null }, 3: { lessonsComplete: false, quizScore: null } } },
    4: { unlocked: false, levels: { 1: { lessonsComplete: false, quizScore: null }, 2: { lessonsComplete: false, quizScore: null }, 3: { lessonsComplete: false, quizScore: null } } },
    5: { unlocked: false, levels: { 1: { lessonsComplete: false, quizScore: null }, 2: { lessonsComplete: false, quizScore: null }, 3: { lessonsComplete: false, quizScore: null } } },
    6: { unlocked: false, levels: { 1: { lessonsComplete: false, quizScore: null }, 2: { lessonsComplete: false, quizScore: null }, 3: { lessonsComplete: false, quizScore: null } } },
    7: { unlocked: true,  levels: { 1: { lessonsComplete: false, quizScore: null }, 2: { lessonsComplete: false, quizScore: null }, 3: { lessonsComplete: false, quizScore: null } } },
  },
  badges: { firstLesson: false, streak7: false, quizMaster: false, jejuReady: false, seoulReady: false, courseComplete: false }
};

function loadState() {
  try {
    const raw = localStorage.getItem("korean-app-state");
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    const saved = JSON.parse(raw);
    if (saved.difficulty === undefined) saved.difficulty = null;
    // Migrate old flat module state to per-level structure
    for (let id = 1; id <= 7; id++) {
      if (!saved.modules[id]) {
        saved.modules[id] = JSON.parse(JSON.stringify(DEFAULT_STATE.modules[id]));
      } else if (!saved.modules[id].levels) {
        const old = saved.modules[id];
        saved.modules[id] = {
          unlocked: old.unlocked || (id === 1 || id === 7),
          levels: {
            1: { lessonsComplete: old.lessonsComplete || false, quizScore: old.quizScore || null },
            2: { lessonsComplete: false, quizScore: null },
            3: { lessonsComplete: false, quizScore: null },
          }
        };
      }
    }
    return saved;
  } catch(e) { return JSON.parse(JSON.stringify(DEFAULT_STATE)); }
}

function saveState() { localStorage.setItem("korean-app-state", JSON.stringify(state)); }

let state = loadState();

// ---- DIFFICULTY ----
function maxLevel() {
  if (state.difficulty === 'easy') return 1;
  if (state.difficulty === 'intermediate') return 2;
  return 3;
}

function isLevelUnlocked(moduleId, levelId) {
  if (levelId > maxLevel()) return false;
  if (!state.modules[moduleId].unlocked) return false;
  if (levelId === 1) return true;
  const prev = state.modules[moduleId].levels[levelId - 1];
  return prev.quizScore !== null && prev.quizScore >= 70;
}

function showDifficulty() {
  showScreen('difficulty');
}

function selectDifficulty(mode) {
  state.difficulty = mode;
  saveState();
  showHome();
}

// ---- STREAK ----
function updateStreak() {
  const today = new Date().toISOString().slice(0,10);
  const last = state.streak.lastDate;
  if (last === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
  state.streak.count = (last === yesterday) ? state.streak.count + 1 : 1;
  state.streak.lastDate = today;
  if (state.streak.count >= 7) checkBadge('streak7');
  saveState();
}

// ---- BADGES ----
function checkBadge(id) {
  if (!state.badges[id]) { state.badges[id] = true; saveState(); }
}

function checkAllBadges() {
  const ms = state.modules;
  const lvlPassed = (id, l) => ms[id].levels[l].quizScore !== null && ms[id].levels[l].quizScore >= 70;
  if ([1,2,3,4,5,6,7].some(i => Object.values(ms[i].levels).some(l => l.lessonsComplete))) checkBadge('firstLesson');
  if ([1,2,3].every(i => lvlPassed(i, 1))) checkBadge('jejuReady');
  if ([4,5,6].every(i => lvlPassed(i, 1))) checkBadge('seoulReady');
  if ([1,2,3,4,5,6].every(i => [1,2,3].every(l => lvlPassed(i, l)))) { checkBadge('quizMaster'); checkBadge('courseComplete'); }
}

// ---- NAVIGATION ----
let currentScreen = 'home';
let currentModuleId = 1;
let currentLevelId = 1;
let lastFlashcardModuleId = 1;
let lastFlashcardLevelId = 1;
let lastQuizModuleId = 1;
let lastQuizLevelId = 1;

function showScreen(id) {
  clearInterval(questionTimerInterval);
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  currentScreen = id;
  speechSynthesis && speechSynthesis.cancel();
}

function setNav(tab) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('nav-' + tab);
  if (el) el.classList.add('active');
}

function showHome() { renderHome(); showScreen('home'); setNav('home'); }
function showModule(id) { currentModuleId = id; renderModuleDetail(id); showScreen('module'); }
function showLastFlashcard() { startFlashcardsForModule(lastFlashcardModuleId, lastFlashcardLevelId); }
function showLastQuiz() { startQuizForModule(lastQuizModuleId, lastQuizLevelId); }
function showProgress() { renderProgress(); showScreen('progress'); }

// ---- HOME RENDER ----
function renderHome() {
  updateStreak();
  const ms = state.modules;
  const ml = maxLevel();
  const totalLevels = 7 * ml;
  const completedLevels = [1,2,3,4,5,6,7].reduce((sum, i) =>
    sum + [1,2,3].slice(0, ml).filter(l => ms[i].levels[l].quizScore !== null && ms[i].levels[l].quizScore >= 70).length, 0);
  const pct = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;

  document.getElementById('stat-points').textContent = state.points;
  document.getElementById('stat-streak').textContent = state.streak.count + '🔥';
  document.getElementById('stat-complete').textContent = pct + '%';

  const modeLabels = { easy: '🌱 Easy', intermediate: '🌿 Intermediate', advanced: '🌳 Advanced' };
  const modeBtn = document.getElementById('diff-mode-btn');
  if (modeBtn) modeBtn.textContent = (modeLabels[state.difficulty] || '🌿 Select Mode') + ' ✏';

  const grid = document.getElementById('module-grid');
  grid.innerHTML = '';
  MODULES.forEach(mod => {
    const mstate = ms[mod.id];
    const unlocked = mstate.unlocked;
    const passedLevels = [1,2,3].slice(0, ml).filter(l => mstate.levels[l].quizScore !== null && mstate.levels[l].quizScore >= 70).length;
    const progress = Math.round((passedLevels / ml) * 100);

    const card = document.createElement('div');
    card.className = 'module-card ' + (unlocked ? 'unlocked' : 'locked');
    card.innerHTML = `
      <div class="module-num">MODULE ${mod.id}</div>
      <div class="module-emoji">${mod.emoji}</div>
      <div class="module-card-title">${mod.title}</div>
      <div class="module-prog-bar"><div class="module-prog-fill" style="width:${progress}%"></div></div>
      ${unlocked ? '' : '<div class="module-lock-icon">🔒 Complete previous module</div>'}
    `;
    if (unlocked) card.onclick = () => showModule(mod.id);
    grid.appendChild(card);
  });
}

// ---- MODULE DETAIL ----
function renderModuleDetail(id) {
  const mod = MODULES.find(m => m.id === id);
  const mstate = state.modules[id];
  document.getElementById('module-detail-title').textContent = mod.title;
  document.getElementById('module-hero').textContent = mod.emoji;
  document.getElementById('module-desc').textContent = mod.description;

  const container = document.getElementById('level-cards');
  container.innerHTML = '';

  const modeLockLabels = { easy: 'Easy', intermediate: 'Intermediate', advanced: 'Advanced' };

  mod.levels.forEach(levelData => {
    const lvl = levelData.level;
    const lvlState = mstate.levels[lvl];
    const withinMode = lvl <= maxLevel();
    const unlocked = isLevelUnlocked(id, lvl);
    const flashDone = lvlState.lessonsComplete;
    const quizPassed = lvlState.quizScore !== null && lvlState.quizScore >= 70;
    const quizScore = lvlState.quizScore;

    let progPct = 0;
    if (flashDone && quizPassed) progPct = 100;
    else if (flashDone) progPct = 50;

    let statusIcon = '⬜';
    if (!withinMode) statusIcon = '🔒';
    else if (quizPassed) statusIcon = '✅';
    else if (flashDone) statusIcon = '📝';

    let actionsHtml = '';
    if (withinMode && unlocked) {
      const qDisabled = flashDone ? '' : 'disabled';
      const qLabel = `📝 Quiz${quizScore !== null ? ' (' + quizScore + '%)' : ''}`;
      actionsHtml = `
        <div class="level-actions">
          <button class="level-btn-fc" onclick="startFlashcardsForModule(${id},${lvl})">🃏 Flashcards</button>
          <button class="level-btn-quiz" onclick="startQuizForModule(${id},${lvl})" ${qDisabled}>${qLabel}</button>
        </div>`;
    } else if (!withinMode) {
      actionsHtml = `<div class="level-locked-msg">🔒 Not in ${modeLockLabels[state.difficulty]} mode &nbsp;·&nbsp; <button class="level-upgrade-btn" onclick="showDifficulty()">change mode</button></div>`;
    } else {
      actionsHtml = `<div class="level-locked-msg">🔒 Pass Level ${lvl - 1} quiz to unlock</div>`;
    }

    const card = document.createElement('div');
    card.className = `level-card ${!withinMode ? 'mode-locked' : unlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <div class="level-card-top">
        <div class="level-badge">LEVEL ${lvl}</div>
        <div class="level-status">${statusIcon}</div>
      </div>
      <div class="level-name">${levelData.emoji} ${levelData.name}</div>
      <div class="level-subdesc">${levelData.description} · ${levelData.cards.length} cards</div>
      <div class="level-prog-bar"><div class="level-prog-fill" style="width:${progPct}%"></div></div>
      ${actionsHtml}
    `;
    container.appendChild(card);
  });
}

// ---- FLASHCARD STATE ----
let fcCards = [];
let fcIndex = 0;
let fcFlipped = false;
let fcIsAlphabet = false;

function startFlashcardsForModule(moduleId, levelId) {
  const mod = MODULES.find(m => m.id === moduleId);
  const levelData = mod.levels.find(l => l.level === levelId);
  lastFlashcardModuleId = moduleId;
  lastFlashcardLevelId = levelId;
  currentModuleId = moduleId;
  currentLevelId = levelId;
  fcCards = [...levelData.cards];
  fcIndex = 0;
  fcFlipped = false;
  fcIsAlphabet = mod.isAlphabet || false;

  document.getElementById('fc-module-title').textContent = `${mod.title} — Level ${levelId}`;
  renderFlashcard();
  showScreen('flashcard');
  setNav('flashcards');
  document.getElementById('fc-card').onclick = flipCard;
}

function renderFlashcard() {
  const c = fcCards[fcIndex];
  const total = fcCards.length;
  document.getElementById('fc-counter').textContent = `${fcIndex + 1} / ${total}`;
  document.getElementById('fc-progress-bar').style.width = ((fcIndex + 1) / total * 100) + '%';

  const card = document.getElementById('fc-card');
  card.classList.remove('flipped');
  fcFlipped = false;

  document.getElementById('fc-korean').textContent = c.korean;
  document.getElementById('fc-romanization').textContent = c.romanization;
  document.getElementById('fc-korean-sm').textContent = c.korean;
  document.getElementById('fc-english').textContent = c.english;
  document.getElementById('fc-tip').textContent = c.tip || '';

  const soundoutPanel = document.getElementById('soundout-panel');
  if (fcIsAlphabet && c.breakdown) {
    soundoutPanel.style.display = 'block';
    document.getElementById('soundout-breakdown').textContent = c.breakdown;
  } else {
    soundoutPanel.style.display = 'none';
  }

  speakBtn = document.getElementById('fc-speak-btn');
  setTimeout(() => speak(c.korean), 300);
}

function flipCard() {
  fcFlipped = !fcFlipped;
  document.getElementById('fc-card').classList.toggle('flipped', fcFlipped);
}

function speakCurrent() { speak(fcCards[fcIndex].korean); }

function nextCard() {
  if (fcIndex < fcCards.length - 1) { fcIndex++; renderFlashcard(); }
  else finishFlashcards();
}

function prevCard() {
  if (fcIndex > 0) { fcIndex--; renderFlashcard(); }
}

function markCard() { nextCard(); }

function finishFlashcards() {
  state.points += 10;
  state.modules[currentModuleId].levels[currentLevelId].lessonsComplete = true;
  checkBadge('firstLesson');
  checkAllBadges();
  saveState();
  alert('🎉 Great job! +10 points earned!\n\nFlashcards complete. Now take the quiz!');
  showModule(currentModuleId);
}

// ---- QUIZ STATE ----
// Time-based scoring (Kahoot-style) × attempt multiplier:
//   timeScore  = 10 (instant) → 5 (at 20 s), linear
//   multiplier = 1st try ×1.0 | 2nd ×0.6 | 3rd ×0.3 | 4th+ ×0.1
//   earnedPts  = max(1, round(timeScore × multiplier))
let quizQueue = [];
let quizDone = [];
let quizInitialCount = 0;
let quizAnswered = false;
let questionStartTime = 0;
let questionTimerInterval = null;
const QUESTION_TIME_LIMIT = 20000;

function calculateQuestionPoints(timeTaken, attempts) {
  const t = Math.min(timeTaken, QUESTION_TIME_LIMIT);
  const timeScore = 5 + 5 * (1 - t / QUESTION_TIME_LIMIT);
  const multipliers = [1.0, 0.6, 0.3, 0.1];
  const mult = multipliers[Math.min(attempts - 1, 3)];
  return Math.max(1, Math.round(timeScore * mult));
}

function updateTimerBar() {
  const elapsed = Date.now() - questionStartTime;
  const remaining = Math.max(0, QUESTION_TIME_LIMIT - elapsed);
  const pct = (remaining / QUESTION_TIME_LIMIT) * 100;
  const bar = document.getElementById('quiz-timer-bar');
  const num = document.getElementById('quiz-timer-num');
  if (bar) {
    bar.style.width = pct + '%';
    bar.className = 'quiz-timer-bar' + (pct <= 20 ? ' danger' : pct <= 45 ? ' warning' : '');
  }
  if (num) num.textContent = Math.ceil(remaining / 1000);
  if (remaining <= 0) clearInterval(questionTimerInterval);
}

function generateQuizQuestions(levelData) {
  const cards = levelData.cards;
  const scenarios = levelData.scenarios || [];
  const questions = [];

  function pickOthers(exclude, n) {
    return cards.filter(c => c.korean !== exclude.korean).sort(() => Math.random() - 0.5).slice(0, n);
  }

  const selected = [...cards].sort(() => Math.random() - 0.5).slice(0, Math.min(10, cards.length));
  const shuffledScenarios = [...scenarios].sort(() => Math.random() - 0.5);
  let scenarioIdx = 0;

  selected.forEach((card, i) => {
    const type = i % 3;
    if (type === 0) {
      const others = pickOthers(card, 3);
      const pairs = [[card.english, card.korean], ...others.map(c => [c.english, c.korean])].sort(() => Math.random() - 0.5);
      questions.push({ type: 'ko-en', questionKorean: card.korean, questionRom: card.romanization, questionText: 'What does this mean?', answer: card.english, options: pairs.map(p => p[0]), optionKorean: pairs.map(p => p[1]) });
    } else if (type === 1) {
      const others = pickOthers(card, 3);
      const options = [card.korean, ...others.map(c => c.korean)].sort(() => Math.random() - 0.5);
      questions.push({ type: 'en-ko', questionText: card.english, answer: card.korean, options, answerRom: card.romanization });
    } else {
      if (shuffledScenarios.length > 0) {
        const sc = shuffledScenarios[scenarioIdx % shuffledScenarios.length];
        scenarioIdx++;
        const anchor = cards.find(c => c.korean === sc.answer) || card;
        const others = pickOthers(anchor, 3);
        const options = [sc.answer, ...others.map(c => c.korean)].sort(() => Math.random() - 0.5);
        questions.push({ type: 'scenario', questionText: sc.situation, answer: sc.answer, answerRom: sc.romanization, answerEn: sc.english, options });
      } else {
        const others = pickOthers(card, 3);
        const options = [card.english, ...others.map(c => c.english)].sort(() => Math.random() - 0.5);
        questions.push({ type: 'ko-en', questionKorean: card.korean, questionRom: card.romanization, questionText: 'What does this mean?', answer: card.english, options });
      }
    }
  });
  return questions.slice(0, 10);
}

function startQuizForModule(moduleId, levelId) {
  const mod = MODULES.find(m => m.id === moduleId);
  const levelData = mod.levels.find(l => l.level === levelId);
  lastQuizModuleId = moduleId;
  lastQuizLevelId = levelId;
  currentModuleId = moduleId;
  currentLevelId = levelId;

  const questions = generateQuizQuestions(levelData);
  quizQueue = questions.map(q => ({ ...q, attempts: 0 }));
  quizDone = [];
  quizInitialCount = questions.length;
  quizAnswered = false;

  document.getElementById('quiz-module-title').textContent = `${mod.title} — Level ${levelId} Quiz`;
  document.getElementById('quiz-score-display').textContent = `0/${quizInitialCount}`;
  renderQuizQuestion();
  showScreen('quiz');
  setNav('quiz');
}

function renderQuizQuestion() {
  const q = quizQueue[0];
  const doneCount = quizDone.length;
  document.getElementById('screen-quiz').classList.remove('quiz-end-active');
  document.getElementById('quiz-progress-bar').style.width = (doneCount / quizInitialCount * 100) + '%';
  document.getElementById('quiz-score-display').textContent = `${doneCount}/${quizInitialCount}`;
  quizAnswered = false;

  let html = `<div class="quiz-question">`;
  html += `<div class="quiz-timer-wrap"><div class="quiz-timer-bar-outer"><div class="quiz-timer-bar" id="quiz-timer-bar"></div></div><span class="quiz-timer-num" id="quiz-timer-num">20</span></div>`;
  if (q.attempts > 0) {
    html += `<div class="quiz-q-num"><span class="quiz-retry-badge">↻ RETRY #${q.attempts + 1}</span></div>`;
  } else {
    html += `<div class="quiz-q-num">QUESTION ${doneCount + 1} OF ${quizInitialCount}</div>`;
  }

  if (q.type === 'scenario') {
    html += `<div class="quiz-scenario-badge">🎭 SCENARIO</div><div class="quiz-q-text">${q.questionText}</div>`;
  } else if (q.type === 'ko-en') {
    html += `<div class="quiz-q-text">${q.questionText}</div>`;
    html += `<div class="quiz-q-korean">${q.questionKorean}</div>`;
    html += `<div class="quiz-q-rom">${q.questionRom}</div>`;
    html += `<button class="quiz-speak-btn" onclick="speak('${q.questionKorean.replace(/'/g,"\\'")}')"><svg viewBox="0 0 24 24" fill="none" width="18" height="18" style="vertical-align:middle;margin-right:6px"><path d="M3 9H7L12 4V20L7 15H3V9Z" fill="currentColor"/><path d="M16 8.5C17.333 9.667 17.333 14.333 16 15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M19 6C21.667 8.333 21.667 15.667 19 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg> Hear it</button>`;
  } else {
    html += `<div class="quiz-q-text">How do you say: <strong>"${q.questionText}"</strong> in Korean?</div>`;
  }

  html += `<div class="quiz-options">`;
  q.options.forEach((opt, idx) => {
    const korean = isKorean(opt) ? opt : (q.optionKorean ? q.optionKorean[idx] : null);
    const speakPart = korean ? `<span class="quiz-option-speak" onclick="event.stopPropagation();speak('${korean.replace(/'/g,"\\'")}')" title="Hear pronunciation" role="button" tabindex="0">${SPEAKER_SVG}</span>` : '';
    html += `<button class="quiz-option" id="qopt-${idx}" onclick="answerQuiz(${idx})"><span class="quiz-option-text">${opt}</span>${speakPart}</button>`;
  });
  html += `</div></div>`;
  html += `<div class="quiz-bottom"><div id="quiz-feedback" class="quiz-feedback"></div><button class="quiz-next-btn" id="quiz-next-btn" onclick="advanceQuiz()">Next Question →</button></div>`;

  document.getElementById('quiz-body').innerHTML = html;

  clearInterval(questionTimerInterval);
  questionStartTime = Date.now();
  questionTimerInterval = setInterval(updateTimerBar, 100);
  updateTimerBar();
}

function advanceQuiz() {
  clearInterval(questionTimerInterval);
  if (quizQueue.length === 0) showQuizEnd();
  else renderQuizQuestion();
}

function answerQuiz(idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  clearInterval(questionTimerInterval);
  const timeTaken = Date.now() - questionStartTime;

  const q = quizQueue[0];
  const correct = q.options[idx] === q.answer;
  q.attempts++;

  if (correct) {
    q.earnedPoints = calculateQuestionPoints(timeTaken, q.attempts);
    quizDone.push(q);
    quizQueue.shift();
  } else {
    quizQueue.shift();
    quizQueue.push(q);
  }

  document.getElementById('quiz-score-display').textContent = `${quizDone.length}/${quizInitialCount}`;

  q.options.forEach((opt, i) => {
    const btn = document.getElementById('qopt-' + i);
    btn.disabled = true;
    if (opt === q.answer) btn.classList.add('correct');
    else if (i === idx && !correct) btn.classList.add('wrong');
  });

  const fb = document.getElementById('quiz-feedback');
  const koreanToSpeak = q.type === 'ko-en' ? q.questionKorean : q.answer;

  if (correct) {
    const pts = q.earnedPoints;
    const speedLabel = timeTaken < 5000 ? ' ⚡' : '';
    fb.className = 'quiz-feedback correct visible';
    fb.textContent = q.attempts === 1
      ? `✓ Correct! +${pts} pts${speedLabel}`
      : `✓ Got it! +${pts} pts (attempt ${q.attempts})`;
  } else {
    fb.className = 'quiz-feedback wrong visible';
    const rom = q.answerRom ? ` (${q.answerRom})` : '';
    fb.textContent = `✗ Answer: ${q.answer}${rom} — we'll ask again!`;
  }

  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.classList.add('visible');
  nextBtn.textContent = quizQueue.length === 0 ? 'See Results' : 'Next Question →';
  setTimeout(() => nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  setTimeout(() => speak(koreanToSpeak), 300);
}

function showQuizEnd() {
  const totalPoints = quizDone.reduce((sum, q) => sum + (q.earnedPoints || 0), 0);
  const maxPoints = quizInitialCount * 10;
  const pct = Math.round((totalPoints / maxPoints) * 100);
  const pass = pct >= 70;

  document.getElementById('screen-quiz').classList.add('quiz-end-active');
  document.getElementById('quiz-progress-bar').style.width = '100%';

  state.modules[currentModuleId].levels[currentLevelId].quizScore = pct;
  let bonusPts = 0;
  if (pct >= 90) bonusPts = 50;
  else if (pct >= 70) bonusPts = 25;
  state.points += bonusPts;

  let unlockMsg = '';
  if (pass) {
    const nextLvl = currentLevelId + 1;
    if (nextLvl <= 3 && nextLvl <= maxLevel()) {
      unlockMsg = `🔓 Level ${nextLvl} unlocked!`;
    }
    if (currentLevelId === 1 && currentModuleId < 6) {
      const nextId = currentModuleId + 1;
      if (!state.modules[nextId].unlocked) {
        state.modules[nextId].unlocked = true;
        const nextMod = MODULES.find(m => m.id === nextId);
        unlockMsg += (unlockMsg ? '  ' : '') + `🔓 ${nextMod.title} unlocked!`;
      }
    }
  }

  checkAllBadges();
  saveState();

  const firstTry   = quizDone.filter(q => q.attempts === 1).length;
  const secondTry  = quizDone.filter(q => q.attempts === 2).length;
  const moreTry    = quizDone.filter(q => q.attempts >= 3).length;
  const lightning  = quizDone.filter(q => q.attempts === 1 && (q.earnedPoints || 0) >= 9).length;
  let breakdownHtml = '';
  if (firstTry > 0)  breakdownHtml += `<div class="quiz-breakdown-item"><span class="qbd-pts">${firstTry} cards</span><span class="qbd-label">First try ✓</span></div>`;
  if (secondTry > 0) breakdownHtml += `<div class="quiz-breakdown-item"><span class="qbd-pts">${secondTry} cards</span><span class="qbd-label">Second try ✓</span></div>`;
  if (moreTry > 0)   breakdownHtml += `<div class="quiz-breakdown-item"><span class="qbd-pts">${moreTry} cards</span><span class="qbd-label">Multiple tries ✓</span></div>`;
  if (lightning > 0) breakdownHtml += `<div class="quiz-breakdown-item"><span class="qbd-pts">⚡ ${lightning}</span><span class="qbd-label">Lightning fast (&lt;5s)</span></div>`;

  const emoji = pct === 100 ? '🏆' : pct >= 90 ? '⭐' : pct >= 70 ? '✅' : '📚';
  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-end">
      <div class="quiz-end-emoji">${emoji}</div>
      <div class="quiz-end-score">${totalPoints}/${maxPoints}</div>
      <div class="quiz-end-label">${pct}% — ${quizInitialCount} cards mastered</div>
      <div class="quiz-end-badge ${pass ? 'pass' : 'fail'}">${pass ? '✅ PASSED' : '❌ TRY AGAIN — Need 70%'}</div>
      ${breakdownHtml ? `<div class="quiz-breakdown">${breakdownHtml}</div>` : ''}
      ${bonusPts > 0 ? `<div class="quiz-end-pts">+${bonusPts} bonus points!</div>` : ''}
      ${unlockMsg ? `<div class="quiz-end-unlock">${unlockMsg}</div>` : ''}
      <div class="quiz-end-actions">
        <button class="btn-primary" onclick="showModule(currentModuleId)">Back to Module</button>
        ${!pass ? `<button class="btn-secondary" onclick="startQuizForModule(currentModuleId, currentLevelId)">Retry Quiz</button>` : ''}
        <button class="btn-secondary" onclick="showHome()">Home</button>
      </div>
    </div>
  `;
}

// ---- PROGRESS RENDER ----
function renderProgress() {
  const ms = state.modules;
  document.getElementById('prog-points').textContent = state.points;
  document.getElementById('prog-streak').textContent = state.streak.count;
  const done = [1,2,3,4,5,6,7].filter(i => ms[i].levels[1].lessonsComplete).length;
  document.getElementById('prog-modules').textContent = done + '/7';

  const bg = document.getElementById('badge-grid');
  bg.innerHTML = '';
  BADGES.forEach(b => {
    const earned = state.badges[b.id];
    const el = document.createElement('div');
    el.className = 'badge-item ' + (earned ? 'earned' : 'locked');
    el.innerHTML = `<div class="badge-emoji">${b.emoji}</div><div class="badge-name">${b.name}</div>`;
    bg.appendChild(el);
  });

  const sp = document.getElementById('study-plan');
  sp.innerHTML = '';
  STUDY_PLAN.forEach(d => {
    const el = document.createElement('div');
    el.className = 'plan-day';
    el.innerHTML = `<span class="plan-day-num">DAY ${d.day}</span><span class="plan-day-topic">${d.topic}</span><span class="plan-day-check">${d.day <= state.streak.count ? '✅' : '⬜'}</span>`;
    sp.appendChild(el);
  });
}

// ---- INIT ----
window.addEventListener('load', () => {
  if (ttsSupported) { speechSynthesis.getVoices(); speechSynthesis.addEventListener('voiceschanged', () => {}); }
  if (!state.difficulty) { showScreen('difficulty'); }
  else { showHome(); }
});
