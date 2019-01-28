import { renderInputObject, renderRangeInputObject } from '../../renders'

const cartProduct = (intl, update) => {
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
          renderFn: renderInputObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            }),
            update: update,
          },
        },
      },
      {
        label: 'with price less than',
        value: '<',
        object: {
          renderFn: renderInputObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            }),
            update: update,
          },
        },
      },
      {
        label: 'with price between',
        value: 'between',
        object: {
          renderFn: renderRangeInputObject,
          extraParams: {
            placeholder: intl.formatMessage({
              id:
                'promotions.promotion.elligibility.cartProduct.itemPriceRange.placeholder',
            }),
            update: update,
          },
        },
      },
    ],
  }
}

export default cartProduct
