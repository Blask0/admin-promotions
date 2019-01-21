import React from 'react'
import { Select } from 'vtex.styleguide'

const singleSelectObject = (
  selected,
  options,
  placeholder,
  loading,
  handleChange
) => {
  const [value] = options.filter(option => {
    return option.value === selected
  })

  return (
    <Select
      placeholder={placeholder}
      options={options}
      value={value}
      isMulti={false}
      isLoading={loading}
      onChange={selected => {
        const { value } = selected || {}
        handleChange(value)
      }}
    />
  )
}

const multiSelectObject = (
  selected,
  options,
  placeholder,
  loading,
  handleChange
) => {
  const values = options.filter(option => {
    return selected && selected.includes(option.value)
  })

  return (
    <Select
      placeholder={placeholder}
      options={options}
      value={values}
      isMulti
      isLoading={loading}
      onChange={selected => {
        const values = selected.map(s => s.value)
        handleChange(values)
      }}
    />
  )
}

const renderSelectObject = ({
  statements,
  values,
  statementIndex,
  error,
  extraParams,
}) => {
  const { update } = extraParams

  const SelectObject = extraParams.queryInfo.connector(props => {
    const options = extraParams.queryInfo.dataGetter(props)
    const { placeholder, multi } = extraParams
    const { loading } = props

    const { object: selected } = statements[statementIndex]
    const handleComponentChange = selected => {
      statements[statementIndex].object = selected
      update({
        statements,
      })
    }

    return multi
      ? multiSelectObject(
        selected,
        options,
        placeholder,
        loading,
        handleComponentChange
      )
      : singleSelectObject(
        selected,
        options,
        placeholder,
        loading,
        handleComponentChange
      )
  })

  return <SelectObject />
}

export default renderSelectObject
