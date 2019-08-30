import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import { SelectObject, SelectObjectProps } from '../../Objects'

type Props = InjectedIntlProps & SelectObjectProps

const ListPriceAndPriceComparisonObject: React.FC<Props> = ({
  intl,
  ...props
}) => (
  <SelectObject
    {...props}
    placeholder={intl.formatMessage({
      id:
        'promotions.promotion.elligibility.cartProduct.fromToPrices.placeholder',
    })}
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

export default injectIntl<Props>(ListPriceAndPriceComparisonObject)
