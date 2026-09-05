interface Props {
  total: number
  doneToday: number
  longest: number
  completionPct: number
}

export function StatsBar({ total, doneToday, longest, completionPct }: Props) {
  const cards = [
    { label: 'Habits', value: total },
    { label: 'Done today', value: `${doneToday}/${total}` },
    { label: 'Longest streak', value: `${longest}🔥` },
    { label: "Today's completion", value: `${completionPct}%` },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl bg-white/70 p-4 text-center shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800/70 dark:ring-white/10"
        >
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{c.value}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{c.label}</p>
        </div>
      ))}
    </div>
  )
}
