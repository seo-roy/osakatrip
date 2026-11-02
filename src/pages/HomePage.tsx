import { Link } from 'react-router-dom'
import { SampleBanner } from '../components/SampleBanner'
import {
  days,
  formatShortDate,
  packingItemsSeed,
  tripMeta,
} from '../data/sampleTrip'

const checked = packingItemsSeed.filter((i) => i.done).length
const total = packingItemsSeed.length

export function HomePage() {
  return (
    <div className="page home-page">
      <SampleBanner />

      <header className="home-hero">
        <p className="home-hero__kicker">가족 공유 · 링크 열람</p>
        <h1 className="home-hero__title">{tripMeta.tripTitle}</h1>
        <p className="home-hero__dates">
          {tripMeta.startDate.replaceAll('-', '.')} –{' '}
          {tripMeta.endDate.replaceAll('-', '.')} · 오사카
        </p>
        <p className="home-hero__party">
          {tripMeta.partySize}명 · {tripMeta.partyNote}
        </p>
        <p className="home-hero__memo">{tripMeta.homeMemo}</p>
      </header>

      <section className="panel" aria-labelledby="home-days-heading">
        <div className="panel__head">
          <h2 id="home-days-heading">일차별 일정</h2>
          <Link to="/itinerary" className="text-link">
            전체 보기
          </Link>
        </div>
        <ul className="day-list">
          {days.map((day) => (
            <li key={day.date}>
              <Link
                to={`/itinerary/${day.date}`}
                className="day-row"
              >
                <span className="day-row__day">Day {day.dayIndex}</span>
                <span className="day-row__meta">
                  <strong>
                    {formatShortDate(day.date)} · {day.dayLabel}
                  </strong>
                  <span>
                    장소 {day.items.length}곳 · 예시
                    {day.dayIndex === tripMeta.usjDayIndex ? ' · USJ' : ''}
                  </span>
                </span>
                <span className="day-row__chev" aria-hidden="true">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-actions" aria-label="바로가기">
        <Link to="/usj" className="action-tile action-tile--usj">
          <span className="action-tile__label">USJ 준비</span>
          <span className="action-tile__sub">
            Day {tripMeta.usjDayIndex} · {tripMeta.usjVisitDate}
          </span>
        </Link>
        <Link to="/packing" className="action-tile">
          <span className="action-tile__label">준비물</span>
          <span className="action-tile__sub">
            예시 진행 {checked}/{total}
          </span>
        </Link>
      </section>

      <p className="fine-print">
        접근: 공유 링크만 (near-private). 로그인·PIN은 이후 버전. 편집·동기화도
        이후 — 지금은 로컬 예시 UI입니다.
      </p>
    </div>
  )
}
