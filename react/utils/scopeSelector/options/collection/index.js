import { renderSelectObject } from '../../renders'

import withCollections from '../../../../connectors/withCollections'

const mapCollections = collections =>
  collections.map(collection => ({
    label: collection.name,
    value: collection.id,
  }))

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
              dataGetter: ({ collections = [] }) => mapCollections(collections),
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
              dataGetter: ({ collections = [] }) => mapCollections(collections),
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
