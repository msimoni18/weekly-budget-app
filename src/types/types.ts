interface AppState {
  weeklyTotal: number
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

export type { AppState, Transaction, TransactionsResponse }
