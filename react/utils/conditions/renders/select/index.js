import React from 'react'
import { EXPERIMENTAL_Select } from 'vtex.styleguide'

const renderSelectObject = ({
  statements,
  values,
  statementIndex,
  error,
  extraParams,
}) => {
  const {
    update,
    creatable,
    placeholder,
    multi,
    queryInfo: { connector, dataGetter },
    validation: { execute: isValid, errorMessage: validationErrorMessage },
  } = extraParams

  const SelectObject = connector(props => {
    const options = dataGetter(props)
    const { loading, updateQueryParams } = props

    const { object: selected, error: errorMessage } = statements[statementIndex]

    return (
      <EXPERIMENTAL_Select
        placeholder={placeholder}
        options={options}
        value={selected}
        multi={multi}
        loading={loading}
        creatable={creatable}
        errorMessage={errorMessage}
        onChange={selected => {
          if (isValid && isValid(selected)) {
            statements[statementIndex].object = selected
            statements[statementIndex].error = null
          } else {
            statements[statementIndex].error = validationErrorMessage
          }
          update({
            statements,
          })
        }}
        onSearchInputChange={searchedValue => {
          updateQueryParams &&
            updateQueryParams({
              name: searchedValue,
            })
        }}
      />
    )
  })

  return <SelectObject />
}

export default renderSelectObject
