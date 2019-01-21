import { renderSelectObject } from '../../renders'

import withPaymentMethods from '../../../../connectors/withPaymentMethods' 

const map = paymentMethods =>
    paymentMethods.map(paymentMethod => ({
    label: paymentMethod.name,
    value: paymentMethod.id,
  }))

const paymentMethods = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.paymentMethods.label',
    }),
    verbs: [
        {
          label: 'is',
          value: '==',
          object: {
            renderFn: renderSelectObject,
            extraParams: {
              queryInfo: {
                connector: withPaymentMethods,
                dataGetter: ({ paymentMethods = [] }) => map(paymentMethods),
              },
              placeholder: intl.formatMessage({
                id:
                  'promotions.promotion.elligibility.paymentMethods.placeholder',
              }),
              multi: false,
              update: update,
            }
          }
        },
        {
          label: 'is not',
          value: '!=',
          object: {
            renderFn: renderSelectObject,
            extraParams: {
              queryInfo: {
                connector: withPaymentMethods,
                dataGetter: ({ paymentMethods = [] }) => map(paymentMethods),
              },
              placeholder: intl.formatMessage({
                id:
                  'promotions.promotion.elligibility.paymentMethods.placeholder',
              }),
              multi: false,
              update: update,
            }
          }
        },
        {
          label: 'is any of',
          value: 'any',
          object: {
            renderFn: renderSelectObject,
            extraParams: {
              queryInfo: {
                connector: withPaymentMethods,
                dataGetter: ({ paymentMethods = [] }) => map(paymentMethods),
              },
              placeholder: intl.formatMessage({
                id:
                  'promotions.promotion.elligibility.paymentMethods.placeholder',
              }),
              multi: true,
              update: update,
            }
          }
        }
      ]
  }
}

export default paymentMethods
