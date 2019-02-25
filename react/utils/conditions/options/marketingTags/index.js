import { renderSelectObject } from '../../renders'

const marketingTags = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.marketingTags.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.marketingTags.verb.any',
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
              id: 'promotions.promotion.elligibility.marketingTags.placeholder',
            }),
            validation: {
              execute: selected =>
                selected.filter(({ value }) => !value.match(/^\w+=\w+/g))
                  .length === 0,
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
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.marketingTags.verb.not.any',
        }),
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
              execute: selected =>
                selected.filter(({ value }) => !value.match(/^\w+=\w+/g))
                  .length === 0,
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
