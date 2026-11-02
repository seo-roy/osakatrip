import {
  days as seedDays,
  packingItemsSeed,
  places as seedPlaces,
  type DayItem,
  type DayPlan,
  type PackingItem,
  type Place,
  type PlaceCategory,
  tripMeta,
} from '../data/sampleTrip'
import { createUsjSeed, type UsjState } from '../data/usjSeed'

export const TRIP_STORAGE_KEY = 'osakatrip-trip-v1'
export const LEGACY_PACKING_KEY = 'osakatrip-packing-v1'
export const CONTENT_REVISION = tripMeta.contentRevision

export interface TripDocument {
  version: 1
  contentRevision: number
  updatedAt: string
  days: DayPlan[]
  places: Place[]
  packingItems: PackingItem[]
  usj: UsjState
}

function seedPlacesNormalized(): Place[] {
  return structuredClone(seedPlaces).map((p) =>
    p.placeId === 'place-usj'
      ? { ...p, officialUrl: 'https://www.usj.co.jp/web/ko/usj' }
      : p,
  )
}

export function createSeedDocument(): TripDocument {
  return {
    version: 1,
    contentRevision: CONTENT_REVISION,
    updatedAt: tripMeta.updatedAt,
    days: structuredClone(seedDays),
    places: seedPlacesNormalized(),
    packingItems: structuredClone(packingItemsSeed),
    usj: createUsjSeed(tripMeta.usjVisitDate),
  }
}

function isDayPlan(value: unknown): value is DayPlan {
  if (!value || typeof value !== 'object') return false
  const d = value as DayPlan
  return (
    typeof d.date === 'string' &&
    typeof d.dayIndex === 'number' &&
    Array.isArray(d.items)
  )
}

function migrateLegacyPacking(): PackingItem[] | null {
  try {
    const raw = localStorage.getItem(LEGACY_PACKING_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PackingItem[]
    if (!Array.isArray(parsed) || parsed.length === 0) return null
    return parsed
  } catch {
    return null
  }
}

/** Refresh known seed places (kid-friendly copy) while keeping user-added places. */
function mergeSeedPlaces(places: Place[]): Place[] {
  const seed = seedPlacesNormalized()
  const byId = new Map(places.map((p) => [p.placeId, p]))
  for (const sp of seed) {
    const existing = byId.get(sp.placeId)
    byId.set(sp.placeId, existing ? { ...existing, ...sp } : sp)
  }
  return [...byId.values()]
}

function mergePackingLabels(items: PackingItem[]): PackingItem[] {
  const seed = structuredClone(packingItemsSeed)
  const doneById = new Map(items.map((i) => [i.id, i.done]))
  const known = new Set(seed.map((i) => i.id))
  const refreshed = seed.map((s) => ({
    ...s,
    done: doneById.has(s.id) ? Boolean(doneById.get(s.id)) : s.done,
  }))
  const extras = items.filter((i) => !known.has(i.id))
  return [...refreshed, ...extras]
}

function applyContentRevision(doc: TripDocument): TripDocument {
  if (doc.contentRevision >= CONTENT_REVISION) {
    return {
      ...doc,
      places: mergeSeedPlaces(doc.places),
    }
  }
  const seed = createSeedDocument()
  return {
    ...doc,
    contentRevision: CONTENT_REVISION,
    places: mergeSeedPlaces(doc.places),
    packingItems: mergePackingLabels(doc.packingItems),
    days: structuredClone(seed.days),
    usj: {
      ...seed.usj,
      checklist: seed.usj.checklist.map((s) => {
        const prev = doc.usj.checklist.find((c) => c.id === s.id)
        return prev ? { ...s, done: prev.done } : s
      }),
      meetingPointMemo: doc.usj.meetingPointMemo || seed.usj.meetingPointMemo,
      kidsPlanMemo: doc.usj.kidsPlanMemo || seed.usj.kidsPlanMemo,
      ticketMemo: doc.usj.ticketMemo || seed.usj.ticketMemo,
      dayOfMemo: doc.usj.dayOfMemo,
      verifiedOn: doc.usj.verifiedOn,
      verifyMemo: doc.usj.verifyMemo,
    },
    updatedAt: new Date().toISOString(),
  }
}

export function loadTripDocument(): TripDocument {
  const seed = createSeedDocument()
  try {
    const raw = localStorage.getItem(TRIP_STORAGE_KEY)
    if (!raw) {
      const legacy = migrateLegacyPacking()
      if (legacy) {
        seed.packingItems = legacy
        seed.updatedAt = new Date().toISOString()
      }
      return seed
    }
    const parsed = JSON.parse(raw) as Partial<TripDocument>
    if (parsed.version !== 1) return seed

    const loaded: TripDocument = {
      version: 1,
      contentRevision:
        typeof parsed.contentRevision === 'number' ? parsed.contentRevision : 1,
      updatedAt:
        typeof parsed.updatedAt === 'string' ? parsed.updatedAt : seed.updatedAt,
      days:
        Array.isArray(parsed.days) && parsed.days.every(isDayPlan)
          ? parsed.days
          : seed.days,
      places:
        Array.isArray(parsed.places) && parsed.places.length > 0
          ? (parsed.places as Place[])
          : seed.places,
      packingItems:
        Array.isArray(parsed.packingItems) && parsed.packingItems.length > 0
          ? (parsed.packingItems as PackingItem[])
          : seed.packingItems,
      usj:
        parsed.usj && typeof parsed.usj === 'object'
          ? { ...seed.usj, ...(parsed.usj as UsjState) }
          : seed.usj,
    }
    return applyContentRevision(loaded)
  } catch {
    return seed
  }
}

export function saveTripDocument(doc: TripDocument): void {
  localStorage.setItem(TRIP_STORAGE_KEY, JSON.stringify(doc))
}

export function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`
}

export const PLACE_CATEGORIES: PlaceCategory[] = [
  '관광',
  '식사',
  '숙소',
  '이동거점',
  '기타',
]

export const TIME_NOTE_MAX = 40
export const MEMO_MAX = 200
export const PLACE_NAME_MAX = 60
export const ADDRESS_MAX = 120

export function validateTimeNote(value: string): string | null {
  const v = value.trim()
  if (v.length > TIME_NOTE_MAX) return `시간 메모는 ${TIME_NOTE_MAX}자 이내`
  return null
}

export function validateMemo(value: string, label = '메모'): string | null {
  if (value.trim().length > MEMO_MAX) return `${label}는 ${MEMO_MAX}자 이내`
  return null
}

export function validatePlaceName(value: string): string | null {
  const v = value.trim()
  if (!v) return '장소 이름을 입력하세요'
  if (v.length > PLACE_NAME_MAX) return `장소 이름은 ${PLACE_NAME_MAX}자 이내`
  return null
}

export function validateAddress(value: string): string | null {
  if (value.trim().length > ADDRESS_MAX) return `주소는 ${ADDRESS_MAX}자 이내`
  return null
}

export function sortDayItems(items: DayItem[]): DayItem[] {
  return items
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item, index) => ({ ...item, sortOrder: index + 1 }))
}
