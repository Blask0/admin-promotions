import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Radio, EXPERIMENTAL_Conditions, Input } from 'vtex.styleguide'

class EligibilitySection extends Component {
  constructor(props) {
    super(props)
  }

  simpleInputObject = ({ statements, values, statementIndex, error }) => {
    const { updatePageState } = this.props

    return (
      <Input
        value={values || ''}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          updatePageState({
            statements: statements
          })
        }}
      />
    )
  }

  render() {
    const { 
      intl,
      eligibility: {
        allCustomers,
        statements,
        operator
      }, 
      updatePageState
    } = this.props

    const options = {
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '==',
            object: this.simpleInputObject,
          },
          {
            label: 'is not',
            value: '!=',
            object: this.simpleInputObject,
          },
        ],
      },
      email: {
        label: 'Email',
        verbs: [
          {
            label: 'contains',
            value: 'contains',
            object: this.simpleInputObject,
          },
          {
            label: 'is',
            value: '==',
            object: this.simpleInputObject,
          },
          {
            label: 'is not',
            value: '!=',
            object: this.simpleInputObject,
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
    allCustomers: PropTypes.bool.isRequired
  }).isRequired,
  updatePageState: PropTypes.func.isRequired,
}

export default injectIntl(EligibilitySection)
