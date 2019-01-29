import { renderInputObject, renderSelectObject } from '../../renders'

const clusterExpressions = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.clusterExpressions.label',
    }),
    verbs: [
      {
        label: 'is',
        value: '==',
        object: {
          renderFn: renderInputObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.clusterExpressions.placeholder',
            }),
            type: 'string',
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
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.clusterExpressions.placeholder',
            }),
            type: 'string',
            creatable: true,
            update: update,
            multi: true,
          },
        },
      },
    ],
  }
}

export default clusterExpressions
