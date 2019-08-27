import React from 'react'
import { Query } from 'react-apollo'

import getShippingMethods from '../graphql/getShippingMethods.graphql'

export type ShippingMethodsData = {
  getShippingMethods?: {
    id: number
    name: string
  }[]
}

const withShippingMethods = <T extends {}>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithShippingMethods = (props: T) => (
    <Query<ShippingMethodsData> query={getShippingMethods}>
      {({ loading, error, data }) => (
        <WrappedComponent
          {...props}
          loading={loading}
          error={error}
          shippingMethods={data && data.getShippingMethods}
        />
      )}
    </Query>
  )

  return WithShippingMethods
}

export default withShippingMethods
