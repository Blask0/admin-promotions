import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getUploadedProducts from '../graphql/getUploadedProducts.graphql'

function withProductsOptions(WrappedComponent) {
  class WithProductsOptions extends Component {
    constructor(props) {
      super(props)

      this.state = {
        ids: [],
      }
    }

    updateQueryParams = ({ ids }) => {
      this.setState({ ids })
    }

    render() {
      const { ids } = this.state

      return (
        <Query
          query={getUploadedProducts}
          variables={{ ids }}
          fetchPolicy="network-only">
          {({ loading, error, data }) => {
            return (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                uploadedFile={
                  data
                    ? data.getUploadedProducts
                      ? data.getUploadedProducts
                      : {}
                    : {}
                }
                updateQueryParams={this.updateQueryParams}
              />
            )
          }}
        </Query>
      )
    }
  }

  return WithProductsOptions
}

export default withProductsOptions
