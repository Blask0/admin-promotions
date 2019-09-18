import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Button, Checkbox, RadioGroup, IconDelete } from 'vtex.styleguide'

import TimeRange from './TimeRange'
import { newFieldWithValidation } from '../../../utils/validation'

import {
  WEEK_DAYS,
  getWeekDayLabel,
  isTimeValid,
} from '../../../utils/promotion/recurrency'

function getDaysOptions(intl) {
  return [
    {
      value: 'everyday',
      label: intl.formatMessage({
        id:
          'promotions.promotion.generalInfo.scheduling.recurrency.weekDays.everyday',
      }),
    },
    {
      value: 'specificDays',
      label: intl.formatMessage({
        id:
          'promotions.promotion.generalInfo.scheduling.recurrency.weekDays.specificDays',
      }),
    },
  ]
}

function getTimesOptions(intl) {
  return [
    {
      value: 'allDay',
      label: intl.formatMessage({
        id:
          'promotions.promotion.generalInfo.scheduling.recurrency.times.allDay',
      }),
    },
    {
      value: 'specificTimes',
      label: intl.formatMessage({
        id:
          'promotions.promotion.generalInfo.scheduling.recurrency.times.specificTimes',
      }),
    },
  ]
}

function canAddTimeRange(times) {
  const { from, to } = times[times.length - 1] || {}
  return isTimeValid(from.value) && isTimeValid(to.value)
}

function addTimeRange(times) {
  return times.concat({
    from: newFieldWithValidation({ hours: undefined, minutes: undefined }),
    to: newFieldWithValidation({ hours: undefined, minutes: undefined }),
  })
}

function handleChange(callback, value) {
  const event = {
    target: {
      value,
    },
  }
  callback(event)
}

function applyFocus(object, field, onChange) {
  if (object[field].focus) {
    object[field].ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

    handleChange(onChange, {
      ...object,
      [field]: { ...object[field], focus: false },
    })
  }
}

function AdvancedScheduling({ intl, value, onChange }) {
  const { weekDays, times } = value
  const daysOptions = getDaysOptions(intl)
  const timesOptions = getTimesOptions(intl)

  useEffect(() => applyFocus(value, 'weekDays', onChange), [
    weekDays.error,
    weekDays.focus,
  ])
  useEffect(() => applyFocus(value, 'times', onChange), [
    times.error,
    times.focus,
  ])

  return (
    <Fragment>
      <div className="mb4">
        <span>
          <FormattedMessage id="promotions.promotion.generalInfo.scheduling.recurrency.weekDays" />
        </span>
      </div>
      <div ref={weekDays.ref} className="mb4">
        <RadioGroup
          name="days"
          hideBorder
          options={daysOptions}
          value={weekDays.value === null ? 'everyday' : 'specificDays'}
          onChange={e => {
            const value =
              e.currentTarget.value === 'everyday' ? null : { ...WEEK_DAYS }
            handleChange(onChange, {
              weekDays: { ...weekDays, value, error: undefined },
              times,
            })
          }}
        />
      </div>
      {weekDays.value !== null && (
        <div className="ml7 mb6">
          {weekDays.error && (
            <div className="c-danger t-small mb3 lh-title">
              {weekDays.error}
            </div>
          )}
          {Object.keys(weekDays.value).map(day => (
            <div className="mb3">
              <Checkbox
                name={day}
                label={getWeekDayLabel(day, intl)}
                checked={weekDays.value[day]}
                onChange={e => {
                  const value = {
                    ...weekDays.value,
                    [day]: e.target.checked,
                  }
                  handleChange(onChange, {
                    weekDays: { ...weekDays, value, error: undefined },
                    times,
                  })
                }}
              />
            </div>
          ))}
        </div>
      )}
      <div className="mb4">
        <span>
          <FormattedMessage id="promotions.promotion.generalInfo.scheduling.recurrency.times" />
        </span>
      </div>
      <div ref={times.ref} className="mb4">
        <RadioGroup
          name="times"
          hideBorder
          options={timesOptions}
          value={times.value === null ? 'allDay' : 'specificTimes'}
          onChange={e => {
            const value =
              e.currentTarget.value === 'allDay' ? null : addTimeRange([])
            handleChange(onChange, {
              weekDays,
              times: { ...times, value, error: undefined },
            })
          }}
        />
      </div>
      {times.value !== null && (
        <div className="ml7">
          {times.error && (
            <div className="c-danger t-small mb3 lh-title">{times.error}</div>
          )}
          {times.value.map((time, idx) => {
            const from = {
              ...time.from,
              label: idx === 0 ? 'From' : undefined,
            }
            const to = {
              ...time.to,
              label: idx === 0 ? 'To' : undefined,
            }
            return (
              <div key={idx} className="mb2 flex flex-row items-center">
                <TimeRange
                  from={from}
                  to={to}
                  onChange={e => {
                    const value = Object.assign([], times.value, {
                      [idx]: e.target,
                    })
                    const error =
                      isTimeValid(e.target.from.value) &&
                      isTimeValid(e.target.to.value)
                        ? undefined
                        : times.error
                    handleChange(onChange, {
                      weekDays,
                      times: {
                        ...times,
                        value,
                        error,
                      },
                    })
                  }}
                />
                <div className="mr7 c-muted-1">
                  {idx !== 0 ? (
                    <div
                      className="pointer"
                      onClick={() => {
                        const value = times.value
                          .slice(0, idx)
                          .concat(times.value.slice(idx + 1))
                        handleChange(onChange, {
                          weekDays,
                          times: { ...times, value },
                        })
                      }}>
                      <IconDelete />
                    </div>
                  ) : (
                    <svg width={16} height={16} />
                  )}
                </div>
              </div>
            )
          })}
          <div className="mb3">
            <Button
              variation="tertiary"
              disabled={!canAddTimeRange(times.value)}
              onClick={() => {
                const value = addTimeRange(times.value)
                handleChange(onChange, { weekDays, times: { ...times, value } })
              }}>
              <FormattedMessage id="promotions.promotion.generalInfo.scheduling.recurrency.times.addRange" />
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

AdvancedScheduling.propTypes = {
  intl: intlShape,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export default injectIntl(AdvancedScheduling)
