import { renderInputObject, renderRangeInputObject } from '../../renders'

const installments = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.installments.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.installments.verb.gt',
        }),
        value: '>',
        object: {
          renderFn: renderInputObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.elligibility.installments.placeholder',
            }),
            type: 'number',
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.installments.verb.lt',
        }),
        value: '<',
        object: {
          renderFn: renderInputObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.elligibility.installments.placeholder',
            }),
            type: 'number',
            update: update,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.installments.verb.between',
        }),
        value: 'between',
        object: {
          renderFn: renderRangeInputObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.elligibility.installments.placeholder',
            }),
            type: 'number',
            update: update,
          },
        },
      },
    ],
  }
}

export default installments
