import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import { SelectObject, SelectObjectProps } from '../../Objects'

import withCollections, {
  CollectionsData,
  WithCollectionsProps,
} from '../../../../../../connectors/withCollections'

interface Props extends SelectObjectProps, WithCollectionsProps {
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
    options={collections.map(collection => ({
      label: collection.name,
      value: collection.id,
    }))}
    onSearch={searchForCollections}
  />
)

export default withCollections<Props>(
  injectIntl<Props>(CollectionsSelectObject)
)
