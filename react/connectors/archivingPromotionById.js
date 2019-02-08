import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import archivePromotionById from '../graphql/archivePromotionById.graphql'

function archivingPromotioById(WrappedComponent) {
  class ArchivingPromotioById extends Component {
    render() {
      return (
        <Mutation mutation={archivePromotionById}>
          {(archivePromotionById, { data }) => (
            <WrappedComponent
              {...this.props}
              archivePromotionById={archivePromotionById}
            />
          )}
        </Mutation>
      )
    }
  }

  return ArchivingPromotioById
}

export default archivingPromotioById
