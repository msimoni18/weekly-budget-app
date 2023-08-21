import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store/store'
import type { AppState } from './types/types'

const initialState: AppState = {
  weeklyTotal: 0,
  transactions: [],
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateWeeklyTotal: (state, action: PayloadAction<number>) => {
      state.weeklyTotal = action.payload
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

export const { updateWeeklyTotal, updateTransactions } = appSlice.actions
export const selectWeeklyTotal = (state: RootState) => state.app.weeklyTotal
export const selectTransactions = (state: RootState) => state.app.transactions

export default appSlice.reducer
