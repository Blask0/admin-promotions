import { renderSelectObject } from '../../../conditions/renders'
import withSkus from '../../../../connectors/withSkus'

const mapSkus = skus =>
  skus.map(element => ({
    label: `${element.sku.id} - ${element.product.name} - ${element.sku.name}`,
    value: element.sku.id,
  }))

const sku = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.sku.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.sku.verb.any',
        }),
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withSkus,
              dataGetter: ({ skus = [] }) => mapSkus(skus),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.sku.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.sku.verb.not.any',
        }),
        value: 'not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withSkus,
              dataGetter: ({ skus = [] }) => mapSkus(skus),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.sku.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default sku
