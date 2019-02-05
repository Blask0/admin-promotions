import { renderSelectObject } from '../../renders'

import withAffiliates from '../../../../connectors/withAffiliates'

const map = affiliates =>
  affiliates.map(affiliate => ({
    label: affiliate.name,
    value: affiliate.id,
  }))

const affiliates = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.affiliates.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.affiliates.verb.==',
        }),
        value: '==',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withAffiliates,
              dataGetter: ({ affiliates = [] }) => map(affiliates),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.elligibility.affiliates.placeholder',
            }),
            multi: false,
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.affiliates.verb.!=',
        }),
        value: '!=',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withAffiliates,
              dataGetter: ({ affiliates = [] }) => map(affiliates),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.elligibility.affiliates.placeholder',
            }),
            multi: false,
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.affiliates.verb.any',
        }),
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withAffiliates,
              dataGetter: ({ affiliates = [] }) => map(affiliates),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.elligibility.affiliates.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default affiliates
