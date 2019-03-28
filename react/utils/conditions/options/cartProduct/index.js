import {
  renderInputCurrencyObject,
  renderRangeInputCurrencyObject,
  renderSelectObject,
} from '../../renders'

import withBrands from '../../../../connectors/withBrands'
import withCollections from '../../../../connectors/withCollections'
import withCategories from '../../../../connectors/withCategories'
import withProducts from '../../../../connectors/withProducts'
import withSkus from '../../../../connectors/withSkus'
import withSellers from '../../../../connectors/withSellers'

import {
  mapBrandsToSelect,
  mapCollectionsToSelect,
  mapCategoriesToSelect,
  mapProductsToSelect,
  mapSkusToSelect,
  mapSellersToSelect,
} from '../../../mappers'

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
              dataGetter: ({ brands = [] }) => mapBrandsToSelect(brands),
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
              dataGetter: ({ brands = [] }) => mapBrandsToSelect(brands),
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
              dataGetter: ({ collections = [] }) =>
                mapCollectionsToSelect(collections),
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
              dataGetter: ({ collections = [] }) =>
                mapCollectionsToSelect(collections),
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
              dataGetter: ({ categories = [] }) =>
                mapCategoriesToSelect(categories),
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
              dataGetter: ({ categories = [] }) =>
                mapCategoriesToSelect(categories),
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
              dataGetter: ({ products = [] }) => mapProductsToSelect(products),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasProducts.placeholder',
            }),
            multi: true,
            update: update,
            bulk: {
              modalTitle: 'promotions.promotion.import.modal.title.product',
              notFoundIdCallback: () => alert('ola'),
            },
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
              dataGetter: ({ products = [] }) => mapProductsToSelect(products),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasProducts.placeholder',
            }),
            multi: true,
            update: update,
            bulk: {
              modalTitle: 'promotions.promotion.import.modal.title.product',
            },
          },
        },
      },
      // HAS SKUS
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.sku.any',
        }),
        value: 'sku.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withSkus,
              dataGetter: ({ skus = [] }) => mapSkusToSelect(skus),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasSkus.placeholder',
            }),
            multi: true,
            update: update,
            bulk: {
              modalTitle: 'promotions.promotion.import.modal.title.sku',
            },
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.cartProduct.verb.sku.not.any',
        }),
        value: 'sku.not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withSkus,
              dataGetter: ({ skus = [] }) => mapSkusToSelect(skus),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.hasSkus.placeholder',
            }),
            multi: true,
            update: update,
            bulk: {
              modalTitle: 'promotions.promotion.import.modal.title.sku',
            },
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
            intl: intl,
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
              dataGetter: ({ sellers = [] }) => mapSellersToSelect(sellers),
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
              dataGetter: ({ sellers = [] }) => mapSellersToSelect(sellers),
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
