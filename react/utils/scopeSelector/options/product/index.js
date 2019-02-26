import { renderSelectObject } from '../../renders'

import withProducts from '../../../../connectors/withProducts'

const mapProducts = products =>
  products.map(product => ({
    label: `${product.id} - ${product.name}`,
    value: product.id,
  }))

const product = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.product.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.product.verb.any',
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
              id: 'promotions.promotion.scopeSelector.product.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.product.verb.not.any',
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
              id: 'promotions.promotion.scopeSelector.product.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default product
