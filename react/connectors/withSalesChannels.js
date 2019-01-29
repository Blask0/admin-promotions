import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getSalesChannels from '../graphql/getSalesChannels.graphql'

function withSalesChannels(WrappedComponent) {
  class WithSalesChannels extends Component {
    render() {
      return (
        <Query query={getSalesChannels}>
          {({ loading, error, data }) => {
            const seen = {}
            const salesChannels =
              data && data.getSalesChannels
                ? data.getSalesChannels.filter(({ id }) =>
                  seen.hasOwnProperty(id) ? false : (seen[id] = true)
                )
                : []

            return (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                salesChannels={salesChannels || []}
              />
            )
          }}
        </Query>
      )
    }
  }

  return WithSalesChannels
}

export default withSalesChannels
