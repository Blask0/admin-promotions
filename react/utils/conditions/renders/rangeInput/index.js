import React from 'react'
import { Input } from 'vtex.styleguide'

const renderRangeInputObject = ({
  statements,
  values,
  statementIndex,
  error,
  extraParams,
}) => {
  const { placeholder, type, update, intl } = extraParams

  if (statements[statementIndex].focus) {
    statements[statementIndex].refs.object.current.focus()
    statements[statementIndex].focus = false
    update({
      statements: {
        value: statements,
        error: undefined,
        focus: false,
      },
    })
  }

  return (
    <div className="flex">
      <Input
        type={type}
        placeholder={placeholder}
        ref={statements[statementIndex].refs.object}
        errorMessage={
          statements[statementIndex].object &&
          parseInt(statements[statementIndex].object.first) >=
            parseInt(statements[statementIndex].object.last)
            ? intl.formatMessage({ id: 'promotions.validation.rangeInput' })
            : statements[statementIndex].error
        }
        value={values && values.first ? values.first : ''}
        onChange={e => {
          const currentObject = statements[statementIndex].object || {}
          currentObject.first = e.target.value.replace(/\D/g, '')

          statements[statementIndex].object = currentObject
          statements[statementIndex].error = undefined
          update({
            statements: {
              value: statements,
              error: undefined,
              focus: false,
            },
          })
        }}
      />

      <div className="mv4 mh3 c-muted-2 b">
        {intl.formatMessage({
          id: 'promotions.promotion.elligibility.conditions.operatorAnd',
        })}
      </div>

      <Input
        type={type}
        placeholder={placeholder}
        value={values && values.last ? values.last : ''}
        errorMessage={statements[statementIndex].error}
        onChange={e => {
          const currentObject = statements[statementIndex].object || {}
          currentObject.last = e.target.value.replace(/\D/g, '')

          statements[statementIndex].object = currentObject
          statements[statementIndex].error = undefined
          update({
            statements: {
              value: statements,
              error: undefined,
              focus: false,
            },
          })
        }}
      />
    </div>
  )
}

export default renderRangeInputObject
