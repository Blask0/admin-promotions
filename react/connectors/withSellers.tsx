import React, { useState } from 'react'
import { Query } from 'react-apollo'

import getSellers from '../graphql/getSellers.graphql'

export type SellersData = {
  getSellers?: {
    id: string
    name: string
  }[]
}

export type WithSellersProps = {
  searchForSellers: (searchTerm: string) => React.SetStateAction<string>
}

const withSellers = <T extends WithSellersProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithSellers = (props: T) => {
    const [name, setName] = useState('')

    return (
      <Query<SellersData> query={getSellers} variables={{ name }}>
        {({ loading, error, data }) => (
          <WrappedComponent
            {...props}
            loading={loading}
            error={error}
            collections={data && data.getSellers}
            searchForSellers={searchTerm => setName(searchTerm)}
          />
        )}
      </Query>
    )
  }

  return WithSellers
}

export default withSellers
