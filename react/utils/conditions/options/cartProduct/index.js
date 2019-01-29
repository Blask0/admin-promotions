import {
  renderInputCurrencyObject,
  renderRangeInputCurrencyObject,
} from '../../renders'

const cartProduct = (intl, update, currencyCode) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.cartProduct.label',
    }),
    verbs: [
      // ITEM PRICE RANGE
      {
        label: 'with price greater than',
        value: '>',
        object: {
          renderFn: renderInputCurrencyObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            }),
            locale: intl.locale,
            currencyCode: currencyCode,
            update: update,
          },
        },
      },
      {
        label: 'with price less than',
        value: '<',
        object: {
          renderFn: renderInputCurrencyObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            }),
            locale: intl.locale,
            currencyCode: currencyCode,
            update: update,
          },
        },
      },
      {
        label: 'with price between',
        value: 'between',
        object: {
          renderFn: renderRangeInputCurrencyObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            }),
            locale: intl.locale,
            currencyCode: currencyCode,
            update: update,
          },
        },
      },
    ],
  }
}

export default cartProduct
