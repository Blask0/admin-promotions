import React, { useRef } from 'react'

import { EXPERIMENTAL_Select } from 'vtex.styleguide'

const SELECT_TEXTAREA_MAX_HEIGHT = 100

export type SelectValue = {
  label: string
  value: unknown
}

export type Props = {
  creatable?: boolean
  error?: string
  loading?: boolean
  multi?: boolean
  placeholder?: string
  onChange:
    | ((value: SelectValue, error?: Props['error']) => void)
    | ((value: SelectValue[], error?: Props['error']) => void)
  onSearch?: (searchTerm: string) => void
  options: SelectValue[]
  value: SelectValue | SelectValue[]
}

const SingleSelectObject: React.FC<Props> = ({
  creatable,
  error,
  multi,
  loading,
  placeholder,
  onChange,
  onSearch = () => {},
  options,
  value,
}) => {
  const ref = useRef<any>(null)

  if (error && ref.current) {
    ref.current.focus()
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

export default SingleSelectObject
