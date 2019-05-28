import React from 'react'
import PromotionsInputCurrency from '../../../../components/Promotion/PromotionInputCurrency'

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
    update(statements)
  }

  return (
    <div className="flex">
      <PromotionsInputCurrency
        placeholder={placeholder}
        locale={locale}
        currencyCode={currencyCode}
        value={values}
        ref={statements[statementIndex].refs.object}
        errorMessage={statements[statementIndex].error}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          statements[statementIndex].error = undefined
          update(statements)
        }}
      />
    </div>
  )
}

export default renderInputCurrencyObject
