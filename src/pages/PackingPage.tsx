import { packingCategories } from '../data/sampleTrip'
import { useAdultMode } from '../storage/AdultModeContext'
import { useTrip } from '../storage/TripContext'

export function PackingPage() {
  const { adultMode } = useAdultMode()
  const { packingItems, togglePacking, resetPackingSample } = useTrip()
  const checked = packingItems.filter((i) => i.done).length
  const total = packingItems.length

  return (
    <div className="page packing-page">
      <header className="page-header">
        <h1>준비물</h1>
        <p className="page-header__sub">챙기면 체크해요</p>
        <p className="progress-line" aria-live="polite">
          <strong>{checked}</strong> / {total}
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
                            item.kidsRelevant ? '아이' : null,
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

      {adultMode ? (
        <button type="button" className="ghost-btn" onClick={resetPackingSample}>
          준비물 목록 되돌리기
        </button>
      ) : null}
    </div>
  )
}
