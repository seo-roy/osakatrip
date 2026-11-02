import { Link, useParams } from 'react-router-dom'
import { SampleBanner } from '../components/SampleBanner'
import { getPlace, places } from '../data/sampleTrip'

export function PlacePage() {
  const { placeId } = useParams()
  const place = placeId ? getPlace(placeId) : undefined

  if (!place) {
    return (
      <div className="page">
        <SampleBanner />
        <header className="page-header">
          <h1>장소 상세</h1>
          <p className="page-header__sub">장소를 찾을 수 없습니다.</p>
        </header>
        <ul className="simple-list">
          {places.map((p) => (
            <li key={p.placeId}>
              <Link to={`/places/${p.placeId}`}>{p.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="page place-page">
      <SampleBanner />

      <header className="page-header">
        <p className="eyebrow">{place.category} · 예시</p>
        <h1>{place.name}</h1>
        {place.nameLocal ? (
          <p className="page-header__sub">{place.nameLocal}</p>
        ) : null}
      </header>

      <section className="panel">
        <p>{place.familyBlurb}</p>
        {place.address ? (
          <p className="muted">
            <strong>주소(예시)</strong> {place.address}
          </p>
        ) : null}
        {place.kidsNote ? (
          <p className="kids-note">
            <strong>아이 메모</strong> {place.kidsNote}
          </p>
        ) : null}
        {place.verifyMemo ? (
          <p className="verify-note">
            <strong>확인용</strong> {place.verifyMemo}
          </p>
        ) : null}

        <div className="link-stack">
          {place.mapUrl ? (
            <a href={place.mapUrl} target="_blank" rel="noreferrer">
              지도에서 확인 (외부)
            </a>
          ) : null}
          {place.officialUrl ? (
            <a href={place.officialUrl} target="_blank" rel="noreferrer">
              공식/안내 사이트 (외부)
            </a>
          ) : null}
        </div>

        <p className="fine-print">
          영업시간·요금·휴무는 앱에 사실로 두지 않습니다. 외부 링크에서
          확인하세요.
        </p>
      </section>

      {place.linkedTransitIds && place.linkedTransitIds.length > 0 ? (
        <section className="panel" aria-labelledby="place-transit">
          <h2 id="place-transit">관련 교통 (예시)</h2>
          <ul className="simple-list">
            {place.linkedTransitIds.map((id) => (
              <li key={id}>
                <Link to={`/transit/${id}`}>교통 안내 열기</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <Link to="/itinerary" className="text-link back-link">
        ← 일정으로
      </Link>
    </div>
  )
}
