import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import { SelectObject, SelectObjectProps } from '../../Objects'

import withSkus, { Sku, WithSkusProps } from '../../../../../../connectors/withSkus'

interface Props extends SelectObjectProps, WithSkusProps {
  skus: Sku[]
}

const SkusSelectObject: React.FC<Props & InjectedIntlProps> = ({
  intl,
  skus,
  searchForSkus,
  ...props
}) => (
  <SelectObject
    {...props}
    multi
    placeholder={intl.formatMessage({
      id: 'promotions.promotion.elligibility.cartProduct.hasSkus.placeholder',
    })}
    options={skus.map(sku => ({
      label: `${sku.id} - ${sku.product.name} - ${sku.name}`,
      value: sku.id,
    }))}
    onSearch={searchForSkus}
  />
)

export default withSkus<Props>(injectIntl<Props>(SkusSelectObject))
