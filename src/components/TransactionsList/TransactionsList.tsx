import { useAppSelector } from '../../hooks/hooks'
import Transaction from '../Transaction/Transaction'

export default function TransactionsList() {
  const transactions = useAppSelector((state) => state.app.transactions)

  if (!transactions.length) {
    return (
      <div className="max-w-lg m-auto">
        <h1 className="flex flex-col items-center gap-5 px-5 py-10 text-xl font-bold text-center rounded-lg bg-stone-950">
          No transactions have been recorded.
        </h1>
      </div>
    )
  }

  return (
    <>
      <ul className="grid max-w-lg gap-2 m-auto">
        <h1 className="text-center">Transaction History</h1>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
      </ul>
    </>
  )
}
