import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Alert } from 'vtex.styleguide'
import Price from '../../Icon/Price'
import Gift from '../../Icon/Gift'
import Shipping from '../../Icon/Shipping'
import Reward from '../../Icon/Reward'

import SelectableCard from './SelectableCard'
import PriceForm from './PriceForm'
import ShippingForm from './ShippingForm'
import RewardForm from './RewardForm'
import GiftForm from './GiftForm'

import { applyFocus } from '../../../utils/functions'

class EffectSection extends Component {
  isEffectActive = activeEffectType =>
    this.props.effects.activeEffectType.value === activeEffectType

  changeActiveEffectType = activeEffectType => {
    this.props.updatePageState({
      ...this.props.effects,
      activeEffectType: {
        value: activeEffectType,
        error: undefined,
      },
    })
  }

  updatePriceEffect = price => {
    this.props.updatePageState({
      ...this.props.effects,
      activeEffectType: {
        value: 'price',
        error: undefined,
      },
      price: {
        ...this.props.effects.price,
        ...price,
      },
    })
  }

  updateGiftEffect = gift => {
    this.props.updatePageState({
      ...this.props.effects,
      activeEffectType: {
        value: 'gift',
        error: undefined,
      },
      gift: {
        ...this.props.effects.gift,
        ...gift,
      },
    })
  }

  updateShippingEffect = shipping => {
    this.props.updatePageState({
      ...this.props.effects,
      activeEffectType: {
        value: 'shipping',
        error: undefined,
      },
      shipping: {
        ...this.props.effects.shipping,
        ...shipping,
      },
    })
  }

  updateRewardEffect = reward => {
    this.props.updatePageState({
      ...this.props.effects,
      activeEffectType: {
        value: 'reward',
        error: undefined,
      },
      reward: {
        ...this.props.effects.reward,
        ...reward,
      },
    })
  }

  renderEffectFormByType = activeEffectType => {
    const { effects, currencyCode, applyFocus } = this.props
    switch (activeEffectType) {
      case 'price':
        return (
          <PriceForm
            priceEffect={effects.price}
            currencyCode={currencyCode}
            applyFocus={applyFocus}
            onChange={this.updatePriceEffect}
          />
        )
      case 'gift':
        return (
          <GiftForm
            giftEffect={effects.gift}
            onChange={this.updateGiftEffect}
          />
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

  componentDidUpdate = () => {
    const {
      effects: { activeEffectType },
      updatePageState,
    } = this.props

    // TODO: Add ref prop to Alert component
    if (activeEffectType.focus) {
      // applyFocus({
      //   changeObject: {
      //     activeEffectType,
      //   },
      //   changeFunction: updatePageState,
      // })
    }
  }

  render() {
    const { intl, effects, currencyCode } = this.props

    return (
      <Fragment>
        <h4 className="t-heading-4 mt0">
          <FormattedMessage id="promotions.promotion.effects.title" />
        </h4>

        {effects.activeEffectType.error && (
          <div className="mb5 flex justify-center w-100">
            <Alert type="error" ref={effects.activeEffectType.ref}>
              {effects.activeEffectType.error}
            </Alert>
          </div>
        )}

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
          {this.renderEffectFormByType(effects.activeEffectType.value)}
        </div>
      </Fragment>
    )
  }
}

EffectSection.propTypes = {
  intl: intlShape,
  effects: PropTypes.shape({
    activeEffectType: PropTypes.object,
    price: PropTypes.object,
    gift: PropTypes.object,
    shipping: PropTypes.object,
    reward: PropTypes.object,
  }).isRequired,
  updatePageState: PropTypes.func.isRequired,
  currencyCode: PropTypes.string,
}

export default injectIntl(EffectSection)
