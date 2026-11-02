/**
 * 가족이 제공한 숙소·항공 표시용 정보.
 * 예약 확인코드는 두지 않음. 터미널·시각은 변동 가능 → 당일 재확인.
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
  /** 출발 터미널 — 출처 기반 참고, 당일 재확인 */
  fromTerminal?: string
  /** 도착 터미널 — 출처 기반 참고, 당일 재확인 */
  toTerminal?: string
  terminalNote?: string
}

/**
 * 터미널: 동일 편명·시각의 최근 스케줄/항공사·공항 안내 기준 참고값.
 * 2026-12 당일은 항공권·공항 앱으로 다시 확인.
 */
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
    fromTerminal: '제1여객터미널 (T1)',
    toTerminal: '제2터미널 (T2)',
    terminalNote: '참고 · 탑승 전 항공권·공항 안내로 확인',
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
    fromTerminal: '제1터미널 (T1)',
    toTerminal: '제2여객터미널 (T2)',
    terminalNote: '참고 · 탑승 전 항공권·공항 안내로 확인',
  },
]

export function formatFlightTimeNote(leg: FlightLeg): string {
  return `${leg.departLocal}→${leg.arriveLocal}`
}

export function formatTerminalLine(leg: FlightLeg): string {
  const parts: string[] = []
  if (leg.fromTerminal) parts.push(`출발 ${leg.fromTerminal}`)
  if (leg.toTerminal) parts.push(`도착 ${leg.toTerminal}`)
  return parts.join(' · ')
}
