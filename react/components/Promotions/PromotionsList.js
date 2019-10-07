import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { ModalDialog, Tag } from 'vtex.styleguide'
import { PromotionActivationToggle } from './PromotionActivationToggle'

import PromotionsTable from './PromotionsTable'

import { toDate, format } from 'date-fns'

import archivingPromotionById from '../../connectors/archivingPromotionById'
import withPromotions from '../../connectors/withPromotions'
import { getEffectIcon, getStatus } from '../../utils/promotion'
import { toTitleCase } from '../../utils'

const NO_TITLE_COLUMN = ' '
const LEGACY_TAG_COLOR = '#C28702'

function getTableSchema(intl) {
  const cellTypeStyles = 'dtc t-small v-mid ws-normal '

  return {
    properties: {
      activation: {
        title: NO_TITLE_COLUMN,
        width: 48,
        cellRenderer: ({ rowData: promotion }) => (
          <PromotionActivationToggle promotion={promotion} />
        ),
      },
      name: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotion.generalInfo.name',
        }),
        minWidth: 200,
        cellRenderer: ({ cellData: name }) => {
          return (
            <div className="dt">
              <span className={cellTypeStyles}>{name}</span>
            </div>
          )
        },
        sortable: true,
      },
      legacy: {
        type: 'any',
        title: NO_TITLE_COLUMN,
        width: 80,
        cellRenderer: ({ rowData: { effectType } }) => {
          return (
            !effectType && (
              <Tag size="small" variation="low" color={LEGACY_TAG_COLOR}>
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
        width: 100,
        cellRenderer: ({ cellData: effectType, rowData: { type } }) => {
          const icon = getEffectIcon(effectType, 18)
          return (
            <div className="dt flex items-center">
              {icon}
              <span className={cellTypeStyles + (icon ? 'pl2' : '')}>
                {toTitleCase(effectType) ||
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
        width: 110,
        cellRenderer: ({ cellData }) => {
          if (cellData) {
            if (cellData.allCatalog) {
              return (
                <span className={cellTypeStyles + 'fw5'}>
                  {intl.formatMessage({
                    id: 'promotions.scopeColumn.allProducts',
                  })}
                </span>
              )
            } else {
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

                return (
                  <span className={cellTypeStyles}>{scopeInfo.join(', ')}</span>
                )
              })
            }
          }
        },
      },
      beginDate: {
        type: 'string',
        title: intl.formatMessage({
          id: 'promotions.promotions.column.from',
        }),
        sortable: true,
        width: 110,
        cellRenderer: ({ cellData: beginDate }) => {
          const date = format(toDate(beginDate), 'PP')
          const time = format(toDate(beginDate), 'p')
          return (
            <div>
              <div className="dt">
                <span className={cellTypeStyles}>{date}</span>
              </div>
              <div className="dt">
                <span className={cellTypeStyles}>{time}</span>
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
        width: 110,
        cellRenderer: ({ cellData: endDate }) => {
          if (!endDate) {
            return (
              <div className="dt">
                <span className={cellTypeStyles}>-</span>
              </div>
            )
          }
          const date = format(toDate(endDate), 'PP')
          const time = format(toDate(endDate), 'p')
          return (
            <div>
              <div className="dt">
                <span className={cellTypeStyles}>{date}</span>
              </div>
              <div className="dt">
                <span className={cellTypeStyles}>{time}</span>
              </div>
            </div>
          )
        },
      },
      status: {
        type: 'boolean',
        title: 'Status',
        sortable: true,
        width: 100,
        cellRenderer: ({
          rowData: {
            isActive,
            beginDate: beginDateString,
            endDate: endDateString,
          },
        }) => {
          const { color, icon, labelId } = getStatus({
            isActive,
            beginDateString,
            endDateString,
          })

          return labelId === 'promotions.promotion.status.completed' ? (
            <div className="dt">
              <span className={cellTypeStyles}>
                <FormattedMessage id={labelId} />
              </span>
            </div>
          ) : (
            <Tag size="small" bgColor={color}>
              <FormattedMessage id={labelId} />
            </Tag>
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
            page: 'admin.app.promotion',
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
            window.top &&
              window.top.postMessage({ action: { type: 'START_LOADING' } }, '*')
            navigate({
              page: 'admin.app.archived-promotions',
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
      window.top &&
        window.top.postMessage({ action: { type: 'START_LOADING' } }, '*')
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

  handlePromotionSelection = promotion => {
    const { navigate } = this.context
    const { id, effectType } = promotion
    if (effectType) {
      navigate({
        page: 'admin.app.promotion',
        params: {
          id,
        },
      })
    } else {
      // temporary until vtex.admin-iframe-container is fixed
      window.top.location.replace(`/admin/rnb/#/benefit/${id}`)
      // navigate({
      //   to: `/admin/rnb/#/benefit/${id}`,
      // })
    }
    window.top &&
      window.top.postMessage({ action: { type: 'START_LOADING' } }, '*')
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
          onRowClick={({ rowData: promotion }) =>
            this.handlePromotionSelection(promotion)
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
