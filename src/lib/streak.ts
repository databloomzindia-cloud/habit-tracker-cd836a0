import { addDays, todayISO } from './date'

/**
 * Current streak = number of consecutive days completed, counting backward
 * from today. If today hasn't been completed yet, we count backward from
 * yesterday instead so the streak doesn't visually reset to 0 the instant a
 * new day begins (it only resets once a full day is missed).
 */
export function currentStreak(completedDates: string[]): number {
  const done = new Set(completedDates)
  const today = todayISO()
  let anchor = done.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (done.has(anchor)) {
    streak += 1
    anchor = addDays(anchor, -1)
  }
  return streak
}

/** Longest ever run of consecutive completed days. */
export function longestStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0
  const sorted = [...completedDates].sort()
  let longest = 1
  let run = 1
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === addDays(sorted[i - 1], 1)) {
      run += 1
    } else if (sorted[i] === sorted[i - 1]) {
      // duplicate safety guard, shouldn't happen with a Set-backed store
      continue
    } else {
      run = 1
    }
    longest = Math.max(longest, run)
  }
  return longest
}

export function last14Days(completedDates: string[]): { date: string; done: boolean }[] {
  const done = new Set(completedDates)
  const today = todayISO()
  const days: { date: string; done: boolean }[] = []
  for (let i = 13; i >= 0; i--) {
    const date = addDays(today, -i)
    days.push({ date, done: done.has(date) })
  }
  return days
}
