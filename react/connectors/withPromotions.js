import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { injectIntl } from 'react-intl'

import getPromotions from '../graphql/getPromotions.graphql'

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
      const { intl } = this.props

      return (
        <Query
          query={getPromotions}
          variables={{ name, effect }}
          fetchPolicy="network-only">
          {({ loading, error, data, refetch }) => {
            return (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                refetchPromotions={refetch}
                promotions={data ? data.getPromotions : []}
                updateQueryParams={this.updateQueryParams}
              />
            )
          }}
        </Query>
      )
    }
  }

  return injectIntl(WithPromotions)
}

export default withPromotions
