import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import Statement from './components/SimpleConditions/Statement'
import SimpleConditions from './components/SimpleConditions'

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
      isEnabled: true,
      dateRange: { from: null, to: null, error: null },
      choices: {},
      conditions: {
        single: [{ subject: '', verb: '', objects: [], errorMessage: null }],
        full: [
          { subject: 'aaaa', verb: '', objects: [], errorMessage: null },
          { subject: 'vvvvv', verb: '', objects: [], errorMessage: null },
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

  handleChangeStatement = (
    conditionId,
    statementIndex,
    newValue,
    structure,
    paramIndex
  ) => {
    const conditions = this.state.conditions

    console.log(
      `conditionId ${conditionId} - statementIndex ${statementIndex} - mewValue${newValue} - structure ${structure} - paramIndex ${paramIndex}`
    )

    if (paramIndex !== undefined) {
      if (!conditions[conditionId][statementIndex][structure]) {
        conditions[conditionId][statementIndex][structure] = []
      }

      conditions[conditionId][statementIndex][structure][paramIndex] = newValue

      // conditions[conditionId][statementIndex][structure] = conditions[
      //   conditionId
      // ][statementIndex][structure].filter((elem, index) => {
      //   return index < conditions.length - 1
      // })
    } else {
      conditions[conditionId][statementIndex][structure] = newValue
    }

    this.setState({ conditions: conditions })

    //    this.validateCondition(index)
  }

  // validateCondition = index => {
  //   const conditions = this.state.conditions
  //   const currentObjects = conditions[index]['objects']

  //   if (!currentObjects) {
  //     return
  //   }

  //   if (
  //     currentObjects.length > 1 &&
  //     new Set(currentObjects).size !== currentObjects.length
  //   ) {
  //     conditions[index]['errorMessage'] = 'Statement has duplicated inputs'
  //     this.setState({ conditions: conditions })
  //     return
  //   }

  //   delete conditions[index].errorMessage

  //   this.setState({ conditions: conditions })
  //   return
  // }

  handleRemoveStatement = () => {
    alert('handleRemoveStatement')
  }

  generateInput = (conditionId, statementIndex, index) => {
    return (
      <div className="flex-auto flex-grow-1 mh3 mb3">
        <Input
          size="regular"
          onChange={e =>
            this.handleChangeStatement(
              conditionId,
              statementIndex,
              e.target.value,
              'objects',
              index
            )
          }
        />
      </div>
    )
  }

  getObjectValue = (conditionId, statementIndex, index) => {
    if (this.state.conditions[conditionId] === undefined) {
      // Condition with id `conditionId` does not exist
      return
    }

    if (this.state.conditions[conditionId][statementIndex] === undefined) {
      return
    }

    if (
      this.state.conditions[conditionId][statementIndex].objects === undefined
    ) {
      // Condition has undefined objects
      return
    }

    if (
      this.state.conditions[conditionId][statementIndex].objects.length <
      index + 1
    ) {
      // Condition objects do not have required index
      return
    }

    return this.state.conditions[conditionId][statementIndex].objects[index]
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
                isRtl={this.state.isRtl === 'true'}
                isFullWidth={this.state.isFullWidth === 'true'}
                condition={this.state.conditions['single'][0]}
                choices={[
                  {
                    subject: {
                      label: 'One Input',
                      value: 'custom-one-object',
                    },
                    verbs: isOrNot,
                    objects: {
                      default: [<Input />],
                    },
                  },
                  {
                    subject: {
                      label: 'Two Inputs',
                      value: 'custom-two-objects',
                    },
                    verbs: isOrNot,
                    objects: {
                      default: [
                        <Input />,
                        <div className="c-muted-2 v-mid mt4 b mh3" key="and">
                          and
                        </div>,
                        <Input />,
                      ],
                    },
                  },
                  {
                    subject: {
                      label: 'Dropdown (one or two)',
                      value: 'dropdown',
                    },
                    verbs: isOrNotBetween,
                    objects: {
                      default: [
                        <Dropdown
                          options={this.colors}
                          placeholder="Select a color..."
                          value={this.getObjectValue('single', 0, 0)}
                        />,
                      ],
                      double: [
                        <Dropdown
                          options={this.colors}
                          placeholder="Select a color..."
                          value={this.getObjectValue('single', 0, 0)}
                        />,
                        <div
                          className="c-muted-2 v-mid mv3 b mh3"
                          style={{ maxWidth: '50px' }}
                          key="and">
                          {' '}
                          and
                        </div>,
                        <Dropdown
                          options={this.colors}
                          placeholder="Select a color..."
                          value={this.getObjectValue('single', 0, 1)}
                        />,
                      ],
                    },
                  },
                ]}
                onChangeStatement={(newValue, structure, objectIndex) => {
                  console.log(`value: ${newValue}   structure:${structure}`)
                  this.handleChangeStatement(
                    'single',
                    0,
                    newValue,
                    structure,
                    objectIndex
                  )
                }}
                onRemoveStatement={() => {
                  this.handleRemoveStatement()
                }}
              />

              <div className="ph3 mt5">
                <AceEditor
                  {...aceProps}
                  value={`${JSON.stringify(
                    this.state.conditions['single'],
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
                isDebug={false}
                showOperator
                operator="all"
                conditions={this.state.conditions.full}
                onChangeOperator={operator => this.setState({ operator })}
                onChangeConditions={conditions =>
                  this.setState({ simpleConditions: conditions })
                }
                onChangeStatement={(
                  statementIndex,
                  newValue,
                  structure,
                  objectIndex
                ) => {
                  this.handleChangeStatement(
                    'full',
                    statementIndex,
                    newValue,
                    structure,
                    objectIndex
                  )
                }}
                choices={[
                  {
                    subject: {
                      label: 'One Input',
                      value: 'custom-one-object',
                    },
                    verbs: isOrNot,
                    objects: {
                      default: [<Input />],
                    },
                  },
                  {
                    subject: {
                      label: 'Two Inputs',
                      value: 'custom-two-objects',
                    },
                    verbs: isOrNot,
                    objects: {
                      default: [
                        <Input />,
                        <div className="c-muted-2 v-mid mt4 b mh3" key="and">
                          and
                        </div>,
                        <Input />,
                      ],
                    },
                  },
                  {
                    subject: {
                      label: 'Dropdown (one or two)',
                      value: 'dropdown',
                    },
                    verbs: isOrNotBetween,
                    objects: {
                      default: [
                        <Dropdown
                          options={this.colors}
                          placeholder="Select a color..."
                        />,
                      ],
                      double: [
                        <Dropdown
                          options={this.colors}
                          placeholder="Select a color..."
                        />,
                        <div
                          className="c-muted-2 v-mid mv3 b mh3"
                          style={{ maxWidth: '50px' }}
                          key="and">
                          {' '}
                          and
                        </div>,

                        <Dropdown
                          options={this.colors}
                          placeholder="Select a color..."
                        />,
                      ],
                    },
                  },
                ]}
              />

              <div className="ph3 mt5">
                <AceEditor
                  {...aceProps}
                  value={`${JSON.stringify(
                    this.state.conditions.full,
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
