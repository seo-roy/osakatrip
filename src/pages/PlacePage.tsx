import { useMemo, useState, type FormEvent } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  appleDirectionsUrl,
  googleDirectionsUrl,
  isUsableMapQuery,
  mapsSearchUrl,
  placeMapQuery,
} from '../lib/mapsLinks'
import { useAdultMode } from '../storage/AdultModeContext'
import { useTrip } from '../storage/TripContext'

export function PlacePage() {
  const { placeId } = useParams()
  const [searchParams] = useSearchParams()
  const fromParam = searchParams.get('from')
  const { adultMode } = useAdultMode()
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

  const otherPlaces = useMemo(
    () => places.filter((p) => p.placeId !== place?.placeId),
    [places, place?.placeId],
  )

  if (!place) {
    return (
      <div className="page">
        <header className="page-header">
          <h1>장소</h1>
          <p className="page-header__sub">찾을 수 없어요</p>
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
      <header className="page-header">
        <p className="eyebrow">{place.category}</p>
        <h1>{place.name}</h1>
        {place.nameLocal ? (
          <p className="page-header__sub">{place.nameLocal}</p>
        ) : null}
      </header>

      <section className="panel">
        {adultMode && editing ? (
          <form className="field-stack" onSubmit={onSave}>
            <label className="field">
              <span>이름</span>
              <input
                value={name}
                maxLength={60}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span>주소</span>
              <input
                value={address}
                maxLength={120}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label className="field">
              <span>설명</span>
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
            {place.address ? (
              <p className="muted">
                <strong>주소</strong> {place.address}
              </p>
            ) : null}
            {place.kidsNote ? (
              <p className="kids-note">
                <strong>아이</strong> {place.kidsNote}
              </p>
            ) : null}
            {adultMode ? (
              <button type="button" className="text-btn" onClick={startEdit}>
                이름·주소 고치기
              </button>
            ) : null}
          </>
        )}

        <div className="link-stack">
          {isUsableMapQuery(searchQuery) ? (
            <a
              href={mapsSearchUrl(searchQuery)}
              target="_blank"
              rel="noreferrer"
            >
              지도에서 보기
            </a>
          ) : null}
          {place.officialUrl ? (
            <a href={place.officialUrl} target="_blank" rel="noreferrer">
              안내 사이트
            </a>
          ) : null}
        </div>
      </section>

      <section className="panel" aria-labelledby="directions-title">
        <h2 id="directions-title">길찾기</h2>
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
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>도착</span>
          <select value={destId} onChange={(e) => setDestId(e.target.value)}>
            <option value="">선택</option>
            {places.map((p) => (
              <option key={p.placeId} value={p.placeId}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        {canOpenDirections ? (
          <div className="link-stack">
            <a
              href={googleDirectionsUrl(originQuery, destQuery)}
              target="_blank"
              rel="noreferrer"
              className="primary-btn primary-btn--link"
            >
              Google 지도 열기
            </a>
            <a
              href={appleDirectionsUrl(originQuery, destQuery)}
              target="_blank"
              rel="noreferrer"
            >
              Apple 지도 열기
            </a>
          </div>
        ) : (
          <p className="muted">출발과 도착을 골라 주세요.</p>
        )}

        {otherPlaces.length === 0 ? null : null}
      </section>

      {place.linkedTransitIds && place.linkedTransitIds.length > 0 ? (
        <section className="panel" aria-labelledby="place-transit">
          <h2 id="place-transit">가는 방법 메모</h2>
          <ul className="simple-list">
            {place.linkedTransitIds.map((id) => (
              <li key={id}>
                <Link to={`/transit/${id}`}>교통 메모 보기</Link>
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
