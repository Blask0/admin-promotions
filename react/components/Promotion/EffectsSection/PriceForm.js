import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Radio, Input, EXPERIMENTAL_Conditions } from 'vtex.styleguide'

import {
  brand,
  category,
  collection,
  product,
  seller,
  sku,
} from '../../../utils/scopeSelector/options'

class PriceForm extends Component {
  isDiscountTypeSelected = discountType =>
    this.props.priceEffect.discountType === discountType

  changeDiscountType = discountType => this.props.onChange({ discountType })

  changeDiscount = discount => this.props.onChange({ discount })

  changeAppliesTo = appliesTo => this.props.onChange({ appliesTo })

  changeAppliesToStatements = statements => {
    const { priceEffect } = this.props
    this.props.onChange({
      appliesTo: {
        ...priceEffect.appliesTo,
        ...statements,
      },
    })
  }

  changeAllProductsFlag = allProducts =>
    this.props.onChange({
      appliesTo: {
        allProducts,
      },
    })

  render() {
    const { priceEffect, intl } = this.props

    const scopeOptions = {
      brand: brand(intl, this.changeAppliesToStatements),
      category: category(intl, this.changeAppliesToStatements),
      collection: collection(intl, this.changeAppliesToStatements),
      product: product(intl, this.changeAppliesToStatements),
      seller: seller(intl, this.changeAppliesToStatements),
      sku: sku(intl, this.changeAppliesToStatements),
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
            <div className="mv4 mh7">
              <Input onChange={e => this.changeDiscount(e.target.value)} />
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
            <div className="mv4 mh7">
              <Input
                type="number"
                onChange={e => this.changeDiscount(e.target.value)}
                prefix={<span className="b f6">%</span>}
              />
            </div>
          ) : null}
          <Radio
            id="promotions.promotion.effects.priceForm.discountType.priceTables"
            name="price-tables-discount-type"
            checked={this.isDiscountTypeSelected('priceTables')}
            label={intl.formatMessage({
              id:
                'promotions.promotion.effects.priceForm.discountType.priceTables',
            })}
            onChange={() => this.changeDiscountType('priceTables')}
          />
          {this.isDiscountTypeSelected('priceTables') ? (
            <div className="mv4 mh7">
              <Input onChange={e => this.changeDiscount(e.target.value)} />
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
            onChange={() => this.changeAllProductsFlag(true)}
          />
          <Radio
            id="promotions.promotion.effects.priceForm.appliesTo.specific"
            name="applies-to-specific-products"
            checked={!priceEffect.appliesTo.allProducts}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.priceForm.appliesTo.specific',
            })}
            onChange={() => this.changeAllProductsFlag(false)}
          />
          {!priceEffect.appliesTo.allProducts ? (
            <div className="mv4 mh7">
              <EXPERIMENTAL_Conditions
                options={scopeOptions}
                subjectPlaceholder={intl.formatMessage({
                  id:
                    'promotions.promotion.effects.priceForm.appliesTo.specific.placeholder',
                })}
                labels={conditionsLabels}
                statements={priceEffect.appliesTo.statements}
                operator={'all'} // WIP
                onChangeOperator={({ operator }) => {
                  console.log('OPERATOR CHANGE: ', operator)
                }}
                onChangeStatements={statements => {
                  this.changeAppliesToStatements({ statements })
                }}
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
    discount: PropTypes.string,
    appliesTo: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default injectIntl(PriceForm)
