import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getBrands from '../graphql/getBrands.graphql'

function withBrands(WrappedComponent) {
  class WithBrands extends Component {
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
        <Query query={getBrands} variables={{ name }}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              brands={data ? data.getBrands : []}
              updateQueryParams={this.updateQueryParams}
            />
          )}
        </Query>
      )
    }
  }

  return WithBrands
}

export default withBrands
