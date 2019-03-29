import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Layout, PageBlock, PageHeader, Button, Alert } from 'vtex.styleguide'

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

import { createCronHour, createCronWeekDay } from './utils/promotion/recurrency'

class PromotionPage extends Component {
  constructor(props) {
    super(props)

    const { intl, promotion, salesChannels } = props

    this.state = {
      promotion: newPromotion(intl, promotion, salesChannels),
      isSaving: false,
    }

    this.multipleCurrencies = {
      ref: React.createRef(),
      focus: true,
    }
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  componentDidUpdate() {
    if (this.multipleCurrencies.focus) {
      this.multipleCurrencies.ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      this.multipleCurrencies.focus = false
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
    const { intl } = this.props
    const {
      promotion: {
        generalInfo: { ...generalInfo },
      },
    } = this.state
    let isValid = true

    if (
      !generalInfo.name.value ||
      (generalInfo.name.value && generalInfo.name.value.trim() == '')
    ) {
      generalInfo.name = {
        ...generalInfo.name,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyField',
        }),
        focus: true,
      }

      isValid = false
    }

    if (
      generalInfo.hasEndDate &&
      new Date(generalInfo.endDate.value).getTime() <
        new Date(generalInfo.startDate).getTime()
    ) {
      generalInfo.endDate = {
        ...generalInfo.endDate,
        error: intl.formatMessage({
          id: 'promotions.validation.endDateSmaller',
        }),
        focus: true,
      }

      isValid = false
    }

    if (generalInfo.useRecurrency) {
      const { weekDays } = generalInfo.recurrency
      if (weekDays.value !== null) {
        const userDidNotSelectAnyWeekDate = Object.keys(weekDays.value)
          .map(day => weekDays.value[day].value)
          .every(value => !value)
        if (userDidNotSelectAnyWeekDate) {
          generalInfo.recurrency = {
            ...generalInfo.recurrency,
            weekDays: {
              ...generalInfo.recurrency.weekDays,
              error: intl.formatMessage({
                id:
                  'promotions.promotion.validation.userDidNotSelectAnyWeekDate',
              }),
              focus: true,
            },
          }

          isValid = false
        }
      }
    }

    return { generalInfo, isValid }
  }

  validateEffectsSection = () => {
    const { intl } = this.props
    const {
      promotion: {
        effects: { ...effects },
      },
    } = this.state
    let isValid = true

    if (!effects.activeEffectType.value) {
      effects.activeEffectType = {
        ...effects.activeEffectType,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyEffect',
        }),
        focus: true,
      }
      isValid = false
      return { effects, isValid }
    }

    if (effects.activeEffectType.value === 'price') {
      ({ price: effects.price, isValid } = this.validatePriceEffect())
    } else if (effects.activeEffectType.value === 'gift') {
      ({ gift: effects.gift, isValid } = this.validateGiftEffect())
    } else if (effects.activeEffectType.value === 'shipping') {
      ({ shipping: effects.shipping, isValid } = this.validateShippingEffect())
    } else if (effects.activeEffectType.value === 'reward') {
      ({ reward: effects.reward, isValid } = this.validateRewardEffect())
    }
    return { effects, isValid }
  }

  validatePriceEffect = () => {
    const { intl } = this.props
    const {
      promotion: {
        effects: {
          price: { ...price },
        },
      },
    } = this.state
    let isValid = true

    if (!price.discount.value) {
      price.discount = {
        ...price.discount,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyField',
        }),
        focus: true,
      }
      isValid = false
    }

    if (
      !price.appliesTo.allProducts &&
      price.appliesTo.statements.value.length === 0
    ) {
      price.appliesTo = {
        ...price.appliesTo,
        statements: {
          ...price.appliesTo.statements,
          error: intl.formatMessage({
            id: 'promotions.validation.emptyStatement',
          }),
          focus: true,
        },
      }
      isValid = false
    }

    if (
      price.appliesTo.statements.value.length > 0 &&
      !price.appliesTo.statements.value.slice(-1).pop().subject
    ) {
      price.appliesTo = {
        ...price.appliesTo,
        statements: {
          ...price.appliesTo.statements,
          error: intl.formatMessage({
            id: 'promotions.validation.incompleteStatement',
          }),
          focus: true,
        },
      }
      isValid = false
    }

    price.appliesTo = {
      ...price.appliesTo,
      statements: {
        ...price.appliesTo.statements,
        value: price.appliesTo.statements.value.map(statement => ({
          ...statement,
          error:
            statement.subject && !statement.object
              ? intl.formatMessage({
                id: 'promotions.validation.incompleteStatement',
              })
              : undefined,
          focus: statement.subject && !statement.object,
        })),
      },
    }

    return { price, isValid }
  }

  validateGiftEffect = () => {
    const { intl } = this.props
    const {
      promotion: {
        effects: {
          gift: { ...gift },
        },
      },
    } = this.state
    let isValid = true

    if (gift.skus.value.length === 0) {
      gift.skus = {
        ...gift.skus,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyField',
        }),
        focus: true,
      }
      isValid = false
    }

    if (gift.limitQuantityPerPurchase && !gift.maxQuantityPerPurchase.value) {
      gift.maxQuantityPerPurchase = {
        ...gift.maxQuantityPerPurchase,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyField',
        }),
        focus: true,
      }
      isValid = false
    }

    return { gift, isValid }
  }

  validateShippingEffect = () => {
    const { intl } = this.props
    const {
      promotion: {
        effects: {
          shipping: { ...shipping },
        },
      },
    } = this.state
    let isValid = true

    if (!shipping.discount.value) {
      shipping.discount = {
        error: intl.formatMessage({
          id: 'promotions.validation.emptyField',
        }),
        focus: true,
      }
      isValid = false
    }

    return { shipping, isValid }
  }

  validateRewardEffect = () => {
    const { intl } = this.props
    const {
      promotion: {
        effects: {
          reward: { ...reward },
        },
      },
    } = this.state
    let isValid = true

    if (!reward.discount.value) {
      reward.discount = {
        ...reward.discount,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyField',
        }),
        focus: true,
      }
      isValid = false
    }

    return { reward, isValid }
  }

  validateEligibilitySection = () => {
    const { intl } = this.props
    const {
      promotion: {
        eligibility: { ...eligibility },
      },
    } = this.state
    let isValid = true

    if (
      !eligibility.allCustomers &&
      eligibility.statements.value.length === 0
    ) {
      eligibility.statements = {
        ...eligibility.statements,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyStatement',
        }),
        focus: true,
      }
      isValid = false
    }

    if (
      eligibility.statements.value.length > 0 &&
      !eligibility.statements.value.slice(-1).pop().subject
    ) {
      eligibility.statements = {
        ...eligibility.statements,
        error: intl.formatMessage({
          id: 'promotions.validation.incompleteStatement',
        }),
        focus: true,
      }
      isValid = false
    }

    eligibility.statements = {
      ...eligibility.statements,
      value: eligibility.statements.value.map(statement => ({
        ...statement,
        error:
          statement.subject && !statement.object
            ? intl.formatMessage({
              id: 'promotions.validation.incompleteStatement',
            })
            : undefined,
        focus: statement.subject && !statement.object,
      })),
    }

    return { eligibility, isValid }
  }

  validateRestrictionSection = () => {
    const { intl } = this.props
    const {
      promotion: {
        restriction: { ...restriction },
      },
    } = this.state
    let isValid = true

    if (restriction.isLimitingPerStore && !restriction.perStore.value) {
      restriction.perStore = {
        ...restriction.perStore,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyField',
        }),
        focus: true,
      }
      isValid = false
    }

    if (restriction.isLimitingPerClient && !restriction.perClient.value) {
      restriction.perClient = {
        ...restriction.perClient,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyField',
        }),
        focus: true,
      }
      isValid = false
    }

    if (
      restriction.perStore.value &&
      restriction.perClient.value &&
      restriction.perClient.value > restriction.perStore.value
    ) {
      restriction.perClient = {
        ...restriction.perClient,
        error: intl.formatMessage({
          id: 'promotions.validation.biggerLimit',
        }),
        focus: true,
      }
      isValid = false
    }

    if (
      restriction.isLimitingPerNumOfAffectedItems &&
      !restriction.maxNumberOfAffectedItems.value
    ) {
      restriction.maxNumberOfAffectedItems = {
        ...restriction.maxNumberOfAffectedItems,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyField',
        }),
        focus: true,
      }
      isValid = false
    }

    if (
      restriction.isRestrictingSalesChannels &&
      (!restriction.restrictedSalesChannels.value ||
        restriction.restrictedSalesChannels.value.length === 0)
    ) {
      restriction.restrictedSalesChannels = {
        ...restriction.restrictedSalesChannels,
        error: intl.formatMessage({
          id: 'promotions.validation.emptyField',
        }),
        focus: true,
      }
      isValid = false
    }

    const uniqueCurrencyCodes = this.getUniqueCurrencyCodes()
    if (uniqueCurrencyCodes.length !== 1) {
      restriction.restrictedSalesChannels.error = intl.formatMessage({
        id: 'promotions.validation.multipleCurrencies',
      })
      isValid = false
      this.multipleCurrencies.focus = true
    }

    return { restriction, isValid }
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

  canSave = () => this.validate() && false

  getAffectedSalesChannels = () => {
    const { salesChannels } = this.props
    const {
      promotion: {
        restriction: {
          restrictedSalesChannels: { value: restrictedSalesChannels },
          restrictSalesChannelVerb: { value: restrictSalesChannelVerb },
        },
      },
    } = this.state
    return restrictedSalesChannels && restrictedSalesChannels.length > 0
      ? salesChannels.filter(({ id }) => {
        const f = restrictedSalesChannels.find(({ value }) => id === value)
        return restrictSalesChannelVerb === 'any' ? f : !f
      })
      : salesChannels
  }

  getUniqueCurrencyCodes = () => {
    const currencyCodes = this.getAffectedSalesChannels().map(
      sc => sc.currencyCode
    )
    return [...new Set(currencyCodes)]
  }

  prepareToSave = promotion => {
    const { intl } = this.props
    const {
      generalInfo: { hasEndDate, recurrency, ...generalInfo },
      eligibility,
      effects,
      restriction,
    } = promotion
    const { limitQuantityPerPurchase, ...giftEffect } = effects.gift
    const cronWeekDay = createCronWeekDay(recurrency.weekDays.value)
    const cronHour = createCronHour(recurrency.times)
    return {
      ...promotion,
      generalInfo: {
        ...generalInfo,
        name: generalInfo.name.value,
        endDate: generalInfo.endDate.value,
        cron: `* ${cronHour} * * ${cronWeekDay}`,
      },
      effects: {
        ...effects,
        activeEffectType: effects.activeEffectType.value,
        price: {
          ...effects.price,
          discount: effects.price.discount.value,
          appliesTo: {
            ...effects.price.appliesTo,
            statements: JSON.stringify(
              effects.price.appliesTo.statements.value
            ),
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
    const uniqueCurrencyCodes = this.getUniqueCurrencyCodes()
    const currencyCode =
      uniqueCurrencyCodes.length === 1 ? uniqueCurrencyCodes[0] : undefined

    return (
      <Layout
        pageHeader={
          <PageHeader
            linkLabel={intl.formatMessage({
              id: 'promotions.promotion.linkLabel',
            })}
            onLinkClick={() => {
              navigate({
                page: 'admin.promotions',
              })
            }}
            title={
              id
                ? intl.formatMessage({ id: 'promotions.promotion.title' })
                : intl.formatMessage({ id: 'promotions.promotion.titleNew' })
            }
          />
        }>
        {!currencyCode ? (
          <div className="mb5">
            <Alert
              ref={this.multipleCurrencies.ref}
              type={
                restriction.restrictedSalesChannels.error ? 'error' : 'warning'
              }
              action={{
                label: intl.formatMessage({
                  id: 'promotions.promotion.multipleCurrencies.action',
                }),
                onClick: () => {
                  this.setState(
                    ({ promotion }) => ({
                      promotion: {
                        ...promotion,
                        restriction: {
                          ...promotion.restriction,
                          isRestrictingSalesChannels: true,
                        },
                      },
                    }),
                    () => {
                      restriction.restrictedSalesChannels.ref.current.focus()
                    }
                  )
                },
              }}>
              <FormattedMessage
                id={`promotions.promotion.multipleCurrencies.${
                  restriction.restrictedSalesChannels.error
                    ? 'error'
                    : 'warning'
                }`}
                values={{
                  currencies: uniqueCurrencyCodes.join(', '),
                }}
              />
            </Alert>
          </div>
        ) : null}
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
                      page: 'admin.promotions',
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
