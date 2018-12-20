import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import Statement from './components/SimpleConditions/Statement'
import SimpleConditions from './components/SimpleConditions'

import './global.css'
import {
  Box,
  PageHeader,
  Input,
  Dropdown,
  Button,
  MultiSelect,
} from 'vtex.styleguide'
import { compose, graphql } from 'react-apollo'
import translate from './queries/translate.graphql'

import AceEditor from 'react-ace'
import 'brace/mode/json'
import './theme/vtex'
import 'brace/ext/searchbox'

const aceProps = {
  readOnly: true,
  maxLines: 12,
  className: 'code',
  mode: 'json',
  tabSize: 2,
  theme: 'vtex',
  width: '100%',
}

class SimpleConditionsSandbox extends Component {
  constructor(props) {
    super(props)

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
      isTranslating: false,
      isRtl: 'false',
      isFullWidth: 'false',
      canDelete: 'true',
      currentTab: 1,
      operator: 'all',
      isEnabled: true,
      dateRange: { from: null, to: null, error: null },
      choices: {},
      translatedResult: '',
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
            object: ({
              conditions,
              values,
              conditionIndex,
              isFullWidth,
              error,
            }) => {
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
      paymentMethod: {
        label: 'Payment method',
        verbs: [
          {
            label: 'is',
            value: 'is',
            object: ({
              conditions,
              values,
              conditionIndex,
              isFullWidth,
              error,
            }) => {
              return (
                <Dropdown
                  value={values}
                  options={[
                    { label: 'White', value: 'white' },
                    { label: 'Black', value: 'black' },
                    { label: 'Grey', value: 'grey' },
                    { label: 'Yellow', value: 'yellow' },
                  ]}
                  onChange={(e, value) => {
                    conditions[conditionIndex].object = value

                    this.handleChangeCondition(conditions, 'full')
                  }}
                />
              )
            },
          },
          {
            label: 'is any of',
            value: 'any-of',
            object: ({
              conditions,
              values,
              conditionIndex,
              isFullWidth,
              error,
            }) => {
              return (
                <MultiSelect
                  emptyState={term => {
                    return `Your search for the payment method "${term}" did not find any results.`
                  }}
                  options={[
                    { label: 'White', value: 'white' },
                    { label: 'Black', value: 'black' },
                    { label: 'Grey', value: 'grey' },
                    { label: 'Yellow', value: 'yellow' },
                  ]}
                  onChange={selected => {
                    conditions[conditionIndex].object = selected

                    this.handleChangeCondition(conditions, 'full')
                  }}
                  selected={values || []}
                />
              )
            },
          },
        ],
      },
      bin: {
        label: 'BIN (Bank Identification Number)',
        verbs: [
          {
            label: 'is between',
            value: 'between',
            object: ({
              conditions,
              values,
              conditionIndex,
              isFullWidth,
              error,
            }) => {
              return (
                <div className={isFullWidth ? '' : 'flex'}>
                  <Input
                    placeholder="123456"
                    errorMessage={
                      conditions[conditionIndex].object &&
                      conditions[conditionIndex].object.first ===
                        conditions[conditionIndex].object.last
                        ? 'duplicated BIN'
                        : ''
                    }
                    value={values && values.first ? values.first : ''}
                    onChange={e => {
                      const currentObject =
                        conditions[conditionIndex].object || {}
                      currentObject.first = e.target.value
                        .replace(/\D/g, '')
                        .substring(0, 6)
                      conditions[conditionIndex].object = currentObject
                      this.handleChangeCondition(conditions, 'full')
                    }}
                  />

                  <div className="mv4 mh3 c-muted-2 b">and</div>

                  <Input
                    placeholder="123456"
                    errorMessage={
                      conditions[conditionIndex].object &&
                      conditions[conditionIndex].object.first ===
                        conditions[conditionIndex].object.last
                        ? 'duplicated BIN'
                        : ''
                    }
                    value={values && values.last ? values.last : ''}
                    onChange={e => {
                      const currentObject =
                        conditions[conditionIndex].object || {}
                      currentObject.last = e.target.value
                        .replace(/\D/g, '')
                        .substring(0, 6)

                      conditions[conditionIndex].object = currentObject

                      this.handleChangeCondition(conditions, 'full')
                    }}
                  />
                </div>
              )
            },
          },
          {
            label: 'is',
            value: 'is',
            object: ({
              conditions,
              values,
              conditionIndex,
              isFullWidth,
              error,
            }) => {
              return (
                <div className={isFullWidth ? '' : 'flex'}>
                  <Input
                    placeholder="123456"
                    value={values || ''}
                    onChange={e => {
                      let currentObject =
                        conditions[conditionIndex].object || {}
                      currentObject = e.target.value
                        .replace(/\D/g, '')
                        .substring(0, 6)
                      conditions[conditionIndex].object = currentObject
                      this.handleChangeCondition(conditions, 'full')
                    }}
                  />
                </div>
              )
            },
          },
          {
            label: 'is not',
            value: 'is-not',
            object: ({
              conditions,
              values,
              conditionIndex,
              isFullWidth,
              error,
            }) => {
              return (
                <div className={isFullWidth ? '' : 'flex'}>
                  <Input
                    placeholder="123456"
                    value={values || ''}
                    onChange={e => {
                      let currentObject =
                        conditions[conditionIndex].object || ''
                      currentObject = e.target.value
                        .replace(/\D/g, '')
                        .substring(0, 6)
                      conditions[conditionIndex].object = currentObject
                      this.handleChangeCondition(conditions, 'full')
                    }}
                  />
                </div>
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

    this.setState({ conditions: conditions })
  }

  handleRemoveStatement = () => {
    alert('handleRemoveStatement')
  }

  translate = (statementDefinitions, operator) => {
    this.setState({ isTranslating: true })
    this.props
      .mutate({
        variables: {
          statementDefinitions: JSON.stringify(statementDefinitions),
          operator: operator,
        },
      })
      .then(
        result => {
          console.dir(result)
          this.setState({ translatedResult: result, isTranslating: false })
        },
        error => {
          console.error(error)
          this.setState({ isTranslating: false })
        }
      )
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
            <h4>Simple Conditionsaaa</h4>
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

              <div className="ph3 mt5">
                <Button
                  disabled={this.state.isTranslating}
                  onClick={event =>
                    this.translate(
                      this.state.allConditions.full,
                      this.state.operator
                    )
                  }>
                  {this.state.isTranslating
                    ? 'TRANSLATING TO JQ...'
                    : 'TRANSLATE TO JQ'}
                </Button>
              </div>
              <div className="ph3 mt5">
                <h3>Translation</h3>
                <AceEditor
                  {...aceProps}
                  value={`${JSON.stringify(
                    this.state.translatedResult,
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

export default compose(graphql(translate))(injectIntl(SimpleConditionsSandbox))
