import React from 'react'
import { Query } from 'react-apollo'

import getPaymentMethods from '../graphql/getPaymentMethods.graphql'

export type PaymentMethodsData = {
  getPaymentMethods?: {
    id: string
    name: string
  }[]
}

const withPaymentMethods = <T extends {}>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithPaymentMethods = (props: T) => (
    <Query<PaymentMethodsData> query={getPaymentMethods}>
      {({ loading, error, data }) => (
        <WrappedComponent
          {...props}
          loading={loading}
          error={error}
          paymentMethods={data && data.getPaymentMethods}
        />
      )}
    </Query>
  )

  return WithPaymentMethods
}

export default withPaymentMethods
