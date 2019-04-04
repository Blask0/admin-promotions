import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'

import { Tag, Table, ModalDialog } from 'vtex.styleguide'
import { PromotionActivationToggle } from './PromotionActivationToggle'

import Price from '../Icon/Price'
import Gift from '../Icon/Gift'
import Shipping from '../Icon/Shipping'
import Reward from '../Icon/Reward'

import { toDate, format } from 'date-fns'

import archivingPromotionById from '../../connectors/archivingPromotionById'
import { sortPromotions } from '../../utils/promotions'

class PromotionsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSort: {
        sortedBy: null,
        sortOrder: null,
      },
      inputSearchValue: '',
      isPromotionModalOpened: false,
    }
  }

  getTableSchema = intl => ({
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
              {this.getEffectIcon(effectType)}
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
      isActive: {
        type: 'boolean',
        title: 'Status',
        cellRenderer: ({ cellData: isActive }) => {
          const badgeProps = isActive
            ? { bgColor: '#8BC34A', color: '#FFFFFF', children: 'Active' }
            : { bgColor: '#727273', color: '#FFFFFF', children: 'Inactive' }
          return <Tag {...badgeProps} />
        },
      },
    },
  })

  getTableLineActions = () => {
    const { intl } = this.props
    const { navigate } = this.context
    return [
      {
        label: () =>
          intl.formatMessage({
            id: 'promotions.promotions.actions.duplicate',
          }),
        onClick: ({ rowData: { id } }) => {
          navigate({
            page: 'admin.promotion',
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

  getEffectIcon = effectType => {
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

  handleSearchChange = e => {
    this.setState({
      inputSearchValue: e.target.value,
    })
  }

  handleSearchClear = e => {
    this.setState({
      inputSearchValue: '',
    })
    this.props.updatePromotionsSearchParams({
      name: '',
      effect: '',
    })
  }

  handleSearchSubmit = e => {
    e.preventDefault()

    const { inputSearchValue } = this.state

    this.props.updatePromotionsSearchParams({
      name: inputSearchValue,
      effect: inputSearchValue,
    })
  }

  handleSort = ({ sortOrder, sortedBy }) => {
    this.setState({
      dataSort: {
        sortedBy,
        sortOrder,
      },
    })
  }

  handlePromotionDeletionModalConfirmed = () => {
    const {
      promotionToBeDeleted: { id, name },
    } = this.state
    const { archivePromotionById, handlePromotionDeletion } = this.props
    const archive = archivePromotionById({
      variables: {
        id,
      },
    })
    archive.then(response => {
      handlePromotionDeletion()
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

  render() {
    const { navigate } = this.context
    const { intl, loading, promotions } = this.props
    const {
      dataSort,
      inputSearchValue,
      isPromotionModalOpened,
      promotionToBeDeleted: { name: promotionToBeDeletedName } = {},
    } = this.state
    const schema = this.getTableSchema(intl)

    return (
      <div>
        <Table
          schema={schema}
          items={sortPromotions(promotions, dataSort)}
          density="low"
          loading={loading}
          onRowClick={({ rowData: { id } }) => {
            navigate({
              page: 'admin.promotion',
              params: {
                id: id,
              },
            })
          }}
          toolbar={{
            inputSearch: {
              value: inputSearchValue,
              placeholder: intl.formatMessage({
                id: 'promotions.promotions.search',
              }),
              onChange: this.handleSearchChange,
              onClear: this.handleSearchClear,
              onSubmit: this.handleSearchSubmit,
            },
            fields: {
              label: intl.formatMessage({
                id: 'promotions.promotions.table.filter.label',
              }),
              showAllLabel: intl.formatMessage({
                id: 'promotions.promotions.table.filter.showAll',
              }),
              hideAllLabel: intl.formatMessage({
                id: 'promotions.promotions.table.filter.hideAll',
              }),
            },
            newLine: {
              label: intl.formatMessage({
                id: 'promotions.promotions.newPromotion',
              }),
              handleCallback: () => {
                navigate({
                  page: 'admin.promotion',
                  params: {
                    id: 'new',
                  },
                })
              },
            },
          }}
          sort={dataSort}
          onSort={this.handleSort}
          lineActions={this.getTableLineActions()}
          fullWidth
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
      </div>
    )
  }
}

PromotionsTable.contextTypes = {
  navigate: PropTypes.func,
}

PromotionsTable.propTypes = {
  intl: intlShape,
  promotions: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  inputSearchValue: PropTypes.string,
  updatePromotionsSearchParams: PropTypes.func,
}

export default compose(
  archivingPromotionById,
  injectIntl
)(PromotionsTable)
