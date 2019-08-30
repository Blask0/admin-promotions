import React from 'react'
import { InjectedIntl } from 'react-intl'

import {
  InputObject,
  InputNumberRangeObject,
} from '../../../Conditions/Objects'

const installments = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.installments.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.installments.verb.gt',
        }),
        value: '>',
        object: (props: any) => (
          <InputObject
            {...props}
            placeholder={intl.formatMessage({
              id: 'promotions.promotion.elligibility.installments.placeholder',
            })}
            type="number"
          />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.installments.verb.lt',
        }),
        value: '<',
        object: (props: any) => (
          <InputObject
            {...props}
            placeholder={intl.formatMessage({
              id: 'promotions.promotion.elligibility.installments.placeholder',
            })}
            type="number"
          />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.installments.verb.between',
        }),
        value: 'between',
        object: (props: any) => (
          <InputNumberRangeObject
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

export default installments
