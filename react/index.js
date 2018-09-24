import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import getCampaigns from './graphql/getCampaigns.graphql'

class Library extends Component {
  render() {
    const {
      data: {getCampaigns},
    } = this.props

    const inlineStyle = {
      padding: '15px'
    }

    return (
      <div style={inlineStyle}>

      </div>
    )
  }
}

Library.propTypes = {
  data: PropTypes.object,
  mutate: PropTypes.func
}

export default compose(
  graphql(getCampaigns)
)(Library)
