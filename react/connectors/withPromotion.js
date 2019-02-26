import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getPromotion from '../graphql/getPromotion.graphql'

function withPromotion(WrappedComponent) {
  class WithPromotion extends Component {
    constructor(props) {
      super(props)

      this.state = {
        id: undefined,
      }
    }

    updateQueryParams = ({ id }) => {
      this.setState({ id })
    }

    render() {
      const { id } = this.state

      return (
        <Query query={getPromotion} variables={{ id }}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              promotion={data ? data.getPromotion : undefined}
              updatePromotionQueryParams={this.updateQueryParams}
            />
          )}
        </Query>
      )
    }
  }

  return WithPromotion
}

export default withPromotion
