import { renderInputObject } from '../../renders'

const utmSource = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.utmSource.label',
    }),
    verbs: [
      {
        label: 'is',
        value: '==',
        object: {
          renderFn: renderInputObject,
          extraParams: {
            update: update,
          },
        },
      },
      {
        label: 'is not',
        value: '!=',
        object: {
          renderFn: renderInputObject,
          extraParams: {
            update: update,
          },
        },
      },
    ],
  }
}

export default utmSource
