import React from 'react'
import { InputCurrency } from 'vtex.styleguide'

const renderInputCurrencyObject = ({
  statements,
  values,
  statementIndex,
  error,
  extraParams,
}) => {
  const { placeholder, locale, currencyCode, update } = extraParams

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
      <InputCurrency
        placeholder={placeholder}
        locale={locale}
        currencyCode={currencyCode}
        value={values}
        ref={statements[statementIndex].refs.object}
        errorMessage={statements[statementIndex].error}
        onChange={e => {
          statements[statementIndex].object = e.target.value
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

export default renderInputCurrencyObject
