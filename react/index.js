import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import { Box, PageHeader } from 'vtex.styleguide'

import './global.css'
import getPromotions from './graphql/getPromotions.graphql'

import CreateCampaignButton from './components/Button/CreateCampaign'
import GettingStarted from './components/GettingStarted'
import PromotionsList from './components/Promotions/PromotionsList';

class Campaigns extends Component {
  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  render() {
    return (
      <div>
        <PageHeader title="Promotion"></PageHeader>
        <div className="ph7">
          <Box>
            <PromotionsList />
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

export default Campaigns
