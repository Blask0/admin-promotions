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

  // if (statements[statementIndex].focus) {
  //   inputRef.current.focus()
  //   statements[statementIndex].focus = false
  //   update({
  //     statements: {
  //       ...statements,
  //       value: statements,
  //       error: undefined,
  //     },
  //   })
  // }

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
          statements[statementIndex].error = undefined
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
