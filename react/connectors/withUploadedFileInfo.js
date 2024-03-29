import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getUploadedFileInfo from '../graphql/getUploadedFileInfo.graphql'

function withUploadedFileInfo(WrappedComponent) {
  class WithUploadedFileInfo extends Component {
    constructor(props) {
      super(props)

      this.state = {
        ids: [],
        field: '',
      }
    }

    updateQueryParams = newState => {
      this.setState(newState)
    }

    render() {
      const { ids, field } = this.state
      const skip = !ids || ids.length === 0 || !field

      return (
        <Query
          query={getUploadedFileInfo}
          variables={{ ids: ids, field: field }}
          skip={skip}>
          {({ loading, error, data }) => {
            return (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                bulkInfo={data ? data.getUploadedFileInfo || {} : null}
                updateQueryParams={this.updateQueryParams}
              />
            )
          }}
        </Query>
      )
    }
  }

  return WithUploadedFileInfo
}

export default withUploadedFileInfo
