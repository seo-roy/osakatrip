import { Link, useParams } from 'react-router-dom'
import { SampleBanner } from '../components/SampleBanner'
import { getTransit, transits } from '../data/sampleTrip'

export function TransitPage() {
  const { transitId } = useParams()
  const transit = transitId ? getTransit(transitId) : undefined

  if (!transit) {
    return (
      <div className="page transit-page">
        <SampleBanner />
        <header className="page-header">
          <h1>교통 안내</h1>
          <p className="page-header__sub">
            예시 구간 목록 · 배차·요금 아님
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="page transit-page">
      <SampleBanner />

      <header className="page-header">
        <p className="eyebrow">교통 · 예시</p>
        <h1>
          {transit.fromLabel}
          <span className="arrow"> → </span>
          {transit.toLabel}
        </h1>
        <p className="page-header__sub">{transit.modeNote}</p>
      </header>

      <section className="panel">
        <h2>이동 메모</h2>
        <p>{transit.stepsMemo}</p>
        {transit.cautionMemo ? (
          <p className="kids-note">
            <strong>주의</strong> {transit.cautionMemo}
          </p>
        ) : null}

        {transit.checkUrl ? (
          <div className="link-stack">
            <a href={transit.checkUrl} target="_blank" rel="noreferrer">
              경로 재확인 (외부 지도)
            </a>
          </div>
        ) : null}

        <p className="fine-print">
          시각표·요금·“N분 소요”를 공식 사실처럼 표시하지 않습니다.
        </p>
      </section>

      <Link to="/transit" className="text-link back-link">
        ← 교통 목록
      </Link>
      <Link to="/itinerary" className="text-link back-link">
        ← 일정으로
      </Link>
    </div>
  )
}
