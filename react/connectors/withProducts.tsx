import React, { useState } from 'react'
import { Query } from 'react-apollo'

import getProducts from '../graphql/getProducts.graphql'

export type ProductsData = {
  getProducts?: {
    products: {
      id: string
      name: string
    }[]
  }
}

export type Product = {
  id: string
  name: string
}

export type WithProductsProps = {
  searchForProducts: (searchTerm: string) => React.SetStateAction<string>
}

const withProducts = <T extends WithProductsProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithProducts = (props: T) => {
    const [name, setName] = useState('')

    return (
      <Query<ProductsData> query={getProducts} variables={{ name }}>
        {({ loading, error, data }) => (
          <WrappedComponent
            {...props}
            loading={loading}
            error={error && error.message}
            productsData={data && data.getProducts}
            searchForProducts={searchTerm => setName(searchTerm)}
          />
        )}
      </Query>
    )
  }

  return WithProducts
}

export default withProducts
