import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import { SelectObject, SelectObjectProps } from '../../Objects'

import withProducts, {
  ProductsData,
  WithProductsProps,
} from '../../../../../../connectors/withProducts'

interface Props extends SelectObjectProps, WithProductsProps {
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
    options={
      productsData
        ? productsData.products.map(product => ({
            label: `${product.id} - ${product.name}`,
            value: product.id,
          }))
        : []
    }
    onSearch={searchForProducts}
  />
)

export default withProducts<Props>(injectIntl<Props>(ProductsSelectObject))
