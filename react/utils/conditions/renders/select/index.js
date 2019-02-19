import React, { Fragment } from 'react'
import { EXPERIMENTAL_Select } from 'vtex.styleguide'
import Importer from '../../../bulkImporter/Importer'

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
    multi = false,
    queryInfo: { connector, dataGetter },
    validation: { execute: isValid, errorMessage: validationErrorMessage } = {},
  } = extraParams

  const SelectObject = connector(props => {
    const options = dataGetter(props)
    const { loading, updateQueryParams } = props

    const { object: selected, error: errorMessage } = statements[statementIndex]

    if (statements[statementIndex].focus) {
      statements[statementIndex].refs.object.current.focus()
      statements[statementIndex].focus = false
      update(statements)
    }

    return (
      <Fragment>
        <EXPERIMENTAL_Select
          placeholder={placeholder}
          options={options}
          value={selected}
          multi={multi}
          ref={statements[statementIndex].refs.object}
          loading={loading}
          creatable={creatable}
          errorMessage={errorMessage}
          onChange={selected => {
            if ((isValid && isValid(selected)) || !isValid) {
              statements[statementIndex].object = selected
              statements[statementIndex].error = null
            } else {
              statements[statementIndex].error = validationErrorMessage
            }
            update(statements)
          }}
          onSearchInputChange={searchedValue => {
            updateQueryParams &&
              updateQueryParams({
                name: searchedValue,
              })
          }}
        />
        <Importer />
      </Fragment>
    )
  })

  return <SelectObject />
}

export default renderSelectObject
