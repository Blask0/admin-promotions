import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import savePromotion from '../graphql/savePromotion.graphql'

function savingPromotion(WrappedComponent) {
  class SavingPromotion extends Component {
    render() {
      return (
        <Mutation mutation={savePromotion}>
          {(savePromotion, { data }) => (
            <WrappedComponent {...this.props} savePromotion={savePromotion} />
          )}
        </Mutation>
      )
    }
  }

  return SavingPromotion
}

export default savingPromotion
