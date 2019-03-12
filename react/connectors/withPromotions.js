import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { injectIntl } from 'react-intl'

import getPromotions from '../graphql/getPromotions.graphql'

function withPromotions(WrappedComponent) {
  class WithPromotions extends Component {
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
      const { intl } = this.props

      return (
        <Query
          query={getPromotions}
          variables={{ name, effect }}
          fetchPolicy="network-only">
          {({ loading, error, data, refetch }) => {
            const promotions = data ? data.getPromotions : []

            if (promotions) {
              promotions.forEach((promotion, index) => {
                if (promotion.scope.allCatalog) {
                  promotions[index].scope = (
                    <span className="fw5">
                      {intl.formatMessage({
                        id: 'promotions.scopeColumn.allProducts',
                      })}
                    </span>
                  )
                } else {
                  let scopeInfo = []
                  const blackList = ['allCatalog', '__typename']

                  Object.keys(promotion.scope).forEach((key, index) => {
                    if (
                      promotion.scope[key] !== 0 &&
                      !blackList.includes(key)
                    ) {
                      if (promotion.scope[key] === 1) {
                        scopeInfo = [
                          ...scopeInfo,
                          `${promotion.scope[key]} ${intl.formatMessage({
                            id: `promotions.scopeColumn.${key}.singular`,
                          })}`,
                        ]
                      } else {
                        scopeInfo = [
                          ...scopeInfo,
                          `${promotion.scope[key]} ${intl.formatMessage({
                            id: `promotions.scopeColumn.${key}.plural`,
                          })}`,
                        ]
                      }
                    }
                  })

                  promotions[index].scope = scopeInfo.join(', ')
                }
              })
            }

            return (
              <WrappedComponent
                {...this.props}
                loading={loading}
                error={error}
                refetchPromotions={refetch}
                promotions={data ? data.getPromotions : []}
                updateQueryParams={this.updateQueryParams}
              />
            )
          }}
        </Query>
      )
    }
  }

  return injectIntl(WithPromotions)
}

export default withPromotions
