import React from 'react'
import { InjectedIntl } from 'react-intl'

import BrandsSelectObject from './BrandsSelectObject'
import CategoriesSelectObject from './CategoriesSelectObject'
import CollectionsSelectObject from './CollectionsSelectObject'
import ProductsSelectObject from './ProductsSelectObject'
import SelllersSelectObject from './SelllersSelectObject'
import SkusSelectObject from './SkusSelectObject'
import ListPriceAndPriceComparisonObject from './ListPriceAndPriceComparisonObject'

import { InputCurrencyObject, InputCurrencyRangeObject } from '../../Objects'

const cartProduct = (intl: InjectedIntl, currencyCode: string) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.cartProduct.label',
    }),
    verbs: [
      // HAS BRAND
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.brand.any',
        }),
        value: 'brand.any',
        object: (props: any) => (
          <BrandsSelectObject
            {...props}
            multi
            placeholder={intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasBrand.placeholder',
            })}
          />
        ),
      },
      {
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.brand.not.any',
        }),
        value: 'brand.not.any',
        object: (props: any) => (
          <BrandsSelectObject
            {...props}
            multi
            placeholder={intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasBrand.placeholder',
            })}
          />
        ),
      },
      // HAS COLLECTIONS
      {
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.collection.any',
        }),
        value: 'collection.any',
        object: (props: any) => <CollectionsSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.collection.not.any',
        }),
        value: 'collection.not.any',
        object: (props: any) => <CollectionsSelectObject {...props} />,
      },
      // HAS CATEGORY
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.category.any',
        }),
        value: 'category.any',
        object: (props: any) => <CategoriesSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.category.not.any',
        }),
        value: 'category.not.any',
        object: (props: any) => <CategoriesSelectObject {...props} />,
      },
      // HAS PRODUCTS
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.product.any',
        }),
        value: 'product.any',
        object: (props: any) => <ProductsSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.product.not.any',
        }),
        value: 'product.not.any',
        object: (props: any) => <ProductsSelectObject {...props} />,
      },
      // HAS SKUS
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.sku.any',
        }),
        value: 'sku.any',
        object: (props: any) => <SkusSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.sku.not.any',
        }),
        value: 'sku.not.any',
        object: (props: any) => <SkusSelectObject {...props} />,
      },
      // ITEM PRICE RANGE
      {
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.itemPriceRange.gt',
        }),
        value: '>',
        object: (props: any) => (
          <InputCurrencyObject
            {...props}
            placeholder={intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            })}
            currencyCode={currencyCode}
            locale={intl.locale}
          />
        ),
      },
      {
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.itemPriceRange.lt',
        }),
        value: '<',
        object: (props: any) => (
          <InputCurrencyObject
            {...props}
            placeholder={intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            })}
            currencyCode={currencyCode}
            locale={intl.locale}
          />
        ),
      },
      {
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.itemPriceRange.between',
        }),
        value: 'between',
        object: (props: any) => (
          <InputCurrencyRangeObject
            {...props}
            placeholder={intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            })}
            currencyCode={currencyCode}
            locale={intl.locale}
          />
        ),
      },
      // LIST PRICE (NOT) EQUALS PRICE
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.fromToPrices',
        }),
        value: 'from/to',
        object: (props: any) => (
          <ListPriceAndPriceComparisonObject {...props} />
        ),
      },
      // HAS SELLER
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.seller.any',
        }),
        value: 'any',
        object: (props: any) => <SelllersSelectObject {...props} />,
      },
      {
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.seller.not.any',
        }),
        value: 'not.any',
        object: (props: any) => <SelllersSelectObject {...props} />,
      },
    ],
  }
}

export default cartProduct
