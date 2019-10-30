import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Radio, Input, Conditions, Alert } from 'vtex.styleguide'
import PromotionsInputCurrency from '../../../../components/Promotion/PromotionInputCurrency'
import InputPercentage from '../../../utils/InputPercentage'

import { brand, category, collection, product, seller, sku } from './options'

import { applyFocus } from '../../../../utils/functions'

class PriceForm extends Component {
  isDiscountTypeSelected = discountType =>
    this.props.priceEffect.discountType === discountType

  changeDiscountType = discountType => {
    const {
      onChange,
      priceEffect: { discount },
    } = this.props
    onChange({
      discountType,
      discount: {
        ...discount,
        value: undefined,
        error: undefined,
      },
    })
  }

  changeDiscount = discountWithoutValidation => {
    const {
      onChange,
      priceEffect: { discount },
    } = this.props

    onChange({
      discount: {
        ...discount,
        value: discountWithoutValidation,
        error: undefined,
      },
    })
  }

  changeAppliesTo = appliesTo => {
    const { priceEffect } = this.props
    this.props.onChange({
      appliesTo: {
        ...priceEffect.appliesTo,
        ...appliesTo,
      },
    })
  }

  componentDidUpdate = () => {
    const {
      priceEffect: {
        discount,
        appliesTo: { statements },
      },
      onChange,
    } = this.props

    if (discount.focus) {
      applyFocus({
        changeObject: {
          discount,
        },
        changeFunction: onChange,
      })
    }

    if (statements.focus) {
      statements.ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })

      onChange({
        appliesTo: {
          ...this.props.priceEffect.appliesTo,
          statements: {
            ...statements,
            focus: false,
          },
        },
      })
    }
  }

  updateScopeStatements = statementsValue => {
    const {
      priceEffect: {
        appliesTo: { statements },
      },
    } = this.props

    this.changeAppliesTo({
      statements: {
        ...statements,
        value: statementsValue,
        error: undefined,
      },
    })
  }

  render() {
    const { priceEffect, intl, currencyCode } = this.props

    const scopeOptions = {
      brand: brand(intl),
      category: category(intl),
      collection: collection(intl),
      product: product(intl),
      seller: seller(intl),
      sku: sku(intl),
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
        <h4 className="t-heading-4 mt7">
          <FormattedMessage id="promotions.promotion.effects.priceForm.discountType.title" />
        </h4>
        <div className="mh4">
          <Radio
            id="promotions.promotion.effects.priceForm.discountType.nominal"
            name="nominal-discount-type"
            checked={this.isDiscountTypeSelected('nominal')}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.priceForm.discountType.nominal',
            })}
            onChange={() => this.changeDiscountType('nominal')}
          />
          {this.isDiscountTypeSelected('nominal') ? (
            <div className="mv4 mh7 w-20">
              <PromotionsInputCurrency
                // Temporary workaround until render supports `react-intl` v3.
                // For more info see https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-withref-to-forwardref
                intl={intl}
                locale={intl.locale}
                currencyCode={currencyCode}
                value={priceEffect.discount.value}
                ref={priceEffect.discount.ref}
                errorMessage={priceEffect.discount.error}
                onChange={e => this.changeDiscount(e.target.value)}
                placeholder={intl.formatMessage({
                  id: 'promotions.promotion.effects.priceForm.placeholder',
                })}
              />
            </div>
          ) : null}
          <Radio
            id="promotions.promotion.effects.priceForm.discountType.percentual"
            name="percentual-discount-type"
            checked={this.isDiscountTypeSelected('percentual')}
            label={intl.formatMessage({
              id:
                'promotions.promotion.effects.priceForm.discountType.percentual',
            })}
            onChange={() => this.changeDiscountType('percentual')}
          />
          {this.isDiscountTypeSelected('percentual') ? (
            <div className="mv4 mh7 w-20">
              <InputPercentage
                ref={priceEffect.discount.ref}
                value={priceEffect.discount.value}
                errorMessage={priceEffect.discount.error}
                onChange={e => this.changeDiscount(e.target.value)}
              />
            </div>
          ) : null}
          <Radio
            id="promotions.promotion.effects.priceForm.discountType.priceTable"
            name="price-tables-discount-type"
            checked={this.isDiscountTypeSelected('priceTable')}
            label={intl.formatMessage({
              id:
                'promotions.promotion.effects.priceForm.discountType.priceTable',
            })}
            onChange={() => this.changeDiscountType('priceTable')}
          />
          {this.isDiscountTypeSelected('priceTable') ? (
            <div className="mv4 mh7 w-20">
              <Input
                value={priceEffect.discount.value}
                ref={priceEffect.discount.ref}
                errorMessage={priceEffect.discount.error}
                onChange={e => this.changeDiscount(e.target.value)}
              />
            </div>
          ) : null}
        </div>
        <h4 className="t-heading-4 mt7">
          <FormattedMessage id="promotions.promotion.effects.priceForm.appliesTo.title" />
        </h4>
        <div className="mh4">
          <Radio
            id="promotions.promotion.effects.priceForm.appliesTo.all"
            name="applies-to-all-products"
            checked={priceEffect.appliesTo.allProducts}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.priceForm.appliesTo.all',
            })}
            onChange={() =>
              this.changeAppliesTo({
                allProducts: true,
                statements: {
                  ...priceEffect.appliesTo.statements,
                  focus: false,
                  error: undefined,
                },
              })
            }
          />
          <Radio
            id="promotions.promotion.effects.priceForm.appliesTo.specific"
            name="applies-to-specific-products"
            checked={!priceEffect.appliesTo.allProducts}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.priceForm.appliesTo.specific',
            })}
            onChange={() =>
              this.changeAppliesTo({
                allProducts: false,
              })
            }
          />
          {priceEffect.appliesTo.statements.error && (
            <div className="mb5 flex justify-center w-100">
              <Alert type="error" ref={priceEffect.appliesTo.statements.ref}>
                {priceEffect.appliesTo.statements.error}
              </Alert>
            </div>
          )}
          {!priceEffect.appliesTo.allProducts ? (
            <div className="mv4 mh7">
              <Conditions
                canDelete
                labels={conditionsLabels}
                onChangeOperator={operator => this.changeAppliesTo({ operator })}
                onChangeStatements={newStatements => {
                  this.changeAppliesTo({
                    statements: {
                      ...priceEffect.appliesTo.statements,
                      value: newStatements,
                      error: undefined,
                    },
                  })
                }}
                operator={priceEffect.appliesTo.operator}
                options={scopeOptions}
                showOperator
                subjectPlaceholder={intl.formatMessage({
                  id:
                    'promotions.promotion.effects.priceForm.appliesTo.specific.placeholder',
                })}
                statements={priceEffect.appliesTo.statements.value}
              />
            </div>
          ) : null}
        </div>
      </Fragment>
    )
  }
}

PriceForm.propTypes = {
  intl: intlShape,
  priceEffect: PropTypes.shape({
    discountType: PropTypes.string,
    discount: PropTypes.object,
    appliesTo: PropTypes.object,
  }).isRequired,
  currencyCode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default injectIntl(PriceForm)
