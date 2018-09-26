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
      cellRenderer: ({ cellData }) => {
        const badgeProps = cellData
          ? { bgColor: '#8BC34A', color: '#FFFFFF', children: 'Active' }
          : { bgColor: '#727273', color: '#FFFFFF', children: 'Inactive' }
        return <Badge {...badgeProps} />
      },
    },
  },
}

export class BenefitListContainer extends Component {
  static propTypes = {
    data: PropTypes.object,
  }

  render() {
    const benefits = this.props.data.getBenefits
    if (!benefits) return null

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
