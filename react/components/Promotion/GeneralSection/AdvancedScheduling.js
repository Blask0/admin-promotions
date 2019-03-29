import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { Button, Checkbox, RadioGroup } from 'vtex.styleguide'
import TimeRange from './TimeRange'

const WEEK_DAYS = {
  sun: false,
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: false,
  sat: false,
}

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

function getHoursOptions(intl) {
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

function getSelectedWeekDays(weekDay) {
  const weekDays = { ...WEEK_DAYS }
  if (weekDay === '*') {
    Object.keys(weekDays).forEach(key => {
      weekDays[key] = true
    })
    return weekDays
  }
  Object.keys(weekDays).forEach(key => {
    weekDays[key] = !!weekDay.split(',').includes(key)
  })
  return weekDays
}

function getSelectedHours(hour) {
  return hour !== '*'
    ? hour.split(',').map(range => {
      const [from, to = from] = range.split('-')
      return {
        from: {
          hours: from && from !== `${undefined}` ? parseInt(from) : undefined,
          minutes: 0,
        },
        to: {
          hours: to && to !== `${undefined}` ? parseInt(to) + 1 : undefined,
          minutes: 0,
        },
      }
    })
    : []
}

function createCronWeekDay(selectedWeekDays = { ...WEEK_DAYS }) {
  const weekDays = Object.keys(selectedWeekDays).filter(
    day => selectedWeekDays[day]
  )
  return weekDays.length !== 0 ? weekDays.join(',') : undefined
}

function createCronHour(hours) {
  return hours
    .map(
      ({ from, to }) =>
        `${from.hours ? from.hours : ''}-${to.hours ? to.hours - 1 : ''}`
    )
    .join(',')
}

function createCron(minute, hour, day, month, weekDay) {
  return `${minute} ${hour} ${day} ${month} ${weekDay}`
}

function handleChange(callback, value) {
  const event = {
    target: {
      value,
    },
  }
  callback(event)
}

function AdvancedScheduling({ intl, value, onChange }) {
  const [minute, hour, day, month, weekDay] = value.split(' ')
  console.log(minute, hour, day, month, weekDay)
  const daysOptions = getDaysOptions()
  const hoursOptions = getHoursOptions()

  const weekDays = getSelectedWeekDays(weekDay)
  const hours = getSelectedHours(hour)

  return (
    <Fragment>
      <div className="mb4">
        <span>Days of the week</span>
      </div>
      <div className="mb4">
        <RadioGroup
          name="days"
          options={daysOptions}
          value={weekDay === '*' ? 'everyday' : 'specificDays'}
          onChange={e => {
            const weekDay =
              e.currentTarget.value === 'everyday' ? '*' : undefined
            const value = createCron(minute, hour, day, month, weekDay)
            handleChange(onChange, value)
          }}
        />
      </div>
      {weekDay !== '*' && (
        <div className="ml7">
          {weekDay === `${undefined}` && (
            <div className="c-danger t-small mb3 lh-title">
              You must select at least one day of the week
            </div>
          )}
          <div className="mb3">
            <Checkbox
              label="Sunday"
              checked={weekDays.sun}
              onChange={e => {
                const weekDay = createCronWeekDay({
                  ...weekDays,
                  sun: e.target.checked,
                })
                const value = createCron(minute, hour, day, month, weekDay)
                handleChange(onChange, value)
              }}
            />
          </div>
          <div className="mb3">
            <Checkbox
              label="Monday"
              checked={weekDays.mon}
              onChange={e => {
                const weekDay = createCronWeekDay({
                  ...weekDays,
                  mon: e.target.checked,
                })
                const value = createCron(minute, hour, day, month, weekDay)
                handleChange(onChange, value)
              }}
            />
          </div>
          <div className="mb3">
            <Checkbox
              label="Tuesday"
              checked={weekDays.tue}
              onChange={e => {
                const weekDay = createCronWeekDay({
                  ...weekDays,
                  tue: e.target.checked,
                })
                const value = createCron(minute, hour, day, month, weekDay)
                handleChange(onChange, value)
              }}
            />
          </div>
          <div className="mb3">
            <Checkbox
              label="Wednesday"
              checked={weekDays.wed}
              onChange={e => {
                const weekDay = createCronWeekDay({
                  ...weekDays,
                  wed: e.target.checked,
                })
                const value = createCron(minute, hour, day, month, weekDay)
                handleChange(onChange, value)
              }}
            />
          </div>
          <div className="mb3">
            <Checkbox
              label="Thursday"
              checked={weekDays.thu}
              onChange={e => {
                const weekDay = createCronWeekDay({
                  ...weekDays,
                  thu: e.target.checked,
                })
                const value = createCron(minute, hour, day, month, weekDay)
                handleChange(onChange, value)
              }}
            />
          </div>
          <div className="mb3">
            <Checkbox
              label="Friday"
              checked={weekDays.fri}
              onChange={e => {
                const weekDay = createCronWeekDay({
                  ...weekDays,
                  fri: e.target.checked,
                })
                const value = createCron(minute, hour, day, month, weekDay)
                handleChange(onChange, value)
              }}
            />
          </div>
          <div className="mb3">
            <Checkbox
              label="Saturday"
              checked={weekDays.sat}
              onChange={e => {
                const weekDay = createCronWeekDay({
                  ...weekDays,
                  sat: e.target.checked,
                })
                const value = createCron(minute, hour, day, month, weekDay)
                handleChange(onChange, value)
              }}
            />
          </div>
        </div>
      )}
      <div className="mb4">
        <RadioGroup
          name="hours"
          options={hoursOptions}
          value={hour === '*' ? 'allDay' : 'specificTimes'}
          onChange={e => {
            const hour = e.currentTarget.value === 'allDay' ? '*' : undefined
            const value = createCron(minute, hour, day, month, weekDay)
            handleChange(onChange, value)
          }}
        />
      </div>
      {hour !== '*' && (
        <div className="ml7">
          {hour === `${undefined}` && (
            <div className="c-danger t-small mb3 lh-title">
              You must specify at least one time
            </div>
          )}
          {hours.map((hour, idx) => {
            const from = {
              ...hour.from,
              label: idx === 0 ? 'From' : undefined,
            }
            const to = {
              ...hour.to,
              label: idx === 0 ? 'To' : undefined,
            }
            return (
              <div key={idx} className="mb2">
                <TimeRange
                  excludable={idx !== 0}
                  from={from}
                  to={to}
                  onChange={e => {
                    const newHours = Object.assign([], hours, {
                      [idx]: e.target,
                    })
                    const hour = createCronHour(newHours) || undefined
                    const value = createCron(minute, hour, day, month, weekDay)
                    handleChange(onChange, value)
                  }}
                />
              </div>
            )
          })}
          {/* <div className="mb3">
            <Button variation="tertiary" onClick={() => {}}>
              ADD RANGE
            </Button>
          </div> */}
        </div>
      )}
    </Fragment>
  )
}

AdvancedScheduling.defaultProps = {
  value: '* * * * *',
}

AdvancedScheduling.propTypes = {
  intl: intlShape,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default injectIntl(AdvancedScheduling)
