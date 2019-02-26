import { renderSelectObject } from '../../../conditions/renders'
import withSellers from '../../../../connectors/withSellers'

const mapSellers = sellers =>
  sellers.map(seller => ({
    label: seller.name,
    value: seller.id,
  }))

const seller = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.seller.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.seller.verb.any',
        }),
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withSellers,
              dataGetter: ({ sellers = [] }) => mapSellers(sellers),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.seller.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.seller.verb.not.any',
        }),
        value: 'not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withSellers,
              dataGetter: ({ sellers = [] }) => mapSellers(sellers),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.seller.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default seller
