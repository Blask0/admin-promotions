import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { InputCurrency, Input } from 'vtex.styleguide'

function PromotionInputCurrency(props) {
  const { intl, currencyCode } = props
  return currencyCode ? (
    <InputCurrency {...props} />
  ) : (
    <Input
      errorMessage={intl.formatMessage({
        id: 'promotions.promotion.inputCurrency.multipleCurrencies',
      })}
      disabled
    />
  )
}

PromotionInputCurrency.propTypes = {
  ...InputCurrency.propTypes,
  intl: intlShape,
}

export default injectIntl(PromotionInputCurrency)
