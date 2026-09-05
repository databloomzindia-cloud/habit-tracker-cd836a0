import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Habit, HabitWithStats } from '../types'
import { todayISO } from '../lib/date'
import { currentStreak, last14Days, longestStreak } from '../lib/streak'

const STORAGE_KEY = 'habit-tracker:v1'

const DEFAULT_HABITS: Habit[] = []

function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_HABITS
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return DEFAULT_HABITS
    return parsed
  } catch {
    return DEFAULT_HABITS
  }
}

function saveHabits(habits: Habit[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  } catch {
    // localStorage may be unavailable (e.g. private mode) - fail silently.
  }
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits())

  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  const addHabit = useCallback((name: string, emoji: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    const newHabit: Habit = {
      id: makeId(),
      name: trimmed,
      emoji: emoji || '✅',
      createdAt: todayISO(),
      completedDates: [],
    }
    setHabits((prev) => [...prev, newHabit])
  }, [])

  const removeHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id))
  }, [])

  const toggleToday = useCallback((id: string) => {
    const today = todayISO()
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h
        const has = h.completedDates.includes(today)
        return {
          ...h,
          completedDates: has
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        }
      }),
    )
  }, [])

  const habitsWithStats: HabitWithStats[] = useMemo(() => {
    const today = todayISO()
    return habits.map((h) => ({
      ...h,
      currentStreak: currentStreak(h.completedDates),
      longestStreak: longestStreak(h.completedDates),
      doneToday: h.completedDates.includes(today),
      last14Days: last14Days(h.completedDates),
    }))
  }, [habits])

  const stats = useMemo(() => {
    const total = habitsWithStats.length
    const doneToday = habitsWithStats.filter((h) => h.doneToday).length
    const longest = habitsWithStats.reduce((max, h) => Math.max(max, h.longestStreak), 0)
    const completionPct = total === 0 ? 0 : Math.round((doneToday / total) * 100)
    return { total, doneToday, longest, completionPct }
  }, [habitsWithStats])

  return { habits: habitsWithStats, stats, addHabit, removeHabit, toggleToday }
}
