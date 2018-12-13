import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import Statement from './components/SimpleConditions/Statement'
import SimpleConditions from './components/SimpleConditions'

import './global.css'
import { Box, PageHeader, Tabs, Tab, Input, Dropdown } from 'vtex.styleguide'

import AceEditor from 'react-ace'
import 'brace/mode/json'
import './theme/vtex'
import 'brace/ext/searchbox'

import choicesEn from './choices/choices-en-US.json'
import choicesArabic from './choices/choices-ar.json'
import choicesOnlyOption from './choices/choices-only-option.json'
import { getFragmentDefinitions } from 'apollo-utilities'

const aceProps = {
  readOnly: true,
  maxLines: '10',
  className: 'code',
  mode: 'json',
  tabSize: 2,
  theme: 'vtex',
  width: '100%',
}

const isOrNot = [
  {
    label: 'is',
    value: '=',
    objectId: 'default',
  },
  {
    label: 'is_not',
    value: '!=',
    objectId: 'default',
  },
]

const isOrNotBetween = [
  {
    label: 'is',
    value: '=',
    objectId: 'default',
  },
  {
    label: 'is_not',
    value: '!=',
    objectId: 'default',
  },
  {
    label: 'is between',
    value: 'between',
    objectId: 'double',
  },
]

class SimpleConditionsSandbox extends Component {
  constructor(props) {
    super(props)

    this.colors = [
      { label: 'White', value: 'white' },
      { label: 'Black', value: 'black' },
      { label: 'Grey', value: 'grey' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Brown', value: 'brown' },
      { label: 'Pink', value: 'pink' },
      { label: 'Orange', value: 'orange' },
      { label: 'Purple', value: 'purple' },
      { label: 'Dark-blue', value: 'dark-blue' },
      { label: 'Dark-red', value: 'dark-red' },
      { label: 'Light-blue', value: 'light-blue' },
    ]

    this.state = {
      currentTab: 1,
      isEnabled: true,
      dateRange: { from: null, to: null, error: null },
      choices: {
        'en-US': choicesEn,
        ar: choicesArabic,
        onlyOption: choicesOnlyOption,
      },
      conditions: {
        empty: { subject: '', verb: '', objects: [] },
        fullWidth: { subject: '', verb: '', objects: [] },
        'pre-filled': {
          subject: 'bin',
          verb: 'between',
          objects: [],
        },
        'small-width': {
          subject: '',
          verb: '',
          objects: [],
        },
        ordering: {
          subject: '',
          verb: '',
          objects: [],
        },
        onlyOption: {
          subject: '',
          verb: '',
          objects: [],
        },
        custom: {
          subject: '',
          verb: '',
          objects: [],
        },
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

  handleChangeStatement = (index, value, param, paramIndex) => {
    const conditions = this.state.conditions

    if (paramIndex !== undefined) {
      if (!conditions[index][param]) {
        conditions[index][param] = []
      }

      conditions[index][param][paramIndex] = value

      // remove last element && null
      conditions[index][param] = conditions[index][param].filter(
        (elem, index) => {
          return elem !== null || index < conditions.length - 1
        }
      )
    } else {
      conditions[index][param] = value
    }

    this.setState({ conditions: conditions })
  }

  handleRemoveStatement = index => {
    alert('handleRemoveStatement')
  }

  handleChangeInput = value => {}

  generateInput = (conditionId, index) => {
    return (
      <Input
        size="regular"
        onChange={e =>
          this.handleChangeStatement(
            conditionId,
            e.target.value,
            'objects',
            index
          )
        }
      />
    )
  }

  getObjectValue = (conditionId, index) => {
    if (this.state.conditions[conditionId] === undefined) {
      // Condition with id `conditionId` does not exist
      return
    }

    if (this.state.conditions[conditionId].objects === undefined) {
      // Condition has undefined objects
      return
    }

    if (this.state.conditions[conditionId].objects.length < index + 1) {
      // Condition objects do not have required index
      return
    }

    return this.state.conditions[conditionId].objects[index]
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
                    choices={[
                      {
                        type: 'custom',
                        subject: {
                          label: 'Custom (one object)',
                          value: 'custom-one-object',
                        },
                        verbs: isOrNot,
                        objects: {
                          default: [this.generateInput('empty', 0)],
                        },
                      },
                      {
                        type: 'custom',
                        subject: {
                          label: 'Custom (two objects)',
                          value: 'custom-two-objects',
                        },
                        verbs: isOrNot,
                        objects: {
                          default: [
                            this.generateInput('empty', 0),
                            <div key="conjunction">and</div>,
                            this.generateInput('empty', 1),
                          ],
                        },
                      },
                      {
                        type: 'custom',
                        subject: {
                          label: 'Dropdown',
                          value: 'dropdown',
                        },
                        verbs: isOrNotBetween,
                        objects: {
                          default: [
                            <Dropdown
                              key="dropdpown-1"
                              options={this.colors}
                              value={this.getObjectValue('empty', 0)}
                              onChange={(e, value) =>
                                this.handleChangeStatement(
                                  'empty',
                                  value,
                                  'objects',
                                  0
                                )
                              }
                            />,
                          ],
                          double: [
                            <Dropdown
                              key="dropdown-1"
                              options={this.colors}
                              value={this.getObjectValue('empty', 0)}
                              onChange={(e, value) =>
                                this.handleChangeStatement(
                                  'empty',
                                  value,
                                  'objects',
                                  0
                                )
                              }
                            />,
                            <div key="and">and</div>,
                            <Dropdown
                              key="dropdown-2"
                              options={this.colors}
                              value={this.getObjectValue('empty', 1)}
                              onChange={(e, value) =>
                                this.handleChangeStatement(
                                  'empty',
                                  value,
                                  'objects',
                                  1
                                )
                              }
                            />,
                          ],
                        },
                      },
                    ]}
                    onChangeStatement={(value, param, index) => {
                      this.handleChangeStatement('empty', value, param, index)
                    }}
                    onRemoveStatement={() => {
                      this.handleRemoveStatement()
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
              {/*
              <div className="ph7">
                <h4>Full width</h4>

                <Box>
                  <div
                    style={{ maxWidth: '400px' }}
                    className="mh3 mb5 pa3 br3 b--light-gray bw1 ba">
                    <Statement
                      condition={this.state.conditions['fullWidth']}
                      fullWidth
                      choices={this.state.choices.simple}
                      onChangeStatement={(value, param, index) => {
                        this.handleChangeStatement(
                          'fullWidth',
                          value,
                          param,
                          index
                        )
                      }}
                      onRemoveStatement={() => {
                        this.handleRemoveStatement()
                      }}
                    />

                    <div className="ph3">
                      <AceEditor
                        {...aceProps}
                        value={`${JSON.stringify(
                          this.state.conditions['fullWidth'],
                          null,
                          2
                        )}`}
                      />
                    </div>
                  </div>
                </Box>
              </div>

              <div className="ph7">
                <h4>Pre-filled statement</h4>
                <Box>
                  <Statement
                    condition={{
                      subject: 'custom-one-object',
                      verb: 'is',
                      objects: ["I'm pre-filled"],
                    }}
                    choices={this.state.choices.simple}
                    onChangeStatement={(value, param, index) => {
                      this.handleChangeStatement(
                        'pre-filled',
                        value,
                        param,
                        index
                      )
                    }}
                    onRemoveStatement={() => {
                      this.handleRemoveStatement()
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
              </div> */}

              {/* <div
                    style={{ maxWidth: '620px' }}
                    className="mh3 mb5 pa3 br3 b--light-gray bw1 ba">
                    <h5 className="mv2">620px width</h5>
                    <Statement
                      condition={this.state.conditions['small-width']}
                      choices={this.state.choices['en-US']}
                      onChangeStatement={(value, param, index) => {
                        this.handleChangeStatement(
                          'small-width',
                          value,
                          param,
                          index
                        )
                      }}
                      onRemoveStatement={() => {
                        this.handleRemoveStatement()
                      }}
                    />
                  </div>

                  <div className="ph3">
                    <AceEditor
                      {...aceProps}
                      value={`${JSON.stringify(
                        this.state.conditions['small-width'],
                        null,
                        2
                      )}`}
                    />
                  </div>
                </Box>
              </div>

              <div className="ph7">
                <h4>Phrasal structure</h4>
                <Box>
                  <h5 className="mv2">Subject-Verb-Object (LTR, en-US)</h5>
                  <Statement
                    condition={this.state.conditions['ordering']}
                    choices={this.state.choices['en-US']}
                    locale="en-US"
                    onChangeStatement={(value, param, index) => {
                      this.handleChangeStatement(
                        'ordering',
                        value,
                        param,
                        index
                      )
                    }}
                    onRemoveStatement={() => {
                      this.handleRemoveStatement()
                    }}
                  />

                  <h5 className="mv2">Object-Verb-Subject (RTL, arabic)</h5>
                  <Statement
                    condition={this.state.conditions['ordering']}
                    choices={this.state.choices['ar']}
                    isRtl
                    locale="ar"
                    onChangeStatement={(value, param, index) => {
                      this.handleChangeStatement(
                        'ordering',
                        value,
                        param,
                        index
                      )
                    }}
                    onRemoveStatement={() => {
                      this.handleRemoveStatement()
                    }}
                  />

                  <div className="ph3">
                    <AceEditor
                      {...aceProps}
                      value={`${JSON.stringify(
                        this.state.conditions['ordering'],
                        null,
                        2
                      )}`}
                    />
                  </div>
                </Box>
              </div>

              <div className="ph7">
                <h4>Dropdown with only one option</h4>
                <Box>
                  <Statement
                    condition={this.state.conditions.onlyOption}
                    choices={this.state.choices.onlyOption}
                    onChangeStatement={(value, param, index) => {
                      this.handleChangeStatement(
                        'onlyOption',
                        value,
                        param,
                        index
                      )
                    }}
                    onRemoveStatement={() => {
                      this.handleRemoveStatement()
                    }}
                  />

                  <div className="ph3">
                    <AceEditor
                      {...aceProps}
                      value={`${JSON.stringify(
                        this.state.conditions.onlyOption,
                        null,
                        2
                      )}`}
                    />
                  </div>
                </Box>
              </div> */}

              {/* <div className="ph7">
                <h4>Custom component</h4>
                <Box>
                  <Statement
                    widget={{
                      customSelect: (
                        <div onClick={() => this.onChange('test')}>cauli</div>
                      ),
                    }}
                    condition={this.state.conditions.custom}
                    choices={this.state.choices['en-US']}
                    onChangeStatement={(value, param, index) => {
                      this.handleChangeStatement('custom', value, param, index)
                    }}
                    onRemoveStatement={() => {
                      this.handleRemoveStatement()
                    }}
                  />

                  <div className="ph3">
                    <AceEditor
                      {...aceProps}
                      value={`${JSON.stringify(
                        this.state.conditions.custom,
                        null,
                        2
                      )}`}
                    />
                  </div>
                </Box>
              </div> */}
            </Tab>
            <Tab
              label="Simple Conditions"
              active={this.state.currentTab === 2}
              onClick={() => this.handleTabChange(2)}>
              <SimpleConditions
                choices={this.state.choices.simple}
                showStrategySelector={false}
                operator="all"
                onChangeOperator={operator => this.setState({ operator })}
                onChangeConditions={conditions => this.setState({ conditions })}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default injectIntl(SimpleConditionsSandbox)
