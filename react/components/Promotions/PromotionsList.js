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
import Running from '../Icon/Running'
import Paused from '../Icon/Paused'
import Scheduled from '../Icon/Scheduled'
import Completed from '../Icon/Completed'

import PromotionsTable from './PromotionsTable'

import { toDate, format } from 'date-fns'

import archivingPromotionById from '../../connectors/archivingPromotionById'
import withPromotions from '../../connectors/withPromotions'

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

function getStatus(intl, { isActive, beginDate, endDate }) {
  const now = new Date()
  if (isActive) {
    if (beginDate.getTime() > now.getTime()) {
      return {
        color: '#FFB100',
        icon: <Scheduled />,
        label: intl.formatMessage({
          id: 'promotions.promotion.status.scheduled',
        }),
      }
    }
    if (endDate.getTime() > now.getTime()) {
      return {
        color: '#8BC34A',
        icon: <Running />,
        label: intl.formatMessage({
          id: 'promotions.promotion.status.running',
        }),
      }
    }
    return {
      color: '#3F3F40',
      icon: <Completed />,
      label: intl.formatMessage({
        id: 'promotions.promotion.status.completed',
      }),
    }
  }
  return {
    color: '#3F3F40',
    icon: <Paused />,
    label: intl.formatMessage({ id: 'promotions.promotion.status.paused' }),
  }
}

function getTableSchema(intl) {
  return {
    properties: {
      activation: {
        title: ' ',
        width: 60,
        cellRenderer: ({ rowData: promotion }) => (
          <PromotionActivationToggle promotion={promotion} />
        ),
      },
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
      status: {
        type: 'boolean',
        title: 'Status',
        cellRenderer: ({
          rowData: {
            isActive,
            beginDate: beginDateString,
            endDate: endDateString,
          },
        }) => {
          const beginDate = new Date(beginDateString)
          const endDate = new Date(endDateString)

          const { color, icon, label } = getStatus(intl, {
            isActive,
            beginDate,
            endDate,
          })

          return (
            <div className="flex items-center" style={{ color: color }}>
              {icon}
              <span className="ml3">{label}</span>
            </div>
          )
        },
      },
    },
  }
}

class PromotionsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPromotionModalOpened: false,
    }
  }

  getLineActions = () => {
    const { navigate } = this.context
    const { intl } = this.props
    return [
      {
        label: () =>
          intl.formatMessage({
            id: 'promotions.promotions.actions.duplicate',
          }),
        onClick: ({ rowData: { id } }) => {
          navigate({
            page: 'admin.promotions.PromotionPage',
            params: {
              id: 'new',
              duplicate: id,
            },
          })
        },
      },
      {
        label: () =>
          intl.formatMessage({
            id: 'promotions.promotions.actions.delete',
          }),
        isDangerous: true,
        onClick: ({ rowData: { id, name } }) => {
          this.setState({
            isPromotionModalOpened: true,
            promotionToBeDeleted: {
              id,
              name,
            },
          })
        },
      },
    ]
  }

  handlePromotionDeletionModalConfirmed = () => {
    const {
      promotionToBeDeleted: { id },
    } = this.state
    const { archivePromotionById } = this.props
    const archive = archivePromotionById({
      variables: {
        id,
      },
    })
    archive.then(() => {
      window.postMessage({ action: { type: 'START_LOADING' } }, '*')
      window.location.reload()
      this.setState({
        isPromotionModalOpened: false,
        promotionToBeDeleted: undefined,
      })
    })
  }

  handlePromotionDeletionModalCanceled = () => {
    this.setState({
      isPromotionModalOpened: false,
      promotionToBeDeleted: undefined,
    })
  }

  handlePromotionSelection = id => {
    const { navigate } = this.context
    navigate({
      page: 'admin.promotions.PromotionPage',
      params: {
        id,
      },
    })
    window.postMessage({ action: { type: 'START_LOADING' } }, '*')
  }

  render() {
    const {
      isPromotionModalOpened,
      promotionToBeDeleted: { name: promotionToBeDeletedName } = {},
    } = this.state
    const {
      intl,
      loading,
      error,
      promotions = [],
      creationDisabled,
      updatePromotionsQueryParams,
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
          promotions={promotions}
          emptyStateLabel={emptyStateLabel}
          lineActions={this.getLineActions()}
          creationDisabled={creationDisabled}
          onRowClick={({ rowData: { id } }) =>
            this.handlePromotionSelection(id)
          }
          onSearch={updatePromotionsQueryParams}
        />

        <ModalDialog
          centered
          confirmation={{
            onClick: this.handlePromotionDeletionModalConfirmed,
            label: intl.formatMessage({
              id: 'promotions.promotions.deletionModal.confirm',
            }),
          }}
          cancelation={{
            onClick: this.handlePromotionDeletionModalCanceled,
            label: intl.formatMessage({
              id: 'promotions.promotions.deletionModal.cancel',
            }),
          }}
          isOpen={isPromotionModalOpened}
          showCloseIcon={false}
          closeOnEsc={false}
          closeOnOverlayClick={false}>
          <h1>
            <FormattedMessage id="promotions.promotions.deletionModal.title" />
          </h1>
          <p>
            <FormattedMessage id="promotions.promotions.deletionModal.text" />
            <strong> {promotionToBeDeletedName}</strong>?
          </p>
        </ModalDialog>
      </Fragment>
    )
  }
}

PromotionsList.contextTypes = {
  navigate: PropTypes.func,
}

PromotionsList.propTypes = {
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
  archivingPromotionById,
  withPromotions,
  injectIntl
)(PromotionsList)
