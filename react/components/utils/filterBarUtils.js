import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Checkbox, Collapsible, DatePicker } from 'vtex.styleguide'
import { getEffectIcon, getStatusIcon } from '../../utils/promotion'
import Circle from '../Icon/Circle'
const {
  culture: { locale },
} = __RUNTIME__

export const getFilterOptions = () => {
  return {
    effect: {
      label: 'Effect',
      renderFilterLabel: composeCheckboxGroupFilterLable,
      verbs: composeCheckboxGroupSingleVerb(effectSelectorObject),
    },
    status: {
      label: 'Status',
      renderFilterLabel: composeCheckboxGroupFilterLable,
      verbs: composeCheckboxGroupSingleVerb(statusSelectorObject),
    },
    startDate: {
      label: 'Starting date',
      renderFilterLabel: composeDateLable,
      verbs: composeDateVerbs(),
    },
    endDate: {
      label: 'Ending date',
      renderFilterLabel: composeDateLable,
      verbs: composeDateVerbs(),
    },
    active: {
      label: 'Active',
      renderFilterLabel: composeCheckboxGroupFilterLable,
      verbs: composeCheckboxGroupSingleVerb(activeSelectorObject),
    },
  }
}

const composeCheckboxGroupFilterLable = st => {
  if (!st || !st.object) {
    // you should treat empty object cases only for alwaysVisibleFilters
    return 'All'
  }
  const keys = st.object ? Object.keys(st.object) : []
  const isAllTrue = !keys.some(key => !st.object[key])
  const isAllFalse = !keys.some(key => st.object[key])
  const trueKeys = keys.filter(key => st.object[key])
  let trueKeysLabel = ''
  trueKeys.forEach((key, index) => {
    trueKeysLabel += `${key}${index === trueKeys.length - 1 ? '' : ', '}`
  })
  return `${isAllTrue ? 'All' : isAllFalse ? 'None' : `${trueKeysLabel}`}`
}

const composeCheckboxGroupSingleVerb = renderFn => {
  return [
    {
      label: 'includes',
      value: 'includes',
      object: {
        renderFn,
        extraParams: {},
      },
    },
  ]
}

const effectSelectorObject = ({ values, onChangeObjectCallback }) => {
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
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
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
        <Collapsible
          isOpen
          header={<FormattedMessage id="promotions.promotion.legacy" />}>
          <div className="mt3">
            {legacyEffects.map((opt, index) => {
              return (
                <div
                  className="mb3"
                  key={`legacy-effect-filter-statment-object-${opt}-${index}`}>
                  <Checkbox
                    checked={values ? values[opt] : initialValue[opt]}
                    id={`${opt}-legacy-effect`}
                    label={<FormattedMessage
                      id={`promotions.promotions.newPromotion.${opt}`} />}
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
        </Collapsible>
      </div>
    </div>
  )
}

const activeSelectorObject = ({ values, onChangeObjectCallback }) => {
  const initialValue = {
    active: true,
    inactive: true,
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
            key={`active-filter-statment-object-${opt}-${index}`}>
            <Checkbox
              checked={values ? values[opt] : initialValue[opt]}
              id={`active-${opt}`}
              label={
                <div>
                  <Circle active={opt === 'active'} />
                  <span
                    style={{
                      color: opt === 'active' ? '#8BC34A' : '#FF4C4C',
                      fontWeight: 500,
                      lineHeight: '20px',
                    }}
                    className="ml3">
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </span>
                </div>
              }
              name="active-filter-checkbox-group"
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

const statusSelectorObject = ({ values, onChangeObjectCallback }) => {
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
                    className={opt === 'completed' ? '' : 'ml3'}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
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

const composeDateLable = st => {
  if (!st || !st.object) return 'All'
  return `${
    st.verb === 'between'
      ? `between ${st.object.from} and ${st.object.to}`
      : `is ${st.object}`
  }`
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

const datePickerRangeObject = ({ values, onChangeObjectCallback }) => {
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
          label="and"
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

const composeDateVerbs = () => {
  return [
    {
      label: 'is',
      value: 'is',
      object: {
        renderFn: datePickerObject,
        extraParams: {},
      },
    },
    {
      label: 'is after',
      value: 'is after',
      object: {
        renderFn: datePickerObject,
        extraParams: {},
      },
    },
    {
      label: 'is before',
      value: 'is before',
      object: {
        renderFn: datePickerObject,
        extraParams: {},
      },
    },
    {
      label: 'is within',
      value: 'is within',
      object: {
        renderFn: datePickerRangeObject,
        extraParams: {},
      },
    },
    {
      label: 'is not within',
      value: 'is not within',
      object: {
        renderFn: datePickerRangeObject,
        extraParams: {},
      },
    },
  ]
}
