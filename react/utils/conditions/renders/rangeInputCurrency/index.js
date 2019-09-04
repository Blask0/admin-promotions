import React from 'react'
import PromotionsInputCurrency from '../../../../components/Promotion/PromotionInputCurrency'

const renderRangeInputCurrencyObject = ({
  statements,
  values,
  statementIndex,
  error,
  extraParams,
}) => {
  const { placeholder, locale, currencyCode, intl, update } = extraParams

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
        ref={statements[statementIndex].refs.object}
        currencyCode={currencyCode}
        errorMessage={
          statements[statementIndex].object &&
          statements[statementIndex].object.first >=
            statements[statementIndex].object.last
            ? intl.formatMessage({ id: 'promotions.validation.rangeInput' })
            : statements[statementIndex].error
        }
        value={values && values.first ? values.first : ''}
        onChange={e => {
          const currentObject = statements[statementIndex].object || {}
          currentObject.first = e.target.value
          statements[statementIndex].object = currentObject
          statements[statementIndex].error = undefined
          update(statements)
        }}
      />

      <div className="mv4 mh3 c-muted-2 b">and</div>

      <PromotionsInputCurrency
        // Temporary workaround until render supports `react-intl` v3.
        // For more info see https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-withref-to-forwardref
        intl={intl}
        placeholder={placeholder}
        locale={locale}
        currencyCode={currencyCode}
        value={values && values.last ? values.last : ''}
        errorMessage={statements[statementIndex].error}
        onChange={e => {
          const currentObject = statements[statementIndex].object || {}
          currentObject.last = e.target.value
          statements[statementIndex].object = currentObject
          statements[statementIndex].error = undefined
          update(statements)
        }}
      />
    </div>
  )
}

export default renderRangeInputCurrencyObject
