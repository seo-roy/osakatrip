import { Link } from 'react-router-dom'
import {
  formatShortDate,
  formatUsjVisitLabel,
  tripMeta,
} from '../data/sampleTrip'
import {
  flights,
  formatTerminalLine,
  lodging,
  partyDisplayLine,
} from '../data/travelBookings'
import { useTrip } from '../storage/TripContext'

export function HomePage() {
  const { days, packingItems, getPlace } = useTrip()
  const checked = packingItems.filter((i) => i.done).length
  const total = packingItems.length

  function mealTip(date: string): string | null {
    const day = days.find((d) => d.date === date)
    if (!day) return null
    for (const item of day.items) {
      const place = getPlace(item.placeId)
      if (place?.category === '식사') return place.name
    }
    return null
  }

  return (
    <div className="page home-page">
      <header className="home-hero">
        <p className="home-hero__kicker">우리 가족 여행</p>
        <h1 className="home-hero__title">{tripMeta.tripTitle}</h1>
        <p className="home-hero__dates">
          {tripMeta.startDate.replaceAll('-', '.')} –{' '}
          {tripMeta.endDate.replaceAll('-', '.')} · 오사카
        </p>
        <p className="home-hero__party">{partyDisplayLine}</p>
      </header>

      <section className="panel" aria-labelledby="lodging-heading">
        <h2 id="lodging-heading">숙소</h2>
        <p className="booking-lead">
          {lodging.areaLabel} · {lodging.nights}박
        </p>
        <p>
          {lodging.checkIn.replaceAll('-', '.')} ({lodging.checkInWeekday}) →{' '}
          {lodging.checkOut.replaceAll('-', '.')} ({lodging.checkOutWeekday})
        </p>
        <p className="muted">
          {lodging.propertyType} · 침대 {lodging.beds} · {lodging.guests}명 ·
          호스트 {lodging.hostName}
        </p>
        <div className="place-card__links">
          <Link to="/places/place-hotel">지도 보기</Link>
        </div>
      </section>

      <section className="panel" aria-labelledby="flights-heading">
        <h2 id="flights-heading">비행기</h2>
        <ul className="flight-list">
          {flights.map((leg) => (
            <li key={leg.id} className="flight-card">
              <p className="flight-card__dir">{leg.directionLabel}</p>
              <p className="flight-card__meta">
                <strong>
                  {leg.airline} {leg.flightNumber}
                </strong>
                {leg.nonstop ? ' · 직항' : ''}
              </p>
              <p>
                {leg.date.replaceAll('-', '.')} ({leg.weekday}) · {leg.fromCode}{' '}
                {leg.departLocal} → {leg.toCode} {leg.arriveLocal}
              </p>
              {formatTerminalLine(leg) ? (
                <p className="flight-card__terminal">
                  {formatTerminalLine(leg)}
                  {leg.terminalNote ? (
                    <span className="muted"> · {leg.terminalNote}</span>
                  ) : null}
                </p>
              ) : null}
              <p className="muted">
                {leg.fromName} → {leg.toName}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel" aria-labelledby="home-days-heading">
        <div className="panel__head">
          <h2 id="home-days-heading">날짜별 일정</h2>
          <Link to="/itinerary" className="text-link">
            모두 보기
          </Link>
        </div>
        <ul className="day-list">
          {days.map((day) => {
            const meal = mealTip(day.date)
            const isUsj = day.date === tripMeta.usjVisitDate
            return (
              <li key={day.date}>
                <Link to={`/itinerary/${day.date}`} className="day-row">
                  <span className="day-row__day">
                    {formatShortDate(day.date)}
                  </span>
                  <span className="day-row__meta">
                    <strong>
                      {isUsj ? 'USJ · 12월 4일' : day.dayLabel}
                    </strong>
                    <span>
                      {meal
                        ? meal.replace(/\s*\(추천\)\s*$/, '')
                        : `${day.items.length}곳`}
                    </span>
                  </span>
                  <span className="day-row__chev" aria-hidden="true">
                    ›
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="home-actions" aria-label="바로가기">
        <Link to="/usj" className="action-tile action-tile--usj">
          <span className="action-tile__label">USJ</span>
          <span className="action-tile__sub">
            {formatUsjVisitLabel(tripMeta.usjVisitDate)}
          </span>
        </Link>
        <Link to="/transit" className="action-tile">
          <span className="action-tile__label">교통</span>
          <span className="action-tile__sub">요금은 대략·참고</span>
        </Link>
        <Link to="/packing" className="action-tile">
          <span className="action-tile__label">준비물</span>
          <span className="action-tile__sub">
            {checked}/{total} 챙김
          </span>
        </Link>
      </section>

      <p className="settings-foot">
        <Link to="/settings" className="settings-foot__link">
          설정
        </Link>
      </p>
    </div>
  )
}
