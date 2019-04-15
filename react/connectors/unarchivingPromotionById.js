import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import unarchivePromotionById from '../graphql/unarchivePromotionById.graphql'

function unarchivingPromotionById(WrappedComponent) {
  class UnarchivingPromotionById extends Component {
    render() {
      return (
        <Mutation mutation={unarchivePromotionById}>
          {(unarchivePromotionById, { data }) => (
            <WrappedComponent
              {...this.props}
              unarchivePromotionById={unarchivePromotionById}
            />
          )}
        </Mutation>
      )
    }
  }

  return UnarchivingPromotionById
}

export default unarchivingPromotionById
