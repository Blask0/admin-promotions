import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getCollections from '../graphql/getCollections.graphql'

function withCollections(WrappedComponent) {
  class WithCollections extends Component {
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
        <Query query={getCollections} variables={{ name }}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              collections={data ? data.getCollections : []}
              updateQueryParams={this.updateQueryParams}
            />
          )}
        </Query>
      )
    }
  }

  return WithCollections
}

export default withCollections
