const newFieldWithValidation = value => ({
  value,
  error: undefined,
  focus: undefined,
})

export const newPromotion = promotion => {
  if (promotion) {
    const { generalInfo, eligibility, effects, restriction } = promotion
    return {
      ...promotion,
      generalInfo: {
        ...generalInfo,
        name: newFieldWithValidation(generalInfo.name),
        hasEndDate: !!generalInfo.endDate,
        endDate: newFieldWithValidation(generalInfo.endDate),
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
        restrictedSalesChannels: newFieldWithValidation(
          restriction.restrictedSalesChannels
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
      origin: undefined,
    },
  }
}
