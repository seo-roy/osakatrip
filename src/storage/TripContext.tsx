import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { DayItem, DayPlan, PackingItem, Place } from '../data/sampleTrip'
import type { UsjState } from '../data/usjSeed'
import {
  createSeedDocument,
  loadTripDocument,
  newId,
  saveTripDocument,
  sortDayItems,
  type TripDocument,
} from './tripDocument'

interface TripContextValue {
  ready: boolean
  doc: TripDocument
  days: DayPlan[]
  places: Place[]
  packingItems: PackingItem[]
  usj: UsjState
  getDay: (date: string) => DayPlan | undefined
  getPlace: (placeId: string) => Place | undefined
  resetToSample: () => void
  upsertDayItem: (
    date: string,
    input: {
      itemId?: string
      placeId?: string
      newPlaceName?: string
      newPlaceAddress?: string
      timeNote: string
      itemMemo: string
    },
  ) => { ok: true } | { ok: false; error: string }
  removeDayItem: (date: string, itemId: string) => void
  updateDayMemo: (date: string, dayMemo: string) => void
  updatePlace: (
    placeId: string,
    patch: Partial<Pick<Place, 'name' | 'address' | 'familyBlurb' | 'kidsNote' | 'verifyMemo'>>,
  ) => { ok: true } | { ok: false; error: string }
  togglePacking: (id: string) => void
  resetPackingSample: () => void
  toggleUsjCheck: (id: string) => void
  updateUsj: (patch: Partial<UsjState>) => void
}

const TripContext = createContext<TripContextValue | null>(null)

function touch(doc: TripDocument): TripDocument {
  return { ...doc, updatedAt: new Date().toISOString() }
}

export function TripProvider({ children }: { children: ReactNode }) {
  const [doc, setDoc] = useState<TripDocument>(() => createSeedDocument())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setDoc(loadTripDocument())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    saveTripDocument(doc)
  }, [doc, ready])

  const commit = useCallback((updater: (prev: TripDocument) => TripDocument) => {
    setDoc((prev) => touch(updater(prev)))
  }, [])

  const getDay = useCallback(
    (date: string) => doc.days.find((d) => d.date === date),
    [doc.days],
  )

  const getPlace = useCallback(
    (placeId: string) => doc.places.find((p) => p.placeId === placeId),
    [doc.places],
  )

  const resetToSample = useCallback(() => {
    setDoc(touch(createSeedDocument()))
  }, [])

  const upsertDayItem: TripContextValue['upsertDayItem'] = useCallback(
    (date, input) => {
      const timeNote = input.timeNote.trim()
      const itemMemo = input.itemMemo.trim()
      if (timeNote.length > 40) return { ok: false, error: '시간 메모는 40자 이내' }
      if (itemMemo.length > 200) return { ok: false, error: '메모는 200자 이내' }

      const newName = input.newPlaceName?.trim() ?? ''
      const newAddress = input.newPlaceAddress?.trim() ?? ''
      if (newName) {
        if (newName.length > 60) return { ok: false, error: '장소 이름은 60자 이내' }
        if (newAddress.length > 120) return { ok: false, error: '주소는 120자 이내' }
      } else if (!input.placeId) {
        return { ok: false, error: '장소를 선택하거나 새 이름을 입력하세요' }
      } else if (!doc.places.some((p) => p.placeId === input.placeId)) {
        return { ok: false, error: '선택한 장소를 찾을 수 없습니다' }
      }

      commit((prev) => {
        let placeId = input.placeId
        let places = prev.places
        if (newName) {
          placeId = newId('place')
          const place: Place = {
            placeId,
            name: newName,
            category: '기타',
            familyBlurb: '가족이 추가한 장소입니다.',
            address: newAddress || undefined,
          }
          places = [...places, place]
        }

        return {
          ...prev,
          places,
          days: prev.days.map((day) => {
            if (day.date !== date) return day
            if (input.itemId) {
              return {
                ...day,
                items: day.items.map((item) =>
                  item.id === input.itemId
                    ? {
                        ...item,
                        placeId: placeId!,
                        timeNote: timeNote || undefined,
                        itemMemo: itemMemo || undefined,
                      }
                    : item,
                ),
              }
            }
            const next: DayItem = {
              id: newId('item'),
              placeId: placeId!,
              sortOrder: day.items.length + 1,
              timeNote: timeNote || undefined,
              itemMemo: itemMemo || undefined,
            }
            return { ...day, items: sortDayItems([...day.items, next]) }
          }),
        }
      })

      return { ok: true }
    },
    [commit, doc.places],
  )

  const removeDayItem = useCallback(
    (date: string, itemId: string) => {
      commit((prev) => ({
        ...prev,
        days: prev.days.map((day) => {
          if (day.date !== date) return day
          return {
            ...day,
            items: sortDayItems(day.items.filter((i) => i.id !== itemId)),
          }
        }),
      }))
    },
    [commit],
  )

  const updateDayMemo = useCallback(
    (date: string, dayMemo: string) => {
      commit((prev) => ({
        ...prev,
        days: prev.days.map((day) =>
          day.date === date
            ? { ...day, dayMemo: dayMemo.trim() || undefined }
            : day,
        ),
      }))
    },
    [commit],
  )

  const updatePlace: TripContextValue['updatePlace'] = useCallback(
    (placeId, patch) => {
      if (patch.name !== undefined) {
        const name = patch.name.trim()
        if (!name) return { ok: false, error: '장소 이름을 입력하세요' }
        if (name.length > 60) return { ok: false, error: '장소 이름은 60자 이내' }
      }
      if (patch.address !== undefined && patch.address.trim().length > 120) {
        return { ok: false, error: '주소는 120자 이내' }
      }
      if (patch.familyBlurb !== undefined && patch.familyBlurb.trim().length > 200) {
        return { ok: false, error: '설명은 200자 이내' }
      }

      commit((prev) => ({
        ...prev,
        places: prev.places.map((p) => {
          if (p.placeId !== placeId) return p
          return {
            ...p,
            ...(patch.name !== undefined ? { name: patch.name.trim() } : {}),
            ...(patch.address !== undefined
              ? { address: patch.address.trim() || undefined }
              : {}),
            ...(patch.familyBlurb !== undefined
              ? { familyBlurb: patch.familyBlurb.trim() }
              : {}),
            ...(patch.kidsNote !== undefined
              ? { kidsNote: patch.kidsNote.trim() || undefined }
              : {}),
            ...(patch.verifyMemo !== undefined
              ? { verifyMemo: patch.verifyMemo.trim() || undefined }
              : {}),
          }
        }),
      }))
      return { ok: true }
    },
    [commit],
  )

  const togglePacking = useCallback(
    (id: string) => {
      commit((prev) => ({
        ...prev,
        packingItems: prev.packingItems.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item,
        ),
      }))
    },
    [commit],
  )

  const resetPackingSample = useCallback(() => {
    const seed = createSeedDocument()
    commit((prev) => ({ ...prev, packingItems: seed.packingItems }))
  }, [commit])

  const toggleUsjCheck = useCallback(
    (id: string) => {
      commit((prev) => ({
        ...prev,
        usj: {
          ...prev.usj,
          checklist: prev.usj.checklist.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item,
          ),
        },
      }))
    },
    [commit],
  )

  const updateUsj = useCallback(
    (patch: Partial<UsjState>) => {
      commit((prev) => ({
        ...prev,
        usj: { ...prev.usj, ...patch },
      }))
    },
    [commit],
  )

  const value = useMemo<TripContextValue>(
    () => ({
      ready,
      doc,
      days: doc.days,
      places: doc.places,
      packingItems: doc.packingItems,
      usj: doc.usj,
      getDay,
      getPlace,
      resetToSample,
      upsertDayItem,
      removeDayItem,
      updateDayMemo,
      updatePlace,
      togglePacking,
      resetPackingSample,
      toggleUsjCheck,
      updateUsj,
    }),
    [
      ready,
      doc,
      getDay,
      getPlace,
      resetToSample,
      upsertDayItem,
      removeDayItem,
      updateDayMemo,
      updatePlace,
      togglePacking,
      resetPackingSample,
      toggleUsjCheck,
      updateUsj,
    ],
  )

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

export function useTrip(): TripContextValue {
  const ctx = useContext(TripContext)
  if (!ctx) throw new Error('useTrip must be used within TripProvider')
  return ctx
}
