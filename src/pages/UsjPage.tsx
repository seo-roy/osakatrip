import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { tripMeta } from '../data/sampleTrip'
import { usjMapQuery, usjOfficialLinksKr } from '../data/usjSeed'
import {
  googleDirectionsUrl,
  mapsSearchUrl,
  placeMapQuery,
} from '../lib/mapsLinks'
import { useAdultMode } from '../storage/AdultModeContext'
import { useTrip } from '../storage/TripContext'

export function UsjPage() {
  const { adultMode } = useAdultMode()
  const { ready, usj, getPlace, toggleUsjCheck, updateUsj } = useTrip()
  const [meetingPointMemo, setMeetingPointMemo] = useState('')
  const [kidsPlanMemo, setKidsPlanMemo] = useState('')
  const [ticketMemo, setTicketMemo] = useState('')
  const [dayOfMemo, setDayOfMemo] = useState('')
  const [verifiedOn, setVerifiedOn] = useState('')
  const [verifyMemo, setVerifyMemo] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!ready || hydrated) return
    setMeetingPointMemo(usj.meetingPointMemo)
    setKidsPlanMemo(usj.kidsPlanMemo)
    setTicketMemo(usj.ticketMemo)
    setDayOfMemo(usj.dayOfMemo)
    setVerifiedOn(usj.verifiedOn)
    setVerifyMemo(usj.verifyMemo)
    setHydrated(true)
  }, [ready, hydrated, usj])

  const prep = usj.checklist.filter((i) => i.section === 'prep')
  const dayOf = usj.checklist.filter((i) => i.section === 'dayOf')
  const hotel = getPlace('place-hotel')
  const usjPlace = getPlace('place-usj')

  const fromQuery = hotel ? placeMapQuery(hotel) : 'Osaka'
  const toQuery = usjPlace ? placeMapQuery(usjPlace) : usjMapQuery

  function saveMemos(e: FormEvent) {
    e.preventDefault()
    if (
      [meetingPointMemo, kidsPlanMemo, ticketMemo, dayOfMemo, verifyMemo].some(
        (v) => v.length > 300,
      )
    ) {
      setError('메모는 짧게 적어 주세요')
      return
    }
    if (verifiedOn && !/^\d{4}-\d{2}-\d{2}$/.test(verifiedOn)) {
      setError('날짜 형식을 확인해 주세요')
      return
    }

    updateUsj({
      meetingPointMemo: meetingPointMemo.trim(),
      kidsPlanMemo: kidsPlanMemo.trim(),
      ticketMemo: ticketMemo.trim(),
      dayOfMemo: dayOfMemo.trim(),
      verifiedOn,
      verifyMemo: verifyMemo.trim(),
    })
    setError(null)
    setSavedFlash(true)
    window.setTimeout(() => setSavedFlash(false), 1500)
  }

  return (
    <div className="page usj-page">
      <header className="page-header">
        <h1>USJ</h1>
        <p className="page-header__sub">
          Day {tripMeta.usjDayIndex} · {usj.visitDate}
        </p>
      </header>

      <section className="panel" aria-labelledby="usj-official">
        <h2 id="usj-official">공식 안내 · 지도</h2>
        <div className="link-stack">
          {usjOfficialLinksKr.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
          <a href={mapsSearchUrl(usjMapQuery)} target="_blank" rel="noreferrer">
            지도에서 USJ
          </a>
          <a
            href={googleDirectionsUrl(fromQuery, toQuery)}
            target="_blank"
            rel="noreferrer"
          >
            숙소 → USJ 길찾기
          </a>
        </div>
      </section>

      <section className="panel" aria-labelledby="usj-prep">
        <h2 id="usj-prep">가기 전에</h2>
        <ul className="check-list">
          {prep.map((item) => (
            <li key={item.id}>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleUsjCheck(item.id)}
                />
                <span className="check-row__label">{item.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel" aria-labelledby="usj-day">
        <h2 id="usj-day">그날</h2>
        <ul className="check-list">
          {dayOf.map((item) => (
            <li key={item.id}>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleUsjCheck(item.id)}
                />
                <span className="check-row__label">{item.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      {adultMode ? (
        <section className="panel" aria-labelledby="usj-memos">
          <h2 id="usj-memos">가족 메모 (어른)</h2>
          <form className="field-stack" onSubmit={saveMemos}>
            <label className="field">
              <span>만날 곳</span>
              <textarea
                rows={2}
                maxLength={300}
                value={meetingPointMemo}
                onChange={(e) => setMeetingPointMemo(e.target.value)}
              />
            </label>
            <label className="field">
              <span>아이 계획</span>
              <textarea
                rows={2}
                maxLength={300}
                value={kidsPlanMemo}
                onChange={(e) => setKidsPlanMemo(e.target.value)}
              />
            </label>
            <label className="field">
              <span>티켓 메모</span>
              <textarea
                rows={2}
                maxLength={300}
                value={ticketMemo}
                onChange={(e) => setTicketMemo(e.target.value)}
              />
            </label>
            <label className="field">
              <span>당일 메모</span>
              <textarea
                rows={2}
                maxLength={300}
                value={dayOfMemo}
                onChange={(e) => setDayOfMemo(e.target.value)}
              />
            </label>
            <label className="field">
              <span>공식 페이지 확인한 날</span>
              <input
                type="date"
                value={verifiedOn}
                onChange={(e) => setVerifiedOn(e.target.value)}
              />
            </label>
            <label className="field">
              <span>확인 메모</span>
              <input
                maxLength={300}
                value={verifyMemo}
                onChange={(e) => setVerifyMemo(e.target.value)}
              />
            </label>
            {error ? <p className="form-error">{error}</p> : null}
            {savedFlash ? (
              <p className="progress-line" role="status">
                저장했어요
              </p>
            ) : null}
            <button type="submit" className="primary-btn">
              메모 저장
            </button>
          </form>
        </section>
      ) : (
        <section className="panel">
          <h2>가족 약속</h2>
          {usj.meetingPointMemo ? <p>{usj.meetingPointMemo}</p> : null}
          {usj.kidsPlanMemo ? <p className="kids-note">{usj.kidsPlanMemo}</p> : null}
          {!usj.meetingPointMemo && !usj.kidsPlanMemo ? (
            <p className="muted">만날 곳은 어른이 설정에서 적을 수 있어요.</p>
          ) : null}
        </section>
      )}

      <div className="home-actions">
        <Link to={`/itinerary/${usj.visitDate}`} className="action-tile">
          <span className="action-tile__label">Day 4 일정</span>
          <span className="action-tile__sub">그날 보기</span>
        </Link>
        <Link to="/places/place-usj" className="action-tile">
          <span className="action-tile__label">USJ 장소</span>
          <span className="action-tile__sub">지도 · 길찾기</span>
        </Link>
      </div>
    </div>
  )
}
