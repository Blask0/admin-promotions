import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import Statement from './components/SimpleConditions/Statement'
import SimpleConditions from './components/SimpleConditions'
import MultiSelectWrapper from './components/Input/MultiSelectWrapper'

import './global.css'
import { Box, PageHeader, Input, Dropdown } from 'vtex.styleguide'

import AceEditor from 'react-ace'
import 'brace/mode/json'
import './theme/vtex'
import 'brace/ext/searchbox'

const aceProps = {
  readOnly: true,
  maxLines: '30',
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
    label: 'is not',
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
    label: 'is not',
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

    this.rtlOptions = [
      { label: 'Right to Left', value: 'true' },
      { label: 'Left to Right', value: 'false' },
    ]

    this.fullWidthOptions = [
      { label: 'Regular width', value: 'false' },
      { label: 'Full width', value: 'true' },
    ]

    this.canDeleteOptions = [
      { label: 'Non-deletable', value: 'false' },
      { label: 'Deletable', value: 'true' },
    ]

    this.state = {
      isRtl: 'false',
      isFullWidth: 'false',
      canDelete: 'true',
      currentTab: 1,
      operator: 'all',
      isEnabled: true,
      dateRange: { from: null, to: null, error: null },
      choices: {},
      allConditions: {
        single: [{ subject: '', verb: '', object: [], error: null }],
        full: [{ subject: '', verb: '', object: [], error: null }],
      },
    }

    this.singleStatements = {
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: ({ conditions, values, conditionIndex, error }) => {
              return (
                <Input
                  value={values}
                  onChange={e => {
                    conditions[conditionIndex].object = e.target.value

                    this.handleChangeCondition(conditions, 'single')
                  }}
                />
              )
            },
          },
        ],
      },
    }

    this.statements = {
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: ({ conditions, values, conditionIndex, error }) => {
              return (
                <Input
                  value={values}
                  onChange={e => {
                    conditions[conditionIndex].object = e.target.value

                    this.handleChangeCondition(conditions, 'full')
                  }}
                />
              )
            },
          },
        ],
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

  handleChangeCondition = (newCondition, conditionId) => {
    const newAllConditions = this.state.allConditions
    newAllConditions[conditionId] = newCondition
    this.setState({ allConditions: newAllConditions })
  }

  handleChangeStatement = (
    conditionId,
    statementIndex,
    newValue,
    structure
  ) => {
    const conditions = this.state.allConditions

    conditions[conditionId][statementIndex][structure] = newValue

    console.log(
      `new value is handling here ${newValue}${statementIndex} ${structure}`
    )
    this.setState({ conditions: conditions })
  }

  handleRemoveStatement = () => {
    alert('handleRemoveStatement')
  }

  render() {
    return (
      <div>
        <PageHeader title="Simple Conditions Sandbox" />

        <div>
          <div className="ph7">
            <h4>Configs</h4>
            <Box>
              <Dropdown
                label="RTL vs LTR"
                value={this.state.isRtl}
                options={this.rtlOptions}
                onChange={(e, value) => {
                  this.setState({ isRtl: value })
                }}
              />

              <hr />
              <Dropdown
                label="Full width vs regular width"
                value={this.state.isFullWidth}
                options={this.fullWidthOptions}
                onChange={(e, value) => {
                  this.setState({ isFullWidth: value })
                }}
              />

              <hr />
              <Dropdown
                label="Can delete"
                value={this.state.canDelete}
                options={this.canDeleteOptions}
                onChange={(e, value) => {
                  this.setState({ canDelete: value })
                }}
              />
            </Box>
          </div>

          <div className="ph7">
            <h4>Simple statement</h4>
            <Box>
              <Statement
                canDelete={this.state.canDelete === 'true'}
                choices={this.singleStatements}
                condition={this.state.allConditions.single[0]}
                conditions={this.state.allConditions.single}
                isRtl={this.state.isRtl === 'true'}
                isFullWidth={this.state.isFullWidth === 'true'}
                onChangeStatement={(newValue, structure) => {
                  this.handleChangeStatement('single', 0, newValue, structure)
                }}
                onRemoveStatement={() => {
                  this.handleRemoveStatement()
                }}
              />

              <div className="ph3 mt5">
                <AceEditor
                  {...aceProps}
                  value={`${JSON.stringify(
                    this.state.allConditions['single'],
                    null,
                    2
                  )}`}
                />
              </div>
            </Box>
          </div>

          <div className="ph7">
            <h4>Simple Conditions</h4>
            <Box>
              <SimpleConditions
                canDelete={this.state.canDelete === 'true'}
                choices={this.statements}
                conditions={this.state.allConditions.full}
                isRtl={this.state.isRtl === 'true'}
                isFullWidth={this.state.isFullWidth === 'true'}
                onChangeOperator={operator => this.setState({ operator })}
                onChangeConditions={conditions =>
                  this.handleChangeCondition(conditions, 'full')
                }
                operator={this.state.operator}
                showOperator
              />

              <div className="ph3 mt5">
                <AceEditor
                  {...aceProps}
                  value={`${JSON.stringify(
                    this.state.allConditions.full,
                    null,
                    2
                  )}`}
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(SimpleConditionsSandbox)
