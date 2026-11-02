import { SampleBanner } from '../components/SampleBanner'
import { packingCategories } from '../data/sampleTrip'
import { useTrip } from '../storage/TripContext'

export function PackingPage() {
  const { packingItems, togglePacking, resetPackingSample } = useTrip()
  const checked = packingItems.filter((i) => i.done).length
  const total = packingItems.length

  return (
    <div className="page packing-page">
      <SampleBanner />

      <header className="page-header">
        <h1>준비물 체크리스트</h1>
        <p className="page-header__sub">
          예시 목록 · 체크는 이 브라우저 trip 저장소에 보관 (동기화 later)
        </p>
        <p className="progress-line" aria-live="polite">
          진행 <strong>{checked}</strong> / {total}
        </p>
      </header>

      {packingCategories.map((cat) => {
        const catItems = packingItems.filter((i) => i.categoryId === cat.id)
        if (catItems.length === 0) return null
        return (
          <section
            key={cat.id}
            className="panel packing-section"
            aria-labelledby={`pack-${cat.id}`}
          >
            <h2 id={`pack-${cat.id}`}>{cat.name}</h2>
            <ul className="check-list">
              {catItems.map((item) => (
                <li key={item.id}>
                  <label className="check-row">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => togglePacking(item.id)}
                    />
                    <span>
                      <span className="check-row__label">{item.label}</span>
                      {item.assigneeNote || item.kidsRelevant ? (
                        <span className="check-row__meta">
                          {[
                            item.assigneeNote,
                            item.kidsRelevant ? '아이 관련' : null,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      ) : null}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      <button type="button" className="ghost-btn" onClick={resetPackingSample}>
        예시 준비물로 초기화
      </button>
    </div>
  )
}
