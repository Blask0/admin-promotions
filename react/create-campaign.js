import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Box, Input, PageHeader, Textarea, Toggle } from 'vtex.styleguide'

import './global.css'

import SaveCampaignButton from './components/Button/SaveCampaign'

class CreateCampaign extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnabled: true,
    }
  }

  static contextTypes = {
    navigate: PropTypes.func,
  }

  static Panel = props => (
    <Box>
      <h1 className="f3 normal ma0">{props.title}</h1>
      <div className="mt5">{props.children}</div>
    </Box>
  )

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  render() {
    const { navigate } = this.context
    const { isEnabled } = this.state
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
            <div style={{ maxWidth: 600 }}>
              <Input label="Name" />
              <div className="pt5">
                <span className="db mb3 w-100 f6">Description</span>
                <Textarea />
              </div>
              <div className="pt5">
                <Toggle
                  label="Enable campaign"
                  size="small"
                  checked={isEnabled}
                  onChange={() =>
                    this.setState(prevState => ({
                      isEnabled: !prevState.isEnabled,
                    }))
                  }
                />
              </div>
            </div>
          </CreateCampaign.Panel>
        </div>
      </div>
    )
  }
}

export default CreateCampaign
