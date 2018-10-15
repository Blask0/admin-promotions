import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import { Box, Button, PageHeader } from 'vtex.styleguide'

import './global.css'
import getCampaigns from './graphql/getCampaigns.graphql'

import GettingStarted from './components/GettingStarted'

class Campaigns extends Component {
  render() {
    // MOCK CAMPAIGNS
    // TODO: substitute with this.props.data.getCampaigns
    const campaigns = []

    return (
      <div className="w-100 bg-muted-5">
        <PageHeader title="Campaigns">
          <Button variation="primary">New campaign</Button>
        </PageHeader>
        <div className="ph7">
          <Box>
            {campaigns.length === 0 && <GettingStarted />}
            {campaigns.length !== 0 && <div>CAMPAIGNS LIST</div>}
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
