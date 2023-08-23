import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { useState, useEffect } from 'react'
import { get } from '../utilities/requests'
import type {
  Transaction,
  TransactionsResponse,
  WeeklyBudgetResponse,
} from '../types/types'

// Use throughout app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [total, setTotal] = useState(0)

  const handleResponse = (response: TransactionsResponse) => {
    setTransactions(response.transactions)
    setTotal(response.weekly_total)
  }

  useEffect(() => {
    get(
      'modify-transaction',
      (response) => handleResponse(response as TransactionsResponse),
      (error) => console.error(error),
    )
  }, [])

  return { transactions, total }
}

export const useWeeklyBudget = () => {
  const [total, setTotal] = useState({ id: '', amount: 0 })

  const handleResponse = (response: WeeklyBudgetResponse) => {
    setTotal(response.weekly_budget)
  }

  useEffect(() => {
    get(
      'get-weekly-budget',
      (response) => handleResponse(response as WeeklyBudgetResponse),
      (error) => console.error(error),
    )
  }, [])

  return total
}
