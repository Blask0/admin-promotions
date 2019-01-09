import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getPromotions from '../graphql/getPromotions.graphql';

function withPromotions(WrappedComponent) {
  class WithPromotions extends Component {
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
          query={getPromotions}
          variables={{ name, effect }}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              promotions={data ? data.getPromotions : []}
              updateQueryParams={this.updateQueryParams}
            />
          )}
        </Query>
      )
    }
  }

  return WithPromotions
}

export default withPromotions
