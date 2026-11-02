/**
 * USJ 준비 시드 — 체크/메모는 가족용. 개장·요금·규칙은 공식(한국어) 링크에서만 확인.
 */

export type UsjSectionId = 'prep' | 'dayOf'

export interface UsjCheckItem {
  id: string
  section: UsjSectionId
  text: string
  done: boolean
}

export interface UsjState {
  visitDate: string
  checklist: UsjCheckItem[]
  meetingPointMemo: string
  kidsPlanMemo: string
  ticketMemo: string
  dayOfMemo: string
  verifiedOn: string
  verifyMemo: string
}

/** 한국어 공식 페이지만. 가격·영업시간을 앱에 고정하지 않음. */
export const usjOfficialLinksKr = [
  {
    label: 'USJ 공식 홈 (한국어)',
    url: 'https://www.usj.co.jp/web/ko/usj',
  },
  {
    label: '티켓 안내 (한국어 공식)',
    url: 'https://www.usj.co.jp/web/ko/usj/tickets',
  },
  {
    label: '파크 안내 (한국어 공식)',
    url: 'https://www.usj.co.jp/web/ko/usj/park-info',
  },
  {
    label: '어트랙션 안내 (한국어 공식)',
    url: 'https://www.usj.co.jp/web/ko/usj/attractions',
  },
] as const

export const usjMapQuery = 'Universal Studios Japan Osaka'

export function createUsjSeed(visitDate: string): UsjState {
  return {
    visitDate,
    checklist: [
      {
        id: 'usj-prep-1',
        section: 'prep',
        text: '한국어 공식 사이트에서 티켓·입장 안내를 다시 확인했다 (링크)',
        done: false,
      },
      {
        id: 'usj-prep-2',
        section: 'prep',
        text: '공식 앱/입장 방법 안내를 공식 페이지에서 확인했다 (링크)',
        done: false,
      },
      {
        id: 'usj-prep-3',
        section: 'prep',
        text: '가방·충전기·아이 간식 등 준비물과 맞췄다 (예시 체크)',
        done: false,
      },
      {
        id: 'usj-prep-4',
        section: 'prep',
        text: '만날 장소·비상 연락을 가족 메모에 적어 두었다',
        done: false,
      },
      {
        id: 'usj-day-1',
        section: 'dayOf',
        text: '출발 전 공식 페이지에서 당일 안내를 한 번 더 열었다',
        done: false,
      },
      {
        id: 'usj-day-2',
        section: 'dayOf',
        text: '헤어졌을 때 만날 곳·시각 약속을 아이와 확인했다',
        done: false,
      },
      {
        id: 'usj-day-3',
        section: 'dayOf',
        text: '귀가·숙소 복귀 동선을 가족 메모에 맞춰 보았다',
        done: false,
      },
    ],
    meetingPointMemo: '예시 — 입구 근처 만날 곳을 공식 지도/현장에서 정하세요.',
    kidsPlanMemo: '예시 — 우선 타고 싶은 것·휴식은 희망 메모입니다. 대기·운휴는 공식/현장에서.',
    ticketMemo: '예시 — 티켓 종류·구매처만 메모. 가격·조건은 공식에서 확인.',
    dayOfMemo: '',
    verifiedOn: '',
    verifyMemo: '',
  }
}
