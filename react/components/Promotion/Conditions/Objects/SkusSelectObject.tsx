import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import withSkus, { Sku, WithSkusProps } from '../../../../connectors/withSkus'

import { SelectObject, SelectObjectProps } from '.'
import { mapSkusToSelect } from '../../../../utils/mappers'

export interface Props extends SelectObjectProps, WithSkusProps {
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
    options={mapSkusToSelect(skus)}
    onSearch={searchForSkus}
  />
)

export default withSkus<Props>(injectIntl<Props>(SkusSelectObject))
