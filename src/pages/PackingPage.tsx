import { useEffect, useState } from 'react'
import { SampleBanner } from '../components/SampleBanner'
import {
  packingCategories,
  packingItemsSeed,
  type PackingItem,
} from '../data/sampleTrip'

const STORAGE_KEY = 'osakatrip-packing-v1'

function loadItems(): PackingItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return packingItemsSeed
    const parsed = JSON.parse(raw) as PackingItem[]
    if (!Array.isArray(parsed) || parsed.length === 0) return packingItemsSeed
    return parsed
  } catch {
    return packingItemsSeed
  }
}

export function PackingPage() {
  const [items, setItems] = useState<PackingItem[]>(packingItemsSeed)

  useEffect(() => {
    setItems(loadItems())
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const checked = items.filter((i) => i.done).length
  const total = items.length

  function toggle(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    )
  }

  function resetSample() {
    setItems(packingItemsSeed.map((i) => ({ ...i })))
  }

  return (
    <div className="page packing-page">
      <SampleBanner />

      <header className="page-header">
        <h1>준비물 체크리스트</h1>
        <p className="page-header__sub">
          예시 목록 · 체크는 이 브라우저에만 저장 (동기화 later)
        </p>
        <p className="progress-line" aria-live="polite">
          진행 <strong>{checked}</strong> / {total}
        </p>
      </header>

      {packingCategories.map((cat) => {
        const catItems = items.filter((i) => i.categoryId === cat.id)
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
                      onChange={() => toggle(item.id)}
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

      <button type="button" className="ghost-btn" onClick={resetSample}>
        예시 목록으로 초기화
      </button>
    </div>
  )
}
