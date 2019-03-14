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

  return (
    <div className="flex">
      <InputCurrency
        placeholder={placeholder}
        locale={locale}
        currencyCode={currencyCode}
        value={values}
        errorMessage={statements[statementIndex].error}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          update({
            statements: {
              ...statements,
              value: statements,
              error: undefined,
            },
          })
        }}
      />
    </div>
  )
}

export default renderInputCurrencyObject
