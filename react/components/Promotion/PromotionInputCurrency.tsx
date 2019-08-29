import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import { InputCurrency, InputCurrencyProps, Input } from 'vtex.styleguide'
import { withForwardedRef, ForwardedRefProps } from '../utils/withForwardedRef'

export type Props = InputCurrencyProps

const PromotionInputCurrency: React.FC<
  Props & InjectedIntlProps & ForwardedRefProps<any>
> = ({ intl, ref, ...props }) => {
  return props.currencyCode ? (
    <InputCurrency {...props} ref={ref} />
  ) : (
    <Input
      ref={ref}
      errorMessage={intl.formatMessage({
        id: 'promotions.promotion.inputCurrency.multipleCurrencies',
      })}
      disabled
    />
  )
}

export default withForwardedRef(injectIntl(PromotionInputCurrency))
