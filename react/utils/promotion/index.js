import {
  getRestrictSalesChannelVerbOptions,
  getRewardEffectOrderStatusOptions,
} from '../../utils/constants'
import { mapSalesChannelsToSelect } from '../../utils/mappers'

const newFieldWithValidation = value => ({
  value,
  error: undefined,
  focus: undefined,
})

const INITIAL_PRICE_EFFECT = {
  discountType: 'nominal',
  discount: newFieldWithValidation(),
  appliesTo: {
    statements: [],
    allProducts: true,
    operator: 'all',
  },
}
const INITIAL_GIFT_EFFECT = {
  skus: newFieldWithValidation([]),
  multiplier: false,
  limitQuantityPerPurchase: false,
  maxQuantityPerPurchase: newFieldWithValidation(),
}

const INITIAL_SHIPPING_EFFECT = {
  discountType: 'nominal',
  discount: newFieldWithValidation(),
}

const INITIAL_REWARD_EFFECT = {
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
        statements: JSON.parse(priceEffect.appliesTo.statements),
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
        statements: JSON.parse(eligibility.statements),
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
          verb => verb.value === restriction.restrictSalesChannelVerb.value
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
      isArchived: false,
      accumulateWithPromotions: false,
      accumulateWithManualPrices: false,
    },
    eligibility: {
      id: undefined,
      allCustomers: true,
      statements: [],
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
      restrictSalesChannelVerb: undefined,
      restrictedSalesChannels: newFieldWithValidation(),
    },
  }
}
