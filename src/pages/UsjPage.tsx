import { Link } from 'react-router-dom'
import { SampleBanner } from '../components/SampleBanner'
import { tripMeta } from '../data/sampleTrip'

const prepItems = [
  '공식 사이트·앱에서 티켓/개장 재확인 (링크만)',
  '만날 장소·휴대폰 배터리 계획 (가족 메모)',
  '아이 키 제한 어트랙션은 현장에서·공식 안내로',
]

const officialLinks = [
  { label: 'USJ 공식 사이트', url: 'https://www.usj.co.jp/' },
  {
    label: '지도에서 USJ',
    url: 'https://maps.google.com/?q=Universal+Studios+Japan',
  },
]

export function UsjPage() {
  return (
    <div className="page usj-page">
      <SampleBanner />

      <header className="page-header">
        <h1>USJ 준비 허브</h1>
        <p className="page-header__sub">
          방문 예정 Day {tripMeta.usjDayIndex} · {tripMeta.usjVisitDate}
        </p>
      </header>

      <section className="panel">
        <h2>사전 체크 (예시)</h2>
        <ul className="bullet-list">
          {prepItems.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
        <p className="fine-print">
          티켓 가격·개장 시간·익스프레스 재고는 앱 상수로 두지 않습니다.
        </p>
      </section>

      <section className="panel">
        <h2>공식·확인 링크</h2>
        <div className="link-stack">
          {officialLinks.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
              {l.label} (외부)
            </a>
          ))}
        </div>
      </section>

      <div className="home-actions">
        <Link
          to={`/itinerary/${tripMeta.usjVisitDate}`}
          className="action-tile"
        >
          <span className="action-tile__label">Day 4 일정</span>
          <span className="action-tile__sub">예시 동선 보기</span>
        </Link>
        <Link to="/places/place-usj" className="action-tile">
          <span className="action-tile__label">장소 상세</span>
          <span className="action-tile__sub">USJ 예시 카드</span>
        </Link>
        <Link to="/transit/transit-hotel-usj" className="action-tile">
          <span className="action-tile__label">교통 안내</span>
          <span className="action-tile__sub">숙소→USJ 예시</span>
        </Link>
      </div>
    </div>
  )
}
