import React, { PureComponent, Component } from 'react'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import Badge from '@vtex/styleguide/lib/Badge'
import Table from '@vtex/styleguide/lib/Table'

import getBenefits from '../graphql/getBenefits.graphql'

const schema = {
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
    isActive: {
      type: 'boolean',
      title: 'Status',
      cellRenderer: data => {
        const active = data.cellData
        const badgeProps = active
          ? { bgColor: '#8BC34A', color: '#FFFFFF', children: 'Active' }
          : { bgColor: '#727273', color: '#FFFFFF', children: 'Inactive' }
        return <Badge {...badgeProps} />
      },
    },
  },
}

export class BenefitListContainer extends Component {
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
    for (var index in benefit.campaigns) {
      if (benefit.campaigns[index].name === campaign.name) {
        return true
      }
    }
    return false
  }

  render() {
    const { campaign } = this.props
    let benefits = this.props.data.getBenefits

    if (!benefits) return null

    // Only show benefits associated with the context campaign
    if (campaign) {
      benefits = benefits.filter(this.filterByCampaign)
    }

    return <BenefitList benefits={benefits} />
  }
}

export class BenefitList extends PureComponent {
  static propTypes = {
    benefits: PropTypes.array,
  }

  static defaultProps = {
    benefits: [],
  }

  render() {
    const { benefits } = this.props
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
