import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { ModalDialog, Tag } from 'vtex.styleguide'
import { PromotionActivationToggle } from './PromotionActivationToggle'

import Price from '../Icon/Price'
import Gift from '../Icon/Gift'
import Shipping from '../Icon/Shipping'
import Reward from '../Icon/Reward'

import PromotionsTable from './PromotionsTable'

import { toDate, format } from 'date-fns'

import unarchivingPromotionById from '../../connectors/unarchivingPromotionById'
import withArchivedPromotions from '../../connectors/withArchivedPromotions'

function getEffectIcon(effectType) {
  switch (effectType) {
    case 'price':
      return <Price />
    case 'gift':
      return <Gift />
    case 'shipping':
      return <Shipping />
    case 'reward':
      return <Reward />
  }
}

function getTableSchema(intl) {
  return {
    properties: {
      name: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.generalInfo.name',
        }),
        sortable: true,
      },
      effectType: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.effects.title',
        }),
        sortable: true,
        cellRenderer: ({ cellData: effectType }) => {
          return (
            <div className="dt">
              {getEffectIcon(effectType)}
              <span className="dtc v-mid pl3">{effectType}</span>
            </div>
          )
        },
      },
      scope: {
        type: 'object',
        title: intl.formatMessage({
          id: 'promotions.promotion.effects.scope.title',
        }),
        properties: {
          allCatalog: {
            type: 'boolean',
          },
          skus: {
            type: 'int',
          },
          products: {
            type: 'int',
          },
          categories: {
            type: 'int',
          },
          collections: {
            type: 'int',
          },
          brands: {
            type: 'int',
          },
        },
        width: 300,
        cellRenderer: ({ cellData }) => {
          if (cellData) {
            if (cellData.allCatalog) {
              return (
                <span className="fw5">
                  {intl.formatMessage({
                    id: 'promotions.scopeColumn.allProducts',
                  })}
                </span>
              )
            }
            let scopeInfo = []
            const blackList = ['allCatalog', '__typename']

            Object.keys(cellData).forEach((key, index) => {
              if (cellData[key] !== 0 && !blackList.includes(key)) {
                scopeInfo = [
                  ...scopeInfo,
                  `${intl.formatMessage(
                    {
                      id: `promotions.scopeColumn.${key}`,
                    },
                    {
                      itemCount: cellData[key],
                    }
                  )}`,
                ]
              }
            })

            return <span>{scopeInfo.join(', ')}</span>
          }
        },
      },
      beginDate: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.generalInfo.startDate',
        }),
        sortable: true,
        cellRenderer: ({ cellData: beginDate }) => {
          const date = format(toDate(beginDate), 'PP')
          const time = format(toDate(beginDate), 'p')
          return (
            <div>
              <div className="dt">
                <span className="dtc v-mid">{date}</span>
              </div>
              <div className="dt">
                <span className="dtc v-mid">{time}</span>
              </div>
            </div>
          )
        },
      },
      endDate: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.generalInfo.endDate',
        }),
        sortable: true,
        cellRenderer: ({ cellData: endDate }) => {
          if (!endDate) {
            return (
              <div className="dt">
                <span className="dtc v-mid">-</span>
              </div>
            )
          }
          const date = format(toDate(endDate), 'PP')
          const time = format(toDate(endDate), 'p')
          return (
            <div>
              <div className="dt">
                <span className="dtc v-mid">{date}</span>
              </div>
              <div className="dt">
                <span className="dtc v-mid">{time}</span>
              </div>
            </div>
          )
        },
      },
    },
  }
}

class ArchivedPromotionsList extends Component {
  getLineActions = () => {
    const { intl, unarchivePromotionById } = this.props
    return [
      {
        label: () =>
          intl.formatMessage({
            id: 'promotions.promotions.actions.recover',
          }),
        onClick: ({ rowData: { id } }) => {
          window.postMessage({ action: { type: 'START_LOADING' } }, '*')
          unarchivePromotionById({
            variables: {
              id,
            },
          }).then(() => {
            window.location.reload()
          })
        },
      },
    ]
  }

  render() {
    const { navigate } = this.context
    const {
      intl,
      loading,
      error,
      archivedPromotions = [],
      updateArchivedPromotionsQueryParams,
    } = this.props

    const emptyStateLabel =
      !loading && error
        ? intl.formatMessage({ id: 'promotions.promotions.table.errorLabel' })
        : intl.formatMessage({ id: 'promotions.promotions.table.emptyLabel' })

    return (
      <Fragment>
        <PromotionsTable
          intl={intl}
          schema={getTableSchema(intl)}
          loading={loading}
          promotions={archivedPromotions}
          emptyStateLabel={emptyStateLabel}
          lineActions={this.getLineActions()}
          onRowClick={({ rowData: { id } }) => {
            navigate({
              page: 'admin.app.promotion',
              params: {
                id: id,
              },
            })
            window.postMessage({ action: { type: 'START_LOADING' } }, '*')
          }}
          onSearch={updateArchivedPromotionsQueryParams}
          noNewLine
        />
      </Fragment>
    )
  }
}

PromotionsTable.contextTypes = {
  navigate: PropTypes.func,
}

PromotionsTable.propTypes = {
  intl: intlShape,
  loading: PropTypes.bool,
  error: PropTypes.object,
  promotions: PropTypes.arrayOf(PropTypes.object),
  creationDisabled: PropTypes.bool,
  lineAction: PropTypes.shape({
    isDangerous: PropTypes.bool,
    label: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
}

export default compose(
  unarchivingPromotionById,
  withArchivedPromotions,
  injectIntl
)(ArchivedPromotionsList)
