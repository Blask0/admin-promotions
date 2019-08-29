import React, { useRef } from 'react'

import PromotionsInputCurrency, {
  Props as PromotionsInputCurrencyProps,
} from '../../../../Promotion/PromotionInputCurrency'

export type Props = Omit<
  PromotionsInputCurrencyProps,
  'onChange' | 'errorMessage' | 'size' | 'forwardedRef'
> & {
  onChange: (value: Props['value'], error?: Props['error']) => void
  error?: string
}

const InputCurrencyObject: React.FC<Props> = ({
  currencyCode,
  error,
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

export default InputCurrencyObject
