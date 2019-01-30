import React from 'react'
import { EXPERIMENTAL_Select } from 'vtex.styleguide'

const singleSelectObject = (
  selected,
  options,
  placeholder,
  loading,
  creatable,
  handleChange
) => {
  const [value] = options.filter(option => {
    return option.value === selected
  })

  return (
    <EXPERIMENTAL_Select
      placeholder={placeholder}
      options={options}
      value={value}
      multi={false}
      loading={loading}
      creatable={creatable}
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
  creatable,
  handleChange
) => {
  const selectedValues = options.filter(option => {
    return selected && selected.includes(option.value)
  })

  const createdValues =
    creatable && selected
      ? selected
        .filter(createdValue => {
          return (
            options.filter(option => option.value === createdValue).length ===
              0
          )
        })
        .map(createdValue => ({ label: createdValue, value: createdValue }))
      : []

  const values = selectedValues.concat(createdValues)

  return (
    <EXPERIMENTAL_Select
      placeholder={placeholder}
      options={options}
      value={values}
      multi
      loading={loading}
      creatable={creatable}
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
  const { update, creatable, placeholder, multi } = extraParams

  const SelectObject = extraParams.queryInfo.connector(props => {
    const options = extraParams.queryInfo.dataGetter(props)
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
        creatable,
        handleComponentChange
      )
      : singleSelectObject(
        selected,
        options,
        placeholder,
        loading,
        creatable,
        handleComponentChange
      )
  })

  return <SelectObject />
}

export default renderSelectObject
