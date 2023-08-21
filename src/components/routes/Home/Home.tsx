import InputForm from '../../InputForm/InputForm'
import Row from '../../Row/Row'
import ProgressBar from '../../ProgressBar/ProgressBar'
import TransactionsList from '../../TransactionsList/TransactionsList'
import { getWeek } from '../../../utilities/utils'

export default function Home() {
  const week = getWeek(new Date())

  return (
    <div className="px-5">
      <Row>
        <ProgressBar week={week} />
      </Row>
      <Row>
        <InputForm />
      </Row>
      <Row>
        <TransactionsList />
      </Row>
    </div>
  )
}
