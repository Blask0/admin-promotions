import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getPromotion from '../graphql/getPromotion.graphql'

function withPromotion(WrappedComponent) {
  class WithPromotion extends Component {
    constructor(props) {
      super(props)

      this.state = {
        id: props.params.id,
      }
    }

    componentWillMount() {
      window.postMessage({ action: { type: 'START_LOADING' } }, '*')
    }

    render() {
      const { id } = this.state

      return (
        <Query
          query={getPromotion}
          variables={{ id }}
          fetchPolicy="network-only">
          {({ loading, error, data }) =>
            loading ? null : (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                promotion={data ? data.getPromotion : undefined}
              />
            )
          }
        </Query>
      )
    }
  }

  return WithPromotion
}

export default withPromotion
