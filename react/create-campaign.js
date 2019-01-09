import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

import {
  Box,
  Input,
  PageHeader,
  Textarea,
  Toggle,
  Button,
} from 'vtex.styleguide'

import SaveCampaignButton from './components/Button/SaveCampaign'
import Scheduling from './components/Input/Scheduling'
import BenefitsList from './components/BenefitList'
import SimpleConditions from './components/SimpleConditions'

class CreateCampaign extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnabled: true,
      dateRange: { from: null, to: null, error: null },
    }
  }

  static contextTypes = {
    navigate: PropTypes.func,
  }

  static Panel = props => (
    <Box>
      <h1 className="f4 normal ma0">
        {props.title} <span className="ml3 f5 fw2s gray">{props.subtitle}</span>
      </h1>
      <div className="mt5">{props.children}</div>
    </Box>
  )

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  handleScheduleChange = (date, type, valid) => {
    const newRange = { ...this.state.dateRange, [type]: date }
    ;(newRange.error = valid ? undefined : 'error.dateRange.validation'),
    this.setState({
      dateRange: newRange,
    })
  }

  handleAddAudience = () => {
    return alert('Add audience')
  }

  getTimezoneOffset = () => {
    const offset = new Date().getTimezoneOffset()
    const absOffset = Math.abs(offset)
    const sign = offset < 0 ? '+' : '-'

    let gmtOffset = absOffset / 60
    if (Math.round(gmtOffset) !== gmtOffset) {
      gmtOffset = gmtOffset.toFixed(2)
    }

    return sign + absOffset / 60
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
          title="Create Campaign">
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

        <div className="ph7 mt6">
          <CreateCampaign.Panel
            title={this.props.intl.formatMessage({
              id: 'input.label.scheduling',
            })}
            subtitle={`${this.getTimezoneOffset()}GMT`}>
            <div style={{ maxWidth: 600 }}>
              <Scheduling
                onChange={this.handleScheduleChange}
                dateRange={this.state.dateRange}
                errorMessage={this.state.dateRange.error}
              />
            </div>
          </CreateCampaign.Panel>
        </div>

        <div className="ph7 mt6">
          <CreateCampaign.Panel
            title={this.props.intl.formatMessage({
              id: 'input.label.audiences',
            })}
            subtitle={'0 Target Audiences'}>
            <div style={{ maxWidth: 600 }}>
              <SimpleConditions
                showStrategySelector={false}
                operator="all"
                onChangeOperator={operator => this.setState({ operator })}
                onChangeConditions={conditions => this.setState({ conditions })}
                choices={[]}
              />
              <Button
                size="small"
                variation="secondary"
                onClick={() => this.handleAddAudience()}>
                Add target audience
              </Button>
            </div>
          </CreateCampaign.Panel>
        </div>

        <div className="ph7 mt6">
          <CreateCampaign.Panel
            title={this.props.intl.formatMessage({
              id: 'input.label.benefits-list',
            })}
            subtitle={'0 Benefits'}>
            <BenefitsList />
          </CreateCampaign.Panel>
        </div>
      </div>
    )
  }
}

export default injectIntl(CreateCampaign)
