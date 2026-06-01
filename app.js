// =============================================
// KOREAN TRAVEL ESSENTIALS — app.js
// =============================================

// ---- TTS (Text-to-Speech) ----
const ttsSupported = 'speechSynthesis' in window;
let speakBtn = null;

function pickFemaleKoreanVoice() {
  const voices = speechSynthesis.getVoices();
  const femaleNames = ['yuna', 'jooyeon', 'jiyeon', 'soyeon', 'minjung', 'female', 'woman', 'girl', 'f_'];
  const koVoices = voices.filter(v => v.lang.startsWith('ko'));
  if (!koVoices.length) return null;
  return koVoices.find(v => femaleNames.some(n => v.name.toLowerCase().includes(n))) || koVoices[0];
}

function speak(text, onEnd) {
  if (!ttsSupported) return;
  speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'ko-KR';
  utt.rate = 0.85;
  utt.pitch = 1.05;
  if (speakBtn) speakBtn.classList.add('speaking');
  utt.onend = () => { if (speakBtn) speakBtn.classList.remove('speaking'); if (onEnd) onEnd(); };
  utt.onerror = () => { if (speakBtn) speakBtn.classList.remove('speaking'); };
  const voice = pickFemaleKoreanVoice();
  if (voice) utt.voice = voice;
  speechSynthesis.speak(utt);
}

function isKorean(text) {
  return /[가-힯ᄀ-ᇿ]/.test(text);
}

const SPEAKER_SVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M3 9H7L12 4V20L7 15H3V9Z" fill="currentColor"/><path d="M16 8.5C17.333 9.667 17.333 14.333 16 15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M19 6C21.667 8.333 21.667 15.667 19 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

// ---- MODULE DATA ----
const MODULES = [
  {
    id: 1,
    title: "Survival Basics",
    emoji: "🗣️",
    description: "Essential phrases every traveler needs from day one.",
    cards: [
      { korean: "안녕하세요", romanization: "annyeonghaseyo", english: "Hello", tip: "Use any time of day — it's a formal all-purpose greeting." },
      { korean: "안녕히 가세요", romanization: "annyeonghi gaseyo", english: "Goodbye", tip: "Said to someone who is leaving. If you're the one leaving, say 안녕히 계세요." },
      { korean: "감사합니다", romanization: "gamsahamnida", english: "Thank you", tip: "Formal thank you — use in shops, restaurants, and with strangers." },
      { korean: "죄송합니다", romanization: "joesonghamnida", english: "Sorry / I apologize", tip: "Formal apology. More sincere than 미안해요." },
      { korean: "실례합니다", romanization: "sillyehamnida", english: "Excuse me", tip: "Use to get someone's attention politely." },
      { korean: "네", romanization: "ne", english: "Yes", tip: "Simple agreement. Can also show you're listening." },
      { korean: "아니요", romanization: "aniyo", english: "No", tip: "Polite refusal. Softer than just shaking your head." },
      { korean: "모르겠어요", romanization: "moreugesseoyo", english: "I don't understand", tip: "Very useful phrase — locals will often then speak slower." },
      { korean: "천천히 말해주세요", romanization: "cheoncheonhi malhaejuseyo", english: "Please speak slowly", tip: "Follow this with 감사합니다 when they do." },
      { korean: "얼마예요?", romanization: "eolmayeyo?", english: "How much is it?", tip: "Works anywhere — shops, taxis, food stalls." },
    ],
    scenarios: [
      { situation: "A shopkeeper helps you and you want to say thank you.", answer: "감사합니다", romanization: "gamsahamnida", english: "Thank you" }
    ]
  },
  {
    id: 2,
    title: "Getting Around",
    emoji: "🚇",
    description: "Navigate subways, buses, taxis and streets with confidence.",
    cards: [
      { korean: "왼쪽", romanization: "oenjjok", english: "Left", tip: "Point while saying this to confirm directions." },
      { korean: "오른쪽", romanization: "oreunjjok", english: "Right", tip: "Essential when giving taxi directions." },
      { korean: "직진", romanization: "jikjin", english: "Straight ahead", tip: "Use in taxis or when getting walking directions." },
      { korean: "가까워요", romanization: "gakkaweoyo", english: "It's near", tip: "Helpful to understand if a destination is walkable." },
      { korean: "멀어요", romanization: "meoreoyo", english: "It's far", tip: "If you hear this, probably take the subway or taxi." },
      { korean: "지하철", romanization: "jihacheol", english: "Subway", tip: "Seoul's subway is one of the best in the world — very easy to navigate." },
      { korean: "버스", romanization: "beoseu", english: "Bus", tip: "Buses in Korea are color-coded by route type." },
      { korean: "택시", romanization: "taeksi", english: "Taxi", tip: "Use KakaoTaxi app for easy ordering in English." },
      { korean: "공항", romanization: "gonghang", english: "Airport", tip: "Incheon (ICN) for Seoul, Jeju (CJU) for Jeju Island." },
      { korean: "역", romanization: "yeok", english: "Station", tip: "Subway stations are called 역 (yeok)." },
      { korean: "___에 어떻게 가요?", romanization: "_e eotteoke gayo?", english: "How do I get to ___?", tip: "Replace ___ with your destination name." },
      { korean: "여기 세워주세요", romanization: "yeogi sewojuseyo", english: "Please stop here", tip: "Essential for taxis — say this when you see your destination." },
    ],
    scenarios: [
      { situation: "You're in a taxi and want to stop here.", answer: "여기 세워주세요", romanization: "yeogi sewojuseyo", english: "Please stop here" }
    ]
  },
  {
    id: 3,
    title: "Food & Dining",
    emoji: "🍜",
    description: "Order food, handle dietary restrictions, and enjoy Korean cuisine.",
    cards: [
      { korean: "메뉴 주세요", romanization: "menyu juseyo", english: "Menu please", tip: "Many restaurants now have photo menus — great for pointing!" },
      { korean: "계산서 주세요", romanization: "gyesanseo juseyo", english: "Bill please", tip: "Or just walk to the register — common in Korean restaurants." },
      { korean: "맛있어요", romanization: "masisseoyo", english: "Delicious!", tip: "Say this to your host or server — they'll love hearing it." },
      { korean: "물 주세요", romanization: "mul juseyo", english: "Water please", tip: "Free water is standard in Korean restaurants." },
      { korean: "비빔밥", romanization: "bibimbap", english: "Mixed rice bowl", tip: "Rice topped with vegetables, meat, egg and gochujang. A must-try!" },
      { korean: "삼겹살", romanization: "samgyeopsal", english: "Grilled pork belly", tip: "Korean BBQ staple. Wrap in lettuce with garlic and ssamjang." },
      { korean: "떡볶이", romanization: "tteokbokki", english: "Spicy rice cakes", tip: "A popular street food. Very spicy — you've been warned!" },
      { korean: "불고기", romanization: "bulgogi", english: "Marinated beef", tip: "Sweet, savory grilled beef. Great for non-spicy eaters." },
      { korean: "돼지고기 없이", romanization: "dwaejigogi eopsi", english: "Without pork", tip: "Important for halal or religious dietary needs." },
      { korean: "맵지 않게", romanization: "maepji ange", english: "Not spicy", tip: "Say this early — Korean food defaults to spicy." },
      { korean: "알레르기 있어요", romanization: "allereugi isseoyo", english: "I have allergies", tip: "Follow with the specific allergen for clarity." },
      { korean: "흑돼지", romanization: "heukdwaeji", english: "Jeju black pork", tip: "A Jeju Island specialty — don't leave without trying it." },
      { korean: "한라봉", romanization: "hallabong", english: "Hallabong orange", tip: "Sweet Jeju citrus. Buy fresh at local markets." },
    ],
    scenarios: [
      { situation: "You want to order food without pork.", answer: "돼지고기 없이", romanization: "dwaejigogi eopsi", english: "Without pork" }
    ]
  },
  {
    id: 4,
    title: "Shopping",
    emoji: "🛍️",
    description: "Bargain at markets, understand prices, and shop like a local.",
    cards: [
      { korean: "얼마예요?", romanization: "eolmayeyo?", english: "How much is it?", tip: "The most important shopping phrase. Ask freely!" },
      { korean: "너무 비싸요", romanization: "neomu bissayo", english: "Too expensive", tip: "Saying this can sometimes lead to a discount at markets." },
      { korean: "깎아주세요", romanization: "kkakka juseyo", english: "Please give a discount", tip: "Works better at traditional markets than chain stores." },
      { korean: "영수증 주세요", romanization: "yeongsujeung juseyo", english: "Receipt please", tip: "Needed for tax refunds on purchases over ₩30,000." },
      { korean: "작은", romanization: "jageun", english: "Small", tip: "Korean sizing runs small — always check before buying." },
      { korean: "중간", romanization: "junggan", english: "Medium", tip: "Ask for 중간 사이즈 (junggan saijeu) for medium size." },
      { korean: "큰", romanization: "keun", english: "Large", tip: "Say 큰 사이즈 주세요 for 'give me a large size'." },
      { korean: "편의점", romanization: "pyeonuijeom", english: "Convenience store", tip: "GS25, CU, 7-Eleven are everywhere — 24/7 lifesavers." },
      { korean: "시장", romanization: "sijang", english: "Market", tip: "Gwangjang Market in Seoul, Dongmun Market in Jeju." },
      { korean: "약국", romanization: "yakguk", english: "Pharmacy", tip: "Look for the green cross sign. Staff often speak basic English." },
      { korean: "백화점", romanization: "baekwajeom", english: "Department store", tip: "Lotte, Hyundai, Shinsegae — world-class shopping experience." },
    ],
    scenarios: [
      { situation: "You're at a market stall and want to know the price.", answer: "얼마예요?", romanization: "eolmayeyo?", english: "How much is it?" }
    ]
  },
  {
    id: 5,
    title: "Accommodation",
    emoji: "🏨",
    description: "Handle check-in, requests, and common hotel situations.",
    cards: [
      { korean: "체크인 하고 싶어요", romanization: "chekeu-in hago sipeoyo", english: "I'd like to check in", tip: "Present your passport — it's required by Korean law." },
      { korean: "예약했어요", romanization: "yeyakhaesseoyo", english: "I have a reservation", tip: "Follow with your name for quick service." },
      { korean: "몇 시에 체크아웃이에요?", romanization: "myeot sie chekeu-ausieyo?", english: "What time is checkout?", tip: "Standard checkout in Korea is 11am or 12pm." },
      { korean: "수건 더 주세요", romanization: "sugeon deo juseyo", english: "More towels please", tip: "Call the front desk or press the room service button." },
      { korean: "와이파이 비밀번호가 뭐예요?", romanization: "waipai bimilbeonhoga mwoyeyo?", english: "What's the WiFi password?", tip: "Often printed on a card on the desk or TV screen." },
      { korean: "룸서비스 있어요?", romanization: "rumsseobiseu isseoyo?", english: "Is there room service?", tip: "Many Korean hotels have 24-hour delivery options." },
      { korean: "에어컨이 안 돼요", romanization: "eeokeoni an dwaeyo", english: "The AC isn't working", tip: "Call 프런트 (peurenteu = front desk) immediately." },
      { korean: "뜨거운 물이 안 나와요", romanization: "tteugeoun muri an nawayo", english: "No hot water", tip: "Not common in Korea but useful to know." },
    ],
    scenarios: [
      { situation: "You just arrived at your hotel and need the WiFi password.", answer: "와이파이 비밀번호가 뭐예요?", romanization: "waipai bimilbeonhoga mwoyeyo?", english: "What's the WiFi password?" }
    ]
  },
  {
    id: 6,
    title: "Emergencies",
    emoji: "🆘",
    description: "Stay safe — essential phrases for urgent situations.",
    cards: [
      { korean: "도와주세요!", romanization: "dowajuseyo!", english: "Help!", tip: "Shout loudly — Koreans will respond quickly." },
      { korean: "경찰을 불러주세요", romanization: "gyeongchareul bulleojuseyo", english: "Call the police", tip: "Police emergency number in Korea: 112." },
      { korean: "구급차를 불러주세요", romanization: "gugeupchareul bulleojuseyo", english: "Call an ambulance", tip: "Medical emergency number in Korea: 119." },
      { korean: "아파요", romanization: "apayo", english: "I'm sick / It hurts", tip: "Point to where it hurts while saying this." },
      { korean: "의사가 필요해요", romanization: "uisaga piryohaeyo", english: "I need a doctor", tip: "Korean hospitals have international clinics in major cities." },
      { korean: "병원이 어디예요?", romanization: "byeongwoni eodiyeyo?", english: "Where is the hospital?", tip: "Any pharmacy can direct you to the nearest hospital." },
      { korean: "약국이 어디예요?", romanization: "yakgugi eodiyeyo?", english: "Where is the pharmacy?", tip: "Look for the green cross. Very common in Korean cities." },
      { korean: "길을 잃었어요", romanization: "gireul ireoссeoyo", english: "I'm lost", tip: "Show your hotel's address card — most hotels provide them." },
      { korean: "이 주소로 가주세요", romanization: "i jusoro gajuseyo", english: "Please take me to this address", tip: "Show the address on your phone while saying this." },
    ],
    scenarios: [
      { situation: "You feel unwell and need medical help.", answer: "의사가 필요해요", romanization: "uisaga piryohaeyo", english: "I need a doctor" }
    ]
  },
  {
    id: 7,
    title: "Read Korean",
    emoji: "🔤",
    description: "Learn Hangul — the Korean alphabet. Sound out letters before knowing meaning.",
    isAlphabet: true,
    cards: [
      // VOWELS
      { korean: "ㅏ", romanization: "a", english: "Vowel: 'a'", tip: "Like 'a' in 'father'. The vertical stroke has a short branch to the right.", breakdown: "Simple vowel — sounds like: AH" },
      { korean: "ㅓ", romanization: "eo", english: "Vowel: 'eo'", tip: "Like 'u' in 'sun'. Branch points left.", breakdown: "Simple vowel — sounds like: UH" },
      { korean: "ㅗ", romanization: "o", english: "Vowel: 'o'", tip: "Like 'o' in 'bone'. Horizontal line with branch pointing up.", breakdown: "Simple vowel — sounds like: OH" },
      { korean: "ㅜ", romanization: "u", english: "Vowel: 'u'", tip: "Like 'oo' in 'moon'. Branch points down.", breakdown: "Simple vowel — sounds like: OO" },
      { korean: "ㅡ", romanization: "eu", english: "Vowel: 'eu'", tip: "No English equivalent. Lips flat, sound in back of throat.", breakdown: "Simple vowel — sounds like: UH (lips flat)" },
      { korean: "ㅣ", romanization: "i", english: "Vowel: 'i'", tip: "Like 'ee' in 'feet'. Just a vertical stroke.", breakdown: "Simple vowel — sounds like: EE" },
      { korean: "ㅑ", romanization: "ya", english: "Vowel: 'ya'", tip: "Like 'ya' in 'yard'. ㅏ with an extra branch.", breakdown: "Double ㅏ = YA sound" },
      { korean: "ㅕ", romanization: "yeo", english: "Vowel: 'yeo'", tip: "Like 'yo' in 'young'. Double-branched ㅓ.", breakdown: "Double ㅓ = YEO sound" },
      { korean: "ㅛ", romanization: "yo", english: "Vowel: 'yo'", tip: "Like 'yo' in 'yoga'. ㅗ with double branches.", breakdown: "Double ㅗ = YO sound" },
      { korean: "ㅠ", romanization: "yu", english: "Vowel: 'yu'", tip: "Like 'you'. ㅜ with double branches.", breakdown: "Double ㅜ = YU sound" },
      // CONSONANTS
      { korean: "ㄱ", romanization: "g/k", english: "Consonant: 'g' or 'k'", tip: "Like 'g' in 'go' at the start, 'k' at the end.", breakdown: "Looks like an L-shape — G at start, K at end" },
      { korean: "ㄴ", romanization: "n", english: "Consonant: 'n'", tip: "Like 'n' in 'no'. Shaped like an angled L.", breakdown: "Looks like a corner — always N sound" },
      { korean: "ㄷ", romanization: "d/t", english: "Consonant: 'd' or 't'", tip: "Like 'd' in 'do' or 't' in 'top'.", breakdown: "Looks like a backwards C — D at start, T at end" },
      { korean: "ㄹ", romanization: "r/l", english: "Consonant: 'r' or 'l'", tip: "Between English R and L. Tongue flap sound.", breakdown: "Complex shape — R between vowels, L at end" },
      { korean: "ㅁ", romanization: "m", english: "Consonant: 'm'", tip: "Like 'm' in 'mother'. Looks like a small square.", breakdown: "Square shape — always M sound" },
      { korean: "ㅂ", romanization: "b/p", english: "Consonant: 'b' or 'p'", tip: "Like 'b' in 'boy' or 'p' in 'pop'.", breakdown: "Looks like a π shape — B at start, P at end" },
      { korean: "ㅅ", romanization: "s", english: "Consonant: 's'", tip: "Like 's' in 'sun'. Looks like a person with arms out.", breakdown: "Person shape — S sound" },
      { korean: "ㅇ", romanization: "-/ng", english: "Consonant: silent / 'ng'", tip: "Silent at the start of a syllable. 'ng' sound at the end.", breakdown: "Circle shape — silent start, NG end" },
      { korean: "ㅈ", romanization: "j", english: "Consonant: 'j'", tip: "Like 'j' in 'jump'.", breakdown: "Like ㅅ with a crossbar — J sound" },
      { korean: "ㅎ", romanization: "h", english: "Consonant: 'h'", tip: "Like 'h' in 'hello'.", breakdown: "Circle with a hat — H sound" },
      // SYLLABLE BLOCKS
      { korean: "가", romanization: "ga", english: "Syllable: ga", tip: "ㄱ(g) + ㅏ(a) = 가(ga). First syllable of the Korean alphabet!", breakdown: "ㄱ (g) + ㅏ (a) = 가 (ga)" },
      { korean: "나", romanization: "na", english: "Syllable: na", tip: "ㄴ(n) + ㅏ(a) = 나(na). Also means 'I/me' in informal speech!", breakdown: "ㄴ (n) + ㅏ (a) = 나 (na)" },
      { korean: "다", romanization: "da", english: "Syllable: da", tip: "ㄷ(d) + ㅏ(a) = 다(da). Also means 'all/everything'!", breakdown: "ㄷ (d) + ㅏ (a) = 다 (da)" },
      { korean: "마", romanization: "ma", english: "Syllable: ma", tip: "ㅁ(m) + ㅏ(a) = 마(ma). Used in many Korean words.", breakdown: "ㅁ (m) + ㅏ (a) = 마 (ma)" },
      { korean: "바", romanization: "ba", english: "Syllable: ba", tip: "ㅂ(b) + ㅏ(a) = 바(ba). 바다 (bada) means 'sea/ocean'!", breakdown: "ㅂ (b) + ㅏ (a) = 바 (ba)" },
      { korean: "사", romanization: "sa", english: "Syllable: sa", tip: "ㅅ(s) + ㅏ(a) = 사(sa). Also means the number 4!", breakdown: "ㅅ (s) + ㅏ (a) = 사 (sa)" },
      { korean: "아", romanization: "a", english: "Syllable: a", tip: "ㅇ(silent) + ㅏ(a) = 아(a). ㅇ is a placeholder here. Also means 'Oh!'", breakdown: "ㅇ (silent) + ㅏ (a) = 아 (a)" },
      { korean: "한국어", romanization: "han-gug-eo", english: "Korean language", tip: "You can now read this! 한(han) + 국(guk) + 어(eo).", breakdown: "한 (han) + 국 (guk) + 어 (eo) = Korean language" },
    ]
  }
];

const STUDY_PLAN = [
  { day: 1,  topic: "Module 1: Greetings & survival basics" },
  { day: 2,  topic: "Module 1: Quiz + review flashcards" },
  { day: 3,  topic: "Module 7: Korean alphabet — vowels" },
  { day: 4,  topic: "Module 7: Korean alphabet — consonants" },
  { day: 5,  topic: "Module 2: Getting around the city" },
  { day: 6,  topic: "Module 2: Quiz + transit practice" },
  { day: 7,  topic: "Review Modules 1–2, rest day" },
  { day: 8,  topic: "Module 3: Food & dining phrases" },
  { day: 9,  topic: "Module 3: Quiz + menu reading" },
  { day: 10, topic: "Module 4: Shopping & markets" },
  { day: 11, topic: "Module 4: Quiz + number practice" },
  { day: 12, topic: "Module 5: Accommodation phrases" },
  { day: 13, topic: "Module 6: Emergency phrases (important!)" },
  { day: 14, topic: "Full review: all modules quiz day 🎓" },
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
  streak: { lastDate: null, count: 0 },
  modules: {
    1: { lessonsComplete: false, quizScore: null, unlocked: true },
    2: { lessonsComplete: false, quizScore: null, unlocked: false },
    3: { lessonsComplete: false, quizScore: null, unlocked: false },
    4: { lessonsComplete: false, quizScore: null, unlocked: false },
    5: { lessonsComplete: false, quizScore: null, unlocked: false },
    6: { lessonsComplete: false, quizScore: null, unlocked: false },
    7: { lessonsComplete: false, quizScore: null, unlocked: true }, // alphabet always unlocked
  },
  badges: {
    firstLesson: false, streak7: false, quizMaster: false,
    jejuReady: false, seoulReady: false, courseComplete: false
  }
};

function loadState() {
  try {
    const raw = localStorage.getItem("korean-app-state");
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    const saved = JSON.parse(raw);
    // Ensure module 7 exists in older saves
    if (!saved.modules[7]) saved.modules[7] = { lessonsComplete: false, quizScore: null, unlocked: true };
    return saved;
  } catch(e) { return JSON.parse(JSON.stringify(DEFAULT_STATE)); }
}

function saveState() {
  localStorage.setItem("korean-app-state", JSON.stringify(state));
}

let state = loadState();

// ---- STREAK LOGIC ----
function updateStreak() {
  const today = new Date().toISOString().slice(0,10);
  const last = state.streak.lastDate;
  if (last === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
  if (last === yesterday) {
    state.streak.count++;
  } else {
    state.streak.count = 1;
  }
  state.streak.lastDate = today;
  if (state.streak.count >= 7) checkBadge('streak7');
  saveState();
}

// ---- BADGE LOGIC ----
function checkBadge(id) {
  if (!state.badges[id]) {
    state.badges[id] = true;
    saveState();
    // Could show a toast here
  }
}

function checkAllBadges() {
  const ms = state.modules;
  if (ms[1].lessonsComplete || ms[2].lessonsComplete || ms[3].lessonsComplete ||
      ms[4].lessonsComplete || ms[5].lessonsComplete || ms[6].lessonsComplete || ms[7].lessonsComplete)
    checkBadge('firstLesson');
  // quizMaster: all 6 travel modules passed at 70%+
  const allPassed = [1,2,3,4,5,6].every(i => ms[i].quizScore !== null && ms[i].quizScore >= 70);
  if (allPassed) checkBadge('quizMaster');
  // jejuReady: modules 1-3 done
  if ([1,2,3].every(i => ms[i].lessonsComplete && ms[i].quizScore >= 70)) checkBadge('jejuReady');
  // seoulReady: modules 4-6 done
  if ([4,5,6].every(i => ms[i].lessonsComplete && ms[i].quizScore >= 70)) checkBadge('seoulReady');
  // courseComplete: all 6 done
  if ([1,2,3,4,5,6].every(i => ms[i].lessonsComplete && ms[i].quizScore >= 70)) checkBadge('courseComplete');
}

// ---- NAVIGATION ----
let currentScreen = 'home';
let currentModuleId = 1;
let lastFlashcardModuleId = 1;
let lastQuizModuleId = 1;

function showScreen(id) {
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

function showHome() {
  renderHome();
  showScreen('home');
  setNav('home');
}

function showModule(id) {
  currentModuleId = id;
  renderModuleDetail(id);
  showScreen('module');
}

function showLastFlashcard() {
  startFlashcardsForModule(lastFlashcardModuleId);
}

function showLastQuiz() {
  startQuizForModule(lastQuizModuleId);
}

function showProgress() {
  renderProgress();
  showScreen('progress');
}

// ---- HOME RENDER ----
function renderHome() {
  updateStreak();

  const ms = state.modules;
  const totalModules = 7;
  const completedCount = [1,2,3,4,5,6,7].filter(i => ms[i].lessonsComplete).length;
  const pct = Math.round((completedCount / totalModules) * 100);

  document.getElementById('stat-points').textContent = state.points;
  document.getElementById('stat-streak').textContent = state.streak.count + '🔥';
  document.getElementById('stat-complete').textContent = pct + '%';

  const grid = document.getElementById('module-grid');
  grid.innerHTML = '';

  MODULES.forEach(mod => {
    const mstate = ms[mod.id];
    const unlocked = mstate.unlocked;
    const progress = mstate.lessonsComplete ? (mstate.quizScore !== null ? 100 : 50) : 0;

    const card = document.createElement('div');
    card.className = 'module-card ' + (unlocked ? 'unlocked' : 'locked');
    card.innerHTML = `
      <div class="module-num">MODULE ${mod.id}</div>
      <div class="module-emoji">${mod.emoji}</div>
      <div class="module-card-title">${mod.title}</div>
      <div class="module-prog-bar"><div class="module-prog-fill" style="width:${progress}%"></div></div>
      ${unlocked ? '' : '<div class="module-lock-icon">🔒 Complete previous module</div>'}
    `;
    if (unlocked) {
      card.onclick = () => showModule(mod.id);
    }
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

  // Lesson list
  const list = document.getElementById('lesson-list');
  list.innerHTML = '';

  const lessons = mod.isAlphabet
    ? [
        { name: 'Vowels (모음)', done: false },
        { name: 'Consonants (자음)', done: false },
        { name: 'Syllable Blocks', done: false },
      ]
    : [
        { name: 'Flashcard Deck', done: mstate.lessonsComplete },
        { name: 'Quiz', done: mstate.quizScore !== null && mstate.quizScore >= 70 },
      ];

  lessons.forEach(l => {
    const done = l.done;
    const item = document.createElement('div');
    item.className = 'lesson-item';
    item.innerHTML = `
      <span class="lesson-check">${done ? '✅' : '⬜'}</span>
      <span class="lesson-name">${l.name}</span>
    `;
    list.appendChild(item);
  });

  // Quiz button — disabled until flashcards viewed (except alphabet)
  const btnQuiz = document.getElementById('btn-quiz');
  if (mod.isAlphabet) {
    btnQuiz.disabled = false;
    btnQuiz.textContent = '📝 Take Quiz';
  } else {
    btnQuiz.disabled = !mstate.lessonsComplete;
    btnQuiz.textContent = mstate.lessonsComplete ? '📝 Take Quiz' : '📝 Take Quiz (finish flashcards first)';
  }
}

function startFlashcards() {
  startFlashcardsForModule(currentModuleId);
}

function startQuiz() {
  startQuizForModule(currentModuleId);
}

// ---- FLASHCARD STATE ----
let fcCards = [];
let fcIndex = 0;
let fcFlipped = false;
let fcIsAlphabet = false;

function startFlashcardsForModule(id) {
  const mod = MODULES.find(m => m.id === id);
  lastFlashcardModuleId = id;
  currentModuleId = id;
  fcCards = [...mod.cards];
  fcIndex = 0;
  fcFlipped = false;
  fcIsAlphabet = mod.isAlphabet || false;

  document.getElementById('fc-module-title').textContent = mod.title;
  renderFlashcard();
  showScreen('flashcard');
  setNav('flashcards');

  // Attach flip on card click
  const card = document.getElementById('fc-card');
  card.onclick = flipCard;
}

function renderFlashcard() {
  const c = fcCards[fcIndex];
  const total = fcCards.length;

  document.getElementById('fc-counter').textContent = `${fcIndex + 1} / ${total}`;
  const pct = ((fcIndex + 1) / total) * 100;
  document.getElementById('fc-progress-bar').style.width = pct + '%';

  // Reset flip
  const card = document.getElementById('fc-card');
  card.classList.remove('flipped');
  fcFlipped = false;

  // Fill front
  document.getElementById('fc-korean').textContent = c.korean;
  document.getElementById('fc-romanization').textContent = c.romanization;

  // Fill back
  document.getElementById('fc-korean-sm').textContent = c.korean;
  document.getElementById('fc-english').textContent = c.english;
  document.getElementById('fc-tip').textContent = c.tip || '';

  // Alphabet: show sound-out breakdown
  const soundoutPanel = document.getElementById('soundout-panel');
  if (fcIsAlphabet && c.breakdown) {
    soundoutPanel.style.display = 'block';
    document.getElementById('soundout-breakdown').textContent = c.breakdown;
  } else {
    soundoutPanel.style.display = 'none';
  }

  // Set speaker reference
  speakBtn = document.getElementById('fc-speak-btn');

  // Auto-speak Korean
  setTimeout(() => speak(c.korean), 300);
}

function flipCard() {
  const card = document.getElementById('fc-card');
  fcFlipped = !fcFlipped;
  card.classList.toggle('flipped', fcFlipped);
}

function speakCurrent() {
  const c = fcCards[fcIndex];
  speak(c.korean);
}

function nextCard() {
  if (fcIndex < fcCards.length - 1) {
    fcIndex++;
    renderFlashcard();
  } else {
    // Completed all cards
    finishFlashcards();
  }
}

function prevCard() {
  if (fcIndex > 0) {
    fcIndex--;
    renderFlashcard();
  }
}

function markCard(status) {
  // Simple tracking — just advance
  nextCard();
}

function finishFlashcards() {
  state.points += 10;
  state.modules[currentModuleId].lessonsComplete = true;
  checkBadge('firstLesson');
  checkAllBadges();
  saveState();

  // Show completion and go back to module
  alert('🎉 Great job! +10 points earned!\n\nAll flashcards complete. Now take the quiz!');
  showModule(currentModuleId);
}

// ---- QUIZ STATE ----
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function generateQuizQuestions(mod) {
  const questions = [];
  const cards = mod.cards;

  // Helper: pick N random unique items excluding one
  function pickOthers(exclude, n) {
    const pool = cards.filter(c => c.korean !== exclude.korean);
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }

  // Use up to 10 cards
  const selected = [...cards].sort(() => Math.random() - 0.5).slice(0, Math.min(10, cards.length));

  selected.forEach((card, i) => {
    const type = i % 3; // Cycle through 3 types

    if (type === 0) {
      // Korean → English
      const others = pickOthers(card, 3);
      const pairs = [[card.english, card.korean], ...others.map(c => [c.english, c.korean])].sort(() => Math.random() - 0.5);
      const options = pairs.map(p => p[0]);
      const optionKorean = pairs.map(p => p[1]);
      questions.push({
        type: 'ko-en',
        questionKorean: card.korean,
        questionRom: card.romanization,
        questionText: 'What does this mean?',
        answer: card.english,
        options,
        optionKorean
      });
    } else if (type === 1) {
      // English → Korean
      const others = pickOthers(card, 3);
      const options = [card.korean, ...others.map(c => c.korean)].sort(() => Math.random() - 0.5);
      questions.push({
        type: 'en-ko',
        questionText: card.english,
        answer: card.korean,
        options,
        answerRom: card.romanization
      });
    } else {
      // Scenario
      if (mod.scenarios && mod.scenarios.length > 0) {
        const sc = mod.scenarios[i % mod.scenarios.length];
        const others = pickOthers(cards.find(c => c.korean === sc.answer) || card, 3);
        const options = [sc.answer, ...others.map(c => c.korean)].sort(() => Math.random() - 0.5);
        questions.push({
          type: 'scenario',
          questionText: sc.situation,
          answer: sc.answer,
          answerRom: sc.romanization,
          answerEn: sc.english,
          options
        });
      } else {
        // Fall back to type 0
        const others = pickOthers(card, 3);
        const options = [card.english, ...others.map(c => c.english)].sort(() => Math.random() - 0.5);
        questions.push({
          type: 'ko-en',
          questionKorean: card.korean,
          questionRom: card.romanization,
          questionText: 'What does this mean?',
          answer: card.english,
          options
        });
      }
    }
  });

  return questions.slice(0, 10);
}

function startQuizForModule(id) {
  const mod = MODULES.find(m => m.id === id);
  lastQuizModuleId = id;
  currentModuleId = id;
  quizQuestions = generateQuizQuestions(mod);
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;

  document.getElementById('quiz-module-title').textContent = mod.title + ' Quiz';
  renderQuizQuestion();
  showScreen('quiz');
  setNav('quiz');
}

function renderQuizQuestion() {
  const q = quizQuestions[quizIndex];
  const total = quizQuestions.length;
  const pct = (quizIndex / total) * 100;

  document.getElementById('quiz-progress-bar').style.width = pct + '%';
  document.getElementById('quiz-score-display').textContent = `${quizScore}/${total}`;
  quizAnswered = false;

  let html = `<div class="quiz-question">`;
  html += `<div class="quiz-q-num">QUESTION ${quizIndex + 1} OF ${total}</div>`;

  if (q.type === 'scenario') {
    html += `<div class="quiz-scenario-badge">🎭 SCENARIO</div>`;
    html += `<div class="quiz-q-text">${q.questionText}</div>`;
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
    const speakPart = korean
      ? `<span class="quiz-option-speak" onclick="event.stopPropagation();speak('${korean.replace(/'/g,"\\'")}')" title="Hear pronunciation" role="button" tabindex="0">${SPEAKER_SVG}</span>`
      : '';
    html += `<button class="quiz-option" id="qopt-${idx}" onclick="answerQuiz(${idx})"><span class="quiz-option-text">${opt}</span>${speakPart}</button>`;
  });
  html += `</div>`;
  html += `<div id="quiz-feedback" class="quiz-feedback" style="display:none"></div>`;
  html += `</div>`;

  document.getElementById('quiz-body').innerHTML = html;
}

function answerQuiz(idx) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = quizQuestions[quizIndex];
  const chosen = q.options[idx];
  const correct = chosen === q.answer;
  if (correct) quizScore++;

  // Update score display
  document.getElementById('quiz-score-display').textContent = `${quizScore}/${quizQuestions.length}`;

  // Style buttons
  q.options.forEach((opt, i) => {
    const btn = document.getElementById('qopt-' + i);
    btn.disabled = true;
    if (opt === q.answer) btn.classList.add('correct');
    else if (i === idx && !correct) btn.classList.add('wrong');
  });

  // Feedback
  const fb = document.getElementById('quiz-feedback');
  fb.style.display = 'block';
  // Always speak the Korean answer for reinforcement
  const koreanToSpeak = q.type === 'ko-en'
    ? q.questionKorean
    : (q.type === 'en-ko' || q.type === 'scenario') ? q.answer : q.questionKorean;

  if (correct) {
    fb.className = 'quiz-feedback correct';
    fb.textContent = '✓ Correct! Well done.';
    setTimeout(() => speak(koreanToSpeak), 300);
  } else {
    fb.className = 'quiz-feedback wrong';
    const rom = q.answerRom ? ` (${q.answerRom})` : '';
    fb.textContent = `✗ The correct answer is: ${q.answer}${rom}`;
    setTimeout(() => speak(koreanToSpeak), 300);
  }

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'quiz-next-btn';
  nextBtn.textContent = quizIndex < quizQuestions.length - 1 ? 'Next Question →' : 'See Results';
  nextBtn.onclick = () => {
    quizIndex++;
    if (quizIndex < quizQuestions.length) {
      renderQuizQuestion();
    } else {
      showQuizEnd();
    }
  };
  document.getElementById('quiz-body').appendChild(nextBtn);
}

function showQuizEnd() {
  const total = quizQuestions.length;
  const pct = Math.round((quizScore / total) * 100);
  const pass = pct >= 70;

  // Update progress bar to 100%
  document.getElementById('quiz-progress-bar').style.width = '100%';

  // Save score
  state.modules[currentModuleId].quizScore = pct;
  let pts = 0;
  if (pct >= 90) pts = 50;
  else if (pct >= 70) pts = 25;
  state.points += pts;

  // Unlock next module
  let unlockMsg = '';
  if (pass && currentModuleId < 6) {
    const nextId = currentModuleId + 1;
    if (!state.modules[nextId].unlocked) {
      state.modules[nextId].unlocked = true;
      const nextMod = MODULES.find(m => m.id === nextId);
      unlockMsg = `🔓 Unlocked: ${nextMod.title}!`;
    }
  }

  checkAllBadges();
  saveState();

  const emoji = pct === 100 ? '🏆' : pct >= 90 ? '⭐' : pct >= 70 ? '✅' : '📚';
  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-end">
      <div class="quiz-end-emoji">${emoji}</div>
      <div class="quiz-end-score">${pct}%</div>
      <div class="quiz-end-label">${quizScore} out of ${total} correct</div>
      <div class="quiz-end-badge ${pass ? 'pass' : 'fail'}">${pass ? '✅ PASSED' : '❌ TRY AGAIN — Need 70%'}</div>
      ${pts > 0 ? `<div class="quiz-end-pts">+${pts} points earned!</div>` : ''}
      ${unlockMsg ? `<div class="quiz-end-unlock">${unlockMsg}</div>` : ''}
      <div class="quiz-end-actions">
        <button class="btn-primary" onclick="showModule(currentModuleId)">Back to Module</button>
        ${!pass ? `<button class="btn-secondary" onclick="startQuizForModule(currentModuleId)">Retry Quiz</button>` : ''}
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
  const done = [1,2,3,4,5,6,7].filter(i => ms[i].lessonsComplete).length;
  document.getElementById('prog-modules').textContent = done + '/7';

  // Badges
  const bg = document.getElementById('badge-grid');
  bg.innerHTML = '';
  BADGES.forEach(b => {
    const earned = state.badges[b.id];
    const el = document.createElement('div');
    el.className = 'badge-item ' + (earned ? 'earned' : 'locked');
    el.innerHTML = `<div class="badge-emoji">${b.emoji}</div><div class="badge-name">${b.name}</div>`;
    bg.appendChild(el);
  });

  // Study plan
  const today = new Date().toISOString().slice(0,10);
  const startDate = state.streak.lastDate || today;
  const sp = document.getElementById('study-plan');
  sp.innerHTML = '';
  STUDY_PLAN.forEach(d => {
    const el = document.createElement('div');
    el.className = 'plan-day';
    el.innerHTML = `
      <span class="plan-day-num">DAY ${d.day}</span>
      <span class="plan-day-topic">${d.topic}</span>
      <span class="plan-day-check">${d.day <= state.streak.count ? '✅' : '⬜'}</span>
    `;
    sp.appendChild(el);
  });
}

// ---- INIT ----
window.addEventListener('load', () => {
  // Load voices (needed for some browsers)
  if (ttsSupported) {
    speechSynthesis.getVoices();
    speechSynthesis.addEventListener('voiceschanged', () => {});
  }
  showHome();
});
