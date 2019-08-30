import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import {
  SelectObject,
  SelectObjectProps,
} from '../../../../components/Promotion/EligibilitySection/Conditions/Objects'

import withSellers, {
  SellersData,
  WithSellersProps,
} from '../../../../connectors/withSellers'

interface Props extends SelectObjectProps, WithSellersProps {
  collections: SellersData['getSellers']
}

const SellersSelectObject: React.FC<Props & InjectedIntlProps> = ({
  collections = [],
  intl,
  searchForSellers,
  ...props
}) => (
  <SelectObject
    {...props}
    multi
    placeholder={intl.formatMessage({
      id:
        'promotions.promotion.elligibility.cartProduct.hasSellers.placeholder',
    })}
    options={collections.map(collection => ({
      label: collection.name,
      value: collection.id,
    }))}
    onSearch={searchForSellers}
  />
)

export default withSellers<Props>(injectIntl<Props>(SellersSelectObject))
