import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getAuditInfo from '../graphql/getAuditInfo.graphql'

function withAuditInfo(WrappedComponent) {
  class WithAuditInfo extends Component {
    constructor(props) {
      super(props)

      this.state = {
        name: '',
      }
    }

    updateQueryParams = ({ name }) => {
      this.setState({ name })
    }

    render = () => {
      const { promoId } = this.state
      console.log('vou fazer  query')
      return (
        <Query query={getAuditInfo} variables={{ promoId }}>
          {({ loading, error, data }) => {
            return (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                auditInfo={data ? data.getAuditInfo : []}
                updateQueryParams={this.updateQueryParams}
              />
            )
          }}
        </Query>
      )
    }
  }

  return WithAuditInfo
}

export default withAuditInfo
