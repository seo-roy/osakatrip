/**
 * 예시 데이터 — 실제 예약·시간·요금과 다를 수 있음.
 * 확정 여행 사실이 아니며, UI 골격 확인용 샘플입니다.
 */

export const SAMPLE_DISCLAIMER =
  '샘플 — 실제 예약/시간과 다를 수 있음'

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
  /** 표시용 가족 이름 — 초등 학년 문구 대신 사용 */
  partyNote: '아빠 · 엄마 · Alice · Roy',
  homeMemo: '',
  usjVisitDate: '2026-12-06',
  usjDayIndex: 4,
  updatedAt: '2026-11-02T00:00:00+00:00',
  contentRevision: 3,
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
      '가족 메모: 24시간 동안 무료 취소 가능. 이후 취소 시 환불 불가. 시간은 리스팅 현지 시간 기준.',
    kidsNote: '아이용 여분 충전기 챙기기',
    linkedTransitIds: ['transit-hotel-station'],
  },
  {
    placeId: 'place-dotonbori',
    name: '도톤보리',
    nameLocal: '道頓堀',
    category: '관광',
    familyBlurb: '저녁에 걷기 좋은 거리예요. 사람 많으면 손 잡고 다녀요.',
    address: '오사카시 주오구 도톤보리',
    mapUrl: 'https://maps.google.com/?q=Dotonbori+Osaka',
    officialUrl: 'https://www.osaka-info.jp/',
    kidsNote: '헤어지면 만날 곳을 미리 정해요.',
    linkedTransitIds: ['transit-hotel-dotonbori'],
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
    placeId: 'place-usj',
    name: '유니버설 스튜디오 재팬',
    nameLocal: 'ユニバーサル・スタジオ・ジャパン',
    category: '관광',
    familyBlurb: 'Day 4에 가요. 자세한 안내는 USJ 메뉴와 공식 사이트를 봐요.',
    mapUrl: 'https://maps.google.com/?q=Universal+Studios+Japan',
    officialUrl: 'https://www.usj.co.jp/web/ko/usj',
    kidsNote: '만날 곳과 키 제한은 USJ 화면 메모를 봐요.',
    linkedTransitIds: ['transit-hotel-usj'],
  },
  {
    placeId: 'place-kuromon',
    name: '구로몬 시장',
    nameLocal: '黒門市場',
    category: '식사',
    familyBlurb: '아침·간식 먹기 좋은 시장이에요.',
    mapUrl: 'https://maps.google.com/?q=Kuromon+Market',
    linkedTransitIds: ['transit-hotel-kuromon'],
  },
  {
    placeId: 'place-kix',
    name: '간사이 국제공항 (KIX)',
    nameLocal: '関西国際空港',
    category: '이동거점',
    familyBlurb:
      '출도착 공항. 탑승·수하물·교통은 공항·항공사 공식 안내로 확인하세요.',
    address: 'Kansai International Airport (KIX)',
    mapUrl: 'https://maps.google.com/?q=Kansai+International+Airport',
    officialUrl: 'https://www.kansai-airport.or.jp/ko',
    linkedTransitIds: ['transit-kix-hotel'],
  },
]

export const transits: Transit[] = [
  {
    transitId: 'transit-kix-hotel',
    fromLabel: 'KIX',
    toLabel: '숙소 · 나니와구',
    modeNote: '공항 교통+도보 (메모)',
    stepsMemo:
      '배차·요금은 앱에 고정하지 않습니다. 지도·공항 교통 안내로 재확인.',
    checkUrl: 'https://maps.google.com/maps/dir/?api=1&origin=Kansai+International+Airport&destination=Naniwa+Ward+Osaka',
    dateRefs: ['2026-12-03', '2026-12-07'],
    placeRefs: ['place-kix', 'place-hotel'],
    cautionMemo: '캐리어·아이와 이동 시 여유 있게',
  },
  {
    transitId: 'transit-hotel-station',
    fromLabel: '숙소 · 나니와구',
    toLabel: '가까운 역',
    modeNote: '도보',
    stepsMemo: '짐이 있으면 엘리베이터를 찾아요.',
    dateRefs: ['2026-12-03'],
    placeRefs: ['place-hotel'],
    cautionMemo: '캐리어 있을 때 조심해요',
  },
  {
    transitId: 'transit-hotel-dotonbori',
    fromLabel: '숙소 · 나니와구',
    toLabel: '도톤보리',
    modeNote: '지하철+도보',
    stepsMemo: '출발 전에 지도 앱으로 길을 한 번 더 봐요.',
    checkUrl: 'https://maps.google.com/?q=Dotonbori+Osaka',
    dateRefs: ['2026-12-03'],
    placeRefs: ['place-dotonbori'],
  },
  {
    transitId: 'transit-hotel-castle',
    fromLabel: '숙소 · 나니와구',
    toLabel: '오사카성 공원',
    modeNote: '지하철+도보',
    stepsMemo: '출발 전에 지도 앱으로 길을 한 번 더 봐요.',
    checkUrl: 'https://maps.google.com/?q=Osaka+Castle',
    dateRefs: ['2026-12-04'],
    placeRefs: ['place-osaka-castle'],
  },
  {
    transitId: 'transit-hotel-aquarium',
    fromLabel: '숙소 · 나니와구',
    toLabel: '카이유칸',
    modeNote: '지하철+도보',
    stepsMemo: '출발 전에 지도 앱으로 길을 한 번 더 봐요.',
    checkUrl: 'https://maps.google.com/?q=Kaiyukan+Osaka',
    dateRefs: ['2026-12-05'],
    placeRefs: ['place-aquarium'],
  },
  {
    transitId: 'transit-hotel-usj',
    fromLabel: '숙소 · 나니와구',
    toLabel: 'USJ',
    modeNote: '전철+도보',
    stepsMemo: '출발 전에 지도·공식 안내를 봐요.',
    checkUrl: 'https://maps.google.com/?q=Universal+Studios+Japan',
    dateRefs: ['2026-12-06'],
    placeRefs: ['place-usj'],
    cautionMemo: '손 잡고, 만날 곳을 미리 정해요',
  },
  {
    transitId: 'transit-hotel-kuromon',
    fromLabel: '숙소 · 나니와구',
    toLabel: '구로몬 시장',
    modeNote: '지하철+도보',
    stepsMemo: '아침 방문 때 쓰기 좋아요.',
    checkUrl: 'https://maps.google.com/?q=Kuromon+Market',
    dateRefs: ['2026-12-07'],
    placeRefs: ['place-kuromon'],
  },
]

export const days: DayPlan[] = [
  {
    date: '2026-12-03',
    dayIndex: 1,
    dayLabel: '도착 · 숙소',
    dayMemo: '제주항공 7C 1305 · ICN 16:55 → KIX 18:40',
    items: [
      {
        id: 'd1-0',
        placeId: 'place-kix',
        sortOrder: 1,
        timeNote: '18:40 도착',
        itemMemo: '공항 도착 후 숙소로',
      },
      {
        id: 'd1-1',
        placeId: 'place-hotel',
        sortOrder: 2,
        timeNote: '저녁 체크인',
        itemMemo: '나니와구 숙소 · 짐 풀기',
      },
      {
        id: 'd1-2',
        placeId: 'place-dotonbori',
        sortOrder: 3,
        timeNote: '저녁',
        itemMemo: '가벼운 저녁·야경',
      },
    ],
  },
  {
    date: '2026-12-04',
    dayIndex: 2,
    dayLabel: '성·시내',
    dayMemo: '오사카성 공원과 시내를 둘러봐요.',
    items: [
      {
        id: 'd2-1',
        placeId: 'place-osaka-castle',
        sortOrder: 1,
        timeNote: '오전',
      },
      {
        id: 'd2-2',
        placeId: 'place-dotonbori',
        sortOrder: 2,
        timeNote: '저녁',
        itemMemo: '저녁 식사',
      },
    ],
  },
  {
    date: '2026-12-05',
    dayIndex: 3,
    dayLabel: '수족관·휴식',
    items: [
      {
        id: 'd3-1',
        placeId: 'place-aquarium',
        sortOrder: 1,
        timeNote: '오전~오후',
        itemMemo: '카이유칸',
      },
    ],
  },
  {
    date: '2026-12-06',
    dayIndex: 4,
    dayLabel: 'USJ',
    dayMemo: '유니버설 스튜디오 재팬 가는 날이에요.',
    items: [
      {
        id: 'd4-1',
        placeId: 'place-usj',
        sortOrder: 1,
        timeNote: '종일',
        itemMemo: 'USJ',
      },
    ],
  },
  {
    date: '2026-12-07',
    dayIndex: 5,
    dayLabel: '귀국',
    dayMemo: '에어서울 RS 382 · KIX 18:00 → ICN 20:05',
    items: [
      {
        id: 'd5-1',
        placeId: 'place-kuromon',
        sortOrder: 1,
        timeNote: '오전',
        itemMemo: '여유 있으면',
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
        itemMemo: 'KIX · RS 382',
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
