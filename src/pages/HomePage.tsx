import { Link } from 'react-router-dom'
import { SampleBanner } from '../components/SampleBanner'
import { formatShortDate, tripMeta } from '../data/sampleTrip'
import { useTrip } from '../storage/TripContext'

export function HomePage() {
  const { days, packingItems, resetToSample } = useTrip()
  const checked = packingItems.filter((i) => i.done).length
  const total = packingItems.length

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
              <Link to={`/itinerary/${day.date}`} className="day-row">
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
        접근: 공유 링크만 (near-private). 로그인·PIN은 later. 편집은 지금 이
        브라우저 localStorage에 저장 · 기기 동기화는 later.
      </p>

      <button type="button" className="ghost-btn" onClick={resetToSample}>
        전체 예시 데이터로 초기화
      </button>
    </div>
  )
}
