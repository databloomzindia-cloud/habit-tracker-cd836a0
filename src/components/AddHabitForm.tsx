import { useState } from 'react'

const EMOJI_CHOICES = ['✅', '💧', '📚', '🏃', '🧘', '🥗', '😴', '✍️', '🎯', '🧹']

interface Props {
  onAdd: (name: string, emoji: string) => void
}

export function AddHabitForm({ onAdd }: Props) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState(EMOJI_CHOICES[0])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name, emoji)
    setName('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl bg-white/70 dark:bg-slate-800/70 p-4 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 sm:flex-row sm:items-center"
    >
      <div className="flex flex-wrap gap-1.5">
        {EMOJI_CHOICES.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setEmoji(e)}
            aria-label={`Choose emoji ${e}`}
            aria-pressed={emoji === e}
            className={`h-9 w-9 rounded-lg text-lg leading-none transition ${
              emoji === e
                ? 'bg-brand-500 shadow ring-2 ring-brand-600'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600'
            }`}
          >
            {e}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add a new habit (e.g. Drink water)"
        maxLength={60}
        className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Add habit
      </button>
    </form>
  )
}
