import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import {
  Alert,
  Conditions,
  EXPERIMENTAL_Conditions,
  Radio,
} from 'vtex.styleguide'

import {
  affiliates,
  cartProduct,
  creditCardBin,
  firstBuy,
  installments,
  marketingTags,
  paymentMethods,
  shippingMethods,
  totalPriceRange,
  utm,
  zipCodeRange,
} from '../../../utils/conditions/options'

class EligibilitySection extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate = () => {
    const {
      eligibility: { statements },
      updatePageState,
    } = this.props

    if (statements.focus) {
      statements.ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })

      updatePageState({
        statements: {
          ...statements,
          focus: false,
        },
      })
    }
  }

  updateEligiblityStatements = statementsValue => {
    const {
      eligibility: { statements },
      updatePageState,
    } = this.props

    updatePageState({
      statements: {
        ...statements,
        value: statementsValue,
        error: undefined,
      },
    })
  }

  render() {
    const {
      intl,
      eligibility: { allCustomers, statements, operator },
      updatePageState,
      currencyCode,
    } = this.props

    const conditionsOptions = {
      affiliates: affiliates(intl, this.updateEligiblityStatements),
      firstBuy: firstBuy(intl, this.updateEligiblityStatements),
      cartProduct: cartProduct(
        intl,
        this.updateEligiblityStatements,
        currencyCode
      ),
      shippingMethods: shippingMethods(intl, this.updateEligiblityStatements),
      paymentMethods: paymentMethods(intl, this.updateEligiblityStatements),
      utmSource: utm(intl, this.updateEligiblityStatements, 'Source'),
      utmCampaign: utm(intl, this.updateEligiblityStatements, 'Campaign'),
      zipCodeRange: zipCodeRange(intl, this.updateEligiblityStatements),
      totalPriceRange: totalPriceRange(
        intl,
        this.updateEligiblityStatements,
        currencyCode
      ),
      creditCardBin: creditCardBin(intl, this.updateEligiblityStatements),
      marketingTags: marketingTags(intl, this.updateEligiblityStatements),
    }

    const conditionsOptions2 = {
      installments: installments(intl),
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
              statements: {
                ...statements,
                focus: false,
                error: undefined,
              },
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
              onChangeStatements={statementsValue => {
                updatePageState({
                  statements: {
                    ...statements,
                    value: statementsValue,
                    error: undefined,
                  },
                })
              }}
            />
            <Conditions
              canDelete
              labels={conditionsLabels}
              onChangeOperator={({ operator }) => {
                updatePageState({ operator })
              }}
              onChangeStatements={newStatements => {
                console.log('Changed statements to:', newStatements)
                updatePageState({
                  statements: {
                    ...statements,
                    value: newStatements,
                    error: undefined,
                  },
                })
              }}
              operator={operator}
              options={conditionsOptions2}
              subjectPlaceholder={intl.formatMessage({
                id:
                  'promotions.promotion.elligibility.conditions.subjectPlaceholder',
              })}
              statements={statements.value}
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
  currencyCode: PropTypes.string,
}

export default injectIntl(EligibilitySection)
