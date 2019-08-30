import React from 'react'
import { InjectedIntl } from 'react-intl'

import { SkusSelectObject } from '../../../../Conditions/Objects'

const sku = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.sku.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.sku.verb.any',
        }),
        value: 'any',
        object: (props: any) => <SkusSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.sku.verb.not.any',
        }),
        value: 'not.any',
        object: (props: any) => <SkusSelectObject {...props} />,
      },
    ],
  }
}

export default sku
