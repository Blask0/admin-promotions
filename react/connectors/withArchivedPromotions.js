import React, { Component } from 'react'
import { Query } from 'react-apollo'

import archivedPromotions from '../graphql/archivedPromotions.graphql'

function withArchivedPromotions(WrappedComponent) {
  class WithArchivedPromotions extends Component {
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
        <Query query={archivedPromotions} variables={{ name, effect }}>
          {({ loading, error, data }) => (
            <WrappedComponent
              {...this.props}
              archivedPromotionsLoading={loading}
              archivedPromotionsError={error}
              archivedPromotions={data ? data.archivedPromotions : []}
              updateArchivedPromotionsQueryParams={this.updateQueryParams}
            />
          )}
        </Query>
      )
    }
  }

  return WithArchivedPromotions
}

export default withArchivedPromotions
