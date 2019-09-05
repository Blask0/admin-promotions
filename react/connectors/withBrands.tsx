import React, { useState } from 'react'
import { Query } from 'react-apollo'

import getBrands from '../graphql/getBrands.graphql'

export type BrandsData = {
  getBrands?: {
    id: string
    name: string
  }[]
}

export type Brand = {
  id: string
  name: string
}

export type WithBrandsProps = {
  searchForBrands: (searchTerm: string) => React.SetStateAction<string>
}

const withBrands = <T extends WithBrandsProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithBrands = (props: T) => {
    const [name, setName] = useState('')

    return (
      <Query<BrandsData> query={getBrands} variables={{ name }}>
        {({ loading, error, data }) => (
          <WrappedComponent
            {...props}
            loading={loading}
            error={error}
            brands={data && data.getBrands}
            searchForBrands={searchTerm => setName(searchTerm)}
          />
        )}
      </Query>
    )
  }

  return WithBrands
}

export default withBrands
