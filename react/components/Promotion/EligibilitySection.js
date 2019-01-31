import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Radio, EXPERIMENTAL_Conditions } from 'vtex.styleguide'

import {
  affiliates,
  installments,
  firstBuy,
  cartProduct,
  shippingMethods,
  paymentMethods,
  utm,
  zipCodeRange,
  totalPriceRange,
  clusterExpressions,
  creditCardBin,
} from '../../utils/conditions/options'

import withSalesChannels from '../../connectors/withSalesChannels'

class EligibilitySection extends Component {
  constructor(props) {
    super(props)
  }

  getAffectedSalesChannels = () => {
    const { restrictedSalesChannelsIds, salesChannels } = this.props
    return restrictedSalesChannelsIds && restrictedSalesChannelsIds.length > 0
      ? salesChannels.filter(({ id }) =>
        restrictedSalesChannelsIds.includes(id)
      )
      : salesChannels.filter(({ id }) => id === '1')
  }

  render() {
    const {
      intl,
      eligibility: { allCustomers, statements, operator },
      updatePageState,
    } = this.props

    const [{ currencyCode } = {}] = this.getAffectedSalesChannels()

    const options = {
      installments: installments(intl, updatePageState),
      affiliates: affiliates(intl, updatePageState),
      firstBuy: firstBuy(intl, updatePageState),
      cartProduct: cartProduct(intl, updatePageState, currencyCode),
      shippingMethods: shippingMethods(intl, updatePageState),
      paymentMethods: paymentMethods(intl, updatePageState),
      utmSource: utm(intl, updatePageState, 'Source'),
      utmCampaign: utm(intl, updatePageState, 'Campaign'),
      zipCodeRange: zipCodeRange(intl, updatePageState),
      totalPriceRange: totalPriceRange(intl, updatePageState, currencyCode),
      clusterExpressions: clusterExpressions(intl, updatePageState),
      creditCardBin: creditCardBin(intl, updatePageState),
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

export default injectIntl(withSalesChannels(EligibilitySection))
