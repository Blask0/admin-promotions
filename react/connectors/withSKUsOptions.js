import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getNamesByIds from '../graphql/getNamesByIds.graphql'

function withSKUsOptions(WrappedComponent) {
  class WithSKUsOptions extends Component {
    constructor(props) {
      super(props)

      this.state = {
        ids: [],
      }
    }

    updateQueryParams = ({ ids }) => {
      this.setState({ ids })
    }

    render() {
      const { ids } = this.state

      return (
        <Query
          query={getNamesByIds}
          variables={{ ids: ids, field: 'sku' }}
          fetchPolicy="network-only">
          {({ loading, error, data }) => {
            console.log('data : ', data)
            console.log('error : ', error)
            console.log('loading : ', loading)
            return (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                uploadedFile={
                  data ? (data.getNamesByIds ? data.getNamesByIds : {}) : {}
                }
                updateQueryParams={this.updateQueryParams}
              />
            )
          }}
        </Query>
      )
    }
  }

  return WithSKUsOptions
}

export default withSKUsOptions
