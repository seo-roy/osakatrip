/**
 * 가족 여행 시드 — 숙소·항공은 확정 요약, 일차·식당은 「추천」동선.
 * 요금·터미널은 참고(변동 가능). 확인코드 없음.
 */

export const SAMPLE_DISCLAIMER =
  '추천 일정 · 시각·요금은 달라질 수 있어요'

export type PlaceCategory = '식사' | '관광' | '숙소' | '이동거점' | '기타'

export interface Place {
  placeId: string
  name: string
  nameLocal?: string
  category: PlaceCategory
  familyBlurb: string
  address?: string
  mapUrl?: string
  officialUrl?: string
  verifyMemo?: string
  kidsNote?: string
  linkedTransitIds?: string[]
}

export interface Transit {
  transitId: string
  fromLabel: string
  toLabel: string
  modeNote: string
  stepsMemo: string
  /** 대략 요금 참고 — 확정 요금 아님 */
  fareApprox?: string
  checkUrl?: string
  dateRefs?: string[]
  placeRefs?: string[]
  cautionMemo?: string
}

export interface DayItem {
  id: string
  placeId: string
  sortOrder: number
  timeNote?: string
  itemMemo?: string
}

export interface DayPlan {
  date: string
  dayIndex: number
  dayLabel: string
  dayMemo?: string
  items: DayItem[]
}

export interface PackingItem {
  id: string
  label: string
  categoryId: string
  done: boolean
  assigneeNote?: string
  kidsRelevant?: boolean
}

export interface PackingCategory {
  id: string
  name: string
}

export const tripMeta = {
  tripTitle: '오사카 가족 여행',
  startDate: '2026-12-03',
  endDate: '2026-12-07',
  partySize: 4,
  partyNote: '아빠 · 엄마 · Alice · Roy',
  homeMemo: '',
  /** 달력 날짜 — “여행 n일차”가 아님 */
  usjVisitDate: '2026-12-04',
  updatedAt: '2026-11-02T00:00:00+00:00',
  contentRevision: 4,
  isSample: true as const,
}

export const places: Place[] = [
  {
    placeId: 'place-hotel',
    name: '숙소 · 나니와구',
    nameLocal: '大阪市浪速区',
    category: '숙소',
    familyBlurb:
      '나니와구 집/아파트 전체 · 침대 2 · 4명 · 호스트 Rui. 4박(12/3→12/7).',
    address: '오사카시 나니와구 (Naniwa Ward, Osaka)',
    mapUrl: 'https://maps.google.com/?q=Naniwa+Ward+Osaka',
    verifyMemo:
      '가족 메모: 24시간 동안 무료 취소 가능. 이후 취소 시 환불 불가.',
    kidsNote: '충전기·간식 챙기기',
    linkedTransitIds: ['transit-kix-hotel', 'transit-hotel-station'],
  },
  {
    placeId: 'place-kix',
    name: '간사이 국제공항 (KIX)',
    nameLocal: '関西国際空港',
    category: '이동거점',
    familyBlurb: '출도착 공항이에요. 터미널은 비행기 칸을 꼭 확인해요.',
    address: 'Kansai International Airport (KIX)',
    mapUrl: 'https://maps.google.com/?q=Kansai+International+Airport',
    officialUrl: 'https://www.kansai-airport.or.jp/ko',
    linkedTransitIds: ['transit-kix-hotel'],
  },
  {
    placeId: 'place-dotonbori',
    name: '도톤보리',
    nameLocal: '道頓堀',
    category: '관광',
    familyBlurb: '네온과 다리가 있는 거리예요. Alice·Roy와 걷기 좋아요.',
    address: '오사카시 주오구 도톤보리',
    mapUrl: 'https://maps.google.com/?q=Dotonbori+Osaka',
    kidsNote: '사람 많으면 손 잡아요.',
    linkedTransitIds: ['transit-hotel-dotonbori'],
  },
  {
    placeId: 'place-dinner-doton',
    name: '도톤보리 저녁 (추천)',
    nameLocal: '道頓堀',
    category: '식사',
    familyBlurb:
      '추천: 타코야키·쿠시카츠 등 아이 친화 포차/가게. 줄이 길면 옆 골목도 봐요.',
    address: '도톤보리 일대',
    mapUrl: 'https://maps.google.com/?q=Dotonbori+food',
    kidsNote: '맵지 않은 메뉴를 골라요.',
    linkedTransitIds: ['transit-hotel-dotonbori'],
  },
  {
    placeId: 'place-usj',
    name: '유니버설 스튜디오 재팬',
    nameLocal: 'ユニバーサル・スタジオ・ジャパン',
    category: '관광',
    familyBlurb:
      '12월 4일(금)에 가요. 티켓·안내는 USJ 메뉴와 한국어 공식 사이트를 봐요.',
    mapUrl: 'https://maps.google.com/?q=Universal+Studios+Japan',
    officialUrl: 'https://www.usj.co.jp/web/ko/usj',
    kidsNote: '만날 곳을 미리 정해요.',
    linkedTransitIds: ['transit-hotel-usj'],
  },
  {
    placeId: 'place-usj-lunch',
    name: 'USJ·시티워크 식사 (추천)',
    category: '식사',
    familyBlurb:
      '추천: 파크 안 또는 유니버설·시티워크 식당. 공식 앱·현장에서 메뉴를 확인해요.',
    mapUrl: 'https://maps.google.com/?q=Universal+CityWalk+Osaka',
    kidsNote: '줄이 길면 간식으로 나눠 먹어요.',
    linkedTransitIds: ['transit-hotel-usj'],
  },
  {
    placeId: 'place-aquarium',
    name: '카이유칸',
    nameLocal: '海遊館',
    category: '관광',
    familyBlurb: '큰 수족관이에요. 티켓은 안내 사이트에서 확인해요.',
    mapUrl: 'https://maps.google.com/?q=Kaiyukan+Osaka',
    officialUrl: 'https://www.kaiyukan.com/',
    kidsNote: '중간에 쉬면서 다녀요.',
    linkedTransitIds: ['transit-hotel-aquarium'],
  },
  {
    placeId: 'place-tempozan-food',
    name: '템포잔 마켓플레이스 식사 (추천)',
    category: '식사',
    familyBlurb:
      '추천: 카이유칸 옆 템포잔에서 가볍게 점심/간식. 아이 메뉴가 많은 편이에요.',
    mapUrl: 'https://maps.google.com/?q=Tempozan+Marketplace+Osaka',
    linkedTransitIds: ['transit-hotel-aquarium'],
  },
  {
    placeId: 'place-osaka-castle',
    name: '오사카성 공원',
    nameLocal: '大阪城公園',
    category: '관광',
    familyBlurb: '성 주변을 걸으며 사진 찍기 좋아요.',
    mapUrl: 'https://maps.google.com/?q=Osaka+Castle',
    officialUrl: 'https://www.osakacastle.net/',
    linkedTransitIds: ['transit-hotel-castle'],
  },
  {
    placeId: 'place-lunch-castle',
    name: '성 근처 점심 (추천)',
    category: '식사',
    familyBlurb:
      '추천: 공원 근처 식당 또는 오사카성 공원 카페. 붐비면 조기 점심을 권해요.',
    mapUrl: 'https://maps.google.com/?q=Osaka+Castle+restaurant',
    linkedTransitIds: ['transit-hotel-castle'],
  },
  {
    placeId: 'place-shinsaibashi',
    name: '신사이바시·쇼핑',
    nameLocal: '心斎橋',
    category: '관광',
    familyBlurb: '걷기·기념품 사기 좋아요. 피곤하면 짧게만 다녀와요.',
    mapUrl: 'https://maps.google.com/?q=Shinsaibashi+Osaka',
    kidsNote: '길을 잃지 않게 약속을 정해요.',
    linkedTransitIds: ['transit-hotel-shinsaibashi'],
  },
  {
    placeId: 'place-dinner-namba',
    name: '난바 저녁 (추천)',
    category: '식사',
    familyBlurb:
      '추천: 난바·도톤보리 쪽 라멘·오코노미야키 등. Alice·Roy가 먹을 수 있는 순한 맛을 고르세요.',
    mapUrl: 'https://maps.google.com/?q=Namba+Osaka+dinner',
    linkedTransitIds: ['transit-hotel-dotonbori'],
  },
  {
    placeId: 'place-kuromon',
    name: '구로몬 시장',
    nameLocal: '黒門市場',
    category: '식사',
    familyBlurb: '아침·간식 먹기 좋은 시장이에요. 귀국 날 짧게 들르기 좋아요.',
    mapUrl: 'https://maps.google.com/?q=Kuromon+Market',
    linkedTransitIds: ['transit-hotel-kuromon'],
  },
]

/** 요금은 대략·참고. 당일 IC·창구 요금이 다를 수 있음. */
export const transits: Transit[] = [
  {
    transitId: 'transit-kix-hotel',
    fromLabel: 'KIX',
    toLabel: '숙소 · 나니와구 (난바 방면)',
    modeNote: '난카이 공항급행 추천',
    stepsMemo:
      '간사이공항역 → 난바역(난카이). 짐 있으면 엘리베이터를 찾아요. 지도 앱으로 숙소까지 이어서 가요.',
    fareApprox:
      '대략 어른 약 970엔 / 아이 약 490엔 (공항급행·참고). 라피트는 더 비쌈. 변동 가능.',
    checkUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Kansai+International+Airport&destination=Namba+Osaka',
    dateRefs: ['2026-12-03', '2026-12-07'],
    placeRefs: ['place-kix', 'place-hotel'],
    cautionMemo: '캐리어·아이와 이동 시 여유 있게',
  },
  {
    transitId: 'transit-hotel-station',
    fromLabel: '숙소 · 나니와구',
    toLabel: '가까운 역',
    modeNote: '도보',
    stepsMemo: '숙소에서 가까운 역까지 걸어요. 정확한 출구는 지도로 확인.',
    fareApprox: '도보 · 요금 없음',
    dateRefs: ['2026-12-03'],
    placeRefs: ['place-hotel'],
  },
  {
    transitId: 'transit-hotel-dotonbori',
    fromLabel: '숙소 · 나니와구',
    toLabel: '도톤보리·난바',
    modeNote: '도보 또는 짧은 지하철',
    stepsMemo: '가까우면 걸어가요. 피곤하면 지하철 1~2정거장.',
    fareApprox: '대략 어른 180~280엔 (지하철·참고) · 도보면 0엔',
    checkUrl: 'https://maps.google.com/?q=Dotonbori+Osaka',
    dateRefs: ['2026-12-03', '2026-12-06'],
    placeRefs: ['place-dotonbori', 'place-dinner-doton', 'place-dinner-namba'],
  },
  {
    transitId: 'transit-hotel-usj',
    fromLabel: '숙소 · 나니와구 (난바)',
    toLabel: 'USJ',
    modeNote: '전철 환승 (추천)',
    stepsMemo:
      '난바 방면 → 서쿠조(西九条) 환승 → JR 유메사키선 → 유니버설시티. IC카드가 편해요.',
    fareApprox: '대략 어른 약 380~400엔 편도 (참고) · 아이 약 반값대. 변동 가능.',
    checkUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Namba+Osaka&destination=Universal+Studios+Japan',
    dateRefs: ['2026-12-04'],
    placeRefs: ['place-usj', 'place-usj-lunch'],
    cautionMemo: '손 잡고, 만날 곳을 미리 정해요',
  },
  {
    transitId: 'transit-hotel-aquarium',
    fromLabel: '숙소 · 나니와구',
    toLabel: '카이유칸·템포잔',
    modeNote: '지하철+도보',
    stepsMemo: '지하철로 오사카항(Osakako) 방면 후 도보. 지도 앱으로 확인.',
    fareApprox: '대략 어른 약 280~400엔 편도 (참고). 변동 가능.',
    checkUrl: 'https://maps.google.com/?q=Kaiyukan+Osaka',
    dateRefs: ['2026-12-05'],
    placeRefs: ['place-aquarium', 'place-tempozan-food'],
  },
  {
    transitId: 'transit-hotel-castle',
    fromLabel: '숙소 · 나니와구',
    toLabel: '오사카성 공원',
    modeNote: '지하철+도보',
    stepsMemo: '지하철로 모리노미야·오사카비즈니스파크 등 하차 후 공원 산책.',
    fareApprox: '대략 어른 약 230~280엔 편도 (참고). 변동 가능.',
    checkUrl: 'https://maps.google.com/?q=Osaka+Castle',
    dateRefs: ['2026-12-06'],
    placeRefs: ['place-osaka-castle', 'place-lunch-castle'],
  },
  {
    transitId: 'transit-hotel-shinsaibashi',
    fromLabel: '숙소 · 나니와구',
    toLabel: '신사이바시',
    modeNote: '도보 또는 지하철',
    stepsMemo: '난바·신사이바시는 가깝습니다. 걷기 힘들면 한 정거장.',
    fareApprox: '대략 어른 180~230엔 또는 도보',
    checkUrl: 'https://maps.google.com/?q=Shinsaibashi+Osaka',
    dateRefs: ['2026-12-06'],
    placeRefs: ['place-shinsaibashi'],
  },
  {
    transitId: 'transit-hotel-kuromon',
    fromLabel: '숙소 · 나니와구',
    toLabel: '구로몬 시장',
    modeNote: '지하철+도보',
    stepsMemo: '아침 짧게 들르기 좋아요.',
    fareApprox: '대략 어른 약 180~230엔 (참고)',
    checkUrl: 'https://maps.google.com/?q=Kuromon+Market',
    dateRefs: ['2026-12-07'],
    placeRefs: ['place-kuromon'],
  },
]

export const days: DayPlan[] = [
  {
    date: '2026-12-03',
    dayIndex: 1,
    dayLabel: '도착 · 저녁',
    dayMemo: '비행기 도착 후 숙소 → 도톤보리 저녁 (추천)',
    items: [
      {
        id: 'd1-0',
        placeId: 'place-kix',
        sortOrder: 1,
        timeNote: '18:40 도착',
        itemMemo: 'KIX T2 참고 · 난카이로 난바 방면',
      },
      {
        id: 'd1-1',
        placeId: 'place-hotel',
        sortOrder: 2,
        timeNote: '저녁 체크인',
        itemMemo: '짐 풀기 · 쉬기',
      },
      {
        id: 'd1-2',
        placeId: 'place-dotonbori',
        sortOrder: 3,
        timeNote: '저녁',
        itemMemo: '야경 산책',
      },
      {
        id: 'd1-3',
        placeId: 'place-dinner-doton',
        sortOrder: 4,
        timeNote: '저녁 식사',
        itemMemo: '타코야키·쿠시카츠 등 (추천)',
      },
    ],
  },
  {
    date: '2026-12-04',
    dayIndex: 2,
    dayLabel: 'USJ',
    dayMemo: '12월 4일 · 유니버설 스튜디오 재팬 (추천 집중일)',
    items: [
      {
        id: 'd2-1',
        placeId: 'place-usj',
        sortOrder: 1,
        timeNote: '종일',
        itemMemo: '공식 안내·티켓 확인',
      },
      {
        id: 'd2-2',
        placeId: 'place-usj-lunch',
        sortOrder: 2,
        timeNote: '점심·간식',
        itemMemo: '파크·시티워크 (추천)',
      },
    ],
  },
  {
    date: '2026-12-05',
    dayIndex: 3,
    dayLabel: '수족관',
    dayMemo: '카이유칸 · 템포잔에서 쉬며 놀아요 (추천)',
    items: [
      {
        id: 'd3-1',
        placeId: 'place-aquarium',
        sortOrder: 1,
        timeNote: '오전~오후',
        itemMemo: '카이유칸',
      },
      {
        id: 'd3-2',
        placeId: 'place-tempozan-food',
        sortOrder: 2,
        timeNote: '점심',
        itemMemo: '템포잔 식사 (추천)',
      },
    ],
  },
  {
    date: '2026-12-06',
    dayIndex: 4,
    dayLabel: '성 · 시내',
    dayMemo: '오사카성 공원 → 신사이바시 → 난바 저녁 (추천)',
    items: [
      {
        id: 'd4-1',
        placeId: 'place-osaka-castle',
        sortOrder: 1,
        timeNote: '오전',
        itemMemo: '공원 산책·사진',
      },
      {
        id: 'd4-2',
        placeId: 'place-lunch-castle',
        sortOrder: 2,
        timeNote: '점심',
        itemMemo: '성 근처 (추천)',
      },
      {
        id: 'd4-3',
        placeId: 'place-shinsaibashi',
        sortOrder: 3,
        timeNote: '오후',
        itemMemo: '걷기·기념품',
      },
      {
        id: 'd4-4',
        placeId: 'place-dinner-namba',
        sortOrder: 4,
        timeNote: '저녁',
        itemMemo: '난바 저녁 (추천)',
      },
    ],
  },
  {
    date: '2026-12-07',
    dayIndex: 5,
    dayLabel: '귀국',
    dayMemo: '아침 시장 → 체크아웃 → KIX 저녁 비행기',
    items: [
      {
        id: 'd5-1',
        placeId: 'place-kuromon',
        sortOrder: 1,
        timeNote: '오전',
        itemMemo: '간단한 아침·간식',
      },
      {
        id: 'd5-2',
        placeId: 'place-hotel',
        sortOrder: 2,
        timeNote: '체크아웃',
        itemMemo: '짐·여권 확인',
      },
      {
        id: 'd5-3',
        placeId: 'place-kix',
        sortOrder: 3,
        timeNote: '18:00 출발',
        itemMemo: 'KIX T1 참고 · RS 382',
      },
    ],
  },
]

export const packingCategories: PackingCategory[] = [
  { id: 'cat-docs', name: '서류' },
  { id: 'cat-clothes', name: '의류' },
  { id: 'cat-kids', name: '아이' },
  { id: 'cat-gadgets', name: '전자기기' },
  { id: 'cat-meds', name: '약품·위생' },
]

export const packingItemsSeed: PackingItem[] = [
  {
    id: 'pk-passport',
    label: '여권',
    categoryId: 'cat-docs',
    done: false,
    assigneeNote: '어른',
  },
  {
    id: 'pk-tickets',
    label: '항공·이동 확인',
    categoryId: 'cat-docs',
    done: false,
  },
  {
    id: 'pk-jacket',
    label: '겉옷 (12월)',
    categoryId: 'cat-clothes',
    done: false,
  },
  {
    id: 'pk-kids-clothes',
    label: '여분 옷',
    categoryId: 'cat-kids',
    done: false,
    kidsRelevant: true,
  },
  {
    id: 'pk-snacks',
    label: '간식',
    categoryId: 'cat-kids',
    done: true,
    kidsRelevant: true,
  },
  {
    id: 'pk-charger',
    label: '충전기·보조배터리',
    categoryId: 'cat-gadgets',
    done: false,
  },
  {
    id: 'pk-adapter',
    label: '여행용 어댑터',
    categoryId: 'cat-gadgets',
    done: false,
  },
  {
    id: 'pk-meds',
    label: '상비약·밴드',
    categoryId: 'cat-meds',
    done: false,
  },
  {
    id: 'pk-sunscreen',
    label: '선크림·립밤',
    categoryId: 'cat-meds',
    done: false,
  },
]

export function getPlace(placeId: string): Place | undefined {
  return places.find((p) => p.placeId === placeId)
}

export function getTransit(transitId: string): Transit | undefined {
  return transits.find((t) => t.transitId === transitId)
}

export function getDay(date: string): DayPlan | undefined {
  return days.find((d) => d.date === date)
}

export function formatKoreanDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${y}년 ${m}월 ${d}일`
}

export function formatShortDate(iso: string): string {
  const [, m, d] = iso.split('-').map(Number)
  return `${m}/${d}`
}
