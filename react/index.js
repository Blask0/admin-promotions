import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import { Box, PageHeader } from 'vtex.styleguide'

import './global.css'
import getCampaigns from './graphql/getCampaigns.graphql'

import CreatePromotionButton from './components/Button/CreatePromotion'
import GettingStarted from './components/GettingStarted'

class Campaigns extends Component {
  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  render() {
    // MOCK CAMPAIGNS
    // TODO: substitute with this.props.data.getCampaigns
    const campaigns = []

    return (
      <div>
        <PageHeader title="Campaigns">
          <CreatePromotionButton />
        </PageHeader>
        <div className="ph7">
          <Box>
            {campaigns.length === 0 && <GettingStarted />}
            {campaigns.length !== 0 && <div>PROMOTIONS LIST</div>}
          </Box>
        </div>
      </div>
    )
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
