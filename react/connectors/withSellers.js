import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getSellers from '../graphql/getSellers.graphql'

function withSellers(WrappedComponent) {
  class WithSellers extends Component {
    render = () => {
      return (
        <Query query={getSellers}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              sellers={data ? data.getSellers : []}
            />
          )}
        </Query>
      )
    }
  }

  return WithSellers
}

export default withSellers
