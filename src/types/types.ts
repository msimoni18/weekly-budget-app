interface AppState {
  weeklyTotal: number
  weeklyBudget: {
    id: string
    amount: number
  }
  transactions: {
    id: string
    date: string
    amount: number
    description: string
  }[]
}

interface Transaction {
  id: string
  date: string
  amount: number
  description: string
}

interface TransactionsResponse {
  status: number
  message: string
  weekly_total: number
  transactions: Transaction[]
}

interface WeeklyBudgetResponse {
  status: number
  message: string
  weekly_budget: {
    id: string
    amount: number
  }
}

export type {
  AppState,
  Transaction,
  TransactionsResponse,
  WeeklyBudgetResponse,
}
