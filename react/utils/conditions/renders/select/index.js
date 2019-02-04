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
  } = extraParams

  const SelectObject = connector(props => {
    const options = dataGetter(props)
    const { loading, updateQueryParams } = props

    const { object: selected } = statements[statementIndex]

    return (
      <EXPERIMENTAL_Select
        placeholder={placeholder}
        options={options}
        value={selected}
        multi={multi}
        loading={loading}
        creatable={creatable}
        onChange={selected => {
          statements[statementIndex].object = selected
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
