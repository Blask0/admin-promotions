import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Radio, Input } from 'vtex.styleguide'

class ShippingForm extends Component {
  isDiscountTypeSelected = discountType =>
    this.props.shippingEffect.discountType === discountType

  changeDiscountType = discountType => this.props.onChange({ discountType })

  changeDiscount = discount => this.props.onChange({ discount })

  render() {
    const { intl } = this.props

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
              <Input
                onChange={e => this.changeDiscount(e.target.value)}
                size="small"
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
              <Input
                type="number"
                onChange={e => this.changeDiscount(e.target.value)}
                prefix={<span className="b f6">%</span>}
                size="small"
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
              <Input
                onChange={e => this.changeDiscount(e.target.value)}
                size="small"
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
    discount: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default injectIntl(ShippingForm)
