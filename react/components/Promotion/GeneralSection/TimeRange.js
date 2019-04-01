import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { IconDelete, TimePicker } from 'vtex.styleguide'

function getDates({ from, to }) {
  let fromDate
  if (from.value.hours !== undefined && from.value.minutes !== undefined) {
    fromDate = new Date()
    fromDate.setHours(from.value.hours, from.value.minutes, 0, 0)
  }

  let toDate
  if (to.value.hours !== undefined && to.value.minutes != undefined) {
    toDate = new Date()
    toDate.setHours(to.value.hours, to.value.minutes, 0, 0)
  }

  return { fromDate, toDate }
}

function createTime(time, date) {
  return {
    ...time,
    value: {
      ...time.value,
      hours: date.getHours(),
      minutes: date.getMinutes(),
    },
    error: undefined,
  }
}

function handleChange(callback, { from, to }) {
  callback &&
    callback({
      target: {
        from,
        to,
      },
    })
}

function applyFocus({ from, to }, callback) {
  if (from.focus) {
    from.ref.current.focus()
    handleChange(callback, {
      from: { ...from, focus: false },
      to,
    })
  } else if (to.focus) {
    to.ref.current.focus()
    handleChange(callback, {
      from,
      to: { ...to, focus: false },
    })
  }
}

function TimeRange({ intl, from, to, onChange: callback }) {
  const { fromDate, toDate } = getDates({ from, to })

  useEffect(() => applyFocus({ from, to }, callback), [
    from.error,
    from.focus,
    to.error,
    to.focus,
  ])

  return (
    <div className="flex flex-row">
      <div className="mr3">
        <TimePicker
          ref={from.ref}
          label={from.value.label}
          locale={intl.locale}
          timeIntervals={60}
          value={fromDate}
          errorMessage={from.error}
          onChange={date => {
            const newFrom = createTime(from, date)
            handleChange(callback, { from: newFrom, to })
          }}
        />
      </div>
      <div className="mr3">
        <TimePicker
          ref={to.ref}
          label={to.value.label}
          locale={intl.locale}
          timeIntervals={60}
          value={toDate}
          errorMessage={to.error}
          onChange={date => {
            const newTo = createTime(to, date)
            handleChange(callback, { from, to: newTo })
          }}
        />
      </div>
    </div>
  )
}

TimeRange.propTypes = {
  excludable: false,
}

TimeRange.propTypes = {
  intl: intlShape,
  from: PropTypes.shape({
    label: PropTypes.string,
    hours: PropTypes.number,
    minutes: PropTypes.number,
  }).isRequired,
  to: PropTypes.shape({
    label: PropTypes.string,
    hours: PropTypes.number,
    minutes: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func,
}

export default injectIntl(TimeRange)
