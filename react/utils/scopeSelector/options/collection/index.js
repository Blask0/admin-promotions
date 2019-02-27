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
              id: 'promotions.promotion.scopeSelector.collection.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.collection.verb.not.any',
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
              id: 'promotions.promotion.scopeSelector.collection.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default collection
