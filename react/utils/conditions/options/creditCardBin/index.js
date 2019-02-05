import { renderSelectObject } from '../../renders'

const creditCardBin = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.creditCardBin.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.creditCardBin.verb.any',
        }),
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: WrappedComponent => props => (
                <WrappedComponent {...props} />
              ),
              dataGetter: () => [],
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.elligibility.creditCardBin.placeholder',
            }),
            multi: true,
            creatable: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default creditCardBin
