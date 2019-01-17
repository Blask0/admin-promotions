import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Radio, EXPERIMENTAL_Conditions, Input, Select, Dropdown } from 'vtex.styleguide'

import { shippingMethods } from '../../utils/conditions/options'
import withPaymentMethods from '../../connectors/withPaymentMethods' 

class EligibilitySection extends Component {
  constructor(props) {
    super(props)
  }

  renderInputObject = ({ statements, values, statementIndex, error, extraParams }) => {
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

  renderDropdownObject = ({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) => {
    const { updatePageState } = this.props

    const DropdownObject = extraParams.queryInfo.connector(props => {
      const options = props[extraParams.queryInfo.propName]

      return (
        <Dropdown
          placeholder={""}
          options={options}
          isMulti={extraParams.isMulti}
          onChange={selected => {
            statements[statementIndex].object = selected.name
            updatePageState({
              statements: statements
            })
          }}
        />
      )
    })

    return <DropdownObject />
  }

  renderRangeInputObject = ({ statements, values, statementIndex, error, extraParams }) => {
    const { updatePageState } = this.props

    return (
      <div className='flex'>

        <Input
          placeholder=""
          errorMessage={
            statements[statementIndex].object &&
            parseInt(statements[statementIndex].object.first) >=
              parseInt(statements[statementIndex].object.last)
              ? 'Must be smaller than other input'
              : ''
          }
          value={values && values.first ? values.first : ''}
          onChange={e => {
            const currentObject =
              statements[statementIndex].object || {}
            currentObject.first = e.target.value.replace(/\D/g, '')

            statements[statementIndex].object = currentObject
            
            updatePageState({
              statements: statements
            })
          }}
        />

        <div className="mv4 mh3 c-muted-2 b">and</div>

        <Input
          placeholder=""
          value={values && values.last ? values.last : ''}
          onChange={e => {
            const currentObject =
              statements[statementIndex].object || {}
            currentObject.last = e.target.value.replace(/\D/g, '')

            statements[statementIndex].object = currentObject

            updatePageState({
              statements: statements
            })
          }}
        />
        
      </div>
    )
  }

  render() {
    const {
      intl,
      eligibility: { allCustomers, statements, operator },
      updatePageState,
    } = this.props

    const options = {
<<<<<<< HEAD
      shippingMethods: shippingMethods(intl, updatePageState),
=======
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '==',
            object: this.renderInputObject,
          },
          {
            label: 'is not',
            value: '!=',
            object: this.renderInputObject,
          }
        ],
      },
      email: {
        label: 'Email',
        verbs: [
          {
            label: 'contains',
            value: 'contains',
            object: this.renderInputObject,
          },
          {
            label: 'is',
            value: '==',
            object: this.renderInputObject,
          },
          {
            label: 'is not',
            value: '!=',
            object: this.renderInputObject,
          }
        ],
      },
      paymentMethod: {
        label: "Payment method",
        verbs: [
          {
            label: 'is',
            value: '==',
            object: {
              renderFn: this.renderDropdownObject,
              extraParams: {
                queryInfo: {
                  connector: withPaymentMethods,
                  propName: 'paymentMethods'
                },
                isMulti: false
              }
            }
          },
          {
            label: 'is not',
            value: '!=',
            object: {
              renderFn: this.renderDropdownObject,
              extraParams: {
                queryInfo: {
                  connector: withPaymentMethods,
                  propName: 'paymentMethods'
                },
                isMulti: false
              }
            }
          },
          {
            label: 'is any of',
            value: '',
            object: {
              renderFn: this.renderDropdownObject,
              extraParams: {
                connector: withPaymentMethods,
                isMulti: true
              }
            }
          }
        ]
      }
>>>>>>> [WIP] payment methods and item value
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
              subjectPlaceholder={intl.formatMessage({
                id:
                  'promotions.promotion.elligibility.conditionSubjectPlaceholder',
              })}
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
