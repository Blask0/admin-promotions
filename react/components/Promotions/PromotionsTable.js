import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Tag, Table } from 'vtex.styleguide'
import { PromotionActivationToggle } from './PromotionActivationToggle'

import Price from '../Icon/Price'
import Gift from '../Icon/Gift'
import Shipping from '../Icon/Shipping'
import Reward from '../Icon/Reward'

import { toDate, format } from 'date-fns'

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

  isCreationDisabled = () => {
    const { promotions, accountLimits } = this.props
    const activePromotions = promotions.filter(({ isActive }) => isActive)
    return (
      accountLimits && activePromotions.length >= accountLimits.activePromotions
    )
  }

  render() {
    const { navigate } = this.context
    const { intl, loading, error, promotions, lineActions } = this.props
    const { dataSort, inputSearchValue } = this.state
    const schema = this.getTableSchema(intl)

    const emptyStateLabel =
      !loading && error
        ? intl.formatMessage({ id: 'promotions.promotions.table.errorLabel' })
        : intl.formatMessage({ id: 'promotions.promotions.table.emptyLabel' })

    return (
      <div>
        <Table
          schema={schema}
          items={sortPromotions(promotions, dataSort)}
          density="low"
          loading={loading}
          emptyStateLabel={emptyStateLabel}
          onRowClick={({ rowData: { id } }) => {
            navigate({
              page: 'admin.promotions.PromotionPage',
              params: {
                id: id,
              },
            })
            window.postMessage({ action: { type: 'START_LOADING' } }, '*')
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
                  page: 'admin.promotions.PromotionPage',
                  params: {
                    id: 'new',
                  },
                })
              },
              disabled: this.isCreationDisabled(),
            },
          }}
          sort={dataSort}
          onSort={this.handleSort}
          lineActions={lineActions}
          fullWidth
        />
      </div>
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
  accountLimits: PropTypes.shape({
    activePromotions: PropTypes.number,
  }),
  lineAction: PropTypes.shape({
    isDangerous: PropTypes.bool,
    label: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  updatePromotionsSearchParams: PropTypes.func,
  handlePromotionDeletion: PropTypes.func,
}

export default injectIntl(PromotionsTable)
