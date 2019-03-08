export const getRestrictSalesChannelVerbOptions = intl => [
  {
    label: intl.formatMessage({
      id: 'promotions.promotion.restriction.restrictTradePolicies.verb.any',
    }),
    value: 'any',
  },
  {
    label: intl.formatMessage({
      id: 'promotions.promotion.restriction.restrictTradePolicies.verb.not.any',
    }),
    value: 'not.any',
  },
]

export const getRewardEffectOrderStatusOptions = intl => [
  {
    label: intl.formatMessage({
      id: 'promotions.promotion.effects.rewardForm.orderStatus.invoiced',
    }),
    value: 'invoiced',
  },
  {
    label: intl.formatMessage({
      id: 'promotions.promotion.effects.rewardForm.orderStatus.paymentApproved',
    }),
    value: 'payment-approved',
  },
]
