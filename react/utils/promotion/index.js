import {
  RESTRICT_SALES_CHANNEL_VERB_OPTIONS,
  mapSalesChannelsToSelect,
} from '../../utils/promotion/restrictions'

const newFieldWithValidation = value => ({
  value,
  error: undefined,
  focus: undefined,
})

export const newPromotion = (promotion, salesChannels) => {
  if (promotion) {
    const { generalInfo, eligibility, effects, restriction } = promotion
    return {
      ...promotion,
      generalInfo: {
        ...generalInfo,
        name: newFieldWithValidation(generalInfo.name),
        startDate: new Date(generalInfo.startDate),
        hasEndDate: !!generalInfo.endDate,
        endDate: newFieldWithValidation(new Date(generalInfo.endDate)),
      },
      effects: {
        ...effects,
        price: effects.price || {
          discountType: 'nominal',
          discount: undefined,
          appliesTo: null,
        },
        gift: effects.gift || {
          skus: [],
          multiplier: false,
          limitQuantityPerPurchase: false,
          maxQuantityPerPurchase: newFieldWithValidation(),
        },
        shipping: effects.shipping || {
          discountType: 'nominal',
          discount: undefined,
        },
        reward: effects.reward || {
          discountType: 'nominal',
          discount: undefined,
          applyByOrderStatus: undefined,
        },
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
        restrictSalesChannelVerb: RESTRICT_SALES_CHANNEL_VERB_OPTIONS.find(
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
      activeEffectType: null,
      price: {
        discountType: 'nominal',
        discount: newFieldWithValidation(),
        appliesTo: {
          statements: [],
          allProducts: true,
          operator: 'all',
        },
      },
      gift: {
        skus: [],
        multiplier: false,
        limitQuantityPerPurchase: false,
        maxQuantityPerPurchase: newFieldWithValidation(),
      },
      shipping: {
        discountType: 'nominal',
        discount: newFieldWithValidation(),
      },
      reward: {
        discountType: 'nominal',
        discount: newFieldWithValidation(),
        applyByOrderStatus: undefined,
      },
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
