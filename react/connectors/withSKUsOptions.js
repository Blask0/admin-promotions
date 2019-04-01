import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getUploadedFileInfo from '../graphql/getUploadedFileInfo.graphql'

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
          query={getUploadedFileInfo}
          variables={{ ids: ids, field: 'sku' }}
          fetchPolicy="network-only">
          {({ loading, error, data }) => {
            return (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                uploadedFile={
                  data
                    ? data.getUploadedFileInfo
                      ? data.getUploadedFileInfo
                      : {}
                    : {}
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
