import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getPromotions from '../graphql/getPromotions.graphql'
import { getErrorsInfo, cannotAccess } from '../utils/errors'
import NoAccessPage from '../NoAccessPage'

function withPromotions(WrappedComponent) {
  class WithPromotions extends Component {
    constructor(props) {
      super(props)

      this.state = {
        name: '',
        effect: '',
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
          variables={{ name, effect }}
          fetchPolicy="network-only">
          {({ loading, error, data }) => {
            const [errorInfo] = getErrorsInfo(error)
            return cannotAccess(errorInfo) ? (
              <NoAccessPage />
            ) : (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                promotions={data ? data.getPromotions : []}
                updatePromotionsQueryParams={this.updateQueryParams}
              />
            )
          }}
        </Query>
      )
    }
  }

  return WithPromotions
}

export default withPromotions
