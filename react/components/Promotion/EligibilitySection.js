import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Radio, EXPERIMENTAL_Conditions, Alert } from 'vtex.styleguide'

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
  marketingTags,
} from '../../utils/conditions/options'

class EligibilitySection extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate = () => {
    const {
      eligibility: { statements },
      applyFocus,
    } = this.props

    // TODO: Add ref prop to Alert component
    if (statements.focus) {
      // applyFocus({ sectionName: 'eligibility', fieldName: 'statements' })
    }
  }

  render() {
    const {
      intl,
      eligibility: { allCustomers, statements, operator },
      updatePageState,
      currencyCode,
    } = this.props

    const conditionsOptions = {
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
      marketingTags: marketingTags(intl, updatePageState),
    }

    const conditionsLabels = {
      addNewCondition: intl.formatMessage({
        id: 'promotions.promotion.elligibility.conditions.addNewCondition',
      }),
      noConditions: intl.formatMessage({
        id: 'promotions.promotion.elligibility.conditions.noConditions',
      }),
      operatorAll: intl.formatMessage({
        id: 'promotions.promotion.elligibility.conditions.operatorAll',
      }),
      operatorAny: intl.formatMessage({
        id: 'promotions.promotion.elligibility.conditions.operatorAny',
      }),
      operatorAnd: intl.formatMessage({
        id: 'promotions.promotion.elligibility.conditions.operatorAnd',
      }),
      operatorOr: intl.formatMessage({
        id: 'promotions.promotion.elligibility.conditions.operatorOr',
      }),
      headerPrefix: intl.formatMessage({
        id: 'promotions.promotion.elligibility.conditions.headerPrefix',
      }),
      headerSufix: intl.formatMessage({
        id: 'promotions.promotion.elligibility.conditions.headerSufix',
      }),
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
        {statements.error && (
          <div className="mb5 flex justify-center w-100">
            <Alert type="error" ref={statements.ref}>
              {statements.error}
            </Alert>
          </div>
        )}

        {!allCustomers ? (
          <div className="mt6">
            <EXPERIMENTAL_Conditions
              options={conditionsOptions}
              subjectPlaceholder={intl.formatMessage({
                id:
                  'promotions.promotion.elligibility.conditions.subjectPlaceholder',
              })}
              labels={conditionsLabels}
              statements={statements.value}
              operator={operator}
              onChangeOperator={({ operator }) => {
                updatePageState({ operator })
              }}
              onChangeStatements={statements => {
                updatePageState({
                  statements: {
                    ...statements,
                    value: statements,
                    error: undefined,
                  },
                })
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
  applyFocus: PropTypes.func,
  updatePageState: PropTypes.func.isRequired,
  currencyCode: PropTypes.string,
}

export default injectIntl(EligibilitySection)
