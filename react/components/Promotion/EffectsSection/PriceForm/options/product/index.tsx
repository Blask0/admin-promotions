import React from 'react'
import { InjectedIntl } from 'react-intl'

import { ProductsSelectObject } from '../../../../Conditions/Objects'

const product = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.product.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.product.verb.any',
        }),
        value: 'any',
        object: (props: any) => <ProductsSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.product.verb.not.any',
        }),
        value: 'not.any',
        object: (props: any) => <ProductsSelectObject {...props} />,
      },
    ],
  }
}

export default product
