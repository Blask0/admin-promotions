import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import getCampaigns from './graphql/getCampaigns.graphql'

import BenefitListContainer from './components/BenefitListContainer'

class Campaigns extends Component {
  render() {
    return <BenefitListContainer />
  }
}

Campaigns.propTypes = {
  data: PropTypes.object,
  mutate: PropTypes.func,
}

// export default Campaigns
export default compose(
  graphql(getCampaigns, {
    options: () => ({
      ssr: false,
      variables: { conditionType: 'campaigns' },
    }),
  })
)(Campaigns)
