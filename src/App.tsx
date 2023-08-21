import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout/Layout'
import Home from './components/routes/Home/Home'
import Transactions from './components/routes/Transactions/Transactions'
import { useAppDispatch, useTransactions } from './hooks/hooks'
import { updateTransactions, updateWeeklyTotal } from './appSlice'
import './App.css'

function App() {
  const { transactions, total } = useTransactions()
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('App: useEffect')
    dispatch(updateTransactions(transactions))
    dispatch(updateWeeklyTotal(total))
  }, [dispatch, transactions, total])

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
