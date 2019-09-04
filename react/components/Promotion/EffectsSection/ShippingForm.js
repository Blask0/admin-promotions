import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Radio } from 'vtex.styleguide'
import PromotionsInputCurrency from '../../../components/Promotion/PromotionInputCurrency'
import InputPercentage from '../../utils/InputPercentage'

import { applyFocus } from '../../../utils/functions'

class ShippingForm extends Component {
  isDiscountTypeSelected = discountType =>
    this.props.shippingEffect.discountType === discountType

  changeDiscountType = discountType => {
    const {
      onChange,
      shippingEffect: { discount },
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
      shippingEffect: { discount },
    } = this.props

    onChange({
      discount: {
        ...discount,
        value: discountWithoutValidation,
        error: undefined,
      },
    })
  }

  componentDidUpdate = () => {
    const {
      shippingEffect: { discount },
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
  }

  render() {
    const { intl, currencyCode, shippingEffect } = this.props

    return (
      <Fragment>
        <div className="mh4 mt7">
          <Radio
            id="promotions.promotion.effects.shippingForm.nominal"
            name="nominal-discount-type"
            checked={this.isDiscountTypeSelected('nominal')}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.shippingForm.nominal',
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
                value={shippingEffect.discount.value}
                ref={shippingEffect.discount.ref}
                errorMessage={shippingEffect.discount.error}
                onChange={e => this.changeDiscount(e.target.value)}
                placeholder={intl.formatMessage({
                  id: 'promotions.promotion.effects.shippingForm.placeholder',
                })}
              />
            </div>
          ) : null}
          <Radio
            id="promotions.promotion.effects.shippingForm.percentual"
            name="percentual-discount-type"
            checked={this.isDiscountTypeSelected('percentual')}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.shippingForm.percentual',
            })}
            onChange={() => this.changeDiscountType('percentual')}
          />
          {this.isDiscountTypeSelected('percentual') ? (
            <div className="mv4 mh7 w-20">
              <InputPercentage
                ref={shippingEffect.discount.ref}
                value={shippingEffect.discount.value}
                errorMessage={shippingEffect.discount.error}
                onChange={e => this.changeDiscount(e.target.value)}
              />
            </div>
          ) : null}
          <Radio
            id="promotions.promotion.effects.shippingForm.maximumValue"
            name="price-tables-discount-type"
            checked={this.isDiscountTypeSelected('maximumValue')}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.shippingForm.maximumValue',
            })}
            onChange={() => this.changeDiscountType('maximumValue')}
          />
          {this.isDiscountTypeSelected('maximumValue') ? (
            <div className="mv4 mh7 w-20">
              <PromotionsInputCurrency
                locale={intl.locale}
                currencyCode={currencyCode}
                value={shippingEffect.discount.value}
                ref={shippingEffect.discount.ref}
                errorMessage={shippingEffect.discount.error}
                onChange={e => this.changeDiscount(e.target.value)}
                placeholder={intl.formatMessage({
                  id: 'promotions.promotion.effects.shippingForm.placeholder',
                })}
              />
            </div>
          ) : null}
        </div>
      </Fragment>
    )
  }
}

ShippingForm.propTypes = {
  intl: intlShape,
  shippingEffect: PropTypes.shape({
    discountType: PropTypes.string,
    discount: PropTypes.shape({
      value: PropTypes.number,
      error: PropTypes.string,
      focus: PropTypes.bool,
    }),
  }).isRequired,
  currencyCode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default injectIntl(ShippingForm)
