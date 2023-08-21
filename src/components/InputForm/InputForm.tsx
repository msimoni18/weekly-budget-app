import { useState, FormEvent } from 'react'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { post } from '../../utilities/requests'
import { formatDate } from '../../utilities/utils'
import type { TransactionsResponse } from '../../types/types'
import { useAppDispatch } from '../../hooks/hooks'
import { updateTransactions, updateWeeklyTotal } from '../../appSlice'

export default function InputForm() {
  const dispatch = useAppDispatch()
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const handleResponse = (response: TransactionsResponse) => {
    if (response.status === 500) {
      toast.error(response.message)
    } else {
      dispatch(updateTransactions(response.transactions))
      dispatch(updateWeeklyTotal(response.weekly_total))
      toast.success('Transaction uploaded.')
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (amount.trim() !== '' && description.trim() !== '') {
      const date = formatDate(new Date())

      post(
        JSON.stringify({
          type: 'add',
          transactionData: {
            id: uuidv4(),
            date: date,
            amount: amount,
            description: description,
          },
        }),
        'modify-transaction',
        (response) => handleResponse(response as TransactionsResponse),
        (error) => console.error(error),
      )

      setAmount('')
      setDescription('')
    } else if (amount.trim() === '' && description.trim() !== '') {
      toast.error('Amount cannot be empty!')
    } else if (amount.trim() !== '' && description.trim() === '') {
      toast.error('Description cannot be empty!')
    } else {
      toast.error('Amount and Description cannot be empty!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between w-full max-w-lg gap-2 p-5 m-auto bg-stone-950 rounded-lg h-28">
        <Input
          label="Amount"
          type="text"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <Input
          label="Description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button type="submit">Upload</Button>
      </div>
    </form>
  )
}
