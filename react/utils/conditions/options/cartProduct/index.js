import {
  renderInputCurrencyObject,
  renderRangeInputCurrencyObject,
  renderSelectObject,
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
      // LIST PRICE (NOT) EQUALS PRICE
      {
        label: 'with "from" and "to" prices',
        value: 'from/to',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: WrappedComponent => props => (
                <WrappedComponent {...props} />
              ),
              dataGetter: () => [
                {
                  label: intl.formatMessage({
                    id:
                      'promotions.promotion.elligibility.cartProduct.fromToPrices.equals',
                  }),
                  value: true,
                },
                {
                  label: intl.formatMessage({
                    id:
                      'promotions.promotion.elligibility.cartProduct.fromToPrices.notEquals',
                  }),
                  value: false,
                },
              ],
            },
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.fromToPrices.placeholder',
            }),
            update: update,
          },
        },
      },
    ],
  }
}

export default cartProduct
