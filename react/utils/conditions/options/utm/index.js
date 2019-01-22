import { renderInputObject } from '../../renders'

const utm = (intl, update, type) => {
  const label = `promotions.promotion.elligibility.utm${type}.label`

  return {
    label: intl.formatMessage({
      id: label,
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

export default utm
