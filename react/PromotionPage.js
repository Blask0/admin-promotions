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
import {
  getRewardEffectOrderStatusOptions,
  getRestrictSalesChannelVerbOptions,
} from './utils/constants'

class PromotionPage extends Component {
  constructor(props) {
    super(props)

    const { intl, promotion, salesChannels } = props

    this.state = {
      promotion: newPromotion(intl, promotion, salesChannels),
      isSaving: false,
    }
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  applyFocus = ({ sectionName, fieldName }) => {
    const { promotion } = this.state
    const fieldObject = { ...promotion[sectionName][fieldName] }
    fieldObject.ref.current.focus()

    const changeObject = {
      [fieldName]: {
        ...fieldObject,
        focus: false,
      },
    }

    switch (sectionName) {
      case 'generalInfo':
        this.handleGeneralInfoChange(changeObject)
        break
      case 'eligibility':
        this.handleEligibilitySectionChange(changeObject)
        break
      case 'effects':
        this.handleEffectsSectionChange(changeObject)
        break
      case 'restriction':
        this.handleRestrictionSectionChange(changeObject)
        break
    }
  }

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

    const {
      eligibility,
      isValid: isEligibilityValid,
    } = this.validateEligibilitySection()

    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        generalInfo,
        effects,
        restriction,
        eligibility,
      },
    }))

    return (
      isGeneralInfoValid &&
      isEffectsValid &&
      isEligibilityValid &&
      isRestrictionValid
    )
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
        id: 'promotions.validation.emptyField',
      })
      generalInfo.name.focus = true
      isValid = false
    }

    if (
      generalInfo.hasEndDate &&
      new Date(generalInfo.endDate.value).getTime() <
        new Date(generalInfo.startDate).getTime()
    ) {
      generalInfo.endDate.error = intl.formatMessage({
        id: 'promotions.validation.endDateSmaller',
      })
      generalInfo.endDate.focus = true
      isValid = false
    }

    return { generalInfo, isValid }
  }

  validateEffectsSection = () => {
    const {
      promotion: { effects },
    } = this.state
    const { intl } = this.props

    if (!effects.activeEffectType.value) {
      effects.activeEffectType.error = intl.formatMessage({
        id: 'promotions.validation.emptyEffect',
      })
      return { effects, isValid: false }
    }

    if (effects.activeEffectType.value === 'price') {
      return this.validatePriceEffect()
    } else if (effects.activeEffectType.value === 'gift') {
      return this.validateGiftEffect()
    } else if (effects.activeEffectType.value === 'shipping') {
      return this.validateShippingEffect()
    } else if (effects.activeEffectType.value === 'reward') {
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
        id: 'promotions.validation.emptyField',
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
        id: 'promotions.validation.emptyField',
      })
      isValid = false
    }

    if (
      effects.gift.limitQuantityPerPurchase &&
      !effects.gift.maxQuantityPerPurchase.value
    ) {
      effects.gift.maxQuantityPerPurchase.error = intl.formatMessage({
        id: 'promotions.validation.emptyField',
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
        id: 'promotions.validation.emptyField',
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
        id: 'promotions.validation.emptyField',
      })
      isValid = false
    }

    return { effects, isValid }
  }

  validateEligibilitySection = () => {
    let isValid = true
    const { intl } = this.props
    const {
      promotion: { eligibility },
    } = this.state

    if (
      !eligibility.allCustomers &&
      eligibility.statements.value.length === 0
    ) {
      eligibility.statements.error = intl.formatMessage({
        id: 'promotions.validation.emptyStatement',
      })
      eligibility.statements.focus = true
      isValid = false
    }

    if (
      eligibility.statements.value.length > 0 &&
      !eligibility.statements.value.slice(-1).pop().subject
    ) {
      eligibility.statements.error = intl.formatMessage({
        id: 'promotions.validation.incompleteStatement',
      })
      eligibility.statements.focus = true
      isValid = false
    }

    eligibility.statements.value.forEach((statement, index) => {
      if (statement.subject && !statement.object) {
        eligibility.statements.value[index].error = intl.formatMessage({
          id: 'promotions.validation.incompleteStatement',
        })
        isValid = false
      }
    })

    return { eligibility, isValid }
  }

  validateRestrictionSection = () => {
    let isValid = true
    const {
      promotion: { restriction },
    } = this.state
    const { intl } = this.props

    if (restriction.isLimitingPerStore && !restriction.perStore.value) {
      restriction.perStore.error = intl.formatMessage({
        id: 'promotions.validation.emptyField',
      })
      restriction.perStore.focus = true
      isValid = false
    }

    if (restriction.isLimitingPerClient && !restriction.perClient.value) {
      restriction.perClient.error = intl.formatMessage({
        id: 'promotions.validation.emptyField',
      })
      restriction.perClient.focus = true
      isValid = false
    }

    if (
      restriction.perStore.value &&
      restriction.perClient.value &&
      restriction.perClient.value > restriction.perStore.value
    ) {
      restriction.perClient.error = intl.formatMessage({
        id: 'promotions.validation.biggerLimit',
      })
      restriction.perClient.focus = true
      isValid = false
    }

    if (
      restriction.isLimitingPerNumOfAffectedItems &&
      !restriction.maxNumberOfAffectedItems.value
    ) {
      restriction.maxNumberOfAffectedItems.error = intl.formatMessage({
        id: 'promotions.validation.emptyField',
      })
      restriction.maxNumberOfAffectedItems.focus = true
      isValid = false
    }

    if (
      restriction.isRestrictingSalesChannels &&
      (!restriction.restrictedSalesChannels.value ||
        restriction.restrictedSalesChannels.value.length === 0)
    ) {
      restriction.restrictedSalesChannels.error = intl.formatMessage({
        id: 'promotions.validation.emptyField',
      })
      restriction.restrictedSalesChannels.focus = true
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

  canSave = () => this.validate()

  getAffectedSalesChannels = () => {
    const { restrictedSalesChannelsIds, salesChannels } = this.props
    return restrictedSalesChannelsIds && restrictedSalesChannelsIds.length > 0
      ? salesChannels.filter(({ id }) =>
        restrictedSalesChannelsIds.includes(id)
      )
      : salesChannels.filter(({ id }) => id === '1')
  }

  prepareToSave = promotion => {
    const { intl } = this.props
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
        activeEffectType: effects.activeEffectType.value,
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
          skus: giftEffect.skus.value.map(sku => ({
            id: sku.value,
            name: sku.label,
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
          applyByOrderStatus: effects.reward.applyByOrderStatus
            ? effects.reward.applyByOrderStatus.value
            : getRewardEffectOrderStatusOptions(intl)[0].value,
        },
      },
      eligibility: {
        ...eligibility,
        statements: JSON.stringify(eligibility.statements.value),
      },
      restriction: {
        ...restriction,
        perStore: restriction.perStore.value,
        perClient: restriction.perClient.value,
        maxNumberOfAffectedItems: restriction.maxNumberOfAffectedItems.value,
        restrictSalesChannelVerb: restriction.isRestrictingSalesChannels
          ? restriction.restrictSalesChannelVerb
            ? restriction.restrictSalesChannelVerb.value
            : getRestrictSalesChannelVerbOptions(intl)[0].value
          : undefined,
        restrictedSalesChannels: restriction.isRestrictingSalesChannels
          ? restriction.restrictedSalesChannels.value.map(sc => sc.value)
          : undefined,
      },
    }
  }

  render() {
    const { navigate } = this.context
    const { promotion, isSaving } = this.state
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
                page: 'admin/promotions',
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
            applyFocus={this.applyFocus}
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
            applyFocus={this.applyFocus}
            updatePageState={this.handleEligibilitySectionChange}
            currencyCode={currencyCode}
          />
        </PageBlock>
        <PageBlock>
          <RestrictionSection
            restriction={restriction}
            applyFocus={this.applyFocus}
            updatePageState={this.handleRestrictionSectionChange}
          />
        </PageBlock>
        <div className="flex flex-row">
          <Button
            variation="primary"
            isLoading={isSaving}
            onClick={() => {
              if (this.canSave()) {
                this.setState({ isSaving: true })
                const preparedPromotion = this.prepareToSave(promotion)

                savePromotion({
                  variables: {
                    promotion: preparedPromotion,
                  },
                })
                  .then(() =>
                    navigate({
                      page: 'admin/promotions',
                    })
                  )
                  .finally(() => this.setState({ isSaving: false }))
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
