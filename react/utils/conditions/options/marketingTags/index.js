import { renderSelectObject } from '../../renders'

const marketingTags = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.marketingTags.label',
    }),
    verbs: [
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
              id: 'promotions.promotion.elligibility.marketingTags.placeholder',
            }),
            validation: {
              execute: value => !!value.match(/^\w+=\w+/g),
              errorMessage: intl.formatMessage({
                id:
                  'promotions.promotion.elligibility.marketingTags.errorMessage',
              }),
            },
            multi: true,
            creatable: true,
            update: update,
          },
        },
      },
      {
        label: 'is not any of',
        value: 'not.any',
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
              id: 'promotions.promotion.elligibility.marketingTags.placeholder',
            }),
            validation: {
              execute: value => !!value.match(/^\w+=\w+/g),
              errorMessage: intl.formatMessage({
                id:
                  'promotions.promotion.elligibility.marketingTags.errorMessage',
              }),
            },
            multi: true,
            creatable: true,
            update: update,
          },
        },
      },
    ],
  }
}

export default marketingTags
