import React, { Component } from 'react'
import { Query } from 'react-apollo'

import accountLimits from '../graphql/accountLimits.graphql'

function withAccountLimits(WrappedComponent) {
  class WithAccountLimits extends Component {
    render() {
      return (
        <Query query={accountLimits}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              accountLimits={data && data.accountLimits}
            />
          )}
        </Query>
      )
    }
  }

  return WithAccountLimits
}

export default withAccountLimits
