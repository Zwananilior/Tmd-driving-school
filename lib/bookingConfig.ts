export interface BookingPackage {
  id: string
  name: string
  description: string | null
  lesson_count: number
  price: number
}


export const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
]

export function formatSlot(slot: string): string {
  const hour = Number(slot.split(':')[0])
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return hour12 + ':00 ' + period
}


export function tomorrowSA(): string {
  return new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-CA', {
    timeZone: 'Africa/Johannesburg',
  })
}

export function isValidDateString(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  const d = new Date(date + 'T00:00:00Z')
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === date
}

export function isSunday(date: string): boolean {
  return new Date(date + 'T00:00:00Z').getUTCDay() === 0
}