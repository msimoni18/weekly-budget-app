import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { useState, useEffect } from 'react'
import { get } from '../utilities/requests'
import type { Transaction, TransactionsResponse } from '../types/types'

// Use throughout app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [total, setTotal] = useState(0)

  const handleResponse = (response: TransactionsResponse) => {
    console.log('useTransactions')
    console.log(response)
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
