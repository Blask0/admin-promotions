import React from 'react'
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl'

import {
  SelectObject,
  SelectObjectProps,
} from '../../../../components/Promotion/EligibilitySection/Conditions/Objects'

type Props = InjectedIntlProps & SelectObjectProps

const FirstBuySelect: React.FC<Props> = ({ intl, ...props }) => (
  <SelectObject
    {...props}
    options={[
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.firstBuy.true',
        }),
        value: true,
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.firstBuy.false',
        }),
        value: false,
      },
    ]}
  />
)

const FirstBuySelectObject = injectIntl<Props>(FirstBuySelect)

const firstBuy = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.firstBuy.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.firstBuy.verb.==',
        }),
        value: '==',
        object: (props: any) => (
          <FirstBuySelectObject
            {...props}
            multi={false}
            placeholder={intl.formatMessage({
              id: 'promotions.promotion.elligibility.firstBuy.placeholder',
            })}
          />
        ),
      },
    ],
  }
}

export default firstBuy
