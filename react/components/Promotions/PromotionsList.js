import React, { PureComponent, Component } from 'react'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'

import Tag from '@vtex/styleguide/lib/Tag'
import Button from '@vtex/styleguide/lib/Button'
import Table from '@vtex/styleguide/lib/Table'

import getPromotions from '../../graphql/getPromotions.graphql'

import { toDate, format } from 'date-fns'

class PromotionsList extends Component {
  constructor(props) {
    super(props)

    this.promotions = [
      {
        "name": "Teste Usage",
        "beginDate": "2018-05-22T17:00:00Z",
        "endDate": "2020-05-31T17:00:00Z",
        "isActive": false,
        "description": "",
        "effectType": null,
        "campaigns": [
          {
            "name": "Teste validacao cupom"
          }
        ]
      },
      {
        "name": "Teste Usage 2",
        "beginDate": "2018-05-22T17:00:00Z",
        "endDate": null,
        "isActive": false,
        "description": "",
        "effectType": null,
        "campaigns": [
          {
            "name": "Teste validacao cupom"
          }
        ]
      },
      {
        "name": "Teste Usage 3",
        "beginDate": "2018-05-22",
        "endDate": "2020-05-31",
        "isActive": false,
        "description": "",
        "effectType": null,
        "campaigns": [
          {
            "name": "Teste validacao cupom"
          }
        ]
      },
      {
        "name": "Teste Usage 4",
        "beginDate": "2018-05-22",
        "endDate": null,
        "isActive": false,
        "description": "",
        "effectType": null,
        "campaigns": [
          {
            "name": "Teste validacao cupom"
          }
        ]
      }
    ]

    this.state = {
      schema: {
        properties: {
          name: {
            type: 'string',
            title: 'Name',
            width: 300,
          },
          effectType: {
            type: 'string',
            title: 'Effect',
            cellRenderer: data => {
              const type = data.cellData
              return (
                <div className="dt">
                  <span className="dtc v-mid pl3">{type}</span>
                </div>
              )
            },
          },
          beginDate: {
            type: 'string',
            title: 'From',
            cellRenderer: ({ cellData: beginDate }) => {
              const date = format(toDate(beginDate), 'PP')
              const time = format(toDate(beginDate), 'p')
              console.log(beginDate, date, time)
              return (
                <div>
                  <div className="dt">
                    <span className="dtc v-mid pl3">{date}</span>
                  </div>
                  <div className="dt">
                    <span className="dtc v-mid pl3">{time}</span>
                  </div>
                </div>
              )
            }
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
          }
        },
      },
    }
  }

  render() {
    const { schema } = this.state
    // const promotions = this.props.data.getPromotions || []
    return (
      <Query query={getPromotions}>
      {({ loading, error, data = {} }) => {
        debugger
      return <Table 
        schema={schema} 
        items={data.getPromotions || []} 
        toolbar={{
          inputSearch: {
            value: this.state.searchValue,
            placeholder: 'Search stuff...',
            onChange: this.handleInputSearchChange,
            onClear: this.handleInputSearchClear,
            onSubmit: this.handleInputSearchSubmit,
          },
          density: {
            buttonLabel: 'Density',
            lowOptionLabel: 'Low',
            mediumOptionLabel: 'Medium',
            highOptionLabel: 'High',
          },
          download: {
            label: 'Export',
            handleCallback: () => alert('Callback()'),
          },
          fields: {
            label: 'Fields',
            showAllLabel: 'Show All',
            hideAllLabel: 'Hide All',
          },
          newLine: {
            label: 'New',
            handleCallback: () => alert('handle new line callback')
          },
        }} />
      }
      }
      </Query>
    )
  }
}

export default PromotionsList
