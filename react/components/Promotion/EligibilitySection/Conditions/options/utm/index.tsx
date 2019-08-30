import React from 'react'
import { InjectedIntl } from 'react-intl'

import {
  InputObject,
  SelectObject,
} from '../../Objects'

const utm = (intl: InjectedIntl, type: string) => {
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
        object: (props: any) => <InputObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.utm.verb.any',
        }),
        value: 'any',
        object: (props: any) => <SelectObject {...props} creatable multi />,
      },
    ],
  }
}

export default utm
