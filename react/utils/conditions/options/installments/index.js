import { renderInputObject, renderRangeInputObject } from '../../renders'

const installments = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.installments.label',
    }),
    verbs: [
      {
        label: 'is greater than',
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
        label: 'is less than',
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
        label: 'is between',
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
