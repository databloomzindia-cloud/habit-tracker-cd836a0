export interface Habit {
  id: string
  name: string
  emoji: string
  createdAt: string // ISO date (yyyy-mm-dd)
  /** Set of ISO date strings (yyyy-mm-dd) on which the habit was completed. */
  completedDates: string[]
}

export interface HabitWithStats extends Habit {
  currentStreak: number
  longestStreak: number
  doneToday: boolean
  last14Days: { date: string; done: boolean }[]
}
