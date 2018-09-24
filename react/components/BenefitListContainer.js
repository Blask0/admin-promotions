import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import getBenefits from '../graphql/getBenefits.graphql'

class BenefitListContainer extends Component {
  static propTypes = {
    data: PropTypes.object,
  }

  render() {
    const benefits = this.props.data.getBenefits
    if (!benefits) return null

    return (
      <ul>
        Benefits:
        {benefits.map((benefit, index) => {
          return <li key={index}>{benefit.name}</li>
        })}
      </ul>
    )
  }
}

export default compose(
  graphql(getBenefits, {
    options: () => ({
      ssr: false,
    }),
  })
)(BenefitListContainer)
