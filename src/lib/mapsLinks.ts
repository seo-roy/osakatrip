import type { Place } from '../data/sampleTrip'

/** Build a query string for map apps — never invents lat/lng or travel times. */
export function placeMapQuery(place: Place): string {
  const address = place.address?.trim()
  if (address) return address
  const local = place.nameLocal?.trim()
  if (local) return local
  return place.name.replace(/\s*\(예시\)\s*/g, ' ').trim() || place.name
}

export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/** Opens directions in an external map app. Does not compute or display duration/route in-app. */
export function googleDirectionsUrl(origin: string, destination: string): string {
  const params = new URLSearchParams({
    api: '1',
    origin,
    destination,
  })
  return `https://www.google.com/maps/dir/?${params.toString()}`
}

export function appleDirectionsUrl(origin: string, destination: string): string {
  const params = new URLSearchParams({
    saddr: origin,
    daddr: destination,
  })
  return `https://maps.apple.com/?${params.toString()}`
}

export function isUsableMapQuery(query: string): boolean {
  return query.trim().length >= 2
}
