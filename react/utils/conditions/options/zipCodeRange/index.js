import { renderRangeInputObject } from '../../renders'

const zipCodeRange = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.zipCodeRange.label',
    }),
    verbs: [
      {
        label: 'is between',
        value: 'between',
        object: {
          renderFn: renderRangeInputObject,
          extraParams: {
            update: update,
          },
        },
      },
      {
        label: 'is not between',
        value: 'not between',
        object: {
          renderFn: renderRangeInputObject,
          extraParams: {
            update: update,
          },
        },
      },
    ],
  }
}

export default zipCodeRange
