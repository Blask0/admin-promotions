import { renderSelectObject } from '../../renders'

import withBrands from '../../../../connectors/withBrands'

const mapBrands = brands =>
  brands.map(brand => ({
    label: brand.name,
    value: brand.id,
  }))

const brand = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.brand.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.brand.verb.any',
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
              id: 'promotions.promotion.scopeSelector.brand.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.brand.verb.not.any',
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
              id: 'promotions.promotion.scopeSelector.brand.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default brand
