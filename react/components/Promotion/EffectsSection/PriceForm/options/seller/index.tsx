import React from 'react'
import { InjectedIntl } from 'react-intl'

import { SelllersSelectObject } from '../../../../Conditions/Objects'

const sellers = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.seller.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.seller.verb.any',
        }),
        value: 'any',
        object: (props: any) => <SelllersSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.seller.verb.not.any',
        }),
        value: 'not.any',
        object: (props: any) => <SelllersSelectObject {...props} />,
      },
    ],
  }
}

export default sellers
