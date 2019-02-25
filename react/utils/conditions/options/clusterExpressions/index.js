import { renderInputObject, renderSelectObject } from '../../renders'

const clusterExpressions = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.clusterExpressions.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.clusterExpressions.verb.==',
        }),
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
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.clusterExpressions.verb.any',
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
