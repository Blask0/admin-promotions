import { renderInputObject, renderSelectObject } from '../../renders'

const utm = (intl, update, type) => {
  return {
    label: intl.formatMessage({
      id: `promotions.promotion.elligibility.utm${type}.label`,
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

export default utm
