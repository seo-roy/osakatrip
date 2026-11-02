import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { tripMeta } from '../data/sampleTrip'
import { buildShareExport, parseShareImport } from '../lib/shareExport'
import { useAdultMode } from '../storage/AdultModeContext'
import { useTrip } from '../storage/TripContext'

export function SettingsPage() {
  const { adultMode, setAdultMode } = useAdultMode()
  const { doc, resetToSample, replaceDocument } = useTrip()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<string | null>(null)

  function exportJson() {
    const text = buildShareExport(doc)
    const blob = new Blob([text], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `osakatrip-share-${tripMeta.startDate}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMsg('파일을 저장했어요')
  }

  async function onImportFile(file: File | undefined) {
    if (!file) return
    const raw = await file.text()
    const result = parseShareImport(raw)
    if ('error' in result) {
      setMsg(result.error)
      return
    }
    if (!confirm('지금 폰의 일정을 가져온 내용으로 바꿀까요?')) return
    replaceDocument(result)
    setMsg('가져왔어요')
  }

  return (
    <div className="page settings-page">
      <header className="page-header">
        <h1>설정</h1>
        <p className="page-header__sub">어른용 · 아이들은 홈·일정을 보면 돼요</p>
      </header>

      <section className="panel">
        <h2>편집 모드</h2>
        <label className="check-row">
          <input
            type="checkbox"
            checked={adultMode}
            onChange={(e) => setAdultMode(e.target.checked)}
          />
          <span>
            <span className="check-row__label">일정·장소 편집 켜기</span>
            <span className="check-row__meta">
              꺼두면 가족이 보기만 해요 (준비물 체크는 그대로)
            </span>
          </span>
        </label>
      </section>

      <section className="panel">
        <h2>다른 폰과 맞추기</h2>
        <p className="muted">필요할 때만 쓰세요. 평소에는 안 써도 돼요.</p>
        <div className="btn-row">
          <button type="button" className="primary-btn" onClick={exportJson}>
            일정 파일 저장
          </button>
          <button
            type="button"
            className="ghost-btn ghost-btn--inline"
            onClick={() => fileRef.current?.click()}
          >
            일정 파일 열기
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
        {msg ? (
          <p className="progress-line" role="status">
            {msg}
          </p>
        ) : null}
      </section>

      <section className="panel">
        <h2>초기화</h2>
        <button
          type="button"
          className="ghost-btn"
          onClick={() => {
            if (confirm('처음 일정으로 되돌릴까요?')) resetToSample()
          }}
        >
          처음 일정으로 되돌리기
        </button>
        <p className="fine-print" style={{ marginTop: 10 }}>
          아직 확정 전인 놀거리 후보는 설정에서만 안내합니다. 예약 확인번호는
          앱에 넣지 않아요.
        </p>
      </section>

      <Link to="/" className="text-link back-link">
        ← 홈으로
      </Link>
    </div>
  )
}
