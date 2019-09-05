import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import withBrands, {
  BrandsData,
  WithBrandsProps,
} from '../../../../connectors/withBrands'

import { SelectObject, SelectObjectProps } from '.'
import { mapBrandsToSelect } from '../../../../utils/mappers'

export interface Props extends SelectObjectProps, WithBrandsProps {
  brands: BrandsData['getBrands']
}

const BrandsSelectObject: React.FC<Props & InjectedIntlProps> = ({
  brands = [],
  intl,
  searchForBrands,
  ...props
}) => (
  <SelectObject
    {...props}
    multi
    placeholder={intl.formatMessage({
      id: 'promotions.promotion.elligibility.cartProduct.hasBrand.placeholder',
    })}
    options={mapBrandsToSelect(brands)}
    onSearch={searchForBrands}
  />
)

export default withBrands<Props>(injectIntl<Props>(BrandsSelectObject))
