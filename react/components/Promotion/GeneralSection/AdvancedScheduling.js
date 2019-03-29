import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Button, Checkbox, RadioGroup, IconDelete } from 'vtex.styleguide'

import TimeRange from './TimeRange'
import { WEEK_DAYS, isTimeValid } from '../../../utils/promotion/recurrency'

function getDaysOptions(intl) {
  return [
    {
      value: 'everyday',
      label: 'Every day of the week',
    },
    {
      value: 'specificDays',
      label: 'Specific days of the week',
    },
  ]
}

function getTimesOptions(intl) {
  return [
    {
      value: 'allDay',
      label: 'All day',
    },
    {
      value: 'specificTimes',
      label: 'Specific times of the day',
    },
  ]
}

function canAddTimeRange(times) {
  const { from, to } = times[times.length - 1] || {}
  return isTimeValid(from) && isTimeValid(to)
}

function addTimeRange(times) {
  return times.concat({
    from: { hours: undefined, minutes: undefined },
    to: { hours: undefined, minutes: undefined },
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

function AdvancedScheduling({ intl, value: { weekDays, times }, onChange }) {
  const daysOptions = getDaysOptions()
  const timesOptions = getTimesOptions()

  useEffect(
    () => {
      if (weekDays.focus) {
        weekDays.ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })

        handleChange(onChange, {
          weekDays: { ...weekDays, focus: false },
          times,
        })
      }
    },
    [weekDays.error]
  )

  return (
    <Fragment>
      <div className="mb4">
        <span>Days of the week</span>
      </div>
      <div ref={weekDays.ref} className="mb4">
        <RadioGroup
          name="days"
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
        <div className="ml7 mb3">
          {weekDays.error && (
            <div className="c-danger t-small mb3 lh-title">
              {weekDays.error}
            </div>
          )}
          {Object.keys(weekDays.value).map(day => (
            <div className="mb3">
              <Checkbox
                name={day}
                label={weekDays.value[day].label}
                checked={weekDays.value[day].value}
                onChange={e => {
                  const value = {
                    ...weekDays.value,
                    [day]: { ...weekDays.value[day], value: e.target.checked },
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
        <RadioGroup
          name="times"
          options={timesOptions}
          value={times === null ? 'allDay' : 'specificTimes'}
          onChange={e => {
            const times =
              e.currentTarget.value === 'allDay' ? null : addTimeRange([])
            handleChange(onChange, { weekDays, times })
          }}
        />
      </div>
      {times !== null && (
        <div className="ml7">
          {/* {hour === `${undefined}` && (
            <div className="c-danger t-small mb3 lh-title">
              You must specify at least one time
            </div>
          )} */}
          {times.map((time, idx) => {
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
                    const newTimes = Object.assign([], times, {
                      [idx]: e.target,
                    })
                    handleChange(onChange, { weekDays, times: newTimes })
                  }}
                />
                <div className="mr7 c-muted-1">
                  {idx !== 0 ? (
                    <div
                      className="pointer"
                      onClick={() => {
                        const newTimes = times
                          .slice(0, idx)
                          .concat(times.slice(idx + 1))
                        handleChange(onChange, { weekDays, times: newTimes })
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
              disabled={!canAddTimeRange(times)}
              onClick={() => {
                const newTimes = addTimeRange(times)
                handleChange(onChange, { weekDays, times: newTimes })
              }}>
              ADD RANGE
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
