import { Link, useParams } from 'react-router-dom'
import { SampleBanner } from '../components/SampleBanner'
import {
  days,
  formatKoreanDate,
  formatShortDate,
  getDay,
  getPlace,
  tripMeta,
} from '../data/sampleTrip'

export function ItineraryPage() {
  const { date } = useParams()
  const selected = date ? getDay(date) : days[0]
  const activeDate = selected?.date ?? days[0].date
  const day = getDay(activeDate) ?? days[0]

  return (
    <div className="page itinerary-page">
      <SampleBanner />

      <header className="page-header">
        <h1>날짜별 일정</h1>
        <p className="page-header__sub">
          {tripMeta.startDate.replaceAll('-', '.')} –{' '}
          {tripMeta.endDate.replaceAll('-', '.')} · 예시 동선
        </p>
      </header>

      <div className="day-tabs" role="tablist" aria-label="여행 일차">
        {days.map((d) => (
          <Link
            key={d.date}
            to={`/itinerary/${d.date}`}
            role="tab"
            aria-selected={d.date === activeDate}
            className={
              d.date === activeDate ? 'day-tab is-active' : 'day-tab'
            }
          >
            <span>D{d.dayIndex}</span>
            <span>{formatShortDate(d.date)}</span>
          </Link>
        ))}
      </div>

      <section className="panel" aria-labelledby="day-title">
        <h2 id="day-title" className="day-title">
          Day {day.dayIndex} · {formatKoreanDate(day.date)}
        </h2>
        <p className="day-label">{day.dayLabel}</p>
        {day.dayMemo ? <p className="day-memo">{day.dayMemo}</p> : null}

        <ul className="place-list">
          {day.items
            .slice()
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((item) => {
              const place = getPlace(item.placeId)
              if (!place) return null
              return (
                <li key={item.id} className="place-card">
                  <div className="place-card__top">
                    <span className="place-card__order">{item.sortOrder}</span>
                    <div>
                      <Link
                        to={`/places/${place.placeId}`}
                        className="place-card__name"
                      >
                        {place.name}
                      </Link>
                      {item.timeNote ? (
                        <p className="place-card__time">{item.timeNote}</p>
                      ) : null}
                      {item.itemMemo ? (
                        <p className="place-card__memo">{item.itemMemo}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="place-card__links">
                    <Link to={`/places/${place.placeId}`}>장소 상세</Link>
                    {place.linkedTransitIds?.[0] ? (
                      <Link to={`/transit/${place.linkedTransitIds[0]}`}>
                        교통 안내
                      </Link>
                    ) : (
                      <Link to="/transit">교통 목록</Link>
                    )}
                  </div>
                </li>
              )
            })}
        </ul>

        <Link
          to={
            day.items[0]?.placeId &&
            getPlace(day.items[0].placeId)?.linkedTransitIds?.[0]
              ? `/transit/${getPlace(day.items[0].placeId)!.linkedTransitIds![0]}`
              : '/transit'
          }
          className="secondary-cta"
        >
          이 날 교통 보기 (예시)
        </Link>
      </section>
    </div>
  )
}
