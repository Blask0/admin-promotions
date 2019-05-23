import React, { Component } from 'react'
import { Query } from 'react-apollo'

import getPromotion from '../graphql/getPromotion.graphql'

import { getErrorsInfo, cannotAccess } from '../utils/errors'
import ErrorPage from '../ErrorPage'
import NoAccessPage from '../NoAccessPage'

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
      window.top &&
        window.top.postMessage({ action: { type: 'START_LOADING' } }, '*')
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
            return cannotAccess(errorInfo) ? (
              <NoAccessPage />
            ) : error ? (
              <ErrorPage
                error={errorInfo}
                actionMessageId="promotions.promotion.error.goToPromotions"
                onActionExecuted={() => {
                  navigate({
                    page: 'admin.app.promotions',
                  })
                  window.top.postMessage(
                    { action: { type: 'START_LOADING' } },
                    '*'
                  )
                }}
              />
            ) : (
              !loading && (
                <WrappedComponent
                  {...this.props}
                  loading={loading}
                  error={error}
                  promotion={
                    data ? this.mapPromotion(data.getPromotion) : undefined
                  }
                />
              )
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
