import type { HabitWithStats } from '../types'
import { HabitItem } from './HabitItem'

interface Props {
  habits: HabitWithStats[]
  onToggleToday: (id: string) => void
  onRemove: (id: string) => void
}

export function HabitList({ habits, onToggleToday, onRemove }: Props) {
  if (habits.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-400 dark:border-slate-700">
        <p className="text-3xl">🌱</p>
        <p className="mt-2 text-sm">No habits yet. Add your first one above to start a streak!</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {habits.map((h) => (
        <HabitItem key={h.id} habit={h} onToggleToday={onToggleToday} onRemove={onRemove} />
      ))}
    </ul>
  )
}
