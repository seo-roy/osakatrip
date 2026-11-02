import { createUsjSeed } from '../data/usjSeed'
import { tripMeta } from '../data/sampleTrip'
import {
  CONTENT_REVISION,
  type TripDocument,
} from '../storage/tripDocument'

/** 내보내기·UI에 절대 넣지 않을 키 (확인코드·예약번호 등) — 구체 코드 문자열은 소스에 두지 않음 */
const BLOCKED_KEY_PATTERN =
  /(confirm|confirmation|reservation.?code|booking.?code|확인.?코드|예약.?번호|confirmationCode|pnr)\b/i

function scrubValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(scrubValue)
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (BLOCKED_KEY_PATTERN.test(k)) continue
      out[k] = scrubValue(v)
    }
    return out
  }
  return value
}

/** 공유용 JSON — 확인코드·민감 키 제거 */
export function buildShareExport(doc: TripDocument): string {
  const payload = {
    format: 'osakatrip-share-v1' as const,
    exportedAt: new Date().toISOString(),
    note: '예약 확인코드는 포함하지 않습니다. 항공 시각은 항공사에서 재확인하세요.',
    trip: scrubValue({
      contentRevision: doc.contentRevision,
      updatedAt: doc.updatedAt,
      days: doc.days,
      places: doc.places,
      packingItems: doc.packingItems,
      usj: doc.usj,
    }),
  }
  return `${JSON.stringify(payload, null, 2)}\n`
}

export function parseShareImport(raw: string): TripDocument | { error: string } {
  try {
    const parsed = JSON.parse(raw) as {
      format?: string
      trip?: Partial<TripDocument>
    }
    if (!parsed.trip || typeof parsed.trip !== 'object') {
      return { error: '공유 파일 형식이 올바르지 않습니다' }
    }
    const scrubbed = scrubValue(parsed.trip) as Partial<TripDocument>
    if (!Array.isArray(scrubbed.days) || !Array.isArray(scrubbed.places)) {
      return { error: '일정·장소 데이터가 없습니다' }
    }
    return {
      version: 1,
      contentRevision:
        typeof scrubbed.contentRevision === 'number'
          ? scrubbed.contentRevision
          : CONTENT_REVISION,
      updatedAt: new Date().toISOString(),
      days: scrubbed.days,
      places: scrubbed.places,
      packingItems: Array.isArray(scrubbed.packingItems)
        ? scrubbed.packingItems
        : [],
      usj:
        scrubbed.usj && typeof scrubbed.usj === 'object'
          ? scrubbed.usj
          : createUsjSeed(tripMeta.usjVisitDate),
    }
  } catch {
    return { error: 'JSON을 읽을 수 없습니다' }
  }
}
