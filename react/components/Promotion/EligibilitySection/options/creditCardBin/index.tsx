import React from 'react'
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl'

import { SelectObject, SelectObjectProps } from '../../../Conditions/Objects'

import { SelectValue } from '../../../Conditions/Objects/SelectObject'

interface CreditCardBINSelectProps
  extends SelectObjectProps,
    InjectedIntlProps {
  onChange: (
    value: CreditCardBINSelectProps['value'],
    error?: SelectObjectProps['error']
  ) => void
  value: SelectValue[]
}

const CreditCardBINSelect: React.FC<CreditCardBINSelectProps> = ({
  onChange,
  intl,
  ...props
}) => {
  return (
    <SelectObject
      {...props}
      creatable
      multi
      onChange={(value: CreditCardBINSelectProps['value']) => {
        const errorValues = value.filter(
          item => typeof item.value === 'string' && item.value.length > 8
        )
        const error =
          errorValues.length > 0
            ? intl.formatMessage(
                {
                  id: 'promotions.promotion.elligibility.creditCardBin.error',
                },
                {
                  bins: errorValues
                    .map(errorValue => `'${errorValue.label}'`)
                    .join(','),
                  binsCount: errorValues.length,
                }
              )
            : undefined
        onChange(value, error)
      }}
      placeholder={intl.formatMessage({
        id: 'promotions.promotion.elligibility.creditCardBin.placeholder',
      })}
    />
  )
}

const CreditCardBINSelectObject = injectIntl<CreditCardBINSelectProps>(
  CreditCardBINSelect
)

const creditCardBin = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.creditCardBin.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.creditCardBin.verb.any',
        }),
        value: 'any',
        object: (props: any) => <CreditCardBINSelectObject {...props} />,
      },
    ],
  }
}

export default creditCardBin
