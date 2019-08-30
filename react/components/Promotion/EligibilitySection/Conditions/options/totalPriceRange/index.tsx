import React from 'react'
import { InjectedIntl } from 'react-intl'

import {
  InputCurrencyObject,
  InputCurrencyRangeObject,
} from '../../Objects'

const totalPriceRange = (intl: InjectedIntl, currencyCode: string) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.totalPriceRange.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.totalPriceRange.verb.gt',
        }),
        value: '>',
        object: (props: any) => (
          <InputCurrencyObject
            {...props}
            currencyCode={currencyCode}
            locale={intl.locale}
          />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.totalPriceRange.verb.lt',
        }),
        value: '<',
        object: (props: any) => (
          <InputCurrencyObject
            {...props}
            currencyCode={currencyCode}
            locale={intl.locale}
          />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.totalPriceRange.verb.between',
        }),
        value: 'between',
        object: (props: any) => (
          <InputCurrencyRangeObject
            {...props}
            currencyCode={currencyCode}
            locale={intl.locale}
          />
        ),
      },
    ],
  }
}

export default totalPriceRange
