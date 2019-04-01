export const WEEK_DAYS = {
  sun: { label: 'Sunday', value: false },
  mon: { label: 'Monday', value: false },
  tue: { label: 'Tuesday', value: false },
  wed: { label: 'Wednesday', value: false },
  thu: { label: 'Thursay', value: false },
  fri: { label: 'Friday', value: false },
  sat: { label: 'Saturday', value: false },
}

export function isTimeValid({ hours }) {
  return hours !== undefined && hours !== '' && hours !== `${undefined}`
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
  if (weekDay === '*') return null
  const weekDays = { ...WEEK_DAYS }
  Object.keys(weekDays).forEach(key => {
    weekDays[key] = {
      ...weekDays[key],
      value: !!weekDay.split(',').includes(key),
    }
  })
  return weekDays
}

export function createCronWeekDay(selectedWeekDays) {
  if (selectedWeekDays === null) return '*'
  const weekDays = Object.keys(selectedWeekDays).filter(
    day => selectedWeekDays[day].value
  )
  return weekDays.length !== 0 ? weekDays.join(',') : undefined
}

export function getSelectedTimes(hour) {
  return hour === '*'
    ? null
    : hour.split(',').map(range => {
      const [fromHours, toHours = fromHours] = range.split('-')
      return {
        from: {
          hours: isTimeValid({ hours: fromHours })
            ? parseInt(fromHours)
            : undefined,
          minutes: 0,
        },
        to: {
          hours: isTimeValid({ hours: toHours })
            ? increaseHour(parseInt(toHours))
            : undefined,
          minutes: 0,
        },
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
