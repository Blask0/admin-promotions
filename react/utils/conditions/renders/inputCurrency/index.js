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
        // Temporary workaround until render supports `react-intl` v3.
        // For more info see https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-withref-to-forwardref
        intl={intl}
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
