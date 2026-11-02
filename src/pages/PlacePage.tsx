import { useMemo, useState, type FormEvent } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { SampleBanner } from '../components/SampleBanner'
import {
  appleDirectionsUrl,
  googleDirectionsUrl,
  isUsableMapQuery,
  mapsSearchUrl,
  placeMapQuery,
} from '../lib/mapsLinks'
import { useTrip } from '../storage/TripContext'

export function PlacePage() {
  const { placeId } = useParams()
  const [searchParams] = useSearchParams()
  const fromParam = searchParams.get('from')
  const { places, getPlace, updatePlace } = useTrip()
  const place = placeId ? getPlace(placeId) : undefined

  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [blurb, setBlurb] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [originId, setOriginId] = useState(fromParam ?? '')
  const [destId, setDestId] = useState(placeId ?? '')

  const originPlace = originId ? getPlace(originId) : undefined
  const destPlace = destId ? getPlace(destId) : place

  const originQuery = originPlace ? placeMapQuery(originPlace) : ''
  const destQuery = destPlace ? placeMapQuery(destPlace) : ''
  const canOpenDirections =
    isUsableMapQuery(originQuery) && isUsableMapQuery(destQuery)

  const searchQuery = place ? placeMapQuery(place) : ''
  const addressMissing = Boolean(place && !place.address?.trim())

  const otherPlaces = useMemo(
    () => places.filter((p) => p.placeId !== place?.placeId),
    [places, place?.placeId],
  )

  if (!place) {
    return (
      <div className="page">
        <SampleBanner />
        <header className="page-header">
          <h1>장소 상세</h1>
          <p className="page-header__sub">장소를 찾을 수 없습니다.</p>
        </header>
        {places.length === 0 ? (
          <p className="empty-state">등록된 장소가 없습니다.</p>
        ) : (
          <ul className="simple-list">
            {places.map((p) => (
              <li key={p.placeId}>
                <Link to={`/places/${p.placeId}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  function startEdit() {
    setName(place!.name)
    setAddress(place!.address ?? '')
    setBlurb(place!.familyBlurb)
    setError(null)
    setEditing(true)
  }

  function onSave(e: FormEvent) {
    e.preventDefault()
    const result = updatePlace(place!.placeId, {
      name,
      address,
      familyBlurb: blurb,
    })
    if (!result.ok) {
      setError(result.error)
      return
    }
    setEditing(false)
    setError(null)
  }

  return (
    <div className="page place-page">
      <SampleBanner />

      <header className="page-header">
        <p className="eyebrow">{place.category} · 예시 가능</p>
        <h1>{place.name}</h1>
        {place.nameLocal ? (
          <p className="page-header__sub">{place.nameLocal}</p>
        ) : null}
      </header>

      <section className="panel">
        {editing ? (
          <form className="field-stack" onSubmit={onSave}>
            <label className="field">
              <span>이름 *</span>
              <input
                value={name}
                maxLength={60}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span>주소 (지도·길찾기용 · 보완 가능)</span>
              <input
                value={address}
                maxLength={120}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="비어 있으면 이름으로 지도 검색"
              />
            </label>
            <label className="field">
              <span>가족용 설명</span>
              <textarea
                rows={3}
                value={blurb}
                maxLength={200}
                onChange={(e) => setBlurb(e.target.value)}
              />
            </label>
            {error ? <p className="form-error">{error}</p> : null}
            <div className="btn-row">
              <button type="submit" className="primary-btn">
                저장
              </button>
              <button
                type="button"
                className="ghost-btn ghost-btn--inline"
                onClick={() => setEditing(false)}
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <>
            <p>{place.familyBlurb}</p>
            <p className="muted">
              <strong>주소</strong>{' '}
              {place.address?.trim() || (
                <span className="warn-inline">미입력 — 아래에서 보완하세요</span>
              )}
            </p>
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
            <button type="button" className="text-btn" onClick={startEdit}>
              이름·주소 편집
            </button>
          </>
        )}

        <div className="link-stack">
          {isUsableMapQuery(searchQuery) ? (
            <a
              href={mapsSearchUrl(searchQuery)}
              target="_blank"
              rel="noreferrer"
            >
              지도에서 이 장소 검색 (외부)
            </a>
          ) : null}
          {place.officialUrl ? (
            <a href={place.officialUrl} target="_blank" rel="noreferrer">
              공식/안내 사이트 (외부)
            </a>
          ) : null}
        </div>

        <p className="fine-print">
          영업시간·요금·휴무·소요 시간은 앱에 사실로 두지 않습니다. 지도 앱이
          보여주는 경로·시간은 앱 밖 정보입니다.
        </p>
      </section>

      <section className="panel" aria-labelledby="directions-title">
        <h2 id="directions-title">길찾기 열기</h2>
        <p className="muted">
          출발·도착을 확인한 뒤 지도 앱으로만 엽니다. 앱 안에 경로·소요를 표시하지
          않습니다.
        </p>

        {addressMissing ? (
          <p className="form-error">
            이 장소 주소가 비어 있습니다. 위「이름·주소 편집」에서 보완하면 길찾기가
            더 정확해질 수 있습니다.
          </p>
        ) : null}

        <label className="field">
          <span>출발</span>
          <select
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
          >
            <option value="">선택</option>
            {places.map((p) => (
              <option key={p.placeId} value={p.placeId}>
                {p.name}
                {!p.address?.trim() ? ' (주소 미입력)' : ''}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>도착</span>
          <select
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
          >
            <option value="">선택</option>
            {places.map((p) => (
              <option key={p.placeId} value={p.placeId}>
                {p.name}
                {!p.address?.trim() ? ' (주소 미입력)' : ''}
              </option>
            ))}
          </select>
        </label>

        {!canOpenDirections ? (
          <p className="muted">출발·도착을 모두 선택하세요.</p>
        ) : (
          <div className="link-stack">
            <a
              href={googleDirectionsUrl(originQuery, destQuery)}
              target="_blank"
              rel="noreferrer"
              className="primary-btn primary-btn--link"
            >
              Google 지도에서 길찾기
            </a>
            <a
              href={appleDirectionsUrl(originQuery, destQuery)}
              target="_blank"
              rel="noreferrer"
            >
              Apple 지도에서 길찾기
            </a>
          </div>
        )}

        {otherPlaces.length > 0 ? (
          <p className="fine-print">
            일정에서「이전→여기 길찾기」로 오면 출발이 미리 채워집니다.
          </p>
        ) : null}
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
