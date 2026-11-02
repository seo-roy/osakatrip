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
  partyNote: '초5 여아, 초3 남아 포함',
  homeMemo: '예시 메모 — 일정·숙소는 아직 확정 전으로 가정합니다.',
  usjVisitDate: '2026-12-06',
  usjDayIndex: 4,
  updatedAt: '2026-11-02T00:00:00+00:00',
  isSample: true as const,
}

export const places: Place[] = [
  {
    placeId: 'place-hotel',
    name: '숙소 (예시)',
    nameLocal: 'ホテル（例）',
    category: '숙소',
    familyBlurb:
      '예시 숙소입니다. 실제 예약명·주소는 확정 후 교체하세요.',
    address: '예시 주소 — 오사카시 ○○구',
    mapUrl: 'https://maps.google.com/?q=Osaka',
    kidsNote: '아이용 여분 충전기 챙기기 (예시 메모)',
    linkedTransitIds: ['transit-hotel-station'],
  },
  {
    placeId: 'place-dotonbori',
    name: '도톤보리 (예시)',
    nameLocal: '道頓堀',
    category: '관광',
    familyBlurb:
      '저녁 산책·식사 후보 예시. 영업시간·혼잡은 당일 공식/지도로 확인.',
    address: '예시 — 오사카시 주오구 도톤보리',
    mapUrl: 'https://maps.google.com/?q=Dotonbori+Osaka',
    officialUrl: 'https://www.osaka-info.jp/',
    verifyMemo: '방문 전 공식·지도에서 동선만 재확인 (예시)',
    kidsNote: '인파 많음 — 손잡이·만날 장소 미리 정하기 (예시)',
    linkedTransitIds: ['transit-hotel-dotonbori'],
  },
  {
    placeId: 'place-osaka-castle',
    name: '오사카성 공원 (예시)',
    nameLocal: '大阪城公園',
    category: '관광',
    familyBlurb: '산책·사진 후보 예시. 입장·개장 정보는 링크로만 확인.',
    mapUrl: 'https://maps.google.com/?q=Osaka+Castle',
    officialUrl: 'https://www.osakacastle.net/',
    linkedTransitIds: ['transit-hotel-castle'],
  },
  {
    placeId: 'place-aquarium',
    name: '카이유칸 (예시)',
    nameLocal: '海遊館',
    category: '관광',
    familyBlurb: '아이와 가기 좋은 후보 예시. 티켓·시간은 공식 사이트 확인.',
    mapUrl: 'https://maps.google.com/?q=Kaiyukan+Osaka',
    officialUrl: 'https://www.kaiyukan.com/',
    kidsNote: '초등 아이 관심 높을 수 있음 — 휴식 타이밍 메모 (예시)',
    linkedTransitIds: ['transit-hotel-aquarium'],
  },
  {
    placeId: 'place-usj',
    name: '유니버설 스튜디오 재팬 (예시)',
    nameLocal: 'ユニバーサル・スタジオ・ジャパン',
    category: '관광',
    familyBlurb:
      'Day 4(2026-12-06) 방문 예정(확정 컨텍스트). 가격·개장·익스프레스는 앱에 고정하지 않음.',
    mapUrl: 'https://maps.google.com/?q=Universal+Studios+Japan',
    officialUrl: 'https://www.usj.co.jp/',
    kidsNote: '키 제한·만날 장소는 USJ 허브 메모에 (예시)',
    linkedTransitIds: ['transit-hotel-usj'],
  },
  {
    placeId: 'place-kuromon',
    name: '구로몬 시장 (예시)',
    nameLocal: '黒門市場',
    category: '식사',
    familyBlurb: '아침·간식 후보 예시. 가게 영업은 현장·공식 안내로 확인.',
    mapUrl: 'https://maps.google.com/?q=Kuromon+Market',
    linkedTransitIds: ['transit-hotel-kuromon'],
  },
]

export const transits: Transit[] = [
  {
    transitId: 'transit-hotel-station',
    fromLabel: '숙소 (예시)',
    toLabel: '가까운 역 (예시)',
    modeNote: '도보 (예시)',
    stepsMemo: '출구·짐 동선은 가족이 적어 두는 메모란입니다. 배차·요금 아님.',
    dateRefs: ['2026-12-03'],
    placeRefs: ['place-hotel'],
    cautionMemo: '캐리어 있을 때 엘리베이터 우선 (예시)',
  },
  {
    transitId: 'transit-hotel-dotonbori',
    fromLabel: '숙소 (예시)',
    toLabel: '도톤보리 (예시)',
    modeNote: '지하철+도보 (예시)',
    stepsMemo: '환승·출구 번호는 출발 전 지도 앱에서 재확인하세요.',
    checkUrl: 'https://maps.google.com/?q=Dotonbori+Osaka',
    dateRefs: ['2026-12-03'],
    placeRefs: ['place-dotonbori'],
  },
  {
    transitId: 'transit-hotel-castle',
    fromLabel: '숙소 (예시)',
    toLabel: '오사카성 공원 (예시)',
    modeNote: '지하철+도보 (예시)',
    stepsMemo: '소요는 추정 메모만 — 공식 배차가 아닙니다.',
    checkUrl: 'https://maps.google.com/?q=Osaka+Castle',
    dateRefs: ['2026-12-04'],
    placeRefs: ['place-osaka-castle'],
  },
  {
    transitId: 'transit-hotel-aquarium',
    fromLabel: '숙소 (예시)',
    toLabel: '카이유칸 (예시)',
    modeNote: '지하철+도보 (예시)',
    stepsMemo: '경로 재확인용 — 요금표 아님.',
    checkUrl: 'https://maps.google.com/?q=Kaiyukan+Osaka',
    dateRefs: ['2026-12-05'],
    placeRefs: ['place-aquarium'],
  },
  {
    transitId: 'transit-hotel-usj',
    fromLabel: '숙소 (예시)',
    toLabel: 'USJ (예시)',
    modeNote: '전철+도보 (예시)',
    stepsMemo: '당일 혼잡·운행은 공식·지도에서 확인. 앱에 시각표 없음.',
    checkUrl: 'https://maps.google.com/?q=Universal+Studios+Japan',
    dateRefs: ['2026-12-06'],
    placeRefs: ['place-usj'],
    cautionMemo: '아이 손잡이·만날 장소 미리 (예시)',
  },
  {
    transitId: 'transit-hotel-kuromon',
    fromLabel: '숙소 (예시)',
    toLabel: '구로몬 시장 (예시)',
    modeNote: '지하철+도보 (예시)',
    stepsMemo: '아침 방문 후보용 예시 구간.',
    checkUrl: 'https://maps.google.com/?q=Kuromon+Market',
    dateRefs: ['2026-12-07'],
    placeRefs: ['place-kuromon'],
  },
]

export const days: DayPlan[] = [
  {
    date: '2026-12-03',
    dayIndex: 1,
    dayLabel: '도착·저녁 산책 (예시)',
    dayMemo: '예시 일차 — 실제 항공/숙소 도착 시각과 무관합니다.',
    items: [
      {
        id: 'd1-1',
        placeId: 'place-hotel',
        sortOrder: 1,
        timeNote: '오후 (메모)',
        itemMemo: '체크인·짐 풀기 (예시)',
      },
      {
        id: 'd1-2',
        placeId: 'place-dotonbori',
        sortOrder: 2,
        timeNote: '저녁 (메모)',
        itemMemo: '가벼운 저녁·야경 (예시)',
      },
    ],
  },
  {
    date: '2026-12-04',
    dayIndex: 2,
    dayLabel: '성·시내 (예시)',
    dayMemo: '예시 동선 — 확정 아님.',
    items: [
      {
        id: 'd2-1',
        placeId: 'place-osaka-castle',
        sortOrder: 1,
        timeNote: '오전 (메모)',
      },
      {
        id: 'd2-2',
        placeId: 'place-dotonbori',
        sortOrder: 2,
        timeNote: '저녁 (메모)',
        itemMemo: '식사 후보 재방문 가능 (예시)',
      },
    ],
  },
  {
    date: '2026-12-05',
    dayIndex: 3,
    dayLabel: '수족관·휴식 (예시)',
    items: [
      {
        id: 'd3-1',
        placeId: 'place-aquarium',
        sortOrder: 1,
        timeNote: '오전~오후 (메모)',
        itemMemo: '티켓은 공식 사이트에서 (예시)',
      },
    ],
  },
  {
    date: '2026-12-06',
    dayIndex: 4,
    dayLabel: 'USJ 데이',
    dayMemo: '방문일 확정 컨텍스트: 2026-12-06. 파크 상세는 USJ 허브·공식 링크.',
    items: [
      {
        id: 'd4-1',
        placeId: 'place-usj',
        sortOrder: 1,
        timeNote: '종일 (메모)',
        itemMemo: '개장·티켓·익스프레스는 공식에서 확인',
      },
    ],
  },
  {
    date: '2026-12-07',
    dayIndex: 5,
    dayLabel: '아침·귀국 준비 (예시)',
    dayMemo: '예시 — 실제 출국/이동 시각과 다를 수 있음.',
    items: [
      {
        id: 'd5-1',
        placeId: 'place-kuromon',
        sortOrder: 1,
        timeNote: '오전 (메모)',
      },
      {
        id: 'd5-2',
        placeId: 'place-hotel',
        sortOrder: 2,
        timeNote: '체크아웃 (메모)',
        itemMemo: '짐·여권 최종 점검 (예시)',
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
    label: '여권 (예시)',
    categoryId: 'cat-docs',
    done: false,
    assigneeNote: '어른',
  },
  {
    id: 'pk-tickets',
    label: '항공/이동 확인 메모 (예시)',
    categoryId: 'cat-docs',
    done: false,
  },
  {
    id: 'pk-jacket',
    label: '겉옷 (12월·예시)',
    categoryId: 'cat-clothes',
    done: false,
  },
  {
    id: 'pk-kids-clothes',
    label: '아이 여분 옷 (예시)',
    categoryId: 'cat-kids',
    done: false,
    kidsRelevant: true,
  },
  {
    id: 'pk-snacks',
    label: '간단한 간식 (예시)',
    categoryId: 'cat-kids',
    done: true,
    kidsRelevant: true,
  },
  {
    id: 'pk-charger',
    label: '충전기·보조배터리 (예시)',
    categoryId: 'cat-gadgets',
    done: false,
  },
  {
    id: 'pk-adapter',
    label: '여행용 어댑터 (예시)',
    categoryId: 'cat-gadgets',
    done: false,
  },
  {
    id: 'pk-meds',
    label: '상비약·밴드 (예시)',
    categoryId: 'cat-meds',
    done: false,
  },
  {
    id: 'pk-sunscreen',
    label: '선크림·립밤 (예시)',
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
