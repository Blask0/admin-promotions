import React from 'react'
import { InjectedIntl } from 'react-intl'

import {
  SelectObject,
  SelectObjectProps,
} from '../../../../components/Promotion/EligibilitySection/Conditions/Objects'

import withShippingMethods, {
  ShippingMethodsData,
} from '../../../../connectors/withShippingMethods'

interface Props extends SelectObjectProps {
  shippingMethods: ShippingMethodsData['getShippingMethods']
}

const ShippingMethodsSelect: React.FC<Props> = ({
  shippingMethods = [],
  ...props
}) => {
  return (
    <SelectObject
      {...props}
      options={shippingMethods.map(shippingMethod => ({
        label: shippingMethod.name,
        value: shippingMethod.id,
      }))}
    />
  )
}

const ShippingMethodsSelectObject = withShippingMethods<Props>(
  ShippingMethodsSelect
)

const shippingMethods = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.shippingMethod.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.shippingMethod.verb.==',
        }),
        value: '==',
        object: (props: any) => (
          <ShippingMethodsSelectObject
            {...props}
            multi={false}
            placeholder={intl.formatMessage({
              id:
                'promotions.promotion.elligibility.shippingMethod.placeholder',
            })}
          />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.shippingMethod.verb.!=',
        }),
        value: '!=',
        object: (props: any) => (
          <ShippingMethodsSelectObject
            {...props}
            multi={false}
            placeholder={intl.formatMessage({
              id:
                'promotions.promotion.elligibility.shippingMethod.placeholder',
            })}
          />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.shippingMethod.verb.any',
        }),
        value: 'any',
        object: (props: any) => (
          <ShippingMethodsSelectObject
            {...props}
            multi
            placeholder={intl.formatMessage({
              id:
                'promotions.promotion.elligibility.shippingMethod.placeholder',
            })}
          />
        ),
      },
    ],
  }
}

export default shippingMethods
