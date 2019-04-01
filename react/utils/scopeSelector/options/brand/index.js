import { renderSelectObject } from '../../../conditions/renders'
import withBrands from '../../../../connectors/withBrands'
import { mapBrandsToSelect } from '../../../mappers'

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
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withBrands,
              dataGetter: ({ brands = [] }) => mapBrandsToSelect(brands),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.brand.placeholder',
            }),
            multi: true,
            update: update,
            intl: intl,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.brand.verb.not.any',
        }),
        value: 'not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withBrands,
              dataGetter: ({ brands = [] }) => mapBrandsToSelect(brands),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.brand.placeholder',
            }),
            multi: true,
            update: update,
            intl: intl,
          },
        },
      },
    ],
  }
}

export default brand
