import { renderSelectObject } from '../../../conditions/renders'
import withCollections from '../../../../connectors/withCollections'
import { mapCollectionsToSelect } from '../../../mappers'

const collection = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.collection.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.collection.verb.any',
        }),
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withCollections,
              dataGetter: ({ collections = [] }) =>
                mapCollectionsToSelect(collections),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.collection.placeholder',
            }),
            multi: true,
            update: update,
            intl: intl,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.collection.verb.not.any',
        }),
        value: 'not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withCollections,
              dataGetter: ({ collections = [] }) =>
                mapCollectionsToSelect(collections),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.collection.placeholder',
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

export default collection
