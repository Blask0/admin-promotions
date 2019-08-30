import React from 'react'
import { InjectedIntl } from 'react-intl'

import { CollectionsSelectObject } from '../../../../Conditions/Objects'

const collection = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.collection.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.collection.verb.any',
        }),
        value: 'any',
        object: (props: any) => <CollectionsSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.collection.verb.not.any',
        }),
        value: 'not.any',
        object: (props: any) => <CollectionsSelectObject {...props} />,
      },
    ],
  }
}

export default collection
