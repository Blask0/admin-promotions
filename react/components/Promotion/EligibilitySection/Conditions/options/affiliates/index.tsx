import React from 'react'
import { InjectedIntl } from 'react-intl'

import { SelectObject, SelectObjectProps } from '../../Objects'

import withAffiliates, {
  AffiliatesMethodsData,
} from '../../../../../../connectors/withAffiliates'

interface Props extends SelectObjectProps {
  affiliates: AffiliatesMethodsData['getAffiliates']
}

const AffiliatesSelect: React.FC<Props> = ({ affiliates = [], ...props }) => (
  <SelectObject
    {...props}
    options={affiliates.map(affiliate => ({
      label: affiliate.name,
      value: affiliate.id,
    }))}
  />
)

const AffiliatesSelectObject = withAffiliates<Props>(AffiliatesSelect)

const affiliates = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.affiliates.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.affiliates.verb.==',
        }),
        value: '==',
        object: (props: any) => (
          <AffiliatesSelectObject
            {...props}
            multi={false}
            placeholder={intl.formatMessage({
              id: 'promotions.promotion.elligibility.affiliates.placeholder',
            })}
          />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.affiliates.verb.!=',
        }),
        value: '!=',
        object: (props: any) => (
          <AffiliatesSelectObject
            {...props}
            multi={false}
            placeholder={intl.formatMessage({
              id: 'promotions.promotion.elligibility.affiliates.placeholder',
            })}
          />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.affiliates.verb.any',
        }),
        value: 'any',
        object: (props: any) => (
          <AffiliatesSelectObject
            {...props}
            multi
            placeholder={intl.formatMessage({
              id: 'promotions.promotion.elligibility.affiliates.placeholder',
            })}
          />
        ),
      },
    ],
  }
}

export default affiliates
