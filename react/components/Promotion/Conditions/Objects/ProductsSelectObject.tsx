import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import withProducts, {
  ProductsData,
  WithProductsProps,
} from '../../../../connectors/withProducts'

import { SelectObject, SelectObjectProps } from '.'
import { mapProductsToSelect } from '../../../../utils/mappers'

export interface Props extends SelectObjectProps, WithProductsProps {
  productsData: ProductsData['getProducts']
}

const ProductsSelectObject: React.FC<Props & InjectedIntlProps> = ({
  productsData,
  intl,
  searchForProducts,
  ...props
}) => (
  <SelectObject
    {...props}
    multi
    placeholder={intl.formatMessage({
      id:
        'promotions.promotion.elligibility.cartProduct.hasProducts.placeholder',
    })}
    options={productsData ? mapProductsToSelect(productsData.products) : []}
    onSearch={searchForProducts}
  />
)

export default withProducts<Props>(injectIntl<Props>(ProductsSelectObject))
