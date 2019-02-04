import {
  renderInputCurrencyObject,
  renderRangeInputCurrencyObject,
} from '../../renders'

const totalPriceRange = (intl, update, currencyCode) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.totalPriceRange.label',
    }),
    verbs: [
      {
        label: 'is greather than',
        value: '>',
        object: {
          renderFn: renderInputCurrencyObject,
          extraParams: {
            locale: intl.locale,
            currencyCode: currencyCode,
            update: update,
          },
        },
      },
      {
        label: 'is smaller than',
        value: '<',
        object: {
          renderFn: renderInputCurrencyObject,
          extraParams: {
            locale: intl.locale,
            currencyCode: currencyCode,
            update: update,
          },
        },
      },
      {
        label: 'is between',
        value: 'between',
        object: {
          renderFn: renderRangeInputCurrencyObject,
          extraParams: {
            locale: intl.locale,
            currencyCode: currencyCode,
            update: update,
          },
        },
      },
    ],
  }
}

export default totalPriceRange
