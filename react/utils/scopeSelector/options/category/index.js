import { renderSelectObject } from '../../../conditions/renders'
import withCategories from '../../../../connectors/withCategories'
import { mapCategoriesToSelect } from '../../../mappers'

const category = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.category.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.category.verb.any',
        }),
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withCategories,
              dataGetter: ({ categories = [] }) =>
                mapCategoriesToSelect(categories),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.category.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.category.verb.not.any',
        }),
        value: 'not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withCategories,
              dataGetter: ({ categories = [] }) =>
                mapCategoriesToSelect(categories),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.category.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default category
