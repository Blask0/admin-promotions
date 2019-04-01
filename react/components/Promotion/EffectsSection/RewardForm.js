import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Radio, Input, EXPERIMENTAL_Select } from 'vtex.styleguide'
import PromotionsInputCurrency from '../../../components/Promotion/PromotionInputCurrency'

import { getRewardEffectOrderStatusOptions } from '../../../utils/constants'
import { applyFocus } from '../../../utils/functions'

class RewardForm extends Component {
  isDiscountTypeSelected = discountType =>
    this.props.rewardEffect.discountType === discountType

  changeDiscountType = discountType => {
    const {
      onChange,
      rewardEffect: { discount },
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

  changeDiscount = discount =>
    discount &&
    this.props.onChange({
      discount: {
        ...this.props.rewardEffect.discount,
        value: discount,
      },
    })

  changeApplyByOrderStatus = applyByOrderStatus =>
    this.props.onChange({ applyByOrderStatus })

  componentDidUpdate = () => {
    const {
      rewardEffect: { discount },
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
    const { intl, currencyCode, rewardEffect } = this.props
    const orderStatusOptions = getRewardEffectOrderStatusOptions(intl)

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
            <div className="mv4 mh7 w-20">
              <PromotionsInputCurrency
                locale={intl.locale}
                currencyCode={currencyCode}
                value={rewardEffect.discount.value}
                ref={rewardEffect.discount.ref}
                errorMessage={rewardEffect.discount.error}
                onChange={e => this.changeDiscount(e.target.floatValue)}
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
            <div className="mv4 mh7 w-20">
              <Input
                type="number"
                value={rewardEffect.discount.value}
                ref={rewardEffect.discount.ref}
                errorMessage={rewardEffect.discount.error}
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
            label={intl.formatMessage({
              id: 'promotions.promotion.effects.rewardForm.orderStatus.label',
            })}
            options={orderStatusOptions}
            value={rewardEffect.applyByOrderStatus || orderStatusOptions[0]}
            multi={false}
            onChange={selected => {
              selected && this.changeApplyByOrderStatus(selected)
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
    applyByOrderStatus: PropTypes.string,
  }).isRequired,
  currencyCode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default injectIntl(RewardForm)
