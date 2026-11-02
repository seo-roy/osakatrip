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
        text: '티켓·입장 안내를 공식 사이트에서 확인했다',
        done: false,
      },
      {
        id: 'usj-prep-2',
        section: 'prep',
        text: '입장 방법을 공식 페이지에서 확인했다',
        done: false,
      },
      {
        id: 'usj-prep-3',
        section: 'prep',
        text: '가방·충전기·간식을 챙겼다',
        done: false,
      },
      {
        id: 'usj-prep-4',
        section: 'prep',
        text: '만날 곳·연락을 가족 메모에 적었다',
        done: false,
      },
      {
        id: 'usj-day-1',
        section: 'dayOf',
        text: '출발 전 공식 안내를 한 번 더 봤다',
        done: false,
      },
      {
        id: 'usj-day-2',
        section: 'dayOf',
        text: '헤어지면 만날 곳을 아이와 확인했다',
        done: false,
      },
      {
        id: 'usj-day-3',
        section: 'dayOf',
        text: '숙소로 돌아가는 길을 맞춰 봤다',
        done: false,
      },
    ],
    meetingPointMemo: '입구 근처에서 만날 곳을 정해요.',
    kidsPlanMemo: '타고 싶은 것과 쉬는 시간을 미리 이야기해요.',
    ticketMemo: '티켓은 공식 사이트에서 확인해요.',
    dayOfMemo: '',
    verifiedOn: '',
    verifyMemo: '',
  }
}
