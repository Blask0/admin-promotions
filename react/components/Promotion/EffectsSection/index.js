import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import Price from '../../Icon/Price'
import Gift from '../../Icon/Gift'
import Shipping from '../../Icon/Shipping'
import Reward from '../../Icon/Reward'

import SelectableCard from './SelectableCard'
import PriceForm from './PriceForm'
import ShippingForm from './ShippingForm'
import RewardForm from './RewardForm'

class EffectSection extends Component {
  isEffectActive = activeEffectType =>
    this.props.effects.activeEffectType === activeEffectType

  changeActiveEffectType = activeEffectType => {
    this.props.updatePageState({
      ...this.props.effects,
      activeEffectType,
    })
  }

  updatePriceEffect = price => {
    this.props.updatePageState({
      ...this.props.effects,
      activeEffectType: 'price',
      price: {
        ...this.props.effects.price,
        ...price,
      },
    })
  }

  updateGiftEffect = gift => {
    this.props.updatePageState({
      ...this.props.effects,
      activeEffectType: 'gift',
      gift: {
        ...this.props.effects.gift,
        ...gift,
      },
    })
  }

  updateShippingEffect = shipping => {
    this.props.updatePageState({
      ...this.props.effects,
      activeEffectType: 'shipping',
      shipping: {
        ...this.props.effects.shipping,
        ...shipping,
      },
    })
  }

  updateRewardEffect = reward => {
    this.props.updatePageState({
      ...this.props.effects,
      activeEffectType: 'reward',
      reward: {
        ...this.props.effects.reward,
        ...reward,
      },
    })
  }

  renderEffectFormByType = activeEffectType => {
    const { effects, currencyCode } = this.props
    switch (activeEffectType) {
      case 'price':
        return (
          <PriceForm
            priceEffect={effects.price}
            onChange={this.updatePriceEffect}
          />
        )
      case 'gift':
        return (
          // TO DO: implement gift form
          <h1 className="tc ma7">gift</h1>
        )
      case 'shipping':
        return (
          <ShippingForm
            shippingEffect={effects.shipping}
            currencyCode={currencyCode}
            onChange={this.updateShippingEffect}
          />
        )
      case 'reward':
        return (
          <RewardForm
            rewardEffect={effects.reward}
            currencyCode={currencyCode}
            onChange={this.updateRewardEffect}
          />
        )
      default:
        return null
    }
  }

  render() {
    const { intl, effects, currencyCode } = this.props

    return (
      <Fragment>
        <h4 className="t-heading-4 mt0">
          <FormattedMessage id="promotions.promotion.effects.title" />
        </h4>
        <div className="flex flex-row">
          <div className="mh3">
            <SelectableCard
              selected={this.isEffectActive('price')}
              onClick={() => this.changeActiveEffectType('price')}>
              <div className="flex flex-column items-center center tc ph5">
                <Price />
                <div className="t-heading-4 b mt5">
                  <FormattedMessage id="promotions.promotion.effects.price" />
                </div>
              </div>
            </SelectableCard>
          </div>
          <div className="mh3">
            <SelectableCard
              selected={this.isEffectActive('gift')}
              onClick={() => this.changeActiveEffectType('gift')}>
              <div className="flex flex-column items-center center tc ph5">
                <Gift />
                <div className="t-heading-4 b mt5">
                  <FormattedMessage id="promotions.promotion.effects.gift" />
                </div>
              </div>
            </SelectableCard>
          </div>
          <div className="mh3">
            <SelectableCard
              selected={this.isEffectActive('shipping')}
              onClick={() => this.changeActiveEffectType('shipping')}>
              <div className="flex flex-column items-center center tc ph5">
                <Shipping />
                <div className="t-heading-4 b mt5">
                  <FormattedMessage id="promotions.promotion.effects.shipping" />
                </div>
              </div>
            </SelectableCard>
          </div>
          <div className="mh3">
            <SelectableCard
              selected={this.isEffectActive('reward')}
              onClick={() => this.changeActiveEffectType('reward')}>
              <div className="flex flex-column items-center center tc ph5">
                <Reward />
                <div className="t-heading-4 b mt5">
                  <FormattedMessage id="promotions.promotion.effects.reward" />
                </div>
              </div>
            </SelectableCard>
          </div>
        </div>
        <div className="flex flex-column">
          {this.renderEffectFormByType(effects.activeEffectType)}
        </div>
      </Fragment>
    )
  }
}

EffectSection.propTypes = {
  intl: intlShape,
  effects: PropTypes.shape({
    activeEffectType: PropTypes.string,
    price: PropTypes.object,
    gift: PropTypes.object,
    shipping: PropTypes.object,
    reward: PropTypes.object,
  }).isRequired,
  updatePageState: PropTypes.func.isRequired,
  currencyCode: PropTypes.string,
}

export default injectIntl(EffectSection)
