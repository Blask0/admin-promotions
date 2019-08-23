import React from 'react'

import {
  InputObject,
  SelectObject,
} from '../../../../components/Promotion/EligibilitySection/Conditions/Objects'

const utm = (intl, type) => {
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
        object: props => <InputObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.utm.verb.any',
        }),
        value: 'any',
        object: props => <SelectObject {...props} creatable multi />,
      },
    ],
  }
}

export default utm
