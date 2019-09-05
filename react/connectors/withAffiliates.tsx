import React from 'react'
import { Query } from 'react-apollo'

import getAffiliates from '../graphql/getAffiliates.graphql'

export type AffiliatesMethodsData = {
  getAffiliates?: {
    id: string
    name: string
  }[]
}

const withAffiliates = <T extends {}>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithAffiliatess = (props: T) => (
    <Query<AffiliatesMethodsData> query={getAffiliates}>
      {({ loading, error, data }) => (
        <WrappedComponent
          {...props}
          loading={loading}
          error={error}
          affiliates={data && data.getAffiliates}
        />
      )}
    </Query>
  )

  return WithAffiliatess
}

export default withAffiliates
