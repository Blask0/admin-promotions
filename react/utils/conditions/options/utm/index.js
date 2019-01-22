import { renderInputObject, renderSelectObject } from '../../renders'

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
      {
        // TODO
        label: 'is any of',
        value: 'any',
        object: {
          renderFn: renderInputObject,
          extraParams: {
            update: update,
          },
        },
      },
      {
        label: 'starts with',
        value: 'starts',
        object: {
          renderFn: renderInputObject,
          extraParams: {
            update: update,
          },
        },
      },
      {
        label: 'ends with',
        value: 'ends',
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
