import React, { Fragment } from 'react'
import { EXPERIMENTAL_Select, Alert } from 'vtex.styleguide'
import BulkImporter from '../../../../components/bulkImporter'
const SELECT_TEXTAREA_MAX_HEIGHT = 100

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
    intl,
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

    const addBulkValues = (values, notFound) => {
      if (values && notFound) {
        statements[statementIndex].object = values

        // Think about what to do when user changes subject
        statements[statementIndex].warning =
          notFound && notFound.length > 0 && intl
            ? intl.formatMessage(
              {
                id: 'promotions.promotion.import.modal.notFound',
              },
              {
                notFound: notFound,
              }
            )
            : undefined

        update(statements)
      }
    }

    const BulkImporterObject =
      bulk &&
      bulk.connector &&
      bulk.connector(innerProps => {
        return (
          <BulkImporter
            {...innerProps}
            update={addBulkValues}
            name={bulk.name}
            productQueryIsLoading={loading}
          />
        )
      })

    return (
      <Fragment>
        <div className="flex flex-row ">
          <div>
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
              valuesMaxHeight={SELECT_TEXTAREA_MAX_HEIGHT}
            />
            {statements[statementIndex].warning && (
              <div className="mt4">
                <Alert
                  type="warning"
                  onClose={() => {
                    statements[statementIndex].warning = undefined
                    update(statements)
                  }}>
                  {statements[statementIndex].warning}
                </Alert>
              </div>
            )}
          </div>
          {bulk && bulk.connector && (
            <div className="ml3">
              <BulkImporterObject />
            </div>
          )}
        </div>
      </Fragment>
    )
  })

  return <SelectObject />
}

export default renderSelectObject
