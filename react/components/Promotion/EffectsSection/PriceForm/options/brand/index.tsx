import React from 'react'
import { InjectedIntl } from 'react-intl'

import { BrandsSelectObject } from '../../../../Conditions/Objects'

const brand = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.brand.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.brand.verb.any',
        }),
        value: 'any',
        object: (props: any) => <BrandsSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.brand.verb.not.any',
        }),
        value: 'not.any',
        object: (props: any) => <BrandsSelectObject {...props} />,
      },
    ],
  }
}

export default brand
