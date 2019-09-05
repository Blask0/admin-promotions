import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import withSellers, {
  SellersData,
  WithSellersProps,
} from '../../../../connectors/withSellers'

import { SelectObject, SelectObjectProps } from '.'
import { mapSellersToSelect } from '../../../../utils/mappers'

export interface Props extends SelectObjectProps, WithSellersProps {
  sellers: SellersData['getSellers']
}

const SellersSelectObject: React.FC<Props & InjectedIntlProps> = ({
  sellers = [],
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
    options={mapSellersToSelect(sellers)}
    onSearch={searchForSellers}
  />
)

export default withSellers<Props>(injectIntl<Props>(SellersSelectObject))
