import React from 'react'
import { InjectedIntl } from 'react-intl'

import {
  SelectObject,
  SelectObjectProps,
} from '../../../../components/Promotion/EligibilitySection/Conditions/Objects'

import withPaymentMethods, {
  PaymentMethodsData,
} from '../../../../connectors/withPaymentMethods'

interface Props extends SelectObjectProps {
  paymentMethods: PaymentMethodsData['getPaymentMethods']
}

const PaymentMethodsSelect: React.FC<Props> = ({
  paymentMethods = [],
  ...props
}) => (
  <SelectObject
    {...props}
    options={paymentMethods.map(paymentMethod => ({
      label: paymentMethod.name,
      value: paymentMethod.id,
    }))}
  />
)

const PaymentMethodsSelectObject = withPaymentMethods<Props>(
  PaymentMethodsSelect
)

const paymentMethods = (intl: InjectedIntl) => {
  return {
    label: intl.formatMessage({
      id: 'promotions.promotion.elligibility.paymentMethods.label',
    }),
    verbs: [
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.paymentMethods.verb.==',
        }),
        value: '==',
        object: (props: any) => (
          <PaymentMethodsSelectObject {...props} multi={false} />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.paymentMethods.verb.!=',
        }),
        value: '!=',
        object: (props: any) => (
          <PaymentMethodsSelectObject {...props} multi={false} />
        ),
      },
      {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.paymentMethods.verb.any',
        }),
        value: 'any',
        object: (props: any) => <PaymentMethodsSelectObject {...props} multi />,
      },
    ],
  }
}

export default paymentMethods
