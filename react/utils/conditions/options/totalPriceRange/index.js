import { renderRangeInputObject, renderInputObject } from '../../renders'

const totalPriceRange = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.totalPriceRange.label',
    }),
    verbs: [
      {
        label: 'is greather than',
        value: '>',
        object: {
          renderFn: renderInputObject,
          extraParams: {
            update: update,
          },
        },
      },
      {
        label: 'is smaller than',
        value: '<',
        object: {
          renderFn: renderInputObject,
          extraParams: {
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
            update: update,
          },
        },
      },
    ],
  }
}

export default totalPriceRange
