import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Radio, Input, EXPERIMENTAL_Conditions } from 'vtex.styleguide'

class PriceForm extends Component {
  isDiscountTypeSelected = discountType =>
    this.props.priceEffect.discountType === discountType

  changeDiscountType = discountType => this.props.onChange({ discountType })

  changeDiscount = discount => this.props.onChange({ discount })

  changeAppliesTo = appliesTo => this.props.onChange({ appliesTo })

  changeScopeQuery = (statements, operator) => {
    const conjunction = operator === 'any' ? ' or ' : ' && '

    const filterQuery = statements.reduce(
      (currentExpression, statement, index) => {
        const statementExpression = scopeTranspilers[statement.subject](
          statement
        )

        if (index === 0) {
          return statementExpression
        }

        return `${currentExpression} ${conjunction} ${statementExpression}`
      },
      ''
    )

    this.props.onChange({ filterQuery })
  }

  scopeTranspilers = {
    productId: statementDefinition => {},
    sku: statementDefinition => {},
    brand: statementDefinition => {},
    category: statementDefinition => {},
    collection: statementDefinition => {},
    sellers: statementDefinition => {},
  }
  render() {
    console.log('rendering effect section!')
    const { priceEffect, intl } = this.props

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
              <Input
                onChange={e => this.changeDiscount(e.target.value)}
                size="small"
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
            <div className="mv4 mh7">
              <Input
                type="number"
                onChange={e => this.changeDiscount(e.target.value)}
                prefix={<span className="b f6">%</span>}
                size="small"
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
              <Input
                onChange={e => this.changeDiscount(e.target.value)}
                size="small"
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
            checked={!priceEffect.appliesTo}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.priceForm.appliesTo.all',
            })}
            onChange={() => this.changeAppliesTo(null)}
          />
          <Radio
            id="promotions.promotion.effects.priceForm.appliesTo.specific"
            name="applies-to-specific-products"
            checked={priceEffect.appliesTo}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.priceForm.appliesTo.specific',
            })}
            onChange={() => this.changeAppliesTo([])}
          />
          {priceEffect.appliesTo ? (
            <div className="mv4 mh7">
              <EXPERIMENTAL_Conditions
                options={[]} // WIP
                subjectPlaceholder={intl.formatMessage({
                  id:
                    'promotions.promotion.effects.priceForm.appliesTo.specific.placeholder',
                })}
                statements={priceEffect.appliesTo}
                operator={'all'} // WIP
                onChangeOperator={({ operator }) => {
                  console.log('OPERATOR CHANGE: ', operator)
                }}
                onChangeStatements={statements => {
                  this.changeAppliesTo(statements)
                  this.changeScopeQuery(statements)
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
    appliesTo: PropTypes.any,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default injectIntl(PriceForm)
