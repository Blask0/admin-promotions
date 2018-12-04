import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import Statement from './components/SimpleConditions/Statement'

import { Box, PageHeader, Tabs, Tab } from 'vtex.styleguide'

import Resizable from 're-resizable'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import './theme/vtex'
import 'brace/ext/searchbox'

import choices from './choices/choices.json'

const aceProps = {
  readOnly: true,
  maxLines: '10',
  className: 'code',
  mode: 'json',
  tabSize: 2,
  theme: 'vtex',
  width: '100%',
}

class SimpleConditionsSandbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: 1,
      isEnabled: true,
      dateRange: { from: null, to: null, error: null },
      choices: choices,
      conditions: {
        empty: { subject: '', operator: '', value: null },
        'pre-filled': {
          subject: 'payment-method',
          operator: '!=',
          value: 'credit-card',
        },
        resizable: { subject: '', operator: '', value: null },
      },
    }
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  handleTabChange = tabIndex => {
    this.setState({
      currentTab: tabIndex,
    })
  }

  handleChangeStatement = (index, value, param) => {
    const conditions = this.state.conditions
    conditions[index][param] = value

    console.log(value, param)
    this.setState({ conditions: conditions })
  }

  render() {
    return (
      <div>
        <PageHeader title="Simple Conditions Sandbox" />

        <div>
          <Tabs>
            <Tab
              label="Statements"
              active={this.state.currentTab === 1}
              onClick={() => this.handleTabChange(1)}>
              <div className="ph7">
                <h4>Simple empty statement</h4>
                <Box>
                  <Statement
                    condition={this.state.conditions['empty']}
                    choices={this.state.choices}
                    onChangeStatement={(value, param) => {
                      this.handleChangeStatement('empty', value, param)
                    }}
                  />

                  <div className="ph3">
                    <AceEditor
                      {...aceProps}
                      value={`${JSON.stringify(
                        this.state.conditions['empty'],
                        null,
                        2
                      )}`}
                    />
                  </div>
                </Box>
              </div>

              <div className="ph7">
                <h4>Pre-filled statement</h4>
                <Box>
                  <Statement
                    condition={this.state.conditions['pre-filled']}
                    choices={this.state.choices}
                    onChangeStatement={(value, param) => {
                      this.handleChangeStatement('pre-filled', value, param)
                    }}
                  />

                  <div className="ph3">
                    <AceEditor
                      {...aceProps}
                      value={`${JSON.stringify(
                        this.state.conditions['pre-filled'],
                        null,
                        2
                      )}`}
                    />
                  </div>
                </Box>
              </div>

              <div className="ph7">
                <h4>Resizeable empty statement</h4>
                <Box>
                  <Resizable
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '3px',
                      backgroundImage:
                        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIElEQVQoU2O8/fF/AwMRgBGkUJWfkaDiUYV4Q5Po4AEAq0gnVtscrm0AAAAASUVORK5CYII=)',
                    }}
                    className="mv5 ml3"
                    defaultSize={{
                      width: 350,
                      height: 75,
                    }}
                    maxHeight={75}
                    minHeight={75}>
                    <Statement
                      condition={this.state.conditions['resizable']}
                      choices={this.state.choices}
                      onChangeStatement={(value, param) => {
                        this.handleChangeStatement('resizable', value, param)
                      }}
                    />
                  </Resizable>

                  <div className="ph3">
                    <AceEditor
                      {...aceProps}
                      value={`${JSON.stringify(
                        this.state.conditions['resizable'],
                        null,
                        2
                      )}`}
                    />
                  </div>
                </Box>
              </div>
            </Tab>
            <Tab
              label="Simple Conditions"
              active={this.state.currentTab === 2}
              onClick={() => this.handleTabChange(2)}>
              <p>TODO: Create examples for Simple Conditions</p>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default injectIntl(SimpleConditionsSandbox)
