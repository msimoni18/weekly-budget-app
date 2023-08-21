import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  extendClass?: string
}

export default function Button({
  children,
  extendClass,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'rounded-lg border border-stone-400 p-2 w-20 hover:bg-stone-200 hover:text-stone-900 h-12',
        extendClass,
      )}
    >
      {children}
    </button>
  )
}
