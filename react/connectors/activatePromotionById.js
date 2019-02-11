import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import activatePromotionById from '../graphql/activatePromotionById.graphql'

function archivingPromotioById(WrappedComponent) {
  class ArchivingPromotioById extends Component {
    render() {
      return (
        <Mutation mutation={activatePromotionById}>
          {(activatePromotionById, { data }) => (
            <WrappedComponent
              {...this.props}
              activatePromotionById={activatePromotionById}
            />
          )}
        </Mutation>
      )
    }
  }

  return ArchivingPromotioById
}

export default archivingPromotioById
