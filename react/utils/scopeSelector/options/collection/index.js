import {
  renderInputCurrencyObject,
  renderRangeInputCurrencyObject,
  renderSelectObject,
} from '../../renders'

import withCollections from '../../../../connectors/withCollections'

const mapCollections = collections =>
  collections.map(collection => ({
    label: collection.name,
    value: collection.id,
  }))

const cartProduct = (intl, update, currencyCode) => {
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
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.brand.not.any',
        }),
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
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.collection.any',
        }),
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
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.collection.not.any',
        }),
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
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.category.any',
        }),
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
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.category.not.any',
        }),
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
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.product.any',
        }),
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
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.product.not.any',
        }),
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
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.itemPriceRange.gt',
        }),
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
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.itemPriceRange.lt',
        }),
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
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.itemPriceRange.between',
        }),
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
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.fromToPrices',
        }),
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
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.seller.any',
        }),
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
        label: intl.formatMessage({
          id:
            'promotions.promotion.elligibility.cartProduct.verb.seller.not.any',
        }),
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
