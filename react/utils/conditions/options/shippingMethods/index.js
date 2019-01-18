import { renderSelectObject } from '../../renders'

import withShippingMethods from '../../../../connectors/withShippingMethods'

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
              dataGetter: ({ shippingMethods = [] }) =>
                shippingMethods.map(shippingMethod => ({
                  label: shippingMethod.name,
                  value: shippingMethod.id,
                })),
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
              dataGetter: ({ shippingMethods = [] }) =>
                shippingMethods.map(shippingMethod => ({
                  label: shippingMethod.name,
                  value: shippingMethod.id,
                })),
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
