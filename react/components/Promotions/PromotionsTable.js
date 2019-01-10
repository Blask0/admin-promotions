import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Tag, Table } from 'vtex.styleguide'

import Price from '../Icon/Price'
import Gift from '../Icon/Gift'
import Shipping from '../Icon/Shipping'
import Reward from '../Icon/Reward'

import { toDate, format } from 'date-fns'

class PromotionsTable extends Component {
  constructor(props) {
    super(props)

    const { intl } = props

    this.state = {
      schema: {
        properties: {
          name: {
            type: 'string',
            title: intl.formatMessage({ id: 'promotions.promotion.info.name' }),
            width: 400,
          },
          effectType: {
            type: 'string',
            title: intl.formatMessage({ id: 'promotions.promotion.effects.title' }),
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
            type: 'string',
            title: intl.formatMessage({ id: 'promotions.promotion.effects.scope.title' }),
            width: 300,
          },
          beginDate: {
            type: 'string',
            title: intl.formatMessage({ id: 'promotions.promotion.info.startDate' }),
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
            title: intl.formatMessage({ id: 'promotions.promotion.info.endDate' }),
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
      },
    }
  }

  getEffectIcon(effectType) {
    switch (effectType) {
      case 'Price':
        return <Price />
      case 'Gift':
        return <Gift />
      case 'Shipping':
        return <Shipping />
      case 'Reward':
        return <Reward />
    }
  }

  render() {
    const { navigate } = this.context
    const { schema } = this.state
    const { intl } = this.props
    
    return (
      <Table
        schema={schema}
        items={this.props.promotions}
        density="low"
        loading={this.props.loading}
        onRowClick={({ rowData: { id } }) => {
          navigate({
            page: `admin/create`,
            params: {
              id: id
            }
          })
        }}
        toolbar={{
          inputSearch: {
            value: this.props.inputSearchValue,
            placeholder: intl.formatMessage({ id: 'promotions.promotions.search' }),
            onChange: this.props.handleSearchChange,
            onClear: this.props.handleSearchClear,
            onSubmit: this.props.handleSearchSubmit,
          },
          // download: {
          //   label: 'Export',
          //   handleCallback: () => alert('Export not implemented yet'),
          // },
          newLine: {
            label: intl.formatMessage({ id: 'promotions.promotions.newPromotion' }),
            handleCallback: () => {
              navigate({
                page: 'admin/create',
                params: {
                  id: 'new'
                }
              })
            },
          },
        }}
        fullWidth
      />
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
  handleSearchChange: PropTypes.func,
  handleSearchClear: PropTypes.func,
  handleSearchSubmit: PropTypes.func,
}

export default injectIntl(PromotionsTable)
