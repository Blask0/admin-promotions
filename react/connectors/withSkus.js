import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getProductsAndSkus from '../graphql/getProductsAndSkus.graphql'

function withSkus(WrappedComponent) {
  class WithSkus extends Component {
    constructor(props) {
      super(props)

      this.state = {
        name: '',
      }
    }

    updateQueryParams = ({ name }) => {
      this.setState({ name })
    }

    render() {
      const { name } = this.state

      return (
        <Query query={getProductsAndSkus} variables={{ name }}>
          {({ loading, error, data }) => {
            const skus = []

            if (data && data.getProducts) {
              data.getProducts.products.forEach(product => {
                product.skus.forEach(sku => {
                  skus.push(sku)
                })
              })
            }
            return (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                skus={skus}
                updateQueryParams={this.updateQueryParams}
              />
            )
          }}
        </Query>
      )
    }
  }

  return WithSkus
}

export default withSkus
