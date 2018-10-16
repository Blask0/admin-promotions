import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Box, Input, PageHeader, Textarea, Toggle } from 'vtex.styleguide'

import './global.css'

import SaveCampaignButton from './components/Button/SaveCampaign'

class CreateCampaign extends Component {
  static contextTypes = {
    navigate: PropTypes.func,
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  static Panel = props => (
    <Box>
      <h1 className="f3 normal ma0">{props.title}</h1>
      <div className="mt7">{props.children}</div>
    </Box>
  )

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
        <div className="ph7">
          <CreateCampaign.Panel title="General">
            <div style={{ maxWidth: 500 }}>
              <Input label="Name" size="large" />
              <div className="pt6">
                <Textarea label="Description" />
              </div>
              <div className="pt6">
                <Toggle label="Enable campaign" />
              </div>
            </div>
          </CreateCampaign.Panel>
        </div>
      </div>
    )
  }
}

export default CreateCampaign
