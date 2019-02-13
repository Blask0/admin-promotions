import {
  renderInputCurrencyObject,
  renderRangeInputCurrencyObject,
  renderSelectObject,
} from '../../renders'

import withBrands from '../../../../connectors/withBrands'
import withCollections from '../../../../connectors/withCollections'
import withCategories from '../../../../connectors/withCategories'
import withProducts from '../../../../connectors/withProducts'
import withSellers from '../../../../connectors/withSellers'

const mapBrands = brands =>
  brands.map(brand => ({
    label: brand.name,
    value: brand.id,
  }))

const mapCollections = collections =>
  collections.map(collection => ({
    label: collection.name,
    value: collection.id,
  }))

const mapCategories = categories =>
  categories.map(category => ({
    label: category.name,
    value: category.id,
  }))

const mapProducts = products =>
  products.map(product => ({
    label: `${product.id} - ${product.name}`,
    value: product.id,
  }))

const mapSellers = sellers =>
  sellers.map(seller => ({
    label: seller.name,
    value: seller.id,
  }))

const cartProduct = (intl, update, currencyCode) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.cartProduct.label',
    }),
    verbs: [
      // HAS BRAND
      {
        label: 'belongs to any of these brands',
        value: 'brand.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withBrands,
              dataGetter: ({ brands = [] }) => mapBrands(brands),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasBrand.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: 'does not belong to any of these brands',
        value: 'brand.not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withBrands,
              dataGetter: ({ brands = [] }) => mapBrands(brands),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasBrand.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      // HAS COLLECTIONS
      {
        label: 'belongs to any of these collections',
        value: 'collection.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withCollections,
              dataGetter: ({ collections = [] }) => mapCollections(collections),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasCollections.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: 'does not belong to any of these collections',
        value: 'collection.not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withCollections,
              dataGetter: ({ collections = [] }) => mapCollections(collections),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasCollections.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      // HAS CATEGORY
      {
        label: 'belongs to any of these categories',
        value: 'category.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withCategories,
              dataGetter: ({ categories = [] }) => mapCategories(categories),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasCategories.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: 'does not belong to any of these categories',
        value: 'category.not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withCategories,
              dataGetter: ({ categories = [] }) => mapCategories(categories),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasCategories.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      // HAS PRODUCTS
      {
        label: 'is any of these SKUs',
        value: 'product.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withProducts,
              dataGetter: ({ products = [] }) => mapProducts(products),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasProducts.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: 'is not any of these SKUs',
        value: 'product.not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withProducts,
              dataGetter: ({ products = [] }) => mapProducts(products),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasProducts.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      // ITEM PRICE RANGE
      {
        label: 'with price greater than',
        value: '>',
        object: {
          renderFn: renderInputCurrencyObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            }),
            locale: intl.locale,
            currencyCode: currencyCode,
            update: update,
          },
        },
      },
      {
        label: 'with price less than',
        value: '<',
        object: {
          renderFn: renderInputCurrencyObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            }),
            locale: intl.locale,
            currencyCode: currencyCode,
            update: update,
          },
        },
      },
      {
        label: 'with price between',
        value: 'between',
        object: {
          renderFn: renderRangeInputCurrencyObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            }),
            locale: intl.locale,
            currencyCode: currencyCode,
            update: update,
          },
        },
      },
      // LIST PRICE (NOT) EQUALS PRICE
      {
        label: 'with "from" and "to" prices',
        value: 'from/to',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: WrappedComponent => props => (
                <WrappedComponent {...props} />
              ),
              dataGetter: () => [
                {
                  label: intl.formatMessage({
                    id:
                      'promotions.promotion.elligibility.cartProduct.fromToPrices.equals',
                  }),
                  value: true,
                },
                {
                  label: intl.formatMessage({
                    id:
                      'promotions.promotion.elligibility.cartProduct.fromToPrices.notEquals',
                  }),
                  value: false,
                },
              ],
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.fromToPrices.placeholder',
            }),
            update: update,
          },
        },
      },
      // HAS SELLER
      {
        label: 'is from one of these Sellers',
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withSellers,
              dataGetter: ({ sellers = [] }) => mapSellers(sellers),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasSellers.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: 'is not from one of these Sellers',
        value: 'not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withSellers,
              dataGetter: ({ sellers = [] }) => mapSellers(sellers),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasSellers.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default cartProduct
