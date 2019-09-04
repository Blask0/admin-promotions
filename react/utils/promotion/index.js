import {
  getRestrictSalesChannelVerbOptions,
  getRewardEffectOrderStatusOptions,
} from '../../utils/constants'

import {
  createCronHour,
  createCronWeekDay,
  getSelectedTimes,
  getSelectedWeekDays,
} from '../../utils/promotion/recurrency'

import { newFieldWithValidation } from '../validation'
import { mapSalesChannelsToSelect } from '../mappers'

import Price from '../../components/Icon/Price'
import Reward from '../../components/Icon/Reward'
import Shipping from '../../components/Icon/Shipping'
import Gift from '../../components/Icon/Gift'
import Play from '../../components/Icon/Play'
import Pause from '../../components/Icon/Pause'
import Clock from '../../components/Icon/Clock'

export const INITIAL_PRICE_EFFECT = {
  discountType: 'nominal',
  discount: newFieldWithValidation(),
  appliesTo: {
    statements: newFieldWithValidation([]),
    allProducts: true,
    operator: 'all',
  },
}

export const INITIAL_GIFT_EFFECT = {
  skus: newFieldWithValidation([]),
  multiplier: false,
  limitQuantityPerPurchase: false,
  maxQuantityPerPurchase: newFieldWithValidation(),
}

export const INITIAL_SHIPPING_EFFECT = {
  discountType: 'nominal',
  discount: newFieldWithValidation(),
}

export const INITIAL_REWARD_EFFECT = {
  discountType: 'nominal',
  discount: newFieldWithValidation(),
  applyByOrderStatus: undefined,
}

const getPriceEffect = priceEffect =>
  priceEffect
    ? {
      ...priceEffect,
      discount: newFieldWithValidation(
        priceEffect ? priceEffect.discount : undefined
      ),
      appliesTo: {
        ...priceEffect.appliesTo,
        statements: newFieldWithValidation(
          JSON.parse(priceEffect.appliesTo.statements)
        ),
      },
    }
    : INITIAL_PRICE_EFFECT

const getGiftEffect = giftEffect =>
  giftEffect
    ? {
      ...giftEffect,
      skus: newFieldWithValidation(
        giftEffect.skus.map(sku => ({
          label: sku.name,
          value: sku.id,
        }))
      ),
      limitQuantityPerPurchase: !!giftEffect.maxQuantityPerPurchase,
      maxQuantityPerPurchase: newFieldWithValidation(
        giftEffect ? giftEffect.maxQuantityPerPurchase : undefined
      ),
    }
    : INITIAL_GIFT_EFFECT

const getShippingEffect = shippingEffect =>
  shippingEffect
    ? {
      ...shippingEffect,
      discount: newFieldWithValidation(
        shippingEffect ? shippingEffect.discount : undefined
      ),
    }
    : INITIAL_SHIPPING_EFFECT

const getRewardEffect = (intl, rewardEffect) =>
  rewardEffect
    ? {
      ...rewardEffect,
      discount: newFieldWithValidation(
        rewardEffect ? rewardEffect.discount : undefined
      ),
      applyByOrderStatus: getRewardEffectOrderStatusOptions(intl).find(
        option => option.value === rewardEffect.applyByOrderStatus
      ),
    }
    : INITIAL_REWARD_EFFECT

export const newPromotion = (intl, promotion, salesChannels) => {
  if (promotion) {
    const { generalInfo, eligibility, effects, restriction } = promotion
    const useRecurrency = !!generalInfo.cron
    const [minute, hour, day, month, weekDay] = useRecurrency
      ? generalInfo.cron.split(' ')
      : []

    return {
      ...promotion,
      generalInfo: {
        ...generalInfo,
        name: newFieldWithValidation(generalInfo.name),
        startDate: new Date(generalInfo.startDate),
        hasEndDate: !!generalInfo.endDate,
        endDate: generalInfo.endDate
          ? newFieldWithValidation(new Date(generalInfo.endDate))
          : newFieldWithValidation(),
        highlight: generalInfo.highlight,
        useRecurrency,
        recurrency: {
          weekDays: useRecurrency
            ? newFieldWithValidation(getSelectedWeekDays(weekDay))
            : newFieldWithValidation(null),
          times: useRecurrency
            ? newFieldWithValidation(getSelectedTimes(hour))
            : newFieldWithValidation(null),
        },
      },
      effects: {
        ...effects,
        activeEffectType: newFieldWithValidation(effects.activeEffectType),
        price: getPriceEffect(effects.price),
        gift: getGiftEffect(effects.gift),
        shipping: getShippingEffect(effects.shipping),
        reward: getRewardEffect(intl, effects.reward),
      },
      eligibility: {
        ...eligibility,
        statements: newFieldWithValidation(JSON.parse(eligibility.statements)),
      },
      restriction: {
        ...restriction,
        isLimitingPerStore: !!restriction.perStore,
        perStore: newFieldWithValidation(restriction.perStore),
        isLimitingPerClient: !!restriction.perClient,
        perClient: newFieldWithValidation(restriction.perClient),
        isLimitingPerNumOfAffectedItems: !!restriction.maxNumberOfAffectedItems,
        maxNumberOfAffectedItems: newFieldWithValidation(
          restriction.maxNumberOfAffectedItems
        ),
        isRestrictingSalesChannels:
          restriction.restrictedSalesChannels.length > 0,
        restrictSalesChannelVerb: getRestrictSalesChannelVerbOptions(intl).find(
          verb => verb.value === restriction.restrictSalesChannelVerb
        ),
        restrictedSalesChannels: newFieldWithValidation(
          mapSalesChannelsToSelect(
            salesChannels.filter(sc =>
              restriction.restrictedSalesChannels.includes(sc.id)
            )
          )
        ),
      },
    }
  }

  return {
    id: undefined,
    generalInfo: {
      name: newFieldWithValidation(),
      isActive: false,
      startDate: new Date(),
      hasEndDate: false,
      endDate: newFieldWithValidation(),
      tz: -new Date().getTimezoneOffset() / 60,
      highlight: false,
      useRecurrency: false,
      recurrency: {
        weekDays: newFieldWithValidation(null),
        times: newFieldWithValidation(null),
      },
      cron: undefined,
      isArchived: false,
      accumulateWithPromotions: false,
      accumulateWithManualPrices: false,
    },
    eligibility: {
      id: undefined,
      allCustomers: true,
      statements: newFieldWithValidation([]),
      operator: 'all',
    },
    effects: {
      activeEffectType: newFieldWithValidation(),
      price: INITIAL_PRICE_EFFECT,
      gift: INITIAL_GIFT_EFFECT,
      shipping: INITIAL_SHIPPING_EFFECT,
      reward: INITIAL_REWARD_EFFECT,
    },
    restriction: {
      isLimitingPerStore: false,
      perStore: newFieldWithValidation(),
      isLimitingPerClient: false,
      perClient: newFieldWithValidation(),
      isLimitingPerNumOfAffectedItems: false,
      maxNumberOfAffectedItems: newFieldWithValidation(),
      isRestrictingSalesChannels: false,
      restrictSalesChannelVerb: getRestrictSalesChannelVerbOptions(intl)[0],
      restrictedSalesChannels: newFieldWithValidation(),
    },
  }
}

export const getEffectIcon = (effectType = '', size) => {
  switch (effectType) {
    case 'price':
      return <Price size={size} />
    case 'reward':
      return <Reward size={size} />
    case 'shipping':
      return <Shipping size={size} />
    case 'gift':
      return <Gift size={size} />
    default:
      return null
  }
}

export const getStatusIcon = (status = '', size) => {
  switch (status) {
    case 'running':
      return <Play size={size} />
    case 'paused':
      return <Pause size={size} />
    case 'scheduled':
    case 'completed':
      return <Clock size={size} />
    default:
      return null
  }
}

function removeRefsFromStatements(statements) {
  return statements.map(({ refs, ...statement }) => statement)
}

export function prepareToSave(promotion, intl) {
  const {
    generalInfo: { hasEndDate, useRecurrency, recurrency, ...generalInfo },
    eligibility,
    effects,
    restriction,
  } = promotion

  const { limitQuantityPerPurchase, ...giftEffect } = effects.gift

  const {
    statements: { value: scopeStatementsWithRefs },
  } = effects.price.appliesTo
  const {
    statements: { value: eligibilityStatementsWithRefs },
  } = eligibility
  const scopeStatements = removeRefsFromStatements(scopeStatementsWithRefs)
  const eligibilityStatements = removeRefsFromStatements(
    eligibilityStatementsWithRefs
  )

  const {
    weekDays: { value: weekDays },
    times: { value: timesWithValidation },
  } = recurrency
  const times = timesWithValidation
    ? timesWithValidation.map(time => ({
      from: time.from.value,
      to: time.to.value,
    }))
    : timesWithValidation
  const cronWeekDay = createCronWeekDay(weekDays)
  const cronHour = createCronHour(times)

  return {
    ...promotion,
    generalInfo: {
      ...generalInfo,
      name: generalInfo.name.value,
      endDate: generalInfo.endDate.value,
      cron: `* * ${cronHour} * * ${cronWeekDay}`,
    },
    effects: {
      ...effects,
      activeEffectType: effects.activeEffectType.value,
      price: {
        ...effects.price,
        discount: effects.price.discount.value,
        appliesTo: {
          ...effects.price.appliesTo,
          statements: JSON.stringify(scopeStatements),
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
      statements: JSON.stringify(eligibilityStatements),
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

export const getStatus = ({ isActive, beginDateString, endDateString }) => {
  const now = new Date()
  const beginDate = new Date(beginDateString)
  const endDate = endDateString ? new Date(endDateString) : null
  if (endDate && endDate.getTime() < now.getTime()) {
    return {
      color: '#3F3F40',
      id: 'completed',
      icon: getStatusIcon('completed'),
      labelId: 'promotions.promotion.status.completed',
    }
  }
  if (isActive) {
    if (beginDate.getTime() > now.getTime()) {
      return {
        color: '#FFB100',
        icon: getStatusIcon('scheduled'),
        labelId: 'promotions.promotion.status.scheduled',
        id: 'scheduled',
      }
    }
    return {
      color: '#8BC34A',
      icon: getStatusIcon('running'),
      labelId: 'promotions.promotion.status.running',
      id: 'running',
    }
  }
  return {
    color: '#3F3F40',
    icon: getStatusIcon('paused'),
    labelId: 'promotions.promotion.status.paused',
    id: 'paused',
  }
}
