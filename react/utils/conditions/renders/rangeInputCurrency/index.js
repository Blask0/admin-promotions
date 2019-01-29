import React from 'react'
import { InputCurrency } from 'vtex.styleguide'

const renderRangeInputCurrencyObject = ({
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
        errorMessage={
          statements[statementIndex].object &&
          statements[statementIndex].object.first >=
            statements[statementIndex].object.last
            ? 'Must be smaller than other input'
            : ''
        }
        value={values && values.first ? values.first : ''}
        onChange={e => {
          const currentObject = statements[statementIndex].object || {}
          currentObject.first = e.target.value
          statements[statementIndex].object = currentObject
          update({
            statements,
          })
        }}
      />

      <div className="mv4 mh3 c-muted-2 b">and</div>

      <InputCurrency
        placeholder={placeholder}
        locale={locale}
        currencyCode={currencyCode}
        value={values && values.last ? values.last : ''}
        onChange={e => {
          const currentObject = statements[statementIndex].object || {}
          currentObject.last = e.target.value
          statements[statementIndex].object = currentObject
          update({
            statements,
          })
        }}
      />
    </div>
  )
}

export default renderRangeInputCurrencyObject
