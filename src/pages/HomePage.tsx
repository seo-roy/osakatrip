import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SampleBanner } from '../components/SampleBanner'
import { formatShortDate, tripMeta } from '../data/sampleTrip'
import {
  flights,
  lodging,
  partyDisplayLine,
} from '../data/travelBookings'
import { buildShareExport, parseShareImport } from '../lib/shareExport'
import { useTrip } from '../storage/TripContext'

export function HomePage() {
  const { days, packingItems, doc, resetToSample, replaceDocument } = useTrip()
  const checked = packingItems.filter((i) => i.done).length
  const total = packingItems.length
  const fileRef = useRef<HTMLInputElement>(null)
  const [shareMsg, setShareMsg] = useState<string | null>(null)

  function exportJson() {
    const text = buildShareExport(doc)
    const blob = new Blob([text], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `osakatrip-share-${tripMeta.startDate}.json`
    a.click()
    URL.revokeObjectURL(url)
    setShareMsg('보내기 완료 (확인코드 필드 제외)')
  }

  async function onImportFile(file: File | undefined) {
    if (!file) return
    const raw = await file.text()
    const result = parseShareImport(raw)
    if ('error' in result) {
      setShareMsg(result.error)
      return
    }
    if (!confirm('이 기기의 일정을 가져온 내용으로 덮어쓸까요?')) return
    replaceDocument(result)
    setShareMsg('가져오기 완료')
  }

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
        <p className="home-hero__party">{partyDisplayLine}</p>
        <p className="home-hero__memo">{tripMeta.homeMemo}</p>
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
          {lodging.propertyType} · 침대 {lodging.beds} · 게스트 {lodging.guests}{' '}
          · 호스트 {lodging.hostName}
        </p>
        <p className="verify-note">{lodging.refundPolicyNote}</p>
        <p className="fine-print">예약 확인코드는 앱·공유 파일에 표시하지 않습니다.</p>
        <div className="place-card__links">
          <Link to="/places/place-hotel">숙소 상세·지도</Link>
        </div>
      </section>

      <section className="panel" aria-labelledby="flights-heading">
        <h2 id="flights-heading">항공</h2>
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
              <p className="muted">
                {leg.fromName} → {leg.toName}
              </p>
            </li>
          ))}
        </ul>
        <p className="fine-print">
          표시 시각은 가족 예약 메모입니다. 게이트·지연은 항공사·공항에서
          확인하세요.
        </p>
      </section>

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
                    장소 {day.items.length}곳
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
            진행 {checked}/{total}
          </span>
        </Link>
      </section>

      <section className="panel" aria-labelledby="share-heading">
        <h2 id="share-heading">가끔 맞추기 (보내기/가져오기)</h2>
        <p className="muted">
          동시에 여러 폰이 고치지 않아도 됩니다. 일정 편집은 성인 1명 기준.
          자동 동기화·DB 없음.
        </p>
        <div className="btn-row">
          <button type="button" className="primary-btn" onClick={exportJson}>
            JSON 보내기
          </button>
          <button
            type="button"
            className="ghost-btn ghost-btn--inline"
            onClick={() => fileRef.current?.click()}
          >
            JSON 가져오기
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              void onImportFile(e.target.files?.[0])
              e.target.value = ''
            }}
          />
        </div>
        {shareMsg ? (
          <p className="progress-line" role="status">
            {shareMsg}
          </p>
        ) : null}
      </section>

      <p className="fine-print">
        접근: 단순 공개 배포 URL OK · near-private 관행(`noindex`). 로그인·PIN은
        later. 이 브라우저 localStorage에 저장.
      </p>

      <button type="button" className="ghost-btn" onClick={resetToSample}>
        시드 데이터로 초기화
      </button>
    </div>
  )
}
