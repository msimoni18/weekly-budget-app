import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
// import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { post } from '../../utilities/requests'
import { useAppDispatch } from '../../hooks/hooks'
import { updateTransactions, updateWeeklyTotal } from '../../appSlice'
import type { Transaction, TransactionsResponse } from '../../types/types'

export default function Transaction({
  id,
  date,
  amount,
  description,
}: Transaction) {
  const dispatch = useAppDispatch()

  const handleResponse = (response: TransactionsResponse) => {
    dispatch(updateTransactions(response.transactions))
    dispatch(updateWeeklyTotal(response.weekly_total))
    toast.success('Transaction was deleted.')
  }

  const handleClick = () => {
    post(
      JSON.stringify({
        type: 'delete',
        transactionData: {
          id: id,
          date: date,
          amount: amount,
          description: description,
        },
      }),
      'modify-transaction',
      (response) => handleResponse(response as TransactionsResponse),
      (error) => console.error(error),
    )
  }

  return (
    <motion.li
      layout
      key={id}
      className="flex justify-between p-5 rounded-lg bg-stone-950"
    >
      <div>
        <h1>
          Date: <span className="text-sky-500">{date}</span>
        </h1>
        <h1>
          Amount:{' '}
          <span className="text-sky-500">${amount.toLocaleString()}</span>
        </h1>
        <h1>
          Description: <span className="text-sky-500">{description}</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {/* <button className="flex items-center gap-1 ">
          <FaRegEdit />
          Edit
        </button> */}
        <button
          className="flex items-center gap-1 text-red-500"
          onClick={handleClick}
        >
          <RiDeleteBin7Line />
          Delete
        </button>
      </div>
    </motion.li>
  )
}
