import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getProducts from '../graphql/getProducts.graphql'

function withProducts(WrappedComponent) {
  class WithProducts extends Component {
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
        <Query query={getProducts} variables={{ name }}>
          {({ loading, error, data }) => {
            return (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                products={
                  data
                    ? data.getProducts
                      ? data.getProducts.products
                      : []
                    : []
                }
                updateQueryParams={this.updateQueryParams}
              />
            )
          }}
        </Query>
      )
    }
  }

  return WithProducts
}

export default withProducts
