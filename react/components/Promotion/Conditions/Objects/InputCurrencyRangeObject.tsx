import React, { useRef, useEffect } from 'react'

import PromotionsInputCurrency, {
  Props as PromotionsInputCurrencyProps,
} from '../../PromotionInputCurrency'
import { InjectedIntlProps, injectIntl } from 'react-intl'

export type Props = Omit<
  PromotionsInputCurrencyProps,
  'onChange' | 'errorMessage' | 'size' | 'value'
> & {
  onChange: (value: Props['value'], error?: Props['error']) => void
  error?: string
  value?: {
    first?: number
    last?: number
  }
}

const hasError = (value: Props['value']): boolean =>
  !!value && !!value.first && !!value.last && value.first >= value.last

const InputCurrencyRange: React.FC<Props & InjectedIntlProps> = ({
  currencyCode,
  error,
  intl,
  locale,
  onChange,
  placeholder,
  value,
}) => {
  const ref = useRef<any>(null)

  useEffect(
    () => {
      if (error && ref.current) {
        ref.current.focus()
      }
    },
    [error]
  )

  return (
    <div className="flex">
      <PromotionsInputCurrency
        currencyCode={currencyCode}
        // Temporary workaround until render supports `react-intl` v3.
        // For more info see https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-withref-to-forwardref
        intl={intl}
        locale={locale}
        onChange={e =>
          onChange({
            ...value,
            first: e.target.value,
          })
        }
        placeholder={placeholder}
        value={value && value.first}
      />

      <div className="mv4 mh3 c-muted-2 b">
        {intl.formatMessage({
          id: 'promotions.promotion.elligibility.conditions.operatorAnd',
        })}
      </div>

      <PromotionsInputCurrency
        currencyCode={currencyCode}
        errorMessage={error}
        // Temporary workaround until render supports `react-intl` v3.
        // For more info see https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-withref-to-forwardref
        intl={intl}
        locale={locale}
        onChange={e =>
          onChange({
            ...value,
            last: e.target.value,
          })
        }
        placeholder={placeholder}
        ref={ref}
        value={value && value.last}
      />
    </div>
  )
}

const InputCurrencyRangeIntl = injectIntl<Props>(InputCurrencyRange)

const InputCurrencyRangeObject: React.FC<Props & InjectedIntlProps> = ({
  onChange,
  intl,
  ...props
}) => (
  <InputCurrencyRangeIntl
    {...props}
    onChange={value => {
      const error = hasError(value)
        ? intl.formatMessage({
            id: 'promotions.validation.rangeInput',
          })
        : undefined
      onChange(value, error)
    }}
  />
)

export default injectIntl<Props>(InputCurrencyRangeObject)
