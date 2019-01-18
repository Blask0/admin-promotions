import { renderSelectObject } from '../../renders'

import withShippingMethods from '../../../../connectors/withShippingMethods'

const map = shippingMethods =>
  shippingMethods.map(shippingMethod => ({
    label: shippingMethod.name,
    value: shippingMethod.id,
  }))

const shippingMethods = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.shippingMethod.label',
    }),
    verbs: [
      {
        label: 'is',
        value: '==',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withShippingMethods,
              dataGetter: ({ shippingMethods = [] }) => map(shippingMethods),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.shippingMethod.placeholder',
            }),
            multi: false,
            update: update,
          },
        },
      },
      {
        label: 'is any of',
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withShippingMethods,
              dataGetter: ({ shippingMethods = [] }) => map(shippingMethods),
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.shippingMethod.placeholder',
            }),
            multi: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default shippingMethods
