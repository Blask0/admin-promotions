import { renderSelectObject } from '../../renders'

import withCategories from '../../../../connectors/withCategories'

const mapCategories = categories =>
  categories.map(category => ({
    label: category.name,
    value: category.id,
  }))

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
        value: 'category.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withCategories,
              dataGetter: ({ categories = [] }) => mapCategories(categories),
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
        value: 'category.not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withCategories,
              dataGetter: ({ categories = [] }) => mapCategories(categories),
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
