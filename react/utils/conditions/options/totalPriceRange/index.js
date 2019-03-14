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
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.totalPriceRange.verb.gt',
        }),
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
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.totalPriceRange.verb.lt',
        }),
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
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.totalPriceRange.verb.between',
        }),
        value: 'between',
        object: {
          renderFn: renderRangeInputCurrencyObject,
          extraParams: {
            locale: intl.locale,
            currencyCode: currencyCode,
            update: update,
            intl: intl,
          },
        },
      },
    ],
  }
}

export default totalPriceRange
