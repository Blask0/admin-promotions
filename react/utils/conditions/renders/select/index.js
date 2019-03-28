import React, { Fragment } from 'react'
import { EXPERIMENTAL_Select, Alert } from 'vtex.styleguide'
import BulkImporter from '../../../../components/bulkImporter'

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
    bulk,
  } = extraParams

  const SelectObject = connector(props => {
    const options = dataGetter(props)
    const { loading, updateQueryParams } = props

    // This first renaming is confusing
    const { object: selected, error: errorMessage } = statements[statementIndex]

    if (statements[statementIndex].focus) {
      statements[statementIndex].refs.object.current.focus()
      statements[statementIndex].focus = false
      update(statements)
    }

    const addBulkValues = (values, notFound) => {
      statements[statementIndex].object = values
      statements[
        statementIndex
      ].error = `We didn't find these Ids in catalog: ${notFound} `
      update(statements)
      // bulk.notFoundIdCallback && bulk.notFoundIdCallback()
    }

    return (
      <Fragment>
        <div className="flex flex-row ">
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
          {bulk && (
            <BulkImporter update={addBulkValues} modalTitle={bulk.modalTitle} />
          )}
        </div>
        {/* <Alert /> */}
      </Fragment>
    )
  })

  return <SelectObject />
}

export default renderSelectObject
