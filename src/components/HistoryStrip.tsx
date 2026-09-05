import { formatShort } from '../lib/date'

interface Props {
  days: { date: string; done: boolean }[]
}

export function HistoryStrip({ days }: Props) {
  return (
    <div className="flex gap-1">
      {days.map((d) => (
        <div key={d.date} className="flex flex-col items-center gap-1" title={d.date}>
          <span
            className={`h-4 w-4 rounded-sm ${
              d.done ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
          <span className="hidden text-[9px] text-slate-400 sm:block">
            {formatShort(d.date).slice(0, 1)}
          </span>
        </div>
      ))}
    </div>
  )
}
