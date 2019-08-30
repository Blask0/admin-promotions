import React from 'react'
import { InjectedIntl } from 'react-intl'

import { InputRangeObject } from '../../../Conditions/Objects'

const zipCodeRange = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.zipCodeRange.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.zipCodeRange.verb.between',
        }),
        value: 'between',
        object: (props: any) => (
          <InputRangeObject
            {...props}
            placeholder={intl.formatMessage({
              id: 'promotions.promotion.elligibility.installments.placeholder',
            })}
          />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.zipCodeRange.verb.not.between',
        }),
        value: 'not.between',
        object: (props: any) => (
          <InputRangeObject
            {...props}
            placeholder={intl.formatMessage({
              id: 'promotions.promotion.elligibility.installments.placeholder',
            })}
          />
        ),
      },
    ],
  }
}

export default zipCodeRange
