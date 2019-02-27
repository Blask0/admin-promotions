import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import {
  Radio,
  Input,
  InputCurrency,
  EXPERIMENTAL_Select,
} from 'vtex.styleguide'

class RewardForm extends Component {
  isDiscountTypeSelected = discountType =>
    this.props.rewardEffect.discountType === discountType

  changeDiscountType = discountType => this.props.onChange({ discountType })

  changeDiscount = discount =>
    this.props.onChange({
      discount: {
        value: discount,
      },
    })

  changeApplyByOrderStatus = applyByOrderStatus =>
    this.props.onChange({ applyByOrderStatus })

  render() {
    const { intl, currencyCode, rewardEffect } = this.props

    const options = [
      {
        value: 'invoiced',
        label: 'Invoiced',
      },
      {
        value: 'payment-approved',
        label: 'Payment approved',
      },
    ]

    return (
      <Fragment>
        <div className="mh4 mt7">
          <Radio
            id="promotions.promotion.effects.rewardForm.nominal"
            name="nominal-discount-type"
            checked={this.isDiscountTypeSelected('nominal')}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.rewardForm.nominal',
            })}
            onChange={() => this.changeDiscountType('nominal')}
          />
          {this.isDiscountTypeSelected('nominal') ? (
            <div className="mv4 mh7">
              <InputCurrency
                locale={intl.locale}
                currencyCode={currencyCode}
                value={rewardEffect.discount.value}
                errrorMessage={rewardEffect.discount.error}
                onChange={e => this.changeDiscount(e.target.value)}
                placeholder={intl.formatMessage({
                  id: 'promotions.promotion.effects.rewardForm.placeholder',
                })}
              />
            </div>
          ) : null}
          <Radio
            id="promotions.promotion.effects.rewardForm.percentual"
            name="percentual-discount-type"
            checked={this.isDiscountTypeSelected('percentual')}
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.rewardForm.percentual',
            })}
            onChange={() => this.changeDiscountType('percentual')}
          />
          {this.isDiscountTypeSelected('percentual') ? (
            <div className="mv4 mh7">
              <Input
                type="number"
                value={rewardEffect.discount.value}
                errrorMessage={rewardEffect.discount.error}
                onChange={e => this.changeDiscount(e.target.value)}
                placeholder={intl.formatMessage({
                  id: 'promotions.promotion.effects.rewardForm.placeholder',
                })}
                prefix={<span className="b f6">%</span>}
              />
            </div>
          ) : null}
        </div>
        <div className="mh4 mt4">
          <EXPERIMENTAL_Select
            label={'Apply reward when order status changes to'}
            options={options}
            value={rewardEffect.applyByOrderStatus || options[0]}
            multi={false}
            onChange={selected => {
              this.changeApplyByOrderStatus(selected.value)
            }}
          />
        </div>
      </Fragment>
    )
  }
}

RewardForm.propTypes = {
  intl: intlShape,
  rewardEffect: PropTypes.shape({
    discountType: PropTypes.oneOf(['nominal', 'percentual']),
    discount: PropTypes.number,
    applyByOrderStatus: PropTypes.string, // oneOf possible order status
  }).isRequired,
  currencyCode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default injectIntl(RewardForm)
