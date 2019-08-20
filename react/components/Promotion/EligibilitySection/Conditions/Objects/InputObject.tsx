import React, { useRef } from 'react'

import { Input } from 'vtex.styleguide'

type Props = {
  error?: string
  placeholder?: string
  onChange: (value: Props['value'], error?: Props['error']) => void
  type?: string
  value: string
}

const InputObject: React.FC<Props> = ({
  error,
  onChange,
  placeholder,
  type,
  value,
}) => {
  const ref = useRef<HTMLInputElement>(null)

  if (error && ref.current) {
    ref.current.focus()
  }

  return (
    <Input
      errorMessage={error}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      placeholder={placeholder}
      ref={ref}
      type={type}
      value={value || ''}
    />
  )
}

export default InputObject
