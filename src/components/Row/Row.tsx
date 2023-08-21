import { ReactNode } from 'react'

interface Row {
  children: ReactNode
}

export default function Row({ children }: Row) {
  return <div className="mb-5">{children}</div>
}
