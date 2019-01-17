import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Radio, EXPERIMENTAL_Conditions, Input, Select } from 'vtex.styleguide'

import withShippingMethods from '../../connectors/withShippingMethods'

class EligibilitySection extends Component {
  constructor(props) {
    super(props)
  }

  renderInputObject = ({ statements, values, statementIndex, error }) => {
    const { updatePageState } = this.props

    return (
      <Input
        value={values || ''}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          updatePageState({
            statements: statements,
          })
        }}
      />
    )
  }

  renderSelectObject = ({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) => {
    const { intl, updatePageState } = this.props

    const SelectObject = extraParams.queryInfo.connector(props => {
      const options = extraParams.queryInfo.dataGetter(props)
      const { placeholder, multi } = extraParams
      const { loading } = props
      return (
        <Select
          placeholder={placeholder}
          options={options}
          value={statements[statementIndex].object}
          isMulti={multi}
          isLoading={loading}
          onChange={value => {
            statements[statementIndex].object = value
            updatePageState({
              statements,
            })
          }}
        />
      )
    })

    return <SelectObject />
  }

  render() {
    const {
      intl,
      eligibility: { allCustomers, statements, operator },
      updatePageState,
    } = this.props

    const options = {
      shippingMethod: {
        label: intl.formatMessage({
          id: 'promotions.promotion.elligibility.shippingMethod.label',
        }),
        verbs: [
          {
            label: 'is',
            value: '==',
            object: {
              renderFn: this.renderSelectObject,
              extraParams: {
                queryInfo: {
                  connector: withShippingMethods,
                  dataGetter: ({ shippingMethods = [] }) =>
                    shippingMethods.map(shippingMethod => ({
                      label: shippingMethod.name,
                      value: shippingMethod,
                    })),
                },
                placeholder: intl.formatMessage({
                  id:
                    'promotions.promotion.elligibility.shippingMethod.placeholder',
                }),
                multi: false,
              },
            },
          },
          {
            label: 'is any of',
            value: 'any',
            object: {
              renderFn: this.renderSelectObject,
              extraParams: {
                queryInfo: {
                  connector: withShippingMethods,
                  dataGetter: ({ shippingMethods = [] }) =>
                    shippingMethods.map(shippingMethod => ({
                      label: shippingMethod.name,
                      value: shippingMethod,
                    })),
                },
                multi: true,
              },
            },
          },
        ],
      },
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '==',
            object: {
              renderFn: this.renderInputObject,
            },
          },
          {
            label: 'is not',
            value: '!=',
            object: {
              renderFn: this.renderInputObject,
            },
          },
        ],
      },
      email: {
        label: 'Email',
        verbs: [
          {
            label: 'contains',
            value: 'contains',
            object: {
              renderFn: this.renderInputObject,
            },
          },
          {
            label: 'is',
            value: '==',
            object: {
              renderFn: this.renderInputObject,
            },
          },
          {
            label: 'is not',
            value: '!=',
            object: {
              renderFn: this.renderInputObject,
            },
          },
        ],
      },
    }

    return (
      <Fragment>
        <h4 className="t-heading-4 mt0">
          <FormattedMessage id="promotions.promotion.elligibility.title" />
        </h4>
        <Radio
          id="promotions.promotion.elligibility.selectAll"
          checked={allCustomers}
          label={intl.formatMessage({
            id: 'promotions.promotion.elligibility.selectAll',
          })}
          onChange={e =>
            updatePageState({
              allCustomers: true,
            })
          }
        />
        <Radio
          id="promotions.promotion.elligibility.selectSpecific"
          checked={!allCustomers}
          label={intl.formatMessage({
            id: 'promotions.promotion.elligibility.selectSpecific',
          })}
          onChange={e =>
            updatePageState({
              allCustomers: false,
            })
          }
        />
        {!allCustomers ? (
          <div className="mt6">
            <EXPERIMENTAL_Conditions
              options={options}
              subjectPlaceholder="Select subject"
              statements={statements}
              operator={operator}
              onChangeOperator={({ operator }) => {
                updatePageState({ operator })
              }}
              onChangeStatements={statements => {
                updatePageState({ statements })
              }}
            />
          </div>
        ) : null}
      </Fragment>
    )
  }
}

EligibilitySection.contextTypes = {
  navigate: PropTypes.func,
}

EligibilitySection.propTypes = {
  intl: intlShape,
  eligibility: PropTypes.shape({
    allCustomers: PropTypes.bool.isRequired,
  }).isRequired,
  updatePageState: PropTypes.func.isRequired,
}

export default injectIntl(EligibilitySection)
