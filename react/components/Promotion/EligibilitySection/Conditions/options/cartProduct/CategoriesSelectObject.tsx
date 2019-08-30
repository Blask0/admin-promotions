import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import { SelectObject, SelectObjectProps } from '../../Objects'

import withCategories, {
  CategoriesData,
  WithCategoriesProps,
} from '../../../../../../connectors/withCategories'

interface Props extends SelectObjectProps, WithCategoriesProps {
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
    options={categories.map(categorie => ({
      label: categorie.name,
      value: categorie.id,
    }))}
    onSearch={searchForCategories}
  />
)

export default withCategories<Props>(injectIntl<Props>(CategoriesSelectObject))
