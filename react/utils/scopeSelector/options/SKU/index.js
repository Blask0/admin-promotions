import { renderSelectObject } from '../../../conditions/renders'
import withSkus from '../../../../connectors/withSkus'
import withSKUsOptions from '../../../../connectors/withSKUsOptions'
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
              modalTitle: 'promotions.promotion.import.modal.title.sku',
              connector: withUploadedFileInfo,
              name: 'sku',
            },
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
              modalTitle: 'promotions.promotion.import.modal.title.sku',
              connector: withSKUsOptions,
              name: 'sku',
            },
          },
        },
      },
    ],
  }
}

export default sku
