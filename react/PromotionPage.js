import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Layout, PageBlock, PageHeader, Button } from 'vtex.styleguide'

import EffectsSection from './components/Promotion/EffectsSection'
import EligibilitySection from './components/Promotion/EligibilitySection'
import GeneralSection from './components/Promotion/GeneralSection'
import RestrictionSection from './components/Promotion/RestrictionSection'

import withSalesChannels from './connectors/withSalesChannels'
import savingPromotion from './connectors/savingPromotion'

import { compose } from 'react-apollo'

class PromotionPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      promotion: {
        id: undefined,
        generalInfo: {
          name: {
            value: undefined,
            error: undefined,
            focus: false,
          },
          isActive: false,
          startDate: new Date(),
          hasEndDate: false,
          endDate: {
            value: undefined,
            error: undefined,
            focus: false,
          },
          tz: -new Date().getTimezoneOffset() / 60,
          isArchived: false,
          accumulateWithPromotions: false,
          accumulateWithManualPrices: false,
        },
        eligibility: {
          allCustomers: true,
          statements: [],
          operator: 'all',
        },
        effects: {
          activeEffectType: null, // oneOf ['price', 'gift', 'shipping', 'reward']
          price: {
            discountType: 'nominal', // oneOf ['nominal', 'percentual', 'priceTables']
            discount: {
              value: undefined,
              error: undefined,
              focus: false,
            },
            appliesTo: {
              statements: [],
              allProducts: true,
              operator: 'all',
            },
          },
          gift: {
            skus: {
              value: [],
              error: undefined,
              focus: false,
            },
            multiplier: false,
            limitQuantityPerPurchase: false,
            maxQuantityPerPurchase: {
              value: undefined,
              error: undefined,
              focus: false,
            },
          },
          shipping: {
            discountType: 'nominal', // oneOf ['nominal', 'percentual', 'maximumValue']
            discount: {
              value: undefined,
              error: undefined,
              focus: false,
            },
          },
          reward: {
            discountType: 'nominal', // oneOf ['nominal', 'percentual']
            discount: {
              value: undefined,
              error: undefined,
              focus: undefined,
            },
            applyByOrderStatus: undefined, // oneOf possible order status
          },
        },
        restriction: {
          isLimitingPerStore: false,
          perStore: {
            value: undefined,
            error: undefined,
            focus: false,
          },
          isLimitingPerClient: false,
          perClient: {
            value: undefined,
            error: undefined,
            focus: false,
          },
          isLimitingPerNumOfAffectedItems: false,
          maxNumberOfAffectedItems: {
            value: undefined,
            error: undefined,
            focus: false,
          },
          isRestrictingSalesChannels: false,
          restrictSalesChannelVerb: undefined,
          restrictedSalesChannels: {
            value: [], // idsSalesChannel
            error: undefined,
            focus: false,
          },
          origin: undefined,
        },
      },
    }
  }

  validate = () => {
    const {
      generalInfo,
      isValid: isGeneralInfoValid,
    } = this.validateGeneralInfoSection()

    const {
      restriction,
      isValid: isRestrictionValid,
    } = this.validateRestrictionSection()

    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        generalInfo,
        restriction,
      },
    }))

    return isGeneralInfoValid && isRestrictionValid
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
        id: 'validation.emptyField',
      })
      isValid = false
    }

    return { generalInfo, isValid }
  }

  validateEffectsSection = () => {
    const {
      promotion: { effects },
    } = this.state

    if (effects.activeEffectType === 'Price') {
      return this.validatePriceEffect()
    } else if (effects.activeEffectType === 'Gift') {
      return this.validateGiftEffect()
    } else if (effects.activeEffectType === 'Shipping') {
      return this.validateShippingEffect()
    } else if (effects.activeEffectType === 'Reward') {
      return this.validateRewardEffect()
    }
  }

  validatePriceEffect = () => {
    let isValid = true
    const { intl } = this.props
    const {
      promotion: {
        effects: { price },
      },
    } = this.state

    if (!price.discount.value) {
      price.discount.error = intl.formatMessage({
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
      promotion: {
        effects: { gift },
      },
    } = this.state

    if (gift.skus.value.length === 0) {
      gift.skus.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    if (gift.limitQuantityPerPurchase && !gift.maxNumOfAffectedItems.value) {
      gift.maxNumOfAffectedItems.error = intl.formatMessage({
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
      promotion: {
        effects: { shipping },
      },
    } = this.state

    if (!shipping.discount.value) {
      shipping.discount.error = intl.formatMessage({
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
      promotion: {
        effects: { reward },
      },
    } = this.state

    if (!reward.discount.value) {
      reward.discount.error = intl.formatMessage({
        id: 'validation.emptyField',
      })
      isValid = false
    }

    return { effects, isValid }
  }

  validateRestrictionSection = restriction => {
    if (restriction.isLimitingPerStore && !restriction.perStore.value) {
      restriction.perStore.error = 'validation.emptyField'
    }

    if (restriction.isLimitingPerClient && !restriction.perClient.value) {
      restriction.perClient.error = 'validation.emptyField'
    }

    if (
      restriction.isLimitingPerNumOfAffectedItems &&
      !restriction.maxNumOfAffectedItems.value
    ) {
      restriction.perClient.error = 'validation.emptyField'
    }

    return restriction
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
        gift: {
          ...giftEffect,
          skus: giftEffect.skus.map(sku => ({
            id: sku.value.id,
            name: sku.value.name,
          })),
          maxQuantityPerPurchase: giftEffect.maxQuantityPerPurchase.value,
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
              console.log(preparedPromotion)

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
  savingPromotion,
  withSalesChannels,
  injectIntl
)(PromotionPage)
