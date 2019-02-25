import { renderSelectObject } from '../../renders'

const map = paymentMethods =>
  paymentMethods.map(paymentMethod => ({
    label: paymentMethod.name,
    value: paymentMethod.id,
  }))

const firstBuy = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.firstBuy.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.firstBuy.verb.==',
        }),
        value: '==',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: WrappedComponent => props => (
                <WrappedComponent {...props} />
              ),
              dataGetter: () => [
                {
                  label: intl.formatMessage({
                    id: 'promotions.promotion.elligibility.firstBuy.true',
                  }),
                  value: true,
                },
                {
                  label: intl.formatMessage({
                    id: 'promotions.promotion.elligibility.firstBuy.false',
                  }),
                  value: false,
                },
              ],
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.elligibility.firstBuy.placeholder',
            }),
            update: update,
          },
        },
      },
    ],
  }
}

export default firstBuy
