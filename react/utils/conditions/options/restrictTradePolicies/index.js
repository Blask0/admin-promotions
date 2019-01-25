import { renderInputObject, renderSelectObject } from '../../renders'

const restrictTradePoliciesStatement = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.restrictTradePolicies.label',
    }),
    verbs: [
      {
        label: 'is',
        value: '==',
        object: {
          renderFn: renderInputObject,
          extraParams: {
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
              connector: WrappedComponent => props => (
                <WrappedComponent {...props} />
              ),
              dataGetter: () => [],
            },
            creatable: true,
            update: update,
            multi: true,
          },
        },
      },
    ],
  }
}

export default restrictTradePoliciesStatement
