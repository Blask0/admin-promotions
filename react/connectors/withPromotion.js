import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getPromotion from '../graphql/getPromotion.graphql'

import { getErrorsInfo } from '../utils/errors'
import ErrorPage from '../ErrorPage'

function withPromotion(WrappedComponent) {
  class WithPromotion extends Component {
    constructor(props) {
      super(props)

      const {
        params: { id, duplicate },
      } = this.props

      this.state = {
        id: id !== 'new' ? id : duplicate || undefined,
        isDuplicating: id === 'new' && duplicate,
      }
    }

    componentWillMount() {
      window.postMessage({ action: { type: 'START_LOADING' } }, '*')
    }

    mapPromotion = promotion =>
      this.state.isDuplicating
        ? {
          ...promotion,
          id: undefined,
          eligibility: {
            ...promotion.eligibility,
            id: undefined,
          },
        }
        : promotion

    render() {
      const { navigate } = this.context
      const { id } = this.state
      return id ? (
        <Query
          query={getPromotion}
          variables={{ id }}
          fetchPolicy="network-only">
          {({ loading, error, data }) => {
            const [errorInfo] = getErrorsInfo(error)
            return error ? (
              <ErrorPage
                error={errorInfo}
                actionMessageId="promotions.promotion.error.goToPromotions"
                onActionExecuted={() => {
                  navigate({
                    page: 'admin.promotions.PromotionsPage',
                  })
                  window.postMessage({ action: { type: 'START_LOADING' } }, '*')
                }}
              />
            ) : (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                promotion={
                  data ? this.mapPromotion(data.getPromotion) : undefined
                }
              />
            )
          }}
        </Query>
      ) : (
        <WrappedComponent {...this.props} />
      )
    }
  }

  WithPromotion.contextTypes = {
    navigate: PropTypes.func,
  }

  return WithPromotion
}

export default withPromotion
