import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getPaymentMethods from '../graphql/getPaymentMethods.graphql';

function WithPaymentMethods(WrappedComponent) {
  class WithPaymentMethods extends Component {
    constructor(props) {
      super(props)

      this.state = {
        name: '',
        effect: ''
      }
    }

    updateQueryParams = ({ name, effect }) => {
      this.setState({ name, effect })
    }

    render() {
      const { name, effect } = this.state

      return (
        <Query 
          query={getPaymentMethods}
          variables={{ name, effect }}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              paymentMethods={data ? data.getPaymentMethods : []}
              updateQueryParams={this.updateQueryParams}
            />
          )}
        </Query>
      )
    }
  }

  return WithPaymentMethods
}

export default WithPaymentMethods
