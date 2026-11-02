import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { SampleBanner } from '../components/SampleBanner'
import { tripMeta } from '../data/sampleTrip'
import { usjMapQuery, usjOfficialLinksKr } from '../data/usjSeed'
import {
  googleDirectionsUrl,
  mapsSearchUrl,
  placeMapQuery,
} from '../lib/mapsLinks'
import { useTrip } from '../storage/TripContext'

export function UsjPage() {
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
      setError('각 메모는 300자 이내로 적어 주세요')
      return
    }
    if (verifiedOn && !/^\d{4}-\d{2}-\d{2}$/.test(verifiedOn)) {
      setError('확인일은 YYYY-MM-DD 형식으로 입력하세요')
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
      <SampleBanner />

      <header className="page-header">
        <h1>USJ 방문 준비</h1>
        <p className="page-header__sub">
          방문일 Day {tripMeta.usjDayIndex} · {usj.visitDate} (잠김)
        </p>
      </header>

      <section className="panel">
        <h2>안내</h2>
        <p>
          개장 시간, 입장 규칙, 어트랙션 운휴·대기, 티켓 조건은 앱에 사실로 두지
          않습니다. 아래 <strong>한국어 공식</strong> 페이지에서 확인하세요.
        </p>
      </section>

      <section className="panel" aria-labelledby="usj-official">
        <h2 id="usj-official">한국어 공식 링크</h2>
        <div className="link-stack">
          {usjOfficialLinksKr.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
              {l.label} (외부)
            </a>
          ))}
          <a href={mapsSearchUrl(usjMapQuery)} target="_blank" rel="noreferrer">
            지도에서 USJ 검색 (외부)
          </a>
          <a
            href={googleDirectionsUrl(fromQuery, toQuery)}
            target="_blank"
            rel="noreferrer"
          >
            숙소(예시)→USJ 길찾기 열기 (외부 지도)
          </a>
        </div>
        <p className="fine-print">
          지도 앱의 경로·소요 시간은 앱이 확인한 사실이 아닙니다.
        </p>
      </section>

      <section className="panel" aria-labelledby="usj-prep">
        <h2 id="usj-prep">사전 준비 체크</h2>
        {prep.length === 0 ? (
          <p className="empty-state">체크 항목이 없습니다.</p>
        ) : (
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
        )}
      </section>

      <section className="panel" aria-labelledby="usj-day">
        <h2 id="usj-day">당일 가족 체크</h2>
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

      <section className="panel" aria-labelledby="usj-memos">
        <h2 id="usj-memos">가족 메모 · 마지막 확인일</h2>
        <form className="field-stack" onSubmit={saveMemos}>
          <label className="field">
            <span>만날 장소 메모</span>
            <textarea
              rows={2}
              maxLength={300}
              value={meetingPointMemo}
              onChange={(e) => setMeetingPointMemo(e.target.value)}
            />
          </label>
          <label className="field">
            <span>아이·동선 희망 메모</span>
            <textarea
              rows={2}
              maxLength={300}
              value={kidsPlanMemo}
              onChange={(e) => setKidsPlanMemo(e.target.value)}
            />
          </label>
          <label className="field">
            <span>티켓 메모 (가격·조건 아님)</span>
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
              placeholder="가족이 정한 약속만"
            />
          </label>
          <label className="field">
            <span>공식 정보 마지막 확인일</span>
            <input
              type="date"
              value={verifiedOn}
              onChange={(e) => setVerifiedOn(e.target.value)}
            />
          </label>
          <label className="field">
            <span>확인 메모 (무엇을 봤는지)</span>
            <input
              maxLength={300}
              value={verifyMemo}
              onChange={(e) => setVerifyMemo(e.target.value)}
              placeholder="예: 티켓 페이지 다시 봄"
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          {savedFlash ? (
            <p className="progress-line" role="status">
              저장됨 (이 브라우저)
            </p>
          ) : null}
          <button type="submit" className="primary-btn">
            메모·확인일 저장
          </button>
        </form>
        {usj.verifiedOn ? (
          <p className="progress-line">
            기록된 확인일: <strong>{usj.verifiedOn}</strong>
          </p>
        ) : (
          <p className="muted">
            아직 확인일이 없습니다. 공식 페이지를 본 뒤 기록하세요.
          </p>
        )}
      </section>

      <div className="home-actions">
        <Link to={`/itinerary/${usj.visitDate}`} className="action-tile">
          <span className="action-tile__label">Day 4 일정</span>
          <span className="action-tile__sub">편집·메모</span>
        </Link>
        <Link to="/places/place-usj" className="action-tile">
          <span className="action-tile__label">USJ 장소</span>
          <span className="action-tile__sub">주소·길찾기</span>
        </Link>
      </div>
    </div>
  )
}
