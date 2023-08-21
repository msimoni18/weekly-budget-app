import Row from '../../Row/Row'
import TransactionsList from '../../TransactionsList/TransactionsList'

export default function Transactions() {
  return (
    <div className="px-5">
      <Row>
        <TransactionsList />
      </Row>
    </div>
  )
}
