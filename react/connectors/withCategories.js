import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getCategories from '../graphql/getCategories.graphql'

function withCategories(WrappedComponent) {
  class WithCategories extends Component {
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
        <Query query={getCategories} variables={{ name }}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              categories={data ? data.getCategories : []}
            />
          )}
        </Query>
      )
    }
  }

  return WithCategories
}

export default withCategories
