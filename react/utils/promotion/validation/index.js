import { isTimeValid, isToBeforeFrom } from '../recurrency'

export function validateGeneralInfoSection(generalInfo, intl) {
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
    const { weekDays, times } = generalInfo.recurrency

    if (weekDays.value !== null) {
      const userDidNotSelectAnyWeekDate = Object.keys(weekDays.value)
        .map(day => weekDays.value[day])
        .every(value => !value)
      if (userDidNotSelectAnyWeekDate) {
        generalInfo.recurrency = {
          ...generalInfo.recurrency,
          weekDays: {
            ...generalInfo.recurrency.weekDays,
            error: intl.formatMessage({
              id: 'promotions.promotion.validation.userDidNotSelectAnyWeekDate',
            }),
            focus: true,
          },
        }

        isValid = false
      }
    }

    if (times.value !== null) {
      const { from, to } = times.value[times.value.length - 1]
      if (
        !isTimeValid(from.value) &&
        !isTimeValid(to.value) &&
        times.value.length <= 1
      ) {
        generalInfo.recurrency = {
          ...generalInfo.recurrency,
          times: {
            ...generalInfo.recurrency.times,
            value: [
              ...generalInfo.recurrency.times.value.slice(
                0,
                times.value.length - 1
              ),
              {
                from: { ...from, error: ' ', focus: true },
                to: { ...to, error: ' ', focus: true },
              },
            ],
            error: intl.formatMessage({
              id: 'promotions.promotion.validation.userDidNotSelectAnyTime',
            }),
            focus: true,
          },
        }

        isValid = false
      } else {
        generalInfo.recurrency = {
          ...generalInfo.recurrency,
          times: {
            ...generalInfo.recurrency.times,
            value: times.value.map(({ from, to }) => {
              return {
                from: {
                  ...from,
                  error: !isTimeValid(from.value)
                    ? intl.formatMessage({
                        id: 'promotions.validation.emptyField',
                      })
                    : undefined,
                  focus: !isTimeValid(from.value),
                },
                to: {
                  ...to,
                  error: !isTimeValid(to.value)
                    ? intl.formatMessage({
                        id: 'promotions.validation.emptyField',
                      })
                    : isToBeforeFrom(from.value, to.value)
                    ? intl.formatMessage({
                        id: 'promotions.promotion.validation.toBeforeFrom',
                      })
                    : undefined,
                  focus:
                    !isTimeValid(to.value) ||
                    isToBeforeFrom(from.value, to.value),
                },
              }
            }),
          },
        }
      }
    }
  }

  return { generalInfo, isValid }
}

function validatePriceEffect(price, intl) {
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

  if (isValid) {
    isValid = !price.appliesTo.statements.value.some(
      statement => !!statement.error
    )
  }

  return { price, isValid }
}

function validateGiftEffect(gift, intl) {
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

  if (!gift.maxQuantityPerPurchase.value) {
    gift.maxQuantityPerPurchase = {
      ...gift.maxQuantityPerPurchase,
      error: intl.formatMessage({
        id: 'promotions.validation.emptyField',
      }),
      focus: true,
    }
    isValid = false
  }

  if (
    gift.maxQuantityPerPurchase.value < 1 ||
    !/^\d*$/.test(gift.maxQuantityPerPurchase.value)
  ) {
    gift.maxQuantityPerPurchase = {
      ...gift.maxQuantityPerPurchase,
      error: intl.formatMessage({
        id: 'promotions.validation.invalidField',
      }),
      focus: true,
    }
    isValid = false
  }

  return { gift, isValid }
}

function validateShippingEffect(shipping, intl) {
  let isValid = true

  if (!shipping.discount.value) {
    shipping.discount = {
      ...shipping.discount,
      error: intl.formatMessage({
        id: 'promotions.validation.emptyField',
      }),
      focus: true,
    }
    isValid = false
  }

  return { shipping, isValid }
}

function validateRewardEffect(reward, intl) {
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

export function validateEffectsSection(effects, intl) {
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

  switch (effects.activeEffectType.value) {
    case 'price':
      ;({ price: effects.price, isValid } = validatePriceEffect(
        effects.price,
        intl
      ))
      break
    case 'gift':
      ;({ gift: effects.gift, isValid } = validateGiftEffect(
        effects.gift,
        intl
      ))
      break
    case 'shipping':
      ;({ shipping: effects.shipping, isValid } = validateShippingEffect(
        effects.shipping,
        intl
      ))
      break
    case 'reward':
      ;({ reward: effects.reward, isValid } = validateRewardEffect(
        effects.reward,
        intl
      ))
      break
  }

  return { effects, isValid }
}

export function validateEligibilitySection(eligibility, intl) {
  let isValid = true

  if (!eligibility.allCustomers && eligibility.statements.value.length === 0) {
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

function getAffectedSalesChannels(restriction, salesChannels) {
  const {
    restrictedSalesChannels: { value: restrictedSalesChannels },
    restrictSalesChannelVerb: { value: restrictSalesChannelVerb },
  } = restriction
  return restrictedSalesChannels && restrictedSalesChannels.length > 0
    ? salesChannels.filter(({ id }) => {
        const f = restrictedSalesChannels.find(({ value }) => id === value)
        return restrictSalesChannelVerb === 'any' ? f : !f
      })
    : salesChannels
}

export function getUniqueCurrencyCodes(restriction, salesChannels) {
  const currencyCodes = getAffectedSalesChannels(
    restriction,
    salesChannels
  ).map(sc => sc.currencyCode)

  return [...new Set(currencyCodes)]
}

export function validateRestrictionSection(restriction, salesChannels, intl) {
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

  const uniqueCurrencyCodes = getUniqueCurrencyCodes(restriction, salesChannels)
  if (uniqueCurrencyCodes.length !== 1) {
    restriction.restrictedSalesChannels.error = intl.formatMessage({
      id: 'promotions.validation.multipleCurrencies',
    })
    isValid = false
    this.multipleCurrencies.focus = true
  }

  return { restriction, isValid }
}
