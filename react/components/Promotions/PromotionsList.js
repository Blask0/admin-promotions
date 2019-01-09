import React, { Component } from 'react'

import { Tag, Table } from 'vtex.styleguide'

import Price from '../Icon/Price'

import { toDate, format } from 'date-fns'
import withPromotions from '../../connectors/withPromotions';

class PromotionsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schema: {
        properties: {
          name: {
            type: 'string',
            title: 'Name',
            width: 400,
          },
          effectType: {
            type: 'string',
            title: 'Effect',
            cellRenderer: ({ cellData: effectType }) => {
              return (
                <div className="dt">
                  <Price />
                  <span className="dtc v-mid pl3">{effectType}</span>
                </div>
              )
            },
          },
          scope: {
            type: 'string',
            title: 'Applies to',
            width: 300,
          },
          beginDate: {
            type: 'string',
            title: 'From',
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
            title: 'To',
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

  render() {
    const { navigate } = this.context
    const { schema } = this.state
    
    return (
      <Table
        schema={schema}
        items={this.props.promotions || []}
        density="low"
        loading={this.props.loading}
        onRowClick={({ rowData: { id } }) => {
          navigate({
            page: `admin/promotions/${id}`,
          })
        }}
        toolbar={{
          inputSearch: {
            value: this.props.inputSearchValue,
            placeholder: 'Search promotions by name or effect...',
            onChange: this.props.handleSearchChange,
            onClear: this.props.handleSearchClear,
            onSubmit: this.props.handleSearchSubmit,
          },
          // download: {
          //   label: 'Export',
          //   handleCallback: () => alert('Export not implemented yet'),
          // },
          newLine: {
            label: 'New promotion',
            handleCallback: () => {
              navigate({
                page: 'admin/promotions/new',
              })
            },
          },
        }}
        fullWidth
      />
    )
  }
}

PromotionsList.contextTypes = {
  navigate: PropTypes.func,
}

export default withPromotions(PromotionsList)
