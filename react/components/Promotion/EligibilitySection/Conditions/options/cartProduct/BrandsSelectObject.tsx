import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import { SelectObject, SelectObjectProps } from '../../Objects'

import withBrands, {
  BrandsData,
  WithBrandsProps,
} from '../../../../../../connectors/withBrands'

interface Props extends SelectObjectProps, WithBrandsProps {
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
    options={brands.map(brand => ({
      label: brand.name,
      value: brand.id,
    }))}
    onSearch={searchForBrands}
  />
)

export default withBrands<Props>(injectIntl<Props>(BrandsSelectObject))
