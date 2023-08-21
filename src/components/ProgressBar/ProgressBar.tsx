import cn from 'classnames'
import { useAppSelector } from '../../hooks/hooks'

interface ProgressBar {
  week: { firstDay: string; lastDay: string }
  budget?: number
}

export default function ProgressBar({ week, budget = 250 }: ProgressBar) {
  const total = useAppSelector((state) => state.app.weeklyTotal)
  const percentage = (total / budget) * 100
  const remaining = budget - total

  return (
    <>
      <div className="text-center mb-2.5">
        <h1>Progress for</h1>
        <h1>
          <span className="text-sky-500">{week['firstDay']}</span> to{' '}
          <span className="text-sky-500">{week['lastDay']}</span>
        </h1>
      </div>
      <div className="flex justify-between">
        <p>
          Remaining: $<span>{remaining.toLocaleString()}</span>
        </p>
        <p>
          Total: $<span>{total.toLocaleString()}</span>
        </p>
      </div>
      <div className="w-full h-6 border rounded-xl overflow-hidden">
        <div
          className={cn(
            'h-full',
            total <= budget ? 'bg-sky-500' : 'bg-red-500',
          )}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        <p>$0</p>
        <p>${budget.toLocaleString()}</p>
      </div>
    </>
  )
}
