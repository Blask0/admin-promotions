import { ucfirst } from '../../index'
import { newFieldWithValidation } from '../../validation'

const NOW = new Date()
const WEEK_DAYS_DATE_LABELS = {
  sun: new Date(NOW.setDate(NOW.getDate() - NOW.getDay())),
  mon: new Date(NOW.setDate(NOW.getDate() - NOW.getDay() + 1)),
  tue: new Date(NOW.setDate(NOW.getDate() - NOW.getDay() + 2)),
  wed: new Date(NOW.setDate(NOW.getDate() - NOW.getDay() + 3)),
  thu: new Date(NOW.setDate(NOW.getDate() - NOW.getDay() + 4)),
  fri: new Date(NOW.setDate(NOW.getDate() - NOW.getDay() + 5)),
  sat: new Date(NOW.setDate(NOW.getDate() - NOW.getDay() + 6)),
}

export const WEEK_DAYS = {
  sun: false,
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: false,
  sat: false,
}

export function getWeekDayLabel(day, intl) {
  return ucfirst(
    intl.formatDate(WEEK_DAYS_DATE_LABELS[day], { weekday: 'long' })
  )
}

export function isTimeValid({ hours }) {
  return hours !== undefined && hours !== '' && hours !== `${undefined}`
}

export function isAlways({ times, weekDays }) {
  return !times.value && !weekDays.value
}

export function isToBeforeFrom(from, to) {
  return (
    isTimeValid(from) &&
    isTimeValid(to) &&
    to.hours > 0 &&
    to.hours <= from.hours
  )
}

function increaseHour(hour) {
  return hour === 23 ? 0 : hour + 1
}

function decreaseHour(hour) {
  return hour === 0 ? 23 : hour - 1
}

export function getSelectedWeekDays(weekDay) {
  if (weekDay === undefined) return undefined
  if (weekDay === '*') return null
  const weekDays = { ...WEEK_DAYS }
  Object.keys(weekDays).forEach(key => {
    weekDays[key] = !!weekDay.split(',').includes(key)
  })
  return weekDays
}

export function createCronWeekDay(selectedWeekDays) {
  if (selectedWeekDays === null) return '*'
  const weekDays = Object.keys(selectedWeekDays).filter(
    day => selectedWeekDays[day]
  )
  return weekDays.length !== 0 ? weekDays.join(',') : undefined
}

export function getSelectedTimes(hour) {
  if (hour === undefined) return undefined
  return hour === '*'
    ? null
    : hour.split(',').map(range => {
      const [fromHours, toHours = fromHours] = range.split('-')
      return {
        from: newFieldWithValidation({
          hours: isTimeValid({ hours: fromHours })
            ? parseInt(fromHours)
            : undefined,
          minutes: 0,
        }),
        to: newFieldWithValidation({
          hours: isTimeValid({ hours: toHours })
            ? increaseHour(parseInt(toHours))
            : undefined,
          minutes: 0,
        }),
      }
    })
}

export function createCronHour(times) {
  return times === null
    ? '*'
    : times
      .map(
        ({ from, to }) =>
          `${isTimeValid(from) ? from.hours : ''}-${
            isTimeValid(to) ? decreaseHour(to.hours) : ''
          }`
      )
      .join(',')
}
