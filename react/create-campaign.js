import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { PageHeader } from 'vtex.styleguide'

import './global.css'

import SaveCampaignButton from './components/Button/SaveCampaign'

class CreateCampaign extends Component {
  static contextTypes = {
    navigate: PropTypes.func,
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  render() {
    const { navigate } = this.context
    return (
      <div>
        <PageHeader
          linkLabel="Campaigns"
          onLinkClick={() => {
            navigate({
              page: 'admin/index',
            })
          }}
          title="Create Campaign"
        >
          <SaveCampaignButton />
        </PageHeader>
        <div className="ph7" />
      </div>
    )
  }
}

export default CreateCampaign
