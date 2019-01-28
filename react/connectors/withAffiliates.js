import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getAffiliates from '../graphql/getAffiliates.graphql'

function withAffiliates(WrappedComponent) {
  class WithAffiliatess extends Component {
    render = () => {
      return (
        <Query query={getAffiliates}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              affiliates={data ? data.getAffiliates : []}
            />
          )}
        </Query>
      )
    }
  }

  return WithAffiliatess
}

export default withAffiliates
