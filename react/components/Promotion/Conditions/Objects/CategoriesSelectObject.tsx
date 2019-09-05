import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import withCategories, {
  CategoriesData,
  WithCategoriesProps,
} from '../../../../connectors/withCategories'

import { SelectObject, SelectObjectProps } from '.'
import { mapCategoriesToSelect } from '../../../../utils/mappers'

export interface Props extends SelectObjectProps, WithCategoriesProps {
  categories: CategoriesData['getCategories']
}

const CategoriesSelectObject: React.FC<Props & InjectedIntlProps> = ({
  categories = [],
  intl,
  searchForCategories,
  ...props
}) => (
  <SelectObject
    {...props}
    multi
    placeholder={intl.formatMessage({
      id:
        'promotions.promotion.elligibility.cartProduct.hasCategories.placeholder',
    })}
    options={mapCategoriesToSelect(categories)}
    onSearch={searchForCategories}
  />
)

export default withCategories<Props>(injectIntl<Props>(CategoriesSelectObject))
