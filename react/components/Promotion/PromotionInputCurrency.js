import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { InputCurrency, Input } from 'vtex.styleguide'
import { withForwardedRef } from '../utils/withForwardedRef'

function PromotionInputCurrency(props) {
  const { intl, forwardedRef, currencyCode } = props
  return currencyCode ? (
    <InputCurrency {...props} ref={forwardedRef} />
  ) : (
    <Input
      ref={forwardedRef}
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

export default withForwardedRef(injectIntl(PromotionInputCurrency))
