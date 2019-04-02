import { renderSelectObject } from '../../../conditions/renders'
import withSkus from '../../../../connectors/withSkus'
import withUploadedFileInfo from '../../../../connectors/withUploadedFileInfo'
import { mapSkusToSelect } from '../../../mappers'

const sku = (intl, update) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.scopeSelector.sku.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.sku.verb.any',
        }),
        value: 'any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withSkus,
              dataGetter: ({ skus = [] }) => mapSkusToSelect(skus),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.sku.placeholder',
            }),
            multi: true,
            update: update,
            bulk: {
              connector: withUploadedFileInfo,
              name: 'sku',
            },
            intl: intl,
          },
        },
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.scopeSelector.sku.verb.not.any',
        }),
        value: 'not.any',
        object: {
          renderFn: renderSelectObject,
          extraParams: {
            queryInfo: {
              connector: withSkus,
              dataGetter: ({ skus = [] }) => mapSkusToSelect(skus),
            },
            placeholder: intl.formatMessage({
              id: 'promotions.promotion.scopeSelector.sku.placeholder',
            }),
            multi: true,
            update: update,
            bulk: {
              connector: withUploadedFileInfo,
              name: 'sku',
            },
            intl: intl,
          },
        },
      },
    ],
  }
}

export default sku
