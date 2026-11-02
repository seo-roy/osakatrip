import { useMemo, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SampleBanner } from '../components/SampleBanner'
import {
  formatKoreanDate,
  formatShortDate,
  tripMeta,
  type DayItem,
} from '../data/sampleTrip'
import { useTrip } from '../storage/TripContext'

type Draft = {
  itemId?: string
  mode: 'existing' | 'new'
  placeId: string
  newPlaceName: string
  newPlaceAddress: string
  timeNote: string
  itemMemo: string
}

const emptyDraft = (): Draft => ({
  mode: 'existing',
  placeId: '',
  newPlaceName: '',
  newPlaceAddress: '',
  timeNote: '',
  itemMemo: '',
})

export function ItineraryPage() {
  const { date } = useParams()
  const {
    days,
    places,
    getDay,
    getPlace,
    upsertDayItem,
    removeDayItem,
    updateDayMemo,
  } = useTrip()

  const activeDate = (date && getDay(date)?.date) || days[0]?.date
  const day = getDay(activeDate) ?? days[0]

  const [draft, setDraft] = useState<Draft | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dayMemoDraft, setDayMemoDraft] = useState<string | null>(null)

  const items = useMemo(
    () =>
      day
        ? day.items.slice().sort((a, b) => a.sortOrder - b.sortOrder)
        : [],
    [day],
  )

  if (!day) {
    return (
      <div className="page">
        <SampleBanner />
        <p className="empty-state">일정이 없습니다.</p>
      </div>
    )
  }

  function openAdd() {
    setError(null)
    setDraft({
      ...emptyDraft(),
      placeId: places[0]?.placeId ?? '',
      mode: places.length ? 'existing' : 'new',
    })
  }

  function openEdit(item: DayItem) {
    setError(null)
    setDraft({
      itemId: item.id,
      mode: 'existing',
      placeId: item.placeId,
      newPlaceName: '',
      newPlaceAddress: '',
      timeNote: item.timeNote ?? '',
      itemMemo: item.itemMemo ?? '',
    })
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!draft) return
    const result = upsertDayItem(day.date, {
      itemId: draft.itemId,
      placeId: draft.mode === 'existing' ? draft.placeId : undefined,
      newPlaceName: draft.mode === 'new' ? draft.newPlaceName : undefined,
      newPlaceAddress: draft.mode === 'new' ? draft.newPlaceAddress : undefined,
      timeNote: draft.timeNote,
      itemMemo: draft.itemMemo,
    })
    if (!result.ok) {
      setError(result.error)
      return
    }
    setDraft(null)
    setError(null)
  }

  const editingDayMemo = dayMemoDraft !== null

  return (
    <div className="page itinerary-page">
      <SampleBanner />

      <header className="page-header">
        <h1>날짜별 일정</h1>
        <p className="page-header__sub">
          {tripMeta.startDate.replaceAll('-', '.')} –{' '}
          {tripMeta.endDate.replaceAll('-', '.')} · 편집은 이 기기에 저장
        </p>
      </header>

      <div className="day-tabs" role="tablist" aria-label="여행 일차">
        {days.map((d) => (
          <Link
            key={d.date}
            to={`/itinerary/${d.date}`}
            role="tab"
            aria-selected={d.date === day.date}
            className={d.date === day.date ? 'day-tab is-active' : 'day-tab'}
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

        {editingDayMemo ? (
          <div className="field-stack">
            <label className="field">
              <span>하루 메모</span>
              <textarea
                rows={2}
                value={dayMemoDraft}
                maxLength={200}
                onChange={(e) => setDayMemoDraft(e.target.value)}
              />
            </label>
            <div className="btn-row">
              <button
                type="button"
                className="primary-btn"
                onClick={() => {
                  updateDayMemo(day.date, dayMemoDraft)
                  setDayMemoDraft(null)
                }}
              >
                저장
              </button>
              <button
                type="button"
                className="ghost-btn ghost-btn--inline"
                onClick={() => setDayMemoDraft(null)}
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <>
            {day.dayMemo ? <p className="day-memo">{day.dayMemo}</p> : (
              <p className="muted">하루 메모 없음</p>
            )}
            <button
              type="button"
              className="text-btn"
              onClick={() => setDayMemoDraft(day.dayMemo ?? '')}
            >
              하루 메모 편집
            </button>
          </>
        )}

        {items.length === 0 ? (
          <div className="empty-state">
            <p>이 날 등록된 장소가 없습니다.</p>
            <p className="muted">아래「장소 추가」로 예시·가족 일정을 채워 보세요.</p>
          </div>
        ) : (
          <ul className="place-list">
            {items.map((item, index) => {
              const place = getPlace(item.placeId)
              const prev = index > 0 ? getPlace(items[index - 1].placeId) : null
              if (!place) {
                return (
                  <li key={item.id} className="place-card">
                    <p className="form-error">알 수 없는 장소</p>
                    <button
                      type="button"
                      className="text-btn danger"
                      onClick={() => removeDayItem(day.date, item.id)}
                    >
                      삭제
                    </button>
                  </li>
                )
              }
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
                      ) : (
                        <p className="place-card__time muted">시간 메모 없음</p>
                      )}
                      {item.itemMemo ? (
                        <p className="place-card__memo">{item.itemMemo}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="place-card__links">
                    <Link to={`/places/${place.placeId}`}>장소·지도</Link>
                    {prev ? (
                      <Link
                        to={`/places/${place.placeId}?from=${prev.placeId}`}
                      >
                        이전→여기 길찾기
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => openEdit(item)}
                    >
                      편집
                    </button>
                    <button
                      type="button"
                      className="text-btn danger"
                      onClick={() => {
                        if (confirm(`「${place.name}」을(를) 이 날에서 삭제할까요?`)) {
                          removeDayItem(day.date, item.id)
                        }
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        <button type="button" className="secondary-cta" onClick={openAdd}>
          장소 추가
        </button>
      </section>

      {draft ? (
        <div className="sheet" role="dialog" aria-labelledby="item-editor-title">
          <form className="sheet__panel" onSubmit={onSubmit}>
            <h2 id="item-editor-title">
              {draft.itemId ? '일정 항목 편집' : '장소 추가'}
            </h2>
            <p className="fine-print">
              시간 메모는 가족 약속용 텍스트입니다. 공식 영업시간이 아닙니다.
            </p>

            {!draft.itemId || draft.mode === 'new' ? (
              <fieldset className="field">
                <legend>장소 선택</legend>
                <div className="segmented">
                  <label>
                    <input
                      type="radio"
                      name="place-mode"
                      checked={draft.mode === 'existing'}
                      disabled={places.length === 0}
                      onChange={() =>
                        setDraft((d) =>
                          d
                            ? {
                                ...d,
                                mode: 'existing',
                                placeId: d.placeId || places[0]?.placeId || '',
                              }
                            : d,
                        )
                      }
                    />
                    기존 장소
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="place-mode"
                      checked={draft.mode === 'new'}
                      onChange={() =>
                        setDraft((d) => (d ? { ...d, mode: 'new' } : d))
                      }
                    />
                    새 장소
                  </label>
                </div>
              </fieldset>
            ) : null}

            {draft.mode === 'existing' ? (
              <label className="field">
                <span>장소</span>
                <select
                  value={draft.placeId}
                  onChange={(e) =>
                    setDraft((d) => (d ? { ...d, placeId: e.target.value } : d))
                  }
                  required
                >
                  <option value="" disabled>
                    선택
                  </option>
                  {places.map((p) => (
                    <option key={p.placeId} value={p.placeId}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <>
                <label className="field">
                  <span>새 장소 이름 *</span>
                  <input
                    value={draft.newPlaceName}
                    maxLength={60}
                    onChange={(e) =>
                      setDraft((d) =>
                        d ? { ...d, newPlaceName: e.target.value } : d,
                      )
                    }
                    placeholder="예: ○○ 라멘"
                    required
                  />
                </label>
                <label className="field">
                  <span>주소 (선택 · 지도용)</span>
                  <input
                    value={draft.newPlaceAddress}
                    maxLength={120}
                    onChange={(e) =>
                      setDraft((d) =>
                        d ? { ...d, newPlaceAddress: e.target.value } : d,
                      )
                    }
                    placeholder="모르면 비워 두고 나중에 보완"
                  />
                </label>
              </>
            )}

            <label className="field">
              <span>시간 메모 (예: 오전, 14시쯤)</span>
              <input
                value={draft.timeNote}
                maxLength={40}
                onChange={(e) =>
                  setDraft((d) => (d ? { ...d, timeNote: e.target.value } : d))
                }
                placeholder="확정 시각 아님"
              />
            </label>

            <label className="field">
              <span>가족 메모</span>
              <textarea
                rows={3}
                value={draft.itemMemo}
                maxLength={200}
                onChange={(e) =>
                  setDraft((d) => (d ? { ...d, itemMemo: e.target.value } : d))
                }
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
                onClick={() => {
                  setDraft(null)
                  setError(null)
                }}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}
