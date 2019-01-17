import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getPaymentMethods from '../graphql/getPaymentMethods.graphql';

function withPaymentMethods(WrappedComponent) {
  class WithPaymentMethods extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <Query 
          query={getPaymentMethods}>
          {({ loading, error, data }) => {
            return ( 
                <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                paymentMethods={data.getPaymentMethods}
                />)
            }
          } 
        </Query>
      )
    }
  }

  return WithPaymentMethods
}

export default withPaymentMethods
