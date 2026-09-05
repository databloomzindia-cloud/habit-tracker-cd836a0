import type { HabitWithStats } from '../types'
import { HistoryStrip } from './HistoryStrip'

interface Props {
  habit: HabitWithStats
  onToggleToday: (id: string) => void
  onRemove: (id: string) => void
}

export function HabitItem({ habit, onToggleToday, onRemove }: Props) {
  return (
    <li className="flex flex-col gap-3 rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800/70 dark:ring-white/10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleToday(habit.id)}
          aria-pressed={habit.doneToday}
          aria-label={habit.doneToday ? `Mark ${habit.name} not done today` : `Mark ${habit.name} done today`}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl transition ${
            habit.doneToday
              ? 'bg-brand-500 text-white shadow-md'
              : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-500 dark:hover:bg-slate-600'
          }`}
        >
          {habit.emoji}
        </button>
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-100">{habit.name}</p>
          <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-400">
              🔥 {habit.currentStreak} day{habit.currentStreak === 1 ? '' : 's'}
            </span>
            <span aria-hidden="true">·</span>
            <span>best {habit.longestStreak}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:pl-2">
        <HistoryStrip days={habit.last14Days} />
        <button
          type="button"
          onClick={() => onRemove(habit.id)}
          aria-label={`Delete habit ${habit.name}`}
          className="text-slate-300 transition hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400"
        >
          ✕
        </button>
      </div>
    </li>
  )
}
