import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Checkbox, DatePicker } from 'vtex.styleguide'
import { getEffectIcon, getStatusIcon } from '../../utils/promotion'
const {
  culture: { locale },
} = __RUNTIME__

const messages = defineMessages({
  effectFilterLabel: {
    id: 'admin/promotions.filterBar.effectFilterLabel',
    defaultMessage: 'Effect',
    description: 'FilterTag label for Effect',
  },
  statusFilterLabel: {
    id: 'admin/promotions.filterBar.statusFilterLabel',
    defaultMessage: 'Status',
    description: 'FilterTag label for Status',
  },
  startDateFilterLabel: {
    id: 'admin/promotions.filterBar.startDateFilterLabel',
    defaultMessage: 'Starting date',
    description: 'FilterTag label for Starting date',
  },
  endDateFilterLabel: {
    id: 'admin/promotions.filterBar.endDateFilterLabel',
    defaultMessage: 'Ending date',
    description: 'FilterTag label for Ending date',
  },
  checkboxGroupFilterLabelAll: {
    id: 'admin/promotions.filterBar.checkboxGroupFilterLabel.all',
    defaultMessage: 'All',
    description: 'FilterTag label for all checkbox groups checked',
  },
  checkboxGroupFilterLabelNone: {
    id: 'admin/promotions.filterBar.checkboxGroupFilterLabel.none',
    defaultMessage: 'None',
    description: 'FilterTag label for all checkbox groups unchecked',
  },
  checkboxGroupFilterVerb: {
    id: 'admin/promotions.filterBar.checkboxGroupFilterVerb',
    defaultMessage: 'includes',
    description: 'FilterTag verb for checkbox groups',
  },
  dateVerbIs: {
    id: 'admin/promotions.filterBar.dateVerb.is',
    defaultMessage: 'is',
    description: 'FilterTag verb for date is',
  },
  dateVerbIsAfter: {
    id: 'admin/promotions.filterBar.dateVerb.isAfter',
    defaultMessage: 'is after',
    description: 'FilterTag verb for date is after',
  },
  dateVerbIsBefore: {
    id: 'admin/promotions.filterBar.dateVerb.isBefore',
    defaultMessage: 'is before',
    description: 'FilterTag verb for date is before',
  },
  dateVerbIsWithin: {
    id: 'admin/promotions.filterBar.dateVerb.isWithin',
    defaultMessage: 'is within',
    description: 'FilterTag verb for date is within',
  },
  dateVerbWithin: {
    id: 'admin/promotions.filterBar.dateVerb.within',
    defaultMessage: 'within',
    description: 'FilterTag verb for date within',
  },
  dateVerbIsNotWithin: {
    id: 'admin/promotions.filterBar.dateVerb.isNotWithin',
    defaultMessage: 'is not within',
    description: 'FilterTag verb for date is not within',
  },
  dateVerbNotWithin: {
    id: 'admin/promotions.filterBar.dateVerb.notWithin',
    defaultMessage: 'not within',
    description: 'FilterTag verb for date not within',
  },
  dateVerbAnd: {
    id: 'admin/promotions.filterBar.dateVerb.and',
    defaultMessage: 'and',
    description: 'FilterTag connector for date range',
  },
  price: {
    id: 'promotions.promotion.effects.price',
    defaultMessage: 'Price',
  },
  gift: {
    id: 'promotions.promotion.effects.gift',
    defaultMessage: 'Gift',
  },
  shipping: {
    id: 'promotions.promotion.effects.shipping',
    defaultMessage: 'Shipping',
  },
  reward: {
    id: 'promotions.promotion.effects.reward',
    defaultMessage: 'Reward',
  },
  buyAndWin: {
    id: 'promotions.promotions.newPromotion.buyAndWin',
    defaultMessage: 'Buy one get one',
  },
  campaign:{
    id: 'promotions.promotions.newPromotion.campaign',
    defaultMessage: 'Campaign',
  },
  combo:{
    id: 'promotions.promotions.newPromotion.combo',
    defaultMessage: 'Buy together - Bundle"',
  },
  forThePriceOf:{
    id: 'promotions.promotions.newPromotion.forThePriceOf',
    defaultMessage: 'More for less',
  },
  progressive:{
    id: 'promotions.promotions.newPromotion.progressive',
    defaultMessage: 'Progressive discount',
  },
  regular: {
    id: 'promotions.promotions.newPromotion.regular',
    defaultMessage: 'Regular',
  },
  running: {
    id: 'promotions.promotion.status.running',
    defaultMessage: 'Running',
  },
  paused: {
    id: 'promotions.promotion.status.paused',
    defaultMessage: 'Paused',
  },
  completed: {
    id: 'promotions.promotion.status.completed',
    defaultMessage: 'Completed',
  },
  scheduled: {
    id: 'promotions.promotion.status.scheduled',
    defaultMessage: 'Scheduled',
  },
})

export const getFilterOptions = intl => {
  return {
    effect: {
      label: intl.formatMessage(messages.effectFilterLabel),
      renderFilterLabel: composeCheckboxGroupFilterLable(intl),
      verbs: composeCheckboxGroupSingleVerb(effectSelectorObject, intl),
    },
    status: {
      label: intl.formatMessage(messages.statusFilterLabel),
      renderFilterLabel: composeCheckboxGroupFilterLable(intl),
      verbs: composeCheckboxGroupSingleVerb(statusSelectorObject, intl),
    },
    startDate: {
      label: intl.formatMessage(messages.startDateFilterLabel),
      renderFilterLabel: composeDateLable(intl),
      verbs: composeDateVerbs(intl),
    },
    endDate: {
      label: intl.formatMessage(messages.endDateFilterLabel),
      renderFilterLabel: composeDateLable(intl),
      verbs: composeDateVerbs(intl),
    },
  }
}

const composeCheckboxGroupFilterLable = intl => st => {
  if (!st || !st.object) {
    return intl.formatMessage(messages.checkboxGroupFilterLabelAll)
  }
  const keys = st.object ? Object.keys(st.object) : []
  const isAllTrue = !keys.some(key => !st.object[key])
  const isAllFalse = !keys.some(key => st.object[key])
  const trueKeys = keys.filter(key => st.object[key])
  return `${
    isAllTrue
      ? intl.formatMessage(messages.checkboxGroupFilterLabelAll)
      : isAllFalse
        ? intl.formatMessage(messages.checkboxGroupFilterLabelNone)
        : `${trueKeys.map(key => intl.formatMessage(messages[key])).join(', ')}`
  }`
}

const composeCheckboxGroupSingleVerb = (renderFn, intl) => {
  return [
    {
      label: intl.formatMessage(messages.checkboxGroupFilterVerb),
      value: 'includes',
      object: {
        renderFn,
        extraParams: {
          intl,
        },
      },
    },
  ]
}

const effectSelectorObject = ({
  values,
  onChangeObjectCallback,
  extraParams,
}) => {
  const legacyEffects = [
    'buyAndWin',
    'campaign',
    'combo',
    'forThePriceOf',
    'progressive',
    'regular',
  ]
  const initialValue = {
    price: true,
    gift: true,
    shipping: true,
    reward: true,
    // legacy types
    ...legacyEffects.reduce((acc, cur, i) => {
      acc[cur] = true
      return acc
    }, {}),
  }
  const toggleValueByKey = key => {
    const newValues = {
      ...(values || initialValue),
      [key]: values ? !values[key] : false,
    }
    return newValues
  }
  return (
    <div>
      {Object.keys(initialValue)
        .filter(effect => !legacyEffects.includes(effect))
        .map((opt, index) => {
          return (
            <div
              className="mb3"
              key={`effect-filter-statment-object-${opt}-${index}`}>
              <Checkbox
                checked={values ? values[opt] : initialValue[opt]}
                id={`${opt}-effect`}
                label={
                  <div>
                    {getEffectIcon(opt, 14)}
                    <span className="ml3">
                      {extraParams.intl.formatMessage(messages[opt])}
                    </span>
                  </div>
                }
                name="effect-filter-checkbox-group"
                onChange={() =>
                  onChangeObjectCallback(toggleValueByKey(`${opt}`))
                }
                value={opt}
              />
            </div>
          )
        })}
      <div className="c-on-base">
        <span className="c-muted-1">
          <FormattedMessage id="promotions.promotion.legacy" />
        </span>
        <div className="mt3">
            {legacyEffects.map((opt, index) => {
              return (
                <div
                  className="mb3"
                  key={`legacy-effect-filter-statment-object-${opt}-${index}`}>
                  <Checkbox
                    checked={values ? values[opt] : initialValue[opt]}
                    id={`${opt}-legacy-effect`}
                    label={
                      <FormattedMessage
                        id={`promotions.promotions.newPromotion.${opt}`}
                      />
                    }
                    name="legacy-effect-filter-checkbox-group"
                    onChange={() =>
                      onChangeObjectCallback(toggleValueByKey(`${opt}`))
                    }
                    value={opt}
                  />
                </div>
              )
            })}
          </div>
      </div>
    </div>
  )
}

const statusSelectorObject = ({
  values,
  onChangeObjectCallback,
  extraParams,
}) => {
  const initialValue = {
    running: true,
    paused: true,
    completed: true,
    scheduled: true,
  }
  const toggleValueByKey = key => {
    const newValues = {
      ...(values || initialValue),
      [key]: values ? !values[key] : false,
    }
    return newValues
  }
  return (
    <div>
      {Object.keys(initialValue).map((opt, index) => {
        return (
          <div
            className="mb3"
            key={`status-filter-statment-object-${opt}-${index}`}>
            <Checkbox
              checked={values ? values[opt] : initialValue[opt]}
              id={`status-${opt}`}
              label={
                <div
                  className="flex items-center"
                  style={{
                    color:
                      opt === 'running'
                        ? '#8BC34A'
                        : opt === 'scheduled'
                          ? '#FFB100'
                          : '',
                  }}>
                  {getStatusIcon(opt, 14)}
                  <span
                    style={{
                      fontWeight: 500,
                      lineHeight: '20px',
                    }}
                    className="ml3">
                    {extraParams.intl.formatMessage(messages[opt])}
                  </span>
                </div>
              }
              name="effect-filter-checkbox-group"
              onChange={() =>
                onChangeObjectCallback(toggleValueByKey(`${opt}`))
              }
              value={opt}
            />
          </div>
        )
      })}
    </div>
  )
}

const composeDateLable = intl => st => {
  if (!st || !st.object) return 'All'
  switch (st.verb) {
    case 'is':
      return `${intl.formatMessage(messages.dateVerbIs)} ${intl.formatDate(
        new Date(st.object)
      )}`
    case 'is after':
      return `${intl.formatMessage(messages.dateVerbIsAfter)} ${intl.formatDate(
        new Date(st.object)
      )}`
    case 'is before':
      return `${intl.formatMessage(
        messages.dateVerbIsBefore
      )} ${intl.formatDate(new Date(st.object))}`
    case 'is within':
      return `${intl.formatMessage(messages.dateVerbWithin)} ${intl.formatDate(
        new Date(st.object.from)
      )} ${intl.formatMessage(messages.dateVerbAnd)} ${intl.formatDate(
        new Date(st.object.to)
      )}`
    case 'is not within':
      return `${intl.formatMessage(
        messages.dateVerbNotWithin
      )} ${intl.formatDate(new Date(st.object.from))} ${intl.formatMessage(
        messages.dateVerbAnd
      )} ${intl.formatDate(new Date(st.object.to))}`
  }
}

const datePickerObject = ({ values, onChangeObjectCallback }) => {
  return (
    <div className="w-100">
      <DatePicker
        value={values}
        onChange={date => {
          onChangeObjectCallback(date)
        }}
        locale={locale}
      />
    </div>
  )
}

const datePickerRangeObject = ({ values, onChangeObjectCallback, extraParams }) => {
  return (
    <div className="flex flex-column w-100">
      <DatePicker
        value={values && values.from}
        onChange={date => {
          onChangeObjectCallback({ ...(values || {}), from: date })
        }}
        locale={locale}
      />
      <div className="mt3">
        <DatePicker
          label={
            extraParams.intl &&
            extraParams.intl.formatMessage(messages.dateVerbAnd)
          }
          value={values && values.to}
          onChange={date => {
            onChangeObjectCallback({ ...(values || {}), to: date })
          }}
          locale={locale}
        />
      </div>
    </div>
  )
}

const composeDateVerbs = intl => {
  return [
    {
      label: intl.formatMessage(messages.dateVerbIs),
      value: 'is',
      object: {
        renderFn: datePickerObject,
        extraParams: {},
      },
    },
    {
      label: intl.formatMessage(messages.dateVerbIsAfter),
      value: 'is after',
      object: {
        renderFn: datePickerObject,
        extraParams: {},
      },
    },
    {
      label: intl.formatMessage(messages.dateVerbIsBefore),
      value: 'is before',
      object: {
        renderFn: datePickerObject,
        extraParams: {},
      },
    },
    {
      label: intl.formatMessage(messages.dateVerbIsWithin),
      value: 'is within',
      object: {
        renderFn: datePickerRangeObject,
        extraParams: {
          intl,
        },
      },
    },
    {
      label: intl.formatMessage(messages.dateVerbIsNotWithin),
      value: 'is not within',
      object: {
        renderFn: datePickerRangeObject,
        extraParams: {
          intl,
        },
      },
    },
  ]
}
