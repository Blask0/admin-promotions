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
import Play from '../Icon/Play'
import Pause from '../Icon/Pause'
import Clock from '../Icon/Clock'

import PromotionsTable from './PromotionsTable'

import { toDate, format } from 'date-fns'

import archivingPromotionById from '../../connectors/archivingPromotionById'
import withPromotions from '../../connectors/withPromotions'

const NO_TITLE_COLUMN = ' '

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

function getStatus(intl, { isActive, beginDateString, endDateString }) {
  const now = new Date()
  const beginDate = new Date(beginDateString)
  const endDate = new Date(endDateString)
  if (!endDate || endDate.getTime() < now.getTime()) {
    return {
      color: '#3F3F40',
      icon: <Clock />,
      label: intl.formatMessage({
        id: 'promotions.promotion.status.completed',
      }),
    }
  }
  if (isActive) {
    if (beginDate.getTime() > now.getTime()) {
      return {
        color: '#FFB100',
        icon: <Clock />,
        label: intl.formatMessage({
          id: 'promotions.promotion.status.scheduled',
        }),
      }
    }
    return {
      color: '#8BC34A',
      icon: <Play />,
      label: intl.formatMessage({
        id: 'promotions.promotion.status.running',
      }),
    }
  }
  return {
    color: '#3F3F40',
    icon: <Pause />,
    label: intl.formatMessage({ id: 'promotions.promotion.status.paused' }),
  }
}

function getTableSchema(intl) {
  return {
    properties: {
      activation: {
        title: NO_TITLE_COLUMN,
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
        width: 350,
        sortable: true,
      },
      legacy: {
        type: 'any',
        title: NO_TITLE_COLUMN,
        width: 89,
        cellRenderer: ({ rowData: { conditionsIds } }) => {
          return (
            !conditionsIds && (
              <Tag variation="low" color="#C28702">
                <FormattedMessage id="promotions.promotion.legacy" />
              </Tag>
            )
          )
        },
      },
      effectType: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.effects.title',
        }),
        sortable: true,
        cellRenderer: ({ cellData: effectType, rowData: { type } }) => {
          return (
            <div className="dt">
              {getEffectIcon(effectType)}
              <span className="dtc v-mid pl3">
                {effectType ||
                  intl.formatMessage({
                    id: `promotions.promotions.newPromotion.${type}`,
                  })}
              </span>
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
        minWidth: 200,
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
          id: 'promotions.promotions.column.from',
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
          id: 'promotions.promotions.column.to',
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
          const { color, icon, label } = getStatus(intl, {
            isActive,
            beginDateString,
            endDateString,
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
            id: 'promotions.promotions.actions.archive',
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

  getExtraActions = () => {
    const { navigate } = this.context
    const { intl } = this.props
    return {
      label: 'Extra actions',
      actions: [
        {
          label: intl.formatMessage({
            id: 'promotions.promotion.archived.title',
          }),
          handleCallback: () => {
            window.postMessage({ action: { type: 'START_LOADING' } }, '*')
            navigate({
              page: 'admin.promotions.ArchivedPromotionsPage',
            })
          },
        },
      ],
    }
  }

  handlePromotionArchivingModalConfirmed = () => {
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

  handlePromotionArchivingModalCanceled = () => {
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
          extraActions={this.getExtraActions()}
          onRowClick={({ rowData: { id } }) =>
            this.handlePromotionSelection(id)
          }
          onSearch={updatePromotionsQueryParams}
        />

        <ModalDialog
          centered
          confirmation={{
            onClick: this.handlePromotionArchivingModalConfirmed,
            label: intl.formatMessage({
              id: 'promotions.promotions.archivingModal.confirm',
            }),
          }}
          cancelation={{
            onClick: this.handlePromotionArchivingModalCanceled,
            label: intl.formatMessage({
              id: 'promotions.promotions.archivingModal.cancel',
            }),
          }}
          isOpen={isPromotionModalOpened}
          showCloseIcon={false}
          closeOnEsc={false}
          closeOnOverlayClick={false}>
          <h1>
            <FormattedMessage id="promotions.promotions.archivingModal.title" />
          </h1>
          <p>
            <FormattedMessage id="promotions.promotions.archivingModal.text" />
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
