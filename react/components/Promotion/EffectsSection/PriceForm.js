import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Radio, Input } from 'vtex.styleguide'

class PriceForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discountType: 'nominal', // oneOf['nominal','percentual','priceTables']
    }
  }

  isDiscountTypeSelected = discountType => this.state.discountType === discountType

  changeDiscountType = discountType => this.setState({ discountType })

  render() {
    console.log('rendering effect section!')
    const { effects, intl } = this.props
    const { discountType } = this.state

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
          {
            this.isDiscountTypeSelected('nominal')
            ? (<div className="mv4 mh7">
                <Input size="small" />
              </div>)
            : null
          }
          <Radio
            id="promotions.promotion.effects.priceForm.discountType.percentual"
            name="percentual-discount-type"
            checked={this.isDiscountTypeSelected('percentual')}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.priceForm.discountType.percentual',
            })}
            onChange={() => this.changeDiscountType('percentual')}
          />
          {
            this.isDiscountTypeSelected('percentual')
            ? (<div className="mv4 mh7">
                <Input size="small" />
              </div>)
            : null
          }
          <Radio
            id="promotions.promotion.effects.priceForm.discountType.priceTables"
            name="price-tables-discount-type"
            checked={this.isDiscountTypeSelected('priceTables')}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.priceForm.discountType.priceTables',
            })}
            onChange={() => this.changeDiscountType('priceTables')}
          />
          {
            this.isDiscountTypeSelected('priceTables')
            ? (<div className="mv4 mh7">
                <Input size="small" />
              </div>)
            : null
          }
        </div>
      </Fragment>
    )
  }
}

PriceForm.propTypes = {
  intl: intlShape,
  effects: PropTypes.shape({
    effectType: PropTypes.string,
  }).isRequired,
  updateProceForm: PropTypes.func.isRequired,
}

export default injectIntl(PriceForm)
