import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import type { RootState } from './store/store'
import type { AppState } from './types/types'

const initialState: AppState = {
  weeklyTotal: 0,
  weeklyBudget: {
    id: uuidv4(),
    amount: 0,
  },
  transactions: [],
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateWeeklyTotal: (state, action: PayloadAction<number>) => {
      state.weeklyTotal = action.payload
    },
    updateWeeklyBudget: (
      state,
      action: PayloadAction<{ id: string; amount: number }>,
    ) => {
      state.weeklyBudget.amount = action.payload.amount
      if (action.payload.id !== '') {
        state.weeklyBudget.id = action.payload.id
      }
    },
    updateTransactions: (
      state,
      action: PayloadAction<
        { id: string; date: string; amount: number; description: string }[]
      >,
    ) => {
      state.transactions = action.payload
    },
  },
})

export const { updateWeeklyTotal, updateWeeklyBudget, updateTransactions } =
  appSlice.actions
export const selectWeeklyTotal = (state: RootState) => state.app.weeklyTotal
export const selectWeeklyBudget = (state: RootState) => state.app.weeklyBudget
export const selectTransactions = (state: RootState) => state.app.transactions

export default appSlice.reducer
