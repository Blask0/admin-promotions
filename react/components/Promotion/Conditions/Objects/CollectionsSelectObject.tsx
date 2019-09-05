import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import withCollections, {
  CollectionsData,
  WithCollectionsProps,
} from '../../../../connectors/withCollections'

import { SelectObject, SelectObjectProps } from '.'
import { mapCollectionsToSelect } from '../../../../utils/mappers'

export interface Props extends SelectObjectProps, WithCollectionsProps {
  collections: CollectionsData['getCollections']
}

const CollectionsSelectObject: React.FC<Props & InjectedIntlProps> = ({
  collections = [],
  intl,
  searchForCollections,
  ...props
}) => (
  <SelectObject
    {...props}
    multi
    placeholder={intl.formatMessage({
      id:
        'promotions.promotion.elligibility.cartProduct.hasCollections.placeholder',
    })}
    options={mapCollectionsToSelect(collections)}
    onSearch={searchForCollections}
  />
)

export default withCollections<Props>(
  injectIntl<Props>(CollectionsSelectObject)
)
