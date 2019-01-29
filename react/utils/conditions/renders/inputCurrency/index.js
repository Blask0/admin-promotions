import React from 'react'
import { InputCurrency } from 'vtex.styleguide'

const renderInputCurrencyObject = ({
  statements,
  values,
  statementIndex,
  error,
  extraParams,
}) => {
  const { placeholder, update } = extraParams

  return (
    <div className="flex">
      <InputCurrency
        placeholder={placeholder}
        value={values}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          update({
            statements,
          })
        }}
      />
    </div>
  )
}

export default renderInputCurrencyObject
