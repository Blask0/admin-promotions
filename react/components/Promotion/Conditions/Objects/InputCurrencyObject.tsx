import React, { useRef } from 'react'

import PromotionsInputCurrency, {
  Props as PromotionsInputCurrencyProps,
} from '../../../Promotion/PromotionInputCurrency'
import { InjectedIntlProps, injectIntl } from 'react-intl'

export type Props = Omit<
  PromotionsInputCurrencyProps,
  'onChange' | 'errorMessage' | 'size' | 'forwardedRef'
> & {
  onChange: (value: Props['value'], error?: Props['error']) => void
  error?: string
}

const InputCurrencyObject: React.FC<Props & InjectedIntlProps> = ({
  currencyCode,
  error,
  intl,
  locale,
  onChange,
  value,
  placeholder,
}) => {
  const ref = useRef<any>(null)

  if (error && ref.current) {
    ref.current.focus()
  }

  return (
    <PromotionsInputCurrency
      // Temporary workaround until render supports `react-intl` v3.
      // For more info see https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-withref-to-forwardref
      intl={intl}
      currencyCode={currencyCode}
      errorMessage={error}
      locale={locale}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      ref={ref}
      value={value}
    />
  )
}

export default injectIntl<Props>(InputCurrencyObject)
