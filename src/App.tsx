import { useHabits } from './hooks/useHabits'
import { AddHabitForm } from './components/AddHabitForm'
import { HabitList } from './components/HabitList'
import { StatsBar } from './components/StatsBar'

function App() {
  const { habits, stats, addHabit, removeHabit, toggleToday } = useHabits()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10 sm:py-14">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            🔥 Habit Tracker
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Build daily habits and keep your streak alive.
          </p>
        </header>

        <StatsBar
          total={stats.total}
          doneToday={stats.doneToday}
          longest={stats.longest}
          completionPct={stats.completionPct}
        />

        <AddHabitForm onAdd={addHabit} />

        <HabitList habits={habits} onToggleToday={toggleToday} onRemove={removeHabit} />

        <footer className="pt-4 text-center text-xs text-slate-400">
          Data is stored only in this browser (localStorage).
        </footer>
      </div>
    </div>
  )
}

export default App
