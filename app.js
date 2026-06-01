// =============================================
// KOREAN TRAVEL ESSENTIALS — app.js
// =============================================

// ---- TTS (Text-to-Speech) ----
const ttsSupported = 'speechSynthesis' in window;
let speakBtn = null;

let cachedVoices = [];
function loadVoices() {
  cachedVoices = speechSynthesis.getVoices();
}
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
    utt.lang = 'ko-KR';
    utt.rate = 0.85;
    utt.pitch = 1.05;
    if (speakBtn) speakBtn.classList.add('speaking');
    utt.onend = () => { if (speakBtn) speakBtn.classList.remove('speaking'); if (onEnd) onEnd(); };
    utt.onerror = () => { if (speakBtn) speakBtn.classList.remove('speaking'); };
    const voice = pickFemaleKoreanVoice();
    if (voice) utt.voice = voice;
    speechSynthesis.speak(utt);
  };

  if (!cachedVoices.length) {
    const prev = speechSynthesis.onvoiceschanged;
    speechSynthesis.onvoiceschanged = () => {
      loadVoices();
      if (prev) prev();
      doSpeak();
    };
  } else {
    doSpeak();
  }
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
      { korean: "안녕히 가세요", romanization: "annyeonghi gaseyo", english: "Goodbye (to someone leaving)", tip: "Said to someone who is leaving. If you're the one leaving, say 안녕히 계세요." },
      { korean: "안녕히 계세요", romanization: "annyeonghi gyeseyo", english: "Goodbye (when you're leaving)", tip: "Said by the person who is leaving to the one staying behind." },
      { korean: "감사합니다", romanization: "gamsahamnida", english: "Thank you", tip: "Formal thank you — use in shops, restaurants, and with strangers." },
      { korean: "죄송합니다", romanization: "joesonghamnida", english: "I'm sorry / I apologize", tip: "Formal apology. More sincere than 미안해요." },
      { korean: "실례합니다", romanization: "sillyehamnida", english: "Excuse me", tip: "Use to get someone's attention politely." },
      { korean: "네", romanization: "ne", english: "Yes", tip: "Simple agreement. Can also show you're listening." },
      { korean: "아니요", romanization: "aniyo", english: "No", tip: "Polite refusal. Softer than just shaking your head." },
      { korean: "모르겠어요", romanization: "moreugesseoyo", english: "I don't understand", tip: "Very useful phrase — locals will often then speak slower." },
      { korean: "천천히 말해주세요", romanization: "cheoncheonhi malhaejuseyo", english: "Please speak slowly", tip: "Follow this with 감사합니다 when they do." },
      { korean: "얼마예요?", romanization: "eolmayeyo?", english: "How much is it?", tip: "Works anywhere — shops, taxis, food stalls." },
      { korean: "화장실이 어디예요?", romanization: "hwajangsiri eodiyeyo?", english: "Where is the bathroom?", tip: "Toilets are free and very clean in Korea. Never hesitate to ask." },
      { korean: "잠깐만요", romanization: "jamkkanmanyo", english: "Just a moment / Wait", tip: "Polite way to ask someone to wait briefly." },
      { korean: "영어 할 수 있어요?", romanization: "yeongeo hal su isseoyo?", english: "Can you speak English?", tip: "Many younger Koreans can help with basic English." },
      { korean: "괜찮아요", romanization: "gwaenchanayo", english: "It's okay / I'm fine", tip: "Use to reassure someone or decline help gracefully." },
      { korean: "사진 찍어도 돼요?", romanization: "sajin jjigeodo dwaeyo?", english: "May I take a photo?", tip: "Always ask before photographing people or in temples." },
      { korean: "몇 시예요?", romanization: "myeot siyeyo?", english: "What time is it?", tip: "Useful when checking schedules or catching last trains." },
      { korean: "맞아요", romanization: "majayo", english: "That's right / Correct", tip: "Great for confirming information from a local." },
      { korean: "다시 한번 말해주세요", romanization: "dasi hanbeon malhaejuseyo", english: "Please say that again", tip: "Pair with 천천히 if you also need them to slow down." },
      { korean: "반갑습니다", romanization: "bangapseumnida", english: "Nice to meet you", tip: "Use when meeting someone formally for the first time." },
      { korean: "도움이 필요해요", romanization: "doumi piryohaeyo", english: "I need help", tip: "More specific than 도와주세요. Use when actively seeking assistance." },
      { korean: "이해했어요", romanization: "ihaehasseoyo", english: "I understand", tip: "Confirms you've understood what was said." },
      { korean: "잘 모르겠어요", romanization: "jal moreugesseoyo", english: "I'm not sure", tip: "Polite way to express uncertainty about something." },
      { korean: "수고하세요", romanization: "sugohaseyo", english: "Take care / Good work", tip: "A warm farewell said to someone who is working. Very common in Korea." },
    ],
    scenarios: [
      { situation: "A shopkeeper helps you and you want to say thank you.", answer: "감사합니다", romanization: "gamsahamnida", english: "Thank you" },
      { situation: "You need to find a bathroom urgently.", answer: "화장실이 어디예요?", romanization: "hwajangsiri eodiyeyo?", english: "Where is the bathroom?" },
      { situation: "A local is speaking too fast and you need them to slow down.", answer: "천천히 말해주세요", romanization: "cheoncheonhi malhaejuseyo", english: "Please speak slowly" },
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
      { korean: "택시", romanization: "taeksi", english: "Taxi", tip: "Use KakaoTaxi app for easy ordering with English support." },
      { korean: "공항", romanization: "gonghang", english: "Airport", tip: "Incheon (ICN) for Seoul, Jeju (CJU) for Jeju Island." },
      { korean: "역", romanization: "yeok", english: "Station", tip: "Subway stations are called 역 (yeok)." },
      { korean: "___에 어떻게 가요?", romanization: "_e eotteoke gayo?", english: "How do I get to ___?", tip: "Replace ___ with your destination name." },
      { korean: "여기 세워주세요", romanization: "yeogi sewojuseyo", english: "Please stop here", tip: "Essential for taxis — say this when you see your destination." },
      { korean: "버스 정류장", romanization: "beoseu jeongnyujang", english: "Bus stop", tip: "Look for covered blue shelters along main roads." },
      { korean: "출구", romanization: "chulgu", english: "Exit", tip: "Subway exits are numbered — check your map for the right number." },
      { korean: "입구", romanization: "ipgu", english: "Entrance", tip: "Opposite of 출구 (exit)." },
      { korean: "표", romanization: "pyo", english: "Ticket", tip: "T-money card is more convenient than single tickets for most visitors." },
      { korean: "환승", romanization: "hwanseung", english: "Transfer", tip: "Free transfers between subway and bus within 30 minutes with T-money." },
      { korean: "얼마나 걸려요?", romanization: "eolmana geollyeoyo?", english: "How long does it take?", tip: "Useful for estimating journey times before you set off." },
      { korean: "막차", romanization: "makcha", english: "Last train", tip: "Seoul subway last trains are around midnight. Check in advance!" },
      { korean: "지도 있어요?", romanization: "jido isseoyo?", english: "Do you have a map?", tip: "Most tourist information centers offer free maps." },
      { korean: "걸어서 갈 수 있어요?", romanization: "georeo galsu isseoyo?", english: "Can I walk there?", tip: "Koreans sometimes underestimate walking distances — confirm on your phone too." },
      { korean: "몇 번 버스예요?", romanization: "myeot beon beoseuyeyo?", english: "Which bus number?", tip: "Naver Maps or KakaoMap will give you exact bus numbers." },
      { korean: "지하철 몇 호선이에요?", romanization: "jihacheol myeot hoseoni-eyo?", english: "Which subway line?", tip: "Seoul has 9 numbered lines plus several named lines. Colour-coded." },
      { korean: "여기서 가까워요?", romanization: "yeogiseo gakkaweoyo?", english: "Is it close from here?", tip: "Great for deciding whether to walk or take transport." },
    ],
    scenarios: [
      { situation: "You're in a taxi and want to stop here.", answer: "여기 세워주세요", romanization: "yeogi sewojuseyo", english: "Please stop here" },
      { situation: "You want to know how long the journey will take.", answer: "얼마나 걸려요?", romanization: "eolmana geollyeoyo?", english: "How long does it take?" },
      { situation: "You're looking for the subway station exit.", answer: "출구", romanization: "chulgu", english: "Exit" },
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
      { korean: "냉면", romanization: "naengmyeon", english: "Cold noodles", tip: "Perfect in summer. Choose water-based (물냉면) or spicy (비빔냉면)." },
      { korean: "된장찌개", romanization: "doenjangjjigae", english: "Soybean paste stew", tip: "A comforting staple, served with rice at almost every Korean meal." },
      { korean: "김치찌개", romanization: "gimchijjigae", english: "Kimchi stew", tip: "One of Korea's most beloved comfort foods. Spicy and savory." },
      { korean: "갈비", romanization: "galbi", english: "Grilled short ribs", tip: "Beef (소갈비) or pork (돼지갈비) — both outstanding at BBQ restaurants." },
      { korean: "잡채", romanization: "japchae", english: "Glass noodles stir-fry", tip: "Sweet potato noodles with vegetables and beef. Often served at celebrations." },
      { korean: "포장해 주세요", romanization: "pojanghae juseyo", english: "To go / Pack it up please", tip: "Most restaurants will pack leftovers for you happily." },
      { korean: "두 명이에요", romanization: "du myeongi-eyo", english: "Two people (table for two)", tip: "Hold up two fingers while saying this if needed." },
      { korean: "이거 뭐예요?", romanization: "igeo mwoyeyo?", english: "What is this?", tip: "Point to the item on the menu or in the side dishes." },
      { korean: "소주", romanization: "soju", english: "Soju", tip: "Korea's national drink. Clear, mild spirit — often shared at the table." },
      { korean: "맥주", romanization: "maekju", english: "Beer", tip: "Try local brands: Cass, Hite, OB. Mix with soju for 소맥 (somaek)!" },
      { korean: "반찬", romanization: "banchan", english: "Side dishes", tip: "Free side dishes served with every Korean meal. Refills are also free — just ask!" },
    ],
    scenarios: [
      { situation: "You want to order food without pork.", answer: "돼지고기 없이", romanization: "dwaejigogi eopsi", english: "Without pork" },
      { situation: "The food is amazing and you want to compliment the cook.", answer: "맛있어요", romanization: "masisseoyo", english: "Delicious!" },
      { situation: "You want to take the leftover food back to your hotel.", answer: "포장해 주세요", romanization: "pojanghae juseyo", english: "To go / Pack it up please" },
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
      { korean: "편의점", romanization: "pyeonuijeom", english: "Convenience store", tip: "GS25, CU, 7-Eleven are everywhere — open 24/7." },
      { korean: "시장", romanization: "sijang", english: "Market", tip: "Gwangjang Market in Seoul, Dongmun Market in Jeju." },
      { korean: "약국", romanization: "yakguk", english: "Pharmacy", tip: "Look for the green cross sign. Staff often speak basic English." },
      { korean: "백화점", romanization: "baekwajeom", english: "Department store", tip: "Lotte, Hyundai, Shinsegae — world-class shopping experience." },
      { korean: "이거 주세요", romanization: "igeo juseyo", english: "I'll take this", tip: "Point to the item. Works in any shop without Korean." },
      { korean: "카드 돼요?", romanization: "kadeu dwaeyo?", english: "Do you accept cards?", tip: "Most places do, but small markets may be cash only." },
      { korean: "현금", romanization: "hyeongeum", english: "Cash", tip: "Keep some cash handy for markets and small eateries." },
      { korean: "환불", romanization: "hwanbul", english: "Refund", tip: "Keep your receipt. Most stores allow refunds within 7–14 days." },
      { korean: "교환", romanization: "gyohwan", english: "Exchange", tip: "If you need a different size or color, ask for 교환." },
      { korean: "입어봐도 돼요?", romanization: "ibeo bwado dwaeyo?", english: "Can I try this on?", tip: "Almost all clothing stores have fitting rooms (탈의실)." },
      { korean: "탈의실", romanization: "taruisil", english: "Fitting room", tip: "Usually at the back of clothing stores." },
      { korean: "봉투 주세요", romanization: "bongtu juseyo", english: "Bag please", tip: "Plastic bags cost extra in Korea (~₩100–300). Bring a tote!" },
      { korean: "세금 환급", romanization: "segeum hwangeup", english: "Tax refund", tip: "Foreigners can reclaim VAT at the airport. Min spend: ₩30,000." },
      { korean: "할인", romanization: "harin", english: "Discount / Sale", tip: "Look for 세일 (sale) or 할인 signs for deals." },
      { korean: "이걸로 할게요", romanization: "igeolro halgeyo", english: "I'll take this one", tip: "More decisive than 이거 주세요 — signals you've made your choice." },
    ],
    scenarios: [
      { situation: "You're at a market stall and want to know the price.", answer: "얼마예요?", romanization: "eolmayeyo?", english: "How much is it?" },
      { situation: "The item is too expensive and you want to negotiate.", answer: "깎아주세요", romanization: "kkakka juseyo", english: "Please give a discount" },
      { situation: "You want to try on a piece of clothing before buying it.", answer: "입어봐도 돼요?", romanization: "ibeo bwado dwaeyo?", english: "Can I try this on?" },
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
      { korean: "와이파이 비밀번호가 뭐예요?", romanization: "waipai bimilbeonhoga mwoyeyo?", english: "What's the WiFi password?", tip: "Often printed on a card on the desk or shown on the TV screen." },
      { korean: "룸서비스 있어요?", romanization: "rumsseobiseu isseoyo?", english: "Is there room service?", tip: "Many Korean hotels have 24-hour delivery options." },
      { korean: "에어컨이 안 돼요", romanization: "eeokeoni an dwaeyo", english: "The AC isn't working", tip: "Call 프런트 (peurenteu = front desk) immediately." },
      { korean: "뜨거운 물이 안 나와요", romanization: "tteugeoun muri an nawayo", english: "No hot water", tip: "Not common in Korea but useful to know just in case." },
      { korean: "청소해 주세요", romanization: "cheongsohae juseyo", english: "Please clean the room", tip: "Hang the housekeeping sign on your door or call the front desk." },
      { korean: "짐 맡아주세요", romanization: "jim matajuseyo", english: "Please store my luggage", tip: "Most hotels will hold your bags after checkout until your departure." },
      { korean: "엘리베이터", romanization: "elribeeiteo", english: "Elevator", tip: "Larger Korean hotels and guesthouses all have lifts." },
      { korean: "로비", romanization: "robi", english: "Lobby", tip: "The lobby is where you check in and find the concierge." },
      { korean: "조식 포함이에요?", romanization: "josik pohamieyo?", english: "Is breakfast included?", tip: "Many Korean hotels offer 한식 (hansik) traditional Korean breakfast." },
      { korean: "주차장", romanization: "juchajang", english: "Parking lot", tip: "Ask 주차장 있어요? (juchajang isseoyo?) to check if parking is available." },
      { korean: "열쇠", romanization: "yeolsoe", english: "Key / Key card", tip: "Newer hotels use card keys. Traditional guesthouses may use real keys." },
      { korean: "방 번호", romanization: "bang beonho", english: "Room number", tip: "Learn your room number — it's asked when ordering room service." },
      { korean: "이불 더 주세요", romanization: "ibul deo juseyo", english: "More blankets please", tip: "Useful in winter, or if the air conditioning is too cold." },
      { korean: "프런트", romanization: "peurenteu", english: "Front desk / Reception", tip: "Available 24/7 in most Korean hotels for any requests." },
      { korean: "모닝콜 해주세요", romanization: "moningkol haejuseyo", english: "Wake-up call please", tip: "Add 몇 시에 (myeot sie) before to specify the time." },
      { korean: "방을 바꿀 수 있어요?", romanization: "bange bakkul su isseoyo?", english: "Can I change rooms?", tip: "If there's an issue with your room, ask politely at the front desk." },
    ],
    scenarios: [
      { situation: "You just arrived at your hotel and need the WiFi password.", answer: "와이파이 비밀번호가 뭐예요?", romanization: "waipai bimilbeonhoga mwoyeyo?", english: "What's the WiFi password?" },
      { situation: "You want the hotel to store your bags after checkout.", answer: "짐 맡아주세요", romanization: "jim matajuseyo", english: "Please store my luggage" },
      { situation: "You want to know if breakfast is included in your stay.", answer: "조식 포함이에요?", romanization: "josik pohamieyo?", english: "Is breakfast included?" },
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
      { korean: "길을 잃었어요", romanization: "gireul ireosseoyo", english: "I'm lost", tip: "Show your hotel's address card — most hotels provide them." },
      { korean: "이 주소로 가주세요", romanization: "i jusoro gajuseyo", english: "Please take me to this address", tip: "Show the address on your phone while saying this." },
      { korean: "여권을 잃어버렸어요", romanization: "yeokkwoneul ireobeoryeosseoyo", english: "I lost my passport", tip: "Contact your embassy immediately. 대사관 (daesagwan) = embassy." },
      { korean: "지갑을 잃어버렸어요", romanization: "jigabeul ireobeoryeosseoyo", english: "I lost my wallet", tip: "Report to police (112) for documentation and contact your bank." },
      { korean: "도난당했어요", romanization: "donan danghaesseoyo", english: "I was robbed", tip: "Call 112 immediately. Korea is very safe but incidents can happen." },
      { korean: "대사관", romanization: "daesagwan", english: "Embassy", tip: "Each country has an embassy in Seoul. Save the number before you travel." },
      { korean: "소방서", romanization: "sobangseo", english: "Fire station", tip: "Fire emergency number: 119 (same as ambulance)." },
      { korean: "불이야!", romanization: "buriya!", english: "Fire!", tip: "Shout this to alert others. Exit calmly via 비상구 (emergency exit)." },
      { korean: "비상구", romanization: "bisanggu", english: "Emergency exit", tip: "Look for the green running-man sign in all buildings." },
      { korean: "여기 아파요", romanization: "yeogi apayo", english: "It hurts here", tip: "Point to the affected area while saying this to a doctor or pharmacist." },
      { korean: "약 있어요?", romanization: "yak isseoyo?", english: "Do you have medicine?", tip: "Say at a pharmacy (약국). They can recommend over-the-counter remedies." },
      { korean: "보험이 있어요", romanization: "boheomi isseoyo", english: "I have insurance", tip: "Keep your travel insurance card and policy number accessible at all times." },
      { korean: "분실물 센터", romanization: "bunsilmul senteo", english: "Lost and found", tip: "Major subway stations and airports have a 분실물 센터 for lost items." },
    ],
    scenarios: [
      { situation: "You feel unwell and need medical help.", answer: "의사가 필요해요", romanization: "uisaga piryohaeyo", english: "I need a doctor" },
      { situation: "You've lost your passport and need to explain the situation.", answer: "여권을 잃어버렸어요", romanization: "yeokkwoneul ireobeoryeosseoyo", english: "I lost my passport" },
      { situation: "You see a fire in the building and need to alert people.", answer: "불이야!", romanization: "buriya!", english: "Fire!" },
    ]
  },
  {
    id: 7,
    title: "Read Korean",
    emoji: "🔤",
    description: "Learn Hangul — the Korean alphabet. Sound out letters before knowing meaning.",
    isAlphabet: true,
    cards: [
      // === BASIC VOWELS ===
      { korean: "ㅏ", romanization: "a", english: "Vowel: 'a'", tip: "Like 'a' in 'father'. The vertical stroke has a short branch to the right.", breakdown: "Simple vowel — sounds like: AH" },
      { korean: "ㅓ", romanization: "eo", english: "Vowel: 'eo'", tip: "Like 'u' in 'sun'. Branch points left.", breakdown: "Simple vowel — sounds like: UH" },
      { korean: "ㅗ", romanization: "o", english: "Vowel: 'o'", tip: "Like 'o' in 'bone'. Horizontal line with branch pointing up.", breakdown: "Simple vowel — sounds like: OH" },
      { korean: "ㅜ", romanization: "u", english: "Vowel: 'u'", tip: "Like 'oo' in 'moon'. Branch points down.", breakdown: "Simple vowel — sounds like: OO" },
      { korean: "ㅡ", romanization: "eu", english: "Vowel: 'eu'", tip: "No English equivalent. Lips flat, sound from the back of the throat.", breakdown: "Simple vowel — sounds like: UH (lips flat)" },
      { korean: "ㅣ", romanization: "i", english: "Vowel: 'i'", tip: "Like 'ee' in 'feet'. Just a vertical stroke.", breakdown: "Simple vowel — sounds like: EE" },
      { korean: "ㅑ", romanization: "ya", english: "Vowel: 'ya'", tip: "Like 'ya' in 'yard'. ㅏ with an extra branch.", breakdown: "Double ㅏ = YA sound" },
      { korean: "ㅕ", romanization: "yeo", english: "Vowel: 'yeo'", tip: "Like 'yo' in 'young'. Double-branched ㅓ.", breakdown: "Double ㅓ = YEO sound" },
      { korean: "ㅛ", romanization: "yo", english: "Vowel: 'yo'", tip: "Like 'yo' in 'yoga'. ㅗ with double branches.", breakdown: "Double ㅗ = YO sound" },
      { korean: "ㅠ", romanization: "yu", english: "Vowel: 'yu'", tip: "Like 'you'. ㅜ with double branches.", breakdown: "Double ㅜ = YU sound" },
      // === COMPOUND VOWELS ===
      { korean: "ㅐ", romanization: "ae", english: "Compound vowel: 'ae'", tip: "Like 'e' in 'bed'. Very common in Korean. Heard in 애인 (aein = lover) and 개 (gae = dog).", breakdown: "Compound vowel — sounds like: EH (as in bed)" },
      { korean: "ㅔ", romanization: "e", english: "Compound vowel: 'e'", tip: "Like 'e' in 'set'. In modern Korean, sounds almost identical to ㅐ.", breakdown: "Compound vowel — sounds like: EH (as in set)" },
      { korean: "ㅘ", romanization: "wa", english: "Compound vowel: 'wa'", tip: "ㅗ + ㅏ combined. Like 'wa' in 'water'. Heard in 봐요 (bwayo = look/see).", breakdown: "ㅗ + ㅏ = WA sound" },
      { korean: "ㅝ", romanization: "wo", english: "Compound vowel: 'wo'", tip: "ㅜ + ㅓ combined. Like 'wo' in 'wonder'. Heard in 뭐 (mwo = what).", breakdown: "ㅜ + ㅓ = WO sound" },
      { korean: "ㅚ", romanization: "oe", english: "Compound vowel: 'oe'", tip: "ㅗ + ㅣ combined. Like 'we' in 'wet'. Heard in 외국 (oeguk = foreign country).", breakdown: "ㅗ + ㅣ = OE sound" },
      { korean: "ㅟ", romanization: "wi", english: "Compound vowel: 'wi'", tip: "ㅜ + ㅣ combined. Like 'wee'. Heard in 위 (wi = above).", breakdown: "ㅜ + ㅣ = WI sound" },
      { korean: "ㅢ", romanization: "ui", english: "Compound vowel: 'ui'", tip: "ㅡ + ㅣ combined. Slide from 'eu' to 'ee'. Heard in 의사 (uisa = doctor).", breakdown: "ㅡ + ㅣ = UI sound (slide between them)" },
      // === BASIC CONSONANTS ===
      { korean: "ㄱ", romanization: "g/k", english: "Consonant: 'g' or 'k'", tip: "Like 'g' in 'go' at the start, 'k' at the end.", breakdown: "L-shape — G at start, K at end" },
      { korean: "ㄴ", romanization: "n", english: "Consonant: 'n'", tip: "Like 'n' in 'no'. Shaped like an angled L.", breakdown: "Corner shape — always N sound" },
      { korean: "ㄷ", romanization: "d/t", english: "Consonant: 'd' or 't'", tip: "Like 'd' in 'do' or 't' in 'top'.", breakdown: "Backwards C — D at start, T at end" },
      { korean: "ㄹ", romanization: "r/l", english: "Consonant: 'r' or 'l'", tip: "Between English R and L. A tongue-flap sound.", breakdown: "Complex shape — R between vowels, L at end" },
      { korean: "ㅁ", romanization: "m", english: "Consonant: 'm'", tip: "Like 'm' in 'mother'. Looks like a small square.", breakdown: "Square shape — always M sound" },
      { korean: "ㅂ", romanization: "b/p", english: "Consonant: 'b' or 'p'", tip: "Like 'b' in 'boy' or 'p' in 'pop'.", breakdown: "π shape — B at start, P at end" },
      { korean: "ㅅ", romanization: "s", english: "Consonant: 's'", tip: "Like 's' in 'sun'. Looks like a person with arms out.", breakdown: "Person shape — S sound" },
      { korean: "ㅇ", romanization: "-/ng", english: "Consonant: silent / 'ng'", tip: "Silent at the start of a syllable. 'ng' sound at the end.", breakdown: "Circle — silent at start, NG at end" },
      { korean: "ㅈ", romanization: "j", english: "Consonant: 'j'", tip: "Like 'j' in 'jump'.", breakdown: "Like ㅅ with a crossbar — J sound" },
      { korean: "ㅎ", romanization: "h", english: "Consonant: 'h'", tip: "Like 'h' in 'hello'.", breakdown: "Circle with a hat — H sound" },
      // === ASPIRATED CONSONANTS ===
      { korean: "ㅋ", romanization: "k", english: "Aspirated: strong 'k'", tip: "A stronger 'k' with a puff of air. Like 'k' in 'kite'. ㄱ with an extra stroke.", breakdown: "ㄱ + extra stroke = aspirated K" },
      { korean: "ㅌ", romanization: "t", english: "Aspirated: strong 't'", tip: "A stronger 't' with a puff of air. Like 't' in 'top'. ㄷ with extra strokes.", breakdown: "ㄷ + extra strokes = aspirated T" },
      { korean: "ㅍ", romanization: "p", english: "Aspirated: strong 'p'", tip: "A stronger 'p' with a puff of air. ㅂ with an extra stroke through it.", breakdown: "ㅂ extended = aspirated P" },
      { korean: "ㅊ", romanization: "ch", english: "Aspirated: 'ch'", tip: "Like 'ch' in 'church'. ㅈ with an extra stroke on top.", breakdown: "ㅈ + stroke = aspirated CH" },
      // === TENSE (DOUBLE) CONSONANTS ===
      { korean: "ㄲ", romanization: "kk", english: "Tense: 'kk'", tip: "Doubled ㄱ. Clipped, tense sound — no puff of air. Like 'k' in 'sky'.", breakdown: "Double ㄱ = tense KK sound" },
      { korean: "ㄸ", romanization: "tt", english: "Tense: 'tt'", tip: "Doubled ㄷ. Tense d/t sound. Like the 't' in 'star'.", breakdown: "Double ㄷ = tense TT sound" },
      { korean: "ㅃ", romanization: "pp", english: "Tense: 'pp'", tip: "Doubled ㅂ. Like the 'p' in 'spa' — no air puff, very clipped.", breakdown: "Double ㅂ = tense PP sound" },
      { korean: "ㅆ", romanization: "ss", english: "Tense: 'ss'", tip: "Doubled ㅅ. A hissing, sharp 's'. Heard in 있어요 (isseoyo = there is).", breakdown: "Double ㅅ = tense SS sound" },
      { korean: "ㅉ", romanization: "jj", english: "Tense: 'jj'", tip: "Doubled ㅈ. A sharp, stiff 'j' sound. Less common but important to recognize.", breakdown: "Double ㅈ = tense JJ sound" },
      // === SYLLABLE BLOCKS ===
      { korean: "가", romanization: "ga", english: "Syllable: ga", tip: "ㄱ(g) + ㅏ(a) = 가(ga). First syllable of the Korean alphabet!", breakdown: "ㄱ (g) + ㅏ (a) = 가 (ga)" },
      { korean: "나", romanization: "na", english: "Syllable: na", tip: "ㄴ(n) + ㅏ(a) = 나(na). Also means 'I/me' in informal speech!", breakdown: "ㄴ (n) + ㅏ (a) = 나 (na)" },
      { korean: "다", romanization: "da", english: "Syllable: da", tip: "ㄷ(d) + ㅏ(a) = 다(da). Also means 'all/everything'!", breakdown: "ㄷ (d) + ㅏ (a) = 다 (da)" },
      { korean: "마", romanization: "ma", english: "Syllable: ma", tip: "ㅁ(m) + ㅏ(a) = 마(ma). Used in many Korean words.", breakdown: "ㅁ (m) + ㅏ (a) = 마 (ma)" },
      { korean: "바", romanization: "ba", english: "Syllable: ba", tip: "ㅂ(b) + ㅏ(a) = 바(ba). 바다 (bada) means 'sea/ocean'!", breakdown: "ㅂ (b) + ㅏ (a) = 바 (ba)" },
      { korean: "사", romanization: "sa", english: "Syllable: sa", tip: "ㅅ(s) + ㅏ(a) = 사(sa). Also means the number 4!", breakdown: "ㅅ (s) + ㅏ (a) = 사 (sa)" },
      { korean: "아", romanization: "a", english: "Syllable: a (ㅇ+ㅏ)", tip: "ㅇ(silent) + ㅏ(a) = 아(a). ㅇ is a placeholder here. Also used to express 'Oh!'", breakdown: "ㅇ (silent) + ㅏ (a) = 아 (a)" },
      { korean: "머", romanization: "meo", english: "Syllable: meo", tip: "ㅁ(m) + ㅓ(eo) = 머. Found in 머리 (meori = head/hair).", breakdown: "ㅁ (m) + ㅓ (eo) = 머 (meo)" },
      { korean: "시", romanization: "si", english: "Syllable: si", tip: "ㅅ(s) + ㅣ(i) = 시. Heard in 시간 (sigan = time) and 시장 (sijang = market).", breakdown: "ㅅ (s) + ㅣ (i) = 시 (si)" },
      { korean: "도", romanization: "do", english: "Syllable: do", tip: "ㄷ(d) + ㅗ(o) = 도. Also means 'also/too'. Heard in 도착 (dochak = arrival).", breakdown: "ㄷ (d) + ㅗ (o) = 도 (do)" },
      { korean: "수", romanization: "su", english: "Syllable: su", tip: "ㅅ(s) + ㅜ(u) = 수. Means 'number' or 'way' — heard in 수고하세요.", breakdown: "ㅅ (s) + ㅜ (u) = 수 (su)" },
      { korean: "기", romanization: "gi", english: "Syllable: gi", tip: "ㄱ(g) + ㅣ(i) = 기. Heard in 기차 (gicha = train).", breakdown: "ㄱ (g) + ㅣ (i) = 기 (gi)" },
      { korean: "노", romanization: "no", english: "Syllable: no", tip: "ㄴ(n) + ㅗ(o) = 노. Found in 노래 (norae = song).", breakdown: "ㄴ (n) + ㅗ (o) = 노 (no)" },
      { korean: "해", romanization: "hae", english: "Syllable: hae", tip: "ㅎ(h) + ㅐ(ae) = 해. Means 'sun' or 'year'. 해변 (haebyeon = beach).", breakdown: "ㅎ (h) + ㅐ (ae) = 해 (hae)" },
      { korean: "주", romanization: "ju", english: "Syllable: ju", tip: "ㅈ(j) + ㅜ(u) = 주. Means 'give' — heard constantly in 주세요 (juseyo = please give).", breakdown: "ㅈ (j) + ㅜ (u) = 주 (ju)" },
      { korean: "요", romanization: "yo", english: "Syllable: yo", tip: "ㅇ(silent) + ㅛ(yo) = 요. Attached to verbs to make them polite. Extremely common!", breakdown: "ㅇ (silent) + ㅛ (yo) = 요 (yo)" },
      // === READING PRACTICE WORDS ===
      { korean: "서울", romanization: "seoul", english: "Seoul (reading)", tip: "서(seo) + 울(ul). Korea's capital. Two syllables — sound each one out!", breakdown: "서 (seo) + 울 (ul) = Seoul" },
      { korean: "제주", romanization: "jeju", english: "Jeju (reading)", tip: "제(je) + 주(ju). Island paradise. You can now sound this out!", breakdown: "제 (je) + 주 (ju) = Jeju" },
      { korean: "한국", romanization: "hanguk", english: "Korea (reading)", tip: "한(han) + 국(guk). 한 = Korean/great, 국 = country.", breakdown: "한 (han) + 국 (guk) = Korea" },
      { korean: "사랑", romanization: "sarang", english: "Love (reading)", tip: "사(sa) + 랑(rang). A beautiful word! 사랑해요 = I love you.", breakdown: "사 (sa) + 랑 (rang) = Love" },
      { korean: "안녕", romanization: "annyeong", english: "Hi / Bye informal (reading)", tip: "안(an) + 녕(nyeong). The base of 안녕하세요. Casual between friends.", breakdown: "안 (an) + 녕 (nyeong) = Peace/Well-being" },
      { korean: "감사", romanization: "gamsa", english: "Gratitude (reading)", tip: "감(gam) + 사(sa). The root of 감사합니다. Read: gam-sa.", breakdown: "감 (gam) + 사 (sa) = Gratitude" },
      { korean: "지하철", romanization: "jihacheol", english: "Subway (reading)", tip: "지(ji) + 하(ha) + 철(cheol). Three syllables — sound each one out!", breakdown: "지 (ji) + 하 (ha) + 철 (cheol) = Underground iron" },
      { korean: "버스", romanization: "beoseu", english: "Bus (reading)", tip: "버(beo) + 스(seu). English 'bus' adapted into Hangul. Notice how loanwords work!", breakdown: "버 (beo) + 스 (seu) = Bus (loanword)" },
      { korean: "한국어", romanization: "han-gug-eo", english: "Korean language (reading)", tip: "You can now read this! 한(han) + 국(guk) + 어(eo). Three syllables.", breakdown: "한 (han) + 국 (guk) + 어 (eo) = Korean language" },
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
    7: { lessonsComplete: false, quizScore: null, unlocked: true },
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
  }
}

function checkAllBadges() {
  const ms = state.modules;
  if ([1,2,3,4,5,6,7].some(i => ms[i].lessonsComplete))
    checkBadge('firstLesson');
  const allPassed = [1,2,3,4,5,6].every(i => ms[i].quizScore !== null && ms[i].quizScore >= 70);
  if (allPassed) checkBadge('quizMaster');
  if ([1,2,3].every(i => ms[i].lessonsComplete && ms[i].quizScore >= 70)) checkBadge('jejuReady');
  if ([4,5,6].every(i => ms[i].lessonsComplete && ms[i].quizScore >= 70)) checkBadge('seoulReady');
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
    const item = document.createElement('div');
    item.className = 'lesson-item';
    item.innerHTML = `
      <span class="lesson-check">${l.done ? '✅' : '⬜'}</span>
      <span class="lesson-name">${l.name}</span>
    `;
    list.appendChild(item);
  });

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

  const card = document.getElementById('fc-card');
  card.onclick = flipCard;
}

function renderFlashcard() {
  const c = fcCards[fcIndex];
  const total = fcCards.length;

  document.getElementById('fc-counter').textContent = `${fcIndex + 1} / ${total}`;
  const pct = ((fcIndex + 1) / total) * 100;
  document.getElementById('fc-progress-bar').style.width = pct + '%';

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
  nextCard();
}

function finishFlashcards() {
  state.points += 10;
  state.modules[currentModuleId].lessonsComplete = true;
  checkBadge('firstLesson');
  checkAllBadges();
  saveState();

  alert('🎉 Great job! +10 points earned!\n\nAll flashcards complete. Now take the quiz!');
  showModule(currentModuleId);
}

// ---- QUIZ STATE ----
// Each item in quizQueue: { ...questionFields, attempts: N }
// attempts = total answer attempts made so far (wrong = incremented but re-queued,
//            correct = incremented then moved to quizDone)
// Points awarded based on attempts when correct: 1→10pts, 2→6pts, 3→3pts, 4+→1pt
let quizQueue = [];
let quizDone = [];
let quizInitialCount = 0;
let quizAnswered = false;

function pointsForAttempts(attempts) {
  if (attempts === 1) return 10;
  if (attempts === 2) return 6;
  if (attempts === 3) return 3;
  return 1;
}

function generateQuizQuestions(mod) {
  const questions = [];
  const cards = mod.cards;

  function pickOthers(exclude, n) {
    const pool = cards.filter(c => c.korean !== exclude.korean);
    return pool.sort(() => Math.random() - 0.5).slice(0, n);
  }

  const selected = [...cards].sort(() => Math.random() - 0.5).slice(0, Math.min(10, cards.length));
  const shuffledScenarios = mod.scenarios ? [...mod.scenarios].sort(() => Math.random() - 0.5) : [];
  let scenarioIdx = 0;

  selected.forEach((card, i) => {
    const type = i % 3;

    if (type === 0) {
      const others = pickOthers(card, 3);
      const pairs = [[card.english, card.korean], ...others.map(c => [c.english, c.korean])].sort(() => Math.random() - 0.5);
      questions.push({
        type: 'ko-en',
        questionKorean: card.korean,
        questionRom: card.romanization,
        questionText: 'What does this mean?',
        answer: card.english,
        options: pairs.map(p => p[0]),
        optionKorean: pairs.map(p => p[1])
      });
    } else if (type === 1) {
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
      if (shuffledScenarios.length > 0) {
        const sc = shuffledScenarios[scenarioIdx % shuffledScenarios.length];
        scenarioIdx++;
        const anchor = cards.find(c => c.korean === sc.answer) || card;
        const others = pickOthers(anchor, 3);
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

  const questions = generateQuizQuestions(mod);
  quizQueue = questions.map(q => ({ ...q, attempts: 0 }));
  quizDone = [];
  quizInitialCount = questions.length;
  quizAnswered = false;

  document.getElementById('quiz-module-title').textContent = mod.title + ' Quiz';
  document.getElementById('quiz-score-display').textContent = `0/${quizInitialCount}`;
  renderQuizQuestion();
  showScreen('quiz');
  setNav('quiz');
}

function renderQuizQuestion() {
  const q = quizQueue[0];
  const doneCount = quizDone.length;
  const pct = (doneCount / quizInitialCount) * 100;

  document.getElementById('screen-quiz').classList.remove('quiz-end-active');
  document.getElementById('quiz-progress-bar').style.width = pct + '%';
  document.getElementById('quiz-score-display').textContent = `${doneCount}/${quizInitialCount}`;
  quizAnswered = false;

  let html = `<div class="quiz-question">`;

  if (q.attempts > 0) {
    html += `<div class="quiz-q-num"><span class="quiz-retry-badge">↻ RETRY #${q.attempts + 1}</span></div>`;
  } else {
    html += `<div class="quiz-q-num">QUESTION ${doneCount + 1} OF ${quizInitialCount}</div>`;
  }

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
  html += `</div></div>`;

  html += `<div class="quiz-bottom">`;
  html += `<div id="quiz-feedback" class="quiz-feedback"></div>`;
  html += `<button class="quiz-next-btn" id="quiz-next-btn" onclick="advanceQuiz()">Next Question →</button>`;
  html += `</div>`;

  document.getElementById('quiz-body').innerHTML = html;
}

function advanceQuiz() {
  if (quizQueue.length === 0) {
    showQuizEnd();
  } else {
    renderQuizQuestion();
  }
}

function answerQuiz(idx) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = quizQueue[0];
  const chosen = q.options[idx];
  const correct = chosen === q.answer;

  q.attempts++;

  if (correct) {
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
    const pts = pointsForAttempts(q.attempts);
    fb.className = 'quiz-feedback correct visible';
    fb.textContent = q.attempts === 1 ? `✓ Correct! +${pts} pts` : `✓ Got it! +${pts} pts (attempt ${q.attempts})`;
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
  const totalPoints = quizDone.reduce((sum, q) => sum + pointsForAttempts(q.attempts), 0);
  const maxPoints = quizInitialCount * 10;
  const pct = Math.round((totalPoints / maxPoints) * 100);
  const pass = pct >= 70;

  document.getElementById('screen-quiz').classList.add('quiz-end-active');
  document.getElementById('quiz-progress-bar').style.width = '100%';

  state.modules[currentModuleId].quizScore = pct;
  let bonusPts = 0;
  if (pct >= 90) bonusPts = 50;
  else if (pct >= 70) bonusPts = 25;
  state.points += bonusPts;

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

  const firstTry  = quizDone.filter(q => q.attempts === 1).length;
  const secondTry = quizDone.filter(q => q.attempts === 2).length;
  const moreTry   = quizDone.filter(q => q.attempts >= 3).length;

  let breakdownHtml = '';
  if (firstTry > 0)  breakdownHtml += `<div class="quiz-breakdown-item"><span class="qbd-pts">${firstTry} × 10 pts</span><span class="qbd-label">First try ✓</span></div>`;
  if (secondTry > 0) breakdownHtml += `<div class="quiz-breakdown-item"><span class="qbd-pts">${secondTry} × 6 pts</span><span class="qbd-label">Second try ✓</span></div>`;
  if (moreTry > 0)   breakdownHtml += `<div class="quiz-breakdown-item"><span class="qbd-pts">${moreTry} × 1–3 pts</span><span class="qbd-label">Multiple tries ✓</span></div>`;

  const emoji = pct === 100 ? '🏆' : pct >= 90 ? '⭐' : pct >= 70 ? '✅' : '📚';
  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-end">
      <div class="quiz-end-emoji">${emoji}</div>
      <div class="quiz-end-score">${totalPoints}/${maxPoints}</div>
      <div class="quiz-end-label">${pct}% — ${quizInitialCount} questions mastered</div>
      <div class="quiz-end-badge ${pass ? 'pass' : 'fail'}">${pass ? '✅ PASSED' : '❌ TRY AGAIN — Need 70%'}</div>
      ${breakdownHtml ? `<div class="quiz-breakdown">${breakdownHtml}</div>` : ''}
      ${bonusPts > 0 ? `<div class="quiz-end-pts">+${bonusPts} bonus points!</div>` : ''}
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
  if (ttsSupported) {
    speechSynthesis.getVoices();
    speechSynthesis.addEventListener('voiceschanged', () => {});
  }
  showHome();
});
