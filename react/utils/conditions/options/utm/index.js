import React from 'react'

import { renderInputObject, renderSelectObject } from '../../renders'

const utm = (intl, update, type) => {
  return {
    label: intl.formatMessage({
      id: `promotions.promotion.elligibility.utm${type}.label`,
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.utm.verb.==',
        }),
        value: '==',
        object: {
          renderFn: renderInputObject,
          extraParams: {
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.utm.verb.any',
        }),
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: WrappedComponent => props => (
                <WrappedComponent {...props} />
              ),
              dataGetter: () => [],
            },
            creatable: true,
            update: update,
            multi: true,
          },
        },
      },
    ],
  }
}

export default utm
