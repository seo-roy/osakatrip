import { Link, useParams } from 'react-router-dom'
import { getTransit, transits } from '../data/sampleTrip'

export function TransitPage() {
  const { transitId } = useParams()
  const transit = transitId ? getTransit(transitId) : undefined

  if (!transit) {
    return (
      <div className="page transit-page">
        <header className="page-header">
          <h1>가는 방법</h1>
          <p className="page-header__sub">
            요금은 대략·참고예요. 달라질 수 있어요.
          </p>
        </header>
        <ul className="transit-list">
          {transits.map((t) => (
            <li key={t.transitId}>
              <Link to={`/transit/${t.transitId}`} className="transit-row">
                <strong>
                  {t.fromLabel} → {t.toLabel}
                </strong>
                <span>{t.modeNote}</span>
                {t.fareApprox ? (
                  <span className="transit-row__fare">{t.fareApprox}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="page transit-page">
      <header className="page-header">
        <p className="eyebrow">가는 방법</p>
        <h1>
          {transit.fromLabel}
          <span className="arrow"> → </span>
          {transit.toLabel}
        </h1>
        <p className="page-header__sub">{transit.modeNote}</p>
      </header>

      <section className="panel">
        <h2>어떻게 가요</h2>
        <p>{transit.stepsMemo}</p>
        {transit.fareApprox ? (
          <p className="fare-note">
            <strong>대략 요금 (참고)</strong> {transit.fareApprox}
          </p>
        ) : null}
        {transit.cautionMemo ? (
          <p className="kids-note">
            <strong>주의</strong> {transit.cautionMemo}
          </p>
        ) : null}

        {transit.checkUrl ? (
          <div className="link-stack">
            <a href={transit.checkUrl} target="_blank" rel="noreferrer">
              지도에서 경로 보기
            </a>
          </div>
        ) : null}
      </section>

      <Link to="/transit" className="text-link back-link">
        ← 목록
      </Link>
      <Link to="/itinerary" className="text-link back-link">
        ← 일정으로
      </Link>
    </div>
  )
}
