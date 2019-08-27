import React, { useRef } from 'react'

import { EXPERIMENTAL_Select } from 'vtex.styleguide'

const SELECT_TEXTAREA_MAX_HEIGHT = 100

export type Props = {
  creatable?: boolean
  error?: string
  loading?: boolean
  multi?: boolean
  placeholder?: string
  onChange: (value: Props['value'], error?: Props['error']) => void
  onSearch: (searchTerm: string) => void
  options: {
    label: string
    value: Props['value']
  }[]
  value: unknown
}

const SelectObject: React.FC<Props> = ({
  creatable,
  error,
  loading,
  multi,
  placeholder,
  onChange,
  onSearch,
  options,
  value,
}) => {
  // any for now because select has a custom API (ex: setFocus())
  const ref = useRef<any>(null)

  if (error && ref.current) {
    ref.current.setFocus()
  }

  return (
    <EXPERIMENTAL_Select
      creatable={creatable}
      errorMessage={error}
      loading={loading}
      multi={multi}
      onChange={(selected: any) => onChange(selected)}
      onSearchInputChange={(searchedTerm: string) => onSearch(searchedTerm)}
      options={options}
      placeholder={placeholder}
      ref={ref}
      value={value}
      valuesMaxHeight={SELECT_TEXTAREA_MAX_HEIGHT}
    />
  )
}

export default SelectObject
