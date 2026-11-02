/**
 * 가족이 제공한 숙소·항공 표시용 정보.
 * 예약 확인코드·예약자 실명 강조·민감 코드는 여기에 두지 않음.
 * 항공 시각은 변동 가능 — UI에서 재확인 안내.
 */

export const partyMembers = ['아빠', '엄마', 'Alice', 'Roy'] as const

export const partyDisplayLine = partyMembers.join(' · ')

export interface LodgingInfo {
  areaLabel: string
  nights: number
  checkIn: string
  checkOut: string
  checkInWeekday: string
  checkOutWeekday: string
  propertyType: string
  beds: number
  guests: number
  hostName: string
  refundPolicyNote: string
  mapQuery: string
}

/** UI·내보내기에 쓰는 숙소 요약 — 확인코드 없음 */
export const lodging: LodgingInfo = {
  areaLabel: '오사카시 나니와구 (Naniwa Ward)',
  nights: 4,
  checkIn: '2026-12-03',
  checkOut: '2026-12-07',
  checkInWeekday: '목',
  checkOutWeekday: '월',
  propertyType: '집/아파트 전체',
  beds: 2,
  guests: 4,
  hostName: 'Rui',
  refundPolicyNote:
    '가족 메모: 24시간 동안 무료 취소 가능. 이후 취소 시 환불 불가. 시간은 리스팅 현지 시간 기준.',
  mapQuery: 'Naniwa Ward Osaka lodging',
}

export interface FlightLeg {
  id: string
  directionLabel: string
  date: string
  weekday: string
  airline: string
  flightNumber: string
  fromCode: string
  fromName: string
  toCode: string
  toName: string
  departLocal: string
  arriveLocal: string
  nonstop: boolean
}

export const flights: FlightLeg[] = [
  {
    id: 'flight-outbound',
    directionLabel: '가는 편 · Seoul → Osaka',
    date: '2026-12-03',
    weekday: '목',
    airline: '제주항공',
    flightNumber: '7C 1305',
    fromCode: 'ICN',
    fromName: '인천국제공항',
    toCode: 'KIX',
    toName: '간사이 국제공항',
    departLocal: '16:55',
    arriveLocal: '18:40',
    nonstop: true,
  },
  {
    id: 'flight-return',
    directionLabel: '오는 편 · Osaka → Seoul',
    date: '2026-12-07',
    weekday: '월',
    airline: '에어서울',
    flightNumber: 'RS 382',
    fromCode: 'KIX',
    fromName: '간사이 국제공항',
    toCode: 'ICN',
    toName: '인천국제공항',
    departLocal: '18:00',
    arriveLocal: '20:05',
    nonstop: true,
  },
]

export function formatFlightTimeNote(leg: FlightLeg): string {
  return `${leg.departLocal}→${leg.arriveLocal}`
}
