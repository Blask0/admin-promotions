import React, { useState } from 'react'
import { Query } from 'react-apollo'

import getProductsAndSkus from '../graphql/getProductsAndSkus.graphql'

export type ProductsAndSkusData = {
  getProducts?: {
    products: {
      id: string
      name: string
      skus?: {
        id: string
        name: string
      }[]
    }[]
  }
}

export type Sku = {
  id: string
  name: string
  product: {
    id: string
    name: string
  }
}

export type WithSkusProps = {
  searchForSkus: (searchTerm: string) => React.SetStateAction<string>
}

const withSkus = <T extends WithSkusProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithSkus = (props: T) => {
    const [name, setName] = useState('')

    return (
      <Query<ProductsAndSkusData>
        query={getProductsAndSkus}
        variables={{ name }}>
        {({ loading, error, data }) => {
          const skus =
            data && data.getProducts
              ? data.getProducts.products.reduce<Sku[]>((skus, product) => {
                  const { skus: _, ...productOnly } = product
                  const currentProductSkus = product.skus
                    ? product.skus.map<Sku>(sku => ({
                        ...sku,
                        product: productOnly,
                      }))
                    : []
                  return skus.concat(currentProductSkus)
                }, [])
              : []

          return (
            <WrappedComponent
              {...props}
              loading={loading}
              error={error && error.message}
              skus={skus}
              searchForSkus={searchTerm => setName(searchTerm)}
            />
          )
        }}
      </Query>
    )
  }

  return WithSkus
}

export default withSkus
