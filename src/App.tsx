import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout/Layout'
import Home from './components/routes/Home/Home'
import Transactions from './components/routes/Transactions/Transactions'
import { useAppDispatch, useTransactions, useWeeklyBudget } from './hooks/hooks'
import {
  updateTransactions,
  updateWeeklyTotal,
  updateWeeklyBudget,
} from './appSlice'
import './App.css'

function App() {
  const { transactions, total } = useTransactions()
  const weeklyBudget = useWeeklyBudget()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateTransactions(transactions))
    dispatch(updateWeeklyTotal(total))
    dispatch(updateWeeklyBudget(weeklyBudget))
  }, [dispatch, transactions, total, weeklyBudget])

  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
