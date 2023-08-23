import { useState, useEffect, ChangeEvent } from 'react'
import cn from 'classnames'
import { toast } from 'react-hot-toast'
import { FaRegEdit, FaRegSave } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { post } from '../../utilities/requests'
import { updateWeeklyBudget } from '../../appSlice'
import { WeeklyBudgetResponse } from '../../types/types'

interface ProgressBar {
  week: { firstDay: string; lastDay: string }
}

function BudgetInput({ ...props }) {
  return (
    <input
      className="w-28 bg-stone-950 rounded-lg border border-stone-400 focus:border-stone-200 focus:outline-none focus:ring-0 pl-2"
      {...props}
    />
  )
}

export default function ProgressBar({ week }: ProgressBar) {
  const dispatch = useAppDispatch()
  const total = useAppSelector((state) => state.app.weeklyTotal)
  const weeklyBudget = useAppSelector((state) => state.app.weeklyBudget)
  const percentage = (total / weeklyBudget.amount) * 100
  const remaining = weeklyBudget.amount - total

  const [newBudget, setNewBudget] = useState(0)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setNewBudget(weeklyBudget.amount)
  }, [weeklyBudget.amount])

  const handleResponse = (response: WeeklyBudgetResponse) => {
    if (response.status === 500) {
      toast.error(response.message)
    } else {
      dispatch(updateWeeklyBudget(response.weekly_budget))
    }
  }

  const handleStartEdit = () => {
    setIsEditing(true)
    setNewBudget(weeklyBudget.amount)
  }

  const handleStopEdit = () => {
    setIsEditing(false)
    post(
      JSON.stringify({
        id: weeklyBudget.id,
        amount: newBudget,
      }),
      'get-weekly-budget',
      (response) => handleResponse(response as WeeklyBudgetResponse),
      (error) => console.error(error),
    )
  }

  return (
    <>
      <div className="text-center mb-2.5">
        <p>
          <span className="text-sky-500">{week['firstDay']}</span> to{' '}
          <span className="text-sky-500">{week['lastDay']}</span>
        </p>
      </div>
      <div className="flex justify-between">
        <p>Weekly Progress</p>
        <p>${remaining.toLocaleString()} left</p>
      </div>
      <div className="w-full h-6 border rounded-xl overflow-hidden my-1">
        <div
          className={cn(
            'h-full',
            total <= weeklyBudget.amount ? 'bg-sky-500' : 'bg-red-500',
          )}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between align-items">
        <p>
          ${total.toLocaleString()} of $
          {isEditing ? (
            <BudgetInput
              type="number"
              value={newBudget}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewBudget(parseFloat(event.target.value))
              }
            />
          ) : (
            weeklyBudget.amount?.toLocaleString()
          )}
        </p>
        {!isEditing ? (
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={handleStartEdit}
          >
            <FaRegEdit />
            Edit
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={handleStopEdit}
          >
            <FaRegSave />
            Save
          </button>
        )}
      </div>
    </>
  )
}
