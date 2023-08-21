import type { InputHTMLAttributes } from 'react'

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function Input({ label, ...rest }: Input) {
  return (
    <div className="relative">
      <input
        {...rest}
        id="floating-outlined"
        className="block text-sm p-2.5 pt-4 w-full appearance-none bg-stone-950 rounded-lg border border-stone-400 focus:border-stone-200 focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        htmlFor="floating-outlined"
        className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-stone-950 px-2 text-stone-400 peer-focus:text-stone-200 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 pointer-events-none"
      >
        {label}
      </label>
    </div>
  )
}
