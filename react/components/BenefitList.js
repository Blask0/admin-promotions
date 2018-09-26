import React, { PureComponent, Component } from 'react'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import Table from '@vtex/styleguide/lib/Table'

import getBenefits from '../graphql/getBenefits.graphql'

const schema = {
  properties: {
    name: {
      type: 'string',
      title: 'Name',
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
