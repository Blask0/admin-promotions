import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getShippingMethods from '../graphql/getShippingMethods.graphql'

function withShippingMethods(WrappedComponent) {
  class WithShippingMethods extends Component {
    constructor(props) {
      super(props)
    }

    render = () => {
      return (
        <Query query={getShippingMethods}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              shippingMethods={data ? data.getShippingMethods : []}
            />
          )}
        </Query>
      )
    }
  }

  return WithShippingMethods
}

export default withShippingMethods
