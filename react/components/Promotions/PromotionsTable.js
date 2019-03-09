import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Tag, Table } from 'vtex.styleguide'

import Price from '../Icon/Price'
import Gift from '../Icon/Gift'
import Shipping from '../Icon/Shipping'
import Reward from '../Icon/Reward'

import { toDate, format } from 'date-fns'

class PromotionsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orderedPromotions: props.promotions,
      dataSort: {
        sortedBy: null,
        sortOrder: null,
      },
    }
  }

  getTableSchema = intl => {
    return {
      properties: {
        name: {
          type: 'string',
          title: intl.formatMessage({
            id: 'promotions.promotion.generalInfo.name',
          }),
          width: 400,
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
          type: 'string',
          title: intl.formatMessage({
            id: 'promotions.promotion.effects.scope.title',
          }),
          width: 300,
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
    }
  }

  getEffectIcon = effectType => {
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

  sortNameAlphapeticallyASC = (a, b) => {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  }

  sortNameAlphapeticallyDESC = (a, b) => {
    return a.name < b.name ? 1 : a.name > b.name ? -1 : 0
  }
  
  sortEffectAlphapeticallyASC = (a, b) => {
    return a.effectType < b.effectType ? -1 : a.effectType > b.effectType ? 1 : 0
  }

  sortEffectAlphapeticallyDESC = (a, b) => {
    return a.effectType < b.effectType ? 1 : a.effectType > b.effectType ? -1 : 0
  }

  sortStartDateASC = (a, b) => {
    return new Date(a.beginDate).getTime() < new Date(b.beginDate).getTime()
      ? -1
      : new Date(a.beginDate).getTime() > new Date(b.beginDate).getTime()
        ? 1
        : 0
  }
  
  sortStartDateDESC = (a, b) => {
    return new Date(a.beginDate).getTime() < new Date(b.beginDate).getTime()
      ? 1
      : new Date(a.beginDate).getTime() > new Date(b.beginDate).getTime()
        ? -1
        : 0
  }

  sortEndDateASC = (a, b) => {
    return new Date(a.endDate).getTime() < new Date(b.endDate).getTime()
      ? -1
      : new Date(a.endDate).getTime() > new Date(b.endDate).getTime()
        ? 1
        : 0
  }
  
  sortEndDateDESC = (a, b) => {
    return new Date(a.endDate).getTime() < new Date(b.endDate).getTime()
      ? 1
      : new Date(a.endDate).getTime() > new Date(b.endDate).getTime()
        ? -1
        : 0
  }

  handleSort = ({ sortOrder, sortedBy }) => {
    if (sortedBy === 'name') {
      const orderedPromotions =
        sortOrder === 'ASC'
          ? this.props.promotions.slice().sort(this.sortNameAlphapeticallyASC)
          : this.props.promotions.slice().sort(this.sortNameAlphapeticallyDESC)

      this.setState({
        orderedPromotions,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    } else if (sortedBy === 'effectType') {
      const orderedPromotions = sortOrder === 'ASC'
      ? this.props.promotions.slice().sort(this.sortEffectAlphapeticallyASC)
      : this.props.promotions.slice().sort(this.sortEffectAlphapeticallyDESC)

      this.setState({
        orderedPromotions,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    } else if (sortedBy === 'beginDate') {
      const orderedPromotions = sortOrder === 'ASC'
      ? this.props.promotions.slice().sort(this.sortStartDateASC)
      : this.props.promotions.slice().sort(this.sortStartDateDESC)

      this.setState({
        orderedPromotions,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    } else if (sortedBy === 'endDate') {
      const orderedPromotions = sortOrder === 'ASC'
      ? this.props.promotions.slice().sort(this.sortEndDateASC)
      : this.props.promotions.slice().sort(this.sortEndDateDESC)

      this.setState({
        orderedPromotions,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    }
  }

  render() {
    const { navigate } = this.context
    const { intl } = this.props
    const schema = this.getTableSchema(intl)

    return (
      <Table
        schema={schema}
        items={this.state.orderedPromotions}
        density="low"
        loading={this.props.loading}
        onRowClick={({ rowData: { id } }) => {
          navigate({
            page: 'admin/promotion',
            params: {
              id: id,
            },
          })
        }}
        toolbar={{
          inputSearch: {
            value: this.props.inputSearchValue,
            placeholder: intl.formatMessage({
              id: 'promotions.promotions.search',
            }),
            onChange: this.props.handleSearchChange,
            onClear: this.props.handleSearchClear,
            onSubmit: this.props.handleSearchSubmit,
          },
          // download: {
          //   label: 'Export',
          //   handleCallback: () => alert('Export not implemented yet'),
          // },
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
                page: 'admin/promotion',
                params: {
                  id: 'new',
                },
              })
            },
          },
        }}
        sort={{
          sortedBy: this.state.dataSort.sortedBy,
          sortOrder: this.state.dataSort.sortOrder,
        }}
        onSort={this.handleSort}
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
