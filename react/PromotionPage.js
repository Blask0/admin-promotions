import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Layout, PageBlock, PageHeader, Button } from 'vtex.styleguide'

import EffectsSection from './components/Promotion/EffectsSection'
import EligibilitySection from './components/Promotion/EligibilitySection'
import GeneralSection from './components/Promotion/GeneralSection'
import RestrictionSection from './components/Promotion/RestrictionSection'

import withSalesChannels from './connectors/withSalesChannels'
import withPromotion from './connectors/withPromotion'
import savingPromotion from './connectors/savingPromotion'

import { newPromotion } from './utils/promotion'

import { compose } from 'react-apollo'

class PromotionPage extends Component {
  constructor(props) {
    super(props)

    const { promotion, salesChannels } = props

    this.state = {
      promotion: newPromotion(promotion, salesChannels),
    }
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  // componentDidUpdate = prevProps => {
  //   if (this.props.promotion && this.props.promotion !== prevProps.promotion) {
  //     this.setState({
  //       promotion: newPromotion(this.props.promotion),
  //     })
  //   }
  // }

  validate = () => {
    const {
      generalInfo,
      isValid: isGeneralInfoValid,
    } = this.validateGeneralInfoSection()

    const { effects, isValid: isEffectsValid } = this.validateEffectsSection()

    const {
      restriction,
      isValid: isRestrictionValid,
    } = this.validateRestrictionSection()

    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        generalInfo,
        effects,
        restriction,
      },
    }))

    return isGeneralInfoValid && isEffectsValid && isRestrictionValid
  }

  validateGeneralInfoSection = () => {
    let isValid = true
    const { intl } = this.props
    const {
      promotion: { generalInfo },
    } = this.state

    if (
      !generalInfo.name.value ||
      (generalInfo.name.value && generalInfo.name.value.trim() == '')
    ) {
      generalInfo.name.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    if (
      generalInfo.hasEndDate &&
      new Date(generalInfo.endDate.value).getTime() <
        new Date(generalInfo.startDate).getTime()
    ) {
      generalInfo.endDate.error = intl.formatMessage({
        id: 'validation.endDateSmaller',
      })
      isValid = false
    }

    return { generalInfo, isValid }
  }

  validateEffectsSection = () => {
    const {
      promotion: { effects },
    } = this.state

    if (!effects.activeEffectType) {
      return { effects, isValid: false }
    }

    if (effects.activeEffectType === 'price') {
      return this.validatePriceEffect()
    } else if (effects.activeEffectType === 'gift') {
      return this.validateGiftEffect()
    } else if (effects.activeEffectType === 'shipping') {
      return this.validateShippingEffect()
    } else if (effects.activeEffectType === 'reward') {
      return this.validateRewardEffect()
    }
  }

  validatePriceEffect = () => {
    let isValid = true
    const { intl } = this.props
    const {
      promotion: { effects },
    } = this.state

    if (!effects.price.discount.value) {
      effects.price.discount.error = intl.formatMessage({
        id: 'validation.emptyField',
      })

      isValid = false
    }

    return { effects, isValid }
  }

  validateGiftEffect = () => {
    let isValid = true
    const { intl } = this.props
    const {
      promotion: { effects },
    } = this.state

    if (effects.gift.skus.value.length === 0) {
      effects.gift.skus.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    if (
      effects.gift.limitQuantityPerPurchase &&
      !effects.gift.maxNumOfAffectedItems.value
    ) {
      effects.gift.maxNumOfAffectedItems.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    return { effects, isValid }
  }

  validateShippingEffect = () => {
    let isValid = true
    const { intl } = this.props
    const {
      promotion: { effects },
    } = this.state

    if (!effects.shipping.discount.value) {
      effects.shipping.discount.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    return { effects, isValid }
  }

  validateRewardEffect = () => {
    let isValid = true
    const { intl } = this.props
    const {
      promotion: { effects },
    } = this.state

    if (!effects.reward.discount.value) {
      effects.reward.discount.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    return { effects, isValid }
  }

  validateRestrictionSection = () => {
    let isValid = true
    const {
      promotion: { restriction },
    } = this.state
    const { intl } = this.props

    if (restriction.isLimitingPerStore && !restriction.perStore.value) {
      restriction.perStore.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    if (restriction.isLimitingPerClient && !restriction.perClient.value) {
      restriction.perClient.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    if (
      restriction.isLimitingPerNumOfAffectedItems &&
      !restriction.maxNumberOfAffectedItems.value
    ) {
      restriction.maxNumberOfAffectedItems.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    if (
      restriction.isRestrictingSalesChannels &&
      (!restriction.restrictedSalesChannels.value ||
        restriction.restrictedSalesChannels.value.length === 0)
    ) {
      restriction.restrictedSalesChannels.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    return { restriction, isValid }
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  handleGeneralInfoChange = generalInfo => {
    this.setState(prevState => {
      return {
        promotion: {
          ...prevState.promotion,
          generalInfo: {
            ...prevState.promotion.generalInfo,
            ...generalInfo,
          },
        },
      }
    })
  }

  handleEffectsSectionChange = effects => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        effects: {
          ...prevState.promotion.effects,
          ...effects,
        },
      },
    }))
  }

  handleEligibilitySectionChange = eligibility => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        eligibility: {
          ...prevState.promotion.eligibility,
          ...eligibility,
        },
      },
    }))
  }

  handleRestrictionSectionChange = restriction => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        restriction: {
          ...prevState.promotion.restriction,
          ...restriction,
        },
      },
    }))
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  selectEffect = effect => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        effects: {
          ...prevState.promotion.effects,
          ...effects,
        },
      },
    }))
  }

  canSave = () => {
    const a = this.validate()
    return a
  }

  getAffectedSalesChannels = () => {
    const { restrictedSalesChannelsIds, salesChannels } = this.props
    return restrictedSalesChannelsIds && restrictedSalesChannelsIds.length > 0
      ? salesChannels.filter(({ id }) =>
        restrictedSalesChannelsIds.includes(id)
      )
      : salesChannels.filter(({ id }) => id === '1')
  }

  prepareToSave = promotion => {
    const {
      generalInfo: { hasEndDate, ...generalInfo },
      eligibility,
      effects,
      restriction,
    } = promotion
    const { limitQuantityPerPurchase, ...giftEffect } = effects.gift
    return {
      ...promotion,
      generalInfo: {
        ...generalInfo,
        name: generalInfo.name.value,
        endDate: generalInfo.endDate.value,
      },
      effects: {
        ...effects,
        price: {
          ...effects.price,
          discount: effects.price.discount.value,
          appliesTo: {
            ...effects.price.appliesTo,
            statements: JSON.stringify(effects.price.appliesTo.statements),
          },
        },
        gift: {
          ...giftEffect,
          skus: giftEffect.skus.map(sku => ({
            id: sku.value.id,
            name: sku.value.name,
          })),
          maxQuantityPerPurchase: giftEffect.maxQuantityPerPurchase.value,
        },
        shipping: {
          ...effects.shipping,
          discount: effects.shipping.discount.value,
        },
        reward: {
          ...effects.reward,
          discount: effects.reward.discount.value,
        },
      },
      eligibility: {
        ...eligibility,
        statements: JSON.stringify(eligibility.statements),
      },
      restriction: {
        ...restriction,
        perStore: restriction.perStore.value,
        perClient: restriction.perClient.value,
        maxNumberOfAffectedItems: restriction.maxNumberOfAffectedItems.value,
        restrictSalesChannelVerb: restriction.isRestrictingSalesChannels
          ? restriction.restrictSalesChannelVerb.value
          : undefined,
        restrictedSalesChannels: restriction.isRestrictingSalesChannels
          ? restriction.restrictedSalesChannels.value.map(sc => sc.value)
          : undefined,
      },
    }
  }

  render() {
    const { navigate } = this.context
    const { promotion } = this.state
    const { generalInfo, eligibility, effects, restriction } = promotion
    const {
      intl,
      params: { id },
      savePromotion,
    } = this.props
    const [{ currencyCode } = {}] = this.getAffectedSalesChannels()

    return (
      <Layout
        pageHeader={
          <PageHeader
            linkLabel={intl.formatMessage({
              id: 'promotions.promotion.linkLabel',
            })}
            onLinkClick={() => {
              navigate({
                page: 'admin/index',
              })
            }}
            title={
              id
                ? intl.formatMessage({ id: 'promotions.promotion.title' })
                : intl.formatMessage({ id: 'promotions.promotion.titleNew' })
            }
          />
        }>
        <PageBlock>
          <GeneralSection
            generalInfo={generalInfo}
            updatePageState={this.handleGeneralInfoChange}
          />
        </PageBlock>
        <PageBlock>
          <EffectsSection
            effects={effects}
            updatePageState={this.handleEffectsSectionChange}
            currencyCode={currencyCode}
          />
        </PageBlock>
        <PageBlock>
          <EligibilitySection
            eligibility={eligibility}
            updatePageState={this.handleEligibilitySectionChange}
            currencyCode={currencyCode}
          />
        </PageBlock>
        <PageBlock>
          <RestrictionSection
            restriction={restriction}
            updatePageState={this.handleRestrictionSectionChange}
          />
        </PageBlock>
        <div className="flex flex-row">
          <Button
            variation="primary"
            onClick={() => {
              const preparedPromotion = this.prepareToSave(promotion)

              if (this.canSave()) {
                savePromotion({
                  variables: {
                    promotion: preparedPromotion,
                  },
                })
              }
            }}>
            <FormattedMessage id="promotions.promotion.save" />
          </Button>
          <Button variation="tertiary">
            <FormattedMessage id="promotions.promotion.cancel" />
          </Button>
        </div>
      </Layout>
    )
  }
}

PromotionPage.contextTypes = {
  navigate: PropTypes.func,
}

PromotionPage.propTypes = {
  intl: intlShape,
  savePromotion: PropTypes.func,
}

export default compose(
  withSalesChannels,
  withPromotion,
  savingPromotion,
  injectIntl
)(PromotionPage)
