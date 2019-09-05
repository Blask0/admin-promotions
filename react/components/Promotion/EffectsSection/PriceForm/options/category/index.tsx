import React from 'react'
import { InjectedIntl } from 'react-intl'

import { CategoriesSelectObject } from '../../../../Conditions/Objects'

const category = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.category.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.category.verb.any',
        }),
        value: 'any',
        object: (props: any) => <CategoriesSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.category.verb.not.any',
        }),
        value: 'not.any',
        object: (props: any) => <CategoriesSelectObject {...props} />,
      },
    ],
  }
}

export default category
