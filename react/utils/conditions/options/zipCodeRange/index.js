import { renderRangeInputObject } from '../../renders'

const zipCodeRange = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.zipCodeRange.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.zipCodeRange.verb.between',
        }),
        value: 'between',
        object: {
          renderFn: renderRangeInputObject,
          extraParams: {
            update: update,
            intl: intl,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.zipCodeRange.verb.not.between',
        }),
        value: 'not.between',
        object: {
          renderFn: renderRangeInputObject,
          extraParams: {
            update: update,
            intl: intl,
          },
        },
      },
    ],
  }
}

export default zipCodeRange
