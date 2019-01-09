import React, { PureComponent, Component } from 'react'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { Tag, Button, Table } from 'vtex.styleguide'

import getBenefits from '../graphql/getPromotions.graphql'

export class BenefitListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schema: {
        properties: {
          name: {
            type: 'string',
            title: 'Name',
            width: 75,
          },
          effectType: {
            type: 'string',
            title: 'Type',
            cellRenderer: data => {
              const type = data.cellData
              return (
                <div className="dt">
                  <span className="dtc v-mid pl3">{type}</span>
                </div>
              )
            },
          },
          isActive: {
            type: 'boolean',
            title: 'Status',
            cellRenderer: data => {
              const active = data.cellData
              const badgeProps = active
                ? { bgColor: '#8BC34A', color: '#FFFFFF', children: 'Active' }
                : { bgColor: '#727273', color: '#FFFFFF', children: 'Inactive' }
              return <Tag {...badgeProps} />
            },
          },
          actions: {
            title: 'Actions',
            cellRenderer: data => {
              const benefit = data.rowData
              const button = (
                <Button
                  size="small"
                  variation="secondary"
                  onClick={() => this.handleDetachment(benefit)}>
                  DETACH
                </Button>
              )
              return button
            },
          },
        },
      },
    }
  }

  static propTypes = {
    campaign: PropTypes.shape({
      name: PropTypes.string,
    }),
    data: PropTypes.object,
  }

  static defaultProps = {
    campaign: null,
  }

  filterByCampaign = benefit => {
    const { campaign } = this.props
    // If no campaign specified, show all benefits
    if (!campaign) {
      return true
    }
    for (var index in benefit.campaigns) {
      if (benefit.campaigns[index].name === campaign.name) {
        return true
      }
    }
    return false
  }

  handleDetachment = benefit => {
    alert(benefit.name)
  }

  render() {
    const { schema } = this.state
    let benefits = this.props.data.getBenefits
    if (!benefits) return null

    benefits = benefits.filter(this.filterByCampaign)

    return <BenefitList className="nh6" benefits={benefits} schema={schema} />
  }
}

export class BenefitList extends PureComponent {
  static propTypes = {
    benefits: PropTypes.array,
    schema: PropTypes.object.isRequired,
  }

  static defaultProps = {
    benefits: [],
  }

  render() {
    const { benefits, schema } = this.props
    return <Table schema={schema} items={benefits} />
  }
}

export default compose(
  graphql(getBenefits, {
    options: () => ({
      ssr: false,
    }),
  })
)(BenefitListContainer)
