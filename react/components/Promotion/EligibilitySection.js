import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Radio, EXPERIMENTAL_Conditions } from 'vtex.styleguide'

import {
  installments,
  shippingMethods,
  paymentMethods,
  utm,
  zipCodeRange,
  totalPriceRange,
} from '../../utils/conditions/options'

class EligibilitySection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      intl,
      eligibility: { allCustomers, statements, operator },
      updatePageState,
    } = this.props

    const options = {
      installments: installments(intl, updatePageState),
      shippingMethods: shippingMethods(intl, updatePageState),
      paymentMethods: paymentMethods(intl, updatePageState),
      utmSource: utm(intl, updatePageState, 'Source'),
      utmCampaign: utm(intl, updatePageState, 'Campaign'),
      zipCodeRange: zipCodeRange(intl, updatePageState),
      totalPriceRange: totalPriceRange(intl, updatePageState),
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
