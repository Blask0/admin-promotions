import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import promotionActivation from '../graphql/promotionActivation.graphql'
import getPromotions from '../graphql/getPromotions.graphql'

function withPromotionActivation(WrappedComponent) {
  class WithPromotionActivation extends Component {
    render() {
      return (
        <Mutation mutation={promotionActivation}>
          {(promotionActivation, { loading }) => (
            <WrappedComponent
              {...this.props}
              loading={loading}
              promotionActivation={promotionActivation}
            />
          )}
        </Mutation>
      )
    }
  }

  return WithPromotionActivation
}

export default withPromotionActivation
